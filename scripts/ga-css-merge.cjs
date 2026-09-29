#!/usr/bin/env node
// Merges rules of dist/google-ads-lp.css that have the same declarations
// ("A{x}" … "B{x}" → "A,B{x}") when the move cannot change the cascade: no rule
// in between sets a property of the same family with a selector of the same
// specificity (a higher or lower one wins or loses either way, whatever the
// order). Both A moving down and B moving up are tried. Same block only
// (top level or one @media block).
//
//   node scripts/ga-css-merge.cjs           → report
//   node scripts/ga-css-merge.cjs --write   → rewrite the CSS
const fs = require('fs');
const {pack, unpack, CSS} = require('./ga-css-pack.cjs');

function splitTop(s, sep) {
  const out = [];
  let d = 0, q = '', cur = '';
  for (const ch of s) {
    if (q) { if (ch === q) q = ''; cur += ch; continue; }
    if (ch === '"' || ch === "'") q = ch;
    else if (ch === '(' || ch === '[') d++;
    else if (ch === ')' || ch === ']') d--;
    else if (ch === sep && !d) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
}

// [ids, classes, types] of one complex selector
function spec(sel) {
  let a = 0, b = 0, c = 0, i = 0;
  const add = s => { a += s[0]; b += s[1]; c += s[2]; };
  const max = list => list.map(spec).reduce((m, s) => (s[0] - m[0] || s[1] - m[1] || s[2] - m[2]) > 0 ? s : m, [0, 0, 0]);
  while (i < sel.length) {
    const ch = sel[i];
    if (ch === '#') { a++; i = skipIdent(sel, i + 1); }
    else if (ch === '.') { b++; i = skipIdent(sel, i + 1); }
    else if (ch === '[') { b++; i = sel.indexOf(']', i) + 1; }
    else if (ch === ':') {
      const el = sel[i + 1] === ':';
      const j = skipIdent(sel, i + (el ? 2 : 1));
      const name = sel.slice(i + (el ? 2 : 1), j);
      if (sel[j] === '(') {
        let d = 0, k = j;
        for (; k < sel.length; k++) { if (sel[k] === '(') d++; if (sel[k] === ')' && !--d) break; }
        const arg = sel.slice(j + 1, k);
        if (name === 'where') {} else if (/^(is|not|has|matches)$/.test(name)) add(max(splitTop(arg, ','))); else b++;
        i = k + 1;
      } else {
        if (el || /^(before|after|first-line|first-letter)$/.test(name)) c++; else b++;
        i = j;
      }
    } else if (/[a-zA-Z*]/.test(ch)) { if (ch !== '*') c++; i = skipIdent(sel, i + 1); }
    else i++;
  }
  return [a, b, c];
}
function skipIdent(s, i) { while (i < s.length && /[\w-]/.test(s[i])) i++; return i; }

// Properties that can override each other share a family.
function family(prop) {
  if (prop.startsWith('--')) return prop;
  if (/^(inset|top|left|right|bottom)$/.test(prop)) return 'inset';
  if (/^(place|align|justify)-/.test(prop)) return 'align';
  if (/^(transform|translate|rotate|scale)$/.test(prop)) return 'transform';
  if (/^(gap|row-gap|column-gap)$/.test(prop)) return 'gap';
  if (/^(width|height|inline-size|block-size)$/.test(prop)) return prop;
  return prop.replace(/^-\w+-/, '').split('-')[0];
}
const families = body => new Set(splitTop(body, ';').filter(d => d.includes(':')).map(d => family(d.slice(0, d.indexOf(':')).trim().toLowerCase())));
const key = s => s.join(',');

const flat = unpack(fs.readFileSync(CSS, 'utf8'));
const lines = flat.split('\n');
// parse into rules with their block id
const rules = [];
let block = 0;
lines.forEach((l, i) => {
  if (/^@(media|container|supports|layer)[^{]*\{$/.test(l)) { block = i; return; }
  if (l === '}') { block = 0; return; }
  const m = /^\s*([^@\s}][^{]*)\{(.*)\}$/.exec(l);
  if (m && !/^\s*(from|to|\d)/.test(m[1])) rules.push({line: i, block, sel: splitTop(m[1], ','), body: m[2], fam: null, specs: null});
});
for (const r of rules) { r.fam = families(r.body); r.specs = new Set(r.sel.map(s => key(spec(s)))); }

// Is it safe to move `mover`'s selectors across rules (from, to) exclusive?
function clear(mover, from, to) {
  for (let k = from + 1; k < to; k++) {
    const x = rules[k];
    if (x.dead) continue;
    if (![...x.fam].some(f => mover.fam.has(f))) continue;
    if ([...x.specs].some(s => mover.specs.has(s))) return false;
  }
  return true;
}

const RISKY = /::?-|:has\(|:popover|:user-|:modal/;
let saved = 0, merges = 0;
for (let i = 0; i < rules.length; i++) {
  const a = rules[i];
  if (a.dead) continue;
  for (let j = i + 1; j < rules.length; j++) {
    const b = rules[j];
    if (b.dead || b.block !== a.block || b.body !== a.body) continue;
    // one unknown selector drops a whole list: keep those rules on their own
    if (RISKY.test(a.sel.join()) || RISKY.test(b.sel.join())) continue;
    // B up to A, or A down to B
    const up = clear(b, i, j), down = !up && clear(a, i, j);
    if (!up && !down) continue;
    const host = up ? a : b, gone = up ? b : a;
    host.sel = up ? a.sel.concat(b.sel) : a.sel.concat(b.sel);
    host.specs = new Set(host.sel.map(s => key(spec(s))));
    gone.dead = true;
    saved += gone.body.length + 2;
    merges++;
    if (down) break; // A is gone
  }
}
// Same selector list twice: B's declarations join A's (after them, so B still
// wins inside the rule) when nothing between them competes.
let same = 0;
for (let i = 0; i < rules.length; i++) {
  const a = rules[i];
  if (a.dead) continue;
  for (let j = i + 1; j < rules.length; j++) {
    const b = rules[j];
    if (b.dead || b.block !== a.block || key(b.sel) !== key(a.sel)) continue;
    if (!clear(b, i, j)) break;
    a.body += ';' + b.body;
    for (const f of b.fam) a.fam.add(f);
    b.dead = true;
    saved += b.sel.join(',').length + 2;
    same++;
  }
}
console.log(`Gộp được ${merges} rule trùng thân + ${same} rule trùng selector · ~${saved} B (dạng phẳng)`);

if (process.argv.includes('--write')) {
  for (const r of rules) {
    const pad = lines[r.line].match(/^\s*/)[0];
    lines[r.line] = r.dead ? null : `${pad}${r.sel.join(',')}{${r.body}}`;
  }
  const text = pack(lines.filter(l => l !== null).join('\n'));
  const before = fs.statSync(CSS).size;
  fs.writeFileSync(CSS, text);
  console.log(`Đã ghi: ${before} → ${Buffer.byteLength(text)} byte`);
}

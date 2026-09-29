#!/usr/bin/env node
// dist/google-ads-lp.css is written with CSS nesting so ".ga-lp " is not
// repeated 1,600 times. The scope and specificity are unchanged: a rule nested
// in ".ga-lp{…}" is exactly ".ga-lp <rule>", and a second level groups rules
// that start with the same component (".sc-call{….a{…}.b{…}}").
//
//   node scripts/ga-css-pack.cjs            → rewrite the file nested
//   node scripts/ga-css-pack.cjs --unpack   → rewrite it flat (one rule a line)
//   node scripts/ga-css-pack.cjs --check    → pack ∘ unpack round trip only
//
// Flat form: one rule per line, "@media(…){" blocks with two-space children,
// @keyframes on one line. Only the nesting syntax that shipped first is used
// (every nested selector starts with a symbol or "&"), so it needs Chrome 112,
// Safari 16.5, Firefox 117. ga-css-unused.cjs and ga-css-prune.cjs read and
// write through unpack/pack.
const fs = require('fs');
const path = require('path');

const CSS = path.resolve(__dirname, '..', 'dist', 'google-ads-lp.css');
const SCOPE = '.ga-lp';

// split on a character at depth 0 (outside (), [] and strings)
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

// "sel{body}" on one line → [sel, body]
function ruleOf(line) {
  const m = /^([^@\s}][^{]*)\{(.*)\}$/.exec(line.trim());
  return m && !/^(from|to|\d)/.test(m[1]) ? [m[1], m[2]] : null;
}

// ".ga-lp .x" → ".x", ".ga-lp.x" → "&.x", ".ga-lp h1" → "& h1"; else null
function inScope(sel) {
  if (!sel.startsWith(SCOPE)) return null;
  const rest = sel.slice(SCOPE.length);
  if (/^[.:[]/.test(rest)) return '&' + rest;
  if (!rest.startsWith(' ')) return null;
  const rel = rest.slice(1);
  return /^[.:#[*>+~]/.test(rel) ? rel : '& ' + rel;
}

// Where a selector can be cut into "head" + nested rest: before a space, ".",
// ":" or "[" at depth 0. Heads start with a class and hold no pseudo-element
// or combinator other than a space.
function heads(sel) {
  const out = [];
  if (sel[0] !== '.') return out;
  let d = 0;
  for (let i = 1; i <= sel.length; i++) {
    const ch = sel[i];
    if (ch === '(' || ch === '[') { if (!d && ch === '[') out.push(sel.slice(0, i)); d++; continue; }
    if (ch === ')' || ch === ']') { d--; continue; }
    if (d) continue;
    if (ch === undefined || ch === ' ' || ch === '.' || ch === ':') out.push(sel.slice(0, i));
  }
  return out.filter(h => !/::|[>+~]| $/.test(h) && !/:(before|after)/.test(h));
}

// nested form of sel under head, "" when sel is the head itself, null if not under it
function nest(sel, head) {
  if (!sel.startsWith(head)) return null;
  const rest = sel.slice(head.length);
  if (!rest) return '';
  if (/^[.:[]/.test(rest)) return '&' + rest;
  if (rest[0] !== ' ') return null;
  const rel = rest.slice(1);
  return /^[.:#[*>+~]/.test(rel) ? rel : '& ' + rel;
}

function pack(flat) {
  const lines = flat.replace(/\r/g, '').split('\n');
  const frames = lines.filter(l => l.startsWith('@keyframes'));
  const body = lines.filter(l => !l.startsWith('@keyframes') && l !== '');
  const out = [];
  let run = null; // nested rules waiting to be written: [{sel:[...], body}]

  // rules → lines; runs that share a head are nested under it, recursively
  const emit = items => {
    for (let i = 0; i < items.length;) {
      const r = items[i];
      // pick the head that saves the most bytes over the rules that follow
      let best = null;
      // every selector of the list under h, or null
      const under = (sels, h) => { const n = sels.map(x => nest(x, h)); return n.every(Boolean) ? n : null; };
      const len = sels => sels.join(',').length;
      for (const h of heads(r.sel[0])) {
        const own = r.sel.length === 1 && nest(r.sel[0], h) === '';
        const first = !own && under(r.sel, h);
        if (!own && !first) continue;
        const kids = own ? [] : [{sel: first, body: r.body}];
        let j = i + 1, gain = own ? -3 : len(r.sel) - len(first) - h.length - 4;
        while (j < items.length) {
          const n = under(items[j].sel, h);
          if (!n) break;
          kids.push({sel: n, body: items[j].body});
          gain += len(items[j].sel) - len(n);
          j++;
        }
        if (kids.length >= (own ? 1 : 2) && gain > 0 && (!best || gain > best.gain)) best = {h, own, kids, j, gain};
      }
      if (best) {
        out.push(`${best.h}{${best.own ? r.body + ';' : ''}`);
        emit(best.kids);
        out.push(`}`);
        i = best.j;
      } else {
        out.push(`${r.sel.join(',')}{${r.body}}`);
        i++;
      }
    }
  };
  const flush = () => {
    if (!run) return;
    out.push(`${SCOPE}{`);
    emit(run);
    out.push(`}`);
    run = null;
  };

  for (const line of body) {
    const r = ruleOf(line);
    const sels = r && splitTop(r[0], ',').map(inScope);
    if (r && sels.every(Boolean) && !/;\s*$/.test(r[1])) {
      (run = run || []).push({sel: sels, body: r[1]});
      continue;
    }
    flush();
    out.push(line.trim());
  }
  flush();
  return out.concat(frames).join('\n') + '\n';
}

function unpack(css) {
  const lines = css.replace(/\r/g, '').split('\n');
  const out = [];
  const frames = [];
  const stack = []; // full selectors of the open ".ga-lp{" and head blocks
  let pad = '';
  const join = (parent, sel) => splitTop(sel, ',').map(s => s.startsWith('&') ? parent + s.slice(1) : `${parent} ${s}`).join(',');
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('@keyframes')) { frames.push(line); continue; }
    if (line === `${SCOPE}{` && !stack.length) { stack.push(SCOPE); continue; }
    if (line === '}') {
      if (stack.length) stack.pop();
      else { out.push('}'); pad = ''; }
      continue;
    }
    if (/^@(media|container|supports|layer)[^{]*\{$/.test(line)) { out.push(line); pad = '  '; continue; }
    const top = stack[stack.length - 1];
    if (top && /\{[^}]*$/.test(line)) {
      // "X{decls;" opens a head block; its own declarations come first.
      const i = line.indexOf('{');
      const full = join(top, line.slice(0, i));
      const own = line.slice(i + 1).replace(/;$/, '');
      if (own) out.push(`${pad}${full}{${own}}`);
      stack.push(full);
      continue;
    }
    const r = ruleOf(line);
    if (top && r) { out.push(`${pad}${join(top, r[0])}{${r[1]}}`); continue; }
    out.push(pad + line);
  }
  return out.concat(frames).join('\n') + '\n';
}

module.exports = {pack, unpack, CSS};

if (require.main === module) {
  const src = fs.readFileSync(CSS, 'utf8');
  const flat = unpack(src);
  const packed = pack(flat);
  const back = unpack(packed);
  if (back !== flat) {
    const a = flat.split('\n'), b = back.split('\n');
    const k = a.findIndex((l, i) => l !== b[i]);
    console.error(`Khứ hồi lệch ở dòng ${k + 1}:\n  ${a[k]}\n  ${b[k]}`);
    process.exit(1);
  }
  const arg = process.argv[2];
  if (arg === '--check') { console.log(`Khứ hồi khớp · phẳng ${Buffer.byteLength(flat)} B · lồng ${Buffer.byteLength(packed)} B`); process.exit(0); }
  const text = arg === '--unpack' ? flat : packed;
  fs.writeFileSync(CSS, text);
  console.log(`Đã ghi ${arg === '--unpack' ? 'dạng phẳng' : 'dạng lồng'}: ${Buffer.byteLength(src)} → ${Buffer.byteLength(text)} byte`);
}

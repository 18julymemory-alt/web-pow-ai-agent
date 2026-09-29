#!/usr/bin/env node
// Lists the classes in dist/google-ads-lp.css that no Google Ads landing page
// uses, and (with --write) writes the stylesheet without the dead rules.
//
//   node scripts/ga-css-unused.cjs            → report
//   node scripts/ga-css-unused.cjs --write    → report + rewrite the CSS file
//   add --dom to also drop selectors that match nothing in the pages
//   (needs `node serve.mjs`; see domCheck below)
//
// "Used" = a class in the built HTML of the three pages, or any word inside a
// string in the scripts those pages load (classes added at run time).
// A selector is dead when it needs a class nobody uses; :is()/:where()/:has()
// are alive when one of their arguments is, :not() is ignored.
const fs = require('fs');
const path = require('path');
// the file is nested (see ga-css-pack.cjs): read it flat, write it nested
const {pack, unpack} = require('./ga-css-pack.cjs');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const CSS = path.join(DIST, 'google-ads-lp.css');
const PAGES = [
  'dich-vu/quang-cao-da-kenh/google-ads/index.html',
  'dich-vu/quang-cao-da-kenh/google-ads/chon-cach-chay/index.html',
  'dich-vu/quang-cao-da-kenh/google-ads/chi-phi-hieu-qua/index.html'
];
const SCRIPTS = ['google-ads-lp.js', 'navigation.js', 'navigation-data.js'];

// ---------------------------------------------------------------- used set
const used = new Set();
const inHtml = new Set();
for (const page of PAGES) {
  const html = fs.readFileSync(path.join(DIST, page), 'utf8');
  for (const m of html.matchAll(/\sclass="([^"]*)"/g)) m[1].split(/\s+/).forEach(c => c && used.add(c) && inHtml.add(c));
}
// Only words inside string literals count (comments do not add classes).
function jsStrings(js) {
  const out = [];
  for (let i = 0; i < js.length; i++) {
    const ch = js[i];
    if (ch === '/' && js[i + 1] === '*') { i = js.indexOf('*/', i + 2) + 1 || js.length; continue; }
    if (ch === '/' && js[i + 1] === '/') { i = js.indexOf('\n', i); if (i < 0) break; continue; }
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1;
      while (j < js.length && js[j] !== ch) j += js[j] === '\\' ? 2 : 1;
      out.push(js.slice(i + 1, j));
      i = j;
    }
  }
  return out;
}
for (const file of SCRIPTS) {
  const js = fs.readFileSync(path.join(DIST, file), 'utf8');
  for (const str of jsStrings(js)) for (const m of str.matchAll(/[A-Za-z_][\w-]*/g)) used.add(m[0]);
}

// ---------------------------------------------------------------- parser
// Nodes: {type:'rule', sel, body} | {type:'block', at, kids} | {type:'raw', text}
const BLOCK_AT = /^@(media|supports|container|layer|document)\b/;

function parse(src) {
  let i = 0;
  function skipComment() {
    const end = src.indexOf('*/', i + 2);
    i = end < 0 ? src.length : end + 2;
  }
  function readUntil(stops) {
    let out = '';
    let depth = 0;
    while (i < src.length) {
      const ch = src[i];
      if (ch === '/' && src[i + 1] === '*') { skipComment(); continue; }
      if (ch === '"' || ch === "'") {
        const q = ch; out += ch; i++;
        while (i < src.length && src[i] !== q) { if (src[i] === '\\') out += src[i++]; out += src[i++]; }
        out += src[i++] || ''; continue;
      }
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (!depth && stops.includes(ch)) return out;
      out += ch; i++;
    }
    return out;
  }
  function body() {
    // after '{' : read declarations up to the matching '}'
    let out = '';
    let depth = 1;
    while (i < src.length) {
      const ch = src[i];
      if (ch === '/' && src[i + 1] === '*') { skipComment(); continue; }
      if (ch === '"' || ch === "'") {
        const q = ch; out += ch; i++;
        while (i < src.length && src[i] !== q) { if (src[i] === '\\') out += src[i++]; out += src[i++]; }
        out += src[i++] || ''; continue;
      }
      if (ch === '{') depth++;
      if (ch === '}' && !--depth) { i++; return out; }
      out += ch; i++;
    }
    return out;
  }
  function list(untilClose) {
    const nodes = [];
    while (i < src.length) {
      while (i < src.length && /\s/.test(src[i])) i++;
      if (src[i] === '/' && src[i + 1] === '*') { skipComment(); continue; }
      if (i >= src.length) break;
      if (src[i] === '}') { if (untilClose) { i++; return nodes; } i++; continue; }
      const head = readUntil(['{', ';', '}']).trim();
      if (src[i] === ';') { i++; nodes.push({type: 'raw', text: head + ';'}); continue; }
      if (src[i] === '}') { continue; }
      i++; // '{'
      if (BLOCK_AT.test(head)) nodes.push({type: 'block', at: head, kids: list(true)});
      else if (head.startsWith('@')) nodes.push({type: 'raw', text: `${head}{${tidy(body())}}`, at: head});
      else nodes.push({type: 'rule', sel: head, body: body()});
    }
    return nodes;
  }
  return list(false);
}

function tidy(decls) {
  // one line per rule: collapse whitespace, keep the text of values
  // (strings are left exactly as written)
  return decls.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/).map((part, k) => k % 2 ? part
    : part.replace(/\s+/g, ' ').replace(/\s*;\s*/g, ';').replace(/^\s*([-\w]+)\s*:\s*/, '$1:').replace(/;([-\w]+)\s*:\s*/g, ';$1:'))
    .join('').replace(/;\s*$/, '').trim();
}

// ---------------------------------------------------------------- selectors
function splitTop(sel) {
  const parts = [];
  let depth = 0, cur = '';
  for (const ch of sel) {
    if (ch === '(' || ch === '[') depth++;
    if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && !depth) { parts.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

// Returns the missing classes that make a complex selector dead ([] = alive).
function missing(sel) {
  let rest = '';
  const dead = [];
  for (let i = 0; i < sel.length; i++) {
    const fn = /^:(is|where|has|matches|not|nth-child|nth-last-child|nth-of-type|nth-last-of-type|host|host-context|dir|lang)\(/.exec(sel.slice(i));
    if (fn) {
      let depth = 0, j = i + fn[0].length - 1;
      for (; j < sel.length; j++) {
        if (sel[j] === '(') depth++;
        if (sel[j] === ')' && !--depth) break;
      }
      const inner = sel.slice(i + fn[0].length, j);
      if (/^(is|where|has|matches)$/.test(fn[1])) {
        const alts = splitTop(inner).map(missing);
        if (!alts.some(m => !m.length)) dead.push(...alts.flat());
      }
      i = j;
      continue;
    }
    if (sel[i] === '[') { const j = sel.indexOf(']', i); i = j < 0 ? sel.length : j; continue; }
    rest += sel[i];
  }
  for (const m of rest.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) if (!used.has(m[1])) dead.push(m[1]);
  return dead;
}

// ---------------------------------------------------------------- DOM check
// A selector can use only live classes and still match nothing (".a .b" when
// .b never sits inside .a). Loosen each selector so it can only match MORE
// than the real one — drop :hover/:focus/::before…, attribute tests, :not(),
// and classes that only JS adds — then ask the pages (with and without JS,
// at 1440 and 390) whether anything matches.
const KEEP_PSEUDO = /^:(first-child|last-child|only-child|first-of-type|last-of-type|only-of-type|root)$/;

function splitCompounds(sel) {
  const parts = [];
  let depth = 0, cur = '';
  for (let i = 0; i < sel.length; i++) {
    const ch = sel[i];
    if (ch === '(' || ch === '[') depth++;
    if (ch === ')' || ch === ']') depth--;
    if (!depth && /[\s>+~]/.test(ch)) {
      if (cur) parts.push(cur);
      cur = '';
      let comb = '';
      while (i < sel.length && /[\s>+~]/.test(sel[i])) comb += sel[i++];
      i--;
      parts.push({comb: comb.trim() || ' '});
      continue;
    }
    cur += ch;
  }
  if (cur) parts.push(cur);
  return parts;
}

function loosenCompound(c) {
  let out = '';
  for (let i = 0; i < c.length;) {
    const fn = /^:(is|where|matches|has|not|nth-child|nth-last-child|nth-of-type|nth-last-of-type)\(/.exec(c.slice(i));
    if (fn) {
      let depth = 0, j = i + fn[0].length - 1;
      for (; j < c.length; j++) { if (c[j] === '(') depth++; if (c[j] === ')' && !--depth) break; }
      const inner = c.slice(i + fn[0].length, j);
      if (fn[1] === 'not') {} // more general without it
      else if (/^nth/.test(fn[1])) out += c.slice(i, j + 1);
      else out += `:${fn[1] === 'has' ? 'has' : 'is'}(${splitTop(inner).map(loosen).join(',')})`;
      i = j + 1;
      continue;
    }
    if (c[i] === '[') { const j = c.indexOf(']', i); i = j < 0 ? c.length : j + 1; continue; }
    const m = /^(::?[-\w]+|\.-?[_a-zA-Z][\w-]*|#[-\w]+|\*|[-\w]+)/.exec(c.slice(i));
    if (!m) { out += c[i++]; continue; }
    const tok = m[1];
    if (tok[0] === ':') { if (KEEP_PSEUDO.test(tok)) out += tok; }
    else if (tok[0] === '.') { if (inHtml.has(tok.slice(1))) out += tok; }
    else out += tok;
    i += tok.length;
  }
  return out || '*';
}

function loosen(sel) {
  const lead = /^\s*[>+~]/.test(sel) ? sel.trim()[0] + ' ' : '';
  return lead + splitCompounds(lead ? sel.trim().slice(1).trim() : sel.trim())
    .map(p => typeof p === 'string' ? loosenCompound(p) : (p.comb === ' ' ? ' ' : ` ${p.comb} `)).join('');
}

async function domCheck(selectors) {
  const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
  const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
  const browser = await chromium.launch({executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  const loose = [...new Set(selectors.map(loosen))];
  const hit = new Set();
  for (const js of [true, false]) {
    for (const width of [1440, 390]) {
      const ctx = await browser.newContext({javaScriptEnabled: js, viewport: {width, height: 900}});
      for (const page of PAGES) {
        const tab = await ctx.newPage();
        await tab.goto(`${base}/${page.replace(/index\.html$/, '')}`, {waitUntil: 'load'});
        const found = await tab.evaluate(list => list.filter(s => {
          try { return !!document.querySelector(s); } catch { return true; }
        }), loose.filter(s => !hit.has(s)));
        found.forEach(s => hit.add(s));
        await tab.close();
      }
      await ctx.close();
    }
  }
  await browser.close();
  return new Set(selectors.filter(s => !hit.has(loosen(s))));
}

// ---------------------------------------------------------------- walk
(async () => {
const src = fs.readFileSync(CSS, 'utf8');
const tree = parse(unpack(src));
const unused = new Map(); // class → bytes of selectors lost
let deadRules = 0, keptRules = 0;
let noMatch = new Set();

function allSelectors(nodes, acc = []) {
  for (const n of nodes) {
    if (n.type === 'rule') acc.push(...splitTop(n.sel));
    if (n.type === 'block') allSelectors(n.kids, acc);
  }
  return acc;
}
if (process.argv.includes('--dom')) {
  noMatch = await domCheck(allSelectors(tree).filter(s => !missing(s).length));
}

function prune(nodes) {
  const out = [];
  for (const n of nodes) {
    if (n.type === 'block') {
      const kids = prune(n.kids);
      if (kids.length) out.push({...n, kids});
      continue;
    }
    if (n.type !== 'rule') { out.push(n); continue; }
    const alts = splitTop(n.sel);
    const alive = alts.filter(s => {
      const miss = missing(s);
      miss.forEach(c => unused.set(c, (unused.get(c) || 0) + s.length + n.body.length / alts.length));
      if (!miss.length && noMatch.has(s)) { unused.set(s, (unused.get(s) || 0) + s.length + n.body.length / alts.length); return false; }
      return !miss.length;
    });
    if (!alive.length) { deadRules++; continue; }
    keptRules++;
    out.push({...n, sel: alive.join(',')});
  }
  return out;
}
let kept = prune(tree);

// Keyframes nobody animates with any more.
function decls(nodes, acc = []) {
  for (const n of nodes) {
    if (n.type === 'rule') acc.push(n.body);
    if (n.type === 'block') decls(n.kids, acc);
  }
  return acc;
}
const animText = decls(kept).join(';');
const deadFrames = [];
function dropFrames(nodes) {
  return nodes.filter(n => {
    const m = n.type === 'raw' && /^@(?:-webkit-)?keyframes\s+([\w-]+)/.exec(n.text);
    if (m && !new RegExp(`\\b${m[1]}\\b`).test(animText)) { deadFrames.push(m[1]); return false; }
    return true;
  }).map(n => n.type === 'block' ? {...n, kids: dropFrames(n.kids)} : n);
}
kept = dropFrames(kept);

// ---------------------------------------------------------------- output
function print(nodes, pad = '') {
  return nodes.map(n => {
    if (n.type === 'raw') return pad + n.text;
    if (n.type === 'block') return `${pad}${n.at.replace(/\s+/g, ' ')}{\n${print(n.kids, pad + '  ')}\n${pad}}`;
    const sel = splitTop(n.sel).map(s => s.replace(/\s+/g, ' ')).join(',');
    return `${pad}${sel}{${tidy(n.body)}}`;
  }).join('\n');
}

const list = [...unused.entries()].sort((a, b) => b[1] - a[1]);
console.log(`Class dùng trên 3 trang + JS: ${used.size} từ`);
console.log(`Rule còn dùng: ${keptRules} · rule chết: ${deadRules} · keyframes chết: ${deadFrames.length}`);
console.log(`Class CSS không dùng${noMatch.size ? ' / selector không khớp phần tử nào' : ''} (${list.length}):`);
for (const [c, bytes] of list) console.log(`  ${/[ .:>[]/.test(c) ? c : '.' + c}  ~${Math.round(bytes)} B`);

if (process.argv.includes('--write')) {
  const before = Buffer.byteLength(src);
  const text = pack('/* Google Ads landing pages (01 formats · 02 goals · 03 budget). Scoped to .ga-lp. */\n' + print(kept) + '\n');
  fs.writeFileSync(CSS, text);
  console.log(`\nĐã ghi ${path.relative(ROOT, CSS)}: ${before} → ${Buffer.byteLength(text)} byte`);
} else if (list.length) {
  process.exitCode = 1;
}
})();

// Interactions for the Google Ads landing pages.
// No dependencies, no Three.js. Every animation stops off-screen and under
// prefers-reduced-motion.

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------------- reveal on scroll ---------------- */
function reveals() {
  const items = $$('.rv');
  if (!items.length) return;
  if (reduced.matches || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, {rootMargin: '0px 0px -12% 0px', threshold: 0.08});
  items.forEach(el => io.observe(el));
}

/* ---------------- hero card stack ---------------- */
function heroStack() {
  const stack = $('#heroStack');
  if (!stack) return;
  const hero = stack.closest('.ga-hero');
  if (!hero || reduced.matches || !matchMedia('(pointer: fine)').matches) return;

  let raf = 0;
  let rx = 7;
  let ry = -15;

  const apply = () => {
    raf = 0;
    stack.style.setProperty('--rx', rx.toFixed(2) + 'deg');
    stack.style.setProperty('--ry', ry.toFixed(2) + 'deg');
  };
  const queue = () => {
    if (!raf) raf = requestAnimationFrame(apply);
  };

  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry = -15 + px * 14;
    rx = 7 - py * 10;
    queue();
  });
  hero.addEventListener('pointerleave', () => {
    rx = 7;
    ry = -15;
    queue();
  });
}

/* ---------------- ecosystem orbit ---------------- */
function orbit() {
  const stage = $('#gaOrbit');
  if (!stage) return;
  const nodes = $$('.orbit-node', stage);
  const details = $$('[data-orbit-detail]');
  if (!nodes.length) return;

  const n = nodes.length;
  const select = i => {
    nodes.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    details.forEach((d, j) => {
      d.hidden = j !== i;
    });
  };
  nodes.forEach((b, i) => b.addEventListener('click', () => select(i)));

  if (reduced.matches || !('IntersectionObserver' in window)) return;
  // On phones the orbit is laid out as a plain chip list (see the 760px media
  // query), so there is nothing to animate.
  const phone = matchMedia('(max-width: 760px)');
  if (phone.matches) return;

  let raf = 0;
  let angle = 0;
  let last = 0;

  const frame = now => {
    const dt = last ? Math.min(now - last, 50) : 16;
    last = now;
    angle += dt * 0.00004;
    for (let i = 0; i < n; i++) {
      const a = angle + (i / n) * Math.PI * 2;
      nodes[i].style.left = (50 + Math.cos(a) * 37).toFixed(2) + '%';
      nodes[i].style.top = (50 + Math.sin(a) * 30).toFixed(2) + '%';
    }
    raf = requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(entries => {
    const visible = entries.some(e => e.isIntersecting);
    if (visible && !raf) {
      last = 0;
      raf = requestAnimationFrame(frame);
    } else if (!visible && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }, {threshold: 0.05});
  io.observe(stage);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
}

/* ---------------- campaign picker ---------------- */
function campaigns() {
  const tabs = $$('[data-pick]');
  const panels = $$('[data-panel]');
  if (!panels.length) return;

  const selectCampaign = (id, scroll) => {
    if (!panels.some(p => p.dataset.panel === id)) return false;
    $$('.pick').forEach(b => b.setAttribute('aria-selected', String(b.dataset.pick === id)));
    panels.forEach(p => {
      p.hidden = p.dataset.panel !== id;
    });
    if (scroll) {
      const target = $(`#panel-${id}`);
      if (target) target.scrollIntoView({behavior: reduced.matches ? 'auto' : 'smooth', block: 'start'});
    }
    return true;
  };

  tabs.forEach(b => b.addEventListener('click', () => selectCampaign(b.dataset.pick, true)));
  return selectCampaign;
}

/* ---------------- format workbench ---------------- */
function workbench() {
  $$('.workbench').forEach(wb => {
    const buttons = $$('[data-format]', wb);
    const panes = $$('[data-format-pane]', wb);
    buttons.forEach(b => b.addEventListener('click', () => {
      buttons.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      panes.forEach(p => {
        p.hidden = p.dataset.formatPane !== b.dataset.format;
      });
    }));
  });
}

/* ---------------- keyword match ---------------- */
function matchTypes() {
  const seg = $$('[data-match]');
  if (!seg.length) return;
  const rings = $('#matchRings');
  const details = $$('[data-match-detail]');
  seg.forEach(b => b.addEventListener('click', () => {
    seg.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    if (rings) rings.dataset.m = b.dataset.match;
    details.forEach(d => {
      d.hidden = d.dataset.matchDetail !== b.dataset.match;
    });
  }));
}

/* ---------------- RSA composer ---------------- */
function rsa() {
  const fields = $$('[data-preview]');
  if (!fields.length) return;

  fields.forEach(field => {
    const limit = Number(field.dataset.limit) || 30;
    const wrap = field.closest('.fld');
    const meter = wrap ? $('.meter', wrap) : null;
    const bar = meter ? $('i', meter) : null;
    const count = wrap ? $('label b', wrap) : null;
    const out = $(`[data-preview-out="${field.dataset.preview}"]`);

    const sync = () => {
      const len = field.value.length;
      if (count) count.textContent = String(len);
      if (bar) bar.style.width = Math.min(100, (len / limit) * 100).toFixed(1) + '%';
      if (meter) meter.classList.toggle('over', len > limit);
      if (out) out.textContent = field.value.slice(0, limit) || '—';
    };
    field.addEventListener('input', sync);
    sync();
  });
}

/* ---------------- readiness checklist ---------------- */
function checklists() {
  $$('[data-checklist]').forEach(box => {
    const inputs = $$('input[type="checkbox"]', box);
    const ring = $('[data-ring]', box);
    const text = $('[data-ring-text]', box);
    if (!inputs.length || !ring) return;
    const total = 2 * Math.PI * 60;
    ring.setAttribute('stroke-dasharray', total.toFixed(1));

    const sync = () => {
      const done = inputs.filter(i => i.checked).length;
      const pct = done / inputs.length;
      ring.setAttribute('stroke-dashoffset', (total * (1 - pct)).toFixed(1));
      if (text) text.textContent = Math.round(pct * 100) + '%';
    };
    inputs.forEach(i => i.addEventListener('change', sync));
    sync();
  });
}

/* ---------------- consultation form ---------------- */
function brief() {
  const form = $('#gaBrief');
  if (!form) return;
  const status = $('[data-brief-status]', form);
  const say = key => {
    if (status) status.textContent = form.dataset[key] || '';
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    // A square bracket means the action is still the [FORM_ENDPOINT] placeholder,
    // so there is nowhere to post to yet — point the visitor at the hotline.
    const url = form.getAttribute('action') || '';
    if (url.startsWith('[')) {
      say('offlineNote');
      return;
    }

    if (status) status.textContent = 'Đang gửi…';
    try {
      const res = await fetch(url, {method: 'POST', body: new FormData(form)});
      if (res.ok) {
        form.reset();
        say('doneNote');
      } else {
        say('failNote');
      }
    } catch {
      say('failNote');
    }
  });
}

/* ---------------- sticky chapter index ---------------- */
function scrollspy() {
  const tocs = $$('.panel-toc');
  if (!tocs.length || !('IntersectionObserver' in window)) return;

  tocs.forEach(toc => {
    const links = $$('a', toc);
    const targets = links
      .map(a => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
      }
    }, {rootMargin: '-45% 0px -50% 0px'});
    targets.forEach(t => io.observe(t));
  });
}

/* ---------------- old anchors ---------------- */
const SHEET_URL = {
  formats: '/dich-vu/quang-cao-da-kenh/google-ads/',
  goals: '/dich-vu/quang-cao-da-kenh/google-ads/chon-cach-chay/',
  budget: '/dich-vu/quang-cao-da-kenh/google-ads/chi-phi-hieu-qua/'
};

const CAMPAIGN_IDS = ['search', 'pmax', 'shopping', 'demand', 'video', 'app'];

// The Facebook, TikTok, Zalo and ChatGPT pages share this script (body.fb-lp / tt-lp / zl-lp / cg-lp).
// Their old one-page guides used sheet-*, fb-*, fs-*, fd-*, tk-*, zl-* ids; every
// one of them now lands on page 01, on the matching ad type when there is one.
const FB_IDS = ['feed', 'stories', 'carousel', 'messaging', 'leadform', 'catalog'];
const FB_OLD_FORMAT = {
  'feed-image': 'feed', 'feed-video': 'feed', reels: 'stories', 'story-image': 'stories',
  'story-video': 'stories', carousel: 'carousel', collection: 'carousel'
};

function resolveFbHash(hash) {
  const id = hash.replace(/^#/, '');
  if (!id) return null;
  if (FB_IDS.includes(id)) return {sheet: 'formats', campaign: id};
  const m = id.match(/^fd-(?:panel|tab)-(.+)$/);
  if (m) return {sheet: 'formats', campaign: FB_OLD_FORMAT[m[1]]};
  if (/^(sheet|fb|fs)-/.test(id) || id === 'contact' || id === 'guide') return {sheet: 'formats'};
  return null;
}

const TT_IDS = ['infeed', 'spark', 'lead', 'shop', 'search', 'brand'];

function resolveTtHash(hash) {
  const id = hash.replace(/^#/, '');
  if (!id) return null;
  if (TT_IDS.includes(id)) return {sheet: 'formats', campaign: id};
  if (/^(sheet|tk)-/.test(id) || id === 'contact' || id === 'guide') return {sheet: 'formats'};
  return null;
}

const ZL_IDS = ['oa', 'web', 'form', 'msg', 'commerce', 'media'];

function resolveZlHash(hash) {
  const id = hash.replace(/^#/, '');
  if (!id) return null;
  if (ZL_IDS.includes(id)) return {sheet: 'formats', campaign: id};
  if (/^(sheet|zl)-/.test(id) || id === 'contact' || id === 'guide') return {sheet: 'formats'};
  return null;
}

const CG_IDS = ['card', 'pair', 'product', 'carousel', 'conv', 'agent'];

function resolveCgHash(hash) {
  const id = hash.replace(/^#/, '');
  if (!id) return null;
  if (CG_IDS.includes(id)) return {sheet: 'formats', campaign: id};
  if (/^(sheet|cg)-/.test(id) || id === 'contact' || id === 'guide') return {sheet: 'formats'};
  return null;
}

function resolveHash(hash) {
  const id = hash.replace(/^#/, '');
  if (!id) return null;

  const sheets = {
    'sheet-formats': {sheet: 'formats'},
    'sheet-overview': {sheet: 'formats'},
    'sheet-goals': {sheet: 'goals'},
    'sheet-demographics': {sheet: 'goals'},
    'sheet-audiences': {sheet: 'goals'},
    'sheet-compare': {sheet: 'goals'},
    'sheet-budget': {sheet: 'budget'},
    'sheet-measure': {sheet: 'budget'},
    'sheet-delivery': {sheet: 'budget'}
  };
  if (sheets[id]) return sheets[id];

  if (id === 'ga-panel-display' || id === 'atlas-display-specs') {
    return {sheet: 'formats', campaign: 'demand'};
  }
  if (CAMPAIGN_IDS.includes(id)) return {sheet: 'formats', campaign: id};

  const patterns = [/^format-(.+)$/, /^guide-(.+?)-\d+$/, /^atlas-(.+?)-[a-z]+$/];
  for (const re of patterns) {
    const m = id.match(re);
    if (m) {
      const c = m[1] === 'display' ? 'demand' : m[1];
      if (CAMPAIGN_IDS.includes(c)) return {sheet: 'formats', campaign: c};
    }
  }
  return null;
}

const sheetUrls = base => ({formats: base, goals: base + 'chon-cach-chay/', budget: base + 'chi-phi-hieu-qua/'});

// One row per channel, picked by body class; google is the default row.
const CHANNELS = [
  // One-page services: no legacy hashes to move, so nothing redirects.
  {cls: 'op-lp', urls: {}, resolve: () => null},
  {cls: 'fb-lp', urls: sheetUrls('/dich-vu/quang-cao-da-kenh/facebook-ads/'), resolve: resolveFbHash},
  {cls: 'tt-lp', urls: sheetUrls('/dich-vu/quang-cao-da-kenh/tiktok-ads/'), resolve: resolveTtHash},
  {cls: 'zl-lp', urls: sheetUrls('/dich-vu/quang-cao-da-kenh/zalo-ads/'), resolve: resolveZlHash},
  {cls: 'cg-lp', urls: sheetUrls('/dich-vu/quang-cao-da-kenh/chatgpt-ads/'), resolve: resolveCgHash},
  {cls: 'ga-lp', urls: SHEET_URL, resolve: resolveHash}
];
const CHANNEL = CHANNELS.find(ch => document.body.classList.contains(ch.cls)) || CHANNELS[CHANNELS.length - 1];

function legacyHash(selectCampaign) {
  const page = document.body.dataset.gaPage
    || ($('#page-content') && $('#page-content').dataset.gaPage);

  const handle = () => {
    const target = CHANNEL.resolve(location.hash);
    if (!target) return;
    if (target.sheet !== page) {
      const url = CHANNEL.urls[target.sheet];
      if (url) location.replace(url + (target.campaign ? '#' + target.campaign : ''));
      return;
    }
    if (target.campaign && selectCampaign) selectCampaign(target.campaign, true);
  };

  handle();
  addEventListener('hashchange', handle);
}

/* ---------------- visual kit: motion gate ----------------
   Blocks marked [data-anim] only animate while on screen. The CSS keys every
   animation off .is-live, and the resting style is the last frame, so under
   reduced motion nothing is added and the finished picture stays. */
function live() {
  const blocks = $$('[data-anim]');
  if (!blocks.length || !('IntersectionObserver' in window)) return;
  let io = null;
  const start = () => {
    if (io) return;
    io = new IntersectionObserver(entries => {
      for (const e of entries) e.target.classList.toggle('is-live', e.isIntersecting);
    }, {threshold: 0.15});
    blocks.forEach(el => io.observe(el));
  };
  const stop = () => {
    if (io) io.disconnect();
    io = null;
    blocks.forEach(el => el.classList.remove('is-live'));
  };
  if (!reduced.matches) start();
  reduced.addEventListener('change', () => (reduced.matches ? stop() : start()));
}

/* ---------------- visual kit: tabs ----------------
   Every one-of-many control (tier, station, bid strategy, budget part…) is a
   role=tablist. Arrow keys move, Home/End jump. [data-toggle] lets the open tab
   close again; [data-hover] also opens on pointer hover. */
function tabsets() {
  $$('[data-tabs]').forEach(set => {
    const tabs = $$('[role="tab"]', set).filter(t => t.closest('[data-tabs]') === set);
    if (!tabs.length) return;
    const list = tabs[0].closest('[role="tablist"]');
    const toggle = set.hasAttribute('data-toggle');

    const select = (tab, {focus = false, keep = false} = {}) => {
      const close = toggle && !keep && tab.getAttribute('aria-selected') === 'true';
      tabs.forEach(t => {
        const on = t === tab && !close;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = t === tab ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      set.dataset.active = close ? '' : (tab.dataset.key || String(tabs.indexOf(tab)));
      if (focus) tab.focus();
    };

    tabs.forEach(t => {
      t.addEventListener('click', () => select(t));
      if (set.hasAttribute('data-hover')) {
        t.addEventListener('pointerenter', e => {
          if (e.pointerType === 'mouse') select(t, {keep: true});
        });
      }
    });
    list.addEventListener('keydown', e => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const step = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}[e.key];
      let j;
      if (step) j = (i + step + tabs.length) % tabs.length;
      else if (e.key === 'Home') j = 0;
      else if (e.key === 'End') j = tabs.length - 1;
      else return;
      e.preventDefault();
      select(tabs[j], {focus: true, keep: true});
    });
  });
}

/* ---------------- visual kit: markers on mock-ups ---------------- */
function markers() {
  const all = () => $$('.v-marker[aria-expanded="true"]');
  document.addEventListener('click', e => {
    const m = e.target.closest('.v-marker');
    all().forEach(x => { if (x !== m) x.setAttribute('aria-expanded', 'false'); });
    if (m) m.setAttribute('aria-expanded', String(m.getAttribute('aria-expanded') !== 'true'));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') all().forEach(x => x.setAttribute('aria-expanded', 'false'));
  });
}

/* ---------------- visual kit: character counters ---------------- */
function counters() {
  $$('[data-counter]').forEach(box => {
    const field = $('input, textarea', box);
    const count = $('.v-count b', box);
    const bar = $('.v-meter i', box);
    if (!field) return;
    const limit = Number(field.dataset.limit) || 1;
    const update = () => {
      const n = Array.from(field.value).length;
      if (count) count.textContent = n;
      if (bar) bar.style.setProperty('--v', Math.min(n / limit, 1).toFixed(3));
      box.toggleAttribute('data-over', n > limit);
    };
    field.addEventListener('input', update);
    update();
  });
}

/* ---------------- measurement demo ----------------
   Tapping a button on the landing phone shows its screen (tabsets does that),
   sends a dot down the wires and adds one to that event's row in the report. */
function measure() {
  $$('[data-meas]').forEach(box => {
    const tabs = $$('[role="tab"]', box);
    const rows = $$('td[data-key]', box);
    const mark = key => rows.forEach(td => td.parentElement.classList.toggle('is-on', td.dataset.key === key));
    const current = () => tabs.find(t => t.getAttribute('aria-selected') === 'true');
    mark(current() && current().dataset.key);
    tabs.forEach(t => t.addEventListener('click', () => {
      const td = rows.find(r => r.dataset.key === t.dataset.key);
      mark(t.dataset.key);
      if (!td) return;
      td.innerHTML = `<span class="meas-n">${Number(td.textContent) + 1}</span>`;
      box.classList.remove('is-send');
      void box.offsetWidth;
      box.classList.add('is-send');
    }));
    // arrow keys move the selection without a click: follow it, no count
    box.addEventListener('keyup', () => { const t = current(); if (t) mark(t.dataset.key); });
    box.addEventListener('animationend', e => { if (e.animationName === 'meas-send' || e.animationName === 'meas-send-y') box.classList.remove('is-send'); });
  });
}

/* ---------------- boot ---------------- */
/* ---------------- budget calculator (page 03) ----------------
   Plain multiplication. Empty until the visitor types: the page never
   proposes a budget or a cost per lead. */
function calculator() {
  $$('[data-calc]').forEach(box => {
    const get = k => Number(($(`[data-c="${k}"]`, box) || {}).value) || 0;
    const out = k => $(`[data-o="${k}"]`, box);
    const fmt = n => Math.round(n).toLocaleString('vi-VN');
    const sync = () => {
      const daily = get('daily');
      const days = get('days');
      const cpl = get('cpl');
      const spend = daily * days;
      out('spend').textContent = spend ? fmt(spend) + '₫' : '—';
      out('leads').textContent = spend && cpl ? '≈ ' + fmt(spend / cpl) : '—';
    };
    $$('input', box).forEach(i => i.addEventListener('input', sync));
    sync();
  });
}

live();
calculator();
tabsets();
measure();
markers();
counters();
reveals();
heroStack();
orbit();
const selectCampaign = campaigns();
workbench();
matchTypes();
rsa();
checklists();
brief();
scrollspy();
legacyHash(selectCampaign);

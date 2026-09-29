// Zalo Ads landing page 01 — "Cách chạy & định dạng".
// Same frame as the Google, Facebook and TikTok page 01 (hero, steps bar,
// orbit, picker, six panels of six chapters, recap). Every panel is rendered
// server-side and hidden when inactive; dist/google-ads-lp.js only toggles
// visibility.

import {SOURCES, TYPES, JOURNEY, PANELS} from './data.mjs';
import {renderZl, measureAd, measureScenes, heroStack, pickArtZl} from './mocks.mjs';
import {esc, section, stepsBar, sourceList, icon, ZL_PAGES} from '../google-ads-lp/shared.mjs';
import {
  keyPoint, ratioFrame, charBox, more, filePic, chipsPic, framesPic, durationPic, shot, machine
} from '../google-ads-lp/visuals.mjs';
import {
  heroBlock, orbitSection, pickerBlock, panelShell, chapterHead, splitFirst, flowList,
  blueprint, specTile, assetFolder, specDrawer, filesBody, measureDemo, noteCard,
  pathsBody, checklistBlock, recapSection
} from '../google-ads-lp/panel-kit.mjs';
import {workbench, setupScreen, suField, suOpts, suToggles, suThumbs, suReview} from '../google-ads-lp/scenes.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu Zalo Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu Zalo Ads:'});

// Sources shown under each chapter, per type.
const CHAPTER_SOURCES = {
  oa: {look: ['oa', 'formats'], files: ['oa', 'license'], measure: ['oa', 'pricing'], paths: ['oa', 'audience']},
  web: {look: ['website', 'article'], files: ['website', 'article'], measure: ['pixel', 'pixelOpt'], paths: ['website', 'budgetBid']},
  form: {look: ['form'], files: ['form', 'formRules'], measure: ['form', 'formRules'], paths: ['form', 'audience']},
  msg: {look: ['message'], files: ['message'], measure: ['message', 'pricing'], paths: ['message', 'audience']},
  commerce: {look: ['commerce'], files: ['commerce', 'license'], measure: ['commerce', 'pricing'], paths: ['commerce', 'budgetBid']},
  media: {look: ['video', 'videoDiary', 'formats'], files: ['video', 'videoDiary'], measure: ['video', 'pricing'], paths: ['formats', 'budgetBid']}
};
const HOW_SOURCES = ['setup', 'pricing', 'budgetBid'];
const PLAY_SOURCES = ['setup', 'license'];

const RECAP_ICONS = {oa: 'verified', web: 'page', form: 'form', msg: 'chat', commerce: 'cart', media: 'play'};

/* ------------------------------------------------------------------ *
 * Hero, orbit, picker
 * ------------------------------------------------------------------ */
function hero() {
  return heroBlock({
    crumb: 'Zalo Ads',
    eyebrow: 'POWAI / ZALO ADS',
    title: 'Zalo Ads',
    sub: 'Từ một quảng cáo đến <em>một cuộc trò chuyện có thể đo</em>.',
    lead: 'Quảng cáo Zalo hiện giữa Nhật ký, trong bài viết và trên các trang thuộc mạng Zalo. Khách bấm là quan tâm OA, '
      + 'mở website, điền form, nhắn tin hoặc đặt hàng ngay trong Zalo. Trang này mở từng kiểu: trông như thế nào, chạy ra sao, '
      + 'cần chuẩn bị gì và đo điều gì.',
    primary: ['#campaigns', 'Khám phá sáu kiểu quảng cáo'],
    ghost: ['/lien-he/', 'Trao đổi nhu cầu'],
    stage: heroStack()
  });
}

// See, tap, arrive, talk, confirm.
const ORBIT_ICONS = ['eye', 'tap', 'page', 'chat', 'check'];

function orbit() {
  return orbitSection({
    journey: JOURNEY,
    icons: ORBIT_ICONS,
    head: {
      eyebrow: 'HÀNH TRÌNH',
      title: 'Khách đang đọc tin. Quảng cáo phải mở ra một cuộc trò chuyện.',
      lead: 'Từ lúc thấy quảng cáo tới lúc được xác nhận là khách có năm chặng. Chọn từng chặng để xem điều gì diễn ra.'
    },
    hint: 'Năm chặng quay quanh một tài khoản quảng cáo. Chọn một chặng để đọc chi tiết.'
  });
}

function picker() {
  return pickerBlock({
    types: TYPES,
    art: pickArtZl,
    label: 'Kiểu quảng cáo',
    head: {
      eyebrow: 'SÁU KIỂU QUẢNG CÁO',
      title: 'Chọn một kiểu để xem<br> toàn bộ cách chạy.',
      lead: 'Mỗi kiểu dẫn khách tới một nơi khác nhau và đo bằng một con số khác nhau. Nội dung bên dưới đổi theo lựa chọn.',
      big: true
    }
  });
}

/* ------------------------------------------------------------------ *
 * 01 — what it looks like
 * ------------------------------------------------------------------ */
function chapterLook(c, p) {
  const list = p.formats.map(([fid, name], i) => `<button type="button" data-format="${fid}" aria-pressed="${i === 0}">`
    + `<span>${esc(name)}</span></button>`).join('');

  const panes = p.formats.map(([fid, name, where, what], i) => `<div class="wb-pane" data-format-pane="${fid}"${i ? ' hidden' : ''}>`
    + '<div class="wb-body">'
    + `<h4>${esc(name)}</h4>`
    + '<dl class="wb-facts">'
    + `<div><dt>Hiển thị ở đâu</dt><dd>${esc(where)}</dd></div>`
    + `<div><dt>Nội dung gì</dt><dd>${esc(what)}</dd></div>`
    + '</dl></div>'
    + `<div class="stage"><span class="demo-tag">MÔ PHỎNG</span><div class="device">${renderZl(fid)}</div>`
    + '<p class="stage-cap">Vẽ lại bố cục để hình dung vị trí hiển thị. Giao diện thật do Zalo quyết định và đổi theo phiên bản ứng dụng.</p>'
    + '</div></div>').join('');

  return `<section class="chap rv" id="ch-look-${c.id}">`
    + chapterHead('01 · TRÔNG NHƯ THẾ NÀO', 'Quảng cáo xuất hiện ở đâu.',
      'Chọn một vị trí để xem quảng cáo nằm giữa nội dung thật ra sao, và khách thấy gì sau khi bấm.')
    + `<div class="workbench"><div class="wb-list">${list}</div><div class="wb-panes">${panes}</div></div>`
    + src(CHAPTER_SOURCES[c.id].look)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 02 — how it runs
 * ------------------------------------------------------------------ */
const FLOW_ICONS = ['users', 'auction', 'eye', 'tap', 'chat'];

const ICON_WORDS = [
  [/video/i, 'video'], [/ảnh|banner/i, 'image'], [/sản phẩm|giá/i, 'tag'], [/mô tả|chữ/i, 'creative'],
  [/OA|hồ sơ/i, 'verified'], [/website|trang|bài viết/i, 'page'], [/pixel|sự kiện/i, 'code'], [/tin nhắn|trò chuyện|lời chào/i, 'chat'],
  [/câu hỏi|form/i, 'form'], [/ngành/i, 'stamp'], [/người|nhân viên/i, 'users'], [/số điện thoại|danh sách/i, 'phone'],
  [/đơn/i, 'cart'], [/lượt hiển thị|lượt xem/i, 'eye'], [/quan tâm/i, 'plus']
];
function guessIcon(text, fallback = 'check') {
  const hit = ICON_WORDS.find(([re]) => re.test(text));
  return hit ? hit[1] : fallback;
}

// What goes in, what Zalo Ads does with it, what comes back.
function howMachine(c, p) {
  const [gain, caveat] = String(p.outputs).split(/;\s*/);
  return '<div class="how-io">' + machine({
    inputs: {title: 'Bạn đưa vào', items: p.inputs.map(label => ({icon: guessIcon(label), label}))},
    core: {icon: 'gear', label: 'Zalo Ads phân phối', note: c.title},
    outputs: {title: 'Bạn nhận lại', items: [{icon: guessIcon(gain, 'convert'), label: gain}]}
  }) + (caveat ? `<p class="how-io-note">${icon('alert')}<span>${esc(caveat)}</span></p>` : '') + '</div>';
}

// "Cách tính phí": the pricing codes this type can use, from p.billing.
function billingBox(p) {
  return '<div class="zl-bill rv"><small>' + icon('coin') + 'Cách tính phí</small><ul>'
    + p.billing.map(([code, text]) => `<li><b>${esc(code)}</b><span>${esc(text)}</span></li>`).join('')
    + '</ul></div>';
}

// Objective, audience & bid, content, licence & review — drawn on the same
// neutral set-up window as the other channels.
const SETUP_RAIL = ['Mục tiêu', 'Đối tượng & giá thầu', 'Nội dung', 'Giấy phép & gửi duyệt'];
const SETUP_URL = 'quang-cao › tao-moi';

function setupBlocks(c, p) {
  const s = p.setup;
  const screen = (step, title, body) => setupScreen({step, title, body, url: SETUP_URL, steps: SETUP_RAIL});
  const on = (s.pick.find(([, st]) => st === 'on') || s.pick[0])[0];
  const body = (t, text, rest) => `<h4>${esc(t)}</h4><p class="wb-sub">${esc(text)}</p>`
    + (rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp', cls: 'wb-more'}) : '');

  const items = [
    {key: `${c.id}-s0`, label: SETUP_RAIL[0], icon: 'target',
      body: body('Chọn hình thức quảng cáo', `Kiểu này tạo bằng hình thức ${on}.`,
        'Hình thức quyết định khách đi đâu sau khi bấm và bạn trả tiền cho hành động nào. Đổi hình thức là tạo quảng cáo mới.'),
      stage: screen(0, `${SETUP_RAIL[0]} · Hình thức`, suOpts(s.pick, {group: 'Hình thức quảng cáo'}))},
    {key: `${c.id}-s1`, label: SETUP_RAIL[1], icon: 'sliders',
      body: body('Đối tượng, cách tính phí, ngân sách', `Đối tượng mẫu: ${s.audience}. Tính phí: ${s.pricing}.`,
        'Đối tượng càng hẹp, giá càng cao và càng khó phân phối. Bắt đầu rộng rồi thu hẹp theo số đo thật.'),
      stage: screen(1, `${SETUP_RAIL[1]} · Cài đặt`,
        suField('Đối tượng', s.audience, {ic: 'users'})
        + suField('Tính phí', s.pricing, {ic: 'coin', chip: ['Đã chọn', 'good']})
        + (s.budget ? suField('Ngân sách', s.budget, {ic: 'wallet'}) : '')
        + (s.placements ? suToggles(s.placements) : ''))},
    {key: `${c.id}-s2`, label: SETUP_RAIL[2], icon: 'image',
      body: body(c.id === 'media' ? 'Video và ảnh bìa' : 'Ảnh 1024 × 533 và mô tả ngắn',
        c.id === 'media' ? 'Một video ngắn, ảnh bìa và mô tả.' : 'Ảnh ngang, sản phẩm ở giữa, mô tả dưới 90 ký tự.',
        'Đưa vài ảnh khác nhau để so. Giữ chữ trên ảnh ít: nội dung đã có dòng mô tả.'),
      stage: screen(2, `${SETUP_RAIL[2]} · Nội dung`, suThumbs(s.ad))},
    {key: `${c.id}-s3`, label: SETUP_RAIL[3], icon: 'stamp',
      body: body('Giấy phép, rồi gửi duyệt', 'Ngành cần giấy phép phải tải lên trước khi gửi. Zalo duyệt trong 30–60 phút.',
        'Trang đích, người trực và cách đo phải sẵn sàng từ lúc quảng cáo được duyệt.'),
      stage: screen(3, 'Gửi duyệt · Trình tự', suReview([...p.how.slice(0, 4), 'Gửi duyệt · Zalo duyệt trong 30–60 phút']))}
  ];

  return workbench(items, {cls: 'wb-guide', tag: 'CÀI ĐẶT MẪU',
    cap: 'Màn hình cài đặt vẽ lại để minh họa; tên mục và thứ tự thật do Zalo Ads quyết định.'});
}

function chapterHow(c, p) {
  return `<section class="chap rv" id="ch-how-${c.id}">`
    + chapterHead('02 · CHẠY NHƯ THẾ NÀO', 'Từ lúc thấy tới lúc trò chuyện.',
      'Chuỗi dưới đây là đường đi của một lượt hiển thị, không phải cam kết kết quả.')
    + flowList(p.how, FLOW_ICONS)
    + howMachine(c, p)
    + billingBox(p)
    + setupBlocks(c, p)
    + src(HOW_SOURCES)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 03 — what to prepare
 * ------------------------------------------------------------------ */
// Sample copy per kind; the longest one inside the limit is used, so each
// counter opens on a real example that fits.
const SAMPLES = {
  primary: ['Nến sáp đậu nành, đốt đến 40 giờ.', 'Nến sáp đậu nành mùi oải hương, đốt đến 40 giờ. Quan tâm OA để nhận ưu đãi.'],
  name: ['Chào khách mới', 'Chào khách mới · Nến thơm tháng 10'],
  message: ['Chào bạn! Nhà Thơm có thể giúp gì ạ?',
    'Chào bạn! Cảm ơn bạn đã nhắn cho Nhà Thơm. Bạn đang tìm nến cho phòng ngủ, phòng khách hay làm quà tặng? '
    + 'Chọn một nút bên dưới hoặc nhắn câu hỏi, nhân viên trả lời trong 5 phút (8:00–21:00).']
};
const fit = (kind, limit) => SAMPLES[kind].filter(t => [...t].length <= limit).pop() || SAMPLES[kind][0];

// The 1024 × 533 frame with the centre band marked. Zalo does not publish an
// exact safe zone; the shape is an illustration only.
function safePic() {
  return `<span class="zls-safe"><i class="photo">${shot('s-shelf')}</i><b>Giữa ảnh</b></span>`;
}

function specPicture(name, spec) {
  if (/^Vùng an toàn/.test(name)) return safePic();
  if (/^Thời lượng/.test(name)) return durationPic('0:00', '1:00');
  const ratios = spec.match(/\d+(?:\.\d+)?:\d+/g) || [];
  if (ratios.length > 1) return framesPic(ratios, {video: true});
  if (/MB/.test(spec)) return filePic('MP4', (spec.match(/\d+\s?MB/) || ['150 MB'])[0]);
  if (/ · /.test(spec)) return chipsPic(spec.split(' · ').slice(0, 5));
  const ic = [[/giấy phép/i, 'stamp'], [/duyệt/i, 'clock'], [/ngân sách/i, 'wallet'], [/câu hỏi/i, 'form'],
    [/sản phẩm/i, 'box'], [/đơn/i, 'store'], [/rectangle/i, 'image'], [/banner/i, 'layers']].find(([re]) => re.test(name));
  return `<span class="sp-ico">${icon(ic ? ic[1] : 'file')}</span>`;
}

function chapterFiles(c, p) {
  const texts = [];
  const frames = [];
  const tiles = [];

  p.specs.forEach(([name, spec], i) => {
    const limit = spec.match(/([\d.]+) ký tự/);
    const dims = spec.match(/(\d+)\s*×\s*(\d+)/);
    if (limit) {
      const n = Number(limit[1].replace(/\./g, ''));
      const kind = /^Tên/.test(name) ? 'name' : /^Nội dung/.test(name) ? 'message' : 'primary';
      texts.push(charBox({id: `fc-${c.id}-${i}`, label: `${name} · ${spec}`, text: fit(kind, n), limit: n,
        multiline: kind !== 'name'}));
    } else if (/^Ảnh/.test(name) && dims) {
      const [w, h] = [Number(dims[1]), Number(dims[2])];
      const size = (spec.match(/tối đa \d+ MB/) || [''])[0];
      frames.push(ratioFrame({w, h, ratio: `${w} × ${h}`, label: name, img: 's-shelf', size}));
    } else {
      tiles.push(specTile(specPicture(name, spec), name, spec));
    }
  });

  return `<section class="chap rv" id="ch-files-${c.id}">`
    + chapterHead('03 · CẦN CHUẨN BỊ GÌ', 'Nội dung và thông số.')
    + keyPoint(c.id === 'media'
      ? 'Video ngắn, rõ ngay từ giây đầu, kèm ảnh bìa đúng kích thước. Số ký tự là giới hạn của Zalo Ads; phần dài hơn không nhập được.'
      : 'Ảnh ngang 1024 × 533, sản phẩm và chữ đặt giữa ảnh. Số ký tự là giới hạn của Zalo Ads; phần dài hơn không nhập được.',
    {ic: 'layers', label: 'NGUYÊN TẮC'})
    + filesBody({board: blueprint(texts, frames), tiles, folder: assetFolder(p.assets), detail: specDrawer(p.specs)})
    + src(CHAPTER_SOURCES[c.id].files)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 04 — what to measure: the button on the ad, the screen behind it, the
 * report row with the team's confirmation
 * ------------------------------------------------------------------ */
const VERIFY = {
  follow: ['Người quan tâm mới', 'good'],
  oapage: ['Chỉ là tín hiệu', 'consider'],
  view: ['Chỉ là tín hiệu', 'consider'],
  site: ['Chỉ là tín hiệu', 'consider'],
  article: ['Chỉ là tín hiệu', 'consider'],
  pdp: ['Chỉ là tín hiệu', 'consider'],
  zbtn: ['Chưa trả lời', 'consider'],
  chat: ['Đã trả lời', 'consider'],
  msgsent: ['Đã trả lời', 'consider'],
  call: ['Cần gọi lại', 'consider'],
  formopen: ['Chưa gửi', 'fix'],
  lead: ['Cần gọi lại', 'consider'],
  order: ['Khớp đơn thật', 'good'],
  orderform: ['Chờ xác nhận', 'consider'],
  crm: ['Đã tư vấn', 'good']
};

// Sample counts, falling down the funnel.
const MEAS_COUNTS = {
  oa: [48, 60, 14, 6], web: [52, 18, 9, 5], form: [40, 22, 9],
  msg: [36, 28, 8, 6], commerce: [44, 16, 7], media: [80, 12, 5]
};

function chapterMeasure(c, p) {
  const items = p.measure.map(([label, kind, ic, event, what]) => ({label, kind, ic, event, what}));
  const verify = c.id === 'form' ? {...VERIFY, crm: ['Phù hợp', 'good']}
    : c.id === 'commerce' ? {...VERIFY, crm: ['Đã giao', 'good']} : VERIFY;
  const [first, rest] = splitFirst(p.track);

  return `<section class="chap rv" id="ch-measure-${c.id}">`
    + chapterHead('04 · ĐO ĐIỀU GÌ', 'Kết quả chỉ đọc được khi đã đo.')
    + keyPoint(first, {ic: 'chart', label: 'CẦN ĐO', extra: rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp'}) : ''})
    + measureDemo({
      id: c.id, items, verify, fab: {},
      scenes: measureScenes(c.id),
      screen: measureAd(c.id),
      verifyHead: c.id === 'commerce' ? 'Đơn đã giao' : 'Đội tư vấn xác nhận',
      title: 'Báo cáo · số mẫu',
      counts: MEAS_COUNTS[c.id],
      evLabel: 'Zalo Ads ghi nhận',
      label: 'Nút trên quảng cáo',
      steps: ['Khách bấm trên quảng cáo', 'Điều khách thấy', 'Báo cáo ghi nhận'],
      cap: 'Bấm từng nút trên quảng cáo ở bước 1 để xem màn hình khách nhận được và dòng được cộng vào báo cáo.'
    })
    + '<div class="notes" data-anim>'
    + noteCard('bid', 'GIÁ THẦU', p.bid)
    + noteCard('warn', 'LƯU Ý', p.caution)
    + '</div>'
    + src(CHAPTER_SOURCES[c.id].measure)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 05 — paths and diagnosis; 06 — checklist
 * ------------------------------------------------------------------ */
function chapterPaths(c, p) {
  return `<section class="chap rv" id="ch-paths-${c.id}">`
    + chapterHead('05 · CÁCH TRIỂN KHAI', 'Hướng đi và cách đọc khi có vấn đề.',
      'Số trong bảng là số mẫu để minh họa cách đọc, không phải kết quả dự kiến.')
    + pathsBody(p.paths, p.diagnosis, p.diag)
    + src(CHAPTER_SOURCES[c.id].paths)
    + '</section>';
}

function chapterPlay(c, p) {
  return `<section class="chap rv" id="ch-play-${c.id}">`
    + chapterHead('06 · TRƯỚC KHI CHẠY', 'Danh sách kiểm tra.',
      'Đánh dấu từng mục để xem mức sẵn sàng. Trạng thái chỉ lưu trên trình duyệt của bạn.')
    + checklistBlock(c.id, p.checks)
    + src(PLAY_SOURCES)
    + '</section>';
}

function panel(c, i) {
  const p = PANELS[c.id];
  return panelShell({
    c, i,
    extra: src(c.sourceKeys),
    chapters: chapterLook(c, p) + chapterHow(c, p) + chapterFiles(c, p)
      + chapterMeasure(c, p) + chapterPaths(c, p) + chapterPlay(c, p)
  });
}

/* ------------------------------------------------------------------ */
function recap() {
  return recapSection({
    types: TYPES,
    icons: RECAP_ICONS,
    head: {
      eyebrow: 'NHỚ NHANH',
      title: 'Sáu kiểu, sáu nơi khách đến.',
      lead: 'Chọn một ô để quay lại đúng phần nội dung ở trên.'
    },
    next: {
      eyebrow: 'BƯỚC TIẾP THEO',
      title: 'Chưa rõ nên chạy kiểu nào?',
      text: 'Trang tiếp theo đi từ mục tiêu kinh doanh, mức sẵn sàng của khách và đối tượng để chọn cách chạy.',
      href: ZL_PAGES[1].href,
      cta: ZL_PAGES[1].num + ' ' + ZL_PAGES[1].label
    }
  });
}

export function formatsPage() {
  return hero()
    + stepsBar('formats', ZL_PAGES, STEPS_LABEL)
    + orbit()
    + section({id: 'campaigns', inner: picker() + TYPES.map(panel).join('')})
    + recap();
}

export const formatsMeta = {
  title: 'Zalo Ads: cách chạy và định dạng quảng cáo',
  description: 'Sáu kiểu quảng cáo Zalo: Official Account, website & bài viết, Form, tin nhắn, Commerce, video & display — '
    + 'trông như thế nào, chạy ra sao, cần chuẩn bị gì và đo điều gì.'
};

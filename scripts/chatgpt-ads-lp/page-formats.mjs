// ChatGPT Ads landing page 01 — "Cách chạy & định dạng".
// Same frame as the Google, Facebook, TikTok and Zalo page 01 (hero, steps
// bar, orbit, picker, six panels of six chapters, recap), plus a block with
// OpenAI's three principles for ads. Every panel is rendered server-side and
// hidden when inactive; dist/google-ads-lp.js only toggles visibility.

import {SOURCES, CHECKED, TYPES, JOURNEY, PRINCIPLES, PANELS} from './data.mjs';
import {renderCg, measureAd, measureScenes, heroStack, pickArtCg, feedSheet, agentSheet} from './mocks.mjs';
import {esc, section, stepsBar, sourceList, icon, secHead, CG_PAGES} from '../google-ads-lp/shared.mjs';
import {keyPoint, ratioFrame, charBox, more, chipsPic, shot, machine} from '../google-ads-lp/visuals.mjs';
import {
  heroBlock, orbitSection, pickerBlock, panelShell, chapterHead, splitFirst, flowList,
  blueprint, specTile, assetFolder, specDrawer, filesBody, measureDemo, noteCard,
  pathsBody, checklistBlock, recapSection
} from '../google-ads-lp/panel-kit.mjs';
import {workbench, setupScreen, suField, suOpts, suToggles, suThumbs, suReview} from '../google-ads-lp/scenes.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu ChatGPT Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu OpenAI:'});
const dateVi = iso => iso.split('-').reverse().join('/');
export const UPDATED = `<small class="cg-upd">${icon('clock')}Cập nhật theo tài liệu OpenAI ngày ${dateVi(CHECKED)}</small>`;

// Sources shown under each chapter, per type.
const CHAPTER_SOURCES = {
  card: {look: ['inChat', 'basics'], files: ['ads', 'bulk'], measure: ['results', 'quickstart'], paths: ['hints', 'policies']},
  pair: {look: ['inChat', 'ads'], files: ['ads', 'bulk'], measure: ['results', 'quickstart'], paths: ['hints', 'adGroups']},
  product: {look: ['feedCamp', 'basics'], files: ['feeds', 'feedCamp'], measure: ['results', 'events'], paths: ['feeds', 'feedCamp']},
  carousel: {look: ['feedCamp', 'dev'], files: ['feeds', 'feedCamp'], measure: ['results', 'events'], paths: ['feeds', 'events']},
  conv: {look: ['convCamp', 'pixel'], files: ['convCamp', 'events'], measure: ['convMeasure', 'results'], paths: ['convCamp', 'capi']},
  agent: {look: ['agents'], files: ['agents'], measure: ['agents', 'pixel'], paths: ['agents', 'expand']}
};
const HOW_SOURCES = ['campaigns', 'adGroups', 'hints'];
const PLAY_SOURCES = ['policies', 'account'];

const RECAP_ICONS = {card: 'page', pair: 'layers', product: 'tag', carousel: 'list', conv: 'convert', agent: 'chat'};

/* ------------------------------------------------------------------ *
 * Hero, orbit, principles, picker
 * ------------------------------------------------------------------ */
function hero() {
  return heroBlock({
    crumb: 'ChatGPT Ads',
    eyebrow: 'POWAI / CHATGPT ADS',
    title: 'ChatGPT Ads',
    sub: 'Xuất hiện đúng lúc khách <em>đang hỏi về nhu cầu</em> của họ.',
    lead: 'Quảng cáo trong ChatGPT nằm dưới cuối câu trả lời, gắn nhãn "Được tài trợ" và tách khỏi câu trả lời. '
      + 'OpenAI mở ChatGPT Ads tại Việt Nam từ 23/09/2026. Trang này mở từng kiểu: trông như thế nào, chạy ra sao, '
      + 'cần chuẩn bị gì và đo điều gì. ' + UPDATED,
    primary: ['#campaigns', 'Khám phá sáu kiểu quảng cáo'],
    ghost: ['/lien-he/', 'Trao đổi nhu cầu'],
    stage: heroStack()
  });
}

// Ask, answer, sponsored card, tap, landing page, confirmed.
const ORBIT_ICONS = ['thought', 'shield', 'tag', 'tap', 'page', 'check'];

function orbit() {
  return orbitSection({
    journey: JOURNEY,
    icons: ORBIT_ICONS,
    core: 'CUỘC TRÒ CHUYỆN',
    head: {
      eyebrow: 'HÀNH TRÌNH',
      title: 'Khách đang hỏi. Quảng cáo nằm dưới câu trả lời.',
      lead: 'Từ câu hỏi tới đơn hàng có sáu chặng. Chọn từng chặng để xem điều gì diễn ra và ai thấy được gì.'
    },
    hint: 'Sáu chặng quay quanh một cuộc trò chuyện. Chọn một chặng để đọc chi tiết.'
  });
}

// OpenAI's three principles, each drawn as a small picture.
const PRINCIPLE_ART = {
  shield: () => '<span class="cg-pr-art is-split"><span class="cg-pr-ans"><i class="cgm-dot"></i><s></s><s></s><s></s></span>'
    + `<span class="cg-pr-rule">Được tài trợ</span><span class="cg-pr-ad"><s></s><i class="photo">${shot('s6')}</i></span></span>`,
  lock: () => `<span class="cg-pr-art is-lock"><span class="cg-pr-bub"><s></s><s></s></span><i>${icon('lock')}</i>`
    + `<span class="cg-pr-agg">${icon('chart')}<b>Số liệu tổng hợp</b></span></span>`,
  sliders: () => '<span class="cg-pr-art is-ctl">'
    + [['close', 'Ẩn'], ['flag', 'Báo cáo'], ['need', 'Vì sao?']].map(([ic, t]) => `<span>${icon(ic)}${t}</span>`).join('')
    + '<span class="cg-pr-tgl"><b>Cá nhân hóa</b><i></i></span></span>'
};

function principles() {
  const cards = PRINCIPLES.map(([ic, title, text, keys]) => '<article class="cg-pr">'
    + PRINCIPLE_ART[ic]()
    + `<span class="cg-pr-ico">${icon(ic)}</span><h3>${esc(title)}</h3><p>${esc(text)}</p>${src(keys)}</article>`).join('');
  return section({
    id: 'nguyen-tac',
    inner: secHead({eyebrow: 'BA NGUYÊN TẮC CỦA OPENAI', title: 'Quảng cáo đứng riêng, cuộc trò chuyện giữ riêng.',
      lead: 'OpenAI đặt ba nguyên tắc cho quảng cáo trong ChatGPT. Nhà quảng cáo làm việc trong khung này.', center: true})
      + `<div class="cg-prs rv">${cards}</div>`
  });
}

function picker() {
  return pickerBlock({
    types: TYPES,
    art: pickArtCg,
    label: 'Kiểu quảng cáo',
    head: {
      eyebrow: 'SÁU KIỂU QUẢNG CÁO',
      title: 'Chọn một kiểu để xem<br> toàn bộ cách chạy.',
      lead: 'Năm kiểu đang chạy được và một kiểu OpenAI đang thử nghiệm. Nội dung bên dưới đổi theo lựa chọn.',
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
    + `<div class="stage"><span class="demo-tag">${c.id === 'agent' ? 'ĐANG THỬ NGHIỆM' : 'MÔ PHỎNG'}</span><div class="device">${renderCg(fid)}</div>`
    + '<p class="stage-cap">Vẽ lại bố cục để hình dung vị trí hiển thị, không phải giao diện thật. Giao diện thật do OpenAI quyết định.</p>'
    + '</div></div>').join('');

  return `<section class="chap rv" id="ch-look-${c.id}">`
    + chapterHead('01 · TRÔNG NHƯ THẾ NÀO', 'Quảng cáo xuất hiện ở đâu.',
      'Chọn một biến thể để xem quảng cáo nằm dưới câu trả lời ra sao, trên điện thoại và trên máy tính.')
    + `<div class="workbench"><div class="wb-list">${list}</div><div class="wb-panes">${panes}</div></div>`
    + src(CHAPTER_SOURCES[c.id].look)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 02 — how it runs
 * ------------------------------------------------------------------ */
const FLOW_ICONS = ['thought', 'chat', 'target', 'tag', 'tap'];

const ICON_WORDS = [
  [/gợi ý ngữ cảnh/i, 'thought'], [/ảnh/i, 'image'], [/tiêu đề|mô tả|mẫu/i, 'creative'], [/danh mục/i, 'table'],
  [/giá/i, 'tag'], [/pixel|api|sự kiện/i, 'code'], [/trang/i, 'page'], [/ngân sách|bid/i, 'wallet'],
  [/hiển thị/i, 'eye'], [/nhấp/i, 'tap'], [/chuyển đổi/i, 'convert'], [/trò chuyện/i, 'chat'], [/thông tin|câu/i, 'form'],
  [/suất|thử nghiệm/i, 'flag']
];
function guessIcon(text, fallback = 'check') {
  const hit = ICON_WORDS.find(([re]) => re.test(text));
  return hit ? hit[1] : fallback;
}

// What goes in, what ChatGPT does with it, what comes back.
function howMachine(c, p) {
  const [gain, caveat] = String(p.outputs).split(/;\s*/);
  return '<div class="how-io">' + machine({
    inputs: {title: 'Bạn đưa vào', items: p.inputs.map(label => ({icon: guessIcon(label), label}))},
    core: {icon: 'gear', label: 'ChatGPT chọn quảng cáo theo ngữ cảnh cuộc trò chuyện', note: c.title},
    outputs: {title: 'Bạn nhận lại', items: [{icon: guessIcon(gain, 'chart'), label: gain}]}
  }) + (caveat ? `<p class="how-io-note">${icon('alert')}<span>${esc(caveat)}</span></p>` : '') + '</div>';
}

// Keywords (exact match, Google) next to context hints (a situation, ChatGPT).
function hintVsKeyword() {
  return '<div class="cg-vs rv">'
    + '<div class="cg-vs-col is-kw"><small>TỪ KHÓA · GOOGLE ADS</small>'
    + `<span class="cg-vs-box">${icon('search')}<b>[nến thơm quà tặng]</b></span>`
    + '<p>Từ khóa khớp chính xác: quảng cáo dựa vào cụm từ người dùng gõ.</p></div>'
    + '<i class="cg-vs-ne" aria-hidden="true">≠</i>'
    + '<div class="cg-vs-col is-hint"><small>GỢI Ý NGỮ CẢNH · CHATGPT ADS</small>'
    + `<span class="cg-vs-box">${icon('thought')}<b>Người dùng tìm quà tân gia giá vừa phải</b></span>`
    + '<p>Mô tả tình huống quảng cáo có ích. ChatGPT đọc ngữ cảnh cuộc trò chuyện; gợi ý ngữ cảnh không phải lệnh khớp chính xác và không bảo đảm quảng cáo sẽ hiện.</p></div>'
    + src(['hints', 'basics'])
    + '</div>';
}

function billingBox(p) {
  return '<div class="cg-bill rv"><small>' + icon('coin') + 'Cách tính phí</small><ul>'
    + p.billing.map(([code, text]) => `<li><b>${esc(code)}</b><span>${esc(text)}</span></li>`).join('')
    + '</ul></div>';
}

// Campaign → ad group → ad → review, drawn on the neutral set-up window.
const SETUP_RAIL = ['Chiến dịch', 'Nhóm quảng cáo', 'Quảng cáo', 'Xem lại'];
const SETUP_URL = 'ads-manager › tao-moi';

function setupBlocks(c, p) {
  const s = p.setup;
  const screen = (step, title, body) => setupScreen({step, title, body, url: SETUP_URL, steps: SETUP_RAIL});
  const body = (t, text, rest) => `<h4>${esc(t)}</h4><p class="wb-sub">${esc(text)}</p>`
    + (rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp', cls: 'wb-more'}) : '');
  const hints = '<div class="cg-su-hints"><small>Gợi ý ngữ cảnh · tối đa 2.000</small>'
    + s.hints.map(h => `<span>${icon('thought')}${esc(h)}</span>`).join('') + '</div>';

  const items = [
    {key: `${c.id}-s0`, label: SETUP_RAIL[0], icon: 'target',
      body: body('Chọn mục tiêu và ngân sách', `Kiểu này thường chạy với mục tiêu ${s.objective}.`,
        'Mục tiêu quyết định cách tính phí và cách hệ thống tối ưu phân phối. Ngân sách đặt theo ngày ở cấp chiến dịch.'),
      stage: screen(0, `${SETUP_RAIL[0]} · Mục tiêu`, suOpts(s.pick, {group: 'Mục tiêu chiến dịch'})
        + suField('Ngân sách ngày', s.budget, {ic: 'wallet'}))},
    {key: `${c.id}-s1`, label: SETUP_RAIL[1], icon: 'thought',
      body: body('Gợi ý ngữ cảnh và nhắm mục tiêu', `Nhắm mẫu: ${s.audience}. Gợi ý ngữ cảnh đặt ở cấp nhóm quảng cáo.`,
        'Mỗi nhóm quảng cáo nên xoay quanh một nhu cầu. Viết gợi ý như câu tả tình huống, không liệt kê từ khóa.'),
      stage: screen(1, `${SETUP_RAIL[1]} · Ngữ cảnh`, hints + suField('Nhắm mục tiêu', s.audience, {ic: 'pin'}))},
    {key: `${c.id}-s2`, label: SETUP_RAIL[2], icon: 'image',
      body: body(c.id === 'product' || c.id === 'carousel' ? 'Sản phẩm từ danh mục' : 'Tiêu đề, mô tả, ảnh vuông',
        c.id === 'product' || c.id === 'carousel' ? 'Thẻ lấy ảnh, tên và giá từ danh mục sản phẩm.' : 'Tiêu đề dưới 50 ký tự, mô tả dưới 100 ký tự, ảnh 1:1.',
        'Đưa vài mẫu khác nhau trong cùng nhóm để so. Không làm mẫu giống giao diện ChatGPT.'),
      stage: screen(2, `${SETUP_RAIL[2]} · Nội dung`, suThumbs([['s6', 'r11', 'Nến gỗ'], ['s3', 'r11', 'Khuếch tán'], ['s1', 'r11', 'Tinh dầu']])
        + suToggles([['Web trên máy tính', true], ['iOS', true], ['Android', true]]))},
    {key: `${c.id}-s3`, label: SETUP_RAIL[3], icon: 'stamp',
      body: body('Xem lại rồi gửi', 'Quảng cáo được xét theo chính sách quảng cáo của OpenAI trước khi chạy.',
        'Trang đích, cách đo và người tiếp nhận phải sẵn sàng từ lúc quảng cáo được duyệt.'),
      stage: screen(3, 'Xem lại · Trước khi gửi', suReview([`Mục tiêu: ${s.objective}`, `Ngân sách: ${s.budget}`,
        `Gợi ý ngữ cảnh: ${s.hints.length} dòng`, `Nhắm mục tiêu: ${s.audience}`, 'Trang đích đã kiểm tra']))}
  ];

  return workbench(items, {cls: 'wb-guide', tag: c.id === 'agent' ? 'ĐANG THỬ NGHIỆM' : 'CÀI ĐẶT MẪU',
    cap: 'Màn hình Ads Manager vẽ lại để minh họa; tên mục và thứ tự thật do OpenAI quyết định.'});
}

function chapterHow(c, p) {
  return `<section class="chap rv" id="ch-how-${c.id}">`
    + chapterHead('02 · CHẠY NHƯ THẾ NÀO', 'Từ câu hỏi tới lượt nhấp.',
      'Chuỗi dưới đây là đường đi của một lượt hiển thị, không phải cam kết kết quả.')
    + flowList(p.how, FLOW_ICONS)
    + howMachine(c, p)
    + hintVsKeyword()
    + billingBox(p)
    + setupBlocks(c, p)
    + src(c.id === 'agent' ? ['agents'] : HOW_SOURCES)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 03 — what to prepare
 * ------------------------------------------------------------------ */
const SAMPLES = {
  title: ['Nến gỗ tuyết tùng', 'Nến thơm gỗ tuyết tùng, hộp quà sẵn'],
  desc: ['Sáp đậu nành, đốt đến 40 giờ.', 'Sáp đậu nành, đốt đến 40 giờ. Gói quà miễn phí, giao 2 giờ nội thành.']
};
const fit = (kind, limit) => SAMPLES[kind].filter(t => [...t].length <= limit).pop() || SAMPLES[kind][0];

const favPic = () => '<span class="cg-fav"><i>N</i><b>256 × 256</b></span>';

function specPicture(name, spec) {
  if (/^Favicon/.test(name)) return favPic();
  if (/ · /.test(spec)) return chipsPic(spec.split(' · ').slice(0, 5));
  const ic = [[/danh mục/i, 'table'], [/hạn/i, 'clock'], [/trang đích/i, 'page'], [/gợi ý/i, 'thought'], [/nhãn/i, 'tag'],
    [/pixel|sự kiện|ứng dụng/i, 'code'], [/bid/i, 'target'], [/tính phí/i, 'coin'], [/địa lý/i, 'pin'], [/số thẻ/i, 'layers'],
    [/tình trạng/i, 'flag'], [/việt nam/i, 'pin'], [/riêng tư/i, 'lock']].find(([re]) => re.test(name));
  return `<span class="sp-ico">${icon(ic ? ic[1] : 'file')}</span>`;
}

function chapterFiles(c, p) {
  const texts = [];
  const frames = [];
  const tiles = [];

  p.specs.forEach(([name, spec], i) => {
    const limit = spec.match(/([\d.]+) ký tự/);
    if (limit) {
      const n = Number(limit[1].replace(/\./g, ''));
      const kind = /^Tiêu đề/.test(name) ? 'title' : 'desc';
      texts.push(charBox({id: `fc-${c.id}-${i}`, label: `${name} · ${spec}`, text: fit(kind, n), limit: n, multiline: kind === 'desc'}));
    } else if (/^Ảnh vuông/.test(name)) {
      frames.push(ratioFrame({w: 1200, h: 1200, ratio: '1:1', label: 'Ảnh vuông', img: 's6', size: 'tối thiểu 640 × 640'}));
    } else {
      tiles.push(specTile(specPicture(name, spec), name, spec));
    }
  });

  const principle = {
    product: 'Thẻ sản phẩm lấy mọi thứ từ danh mục. Danh mục đúng thì thẻ đúng; sản phẩm hết hạn sau 2 tuần nếu không cập nhật.',
    carousel: 'Carousel lấy mọi thứ từ danh mục. Ảnh đồng bộ, giá khớp website, tải lại mỗi ngày.',
    conv: 'Không có Pixel hoặc Conversions API thì không chạy được mục tiêu Conversions. Số ký tự là giới hạn của OpenAI.',
    agent: 'OpenAI chưa công bố thông số riêng cho Sponsored Agents. Phần dưới là những gì tài liệu đã nêu.'
  }[c.id] || 'Tiêu đề và mô tả ngắn, ảnh vuông rõ sản phẩm. Số ký tự là giới hạn của OpenAI; phần dài hơn không nhập được.';

  // Feed-based and trial types have no copy limits to count: draw the feed
  // file or the brief the business hands over instead.
  if (c.id === 'product' || c.id === 'carousel') frames.push(feedSheet());
  if (c.id === 'agent') frames.push(agentSheet());

  return `<section class="chap rv" id="ch-files-${c.id}">`
    + chapterHead('03 · CẦN CHUẨN BỊ GÌ', 'Nội dung và thông số.')
    + keyPoint(principle, {ic: 'layers', label: 'NGUYÊN TẮC'})
    + filesBody({board: blueprint(texts, frames), tiles, folder: assetFolder(p.assets), detail: specDrawer(p.specs)})
    + src(CHAPTER_SOURCES[c.id].files)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 04 — what to measure
 * ------------------------------------------------------------------ */
const VERIFY = {
  land: ['Chỉ là tín hiệu', 'consider'],
  pdp: ['Chỉ là tín hiệu', 'consider'],
  lead: ['Cần gọi lại', 'consider'],
  reg: ['Chỉ là tín hiệu', 'consider'],
  cart: ['Chưa mua', 'consider'],
  checkout: ['Chưa mua', 'consider'],
  order: ['Chờ xác nhận', 'consider'],
  agentchat: ['Chưa có báo cáo', 'fix'],
  agentsuggest: ['Chưa có báo cáo', 'fix'],
  crm: ['Phù hợp', 'good']
};

const MEAS_COUNTS = {card: [52, 18, 9, 5], pair: [44, 30, 6], product: [48, 14, 7, 5], carousel: [50, 16, 9, 6], conv: [60, 22, 8, 7], agent: [12, 8, 5]};

function chapterMeasure(c, p) {
  const items = p.measure.map(([label, kind, ic, event, what]) => ({label, kind, ic, event, what}));
  const sale = c.id === 'product' || c.id === 'carousel';
  const verify = sale ? {...VERIFY, crm: ['Đã giao', 'good']} : VERIFY;
  const [first, rest] = splitFirst(p.track);

  return `<section class="chap rv" id="ch-measure-${c.id}">`
    + chapterHead('04 · ĐO ĐIỀU GÌ', 'Kết quả chỉ đọc được khi đã đo.')
    + keyPoint(first, {ic: 'chart', label: 'CẦN ĐO', extra: rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp'}) : ''})
    + measureDemo({
      id: c.id, items, verify, fab: {},
      scenes: measureScenes(c.id),
      screen: measureAd(c.id),
      verifyHead: sale ? 'Đơn đã giao' : 'Đội tư vấn xác nhận',
      title: 'Báo cáo · số mẫu',
      counts: MEAS_COUNTS[c.id],
      evLabel: 'Ghi nhận',
      label: 'Nút trên quảng cáo',
      steps: ['Khách bấm dưới câu trả lời', 'Điều khách thấy', 'Báo cáo ghi nhận'],
      cap: 'Bấm từng nút ở bước 1 để xem màn hình khách nhận được và dòng được cộng vào báo cáo. Cột cuối lấy từ CRM, không phải từ Ads Manager.'
    })
    + '<div class="notes" data-anim>'
    + noteCard('bid', 'CÁCH TÍNH PHÍ', p.bid)
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
      title: 'Sáu kiểu, một chỗ đứng: dưới câu trả lời.',
      lead: 'Chọn một ô để quay lại đúng phần nội dung ở trên.'
    },
    next: {
      eyebrow: 'BƯỚC TIẾP THEO',
      title: 'Chưa rõ nên chạy kiểu nào?',
      text: 'Trang tiếp theo đi từ mục tiêu, mức sẵn sàng của khách, ngữ cảnh, đối tượng và ngành được chạy.',
      href: CG_PAGES[1].href,
      cta: CG_PAGES[1].num + ' ' + CG_PAGES[1].label
    }
  });
}

export function formatsPage() {
  return hero()
    + stepsBar('formats', CG_PAGES, STEPS_LABEL)
    + orbit()
    + principles()
    + section({id: 'campaigns', inner: picker() + TYPES.map(panel).join('')})
    + recap();
}

export const formatsMeta = {
  title: 'ChatGPT Ads: cách chạy và định dạng quảng cáo',
  description: 'Sáu kiểu quảng cáo trong ChatGPT: thẻ dưới câu trả lời, hai thẻ, thẻ sản phẩm, carousel, tối ưu chuyển đổi '
    + 'và trò chuyện với thương hiệu (đang thử nghiệm) — trông như thế nào, chạy ra sao, cần chuẩn bị gì và đo điều gì.'
};

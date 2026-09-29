// TikTok Ads landing page 01 — "Cách chạy & định dạng".
// Same frame as the Google and Facebook page 01 (hero, steps bar, orbit,
// picker, six panels of six chapters, recap). Every panel is rendered
// server-side and hidden when inactive; dist/google-ads-lp.js only toggles
// visibility.

import {SOURCES, TYPES, JOURNEY, PANELS} from './data.mjs';
import {renderTt, measureAd, measureScenes, heroStack, pickArtTt} from './mocks.mjs';
import {esc, section, stepsBar, sourceList, icon, TT_PAGES} from '../google-ads-lp/shared.mjs';
import {
  keyPoint, ratioFrame, charBox, more, filePic, chipsPic, framesPic, durationPic, shot, machine
} from '../google-ads-lp/visuals.mjs';
import {
  heroBlock, orbitSection, pickerBlock, panelShell, chapterHead, splitFirst, flowList, ioBlock,
  ratioName, imgFor, blueprint, specTile, assetFolder, specDrawer, filesBody, measureDemo, noteCard,
  pathsBody, checklistBlock, recapSection
} from '../google-ads-lp/panel-kit.mjs';
import {workbench, setupScreen, suField, suOpts, suToggles, suThumbs, suReview} from '../google-ads-lp/scenes.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu TikTok Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu TikTok:'});

// Sources shown under each chapter, per type.
const CHAPTER_SOURCES = {
  infeed: {look: ['placements', 'infeedSpecs', 'carousel', 'adNetwork', 'appBundle'], files: ['infeedSpecs', 'carouselSpecs', 'cml'],
    measure: ['pixel', 'eventsApi', 'dedup'], paths: ['smartPlus', 'bidding']},
  spark: {look: ['spark', 'infeedSpecs'], files: ['spark', 'infeedSpecs', 'cml'],
    measure: ['spark', 'pixel', 'events'], paths: ['spark', 'custom']},
  lead: {look: ['instantForm', 'messaging', 'dmSetup', 'zalo'], files: ['formQuestions', 'instantForm', 'messaging'],
    measure: ['leadsCenter', 'crmIntegr', 'crmEvents', 'csvPostback'], paths: ['formQuestions', 'messaging']},
  shop: {look: ['videoShopping', 'productCard', 'liveShopping', 'catalogAds'], files: ['anchor', 'gmvGuide', 'catalogs'],
    measure: ['gmvMax', 'productGmv', 'liveGmv'], paths: ['gmvMax', 'liveGmv']},
  search: {look: ['autoSearch', 'searchCampaign', 'searchAvail'], files: ['autoSearch', 'searchCampaign'],
    measure: ['pixel', 'events'], paths: ['autoSearch', 'searchAvail']},
  brand: {look: ['topview', 'topreach', 'topfeed'], files: ['topviewSpecs', 'topreach', 'reservation'],
    measure: ['topfeed', 'pixel'], paths: ['topview', 'topfeed']}
};
const HOW_SOURCES = ['objectives', 'smartPlus', 'placements'];
const PLAY_SOURCES = ['review', 'appeal', 'bc'];

const RECAP_ICONS = {infeed: 'play', spark: 'star', lead: 'form', shop: 'cart', search: 'search', brand: 'flag'};

/* ------------------------------------------------------------------ *
 * Hero, orbit, picker
 * ------------------------------------------------------------------ */
function hero() {
  return heroBlock({
    crumb: 'TikTok Ads',
    eyebrow: 'POWAI / TIKTOK ADS',
    title: 'TikTok Ads',
    sub: 'Từ một video đến <em>một hành động có thể đo</em>.',
    lead: 'Quảng cáo TikTok là video dọc xen giữa những video khách đang lướt, trong LIVE, trong tìm kiếm và ứng dụng đối tác. '
      + 'Trang này mở từng kiểu quảng cáo: trông như thế nào, chạy ra sao, cần chuẩn bị gì và đo điều gì.',
    primary: ['#campaigns', 'Khám phá sáu kiểu quảng cáo'],
    ghost: ['/lien-he/', 'Trao đổi nhu cầu'],
    stage: heroStack()
  });
}

// Scroll, stop, tap, arrive, talk, record.
const ORBIT_ICONS = ['play', 'eye', 'tap', 'page', 'chat', 'chart'];

function orbit() {
  return orbitSection({
    journey: JOURNEY,
    icons: ORBIT_ICONS,
    head: {
      eyebrow: 'HÀNH TRÌNH',
      title: 'Khách đang lướt. Video phải làm họ dừng lại.',
      lead: 'Từ lúc lướt tới lúc thành đơn có sáu chặng. Chọn từng chặng để xem điều gì diễn ra.'
    },
    hint: 'Sáu chặng quay quanh một tài khoản quảng cáo. Chọn một chặng để đọc chi tiết.'
  });
}

function picker() {
  return pickerBlock({
    types: TYPES,
    art: pickArtTt,
    label: 'Kiểu quảng cáo',
    head: {
      eyebrow: 'SÁU KIỂU QUẢNG CÁO',
      title: 'Chọn một kiểu để xem<br> toàn bộ cách chạy.',
      lead: 'Mỗi kiểu có chỗ hiển thị, nội dung và cách đo riêng. Nội dung bên dưới đổi theo lựa chọn.',
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
    + `<div class="stage"><span class="demo-tag">MÔ PHỎNG</span><div class="device">${renderTt(fid)}</div>`
    + '<p class="stage-cap">Vẽ lại bố cục để hình dung vị trí hiển thị. Giao diện thật do TikTok quyết định và đổi theo phiên bản ứng dụng.</p>'
    + '</div></div>').join('');

  return `<section class="chap rv" id="ch-look-${c.id}">`
    + chapterHead('01 · TRÔNG NHƯ THẾ NÀO', 'Quảng cáo xuất hiện ở đâu.',
      'Chọn một vị trí để xem quảng cáo nằm giữa nội dung thật ra sao.')
    + `<div class="workbench"><div class="wb-list">${list}</div><div class="wb-panes">${panes}</div></div>`
    + src(CHAPTER_SOURCES[c.id].look)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 02 — how it runs
 * ------------------------------------------------------------------ */
const FLOW_ICONS = ['users', 'auction', 'play', 'tap', 'convert'];

const ICON_WORDS = [
  [/video|bài đăng|LIVE/i, 'video'], [/ảnh|hình/i, 'image'], [/danh mục|cửa hàng|sản phẩm/i, 'store'], [/chữ|văn bản|chú thích/i, 'creative'],
  [/trang|website|hồ sơ/i, 'page'], [/sự kiện|pixel|đo/i, 'chart'], [/tin nhắn|chat|trò chuyện/i, 'chat'],
  [/câu hỏi|biểu mẫu|form/i, 'form'], [/mã/i, 'lock'], [/người|nhân viên|nhà sáng tạo/i, 'users'], [/lead|số điện thoại/i, 'phone'],
  [/đơn|giỏ|doanh thu/i, 'cart'], [/ngày|lịch/i, 'calendar'], [/ngân sách|ROI/i, 'wallet'], [/lượt xem|tiếp cận/i, 'eye'],
  [/giá trị|kết quả/i, 'convert']
];
function guessIcon(text, fallback = 'check') {
  const hit = ICON_WORDS.find(([re]) => re.test(text));
  return hit ? hit[1] : fallback;
}

// Campaign, ad group, ad and review, drawn on the same neutral set-up window
// as the Google and Facebook pages. GMV Max has its own rail.
const SETUP_RAIL = ['Chiến dịch', 'Nhóm quảng cáo', 'Quảng cáo', 'Xem lại'];
const SETUP_URL = 'trinh-quan-ly › chien-dich › moi';

function setupBlocks(c, p) {
  const s = p.setup;
  const rail = s.rail || SETUP_RAIL;
  const screen = (step, title, body) => setupScreen({step, title, body, url: SETUP_URL, steps: rail});
  const on = (s.campaign.find(([, st]) => st === 'on') || s.campaign[0])[0];
  const body = (t, text, rest) => `<h4>${esc(t)}</h4><p class="wb-sub">${esc(text)}</p>`
    + (rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp', cls: 'wb-more'}) : '');
  const gmv = Boolean(s.rail);

  const items = [
    {key: `${c.id}-s0`, label: rail[0], icon: 'target',
      body: body(gmv ? 'Chọn loại GMV Max' : 'Chọn mục tiêu chiến dịch', gmv ? `Kiểu này đi với ${on}.` : `Kiểu này thường đi với mục tiêu ${on}.`,
        gmv ? 'Product GMV Max quảng bá sản phẩm của cửa hàng; LIVE GMV Max kéo người xem vào phiên LIVE. Từ 07/2025, đây là kiểu duy nhất cho quảng cáo TikTok Shop.'
          : 'Mục tiêu quyết định TikTok tối ưu cho hành động nào. Đổi mục tiêu là đổi cả cách hệ thống chọn người xem.'),
      stage: screen(0, `${rail[0]} · Mục tiêu`, suOpts(s.campaign, {group: gmv ? 'Loại chiến dịch' : 'Mục tiêu chiến dịch'}))},
    {key: `${c.id}-s1`, label: rail[1], icon: 'sliders',
      body: body(gmv ? 'Cửa hàng, sản phẩm, mục tiêu ROI' : 'Điểm đến, tối ưu, vị trí', `Điểm đến: ${s.where}. Tối ưu cho: ${s.goal}.`,
        gmv ? 'Mỗi cửa hàng dùng một tài khoản quảng cáo. Mục tiêu ROI nên giữ ít nhất 3 ngày trước khi đổi.'
          : 'Vị trí chọn lúc tạo nhóm quảng cáo và không đổi được sau đó. Để TikTok tự chọn vị trí trừ khi có lý do rõ.'),
      stage: screen(1, `${rail[1]} · Cài đặt`,
        suField(gmv ? 'Cửa hàng' : 'Điểm đến', s.where, {ic: guessIcon(s.where, 'page')})
        + suField(gmv ? 'Mục tiêu' : 'Tối ưu cho', s.goal, {ic: 'target', chip: ['Đã chọn', 'good']})
        + suToggles(s.placements))},
    {key: `${c.id}-s2`, label: rail[2], icon: 'video',
      body: body('Nội dung dọc trước tiên', 'Video 9:16 là khung chính; tỷ lệ khác chỉ để phủ thêm vị trí.',
        'Đưa vài video vào cùng nhóm để hệ thống so và dồn tiền cho bản được xem nhiều.'),
      stage: screen(2, `${rail[2]} · Nội dung`, suThumbs(s.ad))},
    {key: `${c.id}-s3`, label: rail[3], icon: 'list',
      body: body('Kiểm tra trước khi đăng', 'Đọc lại chuỗi dưới đây theo đúng thứ tự khách đi qua.',
        'Phần lớn quảng cáo được xét trong 24 giờ. Liên kết, sự kiện đo và người trực phải sẵn sàng từ lúc bật.'),
      stage: screen(3, 'Xem lại · Trình tự', suReview(p.how))}
  ];

  return workbench(items, {cls: 'wb-guide', tag: 'CÀI ĐẶT MẪU',
    cap: 'Màn hình cài đặt vẽ lại để minh họa; tên mục và thứ tự thật do TikTok quyết định.'});
}

// Shop: what GMV Max takes in and what it hands back.
const gmvMachine = () => '<div class="tt-gmv">' + machine({
  inputs: {title: 'Cửa hàng đưa vào', items: [
    {icon: 'store', label: 'Sản phẩm & tồn kho'}, {icon: 'video', label: 'Video của shop'},
    {icon: 'users', label: 'Video nhà sáng tạo'}, {icon: 'play', label: 'Phiên LIVE'}, {icon: 'wallet', label: 'Ngân sách & mục tiêu ROI'}]},
  core: {icon: 'auto', label: 'GMV Max', note: 'tự chọn video, vị trí, người xem'},
  outputs: {title: 'Cửa hàng nhận lại', items: [
    {icon: 'cart', label: 'Đơn trong cửa hàng'}, {icon: 'chart', label: 'GMV & ROI'}, {icon: 'eye', label: 'Người xem LIVE'}]},
  cls: 'is-gmv'
}) + `<p class="how-io-note">${icon('alert')}<span>ROI ở đây là doanh thu ÷ chi phí quảng cáo, chưa trừ giá vốn, phí sàn, hoàn hàng.</span></p></div>`;

function chapterHow(c, p) {
  return `<section class="chap rv" id="ch-how-${c.id}">`
    + chapterHead('02 · CHẠY NHƯ THẾ NÀO', 'Từ lúc lướt tới kết quả.',
      'Chuỗi dưới đây là đường đi của một lượt hiển thị, không phải cam kết kết quả.')
    + flowList(p.how, FLOW_ICONS)
    + (p.setup.rail ? gmvMachine() : ioBlock({inputs: p.inputs, outputs: p.outputs, core: 'TikTok tối ưu', note: c.title, guess: guessIcon}))
    + setupBlocks(c, p)
    + src(p.setup.rail ? ['gmvMax', 'gmvMigration', 'gmvGuide'] : HOW_SOURCES)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * 03 — what to prepare
 * ------------------------------------------------------------------ */
// Sample copy per kind; the longest one inside the limit is used, so each
// counter opens on a real example that fits.
const SAMPLES = {
  primary: ['Nến sáp đậu nành, đốt đến 40 giờ.', 'Góc thư giãn tối nay: nến sáp đậu nành, đốt 40 giờ.',
    'Góc thư giãn cuối ngày: nến sáp đậu nành, mùi oải hương dịu nhẹ, đốt đến 40 giờ. Giao 2 giờ.'],
  name: ['Nhà Thơm', 'Nhà Thơm · Nến'],
  caption: ['Ba bước cho góc thư giãn tối nay.', 'Mình dùng khuếch tán que gỗ này 3 tuần rồi, phòng thơm dịu cả ngày. Bạn thích mùi nào?',
    'Mình dùng khuếch tán que gỗ này 3 tuần rồi, phòng thơm dịu cả ngày. Mùi gỗ tuyết tùng hợp phòng ngủ, cam ngọt hợp phòng khách. Bạn thích mùi nào?']
};
const fit = (kind, limit) => SAMPLES[kind].filter(t => [...t].length <= limit).pop() || SAMPLES[kind][0];

// 9:16 frame with the right rail and bottom caption band shaded. The shape
// is an illustration: TikTok publishes the exact zones as a download.
function safePic() {
  return `<span class="tts-safe"><i class="photo dark">${shot('s-tall')}</i><b class="is-rail">Cột nút</b><b class="is-band">Chữ & nút</b></span>`;
}

function specPicture(name, spec) {
  if (/^Vùng an toàn/.test(name)) return safePic();
  if (/^Thời lượng/.test(name)) return durationPic('0:00', '10:00');
  const ratios = spec.match(/\d+(?:\.\d+)?:\d+/g) || [];
  if (ratios.length > 1) return framesPic(ratios);
  if (/MB|GB/.test(spec)) return filePic(/MP4/.test(spec) ? 'MP4' : 'JPG', (spec.match(/\d+\s?(?:MB|GB)/) || ['500 MB'])[0]);
  if (/ · /.test(spec)) return chipsPic(spec.split(' · ').slice(0, 5));
  const ic = [[/đại diện/i, 'person'], [/mã/i, 'lock'], [/sản phẩm/i, 'tag'], [/tài khoản/i, 'shield'], [/ROI/i, 'target'],
    [/LIVE/i, 'video'], [/chính sách/i, 'link'], [/lưu/i, 'folder'], [/nhạc/i, 'speaker'], [/duyệt|điều kiện/i, 'check'],
    [/tần suất/i, 'repeat'], [/chữ/i, 'creative'], [/nhãn/i, 'tag'], [/từ khóa/i, 'search'], [/đặt chỗ/i, 'calendar'],
    [/vị trí/i, 'auto']].find(([re]) => re.test(name));
  return `<span class="sp-ico">${icon(ic ? ic[1] : 'file')}</span>`;
}

function chapterFiles(c, p) {
  const texts = [];
  const frames = [];
  const tiles = [];

  p.specs.forEach(([name, spec], i) => {
    const limit = spec.match(/(\d+) ký tự/);
    const dims = spec.match(/(\d+)\s*×\s*(\d+)/);
    if (limit) {
      const kind = /^Tên/.test(name) ? 'name' : /^Chú thích/.test(name) ? 'caption' : 'primary';
      const n = Number(limit[1]);
      texts.push(charBox({id: `fc-${c.id}-${i}`, label: `${name} · ${spec}`, text: fit(kind, n), limit: n,
        multiline: kind !== 'name'}));
    } else if (/^Video/.test(name) && dims) {
      const [w, h] = [Number(dims[1]), Number(dims[2])];
      frames.push(ratioFrame({w, h, ratio: ratioName(w, h), label: w === h ? 'Video vuông · Pangle' : w > h ? 'Video ngang' : 'Video dọc',
        img: imgFor(w / h), video: true}));
    } else {
      tiles.push(specTile(specPicture(name, spec), name, spec));
    }
  });

  return `<section class="chap rv" id="ch-files-${c.id}">`
    + chapterHead('03 · CẦN CHUẨN BỊ GÌ', 'Nội dung và thông số.')
    + keyPoint('Quay dọc 9:16 từ đầu và giữ chữ ngoài cột nút bên phải và phần chữ ở đáy. Số ký tự là giới hạn của TikTok; phần dài hơn không đăng được hoặc bị ẩn.',
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
  product: ['Chỉ là tín hiệu', 'consider'],
  pdp: ['Chỉ là tín hiệu', 'consider'],
  open: ['Chỉ là tín hiệu', 'consider'],
  view: ['Chỉ là tín hiệu', 'consider'],
  profile: ['Chỉ là tín hiệu', 'consider'],
  follow: ['Người theo dõi mới', 'good'],
  live: ['Đang xem', 'consider'],
  cart: ['Chưa trả tiền', 'consider'],
  order: ['Khớp đơn thật', 'good'],
  chat: ['Đã trả lời', 'consider'],
  formopen: ['Chưa gửi', 'fix'],
  lead: ['Cần gọi lại', 'consider'],
  crm: ['Đã mua', 'good']
};

// Sample counts, falling down the funnel.
const MEAS_COUNTS = {
  infeed: [42, 16, 7], spark: [30, 24, 14, 5], lead: [44, 19, 12, 7],
  shop: [38, 12, 26, 9], search: [34, 18, 6], brand: [60, 14, 22]
};

function chapterMeasure(c, p) {
  const items = p.measure.map(([label, kind, ic, event, what]) => ({label, kind, ic, event, what}));
  const verify = c.id === 'lead' ? {...VERIFY, crm: ['Phù hợp', 'good']}
    : c.id === 'shop' ? {...VERIFY, order: ['Chờ giao', 'consider'], crm: ['Đã giao', 'good']} : VERIFY;
  const [first, rest] = splitFirst(p.track);

  return `<section class="chap rv" id="ch-measure-${c.id}">`
    + chapterHead('04 · ĐO ĐIỀU GÌ', 'Kết quả chỉ đọc được khi đã đo.')
    + keyPoint(first, {ic: 'chart', label: 'CẦN ĐO', extra: rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp'}) : ''})
    + measureDemo({
      id: c.id, items, verify, fab: {},
      scenes: measureScenes(c.id),
      screen: measureAd(c.id),
      verifyHead: c.id === 'shop' ? 'Đơn đã giao' : 'Đội tư vấn xác nhận',
      title: 'Báo cáo sự kiện · số mẫu',
      counts: MEAS_COUNTS[c.id],
      evLabel: 'Sự kiện ghi nhận',
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
      title: 'Sáu kiểu, sáu tình huống.',
      lead: 'Chọn một ô để quay lại đúng phần nội dung ở trên.'
    },
    next: {
      eyebrow: 'BƯỚC TIẾP THEO',
      title: 'Chưa rõ nên chạy kiểu nào?',
      text: 'Trang tiếp theo đi từ mục tiêu kinh doanh, mức sẵn sàng của khách và đối tượng để chọn cách chạy.',
      href: TT_PAGES[1].href,
      cta: TT_PAGES[1].num + ' ' + TT_PAGES[1].label
    }
  });
}

export function formatsPage() {
  return hero()
    + stepsBar('formats', TT_PAGES, STEPS_LABEL)
    + orbit()
    + section({id: 'campaigns', inner: picker() + TYPES.map(panel).join('')})
    + recap();
}

export const formatsMeta = {
  title: 'TikTok Ads: cách chạy và định dạng quảng cáo',
  description: 'Sáu kiểu quảng cáo TikTok: video In-Feed, Spark Ads, biểu mẫu & tin nhắn, video & LIVE bán hàng (GMV Max), tìm kiếm, '
    + 'TopView & đặt trước — trông như thế nào, chạy ra sao, cần chuẩn bị gì và đo điều gì.'
};

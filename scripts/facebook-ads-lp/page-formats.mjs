// Facebook Ads landing page 01 — "Cách chạy & định dạng".
// Same frame as the Google Ads page 01 (hero, steps bar, orbit, picker, six
// panels of six chapters, recap). Every panel is rendered server-side and
// hidden when inactive; dist/google-ads-lp.js only toggles visibility.

import {SOURCES, TYPES, JOURNEY, PANELS} from './data.mjs';
import {renderFb, measureAd, measureScenes, heroStack, pickArtFb} from './mocks.mjs';
import {esc, section, stepsBar, sourceList, icon, FB_PAGES} from '../google-ads-lp/shared.mjs';
import {
  keyPoint, ratioFrame, charBox, more, filePic, chipsPic, framesPic, durationPic, shot
} from '../google-ads-lp/visuals.mjs';
import {
  heroBlock, orbitSection, pickerBlock, panelShell, chapterHead, splitFirst, flowList, ioBlock,
  ratioName, imgFor, blueprint, specTile, assetFolder, specDrawer, filesBody, measureDemo, noteCard,
  pathsBody, checklistBlock, recapSection
} from '../google-ads-lp/panel-kit.mjs';
import {workbench, setupScreen, suField, suOpts, suToggles, suThumbs, suReview} from '../google-ads-lp/scenes.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu Facebook Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu Meta:'});

// Sources shown under each chapter, per type.
const CHAPTER_SOURCES = {
  feed: {look: ['placements', 'imgFeed', 'marketplace', 'search', 'audienceNetwork'], files: ['imgFeed', 'vidFeed'],
    measure: ['pixel', 'capi', 'events'], paths: ['advPlus', 'custom']},
  stories: {look: ['placements', 'fbStory', 'story', 'reels'], files: ['story', 'reels'],
    measure: ['pixel', 'ctm'], paths: ['advPlus', 'custom']},
  carousel: {look: ['carousel', 'collection'], files: ['carousel', 'collection'],
    measure: ['pixel', 'events'], paths: ['catalogAds', 'custom']},
  messaging: {look: ['ctm', 'ctwa'], files: ['ctm', 'msgLeads'],
    measure: ['ctm', 'msgLeads', 'crmLeads'], paths: ['msgLeads', 'custom']},
  leadform: {look: ['leadAbout', 'instantForm', 'formTypes'], files: ['leadSpecs', 'prefill', 'prohibited'],
    measure: ['leadAccess', 'leadDownload', 'crmIntegr', 'crmLeads'], paths: ['leadBest', 'formTypes']},
  catalog: {look: ['catalogAds', 'placements'], files: ['catalogAds', 'events'],
    measure: ['pixel', 'capi', 'catalogAds'], paths: ['catalogAds', 'advCampaign']}
};
const HOW_SOURCES = ['objectives', 'perfGoals', 'placements'];
const PLAY_SOURCES = ['domain', 'restricted'];

const RECAP_ICONS = {feed: 'image', stories: 'play', carousel: 'layers', messaging: 'chat', leadform: 'form', catalog: 'table'};

/* ------------------------------------------------------------------ *
 * Hero, orbit, picker
 * ------------------------------------------------------------------ */
function hero() {
  return heroBlock({
    crumb: 'Facebook Ads',
    eyebrow: 'POWAI / FACEBOOK ADS',
    title: 'Facebook Ads',
    sub: 'Xuất hiện khi khách đang <em>lướt, xem và trò chuyện</em>.',
    lead: 'Quảng cáo của Meta hiện trên Facebook, Instagram, Messenger và ứng dụng đối tác. '
      + 'Trang này mở từng kiểu quảng cáo: trông như thế nào, chạy ra sao, cần chuẩn bị gì và đo điều gì.',
    primary: ['#campaigns', 'Khám phá sáu kiểu quảng cáo'],
    ghost: ['/lien-he/', 'Trao đổi nhu cầu'],
    stage: heroStack()
  });
}

// Scroll, stop, tap, arrive, talk, record.
const ORBIT_ICONS = ['page', 'eye', 'tap', 'chat', 'users', 'chart'];

function orbit() {
  return orbitSection({
    journey: JOURNEY,
    icons: ORBIT_ICONS,
    head: {
      eyebrow: 'HÀNH TRÌNH',
      title: 'Khách không đi tìm. Quảng cáo phải làm họ dừng lại.',
      lead: 'Từ lúc lướt tới lúc thành đơn có sáu chặng. Chọn từng chặng để xem điều gì diễn ra.'
    },
    hint: 'Sáu chặng quay quanh một tài khoản quảng cáo. Chọn một chặng để đọc chi tiết.'
  });
}

function picker() {
  return pickerBlock({
    types: TYPES,
    art: pickArtFb,
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
    + `<div class="stage"><span class="demo-tag">MÔ PHỎNG</span><div class="device">${renderFb(fid)}</div>`
    + '<p class="stage-cap">Vẽ lại bố cục để hình dung vị trí hiển thị. Giao diện thật do Meta quyết định và đổi theo ứng dụng, thiết bị.</p>'
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
const FLOW_ICONS = ['users', 'auction', 'creative', 'tap', 'convert'];

const ICON_WORDS = [
  [/video/i, 'video'], [/ảnh|hình/i, 'image'], [/danh mục|tệp/i, 'table'], [/chữ|văn bản|tiêu đề|phụ đề/i, 'creative'],
  [/trang|website/i, 'page'], [/sự kiện|pixel|đo/i, 'chart'], [/tin nhắn|chat|trò chuyện|lời chào/i, 'chat'],
  [/câu hỏi|biểu mẫu|form/i, 'form'], [/người|nhân viên/i, 'users'], [/lead|số điện thoại/i, 'phone'],
  [/đơn|giỏ/i, 'cart'], [/lượt xem/i, 'play'], [/giá trị|kết quả/i, 'convert']
];
function guessIcon(text, fallback = 'check') {
  const hit = ICON_WORDS.find(([re]) => re.test(text));
  return hit ? hit[1] : fallback;
}

// Three levels of a Meta campaign plus the review, drawn on the same neutral
// set-up window as the Google page.
const SETUP_RAIL = ['Chiến dịch', 'Nhóm quảng cáo', 'Quảng cáo', 'Xem lại'];
const SETUP_URL = 'trinh-quan-ly › chien-dich › moi';

function setupBlocks(c, p) {
  const s = p.setup;
  const screen = (step, title, body) => setupScreen({step, title, body, url: SETUP_URL, steps: SETUP_RAIL});
  const on = (s.campaign.find(([, st]) => st === 'on') || s.campaign[0])[0];
  const body = (t, text, rest) => `<h4>${esc(t)}</h4><p class="wb-sub">${esc(text)}</p>`
    + (rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp', cls: 'wb-more'}) : '');

  const items = [
    {key: `${c.id}-s0`, label: 'Chiến dịch', icon: 'target',
      body: body('Chọn mục tiêu chiến dịch', `Kiểu này thường đi với mục tiêu ${on}.`,
        'Mục tiêu quyết định Meta tối ưu cho hành động nào. Đổi mục tiêu là đổi cả cách hệ thống chọn người xem.'),
      stage: screen(0, 'Chiến dịch · Mục tiêu', suOpts(s.campaign, {group: 'Mục tiêu chiến dịch'}))},
    {key: `${c.id}-s1`, label: 'Nhóm quảng cáo', icon: 'sliders',
      body: body('Điểm đến, mục tiêu hiệu quả, vị trí', `Điểm đến: ${s.where}. Mục tiêu hiệu quả: ${s.goal}.`,
        'Vị trí Advantage+ để Meta tự phân bổ. Chỉ tắt bớt vị trí khi có lý do rõ, ví dụ không có nội dung dọc.'),
      stage: screen(1, 'Nhóm quảng cáo · Cài đặt',
        suField('Điểm đến', s.where, {ic: guessIcon(s.where, 'page')})
        + suField('Mục tiêu hiệu quả', s.goal, {ic: 'target', chip: ['Đã chọn', 'good']})
        + suToggles(s.placements))},
    {key: `${c.id}-s2`, label: 'Quảng cáo', icon: 'image',
      body: body('Nội dung cho nhiều khung', 'Chuẩn bị đủ tỷ lệ để mỗi vị trí có bản vừa khung.',
        'Một nội dung có thể tải nhiều bản theo vị trí. Meta tự chọn bản phù hợp khi hiển thị.'),
      stage: screen(2, 'Quảng cáo · Nội dung', suThumbs(s.ad))},
    {key: `${c.id}-s3`, label: 'Xem lại', icon: 'list',
      body: body('Kiểm tra trước khi đăng', 'Đọc lại chuỗi dưới đây theo đúng thứ tự khách đi qua.',
        'Quảng cáo được xét duyệt trước khi chạy. Liên kết, sự kiện đo và người trực phải sẵn sàng từ lúc bật.'),
      stage: screen(3, 'Xem lại · Trình tự', suReview(p.how)), tag: 'CÀI ĐẶT MẪU'}
  ];

  return workbench(items, {cls: 'wb-guide', tag: 'CÀI ĐẶT MẪU',
    cap: 'Màn hình cài đặt vẽ lại để minh họa; tên mục và thứ tự thật do Meta quyết định.'});
}

function chapterHow(c, p) {
  return `<section class="chap rv" id="ch-how-${c.id}">`
    + chapterHead('02 · CHẠY NHƯ THẾ NÀO', 'Từ lúc lướt tới kết quả.',
      'Chuỗi dưới đây là đường đi của một lượt hiển thị, không phải cam kết kết quả.')
    + flowList(p.how, FLOW_ICONS)
    + ioBlock({inputs: p.inputs, outputs: p.outputs, core: 'Meta tối ưu', note: c.title, guess: guessIcon})
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
  primary: ['Nến sáp đậu nành, đốt đến 40 giờ.', 'Góc thư giãn tối nay: nến sáp đậu nành, đốt 40 giờ.',
    'Góc thư giãn cuối ngày: nến sáp đậu nành, mùi oải hương dịu, đốt đến 40 giờ.',
    'Góc thư giãn cuối ngày: nến sáp đậu nành, mùi oải hương dịu nhẹ, đốt đến 40 giờ. Giao 2 giờ nội thành.'],
  headline: ['Nến nắp gỗ 200g', 'Nến thơm, giao trong 2 giờ', 'Bộ sưu tập nến mùa thu · giao 2 giờ'],
  desc: ['Giao trong 2 giờ']
};
const fit = (kind, limit) => SAMPLES[kind].filter(t => [...t].length <= limit).pop() || SAMPLES[kind][0];

function safePic() {
  return `<span class="fbs-safe"><i class="photo dark">${shot('s-tall')}</i><b class="is-top">14%</b><b class="is-bottom">35%</b></span>`;
}

function specPicture(name, spec) {
  if (/^Vùng an toàn/.test(name)) return safePic();
  const ratios = spec.match(/\d+(?:\.\d+)?:\d+/g) || [];
  if (ratios.length > 1) return framesPic(ratios);
  if (/MB|GB/.test(spec)) return filePic(/MP4/.test(spec) ? 'MP4' : 'JPG', (spec.match(/\d+\s?(?:MB|GB)/) || ['30 MB'])[0]);
  const dur = spec.match(/^(\d+) giây – (\d+) phút/);
  if (dur) return durationPic(`0:${String(dur[1]).padStart(2, '0')}`, `${dur[2]}:00`);
  if (/ · /.test(spec)) return chipsPic(spec.split(' · ').slice(0, 5));
  const ic = [[/giới hạn/i, 'lock'], [/thẻ/i, 'layers'], [/liên kết|chính sách/i, 'link'], [/trải nghiệm/i, 'page'], [/lời chào/i, 'chat'],
    [/người/i, 'users'], [/cập nhật/i, 'repeat'], [/câu hỏi/i, 'form'], [/khớp/i, 'check']].find(([re]) => re.test(name));
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
      const kind = /^Mô tả/.test(name) ? 'desc' : /tiêu đề/i.test(name) ? 'headline' : 'primary';
      const n = Number(limit[1]);
      texts.push(charBox({id: `fc-${c.id}-${i}`, label: `${name} · ${spec}`, text: fit(kind, n), limit: n,
        multiline: kind === 'primary'}));
    } else if (/^(Ảnh|Video)/.test(name) && dims) {
      const [w, h] = [Number(dims[1]), Number(dims[2])];
      frames.push(ratioFrame({w, h, ratio: ratioName(w, h), label: name.replace(/\s*\d+:\d+$/, ''),
        img: imgFor(w / h), video: /^Video/.test(name)}));
    } else {
      tiles.push(specTile(specPicture(name, spec), name, spec));
    }
  });

  return `<section class="chap rv" id="ch-files-${c.id}">`
    + chapterHead('03 · CẦN CHUẨN BỊ GÌ', 'Nội dung và thông số.')
    + keyPoint('Số ký tự là mức khuyến nghị của Meta để chữ không bị cắt. Viết dài hơn vẫn đăng được nhưng phần sau bị ẩn.',
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
  product2: ['Chỉ là tín hiệu', 'consider'],
  instant: ['Chỉ là tín hiệu', 'consider'],
  cart: ['Chưa trả tiền', 'consider'],
  order: ['Khớp đơn thật', 'good'],
  call: ['Đủ điều kiện', 'good'],
  chat: ['Đã trả lời', 'consider'],
  chatprice: ['Đang tư vấn', 'consider'],
  chatlead: ['Có số điện thoại', 'good'],
  formopen: ['Chưa gửi', 'fix'],
  lead: ['Cần gọi lại', 'consider'],
  crm: ['Đã mua', 'good']
};

// Sample counts, falling down the funnel: opens > leads > qualified.
const MEAS_COUNTS = {
  feed: [42, 18, 7, 9], stories: [38, 14, 5], carousel: [26, 19, 11, 6],
  messaging: [24, 17, 8, 4], leadform: [40, 18, 7, 6], catalog: [44, 16, 6]
};

function chapterMeasure(c, p) {
  const items = p.measure.map(([label, kind, ic, event, what]) => ({label, kind, ic, event, what}));
  const verify = c.id === 'leadform' ? {...VERIFY, crm: ['Phù hợp', 'good']} : VERIFY;
  const [first, rest] = splitFirst(p.track);

  return `<section class="chap rv" id="ch-measure-${c.id}">`
    + chapterHead('04 · ĐO ĐIỀU GÌ', 'Kết quả chỉ đọc được khi đã đo.')
    + keyPoint(first, {ic: 'chart', label: 'CẦN ĐO', extra: rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp'}) : ''})
    + measureDemo({
      id: c.id, items, verify, fab: {},
      scenes: measureScenes(c.id),
      screen: measureAd(c.id),
      verifyHead: 'Đội tư vấn xác nhận',
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
      href: FB_PAGES[1].href,
      cta: FB_PAGES[1].num + ' ' + FB_PAGES[1].label
    }
  });
}

export function formatsPage() {
  return hero()
    + stepsBar('formats', FB_PAGES, STEPS_LABEL)
    + orbit()
    + section({id: 'campaigns', inner: picker() + TYPES.map(panel).join('')})
    + recap();
}

export const formatsMeta = {
  title: 'Facebook Ads: cách chạy và định dạng quảng cáo',
  description: 'Sáu kiểu quảng cáo Facebook & Instagram: Bảng tin, Stories & Reels, Carousel, nhắn tin, biểu mẫu, danh mục — '
    + 'trông như thế nào, chạy ra sao, cần chuẩn bị gì và đo điều gì.'
};

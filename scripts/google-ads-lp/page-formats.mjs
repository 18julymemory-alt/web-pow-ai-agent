// Landing page 01 — "Cách chạy & định dạng".
// Every campaign panel is rendered server-side (hidden when inactive) so the
// full content stays in the HTML; the client script only toggles visibility.

import {
  campaignTypes, journey, matchOptions, rsaLimits, sources, platformReview
} from '../../dist/google-ads-experience-data.js';
import {campaignAtlasData} from '../google-ads-atlas.mjs';
import {campaignGuides} from '../google-ads-campaign-guides.mjs';
import {
  esc, crumbs, kicker, secHead, section, stepsBar, nextBlock, sourceList,
  mock, shot, icon, PAGES
} from './shared.mjs';
import {
  pickArt, actionScreen, keyPoint, ratioFrame, charBox, phone, more, knob, reportTable,
  filePic, chipsPic, framesPic, datePic, syncPic, durationPic, layersPic, SHOP,
  machine, lineChart, barChart
} from './visuals.mjs';
import {heroSearch} from './mocks.mjs';
import {
  heroBlock, orbitSection, pickerBlock, panelShell, chapterHead, splitFirst, flowList, ioBlock,
  ratioName, imgFor, blueprint, specTile, assetFolder, specDrawer, filesBody, measureDemo, noteCard,
  pathsBody, checklistBlock, recapSection
} from './panel-kit.mjs';
import {
  siteScreen, callScreen, zaloScreen, messengerScreen, formScreen, FAB_KINDS, fabGlyph,
  workbench, facts, setupScreen, suField, suOpts, suToggles, suThumbs, suReview
} from './scenes.mjs';

// Realistic phone screens for the four contact actions.
const SCENE = {call: () => callScreen(), zalo: () => zaloScreen(), messenger: () => messengerScreen(), form: () => formScreen()};

// Line icons for the six recap cells, so the last block is not six plain
// text boxes.
const RECAP_ICONS = {
  search: 'search',
  pmax: 'target',
  shopping: 'cart',
  demand: 'creative',
  video: 'play',
  app: 'install'
};

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */
function hero() {
  // Four real Google surfaces floating at different depths. Each card carries a
  // label so the stack reads as "here is where an ad can appear", not decoration.
  const stack = '<div class="hero-stage" aria-hidden="true"><div class="stack" id="heroStack">'
    + `<div class="card3d c-serp">${heroSearch()}<span class="c-tag">Tìm kiếm</span></div>`
    + `<div class="card3d c-shop"><div class="photo">${shot('s3')}</div>`
    + '<b>Khuếch tán que gỗ</b><em>340.000₫</em><span class="c-tag">Shopping</span></div>'
    + `<div class="card3d c-yt"><div class="photo dark">${shot('s-hero')}`
    + '<span class="p-badge">Quảng cáo</span><span class="p-bar"><i></i></span></div>'
    + '<span class="c-tag">Video</span></div>'
    + `<div class="card3d c-map"><div class="photo">${shot('s-shelf')}</div>`
    + '<b>Banner hiển thị</b><span class="c-tag">Hiển thị</span></div>'
    + `<div class="card3d c-logo"><span class="c-tap">${icon('tap')}</span></div>`
    + '</div></div>';

  return heroBlock({
    crumb: 'Google Ads',
    eyebrow: 'POWAI / GOOGLE ADS',
    title: 'Google Ads',
    sub: 'Xuất hiện đúng lúc khách hàng <em>đang tìm kiếm</em>.',
    lead: 'Google Ads kết nối nhu cầu, nội dung, điểm đến và dữ liệu đo lường. '
      + 'Trang này mở từng loại chiến dịch: quảng cáo trông như thế nào, chạy ra sao và cần chuẩn bị gì.',
    primary: ['#campaigns', 'Khám phá sáu loại chiến dịch'],
    ghost: ['/lien-he/', 'Trao đổi nhu cầu'],
    stage: stack
  });
}

/* ------------------------------------------------------------------ *
 * Ecosystem orbit — the customer journey around one account
 * ------------------------------------------------------------------ */
// The six stages in journey order: a need, the searching, the ad, the landing
// page, the contact, the follow-up.
const ORBIT_ICONS = ['need', 'search', 'creative', 'page', 'phone', 'convert'];

function orbit() {
  return orbitSection({
    journey,
    icons: ORBIT_ICONS,
    head: {
      eyebrow: 'HÀNH TRÌNH',
      title: 'Một lượt hiển thị chỉ là một điểm trên đường đi.',
      lead: 'Khách đi qua nhiều bước trước khi liên hệ. Chọn từng chặng để xem điều gì thật sự diễn ra.'
    },
    hint: 'Sáu chặng quay quanh một tài khoản Google Ads. Chọn một chặng để đọc chi tiết.'
  });
}

/* ------------------------------------------------------------------ *
 * Campaign picker
 * ------------------------------------------------------------------ */
function picker() {
  // The picture carries the card: a live scene of where this campaign shows
  // up. "Best for" is not repeated here — the panel opens with it.
  return pickerBlock({
    types: campaignTypes,
    art: pickArt,
    label: 'Loại chiến dịch',
    head: {
      eyebrow: 'SÁU LOẠI CHIẾN DỊCH',
      // The space after <br> keeps the words apart once the break is dropped on
      // narrow screens; at the start of a line it collapses away.
      title: 'Chọn một loại để xem<br> toàn bộ cách chạy.',
      lead: 'Mỗi loại chiến dịch có bề mặt hiển thị, đầu vào và cách đo riêng. Nội dung bên dưới đổi theo lựa chọn.',
      big: true
    }
  });
}

/* ------------------------------------------------------------------ *
 * Panel pieces
 * ------------------------------------------------------------------ */
// 01 — what it looks like
function chapterLook(c, atlas) {
  const formats = atlas ? atlas.formats : [];
  if (!formats.length) return '';

  const list = formats.map(([fid, name], i) => `<button type="button" data-format="${fid}" aria-pressed="${i === 0}">`
    + `<span>${esc(name)}</span></button>`).join('');

  const bodies = formats.map(([fid, name, short, long], i) => `<div class="wb-pane" data-format-pane="${fid}"${i ? ' hidden' : ''}>`
    + '<div class="wb-body">'
    + `<h4>${esc(name)}</h4>`
    + '<dl class="wb-facts">'
    + `<div><dt>Hiển thị ở đâu</dt><dd>${esc(short)}</dd></div>`
    + `<div><dt>Nội dung gì</dt><dd>${esc(long)}</dd></div>`
    + '</dl></div>'
    + `<div class="stage"><span class="demo-tag">MÔ PHỎNG</span><div class="device">${mock(fid, c.id)}</div>`
    + '<p class="stage-cap">Mô phỏng bố cục để hình dung vị trí hiển thị. Giao diện thật do Google quyết định và thay đổi theo thiết bị, bối cảnh.</p>'
    + '</div></div>').join('');

  return `<section class="chap rv" id="ch-look-${c.id}">`
    + chapterHead('01 · TRÔNG NHƯ THẾ NÀO', 'Quảng cáo xuất hiện ở đâu.',
      'Chọn một định dạng để xem vị trí hiển thị và nội dung cần có.')
    + `<div class="workbench"><div class="wb-list">${list}</div><div class="wb-panes">${bodies}</div></div>`
    + '</section>';
}

// The five steps of a campaign always follow the same shape, whatever the
// campaign type: a query or signal, the auction, the creative, the destination,
// the recorded action.
const FLOW_ICONS = ['search', 'auction', 'creative', 'page', 'convert'];

// 02 — how it runs
function chapterHow(c, guide) {
  const flow = flowList(c.howItWorks, FLOW_ICONS);
  const io = ioBlock({inputs: c.inputs, outputs: c.outputs, core: c.title, guess: guessIcon});

  const extra = c.id === 'search'
    ? searchDeepDive()
    : (guide ? guideBlocks(guide, c.id) : '');

  return `<section class="chap rv" id="ch-how-${c.id}">`
    + chapterHead('02 · CHẠY NHƯ THẾ NÀO', guide ? esc(guide.title) : 'Từ nhu cầu đến chuyển đổi.',
      'Chuỗi dưới đây là đường đi của một lượt tương tác, không phải cam kết kết quả.')
    + flow + io + extra
    + '</section>';
}

// Keyword → icon for the machine tiles and the output tile.
const ICON_WORDS = [
  [/cài|ứng dụng|app/i, 'install'], [/video/i, 'video'], [/ảnh|hình/i, 'image'],
  [/merchant|dữ liệu/i, 'table'], [/từ khóa/i, 'search'], [/tiêu đề|chữ|mô tả/i, 'creative'],
  [/trang/i, 'page'], [/chuyển đổi|giá trị|kết quả/i, 'convert'], [/tên, giá/i, 'tag'],
  [/đối tượng/i, 'users'], [/lead|cuộc gọi/i, 'phone'], [/lượt xem/i, 'play'],
  [/đơn/i, 'cart'], [/công cụ|ghi nhận/i, 'chart']
];
function guessIcon(text, fallback = 'check') {
  const hit = ICON_WORDS.find(([re]) => re.test(text));
  return hit ? hit[1] : fallback;
}

// Chapter 02, the five campaigns other than Search: the four guide sections
// and the sample set-up become a workbench. Each item opens the same neutral
// "new campaign" screen at the step it is about.
const GUIDE_ICONS = ['target', 'image', 'sliders', 'chart'];
const GUIDE_STAGES = {
  shopping: [
    () => setupScreen({step: 1, title: 'Cài đặt · Nguồn sản phẩm', body:
      suField('Nguồn dữ liệu', 'Merchant Center · Nhà Thơm', {ic: 'table', chip: ['Đã liên kết', 'good']})
      + suOpts([['Tất cả sản phẩm'], ['Nến & khuếch tán', 'on'], ['Dưỡng thể'], ['Khăn cotton']], {group: 'Nhóm sản phẩm'})
      + suField('Từ khóa', 'Không dùng cho Shopping', {off: true})}),
    () => setupScreen({step: 2, title: 'Tài sản · Dữ liệu sản phẩm', body: reportTable({
      cls: 'is-mini su-feed', icon: 'table', title: 'Nguồn cấp · 3 / 48 sản phẩm',
      head: ['Tên', 'Giá', 'Tồn'],
      rows: [['Nến thơm nắp gỗ 200g', '320.000₫', {text: 'Còn hàng', status: 'good'}],
        ['Khuếch tán que gỗ 150ml', '340.000₫', {text: 'Còn hàng', status: 'good'}],
        ['Tinh dầu oải hương 30ml', '285.000₫', {text: 'Hết hàng', status: 'fix'}]]
    }) + suThumbs([['s6', 'r11', 'Ảnh đúng hàng'], ['s3', 'r11', 'Ảnh đúng hàng'], ['s1', 'r11', 'Ảnh đúng hàng']])}),
    () => setupScreen({step: 3, title: 'Giá thầu · Standard Shopping', body:
      suOpts([['CPC thủ công'], ['Tối đa hóa lượt nhấp'], ['ROAS mục tiêu', 'on', 'khi đủ điều kiện']])
      + suField('Đo trước khi tối ưu', 'Mua hàng · có giá trị đơn', {ic: 'cart', chip: ['Đang đo', 'good']})}),
    () => reportTable({
      cls: 'is-mini', icon: 'chart', title: 'Chẩn đoán sản phẩm',
      head: ['Trạng thái', 'Sản phẩm'],
      rows: [['Đã duyệt', {text: '44', status: 'good'}], ['Lỗi dữ liệu', {text: '3', status: 'fix'}],
        ['Giá khác website', {text: '1', status: 'consider'}]]
    })
  ],
  video: [
    () => setupScreen({step: 0, title: 'Mục tiêu · Phân nhóm chiến dịch', body:
      suOpts([['Tăng lượt xem', 'on', 'Video Views'], ['Tăng độ phủ', '', 'Video Reach'], ['Chuyển đổi', 'off', 'đã chuyển sang Demand Gen']])}),
    () => setupScreen({step: 2, title: 'Tài sản · Video', body:
      suThumbs([['s-hero', 'r169', 'In-stream 16:9'], ['s-tall', 'r916', 'Shorts 9:16'], ['s-desk', 'r45', 'In-feed']])
      + '<div class="su-beat"><span>Mở đầu</span><span>Lợi ích</span><span>Hành động</span></div>'}),
    () => setupScreen({step: 3, title: 'Giá thầu · theo mục tiêu', body:
      suOpts([['CPV', 'on', 'khi mục tiêu là lượt xem'], ['CPM mục tiêu', '', 'khi mục tiêu là độ phủ']])
      + suField('Bộ giá thầu Search', 'Không mang sang Video', {off: true})}),
    () => '<div class="su-move">'
      + `<span class="su-card is-old">${icon('video')}<b>Video Action</b><small>cũ</small></span>`
      + `<span class="su-arr">${icon('arrow')}</span>`
      + `<span class="su-card">${icon('creative')}<b>Demand Gen</b><small>video gắn chuyển đổi</small></span>`
      + '</div>'
      + barChart([12400, 18], {labels: ['Lượt xem · 12.400', 'Yêu cầu tư vấn · 18'], highlight: 1, label: 'Lượt xem không thay số yêu cầu tư vấn'})
  ],
  demand: [
    () => setupScreen({step: 1, title: 'Cài đặt · Kênh và đối tượng', body:
      suField('Đối tượng', 'Quan tâm chăm sóc nhà cửa', {ic: 'users'})
      + suToggles([['YouTube', true], ['Discover', true], ['Gmail', false], ['Mạng hiển thị', true]])}),
    () => setupScreen({step: 2, title: 'Tài sản · Ảnh và video', body:
      suThumbs([['s-shelf', 'r191', '1.91:1'], ['s-desk', 'r45', '4:5'], ['s6', 'r11', '1:1']])
      + suField('Trang đích', SHOP + '/goc-thu-gian', {ic: 'page', chip: ['Tiếp nối', 'good']})
      + suField('Trang chủ chung', SHOP, {off: true})}),
    () => setupScreen({step: 3, title: 'Giá thầu', body:
      suOpts([['Tối đa hóa lượt chuyển đổi'], ['CPA mục tiêu', 'on']], {group: 'Theo chuyển đổi'})
      + suOpts([['Tối đa hóa giá trị chuyển đổi'], ['ROAS mục tiêu', '', 'khi đủ điều kiện']], {group: 'Theo giá trị'})}),
    () => reportTable({
      cls: 'is-mini', icon: 'chart', title: 'Chuyển đổi theo kênh',
      head: ['Kênh', 'Chuyển đổi', 'Độ trễ', 'Chất lượng'],
      rows: [['YouTube', '14', '3 ngày', {text: 'Cần xem', status: 'consider'}],
        ['Discover', '9', '1 ngày', {text: 'Tốt', status: 'good'}],
        ['Hiển thị', '4', '2 ngày', {text: 'Thấp', status: 'fix'}]]
    })
  ],
  pmax: [
    () => setupScreen({step: 0, title: 'Mục tiêu · Đầu vào', body:
      suOpts([['Mua hàng', 'on'], ['Gửi biểu mẫu']], {group: 'Mục tiêu chuyển đổi'})
      + suField('Tín hiệu đối tượng', 'Người mua quà tặng', {ic: 'users', chip: ['Gợi ý', 'consider']})
      + suField('Merchant Center', '48 sản phẩm', {ic: 'table', chip: ['Đã liên kết', 'good']})}),
    () => setupScreen({step: 2, title: 'Nhóm tài sản · Nến & khuếch tán', body:
      suThumbs([['s6', 'r11', 'Ảnh'], ['s-shelf', 'r191', 'Ảnh ngang'], ['s-hero', 'r169', 'Video']])
      + suField('Tiêu đề / Mô tả', '5 tiêu đề · 3 mô tả', {ic: 'creative'})
      + suField('URL đích', SHOP + '/nen-thom', {ic: 'link'})}),
    () => setupScreen({step: 3, title: 'Giá thầu', body:
      suOpts([['Tối đa hóa lượt chuyển đổi'], ['CPA mục tiêu']], {group: 'Theo số lượng'})
      + suOpts([['Tối đa hóa giá trị chuyển đổi', 'on'], ['ROAS mục tiêu']], {group: 'Theo giá trị'})
      + suField('CPC thủ công', 'Không có ở Performance Max', {off: true})}),
    () => reportTable({
      cls: 'is-mini', icon: 'chart', title: 'Đối chiếu khi chạy',
      head: ['Hạng mục', 'Trạng thái'],
      rows: [['Mục tiêu chuyển đổi', {text: 'Mua hàng', status: 'good'}],
        ['Giá trị chuyển đổi', {text: 'Đã gửi', status: 'good'}],
        ['Chủ đề tìm kiếm', {text: 'Chỉ là tín hiệu', status: 'consider'}],
        ['Chất lượng lead', {text: 'Cần đối soát', status: 'fix'}]]
    })
  ],
  app: [
    () => setupScreen({step: 0, title: 'Mục tiêu · Hành động cần tăng', body:
      suOpts([['Lượt cài mới', 'on'], ['Tương tác trở lại'], ['Hành động trong ứng dụng']])
      + suField('Nguồn đo lường', 'Công cụ đo trong ứng dụng', {ic: 'chart', chip: ['Đã liên kết', 'good']})}),
    () => setupScreen({step: 2, title: 'Tài sản · Ứng dụng', body:
      suField('Ứng dụng', 'Nhà Thơm – Mua sắm', {ic: 'install', chip: ['Trên cửa hàng', 'good']})
      + suThumbs([['s6', 'r916', 'Màn hình'], ['s3', 'r916', 'Màn hình'], ['s-tall', 'r916', 'Video']])}),
    () => setupScreen({step: 3, title: 'Giá thầu', body:
      suOpts([['CPI mục tiêu', 'on', 'cho lượt cài'], ['CPA mục tiêu', '', 'cho hành động trong app'], ['ROAS mục tiêu', '', 'cho giá trị']])
      + suField('CPC / bảng từ khóa', 'Không áp dụng cho App', {off: true})}),
    () => '<div class="su-funnel">'
      + barChart([1000, 420, 96], {labels: ['Cài đặt · 1.000', 'Đăng ký · 420', 'Mua hàng · 96'], highlight: 2, label: 'Cài đặt, đăng ký, mua hàng'})
      + '</div>'
  ]
};

function guideBlocks(guide, id) {
  const stages = GUIDE_STAGES[id] || [];
  const items = guide.sections.map(([t, text], i) => {
    const [first, rest] = splitFirst(text);
    return {
      key: `${id}-g${i}`,
      label: t,
      icon: GUIDE_ICONS[i] || 'dot',
      body: `<h4>${esc(t)}</h4><p class="wb-sub">${esc(first)}</p>` + (rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp', cls: 'wb-more'}) : ''),
      stage: stages[i] ? stages[i]() : ''
    };
  });

  if (guide.example && guide.example.length) {
    const pairs = [];
    for (let i = 0; i < guide.example.length; i += 2) pairs.push([guide.example[i], guide.example[i + 1] || '']);
    items.push({
      key: `${id}-gx`,
      label: 'Ví dụ cấu hình',
      icon: 'list',
      body: '<h4>Ví dụ cấu hình</h4>' + facts(pairs),
      stage: setupScreen({step: 4, title: 'Xem lại · Trình tự', body: suReview(guide.flow || [])}),
      tag: 'CÀI ĐẶT MẪU'
    });
  }

  return workbench(items, {cls: 'wb-guide', tag: 'CÀI ĐẶT MẪU',
    cap: 'Màn hình cài đặt vẽ lại để minh họa; tên mục và thứ tự thật do nền tảng quyết định.'});
}

// Search-only: keyword match + RSA composer
function searchDeepDive() {
  const seg = matchOptions.map(([id, sample], i) => `<button type="button" data-match="${id}" aria-pressed="${i === 0}">`
    + `${esc(sample)}</button>`).join('');

  const detail = matchOptions.map(([id, sample, title, text], i) => `<div data-match-detail="${id}"${i ? ' hidden' : ''}>`
    + `<b>${esc(title)}</b> — ${esc(text)}</div>`).join('');

  const rings = '<div class="rings" id="matchRings" data-m="exact" aria-hidden="true">'
    + '<span class="r-broad">Rộng</span>'
    + '<span class="r-phrase">Cụm từ</span>'
    + '<span class="r-exact">Chính xác</span>'
    + '<b>Phạm vi truy vấn được xét</b></div>';

  const match = '<div class="split sub-block">'
    + '<div>' + chapterHead('TỪ KHÓA', 'Ba mức đối sánh, ba phạm vi truy vấn.')
    + `<div class="seg" role="group" aria-label="Kiểu đối sánh">${seg}</div>`
    + `<div class="live-detail" id="matchDetail">${detail}</div>`
    + '<p class="query-row"><span>Ví dụ truy vấn bị loại:</span><strong>thiết kế website miễn phí</strong>'
    + '<span>→ thêm vào từ phủ định.</span></p>'
    + '</div>' + rings + '</div>';

  const rsa = '<div class="split sub-block">'
    + '<div>' + chapterHead('MẪU QUẢNG CÁO', 'Viết trong giới hạn ký tự.',
      `Tối đa ${rsaLimits.maxHeadlines} tiêu đề (${rsaLimits.headline} ký tự) và ${rsaLimits.maxDescriptions} mô tả (${rsaLimits.description} ký tự). Không phải tiêu đề nào cũng hiển thị cùng lúc.`)
    + '<div class="rsa-fields">'
    + '<div class="fld"><label for="rsaH"><span>Tiêu đề</span>'
    + `<span><b id="rsaHc">0</b>/${rsaLimits.headline}</span></label>`
    + `<input id="rsaH" type="text" maxlength="${rsaLimits.headline + 10}" data-limit="${rsaLimits.headline}" data-preview="h" value="Thiết kế website doanh nghiệp">`
    + '<span class="meter"><i></i></span></div>'
    + '<div class="fld"><label for="rsaD"><span>Mô tả</span>'
    + `<span><b id="rsaDc">0</b>/${rsaLimits.description}</span></label>`
    + `<textarea id="rsaD" rows="3" data-limit="${rsaLimits.description}" data-preview="d">Giao diện riêng, chuẩn SEO, tối ưu tốc độ. Nhận tư vấn phạm vi và báo giá.</textarea>`
    + '<span class="meter"><i></i></span></div>'
    + '</div></div>'
    + '<div class="stage"><span class="demo-tag">XEM TRƯỚC</span><div class="device">'
    + '<div class="browser"><div class="bt"><span class="dots"><i></i><i></i><i></i></span>'
    + '<span class="url">google.com/search</span></div><div class="bb">'
    + '<div class="serp-ad"><span class="spons">Được tài trợ</span>'
    + '<div class="ad-url">powai.vn › thiet-ke-website</div>'
    + '<div class="ad-title" data-preview-out="h">Thiết kế website doanh nghiệp</div>'
    + '<div class="ad-desc" data-preview-out="d">Giao diện riêng, chuẩn SEO, tối ưu tốc độ. Nhận tư vấn phạm vi và báo giá.</div>'
    + '</div></div></div>'
    + '</div></div>';

  return match + rsa;
}

// 03 — assets to prepare
// Every spec becomes a picture. Pixel sizes are drawn as true-ratio frames on
// a blueprint board, text limits as live counters; the rest (file type, data
// fields, dates, durations) get a small picture tile. All notes stay in the
// "Xem đủ thông số" drawer under the board.
// Sample copy that fits the limits, so the counters open on a real example.
const SAMPLE_TEXT = {
  h: 'Nến thơm thiên nhiên, giao 2h',
  d: 'Sáp đậu nành, tinh dầu nguyên chất. Giao nhanh nội thành, đổi trả trong 7 ngày.'
};

function clock(sec) {
  const s = Number(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function videoPic() {
  return `<span class="sp-vid"><i class="photo dark">${shot('s-hero')}</i>`
    + `<span class="sp-play">${icon('play')}</span><span class="sp-vid-bar"><i></i></span></span>`;
}

function specPicture(name, spec) {
  const date = spec.match(/\d{2}\/\d{2}\/\d{4}/);
  if (date) return datePic(date[0]);
  if (/^Trường/.test(name)) return chipsPic(spec.split(' · '));
  if (/^Nhất quán/.test(name)) return syncPic();
  if (/^Nhóm/.test(name)) return layersPic(spec.split(' · '));
  if (/^Logo/.test(name)) return framesPic(['1:1', '4:1'], {label: 'LOGO'});
  const ratios = spec.match(/\d+(?:\.\d+)?:\d+/g) || [];
  if (ratios.length > 1) return framesPic(ratios, {video: /video/i.test(name)});
  if (/JPG|PNG|KB|MB/.test(spec)) return filePic('JPG', (spec.match(/\d+\s?(?:MB|KB)/) || ['5 MB'])[0]);
  const secs = spec.match(/(\d+)–(\d+) giây/);
  if (secs) return durationPic(clock(secs[1]), clock(secs[2]));
  if (/^Độ dài/.test(name)) return durationPic('0:05', '< 3:00');
  if (/^Nguồn video/.test(name)) return videoPic();
  return `<span class="sp-ico">${icon('file')}</span>`;
}

function chapterFiles(c, atlas) {
  const specs = atlas && atlas.specs ? atlas.specs : [];
  const texts = [];
  const frames = [];
  const tiles = [];

  specs.forEach(([name, spec], i) => {
    const limit = spec.match(/(\d+) ký tự/);
    const dims = spec.match(/(\d+)\s*×\s*(\d+)/);
    if (/^(Tiêu đề|Mô tả)/.test(name) && limit) {
      const isDesc = /^Mô tả/.test(name);
      texts.push(charBox({
        id: `fc-${c.id}-${i}`,
        label: `${name} · ${spec}`,
        text: isDesc ? SAMPLE_TEXT.d : SAMPLE_TEXT.h,
        limit: Number(limit[1]),
        multiline: isDesc
      }));
    } else if (/^(Ảnh|Bản)/.test(name) && dims) {
      const [w, h] = [Number(dims[1]), Number(dims[2])];
      const video = /^Bản/.test(name);
      frames.push(ratioFrame({w, h, ratio: ratioName(w, h), label: name, img: imgFor(w / h), video}));
    } else {
      tiles.push(specTile(specPicture(name, spec), name, spec));
    }
  });

  const board = blueprint(texts, frames);
  const folder = assetFolder(c.assets);
  if (!board && !tiles.length && !folder) return '';
  const detail = specDrawer(specs);

  return `<section class="chap rv" id="ch-files-${c.id}">`
    + chapterHead('03 · CẦN CHUẨN BỊ GÌ', 'Nội dung và thông số.')
    + keyPoint('Kích thước là khuyến nghị của Google; chuẩn bị đủ để hệ thống có lựa chọn khi ghép hiển thị.',
      {ic: 'layers', label: 'NGUYÊN TẮC'})
    + filesBody({board, tiles, folder, detail})
    + '</section>';
}

// 04 — what to measure
// Each call-to-action is traced end to end: the button on the landing page,
// the screen the customer lands on (a call, a chat, a form…), and the row it
// adds to the report. Event names are examples of a naming scheme.
const MEASURE = [
  [/gọi/i, 'call', 'phone', 'click_call', 'Điện thoại của khách bật màn hình gọi tới hotline của shop, không cần gõ số.'],
  [/zalo/i, 'zalo', 'chat', 'click_zalo', 'Ứng dụng Zalo mở khung chat với tài khoản của shop; khách nhắn câu hỏi ngay.'],
  [/messenger/i, 'messenger', 'chat', 'click_messenger', 'Khung chat Messenger với trang của shop mở ra, kèm vài câu hỏi gợi ý sẵn.'],
  [/form|tư vấn/i, 'form', 'form', 'form_submit', 'Khách điền tên, số điện thoại, nhu cầu rồi bấm gửi; shop gọi lại sau.'],
  [/giá/i, 'price', 'tag', 'view_item', 'Trang sản phẩm mở ra với giá đang bán và tình trạng còn hàng.'],
  [/sản phẩm/i, 'product', 'cart', 'view_item', 'Trang chi tiết sản phẩm mở ra: ảnh, giá và nút thêm vào giỏ.'],
  [/bộ sưu tập/i, 'page', 'list', 'view_item_list', 'Trang bộ sưu tập mở ra với nhiều sản phẩm để khách chọn.'],
  [/cài/i, 'install', 'install', 'first_open', 'Ứng dụng cài xong và được mở lần đầu trên máy của khách.'],
  [/ứng dụng/i, 'store', 'store', 'click_store', 'Trang ứng dụng trên kho ứng dụng mở ra, có nút Cài đặt.'],
  [/video/i, 'video', 'play', 'video_view', 'Video phát trên trang để khách xem hết nội dung.'],
  [/./, 'page', 'page', 'page_view', 'Trang giới thiệu mở ra để khách đọc thêm trước khi quyết định.']
];

const VERIFY = {
  call: ['Đủ điều kiện', 'good'],
  zalo: ['Đã trả lời', 'consider'],
  messenger: ['Chưa phù hợp', 'fix'],
  form: ['Đủ điều kiện', 'good'],
  price: ['Cần đối soát', 'consider'],
  product: ['Khớp đơn', 'good'],
  install: ['Khớp nguồn đo', 'good'],
  store: ['Chưa phải lượt cài', 'consider'],
  video: ['Chỉ là tín hiệu', 'consider'],
  page: ['Chỉ là tín hiệu', 'consider']
};

function chapterMeasure(c) {
  const items = (c.ctaExamples || []).map(label => {
    const [, kind, ic, event, what] = MEASURE.find(([re]) => re.test(label));
    return {label, kind, ic, event, what};
  });

  const [tr1, trRest] = splitFirst(c.trackingRequirements);
  const key = keyPoint(tr1, {
    ic: 'chart',
    label: 'CẦN ĐO',
    extra: trRest ? more(`<p>${esc(trRest)}</p>`, {label: 'Đọc tiếp'}) : ''
  });

  const demo = items.length
    ? measureDemo({id: c.id, items, scenes: SCENE, verify: VERIFY,
      verifyHead: c.id === 'search' ? 'Đội tư vấn xác nhận' : 'Đối soát'})
    : '';

  return `<section class="chap rv" id="ch-measure-${c.id}">`
    + chapterHead('04 · ĐO ĐIỀU GÌ', 'Kết quả chỉ đọc được khi đã đo.')
    + key
    + demo
    + '<div class="notes" data-anim>'
    + noteCard('bid', 'GIÁ THẦU', c.bid)
    + noteCard('warn', 'LƯU Ý', c.caution)
    + '</div></section>';
}

// 05 — paths and diagnosis
// Each path is a card with a small trend; each symptom is the report a reader
// would actually see (one number in red), an arrow, and what to check.
// symptom → three metrics [label, value, status]; exactly one is 'fix'.
const DIAG_METRICS = {
  'Nhiều nhấp, ít yêu cầu': [['Lượt nhấp', '1.240', 'good'], ['Tỷ lệ nhấp', '6,8%', 'good'], ['Yêu cầu tư vấn', '4', 'fix']],
  'Có lead nhưng không phù hợp': [['Yêu cầu tư vấn', '36', 'good'], ['Chi phí / yêu cầu', '180.000₫', 'good'], ['Lead đúng nhu cầu', '5', 'fix']],
  'Sản phẩm không phân phối': [['Sản phẩm gửi lên', '48', 'good'], ['Lượt hiển thị', '0', 'fix'], ['Ngân sách đã chi', '2%', 'consider']],
  'Nhấp nhiều nhưng ít đơn': [['Lượt nhấp sản phẩm', '2.300', 'good'], ['Thêm vào giỏ', '140', 'consider'], ['Đơn hoàn tất', '6', 'fix']],
  'Bị bỏ qua sớm': [['Lượt hiển thị', '48.000', 'good'], ['Tỷ lệ xem', '9%', 'fix'], ['Tần suất', '1,8', 'good']],
  'Xem tốt nhưng ít hành động': [['Lượt xem', '18.500', 'good'], ['Tỷ lệ xem', '41%', 'good'], ['Lượt vào trang', '23', 'fix']],
  'CTR tốt nhưng lead kém': [['CTR', '3,9%', 'good'], ['Nhấp trong ứng dụng', '62%', 'consider'], ['Lead đạt', '2', 'fix']],
  'Ảnh bị cắt khó hiểu': [['Lượt hiển thị', '90.000', 'good'], ['CTR', '0,08%', 'fix'], ['Tỷ lệ ảnh', 'Chỉ 1:1', 'consider']],
  'Nội dung có tương tác nhưng ít lead': [['Tương tác', '3.100', 'good'], ['Lượt vào trang', '410', 'good'], ['Yêu cầu tư vấn', '3', 'fix']],
  'Kênh tiêu nhiều nhưng chất lượng thấp': [['Chi tiêu 1 kênh', '62%', 'consider'], ['Chuyển đổi', '40', 'good'], ['Lead đạt chuẩn', '8%', 'fix']],
  'Đạt nhiều chuyển đổi nhưng ít khách thực': [['Chuyển đổi', '210', 'good'], ['Là lượt xem trang', '86%', 'fix'], ['Khách thật', '9', 'consider']],
  'Ngân sách tập trung sai sản phẩm': [['Chi cho hàng giá thấp', '71%', 'fix'], ['Tổng giá trị', '12,4 tr₫', 'good'], ['Sản phẩm có hiển thị', '9 / 48', 'consider']],
  'Cài đặt rẻ nhưng ít sử dụng': [['Lượt cài', '3.200', 'good'], ['Chi phí / lượt cài', '4.500₫', 'good'], ['Mở lại sau 7 ngày', '6%', 'fix']],
  'Không thấy sự kiện cần tối ưu': [['Lượt cài', '1.150', 'good'], ['Sự kiện đăng ký', '0', 'fix'], ['Liên kết đo lường', 'Chưa xác minh', 'consider']]
};

function chapterPaths(c, atlas) {
  if (!atlas) return '';
  const body = pathsBody(atlas.paths, atlas.diagnosis, DIAG_METRICS);
  if (!body) return '';

  return `<section class="chap rv" id="ch-paths-${c.id}">`
    + chapterHead('05 · CÁCH TRIỂN KHAI', 'Hướng đi và cách đọc khi có vấn đề.')
    + body
    + '</section>';
}

// 06 — checklist
function chapterPlay(c, atlas) {
  const checks = atlas && atlas.checks ? atlas.checks : [];
  if (!checks.length) return '';

  return `<section class="chap rv" id="ch-play-${c.id}">`
    + chapterHead('06 · TRƯỚC KHI CHẠY', 'Danh sách kiểm tra.',
      'Đánh dấu từng mục để xem mức sẵn sàng. Trạng thái chỉ hiển thị trên trình duyệt của bạn.')
    + checklistBlock(c.id, checks)
    + '</section>';
}

/* ------------------------------------------------------------------ *
 * One campaign panel
 * ------------------------------------------------------------------ */
function panel(c, i) {
  const atlasKey = c.id;
  const atlas = campaignAtlasData[atlasKey];
  const guide = campaignGuides[c.id];

  // Display was folded into Demand Gen; keep its content on the Demand Gen panel.
  const extraAtlas = c.id === 'demand' ? campaignAtlasData.display : null;
  const merged = atlas && extraAtlas
    ? {
      ...atlas,
      formats: [...atlas.formats, ...extraAtlas.formats],
      specs: [...atlas.specs, ...extraAtlas.specs],
      paths: [...atlas.paths, ...extraAtlas.paths],
      checks: [...atlas.checks, ...extraAtlas.checks],
      diagnosis: [...atlas.diagnosis, ...extraAtlas.diagnosis]
    }
    : atlas;

  const displayNote = c.id === 'demand'
    ? `<div class="strip"><span>CẬP NHẬT ${esc(platformReview.lastUpdated)}</span><p>${esc(platformReview.display)} `
      + `<a href="${esc(platformReview.displaySource)}" target="_blank" rel="noopener">Tài liệu Google ↗</a></p></div>`
    : '';

  return panelShell({
    c, i,
    extra: displayNote + sourceList(sources, c.sourceKeys || []),
    chapters: chapterLook(c, merged)
      + chapterHow(c, guide)
      + chapterFiles(c, merged)
      + chapterMeasure(c)
      + chapterPaths(c, merged)
      + chapterPlay(c, merged)
  });
}

/* ------------------------------------------------------------------ *
 * Recap
 * ------------------------------------------------------------------ */
function recap() {
  return recapSection({
    types: campaignTypes,
    icons: RECAP_ICONS,
    head: {
      eyebrow: 'NHỚ NHANH',
      title: 'Sáu loại, sáu tình huống.',
      lead: 'Chọn một ô để quay lại đúng phần nội dung ở trên.'
    },
    next: {
      eyebrow: 'BƯỚC TIẾP THEO',
      title: 'Chưa rõ nên chạy loại nào?',
      text: 'Trang tiếp theo đi từ mục tiêu kinh doanh và đối tượng để chọn cách chạy phù hợp.',
      href: PAGES[1].href,
      cta: PAGES[1].num + ' ' + PAGES[1].label
    }
  });
}

/* ------------------------------------------------------------------ */
export function formatsPage() {
  const panels = campaignTypes.map((c, i) => panel(c, i)).join('');

  return hero()
    + stepsBar('formats')
    + orbit()
    + section({id: 'campaigns', inner: picker() + panels})
    + recap();
}

export const formatsMeta = {
  title: 'Google Ads: cách chạy và định dạng quảng cáo',
  description: 'Sáu loại chiến dịch Google Ads: quảng cáo trông như thế nào, chạy ra sao, cần chuẩn bị gì và đo điều gì.'
};

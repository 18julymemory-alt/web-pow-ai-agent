// ChatGPT Ads mock screens (CHATGPT_ADS_BUILD_PROMPT.md, mục 2).
//
// Same rules as the Google, Facebook, TikTok and Zalo mocks, plus:
// - No OpenAI logo, no "ChatGPT" wordmark, no real assistant avatar. The
//   window is titled "Trợ lý AI"; the assistant is a plain neutral dot.
// - No partner company names. One sample brand, Nhà Thơm (nhathom.example),
//   and its six products; home fragrance is in an allowed category.
// - The assistant's answer never names the advertiser: ads do not change
//   the answer. The ad sits below it, after a rule and the "Được tài trợ" label.
// - Text 11px or larger; tilt 4° or less; pictures cover a fixed frame.
// Every class here starts with cgm- (mocks), cgh- (hero) or pa-cg (picker)
// and is styled in dist/chatgpt-ads-lp.css.
import {handset, win, BRAND, mkImg as img, mkFav as fav} from '../google-ads-lp/mocks.mjs';
import {icon, shot, esc, SHOP, PRODUCTS, reportTable} from '../google-ads-lp/visuals.mjs';
import {siteScreen, formScreen, crmScreen} from '../google-ads-lp/scenes.mjs';

const wrap = html => `<div class="cgm" data-mock>${html}</div>`;
const phone = (inner, cls = '') => handset(inner, {cls: 'cgm-phone' + (cls ? ' ' + cls : '')});

export const QUESTION = 'Gợi ý quà tân gia dưới 500 nghìn cho người thích mùi gỗ';
const ANSWER = [
  'Với ngân sách dưới 500 nghìn, bạn có thể cân nhắc:',
  '• Nến thơm mùi gỗ tuyết tùng: ấm, dễ dùng, hợp phòng khách.',
  '• Tinh dầu gỗ kèm que khuếch tán cho góc làm việc.',
  '• Khăn cotton kèm túi thơm nhỏ nếu người nhận thích đồ dùng hằng ngày.'
];
const AD = {
  title: 'Nến thơm gỗ tuyết tùng, hộp quà sẵn',
  desc: 'Sáp đậu nành, đốt đến 40 giờ. Gói quà miễn phí, giao 2 giờ nội thành.',
  pic: 's6'
};

/* ------------------------------------------------------------------ *
 * Conversation pieces
 * ------------------------------------------------------------------ */
const top = (title = 'Trợ lý AI') => `<div class="cgm-top">${icon('menu')}<b>${esc(title)}</b>${icon('plus')}</div>`;
const ask = (q = QUESTION) => `<div class="cgm-q"><p>${esc(q)}</p></div>`;
const answer = (lines = ANSWER, bars = 2) => '<div class="cgm-a"><i class="cgm-dot" aria-hidden="true"></i><div>'
  + lines.map(l => `<p>${esc(l)}</p>`).join('')
  + (bars ? `<span class="cgm-bars">${'<i></i>'.repeat(bars)}</span>` : '') + '</div></div>';
const composer = () => `<div class="cgm-in"><span>Hỏi bất kỳ điều gì</span>${icon('mic')}</div>`;
export const sponsored = () => '<div class="cgm-sp"><span>Được tài trợ</span></div>';

const adHead = (name = BRAND, url = SHOP, letter = 'N') => `<div class="cgm-adh">${fav(letter, letter === 'N' ? '' : 'is-alt')}`
  + `<span><b>${esc(name)}</b><em>${esc(url)}</em></span><i class="cgm-more">${icon('dots')}</i></div>`;

// The ad card: favicon + name, headline (≤ 50), description (≤ 100), a
// square picture; the whole card opens the landing page.
export function adCard({title = AD.title, desc = AD.desc, pic = AD.pic, name = BRAND, url = SHOP, letter = 'N', extra = '', cls = ''} = {}) {
  return `<div class="cgm-ad${cls ? ' ' + cls : ''}">${adHead(name, url, letter)}`
    + `<div class="cgm-adb"><span><b class="cgm-adt">${esc(title)}</b><p>${esc(desc)}</p></span>${img(pic, 'r11')}</div>`
    + extra + '</div>';
}

const STARS = ['4,8', '4,6', '4,7', '4,9', '4,5', '4,8'];
const COUNTS = ['126', '88', '64', '212', '41', '157'];
const sale = p => Math.round(parseInt(p.replace(/\D/g, ''), 10) * .85 / 1000) * 1000;
const vnd = n => n.toLocaleString('vi-VN') + '₫';

// Product card from the feed: picture, name, price, sale price, stars, brand.
export function productCard(i, {cls = ''} = {}) {
  const [pic, name, price] = PRODUCTS[i % PRODUCTS.length];
  return `<div class="cgm-pc${cls ? ' ' + cls : ''}">${img(pic, 'r11')}`
    + `<b class="cgm-pn">${esc(name)}</b>`
    + `<span class="cgm-stars">${icon('star')}${STARS[i % 6]} <em>(${COUNTS[i % 6]})</em></span>`
    + `<span class="cgm-price"><b>${vnd(sale(price))}</b><s>${esc(price)}</s></span>`
    + `<em class="cgm-brand">${BRAND}</em></div>`;
}

const carousel = (items = [5, 0, 2, 4]) => '<div class="cgm-car">'
  + `<div class="cgm-track">${items.map(i => productCard(i)).join('')}</div>`
  + `<span class="cgm-arr is-prev">${icon('back')}</span><span class="cgm-arr is-next">${icon('arrow')}</span></div>`;

// A phone conversation: question, independent answer, then what comes below.
const SHORT = ANSWER.slice(0, 3);
const convo = (below, {q, a = SHORT, bars = 1, title} = {}) => phone(top(title)
  + `<div class="cgm-body">${ask(q)}${answer(a, bars)}${below}</div>` + composer());

// The same on a desktop browser: a thin history rail and the main column.
const desk = (below, {q, a} = {}) => win('tro-ly-ai › cuoc-tro-chuyen', '<div class="cgm-desk">'
  + `<div class="cgm-rail">${icon('plus')}${icon('search')}${icon('clock')}</div>`
  + `<div class="cgm-main">${ask(q)}${answer(a, 1)}${below}${composer()}</div></div>`, 'cgm-win');

/* ------------------------------------------------------------------ *
 * Variants
 * ------------------------------------------------------------------ */
const contextLine = '<p class="cgm-ctx">Một vài nơi bán quà mùi gỗ bạn có thể xem thêm</p>';

const menuCard = () => adCard({extra: '<ul class="cgm-menu">'
  + `<li>${icon('close')}Ẩn quảng cáo</li><li>${icon('flag')}Báo cáo quảng cáo</li>`
  + `<li>${icon('need')}Vì sao tôi thấy quảng cáo này</li></ul>`, cls: 'is-menu'});

function settings() {
  return phone(top('Cài đặt') + '<div class="cgm-set">'
    + `<b class="cgm-h">${icon('back')}Quảng cáo</b>`
    + '<div class="cgm-row"><span><b>Cá nhân hóa quảng cáo</b><em>Dùng thông tin từ cuộc trò chuyện và tài khoản để chọn quảng cáo phù hợp hơn.</em></span><i class="cgm-tgl is-on"></i></div>'
    + '<div class="cgm-row"><span><b>Lịch sử quảng cáo</b><em>Quảng cáo đã ẩn và đã báo cáo.</em></span>' + icon('arrow') + '</div>'
    + '<span class="cgm-btn is-ghost">Xóa dữ liệu dùng cho quảng cáo</span>'
    + '<p class="cgm-note">Sau khi xóa, dữ liệu không còn dùng để chọn quảng cáo và được giữ tối đa 30 ngày trước khi xóa khỏi máy chủ.</p>'
    + '</div>');
}

function sensitive() {
  return phone(top() + '<div class="cgm-body">'
    + ask('Dạo này mình mất ngủ và hay lo âu, nên làm gì?')
    + answer(['Cảm giác lo âu kéo dài và mất ngủ nên được chia sẻ với người bạn tin tưởng hoặc chuyên gia.',
      'Một vài việc có thể thử: giữ giờ ngủ cố định, hạn chế màn hình trước khi ngủ.'], 2)
    + `<div class="cgm-none">${icon('shield')}<span>Không hiển thị quảng cáo trong ngữ cảnh nhạy cảm</span></div>`
    + '</div>' + composer());
}

// Free and Go see ads; the paid business and personal plans do not.
export function plans() {
  const row = (name, ads) => `<li class="${ads ? 'is-ads' : ''}"><b>${name}</b><span>${icon(ads ? 'check' : 'minus')}${ads ? 'Có quảng cáo' : 'Không quảng cáo'}</span></li>`;
  return wrap('<div class="cgm-plans">'
    + '<small>Gói của người dùng</small><ul>'
    + [['Free', 1], ['Go', 1], ['Plus', 0], ['Pro', 0], ['Business', 0], ['Enterprise', 0], ['Edu', 0]].map(([n, a]) => row(n, a)).join('')
    + '</ul><p>Không hiện quảng cáo cho tài khoản được xác định dưới 18 tuổi.</p></div>');
}

/* ------------------------------------------------------------------ *
 * Sponsored Agents (đang thử nghiệm)
 * ------------------------------------------------------------------ */
const trial = '<span class="cgm-trial">Đang thử nghiệm</span>';
const chatBtn = `<span class="cgm-chatbtn">${icon('chat')}Trò chuyện</span>`;

function agentPanel(stage = 'open') {
  const msgs = [
    ['shop', 'Chào bạn, mình là trợ lý của Nhà Thơm. Bạn đang chọn quà cho dịp gì?'],
    ['me', 'Quà tân gia, người nhận thích mùi gỗ']
  ];
  const suggest = stage === 'suggest'
    ? '<div class="cgm-am is-shop"><p>Bạn có thể xem hai mẫu này, đều dưới 500 nghìn:</p>'
      + `<div class="cgm-two">${productCard(5, {cls: 'is-wide is-sm'})}${productCard(2, {cls: 'is-wide is-sm'})}</div></div>`
    : stage === 'site'
      ? '<div class="cgm-am is-me"><p>Lấy mẫu nến gỗ tuyết tùng, gói quà giúp mình</p></div>'
        + '<div class="cgm-am is-shop"><p>Mẫu này còn hàng, gói quà miễn phí. Bạn đặt trên website nhé:</p></div>'
      : '';
  const link = stage === 'site' ? `<span class="cgm-btn">${icon('link')}Mở ${SHOP}</span>` : '';
  return phone('<div class="cgm-agent">'
    + `<div class="cgm-agh">${icon('close')}${fav()}<span><b>${BRAND}</b><em>Được tài trợ · trò chuyện với doanh nghiệp</em></span></div>`
    + trial
    + '<div class="cgm-agb">'
    + msgs.map(([who, t]) => `<div class="cgm-am is-${who}"><p>${esc(t)}</p></div>`).join('')
    + suggest + link + '</div>'
    + `<div class="cgm-in"><span>Nhắn cho ${BRAND}</span>${icon('send')}</div></div>`);
}

/* ------------------------------------------------------------------ *
 * After the tap: site, product page, thanks, cart, checkout, report
 * ------------------------------------------------------------------ */
const site = () => siteScreen({});
const addr = path => `<div class="cgm-addr">${icon('lock')}<span>${SHOP}/${path}</span></div>`;

function done(title, text, event, path = 'cam-on') {
  return phone('<div class="cgm-thx">' + addr(path)
    + `<span class="cgm-ok">${icon('check')}</span><b>${esc(title)}</b><p>${esc(text)}</p>`
    + `<span class="cgm-ev">Pixel · ${esc(event)}</span></div>`);
}

function cart(step = 'cart') {
  const [pic, name, price] = PRODUCTS[5];
  const checkout = step === 'checkout';
  return phone('<div class="cgm-cart">' + addr(checkout ? 'thanh-toan' : 'gio-hang')
    + `<b class="cgm-h">${checkout ? 'Thanh toán' : 'Giỏ hàng'}</b>`
    + `<div class="cgm-line">${img(pic, 'r11')}<span><b>${esc(name)}</b><em>${vnd(sale(price))} · Gỗ tuyết tùng</em></span></div>`
    + (checkout
      ? '<div class="cgm-f"><small>Địa chỉ</small><span>12 Lý Tự Trọng, Quận 1</span></div><div class="cgm-f"><small>Thanh toán</small><span>Khi nhận hàng</span></div>'
      : '<div class="cgm-f"><small>Gói quà</small><span>Miễn phí</span></div>')
    + `<div class="cgm-sum"><span>Tổng</span><b>${vnd(sale(price))}</b></div>`
    + `<span class="cgm-btn">${checkout ? 'Đặt hàng' : 'Thanh toán'}</span>`
    + `<span class="cgm-ev">Pixel · ${checkout ? 'checkout_started' : 'items_added'}</span></div>`);
}

export function convReport() {
  return win('ads-manager › bao-cao', '<div class="cgm-rep">'
    + reportTable({title: 'Chiến dịch · Quà tặng doanh nghiệp (số mẫu)', icon: 'chart',
      head: ['Chỉ số', 'Giá trị'],
      rows: [['Impressions', '42.000'], ['Clicks', '510'], ['CTR', '1,21%'], ['Avg CPC', '8.800₫'],
        ['Conversions · lead_created', {text: '38', status: 'good'}], ['Spend', {text: 'Trễ 7–8 giờ', status: 'consider'}]]})
    + '<p class="cgm-note">Chuyển đổi có thể mất 24–48 giờ mới hiện. Nhà quảng cáo không thấy nội dung trò chuyện.</p></div>');
}

/* ------------------------------------------------------------------ *
 * Chapter 01 — one mock per format id
 * ------------------------------------------------------------------ */
const SECOND = {title: 'Tinh dầu gỗ và que khuếch tán', desc: 'Mùi gỗ dịu cho góc làm việc. Bộ quà 3 món, dưới 450 nghìn.', pic: 's3'};
const OTHER = {name: 'Mộc Hương', url: 'mochuong.example', letter: 'M', title: 'Bộ quà gỗ thơm thủ công',
  desc: 'Gỗ bách xanh, túi thơm và thiệp viết tay. Giao toàn quốc.', pic: 's5'};

const RENDER = {
  'card-phone': () => convo(sponsored() + adCard()),
  'card-web': () => desk(sponsored() + adCard()),
  'card-context': () => convo(sponsored() + contextLine + adCard(), {bars: 0}),
  'card-menu': () => convo(sponsored() + menuCard(), {bars: 0}),
  'card-settings': () => settings(),

  'pair-same': () => convo(sponsored() + adCard({cls: 'is-mini'}) + adCard({...SECOND, cls: 'is-mini'}), {bars: 0, a: ANSWER.slice(0, 2)}),
  'pair-two': () => convo(sponsored() + adCard({cls: 'is-mini'}) + adCard({...OTHER, cls: 'is-mini'}), {bars: 0, a: ANSWER.slice(0, 2)}),
  'pair-web': () => desk(sponsored() + adCard() + adCard(SECOND), {a: ANSWER.slice(0, 3)}),

  'prod-phone': () => convo(sponsored() + productCard(5, {cls: 'is-wide'}), {q: 'Nến thơm mùi gỗ làm quà, dưới 400 nghìn', a: ANSWER.slice(0, 3)}),
  'prod-web': () => desk(sponsored() + `<div class="cgm-grid2">${productCard(5)}${productCard(2)}</div>`, {q: 'Nến thơm mùi gỗ làm quà, dưới 400 nghìn', a: ANSWER.slice(0, 3)}),
  'prod-land': () => site(),

  'car-phone': () => convo(sponsored() + carousel(), {a: ANSWER.slice(0, 2), bars: 0}),
  'car-web': () => desk(sponsored() + carousel([5, 0, 2, 4, 3]), {a: ANSWER.slice(0, 3)}),
  'car-land': () => site(),

  'conv-card': () => convo(sponsored() + adCard({title: 'Quà tặng doanh nghiệp in logo', desc: 'Hộp 3 nến, in logo theo yêu cầu. Báo giá trong 2 giờ.', pic: 's-desk'}),
    {q: 'Nên tặng gì cho 50 khách hàng dịp cuối năm?', a: ['Với quà số lượng lớn, nên chọn món dùng được lâu và in được logo:', '• Hộp nến hoặc tinh dầu.', '• Sổ tay, bình giữ nhiệt.']}),
  'conv-site': () => formScreen({done: false}),
  'conv-thanks': () => done('Đã nhận yêu cầu', 'Nhà Thơm gửi báo giá trong 2 giờ làm việc.', 'lead_created'),
  'conv-report': () => convReport(),

  'agent-card': () => convo(sponsored() + adCard({extra: trial + chatBtn}), {bars: 0, a: ANSWER.slice(0, 2)}),
  'agent-open': () => agentPanel('open'),
  'agent-suggest': () => agentPanel('suggest'),
  'agent-site': () => agentPanel('site')
};

export const CG_MOCK_IDS = Object.keys(RENDER);
export function renderCg(id) {
  const r = RENDER[id];
  if (!r) throw new Error('No ChatGPT mock for ' + id);
  return wrap(r());
}

// Page 01 principles and page 02 pictures reuse these.
export const sensitiveMock = () => wrap(sensitive());
export const settingsMock = () => wrap(settings());

/* ------------------------------------------------------------------ *
 * Chapter 04 — the ad with the tappable buttons, and the screen behind
 * each button
 * ------------------------------------------------------------------ */
const MEAS_BELOW = {
  card: () => adCard(), pair: () => adCard(), product: () => productCard(5, {cls: 'is-wide'}),
  carousel: () => productCard(5, {cls: 'is-wide'}), conv: () => adCard({title: 'Quà tặng doanh nghiệp in logo', desc: 'Hộp 3 nến, in logo theo yêu cầu.', pic: 's-desk'}),
  agent: () => adCard({extra: chatBtn})
};

export function measureAd(type) {
  return ({inline = '', cls = ''}) => handset(top()
    + `<div class="cgm-body">${ask()}${sponsored()}${MEAS_BELOW[type]()}`
    + `<div class="sc-inline cgm-inline">${inline}</div></div>`,
  {cls: `sc-phone cgm-phone cgm-meas${cls ? ' ' + cls : ''}`});
}

export function measureScenes(type) {
  const sale = type === 'product' || type === 'carousel';
  return {
    land: () => wrap(site()),
    pdp: () => wrap(site()),
    lead: () => wrap(formScreen({done: true})),
    reg: () => wrap(done('Tạo tài khoản xong', 'Bạn nhận ưu đãi 10% cho đơn đầu tiên.', 'registration_completed', 'dang-ky')),
    sub: () => wrap(done('Đã đăng ký gói', 'Gói nến giao mỗi tháng · kỳ đầu giao trong 2 giờ.', 'subscription_created', 'goi-thang')),
    cart: () => wrap(cart('cart')),
    checkout: () => wrap(cart('checkout')),
    order: () => wrap(done('Đặt hàng thành công', 'Đơn #NT-1024 · Nhà Thơm gọi xác nhận trong 15 phút.', 'order_created')),
    agentchat: () => wrap(agentPanel('open')),
    agentsuggest: () => wrap(agentPanel('suggest')),
    crm: () => crmScreen(sale ? 'sale' : 'qualified', {sources: {
      card: ['ChatGPT Ads', 'Website', 'ChatGPT Ads'], pair: ['ChatGPT Ads', 'ChatGPT Ads', 'Website'],
      product: ['ChatGPT Ads', 'ChatGPT Ads', 'Website'], carousel: ['ChatGPT Ads', 'Website', 'ChatGPT Ads'],
      conv: ['Form · ChatGPT Ads', 'Form · ChatGPT Ads', 'Hotline'], agent: ['ChatGPT Ads', 'Website', 'Hotline']
    }[type]})
  };
}

/* ------------------------------------------------------------------ *
 * Page 02 — the screen after the tap per objective, the ad per stage
 * ------------------------------------------------------------------ */
export const AFTER_CLICK = {
  views: () => wrap(convo(sponsored() + adCard(), {bars: 0})),
  clicks: () => wrap(site()),
  conversions: () => wrap(done('Đã nhận yêu cầu', 'Nhà Thơm gửi báo giá trong 2 giờ làm việc.', 'lead_created'))
};

export const STAGE_AD = {
  cold: () => wrap(convo(sponsored() + adCard(), {bars: 0, a: ANSWER.slice(0, 3)})),
  research: () => wrap(convo(sponsored() + contextLine + adCard({title: 'Cách chọn nến thơm làm quà', desc: 'So sánh sáp, bấc và mùi hương. Bảng chọn nhanh theo phòng.', pic: 's-shelf'}),
    {q: 'Nến sáp đậu nành và sáp parafin khác nhau thế nào?', a: ['Hai loại khác nhau ở nguồn gốc, thời gian cháy và khói:', '• Sáp đậu nành cháy chậm, ít khói.', '• Sáp parafin rẻ hơn, giữ mùi mạnh.'], bars: 0})),
  buy: () => wrap(convo(sponsored() + carousel(), {q: 'Mua nến thơm mùi gỗ ở đâu, dưới 400 nghìn?', a: ANSWER.slice(0, 2), bars: 0})),
  advice: () => wrap(convo(sponsored() + adCard({title: 'Tư vấn quà tặng doanh nghiệp', desc: 'Để lại số, Nhà Thơm gọi lại trong 15 phút.', pic: 's-desk'}),
    {q: 'Cần tư vấn quà cho 50 khách hàng, in logo được không?', a: ['Nhiều nơi nhận in logo lên hộp quà với số lượng từ vài chục hộp.', 'Bạn nên hỏi trước thời gian in và mẫu hộp.'], bars: 0})),
  customer: () => customerAudience('exclude')
};

// Custom audiences in Ads Manager; `on` marks the row being read.
export function customerAudience(on = '') {
  const rows = [
    ['include', 'Người đăng ký bản tin', '41.200 người khớp', 'Nhắm', 'good'],
    ['exclude', 'Khách đã mua 90 ngày', 'Tải lên từ CRM · không cần tối thiểu', 'Loại trừ', 'consider'],
    ['multiplier', 'Khách mua sỉ', '32.400 người khớp', 'Giá thầu +20%', 'good']
  ];
  return wrap(win('ads-manager › doi-tuong', '<div class="cgm-aud">'
    + `<b class="cgm-h">${icon('users')}Đối tượng tùy chỉnh</b>`
    + rows.map(([id, name, sub, chip, tone]) => `<div class="cgm-audrow${id === on ? ' is-hi' : ''}"><span><b>${name}</b><em>${sub}</em></span>`
      + `<span class="v-chip" data-accent="${tone}">${chip}</span></div>`).join('')
    + '<p class="cgm-note">Nhắm và điều chỉnh giá thầu cần tối thiểu 25.000 người khớp; loại trừ không cần.</p></div>'));
}

// Page 02 — context hints: a good hint and a weak one.
export function hintsBox({weak = false} = {}) {
  const good = ['Người dùng tìm quà tân gia giá vừa phải', 'Hỏi cách làm phòng ngủ thơm dịu, dễ ngủ', 'So sánh nến thơm và tinh dầu cho căn hộ nhỏ'];
  const bad = ['nến', 'quà', 'mua nến giá rẻ'];
  return win('ads-manager › nhom-quang-cao › goi-y-ngu-canh', '<div class="cgm-hints">'
    + `<b class="cgm-h">${icon('thought')}Gợi ý ngữ cảnh <em>${(weak ? bad : good).length} / 2.000</em></b>`
    + '<ul>' + (weak ? bad : good).map(t => `<li class="${weak ? 'is-weak' : ''}">${icon(weak ? 'alert' : 'check')}<span>${esc(t)}</span></li>`).join('') + '</ul>'
    + `<p class="cgm-note">${weak ? 'Chỉ là từ khóa trống: không cho biết người dùng đang ở tình huống nào.' : 'Mỗi dòng tả một tình huống cụ thể mà quảng cáo có ích.'}</p></div>`);
}

export function platformBox() {
  return win('ads-manager › chien-dich › nham-muc-tieu', '<div class="cgm-hints">'
    + `<b class="cgm-h">${icon('mobile')}Nền tảng</b><ul class="is-tgl">`
    + [['iOS (ứng dụng)', 1], ['Android (ứng dụng)', 1], ['Web trên máy tính', 1], ['Web trên iOS', 0], ['Web trên Android', 0]]
      .map(([t, on]) => `<li class="${on ? 'is-on' : 'is-off'}"><span>${t}</span><i class="cgm-tgl${on ? ' is-on' : ''}"></i></li>`).join('')
    + '</ul></div>');
}

export function countryBox() {
  return win('ads-manager › chien-dich › nham-muc-tieu', '<div class="cgm-hints">'
    + `<b class="cgm-h">${icon('pin')}Vị trí</b>`
    + `<div class="cgm-f"><small>Quốc gia</small><span>Việt Nam ${icon('check')}</span></div>`
    + `<div class="cgm-f is-dim"><small>Tỉnh / thành phố</small><span>Kiểm tra trong Ads Manager</span></div>`
    + '<p class="cgm-note">Chiến dịch từ danh mục sản phẩm chỉ nhắm theo quốc gia.</p></div>');
}

/* ------------------------------------------------------------------ *
 * Page 02 — industries: a small ad with a verdict
 * ------------------------------------------------------------------ */
export function verdictCard(title, verdict, text, pic = 's6') {
  const ic = {ok: 'check', review: 'alert', no: 'close', ctx: 'shield'}[verdict];
  return wrap(`<div class="cgm-verdict is-${verdict}">`
    + (verdict === 'ctx'
      ? `<div class="cgm-vq">${ask('Mình đang lo âu, nên làm gì?')}<div class="cgm-none">${icon('shield')}<span>Không có quảng cáo</span></div></div>`
      : sponsored() + adCard({title, desc: text, pic, cls: 'is-mini'}))
    + `<span class="cgm-stamp">${icon(ic)}</span></div>`);
}

/* ------------------------------------------------------------------ *
 * Page 01 chapter 03 — the product feed file, the agent brief
 * ------------------------------------------------------------------ */
export function feedSheet() {
  const rows = [[5, 'NT-200'], [0, 'TD-30'], [2, 'KT-150']];
  return win('danh-muc.csv · 9 trường bắt buộc', '<div class="cgm-feed">'
    + '<table><thead><tr><th>Mã</th><th>Tên</th><th>Giá</th><th>Giá KM</th><th>Ảnh</th></tr></thead><tbody>'
    + rows.map(([i, id]) => {
      const [pic, name, price] = PRODUCTS[i];
      return `<tr><td>${id}</td><td>${esc(name)}</td><td>${esc(price)}</td><td>${vnd(sale(price))}</td><td>${img(pic, 'r11')}</td></tr>`;
    }).join('')
    + '</tbody></table><p class="cgm-note">Mẫu vài cột. Đủ chín trường bắt buộc xem trong tài liệu Product Feeds; sản phẩm hết hạn sau 2 tuần nếu không tải lại.</p></div>', 'cgm-sheet');
}

export function agentSheet() {
  return win('thong-tin-cho-tro-ly · bản nháp', '<div class="cgm-hints">'
    + `<b class="cgm-h">${icon('form')}Doanh nghiệp chuẩn bị ${trial}</b><ul>`
    + ['Giá, chất liệu, thời gian đốt của từng mẫu nến', 'Chính sách giao 2 giờ, gói quà, đổi trả 7 ngày',
      '10 câu khách hay hỏi và câu trả lời đã duyệt', 'Liên kết sang trang sản phẩm']
      .map(t => `<li>${icon('check')}<span>${t}</span></li>`).join('')
    + '</ul><p class="cgm-note">Định dạng thông tin cho Sponsored Agents chưa được công bố. Danh sách trên là việc nên chuẩn bị.</p></div>', 'cgm-sheet');
}

/* ------------------------------------------------------------------ *
 * Hero stack and picker art
 * ------------------------------------------------------------------ */
export function heroStack() {
  const chat = `<div class="cgh-chat"><span class="cgh-q">${esc(QUESTION)}</span>`
    + '<span class="cgh-a"><i class="cgm-dot"></i><span class="cgm-bars"><i></i><i></i><i></i></span></span>'
    + `${sponsored()}${adCard({cls: 'is-mini'})}</div>`;
  const car = `<div class="cgh-car">${productCard(5, {cls: 'is-sm'})}</div>`;
  const brand = `<div class="cgh-agent"><span class="cgh-bar">${BRAND} · Được tài trợ</span>`
    + '<p>Bạn đang chọn quà cho dịp gì?</p><p class="is-me">Quà tân gia, mùi gỗ</p></div>';
  const stats = '<div class="cgh-stats">' + [['Impressions', '42.000'], ['Clicks', '510'], ['CTR', '1,21%']]
    .map(([k, v]) => `<span><em>${k}</em><b>${v}</b></span>`).join('') + '<small>Số mẫu</small></div>';

  return '<div class="hero-stage" aria-hidden="true"><div class="stack" id="heroStack">'
    + `<div class="card3d c-serp cgc-chat">${chat}<span class="c-tag">Dưới câu trả lời</span></div>`
    + `<div class="card3d c-shop cgc-car">${car}<span class="c-tag">Sản phẩm</span></div>`
    + `<div class="card3d c-yt cgc-agent">${brand}<span class="c-tag">Đang thử nghiệm</span></div>`
    + `<div class="card3d c-map cgc-stats">${stats}<span class="c-tag">Ads Manager</span></div>`
    + `<div class="card3d c-logo"><span class="c-tap">${icon('tap')}</span></div>`
    + '</div></div>';
}

const paCard = (pic = 's6', extra = '') => '<span class="pa-cgcard">'
  + `<span class="pa-cgsp">Được tài trợ</span><span class="pa-cgrow"><span><b>${BRAND}</b><em>Nến gỗ tuyết tùng</em></span>`
  + `<i class="photo">${shot(pic)}</i></span>${extra}</span>`;
const paProd = (i, cls = '') => {
  const [pic, name, price] = PRODUCTS[i];
  return `<span class="pa-cgprod${cls}"><i class="photo">${shot(pic)}</i><b>${esc(name)}</b><em>${vnd(sale(price))}</em></span>`;
};

const PICK_ART = {
  card: () => `<div class="pa-cgcol"><span class="pa-cgans"><i class="cgm-dot"></i><s></s><s></s></span>${paCard()}</div>`,
  pair: () => `<div class="pa-cgcol">${paCard('s6')}${paCard('s3')}</div>`,
  product: () => `<div class="pa-cgcol">${paProd(5, ' is-one')}</div>`,
  carousel: () => `<div class="pa-cgrowp">${paProd(5)}${paProd(0)}${paProd(2)}<span class="pa-cgnext">${icon('arrow')}</span></div>`,
  conv: () => `<div class="pa-cgcol">${paCard('s-desk')}<span class="pa-cgev">${icon('check')}lead_created</span></div>`,
  agent: () => `<div class="pa-cgcol"><span class="pa-cgchat"><b>${BRAND}</b><p>Bạn chọn quà cho dịp gì?</p></span>`
    + `<span class="pa-cgtrial">Đang thử nghiệm</span></div>`
};

export function pickArtCg(id) {
  const r = PICK_ART[id];
  return r ? `<span class="pa pa-cg-${id}" aria-hidden="true">${r()}</span>` : '';
}

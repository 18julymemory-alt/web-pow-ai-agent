// TikTok Ads landing page 03 — "Chi phí & hiệu quả".
// Same frame as the Google and Facebook page 03: money (with Vietnam VAT),
// bidding, the indicators as a funnel, the measurement pipeline, event names,
// the POWAI rollout, the checklist, FAQ and the consultation form. Numbers are
// samples, labelled so.

import {
  SOURCES, CHECKED, TAX_RATE, COST_BUCKETS, BILLING, BIDS, BID_ORDER, SAMPLE as S, KPIS, KPI_TIERS, TRACKING, EVENTS,
  ROLLOUT, PHASES, PREP, PREP_GROUPS, FAQ, FAQ_TOPICS, CONTACT_GOALS
} from './data.mjs';
import {measureScenes} from './mocks.mjs';
import {
  esc, section, stepsBar, nextBlock, sourceList, icon, SHOP, PAGES, FB_PAGES, TT_PAGES,
  more, funnel as funnelTabs, equation, pipeline, utmBar, tagList, reportTable, barChart, targetDots
} from '../google-ads-lp/shared.mjs';
import {
  chapter, toc, workbench, facts, note, invoiceScreen, bidScreen, eventStream, crmScreen, formScreen
} from '../google-ads-lp/scenes.mjs';
import {
  heroBlock, costSplit, calculator, rolloutBody, prepBody, faqBody, contactChapter, recapLinks
} from '../google-ads-lp/panel-kit.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu TikTok Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu TikTok:'});
const vnd = n => Math.round(n).toLocaleString('vi-VN') + '₫';
const vndK = n => vnd(Math.round(n / 1000) * 1000);
const pct = (a, b) => (a / b * 100).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + '%';
const num = n => n.toLocaleString('vi-VN');
const dateVi = iso => iso.split('-').reverse().join('/');

/* ------------------------------------------------------------------ *
 * Hero — the funnel as a stack of floating meters (decoration only)
 * ------------------------------------------------------------------ */
const HERO_STEPS = [['impressions', 100], ['v6s', 62], ['clicks', 42], ['lead', 24], ['qualified', 13]];

function hero() {
  const meters = HERO_STEPS.map(([id, width], i) => `<div class="meter3d" data-step="${i}">`
    + `<b>${esc(KPIS[id][0])}</b>`
    + `<i aria-hidden="true"><s style="width:${width}%"></s></i></div>`).join('');

  return heroBlock({
    crumb: 'Chi phí & hiệu quả',
    eyebrow: 'POWAI / TIKTOK ADS · 03',
    title: 'Chi phí & hiệu quả',
    sub: 'Tiền đi đâu, và <em>đọc kết quả</em> bằng chỉ số nào.',
    lead: 'Tiền trả cho TikTok chỉ là một phần chi phí. Trang này tách các khoản phải trả và thuế, '
      + 'năm cách đặt giá thầu, hai mươi mốt chỉ số theo thứ tự phễu và cách POWAI triển khai cùng doanh nghiệp.',
    primary: ['#chi-so', 'Xem hai mươi mốt chỉ số'],
    ghost: ['#lien-he', 'Gửi yêu cầu tư vấn'],
    stage: '<div class="hero-stage" aria-hidden="true">'
      + `<div class="meters3d" id="heroStack">${meters}</div></div>`
  });
}

/* ------------------------------------------------------------------ *
 * 01 — Money
 * ------------------------------------------------------------------ */
// A sample statement; the highlighted row follows the item being read.
const RECEIPT = {
  url: 'tai-khoan-quang-cao › thanh-toan › giao-dich',
  head: ['Giao dịch · Tháng 9 (mẫu)', 'Tài khoản quảng cáo VND của Nhà Thơm'],
  rows: [
    ['Ngân sách hằng ngày', '300.000₫ / ngày', 'Có ngày chi tới 125% mức đặt'],
    ['Ngân sách trọn đời', '9.000.000₫', 'Cho 30 ngày, không đổi loại sau khi chạy'],
    ['Nạp tiền', '9.900.000₫', 'Thẻ, chuyển khoản, ví điện tử'],
    ['Thuế GTGT 10%', vnd(9000000 * TAX_RATE), 'Tính trên 9.000.000₫ tiền quảng cáo'],
    ['Hóa đơn', 'MST •••• 0000', 'Theo thông tin doanh nghiệp đã khai']
  ],
  foot: ['Phí dịch vụ POWAI', 'Hóa đơn riêng, không nằm trong giao dịch TikTok']
};

// 1.000 + 100 = 1.100, drawn from TAX_RATE so the page and the rate agree.
function vatBox() {
  const base = 1000;
  const tax = base * TAX_RATE;
  return '<div class="tt-vat rv">'
    + `<small>${icon('receipt')}Thuế GTGT trên tiền quảng cáo</small>`
    + '<div class="tt-vat-eq">'
    + `<span><b>${num(base)}</b><em>tiền quảng cáo</em></span><i>+</i>`
    + `<span class="is-tax"><b>${num(tax)}</b><em>thuế ${TAX_RATE * 100}%</em></span><i>=</i>`
    + `<span class="is-sum"><b>${num(base + tax)}</b><em>số tiền trả</em></span>`
    + '</div>'
    + `<p>Áp dụng từ 01/07/2025 theo Luật Thuế GTGT số 48/2024/QH15, như TikTok công bố. Kiểm tra ngày ${dateVi(CHECKED)}.</p>`
    + src(['vat'])
    + '</div>';
}

function chapterCost() {
  const items = BILLING.map(([key, label, ic, text], i) => ({
    key: 'cost-' + key,
    label,
    icon: ic,
    body: `<h4>${esc(label)}</h4><p class="wb-sub">${esc(text)}</p>`,
    stage: invoiceScreen(i, RECEIPT),
    tag: 'GIAO DỊCH MẪU',
    cap: 'Dòng tô sáng là khoản đang xem. Số tiền chỉ để minh họa.'
  }));

  return chapter({
    id: 'chi-phi', num: 1, eyebrow: 'TIỀN ĐI ĐÂU',
    title: 'Tiền trả TikTok không phải toàn bộ chi phí.',
    lead: 'Tách tiền quảng cáo, thuế, chi phí sản xuất và phí dịch vụ trước khi bàn tới hiệu quả.',
    body: costSplit(COST_BUCKETS) + vatBox() + workbench(items) + calculator({platform: 'TikTok', result: 'kết quả'})
      + note({
        label: 'PHÉP TÍNH CHƯA GỒM THUẾ', ic: 'alert', tone: 'warn',
        text: 'Phép tính trên chỉ nhân tiền quảng cáo, chưa cộng thuế GTGT 10%. '
          + 'Mức ngân sách tối thiểu TikTok công bố bằng USD; tài khoản VND quy đổi theo thông báo trong Trình quản lý quảng cáo.',
        extra: src(['budget', 'payment', 'billing'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 02 — Bidding
 * ------------------------------------------------------------------ */
const BID_ICONS = {max: 'chart', costcap: 'target', roas: 'coin', value: 'tag', roi: 'store'};
const BID_GROUP = {
  max: ['Theo số lượng', '#88e4ff'],
  costcap: ['Kiểm soát chi phí', '#e0cd9b'],
  roas: ['Theo giá trị', '#c0a2ff'],
  value: ['Theo giá trị', '#c0a2ff'],
  roi: ['TikTok Shop', '#85e1c1']
};

// A small picture of each strategy's example. Sample figures only.
function bidExample(id) {
  if (id === 'max') {
    return `<div class="sc-ex">${barChart([6, 9, 8, 11, 10, 12, 13], {labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], highlight: 6})}`
      + '<p>Chi hết ngân sách để có <b>nhiều kết quả nhất</b>. Chi phí mỗi kết quả không cố định.</p></div>';
  }
  if (id === 'costcap') {
    return `<div class="sc-ex">${targetDots({values: [120, 190, 140, 165, 130, 175, 150, 145, 160, 135], target: 150})}`
      + '<p class="sc-ex-leg"><i class="is-line"></i>Mục tiêu 150.000₫ — từng kết quả cao thấp quanh mức bình quân.</p></div>';
  }
  if (id === 'roas' || id === 'roi') {
    const [label, value] = id === 'roas' ? ['ROAS 300%', '3₫'] : ['ROI 4', '4₫'];
    return '<div class="sc-ex sc-roas">'
      + `<span class="sc-coin">${icon('coin')}<b>1₫</b><small>tiền quảng cáo</small></span>`
      + `<span class="sc-roas-ar">${icon('arrow')}<em>${label}</em></span>`
      + '<span class="sc-coins">' + '<i></i>'.repeat(3) + `<b>${value}</b><small>doanh thu ghi nhận</small></span>`
      + '<p>Mức bình quân hệ thống hướng tới. Chưa trừ giá vốn và chi phí khác.</p></div>';
  }
  return '<div class="sc-ex sc-orders">'
    + '<div><span class="sc-ord">500.000₫</span><span class="sc-ord">500.000₫</span><small>2 đơn · 1.000.000₫</small></div>'
    + '<b>vs</b>'
    + '<div><span class="sc-ord is-big">2.000.000₫</span><small>1 đơn · 2.000.000₫</small></div>'
    + '<p>Giá trị cao nhất chọn tổng tiền, không chọn số đơn.</p></div>';
}

function chapterBidding() {
  const items = BID_ORDER.map(id => {
    const [tag, name, description, input, output, requirement, caution, example] = BIDS[id];
    return {
      key: 'bid-' + id,
      label: name,
      icon: BID_ICONS[id],
      group: BID_GROUP[id][0],
      groupColor: BID_GROUP[id][1],
      body: `<span class="wb-tag">${esc(tag)}</span><h4>${esc(name)}</h4><p class="wb-sub">${esc(description)}</p>`
        + `<div class="sc-io"><span><small>Bạn đưa vào</small><b>${esc(input)}</b></span>`
        + `<i aria-hidden="true">${icon('arrow')}</i>`
        + `<span><small>TikTok tối ưu</small><b>${esc(output)}</b></span></div>`
        + facts([['Cần có', requirement], ['Lưu ý', caution], ['Ví dụ', example]], {visible: 1}),
      stage: bidScreen(id, BIDS, {
        order: BID_ORDER, example: bidExample,
        title: 'Chiến lược giá thầu', url: 'trinh-quan-ly › nhom-quang-cao › gia-thau'
      }),
      tag: 'CÀI ĐẶT MẪU'
    };
  });

  return chapter({
    id: 'dat-thau', num: 2, eyebrow: 'NĂM CÁCH ĐẶT GIÁ THẦU',
    title: 'Giá thầu là cách bạn nói với TikTok điều gì quan trọng.',
    lead: 'Chọn một cách để xem cần đưa vào gì và TikTok sẽ tối ưu điều gì.',
    body: workbench(items)
      + note({
        label: 'ĐỌC ĐÚNG CON SỐ MỤC TIÊU', ic: 'target',
        text: 'Chi phí mục tiêu, ROAS và ROI là mức bình quân hệ thống hướng tới, không phải cam kết cho từng kết quả. '
          + 'Đặt quá chặt thì quảng cáo ít được phân phối và có thể không chi hết ngân sách.',
        extra: src(['bidding', 'bidBest', 'valueBid', 'gmvMax'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 03 — Twenty-one indicators as a funnel with worked numbers
 * ------------------------------------------------------------------ */
const stat = v => ['stat', v];
const eq = (name, top, bottom, result, ratio = 0) => ['eq', equation({name, top, bottom, result, ratio}), ratio > 0];

const KPI_VIEW = {
  impressions: () => stat(num(S.impressions)),
  reach: () => stat(num(S.reach) + ' người'),
  frequency: () => eq('Tần suất', {value: S.impressions, label: 'lượt hiển thị'}, {value: S.reach, label: 'người tiếp cận'},
    (S.impressions / S.reach).toLocaleString('vi-VN', {maximumFractionDigits: 1})),
  cpm: () => eq('CPM', {value: vnd(S.spend), label: 'tiền quảng cáo'}, {value: num(S.impressions / 1000), label: 'nghìn lượt hiển thị'},
    vnd(S.spend / S.impressions * 1000)),
  v2s: () => stat(num(S.v2s) + ' lượt'),
  v6s: () => stat(num(S.v6s) + ' lượt'),
  watch: () => stat(S.watch.toLocaleString('vi-VN') + ' giây'),
  complete: () => eq('Tỷ lệ xem hết', {value: S.v100, label: 'lượt xem hết'}, {value: S.impressions, label: 'lượt hiển thị'},
    pct(S.v100, S.impressions), S.v100 / S.impressions * 4),
  clicks: () => stat(num(S.clicks)),
  ctr: () => eq('CTR', {value: S.clicks, label: 'lượt nhấp'}, {value: S.impressions, label: 'lượt hiển thị'},
    pct(S.clicks, S.impressions), S.clicks / S.impressions * 8),
  cpc: () => eq('CPC', {value: vnd(S.spend), label: 'tiền quảng cáo'}, {value: S.clicks, label: 'lượt nhấp'}, vnd(S.spend / S.clicks)),
  convos: () => stat(num(S.convos) + ' cuộc'),
  lead: () => stat(String(S.lead)),
  cpl: () => eq('CPL', {value: vnd(S.spend), label: 'tiền quảng cáo'}, {value: S.lead, label: 'lead'}, vndK(S.spend / S.lead)),
  qualified: () => stat(String(S.qualified)),
  cpql: () => eq('CPQL', {value: vnd(S.spend), label: 'tiền quảng cáo'}, {value: S.qualified, label: 'lead phù hợp'}, vndK(S.spend / S.qualified)),
  sale: () => stat(S.sale + ' đơn'),
  gmv: () => stat(vnd(S.revenue)),
  roas: () => eq('ROAS', {value: vnd(S.revenue), label: 'doanh thu ghi nhận'}, {value: vnd(S.spend), label: 'tiền quảng cáo'},
    pct(S.revenue, S.spend), .7),
  roi: () => eq('ROI', {value: vnd(S.revenue), label: 'doanh thu cửa hàng'}, {value: vnd(S.spend), label: 'chi phí quảng cáo'},
    (S.revenue / S.spend).toLocaleString('vi-VN', {maximumFractionDigits: 2})),
  cac: () => eq('CAC', {value: vnd(S.allCost), label: 'tổng chi phí thu hút'}, {value: S.sale, label: 'khách mới'}, vndK(S.allCost / S.sale))
};

function chapterKpis() {
  const tiers = KPI_TIERS.map(([id, label, value, ids]) => {
    const cards = ids.map(k => {
      const [name, meaning] = KPIS[k];
      const [kind, html, bar] = KPI_VIEW[k]();
      return kind === 'eq'
        ? `<div class="sc-kpi is-eq${bar ? '' : ' is-nobar'}">${html}<small>${esc(meaning)}</small></div>`
        : `<div class="sc-kpi"><b>${esc(html)}</b><span>${esc(name)}</span><small>${esc(meaning)}</small></div>`;
    }).join('');
    const advice = '<dl class="wb-facts">' + ids.map(k => {
      const [name, , tip] = KPIS[k];
      return `<div><dt>${esc(name)}</dt><dd>${esc(tip)}</dd></div>`;
    }).join('') + '</dl>';
    return {
      id: 'kpi-' + id,
      label,
      value,
      panel: `<div class="sc-kpis">${cards}</div>` + more(advice, {label: 'Khi con số bất thường, kiểm tra gì'})
    };
  });

  return chapter({
    id: 'chi-so', num: 3, eyebrow: 'HAI MƯƠI MỐT CHỈ SỐ',
    title: 'Đọc từ lượt hiển thị tới đồng doanh thu.',
    lead: 'Bấm từng tầng của phễu để xem chỉ số của bước đó được tính thế nào.',
    body: `<div class="sc-funnel rv">${funnelTabs({tiers, label: 'Năm tầng của phễu'})}</div>`
      + '<p class="sc-sample">Số mẫu, không phải kết quả dự kiến. Một tháng giả định, chỉ để minh họa cách tính.</p>'
      + src(['events', 'productGmv', 'crmEvents'])
  });
}

/* ------------------------------------------------------------------ *
 * 04 — Measurement pipeline
 * ------------------------------------------------------------------ */
const mini = (head, rows) => reportTable({head, rows, cls: 'is-mini'});
const TRACK_UI = {
  utm: () => utmBar({base: SHOP + '/nen-thom', params: [['utm_source', 'tiktok'], ['utm_medium', 'paid_social'], ['utm_campaign', 'nen-thom-t9']]}),
  catalog: () => mini(['Mã', 'Giá'], [['NT-200', '320.000₫'], ['TD-10', '180.000₫']]),
  pixel: () => tagList(['ViewContent', 'AddToCart', 'InitiateCheckout', 'Purchase']),
  eventsApi: () => mini(['Sự kiện', 'Nguồn'], [['Purchase', 'Trình duyệt'], ['Purchase', 'Máy chủ'], ['Cùng event_id', {text: 'Đếm 1 lần', status: 'good'}]]),
  events: () => mini(['Sự kiện', 'Trạng thái'], [['Purchase', {text: 'Đang nhận', status: 'good'}], ['Lead', {text: 'Thiếu tham số', status: 'consider'}]]),
  forms: () => mini(['Lead', 'Ngày'], [['Ng*** Lan', '25/9'], ['Tr*** Minh', '25/9']]),
  inbox: () => mini(['Cuộc chat', 'Nhãn'], [['Ng*** Lan', {text: 'Hỏi giá', status: 'consider'}], ['Lê*** Tú', {text: 'Đã đặt', status: 'good'}]]),
  shop: () => mini(['Đơn', 'Trạng thái'], [['#5821', {text: 'Đã giao', status: 'good'}], ['#5822', {text: 'Hoàn', status: 'fix'}]]),
  crm: () => mini(['Khách', 'Trạng thái'], [['Ng*** Lan', {text: 'Đã mua', status: 'good'}], ['Tr*** Minh', {text: 'Đang tư vấn', status: 'consider'}]]),
  offline: () => `<div class="v-offline">${icon('repeat')}<span><code>Purchase</code> · Ng*** Lan · 1.290.000₫</span>`
    + '<span class="v-chip" data-accent="good">Đã gửi về</span></div>'
};

function chapterTracking() {
  const station = id => {
    const [ic, name, purpose, when, io] = TRACKING[id];
    return {
      id: 'st-' + id,
      icon: ic,
      label: name,
      ui: TRACK_UI[id](),
      drawer: `<div class="sc-drawer"><h4>${esc(name)}</h4><p class="wb-sub">${esc(purpose)}</p>`
        + facts([['Cần khi', when], ['Đầu vào → đầu ra', io]]) + '</div>'
    };
  };
  const columns = [
    [{...station('utm'), under: station('catalog')}],
    [{...station('pixel'), under: station('eventsApi')}],
    [station('events'), station('forms'), station('inbox'), station('shop')],
    [{...station('crm'), under: station('offline')}]
  ];

  return chapter({
    id: 'do-luong', num: 4, eyebrow: 'MƯỜI THÀNH PHẦN ĐO LƯỜNG',
    title: 'Muốn có con số thì phải cài trước.',
    lead: 'Dữ liệu đi từ liên kết quảng cáo, qua website, biểu mẫu, hộp thư hoặc cửa hàng, tới CRM rồi quay về TikTok. Bấm một trạm để xem chi tiết.',
    body: `<div class="sc-pipe rv">${pipeline({columns})}</div>`
      + src(['utm', 'pixel', 'eventsApi', 'dedup', 'leadsCenter', 'crmIntegr', 'crmEvents', 'offline', 'catalogs'])
  });
}

/* ------------------------------------------------------------------ *
 * 05 — Events: the phone action and the log line it writes
 * ------------------------------------------------------------------ */
const SC = measureScenes('lead');
const SHOP_SC = measureScenes('infeed');
const EVENT_SCREEN = [
  () => SHOP_SC.product(),
  () => SC.chat(),
  () => SC.lead(),
  () => formScreen(),
  () => SHOP_SC.pdp(),
  () => SHOP_SC.cart(),
  () => SHOP_SC.order(),
  () => crmScreen('qualified', {sources: ['Biểu mẫu', 'Tin nhắn', 'Biểu mẫu']})
];
const CONFIRMED = EVENTS.filter(e => e[3]).map(e => e[0]);

function chapterEvents() {
  const items = EVENTS.map(([name, label, text, confirmed], i) => ({
    key: 'ev-' + i,
    label,
    icon: confirmed ? 'verified' : 'bolt',
    group: confirmed ? 'Đã xác nhận' : 'Tín hiệu',
    groupColor: confirmed ? '#8ce0b4' : '#e0cd9b',
    body: `<span class="wb-tag">SỰ KIỆN</span><h4><code class="sc-code">${esc(name)}</code></h4>`
      + facts([['Nghĩa là', label], ['Ghi chú', text]])
      + eventStream(EVENTS, i, {confirmed: CONFIRMED}),
    stage: EVENT_SCREEN[i](),
    tag: 'KHÁCH ĐANG LÀM GÌ'
  }));

  return chapter({
    id: 'su-kien', num: 5, eyebrow: 'TÊN SỰ KIỆN',
    title: 'Tín hiệu khác với kết quả đã xác nhận.',
    lead: 'Mỗi việc khách làm ghi một dòng. Vàng là tín hiệu, xanh là kết quả đã được đối chiếu với đơn hoặc CRM.',
    body: workbench(items, {cls: 'is-events'})
      + note({
        label: 'GIỚI HẠN CỦA SỰ KIỆN', ic: 'alert', tone: 'warn',
        text: 'Contact là lượt bấm gọi hoặc bấm nhắn, chưa phải cuộc gọi thành công. '
          + 'Lead là người gửi thông tin, chưa chắc đúng nhu cầu. Báo cáo phải ghi đúng điều đã đo được.',
        extra: src(['events', 'eventsUpdate', 'crmEvents'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 06–08 — Rollout, checklist, FAQ
 * ------------------------------------------------------------------ */
const STEP_ICONS = ['search', 'shield', 'route', 'code', 'video', 'gear', 'check', 'play', 'sliders', 'chart'];

function chapterRollout() {
  return chapter({
    id: 'trien-khai', num: 6, eyebrow: 'MƯỜI BƯỚC TRIỂN KHAI',
    title: 'POWAI làm gì, và doanh nghiệp nhận lại được gì.',
    lead: 'Mỗi bước kết thúc bằng một thứ có thể xem được. Bấm một bước để xem việc làm và kết quả bàn giao.',
    body: rolloutBody({steps: ROLLOUT, icons: STEP_ICONS, phases: PHASES})
      + src(['bc', 'pixel', 'review'])
  });
}

function chapterPrep() {
  return chapter({
    id: 'chuan-bi', num: 7, eyebrow: 'DANH SÁCH CHUẨN BỊ',
    title: 'Mười lăm thứ cần có trước khi chạy.',
    lead: 'Đánh dấu những gì doanh nghiệp đã có. Phần còn thiếu là việc cần làm trước khi bật chiến dịch.',
    body: prepBody(PREP_GROUPS, PREP) + src(['bc', 'pixel', 'eventsApi', 'catalogs', 'cml'])
  });
}

function chapterFaq() {
  return chapter({
    id: 'faq', num: 8, eyebrow: 'CÂU HỎI THƯỜNG GẶP',
    title: 'Mười bốn câu hỏi hay gặp nhất.',
    lead: 'Chọn một chủ đề. Câu trả lời nói cả điều làm được lẫn điều còn phụ thuộc dữ liệu của bạn.',
    body: faqBody(FAQ_TOPICS, FAQ) + src(['budget', 'vat', 'smartPlus', 'spark', 'gmvMax', 'review'])
  });
}

/* ------------------------------------------------------------------ *
 * Recap — three tiles, then the two sister channels
 * ------------------------------------------------------------------ */
function recap() {
  const items = [
    ['Tách chi phí trước', 'Tiền trả TikTok, thuế 10%, sản xuất và phí dịch vụ là các khoản khác nhau.', '#chi-phi', 'wallet'],
    ['Chọn điều muốn tối ưu', 'Năm cách đặt giá thầu, mỗi cách cần dữ liệu riêng.', '#dat-thau', 'sliders'],
    ['Đo trước khi tiêu', 'Hai mươi mốt chỉ số, mười thành phần đo lường.', '#chi-so', 'chart']
  ];

  return section({
    cls: 'lp-recap',
    inner: '<div class="sec-head center"><span class="kicker">TÓM TẮT</span><h2>Ba việc quyết định hiệu quả ngân sách.</h2></div>'
      + `<div class="recap rv">${recapLinks(items)}</div>`
      + '<div class="tt-more">'
      + nextBlock({
        eyebrow: 'XEM THÊM · KÊNH KHÁC',
        title: 'Google Ads',
        text: 'Xuất hiện đúng lúc khách đang tìm. Cùng khung ba trang: cách chạy, chọn cách chạy, chi phí.',
        href: PAGES[0].href,
        cta: 'Xem thêm Google Ads'
      })
      + nextBlock({
        eyebrow: 'XEM THÊM · KÊNH KHÁC',
        title: 'Facebook Ads',
        text: 'Xuất hiện khi khách đang lướt, xem và trò chuyện trên Facebook, Instagram, Messenger.',
        href: FB_PAGES[0].href,
        cta: 'Xem thêm Facebook Ads'
      })
      + '</div>'
  });
}

export function budgetPage() {
  const index = toc([
    ['chi-phi', 'Chi phí'], ['dat-thau', 'Đặt thầu'], ['chi-so', 'Chỉ số'], ['do-luong', 'Đo lường'],
    ['su-kien', 'Sự kiện'], ['trien-khai', 'Triển khai'], ['chuan-bi', 'Chuẩn bị'], ['faq', 'Hỏi đáp'],
    ['lien-he', 'Liên hệ']
  ], 'Mục lục Chi phí & hiệu quả');

  return hero() + stepsBar('budget', TT_PAGES, STEPS_LABEL)
    + section({
      id: 'chuong', cls: 'lp-chapters',
      inner: index + chapterCost() + chapterBidding() + chapterKpis() + chapterTracking()
        + chapterEvents() + chapterRollout() + chapterPrep() + chapterFaq()
        + contactChapter({goals: CONTACT_GOALS})
    })
    + recap();
}

export const budgetMeta = {
  title: 'TikTok Ads: chi phí, đo lường và hiệu quả',
  description: 'Chi phí TikTok Ads gồm những khoản nào, thuế GTGT 10%, năm cách đặt giá thầu, hai mươi mốt chỉ số theo thứ tự phễu, '
    + 'Pixel, Events API, CRM và mười bước POWAI triển khai cùng doanh nghiệp.'
};

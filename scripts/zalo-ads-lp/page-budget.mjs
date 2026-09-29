// Zalo Ads landing page 03 — "Chi phí & hiệu quả".
// Same frame as the Google, Facebook and TikTok page 03: money, bidding, the
// indicators as a funnel, the measurement pipeline, signals vs confirmed
// results, the POWAI rollout, the checklist, FAQ and the consultation form.
// Numbers are samples, labelled so. The VAT rate stays null (TAX_RATE) until
// Zalo Ads states it; the page says so instead of assuming one.

import {
  SOURCES, CHECKED, TAX_RATE, COST_BUCKETS, BILLING, BIDS, BID_ORDER, SAMPLE as S, KPIS, KPI_TIERS, TRACKING, EVENTS,
  ROLLOUT, PHASES, PREP, PREP_GROUPS, FAQ, FAQ_TOPICS, CONTACT_GOALS
} from './data.mjs';
import {measureScenes} from './mocks.mjs';
import {
  esc, section, stepsBar, nextBlock, sourceList, icon, SHOP, PAGES, FB_PAGES, TT_PAGES, ZL_PAGES,
  more, funnel as funnelTabs, equation, pipeline, utmBar, tagList, reportTable, barChart
} from '../google-ads-lp/shared.mjs';
import {
  chapter, toc, workbench, facts, note, invoiceScreen, bidScreen, eventStream, crmScreen, siteScreen, FAB_KINDS
} from '../google-ads-lp/scenes.mjs';
import {
  heroBlock, costSplit, calculator, rolloutBody, prepBody, faqBody, contactChapter, recapLinks
} from '../google-ads-lp/panel-kit.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu Zalo Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu Zalo Ads:'});
const vnd = n => Math.round(n).toLocaleString('vi-VN') + '₫';
const vndK = n => vnd(Math.round(n / 1000) * 1000);
const pct = (a, b) => (a / b * 100).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + '%';
const num = n => n.toLocaleString('vi-VN');
const dateVi = iso => iso.split('-').reverse().join('/');

/* ------------------------------------------------------------------ *
 * Hero — the funnel as a stack of floating meters (decoration only)
 * ------------------------------------------------------------------ */
const HERO_STEPS = [['impressions', 100], ['clicks', 62], ['follows', 42], ['lead', 24], ['delivered', 13]];

function hero() {
  const meters = HERO_STEPS.map(([id, width], i) => `<div class="meter3d" data-step="${i}">`
    + `<b>${esc(KPIS[id][0])}</b>`
    + `<i aria-hidden="true"><s style="width:${width}%"></s></i></div>`).join('');

  return heroBlock({
    crumb: 'Chi phí & hiệu quả',
    eyebrow: 'POWAI / ZALO ADS · 03',
    title: 'Chi phí & hiệu quả',
    sub: 'Tiền đi đâu, và <em>đọc kết quả</em> bằng chỉ số nào.',
    lead: 'Tiền nạp vào Zalo Ads chỉ là một phần chi phí. Trang này tách các khoản phải trả và hóa đơn, '
      + 'năm cách tính phí, mười tám chỉ số theo thứ tự phễu và cách POWAI triển khai cùng doanh nghiệp.',
    primary: ['#chi-so', 'Xem mười tám chỉ số'],
    ghost: ['#lien-he', 'Gửi yêu cầu tư vấn'],
    stage: '<div class="hero-stage" aria-hidden="true">'
      + `<div class="meters3d" id="heroStack">${meters}</div></div>`
  });
}

/* ------------------------------------------------------------------ *
 * 01 — Money
 * ------------------------------------------------------------------ */
// A sample statement; the highlighted row follows the item being read.
// One row per BILLING entry, in the same order.
const RECEIPT = {
  url: 'zalo-ads › tai-khoan › nap-tien',
  head: ['Lịch sử nạp · Tháng 9 (mẫu)', 'Tài khoản Zalo Ads của Nhà Thơm'],
  rows: [
    ['Nạp tiền', '9.000.000₫', 'Chuyển khoản · trả trước'],
    ['Ngân sách hằng ngày', '300.000₫ / ngày', 'Đặt thầu theo ngân sách'],
    ['Hóa đơn VAT', 'Theo hóa đơn', 'Xuất cho số tiền nạp'],
    ['Thông tin xuất hóa đơn', 'MST •••• 0000', 'Khai trước khi nạp'],
    ['Pháp nhân', 'Nhà Thơm', 'Một tài khoản, một doanh nghiệp']
  ],
  foot: ['Phí dịch vụ POWAI', 'Hóa đơn riêng, không nằm trong tiền nạp']
};

// The VAT box. TAX_RATE is null: Zalo Ads does not state the rate on the
// pages checked, so no rate is applied or shown as a number.
function vatBox() {
  const rate = TAX_RATE === null ? 'CHƯA ÁP MỨC THUẾ' : `${TAX_RATE * 100}%`;
  return '<div class="zl-vat rv">'
    + `<small>${icon('receipt')}Hóa đơn VAT cho tiền nạp</small>`
    + '<div class="zl-vat-eq">'
    + '<span><b>Tiền nạp</b><em>vào tài khoản Zalo Ads</em></span><i>→</i>'
    + `<span class="is-tax"><b>${rate}</b><em>thuế suất theo hóa đơn</em></span><i>→</i>`
    + '<span class="is-sum"><b>Hóa đơn VAT</b><em>cho số tiền nạp</em></span>'
    + '</div>'
    + '<p>Zalo Ads xuất hóa đơn VAT cho số tiền nạp; thuế suất và cách tính theo hóa đơn — POWAI đối chiếu khi nạp. '
    + `Kiểm tra ngày ${dateVi(CHECKED)}.</p>`
    + src(['vat', 'invoiceNotes'])
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
    title: 'Tiền nạp Zalo Ads không phải toàn bộ chi phí.',
    lead: 'Tách tiền quảng cáo, nội dung và vận hành OA, phí dịch vụ trước khi bàn tới hiệu quả.',
    body: costSplit(COST_BUCKETS) + vatBox() + workbench(items) + calculator({platform: 'Zalo Ads', result: 'kết quả'})
      + note({
        label: 'PHÉP TÍNH CHƯA GỒM THUẾ', ic: 'alert', tone: 'warn',
        text: 'Phép tính trên chỉ nhân tiền quảng cáo, chưa gồm thuế trên hóa đơn nạp. '
          + 'Chi phí nội dung, người trực OA và phí dịch vụ cũng nằm ngoài phép tính.',
        extra: src(['topup', 'budgetBid'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 02 — Bidding: five ways to pay
 * ------------------------------------------------------------------ */
const BID_ICONS = {budget: 'wallet', cpc: 'tap', cpm: 'eye', cpa: 'check', cpf: 'plus'};
const BID_GROUP = {
  budget: ['Mặc định', '#9bcaff'],
  cpc: ['Theo lượt', '#88e4ff'],
  cpm: ['Theo lượt', '#88e4ff'],
  cpa: ['Theo hành động', '#85e1c1'],
  cpf: ['Theo quan tâm OA', '#ffbd80']
};
const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

// A small picture of each way's example. Sample figures only.
const BID_EXAMPLE = {
  budget: [[280, 300, 310, 290, 300, 295, 305], DAYS, 'Ngân sách <b>300.000₫ mỗi ngày</b> (mẫu): Zalo Ads tự chia cho các lượt trong ngày.'],
  cpc: [[900, 700, 1100, 850], ['Ảnh A', 'Ảnh B', 'Ảnh C', 'Ảnh D'], 'Trả theo <b>lượt nhấp</b>. Cùng số nhấp, số người nhắn tin vẫn có thể rất khác.'],
  cpm: [[8, 9, 9, 10, 9, 11, 12], DAYS, 'Trả theo <b>1.000 lượt hiển thị</b>, dù người xem có bấm hay không.'],
  cpa: [[3, 5, 4, 6, 5, 7, 6], DAYS, 'Trả khi có <b>hành động</b>: gửi form, liên hệ qua OA hoặc đặt hàng.'],
  cpf: [[40, 46, 38, 52, 48, 55, 41], DAYS, 'Trả cho mỗi <b>lượt quan tâm OA</b>. Đo tiếp xem bao nhiêu người nhắn tin.']
};
function bidExample(id) {
  const [values, labels, text] = BID_EXAMPLE[id];
  return `<div class="sc-ex">${barChart(values, {labels, highlight: values.length - 1})}<p>${text}</p></div>`;
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
        + `<div class="sc-io"><span><small>Bạn đặt</small><b>${esc(input)}</b></span>`
        + `<i aria-hidden="true">${icon('arrow')}</i>`
        + `<span><small>Bạn trả cho</small><b>${esc(output)}</b></span></div>`
        + facts([['Dùng cho', requirement], ['Lưu ý', caution], ['Ví dụ', example]], {visible: 1}),
      stage: bidScreen(id, BIDS, {
        order: BID_ORDER, example: bidExample,
        title: 'Hình thức tính phí', url: 'zalo-ads › quang-cao › gia-thau'
      }),
      tag: 'CÀI ĐẶT MẪU'
    };
  });

  return chapter({
    id: 'dat-thau', num: 2, eyebrow: 'NĂM CÁCH TÍNH PHÍ',
    title: 'Bạn trả tiền cho điều gì?',
    lead: 'Chọn một cách để xem bạn đặt gì, trả cho điều gì và dùng được với hình thức nào.',
    body: workbench(items)
      + note({
        label: 'NGÂN SÁCH ĐỦ ĐỂ PHÂN PHỐI', ic: 'target',
        text: 'Zalo Ads khuyên đặt ngân sách đủ cho tối thiểu 50 lượt nhấn/ngày. '
          + 'Giá hoặc ngân sách đặt quá thấp thì quảng cáo ít được hiện và khó đọc kết quả.',
        extra: src(['pricing', 'budgetBid'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 03 — Eighteen indicators as a funnel with worked numbers
 * ------------------------------------------------------------------ */
const stat = v => ['stat', v];
const eq = (name, top, bottom, result, ratio = 0) => ['eq', equation({name, top, bottom, result, ratio}), ratio > 0];

const KPI_VIEW = {
  impressions: () => stat(num(S.impressions)),
  reach: () => stat(num(S.reach) + ' người'),
  cpm: () => eq('CPM', {value: vnd(S.spend), label: 'tiền quảng cáo'}, {value: num(S.impressions / 1000), label: 'nghìn lượt hiển thị'},
    vnd(S.spend / S.impressions * 1000)),
  clicks: () => stat(num(S.clicks)),
  ctr: () => eq('CTR', {value: S.clicks, label: 'lượt nhấp'}, {value: num(S.impressions), label: 'lượt hiển thị'},
    pct(S.clicks, S.impressions), S.clicks / S.impressions * 8),
  cpc: () => eq('CPC', {value: vnd(S.spend), label: 'tiền quảng cáo'}, {value: S.clicks, label: 'lượt nhấp'}, vnd(S.spend / S.clicks)),
  follows: () => stat(num(S.follows) + ' người'),
  cpf: () => eq('CPF', {value: vnd(S.spend), label: 'tiền quảng cáo'}, {value: S.follows, label: 'lượt quan tâm'}, vndK(S.spend / S.follows)),
  followChat: () => eq('Tỷ lệ nhắn sau quan tâm', {value: S.followChats, label: 'người nhắn tin'}, {value: S.follows, label: 'lượt quan tâm'},
    pct(S.followChats, S.follows), S.followChats / S.follows),
  lead: () => stat(String(S.lead)),
  cpl: () => eq('CPL', {value: vnd(S.spend), label: 'tiền quảng cáo'}, {value: S.lead, label: 'lead'}, vndK(S.spend / S.lead)),
  convos: () => stat(num(S.convos) + ' cuộc'),
  qualified: () => stat(String(S.qualified)),
  placed: () => stat(S.placed + ' đơn'),
  delivered: () => stat(S.delivered + ' đơn'),
  revenue: () => stat(vnd(S.revenue)),
  roas: () => eq('ROAS', {value: vnd(S.revenue), label: 'doanh thu đơn đã giao'}, {value: vnd(S.spend), label: 'tiền quảng cáo'},
    pct(S.revenue, S.spend), .7),
  cac: () => eq('CAC', {value: vnd(S.allCost), label: 'tổng chi phí thu hút'}, {value: S.delivered, label: 'khách mới'}, vndK(S.allCost / S.delivered))
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
    id: 'chi-so', num: 3, eyebrow: 'MƯỜI TÁM CHỈ SỐ',
    title: 'Đọc từ lượt hiển thị tới đơn đã giao.',
    lead: 'Bấm từng tầng của phễu để xem chỉ số của bước đó được tính thế nào.',
    body: `<div class="sc-funnel rv">${funnelTabs({tiers, label: 'Năm tầng của phễu'})}</div>`
      + '<p class="sc-sample">Số mẫu, không phải kết quả dự kiến. Một tháng giả định, chỉ để minh họa cách tính.</p>'
      + src(['pricing', 'oa', 'commerce'])
  });
}

/* ------------------------------------------------------------------ *
 * 04 — Measurement pipeline
 * ------------------------------------------------------------------ */
const mini = (head, rows) => reportTable({head, rows, cls: 'is-mini'});
const TRACK_UI = {
  utm: () => utmBar({base: SHOP + '/nen-thom', params: [['utm_source', 'zalo'], ['utm_medium', 'paid_social'], ['utm_campaign', 'nen-thom-t9']]}),
  site: () => mini(['Trang', 'Lượt vào'], [['/nen-thom', '412'], ['/cam-on', '31']]),
  pixel: () => tagList(['Sự kiện nút bấm', 'Sự kiện đường dẫn URL']),
  form: () => mini(['Form', 'Lượt gửi'], [['Nhận tư vấn chọn quà', '48']]),
  manage: () => mini(['Người gửi', 'Ngày'], [['Ng*** Lan', '25/9'], ['Tr*** Minh', '25/9']]),
  download: () => mini(['Tệp', 'Trạng thái'], [['form-25-9.xlsx', {text: 'Đã lọc trùng', status: 'good'}]]),
  oamsg: () => mini(['Cuộc chat', 'Nguồn'], [['Ng*** Lan', 'Quảng cáo tin nhắn'], ['Lê*** Tú', 'Quảng cáo OA']]),
  inbox: () => mini(['Cuộc chat', 'Nhãn'], [['Ng*** Lan', {text: 'Hỏi giá', status: 'consider'}], ['Lê*** Tú', {text: 'Đã đặt', status: 'good'}]]),
  commerce: () => mini(['Đơn', 'Sản phẩm'], [['#NT-1024', 'Nến thơm nắp gỗ']]),
  order: () => mini(['Đơn', 'Trạng thái'], [['#NT-1024', {text: 'Đã giao', status: 'good'}], ['#NT-1025', {text: 'Chờ xác nhận', status: 'consider'}]]),
  crm: () => mini(['Khách', 'Trạng thái'], [['Ng*** Lan', {text: 'Đã mua', status: 'good'}], ['Tr*** Minh', {text: 'Đang tư vấn', status: 'consider'}]]),
  custom: () => `<div class="v-offline">${icon('repeat')}<span>Khách cũ · 1.240 số điện thoại</span>`
    + '<span class="v-chip" data-accent="good">Đã tải lên</span></div>'
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
    [{...station('utm'), under: station('site')}, station('pixel')],
    [{...station('form'), under: station('manage')}, station('download')],
    [{...station('oamsg'), under: station('inbox')}, {...station('commerce'), under: station('order')}],
    [{...station('crm'), under: station('custom')}]
  ];

  return chapter({
    id: 'do-luong', num: 4, eyebrow: 'MƯỜI HAI THÀNH PHẦN ĐO LƯỜNG',
    title: 'Muốn có con số thì phải cài trước.',
    lead: 'Dữ liệu đi từ liên kết quảng cáo, qua website, form, tin nhắn OA hoặc đơn Commerce, tới CRM rồi quay về Zalo Ads thành đối tượng. Bấm một trạm để xem chi tiết.',
    body: `<div class="sc-pipe rv">${pipeline({columns})}</div>`
      + src(['pixel', 'pixelOpt', 'form', 'message', 'commerce', 'audience'])
  });
}

/* ------------------------------------------------------------------ *
 * 05 — Signals vs confirmed results: the phone action and the line it adds
 * ------------------------------------------------------------------ */
const OA = measureScenes('oa');
const WEB = measureScenes('web');
const FORM = measureScenes('form');
const MSG = measureScenes('msg');
const COM = measureScenes('commerce');

// The shop site with the Zalo bubble being tapped (a button event).
const tapFabs = () => ['call', 'zalo'].map(k => `<span class="sc-fab is-${k}${k === 'zalo' ? ' is-hot' : ''}">`
  + `<span class="sc-fab-l">${FAB_KINDS[k].label}</span><i>${icon(FAB_KINDS[k].icon)}</i>`
  + (k === 'zalo' ? `<span class="sc-tap" aria-hidden="true">${icon('tap')}</span>` : '') + '</span>').join('');

const EVENT_SCREEN = [
  () => WEB.site(),
  () => OA.follow(),
  () => siteScreen({fabs: tapFabs()}),
  () => WEB.order(),
  () => FORM.lead(),
  () => MSG.chat(),
  () => COM.orderform(),
  () => crmScreen('qualified', {sources: ['Form Zalo', 'Tin nhắn OA', 'Form Zalo']}),
  () => crmScreen('sale', {sources: ['Commerce', 'Tin nhắn OA', 'Commerce']})
];
const CONFIRMED = EVENTS.filter(e => e[3]).map(e => e[0]);

function chapterEvents() {
  const items = EVENTS.map(([name, label, text, confirmed], i) => ({
    key: 'ev-' + i,
    label,
    icon: confirmed ? 'verified' : 'bolt',
    group: confirmed ? 'Đã xác nhận' : 'Tín hiệu',
    groupColor: confirmed ? '#8ce0b4' : '#e0cd9b',
    body: `<span class="wb-tag">${confirmed ? 'KẾT QUẢ ĐÃ XÁC NHẬN' : 'TÍN HIỆU'}</span><h4>${esc(name)}</h4>`
      + facts([['Nghĩa là', label], ['Ghi chú', text]])
      + eventStream(EVENTS, i, {confirmed: CONFIRMED}),
    stage: EVENT_SCREEN[i](),
    tag: 'KHÁCH ĐANG LÀM GÌ'
  }));

  return chapter({
    id: 'su-kien', num: 5, eyebrow: 'TÍN HIỆU VÀ KẾT QUẢ',
    title: 'Tín hiệu khác với kết quả đã xác nhận.',
    lead: 'Mỗi việc khách làm ghi một dòng. Vàng là tín hiệu Zalo Ads hoặc Pixel đếm được, xanh là kết quả đã đối chiếu với CRM hoặc đơn giao.',
    body: workbench(items, {cls: 'is-events'})
      + note({
        label: 'GIỚI HẠN CỦA TÍN HIỆU', ic: 'alert', tone: 'warn',
        text: 'Sự kiện nút bấm là lượt bấm gọi hoặc bấm Zalo, chưa phải cuộc gọi thành công. '
          + 'Lượt gửi form là người để lại số, chưa chắc đúng nhu cầu. Báo cáo phải ghi đúng điều đã đo được.',
        extra: src(['pixel', 'pixelOpt', 'form'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 06–08 — Rollout, checklist, FAQ
 * ------------------------------------------------------------------ */
const STEP_ICONS = ['search', 'shield', 'stamp', 'route', 'code', 'image', 'check', 'play', 'sliders', 'chart'];

function chapterRollout() {
  return chapter({
    id: 'trien-khai', num: 6, eyebrow: 'MƯỜI BƯỚC TRIỂN KHAI',
    title: 'POWAI làm gì, và doanh nghiệp nhận lại được gì.',
    lead: 'Mỗi bước kết thúc bằng một thứ có thể xem được. Bấm một bước để xem việc làm và kết quả bàn giao.',
    body: rolloutBody({steps: ROLLOUT, icons: STEP_ICONS, phases: PHASES})
      + src(['setup', 'license', 'pixel'])
  });
}

function chapterPrep() {
  return chapter({
    id: 'chuan-bi', num: 7, eyebrow: 'DANH SÁCH CHUẨN BỊ',
    title: 'Mười bốn thứ cần có trước khi chạy.',
    lead: 'Đánh dấu những gì doanh nghiệp đã có. Phần còn thiếu là việc cần làm trước khi bật quảng cáo.',
    body: prepBody(PREP_GROUPS, PREP) + src(['oa', 'license', 'vat', 'topup', 'audience'])
  });
}

function chapterFaq() {
  return chapter({
    id: 'faq', num: 8, eyebrow: 'CÂU HỎI THƯỜNG GẶP',
    title: 'Mười bốn câu hỏi hay gặp nhất.',
    lead: 'Chọn một chủ đề. Câu trả lời nói cả điều làm được lẫn điều còn phụ thuộc dữ liệu của bạn.',
    body: faqBody(FAQ_TOPICS, FAQ) + src(['budgetBid', 'topup', 'vat', 'license', 'formRules', 'zns'])
  });
}

/* ------------------------------------------------------------------ *
 * Recap — three tiles, then the three sister channels
 * ------------------------------------------------------------------ */
function recap() {
  const items = [
    ['Tách chi phí trước', 'Tiền nạp, nội dung và vận hành OA, phí dịch vụ là các khoản khác nhau.', '#chi-phi', 'wallet'],
    ['Chọn điều muốn trả tiền', 'Năm cách tính phí, mỗi cách hợp với một hình thức.', '#dat-thau', 'sliders'],
    ['Đo tới đơn đã giao', 'Mười tám chỉ số, mười hai thành phần đo lường.', '#chi-so', 'chart']
  ];
  const sister = (title, text, href) => nextBlock({eyebrow: 'XEM THÊM · KÊNH KHÁC', title, text, href, cta: 'Xem thêm ' + title});

  return section({
    cls: 'lp-recap',
    inner: '<div class="sec-head center"><span class="kicker">TÓM TẮT</span><h2>Ba việc quyết định hiệu quả ngân sách.</h2></div>'
      + `<div class="recap rv">${recapLinks(items)}</div>`
      + '<div class="zl-more">'
      + sister('Google Ads', 'Xuất hiện đúng lúc khách đang tìm. Cùng khung ba trang: cách chạy, chọn cách chạy, chi phí.', PAGES[0].href)
      + sister('Facebook Ads', 'Xuất hiện khi khách đang lướt, xem và trò chuyện trên Facebook, Instagram, Messenger.', FB_PAGES[0].href)
      + sister('TikTok Ads', 'Video dọc giữa những video khách đang lướt, trong LIVE và trong tìm kiếm.', TT_PAGES[0].href)
      + '</div>'
  });
}

export function budgetPage() {
  const index = toc([
    ['chi-phi', 'Chi phí'], ['dat-thau', 'Đặt thầu'], ['chi-so', 'Chỉ số'], ['do-luong', 'Đo lường'],
    ['su-kien', 'Sự kiện'], ['trien-khai', 'Triển khai'], ['chuan-bi', 'Chuẩn bị'], ['faq', 'Hỏi đáp'],
    ['lien-he', 'Liên hệ']
  ], 'Mục lục Chi phí & hiệu quả');

  return hero() + stepsBar('budget', ZL_PAGES, STEPS_LABEL)
    + section({
      id: 'chuong', cls: 'lp-chapters',
      inner: index + chapterCost() + chapterBidding() + chapterKpis() + chapterTracking()
        + chapterEvents() + chapterRollout() + chapterPrep() + chapterFaq()
        + contactChapter({goals: CONTACT_GOALS, website: 'Website, OA hoặc Mini Page'})
    })
    + recap();
}

export const budgetMeta = {
  title: 'Zalo Ads: chi phí, đo lường và hiệu quả',
  description: 'Chi phí Zalo Ads gồm những khoản nào, hóa đơn VAT cho tiền nạp, năm cách tính phí (ngân sách, CPC, CPM, CPA, CPF), '
    + 'mười tám chỉ số theo thứ tự phễu, Zalo Ads Pixel, dữ liệu Form, CRM và mười bước POWAI triển khai cùng doanh nghiệp.'
};

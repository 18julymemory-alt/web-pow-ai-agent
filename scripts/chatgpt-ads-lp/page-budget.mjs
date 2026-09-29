// ChatGPT Ads landing page 03 — "Chi phí & hiệu quả".
// Same frame as the other channels' page 03: money, bidding, the indicators
// as a funnel, the measurement pipeline, signals vs confirmed results, the
// POWAI rollout, the checklist, FAQ and the consultation form. Numbers are
// samples, labelled so. The tax rate stays null (TAX_RATE) until OpenAI
// states one; the page says so instead of assuming one.

import {
  SOURCES, CHECKED, TAX_RATE, MIN_DAILY_VND, COST_BUCKETS, BILLING, BIDS, BID_ORDER, SAMPLE as S, KPIS, KPI_TIERS,
  TRACKING, EVENTS, ROLLOUT, PHASES, PREP, PREP_GROUPS, FAQ, FAQ_TOPICS, CONTACT_GOALS
} from './data.mjs';
import {measureScenes} from './mocks.mjs';
import {UPDATED} from './page-formats.mjs';
import {
  esc, section, stepsBar, nextBlock, sourceList, icon, SHOP, PAGES, FB_PAGES, TT_PAGES, ZL_PAGES, CG_PAGES,
  funnel as funnelTabs, equation, pipeline, utmBar, tagList, reportTable, barChart, more
} from '../google-ads-lp/shared.mjs';
import {chapter, toc, workbench, facts, note, invoiceScreen, bidScreen, eventStream, crmScreen} from '../google-ads-lp/scenes.mjs';
import {
  heroBlock, costSplit, calculator, rolloutBody, prepBody, faqBody, contactChapter, recapLinks
} from '../google-ads-lp/panel-kit.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu ChatGPT Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu OpenAI:'});
const vnd = n => Math.round(n).toLocaleString('vi-VN') + '₫';
const vndK = n => vnd(Math.round(n / 1000) * 1000);
const pct = (a, b) => (a / b * 100).toLocaleString('vi-VN', {maximumFractionDigits: 2}) + '%';
const num = n => n.toLocaleString('vi-VN');
const dateVi = iso => iso.split('-').reverse().join('/');

/* ------------------------------------------------------------------ *
 * Hero — the funnel as a stack of floating meters (decoration only)
 * ------------------------------------------------------------------ */
const HERO_STEPS = [['impressions', 100], ['clicks', 64], ['conversions', 40], ['qualified', 22], ['delivered', 13]];

function hero() {
  const meters = HERO_STEPS.map(([id, width], i) => `<div class="meter3d" data-step="${i}">`
    + `<b>${esc(KPIS[id][0])}</b>`
    + `<i aria-hidden="true"><s style="width:${width}%"></s></i></div>`).join('');

  return heroBlock({
    crumb: 'Chi phí & hiệu quả',
    eyebrow: 'POWAI / CHATGPT ADS · 03',
    title: 'Chi phí & hiệu quả',
    sub: 'Tiền đi đâu, và <em>đọc kết quả</em> bằng chỉ số nào.',
    lead: 'Tiền trả cho OpenAI chỉ là một phần chi phí. Trang này tách các khoản phải trả, cách tính phí, '
      + 'các chỉ số có trong Ads Manager, cách đo chuyển đổi và cách POWAI triển khai cùng doanh nghiệp. ' + UPDATED,
    primary: ['#chi-so', 'Xem các chỉ số'],
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
  url: 'ads-manager › thanh-toan',
  head: ['Thanh toán · Tháng 10 (mẫu)', 'Tài khoản Ads Manager của Nhà Thơm'],
  rows: [
    ['Phương thức', 'Thẻ •••• 4821', 'Trả sau · trừ khi chạm ngưỡng'],
    ['Tiền tệ tài khoản', 'VND', 'Chọn khi tạo tài khoản'],
    ['Ngân sách chiến dịch', '300.000₫ / ngày', 'Đặt ở cấp chiến dịch'],
    ['Tối thiểu (VND)', vnd(MIN_DAILY_VND) + ' / ngày', 'Theo bảng mức tối thiểu'],
    ['Thuế & hóa đơn', 'Theo chứng từ', 'POWAI đối chiếu khi thanh toán']
  ],
  foot: ['Phí dịch vụ POWAI', 'Hóa đơn riêng, không nằm trong chứng từ này']
};

// The tax box. TAX_RATE is null: no OpenAI page states a VAT rate for
// Vietnamese advertisers, so no rate is applied or shown as a number.
function taxBox() {
  const rate = TAX_RATE === null ? 'CHƯA ÁP MỨC THUẾ' : `${TAX_RATE * 100}%`;
  return '<div class="cg-tax rv">'
    + `<small>${icon('receipt')}Thuế và hóa đơn</small>`
    + '<div class="cg-tax-eq">'
    + '<span><b>Chi tiêu quảng cáo</b><em>trừ vào thẻ theo ngưỡng</em></span><i>→</i>'
    + `<span class="is-tax"><b>${rate}</b><em>chưa có nguồn OpenAI</em></span><i>→</i>`
    + '<span class="is-sum"><b>Chứng từ OpenAI</b><em>POWAI đối chiếu</em></span>'
    + '</div>'
    + '<p>Thuế và hóa đơn theo chứng từ OpenAI xuất; POWAI đối chiếu khi thanh toán. '
    + `Chưa thấy trang OpenAI nào ghi thuế suất cho khách tại Việt Nam (kiểm tra ngày ${dateVi(CHECKED)}).</p>`
    + src(['billing', 'budgets'])
    + '</div>';
}

function chapterCost() {
  const items = BILLING.map(([key, label, ic, text], i) => ({
    key: 'cost-' + key,
    label,
    icon: ic,
    body: `<h4>${esc(label)}</h4><p class="wb-sub">${esc(text)}</p>`,
    stage: invoiceScreen(i, RECEIPT),
    tag: 'CHỨNG TỪ MẪU',
    cap: 'Dòng tô sáng là khoản đang xem. Số tiền chỉ để minh họa.'
  }));

  return chapter({
    id: 'chi-phi', num: 1, eyebrow: 'TIỀN ĐI ĐÂU',
    title: 'Tiền trả cho OpenAI không phải toàn bộ chi phí.',
    lead: 'Tách tiền quảng cáo, mẫu quảng cáo và danh mục, phí dịch vụ trước khi bàn tới hiệu quả.',
    body: costSplit(COST_BUCKETS) + taxBox() + workbench(items) + calculator({platform: 'OpenAI', result: 'kết quả'})
      + note({
        label: 'PHÉP TÍNH CHƯA GỒM THUẾ', ic: 'alert', tone: 'warn',
        text: 'Phép tính trên chỉ nhân tiền quảng cáo, chưa gồm thuế theo chứng từ. '
          + 'Chi phí làm mẫu quảng cáo, danh mục và phí dịch vụ cũng nằm ngoài phép tính. '
          + 'Không có mức CPC hay CPM "thị trường" nào ở đây: POWAI không dùng số từ blog.',
        extra: src(['billing', 'campaigns'])
      })
      + src(['billing', 'campaigns', 'budgets'])
  });
}

/* ------------------------------------------------------------------ *
 * 02 — Bidding
 * ------------------------------------------------------------------ */
const BID_ICONS = {cpm: 'eye', cpc: 'tap', ocpc: 'convert', ocpm: 'bolt', bidcap: 'target'};
const BID_GROUP = {
  cpm: ['Views', '#88e4ff'],
  cpc: ['Clicks', '#85e1c1'],
  ocpc: ['Conversions', '#ffbd80'],
  ocpm: ['Conversions', '#ffbd80'],
  bidcap: ['Conversions', '#ffbd80']
};
const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

// A small picture of each way's example. Sample figures only.
const BID_EXAMPLE = {
  cpm: [[9, 10, 9, 11, 10, 12, 11], DAYS, 'Trả theo <b>1.000 lượt hiển thị</b>, dù người xem có bấm hay không. Số mẫu.'],
  cpc: [[70, 84, 66, 92, 88, 101, 95], DAYS, 'Trả theo <b>lượt nhấp hợp lệ</b>. Cùng số nhấp, số khách phù hợp vẫn khác nhau. Số mẫu.'],
  ocpc: [[3, 5, 4, 6, 5, 7, 8], DAYS, 'Hệ thống tối ưu theo <b>một sự kiện chuẩn</b>; bạn vẫn trả theo lượt nhấp. Số mẫu.'],
  ocpm: [[2, 4, 3, 5, 6, 6, 7], DAYS, 'Tối ưu theo sự kiện, trả theo <b>1.000 lượt hiển thị</b>. Đang thử nghiệm (beta). Số mẫu.'],
  bidcap: [[140, 150, 120, 150, 135, 150, 128], DAYS, '<b>Bid Cap 150.000₫</b> (mẫu): mức tối đa cho một chuyển đổi, không phải giá bị trừ.']
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
        title: 'Mục tiêu & cách tính phí', url: 'ads-manager › chien-dich › gia-thau'
      }),
      tag: id === 'ocpm' ? 'ĐANG THỬ NGHIỆM' : 'CÀI ĐẶT MẪU'
    };
  });

  return chapter({
    id: 'dat-thau', num: 2, eyebrow: 'CÁCH TÍNH PHÍ',
    title: 'Bạn trả tiền cho điều gì?',
    lead: 'Mỗi mục tiêu đi với một cách tính phí. Chọn một cách để xem bạn đặt gì và trả cho điều gì.',
    body: workbench(items)
      + note({
        label: 'TỐI ƯU CHUYỂN ĐỔI KHÁC TRẢ THEO CHUYỂN ĐỔI', ic: 'target',
        text: 'Với mục tiêu Conversions, bạn trả theo lượt nhấp (oCPC) hoặc theo lượt hiển thị (oCPM, đang beta). '
          + 'Mỗi chiến dịch tối ưu cho một sự kiện chuẩn và không đổi được sau khi tạo. '
          + 'Bid Cap là mức tối đa cho một chuyển đổi để cạnh tranh trong đấu giá, không phải CPA cam kết.',
        extra: src(['convCamp', 'campaigns'])
      })
      + src(['campaigns', 'convCamp'])
  });
}

/* ------------------------------------------------------------------ *
 * 03 — Indicators as a funnel with worked numbers
 * ------------------------------------------------------------------ */
const stat = v => ['stat', v];
const eq = (name, top, bottom, result, ratio = 0) => ['eq', equation({name, top, bottom, result, ratio}), ratio > 0];

const KPI_VIEW = {
  impressions: () => stat(num(S.impressions)),
  cpm: () => eq('Avg CPM', {value: vnd(S.spend), label: 'chi tiêu'}, {value: num(S.impressions / 1000), label: 'nghìn lượt hiển thị'},
    vnd(S.spend / S.impressions * 1000)),
  clicks: () => stat(num(S.clicks)),
  ctr: () => eq('CTR', {value: num(S.clicks), label: 'lượt nhấp'}, {value: num(S.impressions), label: 'lượt hiển thị'},
    pct(S.clicks, S.impressions), S.clicks / S.impressions * 8),
  cpc: () => eq('Avg CPC', {value: vnd(S.spend), label: 'chi tiêu'}, {value: num(S.clicks), label: 'lượt nhấp'}, vnd(S.spend / S.clicks)),
  conversions: () => stat(String(S.conversions)),
  cpa: () => eq('CPA', {value: vnd(S.spend), label: 'chi tiêu'}, {value: S.conversions, label: 'chuyển đổi'}, vndK(S.spend / S.conversions)),
  cvr: () => eq('Tỷ lệ chuyển đổi', {value: S.conversions, label: 'chuyển đổi'}, {value: num(S.clicks), label: 'lượt nhấp'},
    pct(S.conversions, S.clicks), S.conversions / S.clicks * 4),
  qualified: () => stat(String(S.qualified)),
  cpql: () => eq('CPQL', {value: vnd(S.spend), label: 'chi tiêu'}, {value: S.qualified, label: 'lead phù hợp'}, vndK(S.spend / S.qualified)),
  delivered: () => stat(S.delivered + ' đơn'),
  roas: () => eq('ROAS', {value: vnd(S.revenue), label: 'doanh thu đơn đã giao'}, {value: vnd(S.spend), label: 'chi tiêu'},
    pct(S.revenue, S.spend), .7)
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
    id: 'chi-so', num: 3, eyebrow: 'CHỈ SỐ',
    title: 'Đọc từ lượt hiển thị tới đơn đã giao.',
    lead: 'Ba tầng đầu là số Ads Manager báo; tầng cuối lấy từ CRM. Bấm từng tầng để xem cách tính.',
    body: `<div class="sc-funnel rv">${funnelTabs({tiers, label: 'Bốn tầng của phễu'})}</div>`
      + '<p class="sc-sample">Số mẫu, không phải kết quả dự kiến. Một tháng giả định, chỉ để minh họa cách tính.</p>'
      + note({
        label: 'KHI NÀO SỐ LIỆU CẬP NHẬT', ic: 'clock',
        text: 'Lượt hiển thị, lượt nhấp và CTR cập nhật khoảng 15 phút một lần. '
          + 'Chi tiêu có thể trễ 7–8 giờ, nên CPC và CPM trung bình cũng đến muộn; chuyển đổi có thể mất 24–48 giờ. '
          + 'Nhà quảng cáo chỉ thấy số liệu tổng hợp, không thấy nội dung trò chuyện.',
        extra: src(['quickstart', 'results', 'inChat'])
      })
      + src(['quickstart', 'results'])
  });
}

/* ------------------------------------------------------------------ *
 * 04 — Measurement pipeline
 * ------------------------------------------------------------------ */
const mini = (head, rows) => reportTable({head, rows, cls: 'is-mini'});
const TRACK_UI = {
  utm: () => utmBar({base: SHOP + '/qua-tang', params: [['utm_source', 'chatgpt'], ['utm_medium', 'paid'], ['utm_campaign', 'qua-tan-gia']]}),
  site: () => tagList(['page_viewed', 'contents_viewed', 'lead_created']),
  tag: () => mini(['Trang', 'Sự kiện'], [['/cam-on', 'order_created']]),
  capi: () => mini(['Nguồn', 'Sự kiện'], [['Máy chủ', 'order_created'], ['Ứng dụng', 'app_installed']]),
  report: () => mini(['Chỉ số', 'Giá trị'], [['Clicks', '960'], ['Conversions', {text: '64', status: 'good'}]]),
  feed: () => mini(['Tệp', 'Trạng thái'], [['danh-muc.csv', {text: 'Đã xử lý', status: 'good'}], ['Hết hạn', {text: 'Sau 2 tuần', status: 'consider'}]]),
  crm: () => mini(['Khách', 'Trạng thái'], [['Ng*** Lan', {text: 'Phù hợp', status: 'good'}], ['Tr*** Minh', {text: 'Đang tư vấn', status: 'consider'}]]),
  custom: () => `<div class="v-offline">${icon('repeat')}<span>Khách đã mua · loại trừ</span>`
    + '<span class="v-chip" data-accent="good">Đã tải lên</span></div>',
  ga4: () => mini(['Nguồn / kênh', 'Phiên'], [['chatgpt / paid', '912']])
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
    [{...station('utm'), under: station('ga4')}, station('site')],
    [{...station('tag'), under: station('capi')}, station('feed')],
    [station('report')],
    [{...station('crm'), under: station('custom')}]
  ];

  return chapter({
    id: 'do-luong', num: 4, eyebrow: 'CÁC TRẠM ĐO LƯỜNG',
    title: 'Muốn có con số thì phải cài trước.',
    lead: 'Dữ liệu đi từ liên kết có UTM, qua Pixel, Image tag hoặc Conversions API, về báo cáo Ads Manager; CRM ghi kết quả thật và quay về thành đối tượng tùy chỉnh. Bấm một trạm để xem chi tiết.',
    body: `<div class="sc-pipe rv">${pipeline({columns})}</div>`
      + src(['pixel', 'imageTag', 'capi', 'feeds', 'customAud'])
  });
}

/* ------------------------------------------------------------------ *
 * 05 — Signals vs confirmed results
 * ------------------------------------------------------------------ */
const CARD = measureScenes('card');
const SHOPQ = measureScenes('carousel');

const EVENT_SCREEN = [
  () => CARD.land(),
  () => CARD.pdp(),
  () => SHOPQ.cart(),
  () => SHOPQ.checkout(),
  () => SHOPQ.order(),
  () => CARD.lead(),
  () => CARD.reg(),
  () => CARD.sub(),
  () => crmScreen('qualified', {sources: ['ChatGPT Ads', 'ChatGPT Ads', 'Website']}),
  () => crmScreen('sale', {sources: ['ChatGPT Ads', 'Website', 'ChatGPT Ads']})
];
const CONFIRMED = EVENTS.filter(e => e[3]).map(e => e[0]);

function chapterEvents() {
  const items = EVENTS.map(([name, label, text, confirmed], i) => ({
    key: 'ev-' + i,
    label: confirmed ? name : label,
    icon: confirmed ? 'verified' : 'bolt',
    group: confirmed ? 'Đã xác nhận' : 'Tín hiệu',
    groupColor: confirmed ? '#8ce0b4' : '#e0cd9b',
    body: `<span class="wb-tag">${confirmed ? 'KẾT QUẢ ĐÃ XÁC NHẬN' : 'TÍN HIỆU · SỰ KIỆN CHUẨN'}</span><h4>${esc(name)}</h4>`
      + facts([['Nghĩa là', label], ['Ghi chú', text]])
      + eventStream(EVENTS, i, {confirmed: CONFIRMED}),
    stage: EVENT_SCREEN[i](),
    tag: 'KHÁCH ĐANG LÀM GÌ'
  }));

  return chapter({
    id: 'su-kien', num: 5, eyebrow: 'TÍN HIỆU VÀ KẾT QUẢ',
    title: 'Tín hiệu khác với kết quả đã xác nhận.',
    lead: 'Vàng là sự kiện chuẩn Pixel hoặc Conversions API gửi về, dùng đúng tên trong tài liệu OpenAI. Xanh là kết quả đã đối chiếu với CRM.',
    body: workbench(items, {cls: 'is-events'})
      + note({
        label: 'GIỚI HẠN CỦA TÍN HIỆU', ic: 'alert', tone: 'warn',
        text: 'Sự kiện tùy chỉnh hiện chưa dùng được để tối ưu chuyển đổi. '
          + 'app_installed và app_opened chỉ gửi được qua Conversions API. '
          + 'lead_created là người để lại thông tin, chưa chắc đúng nhu cầu: báo cáo phải ghi đúng điều đã đo được.',
        extra: src(['events', 'convCamp', 'capi'])
      })
      + src(['events', 'pixel'])
  });
}

/* ------------------------------------------------------------------ *
 * 06–08 — Rollout, checklist, FAQ
 * ------------------------------------------------------------------ */
const STEP_ICONS = ['search', 'shield', 'wallet', 'route', 'code', 'thought', 'image', 'play', 'sliders', 'chart'];

function chapterRollout() {
  return chapter({
    id: 'trien-khai', num: 6, eyebrow: 'MƯỜI BƯỚC TRIỂN KHAI',
    title: 'POWAI làm gì, và doanh nghiệp nhận lại được gì.',
    lead: 'Mỗi bước kết thúc bằng một thứ có thể xem được. Bấm một bước để xem việc làm và kết quả bàn giao.',
    body: rolloutBody({steps: ROLLOUT, icons: STEP_ICONS, phases: PHASES})
      + src(['quickstart', 'policies', 'pixel'])
  });
}

function chapterPrep() {
  return chapter({
    id: 'chuan-bi', num: 7, eyebrow: 'DANH SÁCH CHUẨN BỊ',
    title: 'Mười bốn thứ cần có trước khi chạy.',
    lead: 'Đánh dấu những gì doanh nghiệp đã có. Phần còn thiếu là việc cần làm trước khi bật quảng cáo.',
    body: prepBody(PREP_GROUPS, PREP) + src(['account', 'availability', 'policies', 'ads', 'pixel'])
  });
}

function chapterFaq() {
  return chapter({
    id: 'faq', num: 8, eyebrow: 'CÂU HỎI THƯỜNG GẶP',
    title: 'Mười bốn câu hỏi hay gặp nhất.',
    lead: 'Chọn một chủ đề. Câu trả lời nói cả điều làm được lẫn điều OpenAI còn đang thử nghiệm.',
    body: faqBody(FAQ_TOPICS, FAQ) + src(['expand', 'availability', 'inChat', 'policies', 'agents', 'faq'])
  });
}

/* ------------------------------------------------------------------ *
 * Recap — three tiles, then the four sister channels
 * ------------------------------------------------------------------ */
function recap() {
  const items = [
    ['Tách chi phí trước', 'Tiền trả OpenAI, mẫu quảng cáo và danh mục, phí dịch vụ là các khoản khác nhau.', '#chi-phi', 'wallet'],
    ['Chọn điều muốn trả tiền', 'Views theo CPM, Clicks theo CPC, Conversions theo nhấp hoặc hiển thị.', '#dat-thau', 'sliders'],
    ['Đo tới đơn đã giao', 'Pixel, Conversions API, rồi CRM cho lead phù hợp và đơn giao.', '#chi-so', 'chart']
  ];
  const sister = (title, text, href) => nextBlock({eyebrow: 'XEM THÊM · KÊNH KHÁC', title, text, href, cta: 'Xem thêm ' + title});

  return section({
    cls: 'lp-recap',
    inner: '<div class="sec-head center"><span class="kicker">TÓM TẮT</span><h2>Ba việc quyết định hiệu quả ngân sách.</h2></div>'
      + `<div class="recap rv">${recapLinks(items)}</div>`
      + '<div class="cg-more">'
      + sister('Google Ads', 'Xuất hiện đúng lúc khách đang tìm trên Google, YouTube và mạng hiển thị.', PAGES[0].href)
      + sister('Facebook Ads', 'Xuất hiện khi khách đang lướt, xem và trò chuyện trên Facebook, Instagram, Messenger.', FB_PAGES[0].href)
      + sister('TikTok Ads', 'Video dọc giữa những video khách đang lướt, trong LIVE và trong tìm kiếm.', TT_PAGES[0].href)
      + sister('Zalo Ads', 'Từ một quảng cáo trên Zalo đến một cuộc trò chuyện có thể đo.', ZL_PAGES[0].href)
      + '</div>'
  });
}

export function budgetPage() {
  const index = toc([
    ['chi-phi', 'Chi phí'], ['dat-thau', 'Đặt thầu'], ['chi-so', 'Chỉ số'], ['do-luong', 'Đo lường'],
    ['su-kien', 'Sự kiện'], ['trien-khai', 'Triển khai'], ['chuan-bi', 'Chuẩn bị'], ['faq', 'Hỏi đáp'],
    ['lien-he', 'Liên hệ']
  ], 'Mục lục Chi phí & hiệu quả');

  return hero() + stepsBar('budget', CG_PAGES, STEPS_LABEL)
    + section({
      id: 'chuong', cls: 'lp-chapters',
      inner: index + chapterCost() + chapterBidding() + chapterKpis() + chapterTracking()
        + chapterEvents() + chapterRollout() + chapterPrep() + chapterFaq()
        + contactChapter({goals: CONTACT_GOALS, website: 'Website hoặc trang đích'})
    })
    + recap();
}

export const budgetMeta = {
  title: 'ChatGPT Ads: chi phí, đo lường và hiệu quả',
  description: 'Chi phí ChatGPT Ads gồm những khoản nào, thanh toán trả sau bằng thẻ, ngân sách ngày tối thiểu theo tiền tệ, '
    + 'CPM, CPC và tối ưu chuyển đổi, các chỉ số trong Ads Manager, Pixel, Conversions API, CRM và mười bước POWAI triển khai.'
};

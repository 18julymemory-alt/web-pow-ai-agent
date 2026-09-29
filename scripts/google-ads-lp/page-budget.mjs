// Landing page 03 — "Chi phí & hiệu quả".
// Money, bidding, measurement, the POWAI rollout and the consultation form.
// Same frame as page 01: sticky chapter index, big chapter numbers, one
// picture per chapter. Long copy stays on the page behind "Đọc tiếp".

import {
  billingConfig, kpis, trackingItems, eventMapping, implementation,
  preparation, faq, goals, sources
} from '../../dist/google-ads-experience-data.js';
import {biddingStrategies} from '../../dist/google-ads-bidding-data.js';
import {
  esc, crumbs, kicker, section, stepsBar, nextBlock, sourceList,
  placeholders, icon, PAGES, tabs, more, funnel as funnelTabs, equation, pipeline,
  utmBar, tagList, ga4Mini, ecField, callLog, merchantGrid, offlineRow, reportTable
} from './shared.mjs';
import {
  chapter, toc, workbench, facts, note, invoiceScreen, bidScreen, eventStream, siteScreen,
  staticFabs, fabGlyph, serviceScreen, formScreen, crmScreen
} from './scenes.mjs';
import {heroBlock, costSplit, calculator, rolloutBody, prepBody, faqBody, contactChapter, recapLinks} from './panel-kit.mjs';

/* ------------------------------------------------------------------ *
 * Hero — the funnel as a stack of floating meters
 * ------------------------------------------------------------------ */
// Five points of the same funnel the KPI list walks through, narrowing on the
// way down. The widths are decoration, not figures — the stage is aria-hidden.
const HERO_STEPS = [
  ['impressions', 100],
  ['clicks', 64],
  ['landing', 46],
  ['lead', 26],
  ['qualified', 14]
];

function hero() {
  const byId = new Map(kpis.map(k => [k[0], k]));
  const meters = HERO_STEPS.map(([id, width], i) => {
    const [, name] = byId.get(id);
    return `<div class="meter3d" data-step="${i}">`
      + `<b>${esc(name)}</b>`
      + `<i aria-hidden="true"><s style="width:${width}%"></s></i></div>`;
  }).join('');

  const stage = '<div class="hero-stage" aria-hidden="true">'
    + `<div class="meters3d" id="heroStack">${meters}</div></div>`;

  return heroBlock({
    crumb: 'Chi phí & hiệu quả',
    eyebrow: 'POWAI / GOOGLE ADS · 03',
    title: 'Chi phí & hiệu quả',
    sub: 'Tiền đi đâu, và <em>đọc kết quả</em> bằng chỉ số nào.',
    lead: 'Ngân sách quảng cáo chỉ là một phần chi phí. Trang này tách các khoản phải trả, '
      + 'sáu cách đặt thầu, mười bốn chỉ số theo thứ tự phễu và cách POWAI triển khai cùng doanh nghiệp.',
    primary: ['#do-luong', 'Xem mười bốn chỉ số'],
    ghost: ['#lien-he', 'Gửi yêu cầu tư vấn'],
    stage
  });
}

/* ------------------------------------------------------------------ *
 * Money — what the platform charges and what it does not
 * ------------------------------------------------------------------ */
// Short labels for the three billing notes; the note text itself is unchanged.
const COST_LABELS = [
  ['Tiền trả cho Google', 'wallet'],
  ['Thuế và phí', 'tag'],
  ['Hóa đơn và bên thanh toán', 'form']
];

// The three buckets named in the section lead, drawn as one budget splitting in
// three. Deliberately equal columns: the split between them differs at every
// business and no figure on this page may look like a ratio.
const COST_BUCKETS = [
  ['ads', 'auction', 'Trả cho nền tảng', 'Tiền đấu giá để quảng cáo được hiển thị và được nhấp.'],
  ['make', 'creative', 'Sản xuất và vận hành', 'Hình ảnh, video, trang đích, phần cài đo lường.'],
  ['fee', 'users', 'Phí dịch vụ', 'Công dựng, theo dõi, điều chỉnh và báo cáo định kỳ.']
];

/* ------------------------------------------------------------------ *
 * 01 — Money
 * ------------------------------------------------------------------ */
const COST_ITEMS = [
  ['Tiền trả cho Google', 'wallet'],
  ['Thuế và phí', 'tag'],
  ['Hóa đơn và bên thanh toán', 'receipt']
];

function chapterCost() {
  const items = billingConfig.notes.map((text, i) => ({
    key: 'cost-' + i,
    label: COST_ITEMS[i][0],
    icon: COST_ITEMS[i][1],
    body: `<h4>${esc(COST_ITEMS[i][0])}</h4><p class="wb-sub">${esc(text)}</p>`,
    stage: invoiceScreen(i),
    tag: 'CHỨNG TỪ MẪU',
    cap: 'Dòng được tô sáng là khoản đang xem. Số tiền chỉ để minh họa.'
  }));

  const tax = billingConfig.taxRate === null
    ? note({
      label: 'CHƯA ÁP MỨC THUẾ', ic: 'alert', tone: 'warn',
      text: 'Trang này không đưa ra một mức thuế hay phí cố định nào. '
        + 'Con số phải lấy từ hồ sơ thanh toán và chứng từ thực tế của doanh nghiệp, '
        + 'vì vậy mọi ước tính trên trang chỉ tính phần tiền trả cho Google.'
    })
    : '';

  return chapter({
    id: 'chi-phi', num: 1, eyebrow: 'TIỀN ĐI ĐÂU',
    title: 'Ngân sách quảng cáo không phải toàn bộ chi phí.',
    lead: 'Tách khoản trả cho nền tảng, chi phí sản xuất và phí dịch vụ trước khi bàn tới hiệu quả.',
    body: costSplit(COST_BUCKETS) + workbench(items) + calculator({platform: 'Google'}) + tax
  });
}

/* ------------------------------------------------------------------ *
 * 02 — Bidding
 * ------------------------------------------------------------------ */
const BID_ICONS = {clicks: 'target', conversions: 'convert', cpa: 'wallet', value: 'tag', roas: 'chart', manual: 'sliders'};
const BID_GROUP = {
  clicks: ['Theo lượt nhấp', '#88e4ff'],
  conversions: ['Theo chuyển đổi', '#85e1c1'],
  cpa: ['Theo chuyển đổi', '#85e1c1'],
  value: ['Theo giá trị', '#c0a2ff'],
  roas: ['Theo giá trị', '#c0a2ff'],
  manual: ['Tự đặt giá', '#e0cd9b']
};
const BID_ORDER = ['clicks', 'conversions', 'cpa', 'value', 'roas', 'manual'];

function chapterBidding() {
  const items = BID_ORDER.map(id => {
    const [tag, name, description, input, output, requirement, caution, example] = biddingStrategies[id];
    return {
      key: 'bid-' + id,
      label: name,
      icon: BID_ICONS[id],
      group: BID_GROUP[id][0],
      groupColor: BID_GROUP[id][1],
      body: `<span class="wb-tag">${esc(tag)}</span><h4>${esc(name)}</h4><p class="wb-sub">${esc(description)}</p>`
        + `<div class="sc-io"><span><small>Bạn đưa vào</small><b>${esc(input)}</b></span>`
        + `<i aria-hidden="true">${icon('arrow')}</i>`
        + `<span><small>Google tối ưu</small><b>${esc(output)}</b></span></div>`
        + facts([['Cần có', requirement], ['Lưu ý', caution], ['Ví dụ', example]], {visible: 1}),
      stage: bidScreen(id, biddingStrategies),
      tag: 'CÀI ĐẶT MẪU'
    };
  });

  return chapter({
    id: 'dat-thau', num: 2, eyebrow: 'SÁU CÁCH ĐẶT THẦU',
    title: 'Đặt thầu là chọn điều muốn Google tối ưu.',
    lead: 'Chọn một cách để xem cần đưa vào gì và kết quả được đo ra sao.',
    body: workbench(items)
      + note({
        label: 'ĐỌC ĐÚNG CON SỐ MỤC TIÊU', ic: 'target',
        text: 'CPA mục tiêu và ROAS mục tiêu là mức bình quân hệ thống hướng tới, không phải cam kết cho từng đơn. '
          + 'Đặt quá chặt có thể làm quảng cáo gần như không được phân phối.',
        extra: sourceList(sources, ['bids'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 03 — The fourteen indicators, as a funnel with worked numbers
 * ------------------------------------------------------------------ */
// One sample month, used only to show how each indicator is computed.
const S = {impressions: 20000, clicks: 900, landing: 780, lead: 42, qualified: 18, sale: 9,
  spend: 9000000, revenue: 12600000, allCost: 12000000};
const vnd = n => n.toLocaleString('vi-VN') + '₫';
const pct = (a, b) => (a / b * 100).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + '%';
const noBar = html => html.replace(/<span class="v-eq-bar"[^>]*><i[^>]*><\/i><\/span>/, '');

const KPI_VIEW = {
  impressions: () => ['stat', S.impressions.toLocaleString('vi-VN')],
  ctr: () => ['eq', equation({name: 'CTR', top: {value: S.clicks, label: 'lượt nhấp'}, bottom: {value: S.impressions, label: 'lần hiển thị'}, result: pct(S.clicks, S.impressions), ratio: S.clicks / S.impressions * 8})],
  clicks: () => ['stat', S.clicks.toLocaleString('vi-VN')],
  cpc: () => ['eq', noBar(equation({name: 'CPC', top: {value: vnd(S.spend), label: 'tiền quảng cáo'}, bottom: {value: S.clicks, label: 'lượt nhấp'}, result: vnd(S.spend / S.clicks), ratio: 0}))],
  landing: () => ['stat', S.landing.toLocaleString('vi-VN') + ' phiên'],
  cvr: () => ['eq', equation({name: 'CVR', top: {value: S.lead, label: 'chuyển đổi'}, bottom: {value: S.clicks, label: 'tương tác'}, result: pct(S.lead, S.clicks), ratio: S.lead / S.clicks * 8})],
  lead: () => ['stat', String(S.lead)],
  cpl: () => ['eq', noBar(equation({name: 'CPL', top: {value: vnd(S.spend), label: 'tiền quảng cáo'}, bottom: {value: S.lead, label: 'yêu cầu'}, result: vnd(Math.round(S.spend / S.lead / 1000) * 1000), ratio: 0}))],
  qualified: () => ['stat', String(S.qualified)],
  cpql: () => ['eq', noBar(equation({name: 'CPQL', top: {value: vnd(S.spend), label: 'tiền quảng cáo'}, bottom: {value: S.qualified, label: 'khách phù hợp'}, result: vnd(S.spend / S.qualified), ratio: 0}))],
  sale: () => ['stat', S.sale + ' đơn'],
  cac: () => ['eq', noBar(equation({name: 'CAC', top: {value: vnd(S.allCost), label: 'tổng chi phí thu hút'}, bottom: {value: S.sale, label: 'khách mới'}, result: vnd(Math.round(S.allCost / S.sale / 1000) * 1000), ratio: 0}))],
  revenue: () => ['stat', vnd(S.revenue)],
  roas: () => ['eq', equation({name: 'ROAS', top: {value: vnd(S.revenue), label: 'doanh thu ghi nhận'}, bottom: {value: vnd(S.spend), label: 'tiền quảng cáo'}, result: pct(S.revenue, S.spend), ratio: .7})]
};

const KPI_PHASES = [
  ['show', 'Quảng cáo hiển thị', S.impressions, ['impressions', 'ctr']],
  ['click', 'Khách nhấp vào', S.clicks, ['clicks', 'cpc']],
  ['land', 'Khách xem trang đích', S.landing, ['landing', 'cvr']],
  ['lead', 'Khách để lại liên hệ', S.lead, ['lead', 'cpl', 'qualified', 'cpql']],
  ['sale', 'Đơn hàng và doanh thu', S.sale, ['sale', 'cac', 'revenue', 'roas']]
];

function chapterKpis() {
  const byId = new Map(kpis.map(k => [k[0], k]));
  const tiers = KPI_PHASES.map(([id, label, value, ids]) => {
    const cards = ids.map(k => {
      const [, name, , meaning] = byId.get(k);
      const [kind, html] = KPI_VIEW[k]();
      return kind === 'eq'
        ? `<div class="sc-kpi is-eq">${html}<small>${esc(meaning)}</small></div>`
        : `<div class="sc-kpi"><b>${esc(html)}</b><span>${esc(name)}</span><small>${esc(meaning)}</small></div>`;
    }).join('');
    const advice = '<dl class="wb-facts">' + ids.map(k => {
      const [, name, formula, , tip] = byId.get(k);
      return `<div><dt>${esc(name)}${formula !== name ? ` · ${esc(formula)}` : ''}</dt><dd>${esc(tip)}</dd></div>`;
    }).join('') + '</dl>';
    return {
      id: 'kpi-' + id,
      label,
      value,
      panel: `<div class="sc-kpis">${cards}</div>` + more(advice, {label: 'Khi con số bất thường, kiểm tra gì'})
    };
  });

  return chapter({
    id: 'do-luong', num: 3, eyebrow: 'MƯỜI BỐN CHỈ SỐ',
    title: 'Đọc từ lần hiển thị tới đồng doanh thu.',
    lead: 'Bấm từng tầng của phễu để xem chỉ số của bước đó được tính thế nào.',
    body: `<div class="sc-funnel rv">${funnelTabs({tiers, label: 'Năm tầng của phễu'})}</div>`
      + '<p class="sc-sample">Số mẫu của một tháng giả định, chỉ để minh họa cách tính — không phải kết quả dự kiến.</p>'
  });
}

/* ------------------------------------------------------------------ *
 * 04 — Tracking stack as a pipeline
 * ------------------------------------------------------------------ */
const TRACK_ICONS = {ads: 'convert', gtm: 'code', ga4: 'chart', utm: 'link', enhanced: 'lock',
  call: 'phone', crm: 'users', offline: 'upload', merchant: 'store'};
const TRACK_UI = {
  utm: () => utmBar(),
  gtm: () => tagList(['Gửi form', 'Bấm gọi', 'Nhấp Zalo']),
  ads: () => reportTable({head: ['Hành động', 'Chuyển đổi'], rows: [['Gửi form', '42'], ['Bấm gọi', '31']], cls: 'is-mini'}),
  ga4: () => ga4Mini(),
  enhanced: () => ecField(),
  call: () => callLog(),
  crm: () => reportTable({head: ['Khách', 'Trạng thái'], rows: [['Ng*** Lan', {text: 'Đã mua', status: 'good'}], ['Tr*** Minh', {text: 'Đang tư vấn', status: 'consider'}]], cls: 'is-mini'}),
  offline: () => offlineRow(),
  merchant: () => merchantGrid()
};

function chapterTracking() {
  const byId = new Map(trackingItems.map(t => [t.id, t]));
  const station = id => {
    const t = byId.get(id);
    return {
      id: 'st-' + id,
      icon: TRACK_ICONS[id],
      label: t.name,
      ui: TRACK_UI[id](),
      drawer: `<div class="sc-drawer"><h4>${esc(t.name)}</h4><p class="wb-sub">${esc(t.purpose)}</p>`
        + facts([['Cần khi', t.requiredWhen], ['Đầu vào → đầu ra', `${t.input} → ${t.output}`], ['Không bắt buộc', t.optionalWhen]])
        + '</div>'
    };
  };
  const columns = [
    [{...station('utm'), under: station('merchant')}],
    [{...station('gtm'), under: station('enhanced')}],
    [station('ads'), station('ga4'), station('call')],
    [station('crm')],
    [station('offline')]
  ];

  return chapter({
    id: 'cai-do', num: 4, eyebrow: 'CHÍN THÀNH PHẦN ĐO LƯỜNG',
    title: 'Muốn có con số thì phải cài trước.',
    lead: 'Dữ liệu đi từ liên kết quảng cáo, qua website, tới công cụ đo và bảng khách. Bấm một trạm để xem chi tiết.',
    body: `<div class="sc-pipe rv">${pipeline({columns})}</div>`
      + sourceList(sources, ['conversions', 'enhanced', 'offline', 'shopping'])
  });
}

/* ------------------------------------------------------------------ *
 * 05 — Event names: the phone action and the log line it writes
 * ------------------------------------------------------------------ */
const EVENT_SCREEN = {
  page_view: () => siteScreen({fabs: staticFabs()}),
  view_service: () => serviceScreen(),
  click_call: () => siteScreen({fabs: staticFabs('call')}),
  click_zalo: () => siteScreen({fabs: staticFabs('zalo')}),
  click_messenger: () => siteScreen({fabs: staticFabs('messenger')}),
  generate_lead: () => formScreen(),
  qualified_lead: () => crmScreen('qualified'),
  sale: () => crmScreen('sale')
};

function chapterEvents() {
  const items = eventMapping.map(([name, label, text], i) => {
    const confirmed = name === 'qualified_lead' || name === 'sale';
    return {
      key: 'ev-' + name,
      label,
      icon: confirmed ? 'verified' : 'bolt',
      group: confirmed ? 'Đã xác nhận' : 'Tín hiệu trên website',
      groupColor: confirmed ? '#8ce0b4' : '#e0cd9b',
      body: `<span class="wb-tag">SỰ KIỆN</span><h4><code class="sc-code">${esc(name)}</code></h4>`
        + facts([['Nghĩa là', label], ['Ghi chú', text]])
        + eventStream(eventMapping, i),
      stage: EVENT_SCREEN[name](),
      tag: 'KHÁCH ĐANG LÀM GÌ'
    };
  });

  return chapter({
    id: 'su-kien', num: 5, eyebrow: 'TÊN SỰ KIỆN',
    title: 'Đặt tên thống nhất để không đọc nhầm.',
    lead: 'Mỗi việc khách làm ghi một dòng. Vàng là tín hiệu, xanh là kết quả đã được người thật xác nhận.',
    body: workbench(items, {cls: 'is-events'})
      + note({
        label: 'GIỚI HẠN CỦA SỰ KIỆN', ic: 'alert', tone: 'warn',
        text: 'Một cú nhấp vào số điện thoại hay nút Zalo là sự kiện nhấp, không phải cuộc gọi kết nối hay cuộc hội thoại. '
          + 'Báo cáo phải ghi đúng điều đã đo được, thay vì suy ra điều chưa đo.'
      })
  });
}

/* ------------------------------------------------------------------ *
 * 06 — Rollout: ten steps in three phases
 * ------------------------------------------------------------------ */
const STEP_ICONS = ['search', 'target', 'route', 'code', 'creative', 'gear', 'shield', 'play', 'sliders', 'chart'];
const PHASES = [['Chuẩn bị', [0, 1, 2, 3]], ['Dựng chiến dịch', [4, 5, 6]], ['Chạy & tối ưu', [7, 8, 9]]];

function chapterRollout() {
  return chapter({
    id: 'trien-khai', num: 6, eyebrow: 'MƯỜI BƯỚC TRIỂN KHAI',
    title: 'POWAI làm gì, và doanh nghiệp nhận lại được gì.',
    lead: 'Mỗi bước kết thúc bằng một thứ có thể xem được. Bấm một bước để xem việc làm và kết quả bàn giao.',
    body: rolloutBody({steps: implementation, icons: STEP_ICONS, phases: PHASES})
  });
}

/* ------------------------------------------------------------------ *
 * 07 — Readiness checklist, grouped
 * ------------------------------------------------------------------ */
const PREP_GROUPS = [
  ['Tài khoản & ngân sách', 'wallet', [0, 9, 12]],
  ['Website & đo lường', 'page', [1, 2, 3, 4, 11]],
  ['Tiếp nhận & nội dung', 'chat', [5, 6, 7, 8, 10]]
];

function chapterPrep() {
  return chapter({
    id: 'chuan-bi', num: 7, eyebrow: 'DANH SÁCH CHUẨN BỊ',
    title: 'Mười ba thứ cần có trước khi tiêu đồng đầu tiên.',
    lead: 'Đánh dấu những gì doanh nghiệp đã có. Phần còn thiếu là việc cần làm trước khi bật chiến dịch.',
    body: prepBody(PREP_GROUPS, preparation)
  });
}

/* ------------------------------------------------------------------ *
 * 08 — FAQ in four topics
 * ------------------------------------------------------------------ */
const FAQ_TOPICS = [
  ['Chi phí & thời gian', 'wallet', [0, 3]],
  ['Chạy & tối ưu', 'sliders', [1, 2, 4, 8, 9]],
  ['Đo lường', 'chart', [5, 6, 7, 10, 11, 12]],
  ['Hợp tác & dữ liệu', 'shield', [13, 14]]
];

function chapterFaq() {
  return chapter({
    id: 'faq', num: 8, eyebrow: 'CÂU HỎI THƯỜNG GẶP',
    title: 'Mười lăm câu hỏi hay được đặt ra nhất.',
    lead: 'Chọn một chủ đề. Câu trả lời nói rõ cả điều làm được lẫn điều chưa đủ cơ sở để kết luận.',
    body: faqBody(FAQ_TOPICS, faq)
  });
}

/* ------------------------------------------------------------------ *
 * Contact — the only place the placeholders are used
 * ------------------------------------------------------------------ */
const contactBlock = () => contactChapter({goals: goals.map(g => [g.id, g.title])});

/* ------------------------------------------------------------------ *
 * Recap
 * ------------------------------------------------------------------ */
function recap() {
  const items = [
    ['Tách chi phí trước', 'Tiền trả Google, sản xuất và phí dịch vụ là ba khoản khác nhau.', '#chi-phi', 'wallet'],
    ['Chọn điều muốn tối ưu', 'Sáu cách đặt thầu, mỗi cách cần dữ liệu riêng.', '#dat-thau', 'sliders'],
    ['Đo trước khi tiêu', 'Mười bốn chỉ số, chín thành phần đo lường.', '#do-luong', 'chart']
  ];

  return section({
    cls: 'lp-recap',
    inner: `<div class="sec-head center"><span class="kicker">TÓM TẮT</span><h2>Ba việc quyết định hiệu quả ngân sách.</h2></div>`
      + `<div class="recap rv">${recapLinks(items)}</div>`
      + nextBlock({
        eyebrow: 'XEM LẠI · ' + PAGES[0].num,
        title: PAGES[0].label,
        text: PAGES[0].hint,
        href: PAGES[0].href,
        cta: 'Quay lại cách chạy & định dạng'
      })
  });
}

export function budgetPage() {
  const index = toc([
    ['chi-phi', 'Chi phí'], ['dat-thau', 'Đặt thầu'], ['do-luong', 'Chỉ số'], ['cai-do', 'Đo lường'],
    ['su-kien', 'Sự kiện'], ['trien-khai', 'Triển khai'], ['chuan-bi', 'Chuẩn bị'], ['faq', 'Hỏi đáp'],
    ['lien-he', 'Liên hệ']
  ], 'Mục lục Chi phí & hiệu quả');

  return hero() + stepsBar('budget')
    + section({
      id: 'chuong', cls: 'lp-chapters',
      inner: index + chapterCost() + chapterBidding() + chapterKpis() + chapterTracking()
        + chapterEvents() + chapterRollout() + chapterPrep() + chapterFaq() + contactBlock()
    })
    + recap();
}

export const budgetMeta = {
  title: 'Google Ads: chi phí, đo lường và hiệu quả',
  description: 'Ngân sách quảng cáo gồm những khoản nào, sáu cách đặt thầu, mười bốn chỉ số theo thứ tự '
    + 'phễu, chín thành phần đo lường và mười bước POWAI triển khai cùng doanh nghiệp.'
};

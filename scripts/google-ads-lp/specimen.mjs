// TEMPORARY review page for step 1 of the visual redesign: every part of the
// visual kit on one page. Not linked anywhere, noindex, delete before commit.
// Run: node scripts/google-ads-lp/specimen.mjs  → dist/__ga-visuals/index.html
import {mkdir, writeFile} from 'node:fs/promises';
import {
  document_, section, secHead, icon, mock, stage, tiltStage, withMarkers,
  landingPhone, contactReport, crmTable, eventLog, utmBar, tagList, ga4Mini,
  ecField, callLog, merchantGrid, offlineRow, lineChart, barChart, targetDots,
  knob, ring, stackBar, tabs, more, ratioFrame, charBox, assetKit, flow,
  machine, pipeline, funnel, equation, serpAd, searchHead, browser, carousel,
  phone, appPage
} from './shared.mjs';
import {ICON_PATHS} from './visuals.mjs';

const ACCENTS = [
  ['search', 'Search', '#88e4ff'], ['pmax', 'PMax', '#c0a2ff'], ['shopping', 'Shopping', '#85e1c1'],
  ['demand-gen', 'Demand Gen', '#ffbd80'], ['video', 'Video', '#ff9bc1'], ['app', 'App', '#e0cd9b']
];
const grid = (cols, cells) => `<div class="spec-grid" style="--c:${cols}">${cells.join('')}</div>`;
const cap = (t, inner) => `<div class="spec-cell"><small class="spec-cap">${t}</small>${inner}</div>`;

const colours = section({id: 'mau', inner: secHead({eyebrow: 'Bước 1 · Màu', title: 'Bảng màu sáng hơn', lead: 'Nền #07111F xen kẽ #0B1829, mỗi khối có quầng sáng theo màu nhấn. Thẻ dùng gradient #172A42 → #0F1E33 và viền trắng 9%.'})
  + grid(6, ACCENTS.map(([id, name, hex]) => `<article class="card" data-campaign="${id}"><span class="spec-sw" style="background:${hex}"></span><h3>${name}</h3><p>${hex}</p></article>`))
  + grid(3, ['good', 'consider', 'fix'].map(s => `<article class="card" data-accent="${s}"><span class="spec-sw" style="background:var(--accent)"></span><h3>${s}</h3><p>chữ 100% · nền 12% · viền 28%</p></article>`))
  + `<div class="spec-icons">${Object.keys(ICON_PATHS).map(k => `<span title="${k}">${icon(k)}</span>`).join('')}</div>`});

const mocks = ['serp', 'links', 'call', 'product', 'catalog', 'detail', 'square', 'wide', 'banner', 'masthead', 'instream', 'nonskip', 'bumper', 'feed', 'portrait', 'phone', 'app'];
const platform = section({id: 'mo-phong', veil: true, inner: secHead({eyebrow: 'Mô phỏng nền tảng', title: 'Nền sáng --stage, không logo', lead: 'Trang tìm kiếm nhận diện bằng thanh tìm kiếm và các tab kết quả; video bằng trình phát; chat bằng icon chung.'})
  + grid(3, mocks.map(id => cap(id, stage(mock(id), {tag: 'MÔ PHỎNG · ' + id.toUpperCase()}))))
  + grid(2, [
    cap('Gõ từ khóa → quảng cáo lên đầu (motion)', `<div data-anim data-campaign="search">${stage(browser('search?q=nen+thom', searchHead('nến thơm phòng ngủ', {typing: true}) + serpAd({title: 'Nến thơm thiên nhiên — Giao trong ngày', url: 'nhathom.vn › nen-thom', desc: 'Sáp đậu nành, hương dịu. Mua 2 tặng 1.', call: true})))}</div>`),
    cap('Carousel mua sắm: thẻ của mình nổi lên', stage(browser('shopping?q=nen+thom', searchHead('nến thơm', {active: 'Mua sắm'}) + carousel(5, 1))))
  ])
  + grid(3, ACCENTS.slice(0, 3).map(([id, name]) => cap('tiltStage · ' + name, `<div data-campaign="${id}">${tiltStage(mock(id === 'shopping' ? 'catalog' : id === 'pmax' ? 'feed' : 'serp'))}</div>`)))
  + grid(2, [
    cap('Marker ①②③ trên mock', `<div data-campaign="search" data-anim>${stage(withMarkers(mock('links'), [
      {n: 1, x: 12, y: 30, title: 'Tiêu đề', text: 'Tối đa 3 tiêu đề hiển thị, mỗi tiêu đề 30 ký tự.'},
      {n: 2, x: 55, y: 50, title: 'Mô tả', text: 'Tối đa 2 mô tả, mỗi mô tả 90 ký tự.'},
      {n: 3, x: 82, y: 68, title: 'Liên kết trang web', text: 'Đưa người xem thẳng tới bảng giá, dự án, liên hệ.'}
    ]))}</div>`),
    cap('Trang ứng dụng', stage(phone(appPage({state: 'install'}))))
  ])});

const business = section({id: 'doanh-nghiep', inner: secHead({eyebrow: 'Phía doanh nghiệp', title: 'Trang đích, báo cáo, công cụ đo'})
  + grid(3, [
    cap('landingPhone (tương tác)', landingPhone({interactive: true})),
    cap('contactReport', contactReport()),
    cap('crmTable', crmTable())
  ])
  + grid(4, [cap('utmBar', utmBar()), cap('tagList', tagList()), cap('ga4Mini', ga4Mini()), cap('ecField', ecField())])
  + grid(4, [cap('callLog', callLog()), cap('merchantGrid', merchantGrid()), cap('offlineRow', offlineRow()),
    cap('eventLog (motion)', `<div data-anim>${eventLog([
      {name: 'page_view', label: 'Tín hiệu'}, {name: 'view_service', label: 'Tín hiệu'}, {name: 'click_zalo', label: 'Tín hiệu'},
      {name: 'qualified_lead', group: 'confirmed', label: 'Đã xác nhận'}, {name: 'sale', group: 'confirmed', label: 'Đã xác nhận'}])}</div>`)])});

const specs = section({id: 'kich-thuoc', veil: true, inner: secHead({eyebrow: 'Khung đúng tỷ lệ', title: 'Kích thước vẽ như bản vẽ kỹ thuật'})
  + `<div class="v-ratios" data-campaign="demand-gen">${[
    [1200, 1200, '1:1', 's6'], [1200, 628, '1.91:1', 's-shelf'], [960, 1200, '4:5', 's3'], [1080, 1920, '9:16', 's-tall'], [1920, 1080, '16:9', 's-hero']
  ].map(([w, h, r, img]) => ratioFrame({w, h, ratio: r, img, size: 'Tối thiểu ' + Math.round(w / 2) + '×' + Math.round(h / 2)})).join('')}</div>`
  + grid(2, [
    `<div data-campaign="search">${charBox({id: 'spec-h1', label: 'Tiêu đề 1', text: 'Nến thơm thiên nhiên', limit: 30})}${charBox({id: 'spec-d1', label: 'Mô tả 1', text: 'Sáp đậu nành, hương dịu, cháy 40 giờ. Giao trong ngày tại TP.HCM.', limit: 90, multiline: true})}</div>`,
    assetKit({title: 'ASSET KIT · Demand Gen', files: [
      {name: 'Ảnh 1:1', img: 's6', done: true}, {name: 'Ảnh 1.91:1', img: 's-shelf', done: true}, {name: 'Ảnh 4:5', img: 's3', done: true},
      {name: 'Logo', icon: 'star', done: true}, {name: 'Video 9:16', icon: 'video'}, {name: 'Tiêu đề ×5', icon: 'file'}]})
  ])});

const diagrams = section({id: 'so-do', inner: secHead({eyebrow: 'Sơ đồ chuyển động', title: 'Flow · Machine · Pipeline · Phễu'})
  + `<div data-campaign="search">${flow([
    {icon: 'need', label: 'Có nhu cầu', note: 'Khách nghĩ tới sản phẩm'},
    {icon: 'search', label: 'Gõ tìm', note: '“nến thơm phòng ngủ”'},
    {icon: 'auction', label: 'Đấu giá', note: 'Chọn quảng cáo phù hợp'},
    {icon: 'creative', label: 'Thấy quảng cáo', note: 'Tiêu đề + mô tả'},
    {icon: 'page', label: 'Vào trang', note: 'Trang dịch vụ'},
    {icon: 'convert', label: 'Liên hệ', note: 'Gọi / Zalo / form'}
  ], {label: 'Hành trình tìm kiếm'})}</div>`
  + `<div class="spec-gap" data-campaign="pmax">${machine({
    inputs: {items: [{icon: 'creative', label: 'Ảnh, video, tiêu đề'}, {icon: 'users', label: 'Tín hiệu đối tượng'}, {icon: 'target', label: 'Mục tiêu chuyển đổi'}]},
    core: {icon: 'gear', label: 'Hệ thống tự phân phối', note: 'Học từ chuyển đổi'},
    outputs: {items: [{icon: 'search', label: 'Tìm kiếm'}, {icon: 'play', label: 'Video'}, {icon: 'layers', label: 'Hiển thị & Khám phá'}]}
  })}</div>`
  + `<div class="spec-gap" data-campaign="search">${pipeline({columns: [
    [{id: 'utm', icon: 'link', label: 'UTM', ui: utmBar(), drawer: '<p><b>Cần khi</b> chạy nhiều nguồn.</p><p><b>Đầu vào → Đầu ra:</b> đường dẫn → nguồn rõ ràng.</p>'}],
    [{id: 'web', icon: 'page', label: 'Web + form + gọi', ui: '', drawer: '<p>Trang đích với 4 nút liên hệ.</p>', under: {id: 'ec', icon: 'lock', label: 'Enhanced Conv.', ui: ecField(), drawer: '<p>Email được mã hóa trước khi gửi.</p>'}}],
    [{id: 'gtm', icon: 'code', label: 'Tag Manager', ui: tagList(['Gửi form', 'Bấm gọi']), drawer: '<p>Gắn thẻ đo mà không sửa code.</p>'}],
    [{id: 'ads', icon: 'target', label: 'Ads conversion', drawer: '<p>Chuyển đổi để tối ưu giá thầu.</p>'},
      {id: 'ga4', icon: 'chart', label: 'GA4', drawer: '<p>Hành vi trên web.</p>'},
      {id: 'calls', icon: 'phone', label: 'Call tracking', drawer: '<p>Cuộc gọi dài hơn 60 giây.</p>'}],
    [{id: 'crm', icon: 'users', label: 'CRM', ui: '', drawer: '<p>Đội tư vấn chấm khách.</p>'}],
    [{id: 'offline', icon: 'repeat', label: 'Gửi lại offline', ui: offlineRow(), drawer: '<p>Doanh số thật quay về Ads.</p>'}]
  ]})}</div>`
  + `<div class="spec-gap" data-campaign="search">${funnel({tiers: [
    {id: 'imp', label: 'Lượt hiển thị', value: 20000, panel: equation({name: 'CTR', top: {value: 800, label: 'nhấp'}, bottom: {value: 20000, label: 'hiển thị'}, result: '4%', ratio: .4})},
    {id: 'clk', label: 'Lượt nhấp', value: 800, panel: equation({name: 'CPC', top: {value: '4.000.000₫', label: 'chi phí'}, bottom: {value: 800, label: 'nhấp'}, result: '5.000₫', ratio: .5})},
    {id: 'lead', label: 'Liên hệ', value: 40, panel: equation({name: 'CVR', top: {value: 40, label: 'liên hệ'}, bottom: {value: 800, label: 'nhấp'}, result: '5%', ratio: .5})},
    {id: 'sale', label: 'Đơn hàng', value: 12, panel: equation({name: 'CPA', top: {value: '4.000.000₫', label: 'chi phí'}, bottom: {value: 12, label: 'đơn'}, result: '333.000₫', ratio: .33})}
  ]})}</div>`});

const charts = section({id: 'bieu-do', veil: true, inner: secHead({eyebrow: 'Biểu đồ nhỏ', title: 'Line · Bar · CPA · Knob · Ring · Stack'})
  + `<div data-anim data-campaign="pmax">${grid(3, [
    cap('lineChart', lineChart([10, 14, 12, 19, 24, 22, 31], {area: true, label: 'Chuyển đổi tăng dần'})),
    cap('barChart', barChart([2, 1, 3, 4], {labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'], highlight: 3, label: 'ROAS theo tuần'})),
    cap('targetDots', targetDots({label: 'CPA quanh mục tiêu'}))
  ])}${grid(3, [cap('knob', knob(.7, {label: 'Giá thầu'})), cap('ring', ring(.72, {label: 'Hoàn thành 72%'})),
    cap('stackBar (hover)', stackBar({total: '15.000.000', unit: '₫ / tháng', parts: [
      {id: 'ads', label: 'Ngân sách quảng cáo', value: 12, color: '#88e4ff', body: '<p>Trả cho nền tảng theo lượt nhấp.</p>'},
      {id: 'tax', label: 'Thuế', value: 1, color: '#e0cd9b', body: '<p>Thuế trên chi tiêu quảng cáo.</p>'},
      {id: 'fee', label: 'Phí quản lý', value: 2, color: '#c0a2ff', body: '<p>Phí vận hành của đơn vị.</p>'}]}))])}</div>`});

const controls = section({id: 'dieu-khien', inner: secHead({eyebrow: 'Điều khiển', title: 'Tabs · Xem chi tiết'})
  + `<div data-campaign="video">${tabs({label: 'Định dạng video', items: [
    {id: 'a', tab: icon('play') + 'Có thể bỏ qua', panel: stage(mock('instream'))},
    {id: 'b', tab: icon('lock') + 'Không bỏ qua', panel: stage(mock('nonskip'))},
    {id: 'c', tab: icon('bolt') + 'Bumper 6s', panel: stage(mock('bumper'))}]})}</div>`
  + `<div class="spec-gap">${more('<p>Toàn bộ nội dung chữ cũ nằm ở đây: không xóa, chỉ thu gọn. Người đọc mở ra khi cần đọc sâu.</p><p>Đoạn thứ hai cho thấy độ dài dòng tối đa 68 ký tự và cỡ chữ 16px.</p>')}</div>`});

const css = '<style>.spec-grid{display:grid;grid-template-columns:repeat(var(--c),minmax(0,1fr));gap:18px;margin-top:22px}'
  + '.spec-cell{display:grid;gap:8px;align-content:start;min-width:0}.spec-cap{font-size:12px;color:var(--muted)}'
  + '.spec-sw{display:block;width:40px;height:40px;border-radius:10px;margin-bottom:12px}.spec-gap{margin-top:56px}'
  + '.spec-icons{display:flex;flex-wrap:wrap;gap:14px;margin-top:26px;color:var(--text-2)}.spec-icons .ico{width:26px;height:26px}'
  + '@media(max-width:760px){.spec-grid{grid-template-columns:minmax(0,1fr)}}</style>';

const html = document_({
  title: 'Bộ hình ảnh Google Ads (bản duyệt)',
  description: 'Trang tạm để duyệt bộ hình ảnh.',
  page: 'formats',
  body: css + colours + platform + business + specs + diagrams + charts + controls
}).replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="robots" content="noindex">');

await mkdir('dist/__ga-visuals', {recursive: true});
await writeFile('dist/__ga-visuals/index.html', html);
console.log('Specimen written: dist/__ga-visuals/index.html');

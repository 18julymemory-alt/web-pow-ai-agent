// CRO – tối ưu chuyển đổi (website) — one landing page (WEBSITE_LP_PLAN.md).
// The ads-side page lives at /dich-vu/quang-cao-da-kenh/toi-uu-chuyen-doi-quang-cao/;
// this one works on the website itself, whatever the traffic source.
import {dropoff, scrollMap, hypothesis, splitTest, contactForm, checkout, crm, usability, vitals} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
export {CHECKED};

export default {
  slug: 'cro-toi-uu-chuyen-doi',
  channel: 'webCro',
  name: 'CRO – tối ưu chuyển đổi',
  checked: CHECKED,
  docName: 'tài liệu Google Analytics, web.dev và W3C',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Cách tìm điểm rơi'),
  contact: CONTACT,
  meta: {
    title: 'CRO – tối ưu chuyển đổi website: điểm rơi, giả thuyết, thử nghiệm A/B',
    description: 'Website có truy cập nhưng ít hành động có giá trị: đo từng bước, tìm điểm rơi, viết giả thuyết, thử nghiệm một thay đổi mỗi lần '
      + 'và kết luận theo dữ liệu đủ ngữ cảnh.'
  },
  hero: {
    sub: 'Có người vào, nhưng <em>ít người làm</em>. Tìm chỗ họ dừng lại.',
    lead: 'CRO xác định điểm rơi rớt và thử nghiệm thông điệp, nút kêu gọi, biểu mẫu hoặc hành trình chuyển đổi. '
      + 'Mỗi thay đổi dựa trên một giả thuyết, đo trên cùng điều kiện và không coi vài chuyển đổi đầu tiên là bằng chứng.',
    cta: 'Xem cách tìm điểm rơi',
    rungs: [['funnel', 'Đo từng bước', 'Biết rơi ở đâu'], ['eye', 'Xem hành vi', 'Cuộn, bấm, lỗi'], ['flag', 'Giả thuyết', 'Vì sao, đổi gì'],
      ['sliders', 'Thử A/B', 'Một thay đổi'], ['check', 'Kết luận', 'Đủ dữ liệu']]
  },
  when: {
    title: 'Khi website có truy cập mà ít hành động có giá trị.',
    lead: 'Làm trên website, không phụ thuộc nguồn truy cập. Cần đo được từng bước trước khi sửa.',
    journey: [['chart', 'Đo hiện trạng'], ['funnel', 'Tìm bước rơi nhiều'], ['flag', 'Viết giả thuyết'], ['sliders', 'Thử phương án B'],
      ['check', 'Áp dụng hoặc bỏ']],
    inputs: [['chart', 'Số liệu Analytics'], ['users', 'Dữ liệu CRM, đơn hàng'], ['chat', 'Câu hỏi của khách'], ['page', 'Quyền sửa trang']],
    core: 'Đo, giả thuyết, thử nghiệm',
    outputs: [['funnel', 'Bản đồ điểm rơi'], ['sliders', 'Kết quả thử nghiệm'], ['file', 'Danh sách việc tiếp theo']],
    fit: ['Lưu lượng ổn mà liên hệ, đơn ít', 'Nhiều người bỏ ở form, giỏ, thanh toán', 'Đủ lưu lượng để so hai phương án',
      'Có quyền sửa trang và form'],
    notFit: ['Chưa đo được từng bước', 'Lưu lượng quá ít để kết luận: sửa lỗi rõ trước',
      'Muốn thay mọi thứ cùng lúc', 'Muốn cam kết trước một mức tăng'],
    src: ['gaLead', 'gaKey']
  },
  formats: {
    eyebrow: 'CÁCH TÌM ĐIỂM RƠI',
    title: 'Năm công cụ, dùng theo thứ tự.',
    lead: 'Chọn một công cụ để xem nó cho biết gì.',
    whereLabel: 'Cho biết', whatLabel: 'Dùng thế nào',
    items: [
      {key: 'funnel', label: 'Phễu theo bước', icon: 'funnel', stage: () => dropoff(), tag: 'BÁO CÁO MẪU',
        where: 'Bước nào mất nhiều người nhất.', what: 'Sự kiện cho từng bước: vào trang, bắt đầu form, lỗi, gửi thành công.'},
      {key: 'scroll', label: 'Độ sâu cuộn', icon: 'eye', stage: () => scrollMap(), tag: 'BÁO CÁO MẪU',
        where: 'Bao nhiêu người thấy nút, form.', what: 'So vị trí nội dung quan trọng với nơi người xem dừng cuộn.'},
      {key: 'test', label: 'Quan sát người dùng', icon: 'users', stage: () => usability(1), tag: 'KẾT QUẢ MẪU',
        where: 'Vì sao họ dừng.', what: 'Giao tác vụ cho vài người, ghi lại chỗ vướng; số liệu cho biết ở đâu, quan sát cho biết vì sao.'},
      {key: 'hyp', label: 'Phiếu giả thuyết', icon: 'flag', stage: () => hypothesis(), tag: 'MẪU',
        where: 'Đổi gì, kỳ vọng gì, đo bằng gì.', what: 'Căn cứ, thay đổi, chỉ số chính, chỉ số không được giảm.'},
      {key: 'ab', label: 'Thử nghiệm A/B', icon: 'sliders', stage: () => splitTest('page'), tag: 'THỬ NGHIỆM MẪU',
        where: 'Thay đổi có thật sự tốt hơn.', what: 'Giữ A, thử B, chia đều, chạy tới khi đủ mẫu đã định; đọc cả chất lượng lead.'}
    ],
    src: ['gaLead', 'gaEvents']
  },
  prep: {
    title: 'Đo trước, sửa sau.',
    lead: 'Không đo được bước nào thì không biết khách rơi ở đâu, cũng không biết sửa có hiệu quả không.',
    principle: 'Lỗi rõ ràng (form không gửi, nút không bấm được) sửa ngay, không cần thử nghiệm. Thử nghiệm dành cho câu hỏi còn tranh luận.',
    boardLabel: 'PHIẾU GIẢ THUYẾT',
    boards: [() => hypothesis()],
    tiles: [['code', 'Sự kiện từng bước', 'Bắt đầu, lỗi, hoàn tất'], ['users', 'CRM', 'Chất lượng lead'],
      ['bolt', 'Tốc độ trang', 'Core Web Vitals'], ['mobile', 'Điện thoại thật', 'Thử thao tác']],
    assets: [['Sự kiện', 'form_start, form_submit', 'Kèm sự kiện lỗi.'], ['Dữ liệu', 'CRM, đơn hàng', 'Lead phù hợp, đơn thật.'],
      ['Chữ', 'Danh sách giả thuyết', 'Xếp theo ảnh hưởng.'], ['Trang', 'Quyền sửa', 'Trang, form, giỏ.']],
    specs: [['Sự kiện form', 'form_start · form_submit', 'Google Analytics đo tương tác form tự động khi bật đo lường nâng cao.'],
      ['Lead', 'generate_lead', 'Sự kiện đề xuất cho lead, đánh dấu là sự kiện chính.'],
      ['Tốc độ', 'LCP · INP · CLS', 'Ngưỡng "tốt" theo web.dev.']],
    src: ['gaLead', 'gaKey', 'vitals']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Những điểm rơi hay gặp nhất.',
    lead: 'Nhóm đầu là lỗi sửa ngay, nhóm sau là câu hỏi cần thử nghiệm.',
    items: [
      {key: 'form', group: 'Sửa ngay', groupColor: '#f0d28a', label: 'Form báo lỗi khó hiểu', icon: 'form', stage: () => contactForm('error'),
        facts: [['Dấu hiệu', 'Nhiều sự kiện lỗi, ít gửi thành công.'], ['Sửa', 'Lỗi tại trường, định dạng số điện thoại, bàn phím đúng loại.']]},
      {key: 'slow', group: 'Sửa ngay', groupColor: '#f0d28a', label: 'Trang chậm trên điện thoại', icon: 'bolt', stage: () => vitals('before'),
        facts: [['Dấu hiệu', 'Thoát cao trên điện thoại.'], ['Sửa', 'Xem trang Tối ưu tốc độ.']]},
      {key: 'checkout', group: 'Sửa ngay', groupColor: '#f0d28a', label: 'Phí giao hiện muộn', icon: 'cart', stage: () => checkout('ship'),
        facts: [['Dấu hiệu', 'Bỏ ở bước thanh toán.'], ['Sửa', 'Hiện phí và thời gian giao trước khi nhập địa chỉ.']]},
      {key: 'cta', group: 'Cần thử nghiệm', groupColor: '#88e4ff', label: 'Nút ở quá thấp', icon: 'eye', stage: () => scrollMap(),
        stageTag: 'BÁO CÁO MẪU', facts: [['Giả thuyết', 'Thêm nút ở màn hình đầu.'], ['Đo', 'Gửi form và lead phù hợp.']]},
      {key: 'quality', group: 'Cần thử nghiệm', groupColor: '#88e4ff', label: 'Lead nhiều mà ít phù hợp', icon: 'users', stage: () => crm('qualified', ['Form ngắn', 'Form ngắn', 'Form ngắn']),
        stageTag: 'CRM MẪU', facts: [['Giả thuyết', 'Thêm một câu phân loại nhu cầu.'], ['Đo', 'Tỷ lệ lead phù hợp, không chỉ số form.']]}
    ],
    note: {label: 'KHÔNG HỨA TRƯỚC MỨC TĂNG', ic: 'alert', tone: 'warn',
      text: 'Mức cải thiện phụ thuộc lưu lượng, sản phẩm và dữ liệu hiện có. POWAI đo hiện trạng và thử nghiệm trước, không cam kết một con số trước khi có dữ liệu.'},
    src: ['waiForms', 'vitals']
  },
  measure: {
    title: 'Đọc trước và sau mỗi thay đổi.',
    lead: 'Bấm từng tầng. Số là một tháng giả định để minh họa cách đọc.',
    tiers: [
      ['visit', 'Vào trang', '3.000', [['Lượt xem trang', '3.000', 'page_view.'], ['Thấy form', '690', 'Cuộn tới form.']]],
      ['start', 'Bắt đầu', '410', [['Bắt đầu form', '410', 'form_start.'], ['Gặp lỗi', '120', 'Sự kiện lỗi.']]],
      ['done', 'Hoàn tất', '176', [['Gửi thành công', '176', 'generate_lead.'], ['Lead phù hợp', '71', 'Xác nhận trong CRM.']]]
    ],
    tips: {start: 'Tỷ lệ gặp lỗi cao: sửa lỗi form trước mọi thử nghiệm khác.',
      done: 'Gửi thành công tăng mà lead phù hợp không đổi: thay đổi đang kéo thêm người không đúng nhu cầu.'},
    note: {label: 'THỬ NGHIỆM ĐỦ LÂU', ic: 'clock', text: 'Đặt trước cỡ mẫu và thời gian chạy; không dừng khi mới có vài chuyển đổi. So hai phương án trên cùng thời gian, cùng nguồn truy cập.'},
    src: ['gaLead', 'gaKey']
  },
  rollout: {
    title: 'Sáu bước, mỗi vòng một điểm rơi.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước mỗi thử nghiệm.',
    steps: [['Đo hiện trạng', 'Sự kiện từng bước, 2–4 tuần số liệu.', 'Bản đồ điểm rơi'],
      ['Rà trải nghiệm', 'Điện thoại thật, tốc độ, form, giỏ.', 'Danh sách lỗi'],
      ['Sửa lỗi rõ ràng', 'Không cần thử nghiệm.', 'Bản sửa đã kiểm tra'],
      ['Viết giả thuyết', 'Xếp theo ảnh hưởng và công sức.', 'Danh sách ưu tiên'],
      ['Thử nghiệm', 'Một thay đổi, cỡ mẫu định trước.', 'Kết quả'],
      ['Áp dụng & lặp lại', 'Áp bản thắng, sang điểm rơi tiếp.', 'Báo cáo vòng']],
    icons: ['chart', 'mobile', 'check', 'flag', 'sliders', 'repeat'],
    phases: [['Hiểu', [0, 1]], ['Sửa', [2, 3]], ['Thử', [4, 5]]],
    checks: ['Sự kiện cho từng bước', 'Đo lỗi form', 'Thử trên điện thoại thật', 'Lỗi rõ ràng đã sửa',
      'Một thay đổi mỗi thử nghiệm', 'Cỡ mẫu định trước', 'Chỉ số không được giảm', 'CRM đo lead phù hợp'],
    src: ['gaLead', 'forms']
  },
  faq: {
    items: [
      ['CRO khác tối ưu chuyển đổi quảng cáo?', 'Trang này làm trên website cho mọi nguồn truy cập. Phần gắn với quảng cáo xem trang Tối ưu chuyển đổi quảng cáo.'],
      ['Có cam kết tăng bao nhiêu phần trăm?', 'Không. Kết quả phụ thuộc lưu lượng, sản phẩm và dữ liệu; POWAI đo và thử trước khi kết luận.'],
      ['Ít lưu lượng có làm được không?', 'Được, nhưng ưu tiên sửa lỗi rõ ràng và quan sát người dùng; thử nghiệm A/B cần đủ mẫu.'],
      ['Có cần công cụ trả phí?', 'Không bắt buộc. Nhiều việc làm được với Analytics, CRM và quan sát người dùng.'],
      ['Có sửa giao diện toàn bộ không?', 'Thường không. Phần lớn điểm rơi nằm ở vài trang, form và bước thanh toán.'],
      ['Bao lâu một vòng?', 'Tùy lưu lượng; một vòng gồm đo, sửa, thử và đọc kết quả.']
    ],
    topics: [['Kết quả', 'chart', [1, 2, 5]], ['Cách làm', 'route', [0, 3, 4]]],
    src: ['gaLead']
  },
  contactGoals: [['leads', 'Tăng liên hệ từ website'], ['checkout', 'Giảm bỏ giỏ'], ['form', 'Sửa form'], ['audit', 'Rà soát đo lường']],
  recap: {
    title: 'Ba việc trước khi đổi giao diện.',
    items: [['Đo từng bước', 'Biết rơi ở đâu.', '#chuan-bi', 'funnel'],
      ['Sửa lỗi rõ ràng', 'Không cần thử nghiệm.', '#muc-tieu', 'check'],
      ['Thử một thay đổi', 'Đủ mẫu mới kết luận.', '#do-luong', 'sliders']]
  },
  sisters: sisters('ui-ux', 'landing-page', 'toi-uu-toc-do')
};

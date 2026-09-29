// Đào tạo Website Marketing (TRAINING_LP_PLAN.md).
import {course} from './course.mjs';
import {syllabus, pageReview, lpAnatomy, contactForm, scrollMap, vitals, exercise, rubric, feedback, eventPlan} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['target', 'Thông điệp', 'Viết lại tiêu đề'], ['mobile', 'Trải nghiệm', 'Thử trên điện thoại'],
  ['form', 'Hành động chuyển đổi', 'Rà form'], ['chart', 'Kế hoạch đo', 'Danh sách sự kiện'], ['eye', 'Đánh giá trang', 'Phiếu đánh giá']];

export default course({
  slug: 'website-marketing', channel: 'eduWebsite', name: 'Website Marketing',
  docName: 'tài liệu web.dev và Google Analytics',
  metaTitle: 'Đào tạo Website Marketing: đánh giá trang đích, form, trải nghiệm, đo lường',
  metaDescription: 'Khóa Website Marketing thực hành: đánh giá website từ góc nhìn khách hàng, thông điệp, trải nghiệm điện thoại, form và kế hoạch đo lường.',
  sub: 'Nhìn website bằng <em>mắt khách hàng</em>.',
  lead: 'Học viên cần đánh giá website từ góc nhìn khách hàng. Khóa đi từ thông điệp, trải nghiệm, hành động chuyển đổi tới kế hoạch đo; '
    + 'học viên phát hiện được lỗi form hoặc điểm khiến khách không biết bước tiếp theo.',
  rungs: [['target', 'Thông điệp', 'Rõ trong vài giây'], ['mobile', 'Trải nghiệm', 'Trên điện thoại'], ['form', 'Hành động', 'Form, nút gọi'],
    ['chart', 'Đo', 'Sự kiện đúng'], ['eye', 'Đánh giá', 'Theo phiếu']],
  tool: 'Website doanh nghiệp, điện thoại thật',
  who: {
    title: 'Cho người phụ trách website hoặc trang đích quảng cáo.',
    lead: 'Hợp với nhân sự marketing quản lý website, người chạy quảng cáo cần trang đích tốt, chủ doanh nghiệp duyệt website.',
    journey: [['target', 'Đọc thông điệp'], ['mobile', 'Thử trên điện thoại'], ['form', 'Thử hành động'], ['chart', 'Lập kế hoạch đo'], ['eye', 'Viết đánh giá']],
    inputs: [['globe', 'Website hoặc trang đích'], ['mobile', 'Điện thoại thật'], ['chart', 'Số liệu hiện có'], ['target', 'Mục tiêu trang']],
    outputs: [['eye', 'Phiếu đánh giá'], ['list', 'Danh sách việc sửa'], ['chart', 'Kế hoạch đo']],
    fit: ['Website có người vào mà ít liên hệ', 'Chạy quảng cáo về trang chủ', 'Cần duyệt website do đối tác làm', 'Không biết đo form thế nào'],
    notFit: ['Cần học lập trình website', 'Không có website để thực hành', 'Chỉ muốn đổi giao diện cho đẹp', 'Chưa rõ mục tiêu của trang'],
    src: ['forms', 'gaLead']
  },
  modules: {
    title: 'Năm chủ đề, từ thông điệp tới kế hoạch đo.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'review', label: 'Phiếu đánh giá trang', icon: 'eye', stage: () => pageReview(1), tag: 'BÀI MẪU',
        where: 'Đánh giá theo cùng tiêu chí.', what: 'Thông điệp, hành động, form, đo lường; mỗi mục đạt, cần sửa hoặc lỗi.'},
      {key: 'anat', label: 'Cấu trúc trang đích', icon: 'layers', stage: () => lpAnatomy(1), tag: 'BỐ CỤC MẪU',
        where: 'Trang cần phần nào, theo thứ tự nào.', what: 'Tiêu đề khớp quảng cáo, lợi ích, bằng chứng, một form.'},
      {key: 'form', label: 'Form và lỗi', icon: 'form', stage: () => contactForm('error'), tag: 'ĐIỆN THOẠI',
        where: 'Khách kẹt ở đâu khi điền.', what: 'Nhãn rõ, báo lỗi tại trường, xác nhận khi gửi xong.',
        more: [['Theo', 'Hướng dẫn biểu mẫu của web.dev.']]},
      {key: 'scroll', label: 'Hành vi trên trang', icon: 'chart', stage: () => scrollMap(), tag: 'BÁO CÁO MẪU',
        where: 'Khách xem tới đâu.', what: 'Đọc độ sâu cuộn, so với vị trí nút và form.'},
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 2), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm.'}
    ],
    src: ['forms', 'gaLead']
  },
  prep: {
    principle: 'Đánh giá trên điện thoại thật trước, máy tính sau. Mỗi nhận xét chỉ ra được vị trí trên trang.',
    boardLabel: 'PHIẾU ĐÁNH GIÁ',
    boards: [() => pageReview(2)],
    tiles: [['globe', 'Trang cần đánh giá', 'Trang đích quảng cáo'], ['mobile', 'Điện thoại thật', 'Mạng di động'],
      ['chart', 'Số liệu', 'Analytics nếu có'], ['target', 'Mục tiêu trang', 'Một hành động chính']],
    specs: [['Form', 'Nhãn, lỗi, xác nhận', 'Hướng dẫn biểu mẫu của web.dev.'],
      ['Tốc độ', 'Core Web Vitals', 'Ngưỡng tốt theo web.dev.'],
      ['Đo lường', 'form_start · generate_lead', 'Sự kiện form và lead của Google Analytics.']],
    src: ['forms', 'vitals', 'gaLead']
  },
  practice: {
    title: 'Đánh giá một trang đích và đề xuất sửa.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#9fc8ff', label: 'Đánh giá trang đích', icon: 'form', stage: () => exercise({
        title: 'Đánh giá trang quà Tết doanh nghiệp', brief: 'Dùng phiếu đánh giá, thử trên điện thoại, đề xuất 5 việc sửa theo ưu tiên.',
        data: 'Trang đích mẫu, số liệu 1 tháng (mẫu)', criteria: ['Nhận xét chỉ đúng vị trí', 'Phát hiện lỗi form', 'Đề xuất có thứ tự ưu tiên']}),
        facts: [['Nộp', 'Phiếu đánh giá và 5 đề xuất.'], ['Vì sao', 'Học cách nhìn như khách.']]},
      {key: 'speed', group: 'Bài tập', groupColor: '#9fc8ff', label: 'Đọc tốc độ trang', icon: 'bolt', stage: () => vitals('before'), stageTag: 'SỐ MẪU',
        facts: [['Làm', 'Đọc ba chỉ số, nêu vấn đề chính.'], ['Học được', 'Khi nào chuyển cho kỹ thuật.']]},
      {key: 'events', group: 'Bài tập', groupColor: '#9fc8ff', label: 'Kế hoạch đo', icon: 'chart', stage: () => eventPlan(1),
        facts: [['Làm', 'Liệt kê sự kiện cần đo cho trang.'], ['Học được', 'Đo gửi thành công, không đo lượt bấm.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Chỉ đúng vị trí', 2], ['Tìm ra lỗi form', 1], ['Ưu tiên hợp lý', 1], ['Có kế hoạch đo', 0]], 1),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Trang đẹp, màu hài hòa', 1], ['Nên thêm nhiều sản phẩm', 2], ['Đo: số lượt bấm nút Gửi', 3]],
        [['Nhận xét cảm tính; chỉ ra khách hiểu gì trong 5 giây đầu.', 'warn'], ['Trang chiến dịch cần ít hướng rẽ, không thêm.', 'bad'], ['Đo khi gửi thành công, không đo lượt bấm.', 'bad']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['forms', 'gaLead']
  },
  eval: [['Nêu được lỗi của một trang', '11', 'Bài tình huống.'], ['Phiếu đánh giá đạt', '9', 'Theo bảng chấm.'], ['Sửa được 2 lỗi đầu', '7', 'Trong 30 ngày.']],
  evalSrc: ['forms', 'gaLead'],
  practiceStep: 'Đánh giá trang theo phiếu, thử trên điện thoại, chữa bài.',
  checks: ['Trang để đánh giá', 'Điện thoại thật', 'Số liệu mẫu hoặc thật', 'Phiếu đánh giá thống nhất',
    'Tiêu chí chấm công bố trước', 'Buổi chữa bài', 'Kế hoạch đo có sự kiện gửi thành công', 'Danh sách việc sửa có người làm'],
  checksSrc: ['forms', 'gaEvents'],
  faq: [
    ['Có cần biết lập trình không?', 'Không. Khóa dạy đánh giá và đề xuất; sửa kỹ thuật chuyển cho người phụ trách website.'],
    ['Khác gì khóa UI/UX?', 'Khóa này nhìn từ mục tiêu marketing: thông điệp, hành động, đo lường.'],
    ['Có dạy A/B test không?', 'Có phần giới thiệu cách đặt giả thuyết và đọc kết quả.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['forms'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Phiếu đánh giá', 'Dùng cho mọi trang.', '#dinh-dang', 'eye'], ['Danh sách việc sửa', 'Có ưu tiên.', '#muc-tieu', 'list'],
    ['Kế hoạch đo', 'Gửi thành công.', '#muc-tieu', 'chart']],
  sisters: sisters('ga4-tracking', 'seo', 'google-ads')
});

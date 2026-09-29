// Đào tạo GA4 & Tracking (TRAINING_LP_PLAN.md). Events, DebugView and the
// Tag Manager model (tags, triggers, variables, preview) from Google's help.
import {course} from './course.mjs';
import {syllabus, eventPlan, debugStream, tagSetup, dropoff, exercise, rubric, feedback, contactForm} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['file', 'Định nghĩa sự kiện', 'Kế hoạch sự kiện'], ['code', 'Thẻ và điều kiện', 'Cấu hình mẫu'],
  ['bolt', 'Thử ghi nhận', 'Biên bản kiểm tra'], ['chart', 'Đọc báo cáo', 'Nhận xét phễu'], ['check', 'Sự kiện chính', 'Danh sách chuyển đổi']];

export default course({
  slug: 'ga4-tracking', channel: 'eduGa4', name: 'GA4 & Tracking',
  docName: 'tài liệu Google Analytics và Tag Manager',
  metaTitle: 'Đào tạo GA4 & Tracking: kế hoạch sự kiện, Tag Manager, kiểm tra, báo cáo',
  metaDescription: 'Khóa GA4 & Tracking thực hành: định nghĩa sự kiện, cấu hình thẻ và trình kích hoạt, thử ghi nhận trong chế độ gỡ lỗi và DebugView, đọc báo cáo.',
  sub: 'Hiểu một hành động <em>được ghi thành dữ liệu</em> thế nào.',
  lead: 'Học viên cần hiểu một hành động của khách được ghi thành dữ liệu thế nào. Khóa đi từ định nghĩa sự kiện, thẻ và điều kiện, '
    + 'thử ghi nhận tới đọc báo cáo; kiểm tra sự kiện ghi đúng và không ghi khi sai điều kiện, không chỉ thấy có dữ liệu.',
  rungs: [['file', 'Sự kiện', 'Định nghĩa trước'], ['code', 'Thẻ', 'Trình kích hoạt, biến'], ['bolt', 'Thử', 'Chế độ gỡ lỗi'],
    ['chart', 'Báo cáo', 'Đọc phễu'], ['check', 'Sự kiện chính', 'Đúng mục tiêu']],
  tool: 'GA4, Tag Manager (quyền chỉnh sửa trên bản thử)',
  who: {
    title: 'Cho người cài đặt hoặc đọc dữ liệu website.',
    lead: 'Hợp với nhân sự marketing phụ trách đo lường, người chạy quảng cáo cần chuyển đổi đúng, lập trình viên web cần hiểu yêu cầu đo.',
    journey: [['file', 'Định nghĩa sự kiện'], ['code', 'Cấu hình thẻ'], ['bolt', 'Thử ghi nhận'], ['chart', 'Đọc báo cáo'], ['check', 'Chọn sự kiện chính']],
    inputs: [['globe', 'Website có quyền cài'], ['target', 'Mục tiêu đo'], ['code', 'Tài khoản GA4, Tag Manager'], ['users', 'Người duyệt thay đổi']],
    outputs: [['table', 'Kế hoạch sự kiện'], ['code', 'Cấu hình mẫu'], ['check', 'Biên bản kiểm tra']],
    fit: ['Số liệu GA4 và quảng cáo không khớp', 'Không biết đo form thế nào', 'Sắp chuyển sang Tag Manager', 'Cần đọc báo cáo tự tin hơn'],
    notFit: ['Không có quyền cài trên website', 'Chỉ cần xem báo cáo cơ bản', 'Muốn theo dõi dữ liệu cá nhân của khách', 'Không có môi trường thử'],
    src: ['gaAbout', 'gtm']
  },
  modules: {
    title: 'Năm chủ đề, từ sự kiện tới báo cáo.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'plan', label: 'Kế hoạch sự kiện', icon: 'table', stage: () => eventPlan(1), tag: 'BÀI MẪU',
        where: 'Đo hành động nào, khi nào ghi.', what: 'Tên sự kiện, điều kiện ghi, tham số, trạng thái kiểm tra.',
        more: [['Theo', 'Dùng sự kiện đề xuất như generate_lead khi có thể, thay vì tự đặt tên.']]},
      {key: 'tag', label: 'Thẻ · trình kích hoạt · biến', icon: 'code', stage: () => tagSetup(1), tag: 'BÀI MẪU',
        where: 'Tag Manager hoạt động thế nào.', what: 'Thẻ gửi dữ liệu, trình kích hoạt quyết định khi nào, biến giữ giá trị.',
        more: [['Theo', 'Mô hình thẻ, trình kích hoạt, biến và lớp dữ liệu của Tag Manager.']]},
      {key: 'debug', label: 'Thử ghi nhận', icon: 'bolt', stage: () => debugStream(3), tag: 'MÔ PHỎNG',
        where: 'Sự kiện có ghi đúng không.', what: 'Chế độ xem trước của Tag Manager và DebugView của GA4 cho một máy thử.'},
      {key: 'report', label: 'Đọc báo cáo', icon: 'chart', stage: () => dropoff(), tag: 'BÁO CÁO MẪU',
        where: 'Khách rơi ở bước nào.', what: 'Đọc phễu theo sự kiện, so với dữ liệu kinh doanh.'},
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 2), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm.'}
    ],
    src: ['gaEvents', 'gtm', 'gaDebug']
  },
  prep: {
    principle: 'Viết kế hoạch sự kiện trước khi cấu hình. Mọi thay đổi thử trong chế độ xem trước rồi mới xuất bản.',
    boardLabel: 'KẾ HOẠCH SỰ KIỆN',
    boards: [() => eventPlan(0)],
    tiles: [['globe', 'Website', 'Quyền cài mã'], ['code', 'Tag Manager', 'Vùng làm việc thử'],
      ['chart', 'GA4', 'Quyền chỉnh sửa'], ['target', 'Mục tiêu đo', 'Lead, đơn, gọi']],
    specs: [['Sự kiện', 'Đề xuất trước, tự đặt sau', 'Sự kiện đề xuất có sẵn báo cáo trong Google Analytics.'],
      ['Tag Manager', 'Xem trước và gỡ lỗi', 'Thử cấu hình như đã xuất bản trước khi xuất bản thật.'],
      ['GA4', 'DebugView', 'Xem sự kiện của một máy thử theo thời gian thực; lọc lưu lượng gỡ lỗi khỏi báo cáo.']],
    src: ['gaEvents', 'gtmPreview', 'gaDebug']
  },
  practice: {
    title: 'Cấu hình, thử và chứng minh một sự kiện lead.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#ffd08a', label: 'Đo form tư vấn', icon: 'form', stage: () => exercise({
        title: 'Đo form "Nhận báo giá"', brief: 'Viết kế hoạch sự kiện, cấu hình thẻ generate_lead, thử cả trường hợp lỗi và thành công.',
        data: 'Trang thử có form, vùng làm việc Tag Manager thử', criteria: ['Chỉ ghi khi gửi thành công', 'Có tham số form_id', 'Có biên bản thử đúng và sai']}),
        facts: [['Nộp', 'Kế hoạch, ảnh cấu hình, biên bản thử.'], ['Vì sao', 'Chứng minh bằng thử, không bằng niềm tin.']]},
      {key: 'neg', group: 'Bài tập', groupColor: '#ffd08a', label: 'Thử trường hợp sai', icon: 'alert', stage: () => contactForm('error'),
        facts: [['Làm', 'Gửi form lỗi, xác nhận không có generate_lead.'], ['Học được', 'Kiểm tra cả khi không nên ghi.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Tên sự kiện đúng', 2], ['Điều kiện ghi đúng', 1], ['Thử cả đúng và sai', 0], ['Đọc được báo cáo', 1]], 2),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Trình kích hoạt: mọi lượt bấm nút', 1], ['Tên: Form_Lead_New', 2], ['Kiểm tra: thấy có dữ liệu', 3]],
        [['Bấm nút không phải gửi thành công; dùng sự kiện sau khi máy chủ nhận.', 'bad'], ['Dùng tên đề xuất generate_lead.', 'warn'], ['Thử thêm trường hợp form lỗi.', 'bad']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['gtmPreview', 'gaDebug']
  },
  eval: [['Giải thích thẻ, trình kích hoạt, biến', '11', 'Câu hỏi tình huống.'], ['Sự kiện lead đạt', '9', 'Thử đúng và sai.'], ['Rà đo lường website thật', '6', 'Trong 30 ngày.']],
  evalSrc: ['gtm', 'gaDebug'],
  practiceStep: 'Cấu hình trên vùng làm việc thử, xem trước, chữa bài.',
  checks: ['Vùng làm việc Tag Manager thử', 'Quyền GA4 phù hợp', 'Trang thử có form', 'Kế hoạch sự kiện trước cấu hình',
    'Thử trong chế độ xem trước', 'Thử cả trường hợp sai', 'Không thu dữ liệu cá nhân trong tham số', 'Lọc lưu lượng gỡ lỗi'],
  checksSrc: ['gtmPreview', 'gaDebug'],
  faq: [
    ['Có cần biết code không?', 'Không bắt buộc cho phần Tag Manager cơ bản; phần lớp dữ liệu cần phối hợp với lập trình viên.'],
    ['Số liệu GA4 khác quảng cáo là sai?', 'Không hẳn; các hệ thống ghi nhận khác nhau. Khóa dạy cách đối chiếu và tìm lỗi thật.'],
    ['Có học đo phía máy chủ không?', 'Có phần giới thiệu; triển khai chuyên sâu là phạm vi riêng.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['gaAbout', 'gtm'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Kế hoạch sự kiện', 'Viết trước khi cài.', '#dinh-dang', 'table'], ['Cấu hình mẫu', 'Thẻ, trình kích hoạt, biến.', '#dinh-dang', 'code'],
    ['Biên bản thử', 'Cả đúng và sai.', '#muc-tieu', 'check']],
  sisters: sisters('website-marketing', 'google-ads', 'automation')
});

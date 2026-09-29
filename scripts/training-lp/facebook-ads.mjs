// Đào tạo Facebook Ads (TRAINING_LP_PLAN.md). Objectives and Ads Manager
// levels from Meta's help centre; Blueprint as the official course library.
import {course} from './course.mjs';
import {syllabus, objectiveMap, fb, lesson, exercise, rubric, feedback, crm, leadDone} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['target', 'Mục tiêu quảng cáo', 'Bảng mục tiêu → chỉ số'], ['users', 'Nhóm khách', 'Mô tả đối tượng'],
  ['image', 'Nội dung theo mục tiêu', 'Hai phiên bản nội dung'], ['route', 'Điểm đến', 'Phiếu kiểm tra điểm đến'], ['chart', 'Chất lượng lead', 'Bảng đối chiếu CRM']];
const OBJ = [['Nhiều người biết thương hiệu', 'Nhận biết', 'Người tiếp cận'], ['Người vào website', 'Lưu lượng truy cập', 'Lượt xem trang đích'],
  ['Khách để lại thông tin', 'Khách hàng tiềm năng', 'Lead phù hợp'], ['Khách mua hàng', 'Doanh số', 'Đơn, doanh thu']];

export default course({
  slug: 'facebook-ads', channel: 'eduFacebook', name: 'Facebook Ads',
  docName: 'tài liệu Meta Business và Blueprint',
  metaTitle: 'Đào tạo Facebook Ads: mục tiêu, nhóm khách, nội dung, điểm đến, chất lượng lead',
  metaDescription: 'Khóa Facebook Ads thực hành: chọn mục tiêu theo mục tiêu kinh doanh, mô tả nhóm khách, viết nội dung theo mục tiêu, kiểm tra điểm đến và đánh giá chất lượng lead.',
  sub: 'Phân biệt <em>lượt tương tác</em> với <em>khách tư vấn được</em>.',
  lead: 'Học viên hay nhầm giữa tương tác và khách hàng tiềm năng. Khóa đi từ mục tiêu quảng cáo, nhóm khách, nội dung theo mục tiêu, '
    + 'điểm đến tới đánh giá chất lượng lead trong CRM.',
  rungs: [['target', 'Mục tiêu', 'Đúng mục tiêu lớn'], ['users', 'Nhóm khách', 'Mô tả rõ'], ['image', 'Nội dung', 'Theo mục tiêu'],
    ['route', 'Điểm đến', 'Form, tin nhắn, web'], ['chart', 'Chất lượng lead', 'Đối chiếu CRM']],
  tool: 'Trình quản lý quảng cáo Meta (quyền phù hợp)',
  who: {
    title: 'Cho người chạy hoặc duyệt quảng cáo Facebook, Instagram.',
    lead: 'Hợp với nhân sự quảng cáo, người viết nội dung quảng cáo, trưởng nhóm duyệt ngân sách.',
    journey: [['target', 'Chọn mục tiêu'], ['users', 'Mô tả nhóm khách'], ['image', 'Viết nội dung'], ['route', 'Kiểm tra điểm đến'], ['chart', 'Đánh giá lead']],
    inputs: [['target', 'Mục tiêu kinh doanh'], ['image', 'Ảnh, video được phép dùng'], ['users', 'Thông tin khách hàng'], ['table', 'Dữ liệu CRM (nếu có)']],
    outputs: [['target', 'Bảng mục tiêu → chỉ số'], ['image', 'Bộ nội dung mẫu'], ['users', 'Cách chấm lead']],
    fit: ['Quảng cáo nhiều tương tác mà ít khách', 'Cần chọn mục tiêu đúng cho từng chiến dịch', 'Nhân sự mới nhận tài khoản quảng cáo', 'Cần thống nhất cách đánh giá lead'],
    notFit: ['Chưa có trang hoặc tài khoản quảng cáo', 'Chỉ cần đăng bài, không chạy quảng cáo: học Social Media', 'Muốn mẹo lách chính sách quảng cáo', 'Không có người chăm sóc lead'],
    src: ['metaObjective', 'blueprint']
  },
  modules: {
    title: 'Năm chủ đề, từ mục tiêu tới chất lượng lead.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'obj', label: 'Mục tiêu quảng cáo', icon: 'target', stage: () => objectiveMap(OBJ, 2), tag: 'BÀI MẪU',
        where: 'Mục tiêu nào cho việc gì.', what: 'Bảng nối mục tiêu kinh doanh với mục tiêu quảng cáo và chỉ số.',
        more: [['Theo', 'Meta khuyên chọn mục tiêu gần nhất với mục tiêu lớn: nhận biết, lưu lượng, tương tác, khách hàng tiềm năng, ứng dụng, doanh số.']]},
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 1), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm.'},
      {key: 'feed', label: 'Nội dung trên bảng tin', icon: 'image', stage: () => fb('fb-feed-img'), tag: 'MÔ PHỎNG',
        where: 'Khách thấy gì khi lướt.', what: 'Viết nội dung theo mục tiêu: một lời hứa, một hành động, ảnh đúng sản phẩm.'},
      {key: 'story', label: 'Tin và thước phim', icon: 'mobile', stage: () => fb('fb-story'), tag: 'MÔ PHỎNG',
        where: 'Màn hình dọc, xem nhanh.', what: 'Giữ chữ trong vùng an toàn; mở đầu nói ngay điều khách quan tâm.'},
      {key: 'lead', label: 'Chất lượng lead', icon: 'users', stage: () => crm('qualified', ['Form tức thì', 'Tin nhắn', 'Website']), tag: 'CRM MẪU',
        where: 'Lead nào gọi được, mua được.', what: 'Đối chiếu lead với CRM theo nguồn; không đánh giá bằng số lượng tương tác.'}
    ],
    src: ['metaObjective', 'metaLevels', 'blueprint']
  },
  prep: {
    principle: 'Học trên tài khoản quảng cáo của doanh nghiệp với quyền phù hợp, hoặc bằng mô phỏng. Không bật ngân sách trong buổi học nếu chưa thống nhất.',
    boardLabel: 'MỤC TIÊU → CHỈ SỐ',
    boards: [() => objectiveMap(OBJ, 1)],
    tiles: [['target', 'Mục tiêu kinh doanh', 'Lead hay đơn'], ['image', 'Ảnh, video', 'Được phép dùng'],
      ['users', 'Khách hàng', 'Ai, ở đâu, cần gì'], ['table', 'CRM', 'Để chấm lead']],
    specs: [['Cấp trong Ads Manager', 'Chiến dịch · nhóm quảng cáo · quảng cáo', 'Mục tiêu chọn ở cấp chiến dịch.'],
      ['Mục tiêu', 'Theo mục tiêu lớn', 'Hướng dẫn chọn mục tiêu của Meta.'],
      ['Học thêm', 'Meta Blueprint', 'Khóa học trực tuyến chính thức, miễn phí.']],
    src: ['metaLevels', 'metaObjective', 'blueprint']
  },
  practice: {
    title: 'Viết, kiểm tra và chấm một chiến dịch lead.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#9db8f5', label: 'Chiến dịch lead mẫu', icon: 'form', stage: () => exercise({
        title: 'Chiến dịch khách hàng tiềm năng cho quà Tết', brief: 'Chọn mục tiêu, mô tả nhóm khách, viết 2 phiên bản nội dung và chọn điểm đến.',
        data: 'Ảnh sản phẩm được phép dùng, bảng giá, CRM mẫu 3 tháng', criteria: ['Mục tiêu khớp mục tiêu kinh doanh', 'Nội dung có một lời hứa rõ', 'Điểm đến có câu hỏi phân loại']}),
        facts: [['Nộp', 'Bảng thiết lập và hai phiên bản nội dung.'], ['Lưu ý', 'Không bật ngân sách.']]},
      {key: 'thanks', group: 'Bài tập', groupColor: '#9db8f5', label: 'Kiểm tra điểm đến', icon: 'route', stage: () => leadDone(),
        facts: [['Làm', 'Điền thử form, kiểm tra xác nhận và nơi nhận lead.'], ['Học được', 'Lead chỉ có giá trị khi có người nhận.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Mục tiêu đúng', 2], ['Nhóm khách mô tả rõ', 1], ['Nội dung theo mục tiêu', 1], ['Có cách chấm lead', 0]], 3),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Mục tiêu: lượt tương tác', 1], ['Nội dung: 5 sản phẩm, 3 ưu đãi', 2], ['Đánh giá: 300 bình luận', 3]],
        [['Muốn lead thì chọn mục tiêu khách hàng tiềm năng.', 'bad'], ['Một nội dung, một lời hứa.', 'warn'], ['Đếm lead phù hợp trong CRM, không đếm bình luận.', 'bad']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['metaObjective', 'gaLead']
  },
  eval: [['Chọn đúng mục tiêu cho tình huống', '11', 'Câu hỏi tình huống.'], ['Chiến dịch mẫu đạt', '9', 'Theo bảng chấm.'], ['Chấm lead bằng CRM', '7', 'Sau khóa học.']],
  evalSrc: ['metaObjective', 'blueprint'],
  practiceStep: 'Thiết lập chiến dịch lead mẫu, viết nội dung, chữa bài.',
  checks: ['Quyền tài khoản phù hợp', 'Ảnh, video được phép dùng', 'Có CRM hoặc bảng lead mẫu', 'Không bật ngân sách khi chưa thống nhất',
    'Tiêu chí chấm công bố trước', 'Buổi chữa bài nội dung', 'Thử điền form điểm đến', 'Kế hoạch chấm lead hằng tuần'],
  checksSrc: ['metaLevels', 'blueprint'],
  faq: [
    ['Khóa có dạy quảng cáo Instagram không?', 'Có. Facebook và Instagram dùng chung Trình quản lý quảng cáo; bài học có cả vị trí trên hai nền tảng.'],
    ['Có chứng chỉ Meta không?', 'Chứng nhận Meta là kỳ thi riêng của Meta Blueprint; khóa học giúp chuẩn bị phần thực hành.'],
    ['Tài khoản bị hạn chế thì sao?', 'Khóa học không dạy lách chính sách; nội dung tuân thủ tiêu chuẩn quảng cáo của Meta.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['blueprint', 'metaObjective'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Mục tiêu đúng', 'Theo mục tiêu lớn.', '#dinh-dang', 'target'], ['Nội dung theo mục tiêu', 'Một lời hứa.', '#dinh-dang', 'image'],
    ['Chấm lead', 'Bằng CRM.', '#muc-tieu', 'users']],
  sisters: sisters('tiktok-ads', 'google-ads', 'content-marketing')
});

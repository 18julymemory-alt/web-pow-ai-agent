// Đào tạo TikTok Ads (TRAINING_LP_PLAN.md). Objective groups and Pixel
// events from TikTok's Ads Manager help; TikTok Academy as course library.
import {course} from './course.mjs';
import {syllabus, storyboard, objectiveMap, lesson, exercise, rubric, feedback, lpAnatomy, eventPlan, debugStream} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['video', 'Mở đầu video', 'Ba câu mở đầu'], ['target', 'Hướng chiến dịch', 'Bảng mục tiêu'],
  ['page', 'Trang đích', 'Phiếu rà trang'], ['bolt', 'Sự kiện đo hành động', 'Danh sách sự kiện'], ['chart', 'Đọc kết quả', 'Bảng xem → hành động']];
const OBJ = [['Nhiều người biết', 'Nhận biết · Tiếp cận', 'Người tiếp cận'], ['Người vào website', 'Cân nhắc · Lưu lượng', 'Lượt vào trang'],
  ['Khách hành động', 'Chuyển đổi', 'Sự kiện trên website']];

export default course({
  slug: 'tiktok-ads', channel: 'eduTiktok', name: 'TikTok Ads',
  docName: 'tài liệu TikTok Ads Manager và TikTok Academy',
  metaTitle: 'Đào tạo TikTok Ads: video ngắn, mục tiêu chiến dịch, trang đích, sự kiện',
  metaDescription: 'Khóa TikTok Ads thực hành: viết mở đầu video, chọn hướng chiến dịch, rà trang đích và đặt sự kiện đo hành động; phân biệt lượt xem với chuyển đổi.',
  sub: 'Nối <em>video</em> với <em>mục tiêu</em> và <em>điểm đến</em>.',
  lead: 'Học viên thường làm video hay nhưng chưa nối được với mục tiêu và điểm đến. Khóa đi từ mở đầu video, hướng chiến dịch, '
    + 'trang đích tới cách đo hành động; bài thực hành phân biệt lượt xem với chuyển đổi và kiểm tra quyền nội dung.',
  rungs: [['video', 'Mở đầu', 'Đúng nhu cầu'], ['target', 'Mục tiêu', 'Nhận biết → chuyển đổi'], ['page', 'Trang đích', 'Khớp video'],
    ['bolt', 'Sự kiện', 'Đo hành động'], ['chart', 'Kết quả', 'Xem ≠ mua']],
  tool: 'TikTok Ads Manager (quyền phù hợp)',
  who: {
    title: 'Cho người làm video quảng cáo hoặc chạy TikTok Ads.',
    lead: 'Hợp với người làm nội dung video, nhân sự quảng cáo, chủ shop bán hàng qua video ngắn.',
    journey: [['video', 'Viết mở đầu'], ['target', 'Chọn mục tiêu'], ['page', 'Rà trang đích'], ['bolt', 'Đặt sự kiện'], ['chart', 'Đọc kết quả']],
    inputs: [['video', 'Video, cảnh quay được phép'], ['page', 'Trang đích'], ['target', 'Mục tiêu'], ['code', 'Quyền cài đặt đo lường']],
    outputs: [['video', 'Kịch bản video'], ['target', 'Bảng mục tiêu'], ['bolt', 'Danh sách sự kiện']],
    fit: ['Video nhiều lượt xem mà ít đơn', 'Chuẩn bị chạy TikTok Ads lần đầu', 'Cần đo hành động trên website', 'Đội nội dung và quảng cáo làm riêng rẽ'],
    notFit: ['Chưa có sản phẩm, trang đích', 'Chỉ muốn làm kênh không quảng cáo: học Social Media', 'Dùng nhạc, hình không có quyền', 'Không ai theo dõi kết quả'],
    src: ['ttObjective', 'ttAcademy']
  },
  modules: {
    title: 'Năm chủ đề, từ video tới đo hành động.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'story', label: 'Kịch bản video ngắn', icon: 'video', stage: () => storyboard(0), tag: 'BÀI MẪU',
        where: 'Mở đầu, demo, bằng chứng, kết.', what: 'Bốn nhịp, một thông điệp; lời thoại, chữ và phụ đề thống nhất.'},
      {key: 'obj', label: 'Hướng chiến dịch', icon: 'target', stage: () => objectiveMap(OBJ, 2), tag: 'BÀI MẪU',
        where: 'Mục tiêu nào cho việc gì.', what: 'Chọn mục tiêu theo nhóm nhận biết, cân nhắc, chuyển đổi.',
        more: [['Theo', 'TikTok Ads Manager chia mục tiêu thành ba nhóm: nhận biết, cân nhắc, chuyển đổi.']]},
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 2), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm.'},
      {key: 'lp', label: 'Trang đích khớp video', icon: 'page', stage: () => lpAnatomy(0), tag: 'BỐ CỤC MẪU',
        where: 'Khách bấm từ video vào đâu.', what: 'Trang nhắc lại lời hứa của video, mở nhanh trên điện thoại.'},
      {key: 'events', label: 'Sự kiện đo hành động', icon: 'bolt', stage: () => eventPlan(1), tag: 'BÀI MẪU',
        where: 'Ghi lại hành động trên website.', what: 'Pixel và sự kiện theo hành trình: xem sản phẩm, thêm giỏ, mua.',
        more: [['Theo', 'TikTok khuyên đặt sự kiện phản ánh cả hành trình khách trên website.']]}
    ],
    src: ['ttObjective', 'ttPixel']
  },
  prep: {
    principle: 'Chỉ dùng hình, nhạc, người xuất hiện đã được phép. Bài thực hành kiểm tra quyền nội dung trước khi đăng.',
    boardLabel: 'KỊCH BẢN VIDEO',
    boards: [() => storyboard(1)],
    tiles: [['video', 'Cảnh quay', 'Sản phẩm, người thật'], ['page', 'Trang đích', 'Mở nhanh trên điện thoại'],
      ['code', 'Pixel', 'Quyền cài đặt'], ['target', 'Mục tiêu', 'Xem, lead hay đơn']],
    specs: [['Mục tiêu', 'Nhận biết · cân nhắc · chuyển đổi', 'Theo hướng dẫn chọn mục tiêu của TikTok Ads Manager.'],
      ['Đo lường', 'TikTok Pixel + sự kiện chuẩn', 'Sự kiện chuẩn dùng cho báo cáo, tối ưu và tệp đối tượng.'],
      ['Học thêm', 'TikTok Academy', 'Khóa học chính thức của TikTok cho nhà quảng cáo.']],
    src: ['ttObjective', 'ttPixel', 'ttAcademy']
  },
  practice: {
    title: 'Làm một video, một chiến dịch, một bảng đo.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#f5a3c0', label: 'Video và chiến dịch mẫu', icon: 'form', stage: () => exercise({
        title: 'Video 15 giây cho nến khắc tên', brief: 'Viết kịch bản 4 nhịp, chọn mục tiêu chiến dịch và trang đích tương ứng.',
        data: 'Cảnh quay sản phẩm được phép, trang sản phẩm, bảng giá', criteria: ['Mở đầu nói đúng nhu cầu', 'Mục tiêu khớp việc muốn khách làm', 'Trang đích nhắc lại lời hứa']}),
        facts: [['Nộp', 'Kịch bản, bảng thiết lập, đường dẫn trang.'], ['Lưu ý', 'Kiểm tra quyền nhạc và hình.']]},
      {key: 'debug', group: 'Bài tập', groupColor: '#f5a3c0', label: 'Kiểm tra sự kiện', icon: 'bolt', stage: () => debugStream(3), stageTag: 'MÔ PHỎNG',
        facts: [['Làm', 'Thử hành động trên trang, xem sự kiện ghi nhận.'], ['Học được', 'Lượt xem video không phải chuyển đổi.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Mở đầu đúng nhu cầu', 2], ['Một thông điệp', 1], ['Mục tiêu đúng', 1], ['Có sự kiện đo', 0]], 3),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['0–3 giây: logo và nhạc', 1], ['Mục tiêu: lượt xem video', 2], ['Kết: "follow kênh nhé"', 3]],
        [['Mở đầu chưa nói điều khách quan tâm.', 'warn'], ['Muốn đơn thì chọn nhóm chuyển đổi và đo sự kiện.', 'bad'], ['Kết bằng hành động khớp mục tiêu.', 'warn']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['ttPixel', 'ttObjective']
  },
  eval: [['Phân biệt lượt xem và chuyển đổi', '11', 'Câu hỏi tình huống.'], ['Video + chiến dịch mẫu đạt', '9', 'Theo bảng chấm.'], ['Đo sự kiện trên website', '6', 'Sau khóa học.']],
  evalSrc: ['ttPixel', 'ttAcademy'],
  practiceStep: 'Viết kịch bản, dựng chiến dịch mẫu, kiểm tra sự kiện, chữa bài.',
  checks: ['Cảnh quay được phép dùng', 'Kiểm tra quyền nhạc', 'Trang đích mở nhanh trên điện thoại', 'Quyền cài Pixel',
    'Tiêu chí chấm công bố trước', 'Buổi chữa kịch bản', 'Thử sự kiện trước khi chạy', 'Không bật ngân sách khi chưa thống nhất'],
  checksSrc: ['ttPixel', 'ttAcademy'],
  faq: [
    ['Khóa có dạy làm video không?', 'Có ở mức kịch bản và cấu trúc; quay dựng chuyên sâu là phần riêng.'],
    ['Có học TikTok Shop không?', 'Không nằm trong khóa này; có thể thêm chủ đề nếu doanh nghiệp bán qua TikTok Shop.'],
    ['Cần cài Pixel trước khi học không?', 'Không bắt buộc; bài đo sự kiện có thể làm trên trang thử.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['ttAcademy', 'ttPixel'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Kịch bản video', 'Bốn nhịp, một thông điệp.', '#dinh-dang', 'video'], ['Mục tiêu đúng', 'Theo việc muốn khách làm.', '#dinh-dang', 'target'],
    ['Sự kiện đo', 'Xem khác mua.', '#muc-tieu', 'bolt']],
  sisters: sisters('facebook-ads', 'social-media-marketing', 'ga4-tracking')
});

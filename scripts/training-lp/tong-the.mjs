// Đào tạo Digital Marketing tổng thể (TRAINING_LP_PLAN.md).
import {course} from './course.mjs';
import {syllabus, lesson, planCanvas, exercise, rubric, feedback, schedule, objectiveMap, crm, dropoff} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['users', 'Khách hàng và nhu cầu', 'Chân dung, câu hỏi khi mua'], ['route', 'Vai trò từng kênh', 'Bản đồ kênh'],
  ['page', 'Nội dung và website', 'Đánh giá một trang đích'], ['chart', 'Đo lường', 'Chỉ số cho từng mục tiêu'], ['layers', 'Kế hoạch một trang', 'Kế hoạch hoàn chỉnh']];

export default course({
  slug: 'digital-marketing-tong-the', channel: 'eduOverview', name: 'Digital Marketing tổng thể',
  docName: 'tài liệu Google, Meta và TikTok',
  metaTitle: 'Đào tạo Digital Marketing tổng thể: khách hàng, kênh, nội dung, website, đo lường',
  metaDescription: 'Khóa nền tảng giúp học viên nối khách hàng, kênh, nội dung, website và dữ liệu trong một kế hoạch marketing có mục tiêu và chỉ số.',
  sub: 'Không học từng kênh rời rạc. Học cách <em>nối chúng thành một kế hoạch</em>.',
  lead: 'Học viên thường biết từng kênh nhưng chưa lập được kế hoạch chung. Khóa này đi từ mục tiêu kinh doanh, vai trò từng kênh, '
    + 'nội dung và website tới cách đo, và kết thúc bằng một kế hoạch một trang học viên tự giải thích được.',
  rungs: [['target', 'Mục tiêu', 'Từ kinh doanh'], ['route', 'Vai trò kênh', 'Mỗi kênh một việc'], ['page', 'Nội dung', 'Trả lời nhu cầu'],
    ['chart', 'Đo lường', 'Chỉ số đúng mục tiêu'], ['layers', 'Kế hoạch', 'Một trang']],
  tool: 'Tài khoản xem báo cáo (nếu có)',
  who: {
    title: 'Cho người mới, hoặc người biết một kênh cần nhìn toàn cảnh.',
    lead: 'Hợp với nhân sự marketing mới, chủ doanh nghiệp nhỏ, trưởng nhóm cần phân vai kênh cho đội ngũ.',
    journey: [['target', 'Làm rõ mục tiêu'], ['users', 'Hiểu khách hàng'], ['route', 'Chọn vai trò kênh'], ['page', 'Viết hướng nội dung'], ['chart', 'Định nghĩa cách đo']],
    inputs: [['users', 'Vai trò học viên'], ['target', 'Mục tiêu doanh nghiệp'], ['file', 'Tình huống thật'], ['chart', 'Báo cáo hiện có']],
    outputs: [['layers', 'Kế hoạch một trang'], ['route', 'Bản đồ kênh'], ['chart', 'Bộ chỉ số']],
    fit: ['Biết từng kênh nhưng chưa lập kế hoạch chung', 'Mới vào nghề, cần nền tảng', 'Chủ doanh nghiệp cần đọc được báo cáo',
      'Trưởng nhóm cần ngôn ngữ chung cho đội'],
    notFit: ['Cần đi sâu thao tác một công cụ: chọn khóa theo kênh', 'Muốn học thuộc mẹo, không làm bài',
      'Không có bài toán để áp dụng', 'Cần kết quả kinh doanh ngay trong khóa'],
    src: ['gaStructure', 'metaObjective', 'gaAbout']
  },
  modules: {
    title: 'Năm chủ đề, mỗi chủ đề một bài làm.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 1), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm; học viên biết trước phải nộp gì.'},
      {key: 'channel', label: 'Vai trò từng kênh', icon: 'route', stage: () => objectiveMap([
        ['Khách đang tìm sản phẩm', 'Tìm kiếm', 'Lead, đơn'], ['Khách chưa biết thương hiệu', 'Mạng xã hội, video', 'Lượt xem, tương tác chất lượng'],
        ['Khách đã ghé website', 'Nhắc lại', 'Quay lại, mua']], 1), tag: 'BÀI MẪU',
        where: 'Mỗi kênh làm việc gì trong hành trình khách.', what: 'Bản đồ kênh: kênh nào đón nhu cầu, kênh nào tạo nhu cầu, kênh nào nhắc lại.',
        more: [['Theo', 'Mục tiêu chiến dịch của Google Ads, Meta và TikTok đều bắt đầu từ mục tiêu kinh doanh.']]},
      {key: 'lesson', label: 'Nội dung và website', icon: 'page', stage: () => lesson('Nội dung và trang đích', ['Chiến lược', 'Kênh', 'Nội dung', 'Đo lường'], 2), tag: 'MÀN HÌNH HỌC',
        where: 'Nội dung trả lời câu hỏi gì, dẫn về đâu.', what: 'Đánh giá một trang đích theo phiếu: thông điệp, hành động, form, đo lường.'},
      {key: 'measure', label: 'Đo lường', icon: 'chart', stage: () => dropoff(), tag: 'BÁO CÁO MẪU',
        where: 'Chỉ số nào cho mục tiêu nào.', what: 'Tách chỉ số nền tảng với dữ liệu kinh doanh; đọc phễu theo bước.'},
      {key: 'plan', label: 'Kế hoạch một trang', icon: 'layers', stage: () => planCanvas(2), tag: 'BÀI MẪU',
        where: 'Gom mọi thứ thành quyết định.', what: 'Mục tiêu, khách hàng, vai trò kênh, nội dung, ngân sách thử, chỉ số.'}
    ],
    src: ['gaStructure', 'metaObjective', 'ttObjective']
  },
  prep: {
    principle: 'Học viên mang theo một bài toán của chính mình. Bài cuối khóa là kế hoạch cho bài toán đó.',
    boardLabel: 'LỊCH HỌC',
    boards: [() => schedule([['Khách hàng và mục tiêu', 'Lý thuyết', 'Chân dung khách'], ['Vai trò kênh', 'Thực hành', 'Bản đồ kênh'],
      ['Nội dung và website', 'Thực hành', 'Phiếu đánh giá trang'], ['Đo lường và kế hoạch', 'Thực hành', 'Kế hoạch một trang']], 1)],
    tiles: [['target', 'Mục tiêu doanh nghiệp', 'Một con số cụ thể'], ['users', 'Thông tin khách hàng', 'Ai mua, vì sao'],
      ['chart', 'Báo cáo hiện có', 'Nếu đã chạy kênh'], ['file', 'Trang đích', 'Để đánh giá']],
    specs: [['Học chính thức miễn phí', 'Skillshop · Blueprint · TikTok Academy', 'Các nền tảng có khóa học riêng; POWAI dùng làm tài liệu đọc thêm.'],
      ['Mục tiêu quảng cáo', 'Chọn theo mục tiêu kinh doanh', 'Meta và TikTok khuyên chọn mục tiêu gần nhất với mục tiêu lớn của bạn.'],
      ['Đo lường', 'Sự kiện Google Analytics', 'Sự kiện đề xuất như generate_lead, purchase.']],
    src: ['skillshop', 'blueprint', 'ttAcademy', 'metaObjective']
  },
  practice: {
    title: 'Bài làm có phản hồi, không chỉ nghe giảng.',
    lead: 'Học viên làm, giải thích lựa chọn và sửa bài. Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#9fd8ff', label: 'Đề bài cuối khóa', icon: 'form', stage: () => exercise({
        title: 'Kế hoạch quý cho quà tặng doanh nghiệp Nhà Thơm', brief: 'Lập kế hoạch một trang để đạt 60 đơn quà Tết doanh nghiệp trong quý.',
        data: 'Báo cáo 3 tháng (mẫu), bảng sản phẩm, trang đích hiện tại', criteria: ['Mục tiêu có con số và thời hạn', 'Mỗi kênh có vai trò rõ', 'Chỉ số khớp mục tiêu']}),
        facts: [['Nộp', 'Kế hoạch một trang và 5 phút trình bày.'], ['Vì sao', 'Học viên phải giải thích được lựa chọn.']]},
      {key: 'crm', group: 'Bài tập', groupColor: '#9fd8ff', label: 'Đọc dữ liệu kinh doanh', icon: 'users', stage: () => crm('qualified', ['Tìm kiếm', 'Mạng xã hội', 'Giới thiệu']),
        stageTag: 'CRM MẪU', facts: [['Làm', 'So số lead nền tảng báo với khách phù hợp.'], ['Học được', 'Không cộng số của các nền tảng.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Mục tiêu rõ, đo được', 2], ['Vai trò kênh hợp lý', 1], ['Chỉ số khớp mục tiêu', 0], ['Giải thích được lựa chọn', 1]], 2),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Mục tiêu: tăng nhận diện thương hiệu', 1], ['Kênh: chạy tất cả kênh cùng lúc', 2], ['Chỉ số: lượt thích trang', 3]],
        [['Mục tiêu chưa có con số và thời hạn.', 'warn'], ['Mỗi kênh cần một vai trò; bắt đầu từ kênh đón nhu cầu.', 'bad'], ['Lượt thích không đo được đơn quà Tết.', 'bad']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do, học viên tự sửa.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['gaAbout', 'gaLead']
  },
  eval: [['Giải thích đúng vai trò kênh', '10', 'Câu hỏi tình huống ngắn.'], ['Bài đạt tiêu chí', '9', 'Theo bảng chấm.'], ['Áp dụng vào bài toán thật', '7', 'Kế hoạch được trưởng nhóm duyệt.']],
  evalSrc: ['gaAbout'],
  practiceStep: 'Mỗi buổi một chủ đề và một bài làm có chữa bài.',
  checks: ['Học viên mang bài toán riêng', 'Có báo cáo mẫu để đọc', 'Đề cương gắn bài làm', 'Tiêu chí chấm công bố trước',
    'Có buổi chữa bài', 'Bài cuối là kế hoạch một trang', 'Trưởng nhóm dự buổi cuối', 'Kế hoạch có người làm, thời hạn'],
  checksSrc: ['skillshop', 'blueprint'],
  faq: [
    ['Khóa này có dạy thao tác từng công cụ không?', 'Chỉ ở mức đọc và hiểu. Thao tác sâu nằm ở các khóa theo kênh như Google Ads, Facebook Ads, GA4.'],
    ['Người chưa làm marketing học được không?', 'Được. Khóa bắt đầu từ khách hàng và mục tiêu, dùng ví dụ doanh nghiệp thật.'],
    ['Có dùng tài liệu của nền tảng không?', 'Có. Google Skillshop, Meta Blueprint, TikTok Academy là tài liệu đọc thêm chính thức và miễn phí.'],
    ['Học trực tiếp hay trực tuyến?', 'Cả hai; thống nhất theo số học viên, thiết bị và lịch của doanh nghiệp.']
  ],
  faqSrc: ['skillshop', 'blueprint', 'ttAcademy'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Bản đồ kênh', 'Mỗi kênh một vai trò.', '#dinh-dang', 'route'], ['Bộ chỉ số', 'Khớp với mục tiêu.', '#dinh-dang', 'chart'],
    ['Kế hoạch một trang', 'Cho bài toán thật.', '#muc-tieu', 'layers']],
  sisters: sisters('marketing-thuc-chien-cho-doanh-nghiep', 'google-ads', 'ga4-tracking')
});

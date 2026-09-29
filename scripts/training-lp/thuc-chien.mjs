// Marketing thực chiến cho doanh nghiệp (TRAINING_LP_PLAN.md): a workshop
// on the company's own problem, ending with an action plan.
import {course} from './course.mjs';
import {syllabus, planCanvas, actionPlan, dropoff, crm, schedule, exercise, rubric, feedback, objectiveMap} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['search', 'Làm rõ bối cảnh', 'Bản mô tả bài toán'], ['chart', 'Đọc dữ liệu thật', 'Nhận định có số liệu'],
  ['layers', 'Thực hành phương án', 'Hai phương án so sánh'], ['chat', 'Nhận phản hồi', 'Bản sửa'], ['flag', 'Chốt cách ứng dụng', 'Kế hoạch 30 ngày']];

export default course({
  slug: 'marketing-thuc-chien-cho-doanh-nghiep', channel: 'eduPractice', name: 'Marketing thực chiến cho doanh nghiệp',
  docName: 'tài liệu Google, Meta và TikTok',
  metaTitle: 'Marketing thực chiến cho doanh nghiệp: workshop trên bài toán thật, ra kế hoạch áp dụng',
  metaDescription: 'Workshop marketing trên bài toán và dữ liệu doanh nghiệp được phép dùng: làm rõ bối cảnh, thực hành phương án, nhận phản hồi, chốt kế hoạch có người làm và tiêu chí.',
  sub: 'Học xong <em>có việc làm ngay</em>, không chỉ có giấy chứng nhận.',
  lead: 'Đội ngũ học nhiều nhưng chưa áp dụng vào một bài toán thật. Workshop dùng chính bài toán và dữ liệu doanh nghiệp được phép dùng: '
    + 'làm rõ bối cảnh, thực hành phương án, nhận phản hồi và chốt cách ứng dụng. Đầu ra là kế hoạch có người làm và tiêu chí.',
  rungs: [['search', 'Bối cảnh', 'Bài toán thật'], ['chart', 'Dữ liệu', 'Được phép dùng'], ['layers', 'Phương án', 'Thực hành'],
    ['chat', 'Phản hồi', 'Sửa tại chỗ'], ['flag', 'Kế hoạch', 'Người làm, thời hạn']],
  tool: 'Dữ liệu doanh nghiệp được phép dùng',
  who: {
    title: 'Cho đội ngũ cần áp dụng ngay vào việc đang làm.',
    lead: 'Hợp với nhóm marketing đã có kiến thức nền, chủ doanh nghiệp muốn cả nhóm cùng hiểu bài toán, đội bán hàng và marketing cần phối hợp.',
    journey: [['search', 'Làm rõ bài toán'], ['chart', 'Đọc dữ liệu'], ['layers', 'Thử phương án'], ['chat', 'Nhận phản hồi'], ['flag', 'Chốt kế hoạch']],
    inputs: [['search', 'Bài toán đang gặp'], ['chart', 'Dữ liệu được phép dùng'], ['users', 'Người ra quyết định'], ['calendar', 'Thời gian của nhóm']],
    outputs: [['flag', 'Kế hoạch 30 ngày'], ['layers', 'Phương án đã thử'], ['users', 'Phân vai rõ']],
    fit: ['Đội đã học nhưng chưa áp dụng', 'Có bài toán cụ thể: lead ít, chi phí cao, bán chậm', 'Cần cả nhóm cùng thống nhất cách làm', 'Người ra quyết định dự được buổi cuối'],
    notFit: ['Cần kiến thức nền từ đầu: học Digital Marketing tổng thể', 'Không chia sẻ được dữ liệu nào', 'Không có người ra quyết định', 'Muốn POWAI làm thay toàn bộ'],
    src: ['gaAbout', 'metaObjective']
  },
  modules: {
    title: 'Năm bước của workshop.',
    lead: 'Chọn một bước để xem làm gì và ra gì.',
    items: [
      {key: 'syl', label: 'Chương trình workshop', icon: 'list', stage: () => syllabus(MODS, 2), tag: 'MẪU',
        where: 'Toàn bộ workshop trên một trang.', what: 'Mỗi bước ra một sản phẩm dùng được.'},
      {key: 'data', label: 'Đọc dữ liệu thật', icon: 'chart', stage: () => dropoff(), tag: 'BÁO CÁO MẪU',
        where: 'Bài toán nằm ở bước nào.', what: 'Nhận định dựa trên số liệu, không dựa trên cảm giác.'},
      {key: 'crm', label: 'Dữ liệu kinh doanh', icon: 'users', stage: () => crm('qualified', ['Tìm kiếm', 'Mạng xã hội', 'Giới thiệu']), tag: 'CRM MẪU',
        where: 'Kênh nào ra khách phù hợp.', what: 'Đối chiếu số nền tảng với khách phù hợp và đơn thật.'},
      {key: 'options', label: 'Thực hành phương án', icon: 'layers', stage: () => planCanvas(3), tag: 'BÀI MẪU',
        where: 'Hai cách giải, so sánh.', what: 'Mỗi nhóm dựng phương án trên kế hoạch một trang.'},
      {key: 'plan', label: 'Kế hoạch áp dụng', icon: 'flag', stage: () => actionPlan(0), tag: 'MẪU',
        where: 'Ai làm gì, khi nào xong.', what: 'Việc cụ thể, người làm, hạn, cách kiểm tra.'}
    ],
    src: ['gaAbout', 'metaObjective', 'ttObjective']
  },
  prep: {
    principle: 'Chỉ dùng dữ liệu doanh nghiệp đã đồng ý chia sẻ, đã ẩn thông tin cá nhân. Người ra quyết định dự buổi chốt kế hoạch.',
    boardLabel: 'LỊCH WORKSHOP',
    boards: [() => schedule([['Bối cảnh và dữ liệu', 'Thảo luận', 'Mô tả bài toán'], ['Phương án', 'Thực hành', 'Hai phương án'],
      ['Phản hồi', 'Thực hành', 'Bản sửa'], ['Chốt kế hoạch', 'Thảo luận', 'Kế hoạch 30 ngày']], 1)],
    tiles: [['search', 'Bài toán', 'Một câu, một con số'], ['chart', 'Dữ liệu', 'Đã ẩn thông tin cá nhân'],
      ['users', 'Người ra quyết định', 'Dự buổi cuối'], ['calendar', 'Thời gian', 'Cả nhóm cùng tham gia']],
    specs: [['Dữ liệu', 'Sự kiện và chuyển đổi', 'Đọc theo sự kiện Google Analytics và dữ liệu CRM.'],
      ['Kênh', 'Mục tiêu theo mục tiêu lớn', 'Chọn mục tiêu chiến dịch theo hướng dẫn của các nền tảng.'],
      ['Đầu ra', 'Kế hoạch có người làm', 'Không kết thúc bằng giấy chứng nhận tham gia.']],
    src: ['gaAbout', 'metaObjective']
  },
  practice: {
    title: 'Làm trên bài toán của chính doanh nghiệp.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#ffb89a', label: 'Đề bài workshop', icon: 'form', stage: () => exercise({
        title: 'Lead quà Tết nhiều mà đơn ít', brief: 'Tìm bước rơi lớn nhất, đề xuất hai phương án, chọn một và lập kế hoạch 30 ngày.',
        data: 'Báo cáo quảng cáo, CRM 3 tháng (đã ẩn thông tin cá nhân)', criteria: ['Nhận định có số liệu', 'Hai phương án so sánh được', 'Kế hoạch có người làm, hạn']}),
        facts: [['Nộp', 'Phương án và kế hoạch 30 ngày.'], ['Vì sao', 'Workshop phải ra việc làm được.']]},
      {key: 'obj', group: 'Bài tập', groupColor: '#ffb89a', label: 'Phân vai kênh', icon: 'route', stage: () => objectiveMap([
        ['Khách đang tìm', 'Tìm kiếm', 'Lead phù hợp'], ['Khách chưa biết', 'Video ngắn', 'Lượt xem chất lượng'], ['Khách đã hỏi', 'Nhắc lại', 'Đơn']], 0),
        facts: [['Làm', 'Cả nhóm thống nhất vai trò từng kênh.'], ['Học được', 'Mỗi kênh một chỉ số.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Nhận định có số liệu', 2], ['Phương án khả thi', 1], ['Có người làm, hạn', 1], ['Cách kiểm tra rõ', 0]], 3),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét phương án', icon: 'chat', stage: () => feedback(
        [['Tăng ngân sách quảng cáo gấp đôi', 1], ['Làm thêm TikTok, Zalo, YouTube', 2], ['Người làm: cả phòng', 3]],
        [['Lead nhiều đơn ít: sửa bước tư vấn trước khi tăng tiền.', 'bad'], ['Thêm kênh khi chưa rõ bước rơi làm loãng nguồn lực.', 'warn'], ['Mỗi việc một người chịu trách nhiệm.', 'bad']]),
        facts: [['Cách làm', 'Phản hồi ngay trong buổi.'], ['Kết quả', 'Nhóm sửa và trình lại.']]}
    ],
    src: ['gaAbout', 'gaLead']
  },
  eval: [['Nêu đúng bước rơi lớn nhất', '11', 'Từ dữ liệu thật.'], ['Phương án đạt tiêu chí', '9', 'Theo bảng chấm.'], ['Việc trong kế hoạch đã làm', '8', 'Kiểm tra sau 30 ngày.']],
  evalSrc: ['gaAbout'],
  practiceStep: 'Làm theo nhóm trên dữ liệu thật, phản hồi ngay trong buổi.',
  checks: ['Bài toán viết thành một câu', 'Dữ liệu đã ẩn thông tin cá nhân', 'Người ra quyết định dự buổi cuối', 'Tiêu chí chấm công bố trước',
    'Nhóm có đủ vai trò liên quan', 'Mỗi việc một người chịu trách nhiệm', 'Lịch kiểm tra sau 30 ngày', 'Kế hoạch có cách kiểm tra'],
  checksSrc: ['gaAbout'],
  faq: [
    ['Khác gì thuê agency làm?', 'Workshop giúp đội ngũ tự làm và tự quyết; POWAI hướng dẫn và phản hồi, không làm thay.'],
    ['Dữ liệu có an toàn không?', 'Chỉ dùng dữ liệu doanh nghiệp đồng ý chia sẻ, đã ẩn thông tin cá nhân; cam kết bảo mật theo thỏa thuận.'],
    ['Có theo dõi sau workshop không?', 'Có buổi kiểm tra kế hoạch sau 30 ngày nếu doanh nghiệp chọn.'],
    ['Workshop kéo dài bao lâu?', 'Tùy bài toán và số người; chốt sau khi khảo sát bối cảnh.']
  ],
  faqSrc: ['gaAbout'],
  recapTitle: 'Ba thứ đội ngũ mang về.',
  recap: [['Nhận định có số liệu', 'Bài toán nằm ở đâu.', '#dinh-dang', 'chart'], ['Phương án đã thử', 'So sánh được.', '#dinh-dang', 'layers'],
    ['Kế hoạch 30 ngày', 'Người làm, thời hạn.', '#dinh-dang', 'flag']],
  sisters: sisters('dao-tao-doi-ngu-marketing-noi-bo', 'digital-marketing-tong-the', 'ga4-tracking')
});

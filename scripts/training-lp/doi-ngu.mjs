// Đào tạo đội ngũ Marketing nội bộ (TRAINING_LP_PLAN.md): training by role,
// same process, with a skills matrix and team exercises.
import {course} from './course.mjs';
import {syllabus, skillMatrix, schedule, actionPlan, exercise, rubric, feedback, pipeline, lesson} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['users', 'Rà vai trò', 'Ma trận kỹ năng'], ['target', 'Chọn kỹ năng cần bù', 'Danh sách ưu tiên'],
  ['layers', 'Workshop theo việc', 'Bài nhóm'], ['route', 'Quy trình bàn giao', 'Sơ đồ phối hợp'], ['check', 'Đánh giá bài nhóm', 'Kế hoạch áp dụng']];

export default course({
  slug: 'dao-tao-doi-ngu-marketing-noi-bo', channel: 'eduTeam', name: 'Đào tạo đội ngũ Marketing nội bộ',
  docName: 'tài liệu Google Skillshop, Meta Blueprint và TikTok Academy',
  metaTitle: 'Đào tạo đội ngũ Marketing nội bộ: theo vai trò, ma trận kỹ năng, bài tập phối hợp',
  metaDescription: 'Chương trình đào tạo nội bộ theo vai trò: rà năng lực đầu vào, chọn kỹ năng cần bù, workshop theo việc thật và bài tập phối hợp giữa các vị trí.',
  sub: 'Mỗi người học đúng phần việc, <em>cả nhóm chạy cùng một quy trình</em>.',
  lead: 'Nhân sự khác vai trò cần học cách phối hợp cùng quy trình. Chương trình rà vai trò, chọn kỹ năng cần bù, tổ chức workshop theo việc '
    + 'và đánh giá bài nhóm; đề cương phân theo năng lực đầu vào, có phần việc áp dụng sau học.',
  rungs: [['users', 'Vai trò', 'Ai làm gì'], ['target', 'Kỹ năng', 'Cần bù ở đâu'], ['layers', 'Workshop', 'Theo việc thật'],
    ['route', 'Bàn giao', 'Cùng quy trình'], ['check', 'Đánh giá', 'Bài nhóm']],
  tool: 'Công cụ đội ngũ đang dùng',
  who: {
    title: 'Cho doanh nghiệp muốn nâng năng lực cả đội marketing.',
    lead: 'Hợp với đội marketing 3–20 người, đội có nhân sự mới, doanh nghiệp chuyển việc từ agency về làm nội bộ.',
    journey: [['users', 'Rà vai trò'], ['target', 'Chọn kỹ năng cần bù'], ['layers', 'Workshop theo việc'], ['route', 'Thống nhất bàn giao'], ['check', 'Đánh giá bài nhóm']],
    inputs: [['users', 'Danh sách vai trò'], ['list', 'Việc mỗi người đang làm'], ['target', 'Mục tiêu năm'], ['calendar', 'Lịch có thể học']],
    outputs: [['users', 'Ma trận kỹ năng'], ['list', 'Đề cương theo vai trò'], ['route', 'Quy trình bàn giao']],
    fit: ['Đội có nhiều vai trò, phối hợp chưa trơn', 'Nhân sự mới cần đào tạo nhanh', 'Chuyển việc từ agency về nội bộ', 'Muốn chuẩn hóa cách làm trong đội'],
    notFit: ['Chỉ một người cần học một công cụ: chọn khóa theo kênh', 'Không có thời gian học chung', 'Chưa rõ vai trò trong đội', 'Muốn đánh giá để cắt giảm nhân sự'],
    src: ['skillshop', 'blueprint', 'ttAcademy']
  },
  modules: {
    title: 'Năm bước xây chương trình nội bộ.',
    lead: 'Chọn một bước để xem làm gì và ra gì.',
    items: [
      {key: 'matrix', label: 'Ma trận kỹ năng', icon: 'users', stage: () => skillMatrix(1), tag: 'MẪU',
        where: 'Ai mạnh, ai cần bù.', what: 'Vai trò × kỹ năng, mức hiện tại; chọn ô ảnh hưởng tới phối hợp.'},
      {key: 'syl', label: 'Đề cương theo vai trò', icon: 'list', stage: () => syllabus(MODS, 2), tag: 'MẪU',
        where: 'Mỗi vai trò học phần nào.', what: 'Phần chung cả đội, phần riêng theo vai trò.'},
      {key: 'sched', label: 'Lịch học', icon: 'calendar', stage: () => schedule([['Quy trình chung', 'Thảo luận', 'Sơ đồ phối hợp'], ['Theo vai trò', 'Thực hành', 'Bài cá nhân'],
        ['Bài nhóm', 'Thực hành', 'Chiến dịch mẫu'], ['Đánh giá', 'Thảo luận', 'Kế hoạch áp dụng']], 2), tag: 'MẪU',
        where: 'Học khi nào, dạng gì.', what: 'Xen kẽ học chung và học theo vai trò.'},
      {key: 'handoff', label: 'Quy trình bàn giao', icon: 'route', stage: () => pipeline(2), tag: 'SƠ ĐỒ MẪU',
        where: 'Việc đi qua ai.', what: 'Mỗi bước có người nhận và trạng thái; không thất lạc lead.'},
      {key: 'plan', label: 'Kế hoạch áp dụng', icon: 'flag', stage: () => actionPlan(1), tag: 'MẪU',
        where: 'Sau học làm gì.', what: 'Mỗi người một việc áp dụng có hạn và cách kiểm tra.'}
    ],
    note: {label: 'HỌC THÊM TỪ NỀN TẢNG', ic: 'globe', text: 'Google Skillshop, Meta Blueprint và TikTok Academy có khóa học chính thức miễn phí. Chương trình nội bộ chọn phần phù hợp làm tài liệu đọc thêm cho từng vai trò.'},
    src: ['skillshop', 'blueprint', 'ttAcademy']
  },
  prep: {
    principle: 'Đánh giá năng lực để chọn nội dung học, không để xếp hạng nhân sự. Mỗi người biết trước mình học gì và vì sao.',
    boardLabel: 'MA TRẬN KỸ NĂNG',
    boards: [() => skillMatrix(2)],
    tiles: [['users', 'Danh sách vai trò', 'Và người phụ trách'], ['list', 'Việc đang làm', 'Mỗi vai trò'],
      ['target', 'Mục tiêu năm', 'Của đội'], ['calendar', 'Lịch học', 'Không trùng cao điểm']],
    specs: [['Tài liệu Google', 'Skillshop', 'Khóa học chính thức về Google Ads, Analytics.'],
      ['Tài liệu Meta', 'Blueprint', 'Khóa học chính thức về Facebook, Instagram.'],
      ['Tài liệu TikTok', 'TikTok Academy', 'Khóa học chính thức cho nhà quảng cáo TikTok.']],
    src: ['skillshop', 'blueprint', 'ttAcademy']
  },
  practice: {
    title: 'Bài nhóm mô phỏng đúng quy trình của đội.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#c9d0ff', label: 'Chiến dịch mẫu cả đội', icon: 'form', stage: () => exercise({
        title: 'Chiến dịch quà Tết từ brief tới báo cáo', brief: 'Mỗi vai trò làm phần việc của mình và bàn giao cho người tiếp theo theo quy trình.',
        data: 'Brief mẫu, tài khoản thử, CRM mẫu', criteria: ['Bàn giao đúng người, đúng trạng thái', 'Mỗi phần đạt tiêu chí vai trò', 'Báo cáo đọc được cả chuỗi']}),
        facts: [['Nộp', 'Sản phẩm từng vai trò và báo cáo chung.'], ['Vì sao', 'Học phối hợp, không học riêng lẻ.']]},
      {key: 'lesson', group: 'Bài tập', groupColor: '#c9d0ff', label: 'Học theo vai trò', icon: 'mobile', stage: () => lesson('Theo vai trò: chạy quảng cáo', ['Nhận brief', 'Dựng chiến dịch mẫu', 'Bàn giao lead', 'Báo cáo'], 2),
        stageTag: 'MÀN HÌNH HỌC', facts: [['Làm', 'Mỗi vai trò có bài riêng.'], ['Học được', 'Biết mình nhận gì, giao gì.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Phần việc vai trò đạt', 2], ['Bàn giao đúng quy trình', 1], ['Không thất lạc thông tin', 1], ['Có kế hoạch áp dụng', 0]], 1),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài nhóm', icon: 'chat', stage: () => feedback(
        [['Brief gửi qua tin nhắn cá nhân', 1], ['Lead chuyển bằng ảnh chụp màn hình', 2], ['Báo cáo mỗi người một mẫu', 3]],
        [['Brief lưu ở nơi chung, có phiên bản.', 'warn'], ['Lead đi qua CRM để không thất lạc.', 'bad'], ['Dùng chung một mẫu báo cáo.', 'warn']]),
        facts: [['Cách làm', 'Chỉ ra điểm nghẽn phối hợp.'], ['Kết quả', 'Đội sửa quy trình.']]}
    ],
    src: ['gaLead']
  },
  eval: [['Mỗi người nêu đúng việc nhận và giao', '12', 'Sau buổi quy trình.'], ['Bài nhóm đạt', '9', 'Theo bảng chấm.'], ['Quy trình mới được dùng', '8', 'Kiểm tra sau 30 ngày.']],
  evalSrc: ['skillshop', 'blueprint'],
  practiceStep: 'Học chung quy trình, học riêng theo vai trò, làm bài nhóm.',
  checks: ['Danh sách vai trò rõ', 'Ma trận kỹ năng đầu vào', 'Đề cương theo vai trò', 'Tiêu chí chấm công bố trước',
    'Bài nhóm theo quy trình thật', 'Công cụ chung để bàn giao', 'Trưởng nhóm dự buổi đánh giá', 'Kiểm tra sau 30 ngày'],
  checksSrc: ['skillshop', 'blueprint'],
  faq: [
    ['Đội có người mới và người cũ thì học chung được không?', 'Được; phần chung học cùng, phần riêng chia theo năng lực đầu vào.'],
    ['Có dùng khóa học của Google, Meta không?', 'Có làm tài liệu đọc thêm; các khóa này miễn phí và chính thức.'],
    ['Đánh giá có dùng để xếp hạng nhân sự không?', 'Không. Đánh giá để chọn nội dung học và đo khả năng áp dụng.'],
    ['Học tại công ty được không?', 'Được; thống nhất theo số người, thiết bị và lịch của đội.']
  ],
  faqSrc: ['skillshop', 'blueprint'],
  recapTitle: 'Ba thứ đội ngũ mang về.',
  recap: [['Ma trận kỹ năng', 'Biết cần bù ở đâu.', '#dinh-dang', 'users'], ['Quy trình bàn giao', 'Không thất lạc.', '#dinh-dang', 'route'],
    ['Kế hoạch áp dụng', 'Mỗi người một việc.', '#dinh-dang', 'flag']],
  sisters: sisters('marketing-thuc-chien-cho-doanh-nghiep', 'digital-marketing-tong-the', 'automation')
});

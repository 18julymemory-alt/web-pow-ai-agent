// Đào tạo Google Ads (TRAINING_LP_PLAN.md). Account layers, match types and
// Skillshop certification from Google's own help pages in sources.mjs.
import {course} from './course.mjs';
import {syllabus, keywordGroups, google, lesson, exercise, rubric, feedback, schedule, dropoff} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['layers', 'Cấu trúc tài khoản', 'Sơ đồ chiến dịch mẫu'], ['search', 'Từ khóa và ý định', 'Nhóm từ khóa'],
  ['page', 'Quảng cáo và trang đích', 'Mẫu quảng cáo'], ['list', 'Đọc truy vấn tìm kiếm', 'Danh sách phủ định'], ['chart', 'Đo lường và đọc kết quả', 'Báo cáo tuần']];

export default course({
  slug: 'google-ads', channel: 'eduGoogle', name: 'Google Ads',
  docName: 'tài liệu Google Ads và Skillshop',
  metaTitle: 'Đào tạo Google Ads: cấu trúc tài khoản, từ khóa, quảng cáo, đọc truy vấn',
  metaDescription: 'Khóa Google Ads thực hành: dựng cấu trúc chiến dịch, phân nhóm từ khóa theo ý định, viết quảng cáo, đọc truy vấn và kết quả. Bài tập không tự bật chi tiêu.',
  sub: 'Tự hiểu cấu trúc và <em>kiểm tra được</em> chiến dịch tìm kiếm.',
  lead: 'Học viên cần tự hiểu cấu trúc và kiểm tra chiến dịch tìm kiếm. Khóa đi từ tài khoản, chiến dịch, nhóm quảng cáo tới từ khóa theo ý định, '
    + 'mẫu quảng cáo và cách đọc truy vấn. Bài tập không tự bật chi tiêu; chỉ chạy thật khi đã được cho phép.',
  rungs: [['layers', 'Cấu trúc', 'Tài khoản → nhóm'], ['search', 'Từ khóa', 'Theo ý định'], ['page', 'Quảng cáo', 'Khớp trang đích'],
    ['list', 'Truy vấn', 'Thêm phủ định'], ['chart', 'Kết quả', 'Đọc đúng chỉ số']],
  tool: 'Tài khoản Google Ads (quyền xem hoặc thử)',
  who: {
    title: 'Cho người sẽ tự chạy hoặc kiểm tra chiến dịch tìm kiếm.',
    lead: 'Hợp với nhân sự quảng cáo mới, chủ doanh nghiệp muốn đọc được tài khoản, người nhận bàn giao từ agency.',
    journey: [['layers', 'Hiểu cấu trúc'], ['search', 'Phân nhóm từ khóa'], ['page', 'Viết quảng cáo'], ['list', 'Đọc truy vấn'], ['chart', 'Đọc kết quả']],
    inputs: [['search', 'Sản phẩm, dịch vụ'], ['page', 'Trang đích'], ['chart', 'Tài khoản hiện có (nếu có)'], ['target', 'Mục tiêu']],
    outputs: [['layers', 'Cấu trúc chiến dịch mẫu'], ['search', 'Bộ từ khóa'], ['list', 'Thói quen đọc truy vấn']],
    fit: ['Sắp tự quản lý tài khoản', 'Nhận bàn giao tài khoản cần hiểu nhanh', 'Muốn kiểm tra agency làm gì', 'Chạy quảng cáo tìm kiếm cho dịch vụ địa phương'],
    notFit: ['Chưa có sản phẩm, trang đích để thực hành', 'Chỉ muốn thi chứng chỉ: học trên Skillshop', 'Muốn chạy thật ngay trong buổi học mà chưa có quyền', 'Chưa biết khách hàng là ai'],
    src: ['gaStructure', 'skillshop']
  },
  modules: {
    title: 'Năm chủ đề, từ cấu trúc tới đọc kết quả.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'syl', label: 'Cấu trúc tài khoản', icon: 'layers', stage: () => syllabus(MODS, 0), tag: 'MẪU',
        where: 'Tài khoản, chiến dịch, nhóm quảng cáo.', what: 'Sơ đồ chiến dịch mẫu: tách chiến dịch khi cần ngân sách hoặc vị trí khác.',
        more: [['Theo', 'Google Ads tổ chức thành ba lớp: tài khoản, chiến dịch, nhóm quảng cáo.']]},
      {key: 'kw', label: 'Từ khóa theo ý định', icon: 'search', stage: () => keywordGroups(2), tag: 'BÀI MẪU',
        where: 'Khách tìm gì, đang ở bước nào.', what: 'Nhóm từ khóa theo ý định, loại đối sánh, từ khóa phủ định.',
        more: [['Theo', 'Đối sánh cụm từ dùng " ", chính xác dùng [ ], phủ định dùng dấu −.']]},
      {key: 'ad', label: 'Quảng cáo tìm kiếm', icon: 'page', stage: () => google('search-text'), tag: 'MÔ PHỎNG',
        where: 'Quảng cáo khớp từ khóa và trang đích.', what: 'Viết tiêu đề, mô tả; kiểm tra lời hứa có trên trang đích.'},
      {key: 'lesson', label: 'Đọc truy vấn', icon: 'list', stage: () => lesson('Đọc truy vấn tìm kiếm', ['Lọc truy vấn', 'Đánh dấu không phù hợp', 'Thêm phủ định', 'Ghi lý do'], 2), tag: 'MÀN HÌNH HỌC',
        where: 'Người ta thật sự gõ gì.', what: 'Tìm truy vấn không phù hợp, thêm phủ định, ghi lý do.'},
      {key: 'measure', label: 'Đọc kết quả', icon: 'chart', stage: () => dropoff(), tag: 'BÁO CÁO MẪU',
        where: 'Nhấp, chuyển đổi, chi phí.', what: 'Đọc kết quả cùng dữ liệu kinh doanh, không chỉ tỷ lệ nhấp.'}
    ],
    src: ['gaStructure', 'gaMatch', 'gaKeywords']
  },
  prep: {
    principle: 'Bài tập dựng trên tài khoản thử hoặc ở chế độ tạm dừng. Không bật chi tiêu nếu chưa có cho phép bằng văn bản.',
    boardLabel: 'NHÓM TỪ KHÓA',
    boards: [() => keywordGroups(1)],
    tiles: [['search', 'Sản phẩm, dịch vụ', 'Kèm trang đích'], ['chart', 'Tài khoản', 'Quyền xem hoặc thử'],
      ['target', 'Mục tiêu', 'Lead hay đơn hàng'], ['users', 'Khách hàng', 'Họ gọi sản phẩm là gì']],
    specs: [['Cấu trúc', 'Tài khoản · chiến dịch · nhóm', 'Theo trang cấu trúc tài khoản của Google Ads.'],
      ['Đối sánh', 'Rộng · cụm từ · chính xác · phủ định', 'Loại đối sánh quyết định truy vấn nào được xét.'],
      ['Chứng nhận', 'Skillshop', 'Chứng nhận Google Ads là chương trình riêng của Google trên Skillshop.']],
    src: ['gaStructure', 'gaMatch', 'gaCert']
  },
  practice: {
    title: 'Dựng, kiểm tra và giải thích một chiến dịch mẫu.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#a8c8ff', label: 'Chiến dịch mẫu', icon: 'form', stage: () => exercise({
        title: 'Chiến dịch tìm kiếm cho hộp quà Tết', brief: 'Dựng một chiến dịch 2 nhóm quảng cáo cho hộp quà Tết doanh nghiệp, ở trạng thái tạm dừng.',
        data: 'Trang đích quà Tết, bảng giá, danh sách truy vấn mẫu', criteria: ['Nhóm theo một chủ đề hẹp', 'Có từ khóa phủ định', 'Quảng cáo khớp trang đích']}),
        facts: [['Nộp', 'Ảnh chụp cấu trúc và bảng lý do.'], ['Lưu ý', 'Không bật chi tiêu.']]},
      {key: 'query', group: 'Bài tập', groupColor: '#a8c8ff', label: 'Lọc truy vấn', icon: 'list', stage: () => keywordGroups(3),
        facts: [['Làm', 'Đánh dấu truy vấn không phù hợp, đề xuất phủ định.'], ['Học được', 'Đọc ý định từ câu chữ.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Nhóm quảng cáo đúng chủ đề', 2], ['Từ khóa hợp ý định', 1], ['Có phủ định hợp lý', 0], ['Quảng cáo khớp trang', 1]], 2),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Nhóm 1: nến, quà, tinh dầu, khuếch tán', 1], ['Từ khóa: nến thơm (đối sánh rộng)', 2], ['Quảng cáo: Nhà Thơm – shop nến đẹp', 3]],
        [['Nhóm gom nhiều chủ đề; tách theo sản phẩm.', 'warn'], ['Từ khóa quá rộng; thêm phủ định như "cách làm".', 'bad'], ['Quảng cáo chưa nhắc quà Tết như trang đích.', 'warn']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['gaMatch', 'gaKeywords']
  },
  eval: [['Giải thích được loại đối sánh', '11', 'Câu hỏi tình huống.'], ['Chiến dịch mẫu đạt', '9', 'Theo bảng chấm.'], ['Đọc truy vấn hằng tuần', '7', 'Thói quen sau khóa.']],
  evalSrc: ['gaMatch', 'skillshop'],
  practiceStep: 'Dựng chiến dịch mẫu ở trạng thái tạm dừng, chữa bài từng nhóm.',
  checks: ['Tài khoản thử hoặc quyền xem', 'Chiến dịch mẫu ở trạng thái tạm dừng', 'Có trang đích thật', 'Có danh sách truy vấn mẫu',
    'Tiêu chí chấm công bố trước', 'Buổi chữa bài từ khóa', 'Không bật chi tiêu khi chưa cho phép', 'Kế hoạch đọc truy vấn hằng tuần'],
  checksSrc: ['gaStructure', 'gaMatch'],
  faq: [
    ['Học xong có thi được chứng chỉ Google không?', 'Chứng nhận Google Ads do Google cấp trên Skillshop, là chương trình riêng. Khóa học giúp hiểu thực hành; học viên tự đăng ký thi.'],
    ['Có dạy chiến dịch Performance Max, video không?', 'Khóa tập trung chiến dịch tìm kiếm; các loại khác có thể thêm theo nhu cầu.'],
    ['Không có tài khoản thì học thế nào?', 'Dùng tình huống và ảnh chụp mô phỏng; bài dựng trên tài khoản thử khi có.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['gaCert', 'skillshop'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Cấu trúc chiến dịch', 'Đọc được mọi tài khoản.', '#dinh-dang', 'layers'], ['Bộ từ khóa', 'Theo ý định, có phủ định.', '#muc-tieu', 'search'],
    ['Thói quen đọc truy vấn', 'Mỗi tuần.', '#do-luong', 'list']],
  sisters: sisters('ga4-tracking', 'facebook-ads', 'website-marketing')
});

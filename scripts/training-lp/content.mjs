// Đào tạo Content Marketing (TRAINING_LP_PLAN.md).
import {course} from './course.mjs';
import {syllabus, contentBrief, lesson, calendar, exercise, rubric, feedback, keywordGroups, promptCard} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['users', 'Chân dung người đọc', 'Chân dung một trang'], ['search', 'Chủ đề từ câu hỏi', 'Danh sách chủ đề'],
  ['file', 'Brief nội dung', 'Brief hoàn chỉnh'], ['page', 'Viết và biên tập', 'Bản nội dung'], ['check', 'Tự đánh giá', 'Phiếu tự kiểm']];

export default course({
  slug: 'content-marketing', channel: 'eduContent', name: 'Content Marketing',
  docName: 'tài liệu Google Search Central',
  metaTitle: 'Đào tạo Content Marketing: chân dung, chủ đề, brief, viết và tự đánh giá',
  metaDescription: 'Khóa Content Marketing thực hành: xác định người đọc, chọn chủ đề từ câu hỏi thật, viết brief, viết và biên tập, tự đánh giá theo tiêu chí nội dung hữu ích.',
  sub: 'Viết từ <em>brief</em> và <em>câu hỏi thật</em> của khách.',
  lead: 'Học viên viết bài nhưng chưa có brief và mục tiêu nội dung. Khóa đi từ chân dung người đọc, chủ đề từ câu hỏi thật, brief, '
    + 'viết và biên tập tới tự đánh giá. Bài viết phải trả lời nhu cầu và có thông tin được kiểm chứng.',
  rungs: [['users', 'Người đọc', 'Ai, cần gì'], ['search', 'Chủ đề', 'Từ câu hỏi thật'], ['file', 'Brief', 'Trước khi viết'],
    ['page', 'Viết', 'Có bằng chứng'], ['check', 'Tự đánh giá', 'Theo tiêu chí']],
  tool: 'Công cụ soạn thảo, tài liệu sản phẩm',
  who: {
    title: 'Cho người viết nội dung cho website, mạng xã hội, email.',
    lead: 'Hợp với người viết nội dung, biên tập viên, nhân sự marketing kiêm viết.',
    journey: [['users', 'Hiểu người đọc'], ['search', 'Chọn chủ đề'], ['file', 'Viết brief'], ['page', 'Viết bản nháp'], ['check', 'Tự đánh giá, chỉnh']],
    inputs: [['users', 'Câu hỏi của khách'], ['file', 'Tài liệu sản phẩm'], ['image', 'Ảnh, dự án được phép'], ['users', 'Người duyệt']],
    outputs: [['file', 'Mẫu brief'], ['list', 'Danh sách chủ đề'], ['page', 'Bản nội dung đạt']],
    fit: ['Viết đều nhưng không rõ viết để làm gì', 'Nội dung nói về mình nhiều hơn về khách', 'Cần thống nhất cách brief trong nhóm', 'Nhiều người viết, chất lượng không đều'],
    notFit: ['Chỉ cần viết quảng cáo ngắn: học theo kênh', 'Không có người duyệt thông tin', 'Muốn sản xuất số lượng lớn bằng máy', 'Chưa rõ sản phẩm, khách hàng'],
    src: ['helpful']
  },
  modules: {
    title: 'Năm chủ đề, từ người đọc tới bản đạt.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 2), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm.'},
      {key: 'topics', label: 'Chủ đề từ câu hỏi', icon: 'search', stage: () => keywordGroups(1), tag: 'BÀI MẪU',
        where: 'Khách đang hỏi gì.', what: 'Gom câu hỏi từ tư vấn, bình luận, tìm kiếm thành chủ đề.'},
      {key: 'brief', label: 'Brief nội dung', icon: 'file', stage: () => contentBrief(), tag: 'BÀI MẪU',
        where: 'Viết cho ai, để làm gì.', what: 'Người đọc, câu hỏi, ý chính, bằng chứng, hành động tiếp theo.'},
      {key: 'write', label: 'Viết và biên tập', icon: 'page', stage: () => lesson('Viết và biên tập', ['Mở bài trả lời ngay', 'Thân bài có bằng chứng', 'Kết một hành động', 'Soát thông tin'], 1), tag: 'MÀN HÌNH HỌC',
        where: 'Bản nháp đến bản đạt.', what: 'Mở bài trả lời ngay, thân bài có bằng chứng, soát thông tin với nguồn.',
        more: [['Theo', 'Google khuyên viết vì người đọc, thể hiện kinh nghiệm và độ tin cậy.']]},
      {key: 'plan', label: 'Lịch nội dung', icon: 'calendar', stage: () => calendar(2), tag: 'BÀI MẪU',
        where: 'Nhịp xuất bản và người duyệt.', what: 'Mỗi dòng lịch có brief, trạng thái, người chịu trách nhiệm.'}
    ],
    src: ['helpful']
  },
  prep: {
    principle: 'Không viết khi chưa có brief. Mọi thông tin về sản phẩm đối chiếu được với tài liệu doanh nghiệp.',
    boardLabel: 'BRIEF NỘI DUNG',
    boards: [() => contentBrief()],
    tiles: [['users', 'Câu hỏi của khách', 'Từ tư vấn, bình luận'], ['file', 'Tài liệu sản phẩm', 'Thông số, chính sách'],
      ['image', 'Ảnh, dự án', 'Được phép dùng'], ['check', 'Người duyệt', 'Thông tin và giọng văn']],
    specs: [['Nội dung', 'Hữu ích, đáng tin, vì người đọc', 'Tài liệu nội dung hữu ích của Google Search Central.'],
      ['AI hỗ trợ', 'Chất lượng quan trọng hơn cách tạo', 'Hướng dẫn về nội dung tạo bằng AI của Google.'],
      ['Tự đánh giá', 'Bộ câu hỏi tự kiểm', 'Học viên tự chấm bài trước khi nộp.']],
    src: ['helpful', 'aiContent']
  },
  practice: {
    title: 'Viết một bài từ brief tới bản đạt.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#f3c79a', label: 'Bài viết từ brief', icon: 'form', stage: () => exercise({
        title: 'Bài "Chọn quà Tết cho 100 nhân viên"', brief: 'Viết brief rồi viết bài 800–1.000 chữ cho phòng nhân sự chọn quà Tết.',
        data: 'Tài liệu sản phẩm, 20 câu hỏi khách (mẫu), ảnh được phép', criteria: ['Trả lời đúng câu hỏi người đọc', 'Thông tin kiểm chứng được', 'Kết bằng một hành động']}),
        facts: [['Nộp', 'Brief và bản nội dung.'], ['Vì sao', 'Brief quyết định chất lượng bài.']]},
      {key: 'ai', group: 'Bài tập', groupColor: '#f3c79a', label: 'Dùng AI có kiểm chứng', icon: 'spark', stage: () => promptCard(),
        facts: [['Làm', 'Dùng AI viết nháp, đánh dấu câu cần kiểm chứng.'], ['Học được', 'AI hỗ trợ, người viết chịu trách nhiệm.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Trả lời đúng nhu cầu', 2], ['Có bằng chứng', 1], ['Thông tin đúng nguồn', 1], ['Rõ, dễ đọc', 1]], 1),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Mở bài: lịch sử thương hiệu 3 đoạn', 1], ['"Nến tốt nhất thị trường"', 2], ['Không có hành động cuối bài', 3]],
        [['Người đọc cần câu trả lời trước; đưa lịch sử xuống cuối.', 'warn'], ['Khẳng định không có bằng chứng; bỏ hoặc dẫn nguồn.', 'bad'], ['Thêm một hành động: tải bảng giá.', 'warn']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['helpful', 'genAi']
  },
  eval: [['Viết được brief đủ phần', '11', 'Bài kiểm tra ngắn.'], ['Bài viết đạt tiêu chí', '9', 'Theo bảng chấm.'], ['Nhóm dùng chung mẫu brief', '8', 'Sau khóa học.']],
  evalSrc: ['helpful'],
  practiceStep: 'Viết brief, viết bài, chữa bài theo tiêu chí.',
  checks: ['Danh sách câu hỏi khách', 'Tài liệu sản phẩm đã duyệt', 'Ảnh được phép dùng', 'Mẫu brief thống nhất',
    'Tiêu chí chấm công bố trước', 'Buổi chữa bài', 'Quy tắc dùng AI có kiểm chứng', 'Người duyệt thông tin'],
  checksSrc: ['helpful', 'genAi'],
  faq: [
    ['Có dạy viết quảng cáo không?', 'Có phần viết ngắn cho mạng xã hội; quảng cáo chuyên sâu nằm ở khóa theo kênh.'],
    ['Dùng AI viết có bị phạt không?', 'Google đánh giá chất lượng, không phải cách tạo. Nội dung sinh ra để thao túng thứ hạng thì vi phạm chính sách.'],
    ['Viết bao nhiêu bài một tháng?', 'Tùy nguồn lực; khóa học giúp chọn chủ đề đáng viết, không đặt chỉ tiêu số bài.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['aiContent', 'helpful'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Mẫu brief', 'Dùng chung cả nhóm.', '#dinh-dang', 'file'], ['Danh sách chủ đề', 'Từ câu hỏi thật.', '#dinh-dang', 'search'],
    ['Bản nội dung đạt', 'Có bằng chứng.', '#muc-tieu', 'page']],
  sisters: sisters('social-media-marketing', 'seo', 'ai-marketing')
});

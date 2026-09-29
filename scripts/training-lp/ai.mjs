// Đào tạo AI Marketing (TRAINING_LP_PLAN.md). Google Search Central's
// guidance on AI-generated content as the reference for publishing.
import {course} from './course.mjs';
import {syllabus, promptCard, contentBrief, lesson, exercise, rubric, feedback, hypothesis} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['target', 'Chọn tác vụ phù hợp', 'Bảng tác vụ'], ['spark', 'Yêu cầu có nguồn', 'Bộ yêu cầu mẫu'],
  ['check', 'Kiểm chứng bản nháp', 'Bảng kiểm'], ['users', 'Duyệt đầu ra', 'Quy trình duyệt'], ['shield', 'Dữ liệu và quyền', 'Quy tắc nội bộ']];

export default course({
  slug: 'ai-marketing', channel: 'eduAi', name: 'AI Marketing',
  docName: 'tài liệu Google Search Central',
  metaTitle: 'Đào tạo AI Marketing: chọn tác vụ, yêu cầu có nguồn, kiểm chứng, duyệt đầu ra',
  metaDescription: 'Khóa AI Marketing thực hành: chọn tác vụ phù hợp, viết yêu cầu có nguồn, kiểm chứng bản nháp và duyệt đầu ra; biết thông tin nào từ nguồn và điểm nào cần kiểm tra.',
  sub: 'Dùng AI nhanh hơn mà <em>vẫn kiểm soát được độ đúng</em>.',
  lead: 'Học viên dùng AI nhưng khó kiểm soát độ đúng của đầu ra. Khóa đi từ chọn tác vụ phù hợp, viết yêu cầu có nguồn, kiểm chứng bản nháp tới duyệt đầu ra; '
    + 'bài làm chỉ rõ thông tin nào từ nguồn và điểm nào cần kiểm tra thêm.',
  rungs: [['target', 'Tác vụ', 'Việc nào hợp AI'], ['spark', 'Yêu cầu', 'Có nguồn, có giới hạn'], ['check', 'Kiểm chứng', 'Từng khẳng định'],
    ['users', 'Duyệt', 'Người chịu trách nhiệm'], ['shield', 'Dữ liệu', 'Không đưa dữ liệu nhạy cảm']],
  tool: 'Công cụ AI doanh nghiệp cho phép dùng',
  who: {
    title: 'Cho người dùng AI trong công việc marketing hằng ngày.',
    lead: 'Hợp với người viết nội dung, nhân sự quảng cáo, trưởng nhóm cần quy tắc dùng AI thống nhất.',
    journey: [['target', 'Chọn tác vụ'], ['spark', 'Viết yêu cầu'], ['file', 'Nhận bản nháp'], ['check', 'Kiểm chứng'], ['users', 'Duyệt, xuất bản']],
    inputs: [['file', 'Tài liệu nguồn đã duyệt'], ['spark', 'Công cụ AI được phép'], ['shield', 'Quy định dữ liệu nội bộ'], ['users', 'Người duyệt']],
    outputs: [['spark', 'Bộ yêu cầu mẫu'], ['check', 'Bảng kiểm chứng'], ['file', 'Quy tắc dùng AI']],
    fit: ['Dùng AI nhưng hay sai thông tin', 'Mỗi người dùng AI một kiểu', 'Cần quy tắc về dữ liệu khi dùng AI', 'Muốn tăng tốc viết nháp, tóm tắt, phân loại'],
    notFit: ['Muốn AI thay hoàn toàn người duyệt', 'Muốn sản xuất nội dung hàng loạt để lên hạng', 'Chưa có tài liệu nguồn', 'Không được phép dùng công cụ AI'],
    src: ['aiContent', 'genAi']
  },
  modules: {
    title: 'Năm chủ đề, từ tác vụ tới quy tắc.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'prompt', label: 'Yêu cầu có nguồn', icon: 'spark', stage: () => promptCard(), tag: 'BÀI MẪU',
        where: 'AI chỉ dùng thông tin được đưa.', what: 'Yêu cầu nêu nguồn, giới hạn, giọng văn; bản nháp đánh dấu câu cần kiểm chứng.'},
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 1), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm.'},
      {key: 'check', label: 'Kiểm chứng', icon: 'check', stage: () => lesson('Kiểm chứng bản nháp', ['Tách từng khẳng định', 'Đối chiếu nguồn', 'Đánh dấu cần kiểm tra', 'Sửa hoặc bỏ'], 2), tag: 'MÀN HÌNH HỌC',
        where: 'Câu nào đúng, câu nào bịa.', what: 'Tách khẳng định, đối chiếu nguồn, sửa hoặc bỏ.'},
      {key: 'brief', label: 'AI trong quy trình nội dung', icon: 'file', stage: () => contentBrief(), tag: 'BÀI MẪU',
        where: 'AI ở bước nào.', what: 'Người viết brief và duyệt; AI hỗ trợ nháp, tóm tắt, biến thể.',
        more: [['Theo', 'Google đánh giá chất lượng nội dung, không phải cách tạo; dùng AI để thao túng thứ hạng vi phạm chính sách.']]},
      {key: 'hyp', label: 'Thử nghiệm biến thể', icon: 'sliders', stage: () => hypothesis(), tag: 'MẪU',
        where: 'Dùng AI tạo phương án để thử.', what: 'Mỗi biến thể một giả thuyết; đo bằng dữ liệu, không bằng cảm giác.'}
    ],
    src: ['aiContent', 'genAi', 'helpful']
  },
  prep: {
    principle: 'Không đưa dữ liệu khách hàng, hợp đồng, thông tin nội bộ nhạy cảm vào công cụ chưa được doanh nghiệp cho phép.',
    boardLabel: 'YÊU CẦU CÓ NGUỒN',
    boards: [() => promptCard()],
    tiles: [['file', 'Tài liệu nguồn', 'Sản phẩm, chính sách'], ['spark', 'Công cụ được phép', 'Theo quy định nội bộ'],
      ['shield', 'Quy định dữ liệu', 'Thông tin nào không đưa vào'], ['users', 'Người duyệt', 'Chịu trách nhiệm đầu ra']],
    specs: [['Nội dung AI', 'Chất lượng hơn cách tạo', 'Hướng dẫn của Google về nội dung tạo bằng AI.'],
      ['Minh bạch', 'Nói rõ khi AI tạo phần lớn nội dung', 'Google khuyên cho người đọc biết cách nội dung được tạo khi phù hợp.'],
      ['Chất lượng', 'Hữu ích, đáng tin', 'Tài liệu nội dung hữu ích của Google.']],
    src: ['aiContent', 'genAi', 'helpful']
  },
  practice: {
    title: 'Viết yêu cầu, kiểm chứng, nộp bản đạt.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#8fe3d6', label: 'Bộ tiêu đề có kiểm chứng', icon: 'form', stage: () => exercise({
        title: 'Tiêu đề trang quà Tết bằng AI', brief: 'Viết yêu cầu có nguồn, lấy 10 tiêu đề, kiểm chứng và chọn 3 tiêu đề đạt.',
        data: 'Bảng sản phẩm, chính sách giao hàng (mẫu)', criteria: ['Yêu cầu nêu nguồn và giới hạn', 'Đánh dấu câu chưa có nguồn', 'Tiêu đề chọn không bịa thông tin']}),
        facts: [['Nộp', 'Yêu cầu, bản nháp có đánh dấu, 3 tiêu đề chọn.'], ['Vì sao', 'Người dùng chịu trách nhiệm đầu ra.']]},
      {key: 'mark', group: 'Bài tập', groupColor: '#8fe3d6', label: 'Đánh dấu thông tin bịa', icon: 'alert', stage: () => promptCard(),
        facts: [['Làm', 'Tìm câu không có trong nguồn.'], ['Học được', 'AI có thể viết trôi chảy mà sai.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Yêu cầu có nguồn', 2], ['Kiểm chứng đủ', 1], ['Không dữ liệu nhạy cảm', 2], ['Đầu ra dùng được', 1]], 1),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Yêu cầu: "viết tiêu đề hay cho nến"', 1], ['Dán danh sách 200 khách vào công cụ', 2], ['Chọn tiêu đề "giao toàn quốc 24h"', 3]],
        [['Yêu cầu thiếu nguồn và giới hạn.', 'warn'], ['Không đưa dữ liệu khách vào công cụ chưa được phép.', 'bad'], ['Nguồn không có thông tin này; bỏ.', 'bad']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['genAi', 'aiContent']
  },
  eval: [['Nêu được việc hợp và không hợp AI', '11', 'Câu hỏi tình huống.'], ['Bài kiểm chứng đạt', '9', 'Theo bảng chấm.'], ['Nhóm dùng chung quy tắc AI', '8', 'Sau khóa học.']],
  evalSrc: ['aiContent', 'genAi'],
  practiceStep: 'Viết yêu cầu, kiểm chứng bản nháp, chữa bài.',
  checks: ['Công cụ AI được doanh nghiệp cho phép', 'Quy định dữ liệu đưa vào AI', 'Tài liệu nguồn đã duyệt', 'Tiêu chí chấm công bố trước',
    'Buổi chữa bài kiểm chứng', 'Người duyệt đầu ra', 'Quy tắc nói rõ khi dùng AI', 'Bộ yêu cầu mẫu dùng chung'],
  checksSrc: ['genAi', 'helpful'],
  faq: [
    ['Khóa dùng công cụ AI nào?', 'Công cụ doanh nghiệp được phép dùng; kỹ năng yêu cầu và kiểm chứng áp dụng cho nhiều công cụ.'],
    ['Nội dung AI có bị Google phạt không?', 'Google đánh giá chất lượng, không phải cách tạo; tạo nội dung để thao túng thứ hạng thì vi phạm chính sách spam.'],
    ['Có dạy tạo hình ảnh bằng AI không?', 'Có phần giới thiệu; lưu ý quyền sử dụng và không tạo hình gây hiểu nhầm về sản phẩm thật.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['aiContent', 'genAi'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Bộ yêu cầu mẫu', 'Có nguồn, có giới hạn.', '#dinh-dang', 'spark'], ['Bảng kiểm chứng', 'Từng khẳng định.', '#dinh-dang', 'check'],
    ['Quy tắc dùng AI', 'Cho cả nhóm.', '#chuan-bi', 'shield']],
  sisters: sisters('automation', 'content-marketing', 'dao-tao-doi-ngu-marketing-noi-bo')
});

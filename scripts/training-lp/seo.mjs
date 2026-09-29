// Đào tạo SEO (TRAINING_LP_PLAN.md). Google Search Central as the reference.
import {course} from './course.mjs';
import {syllabus, keywordGroups, seoAudit, sitemap, lesson, exercise, rubric, feedback, vitals} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['search', 'Nhu cầu tìm kiếm', 'Nhóm chủ đề'], ['page', 'Tối ưu trên trang', 'Phiếu rà trang'],
  ['code', 'Kỹ thuật cơ bản', 'Danh sách lỗi có bằng chứng'], ['file', 'Nội dung hữu ích', 'Dàn ý bài viết'], ['chart', 'Theo dõi tiến triển', 'Kế hoạch 3 tháng']];

export default course({
  slug: 'seo', channel: 'eduSeo', name: 'SEO',
  docName: 'tài liệu Google Search Central',
  metaTitle: 'Đào tạo SEO: nhu cầu tìm kiếm, onpage, kỹ thuật, nội dung hữu ích',
  metaDescription: 'Khóa SEO thực hành trên website mẫu: nghiên cứu nhu cầu, rà onpage, kiểm tra kỹ thuật, viết nội dung hữu ích và theo dõi tiến triển. Mỗi phát hiện có bằng chứng và hướng sửa.',
  sub: 'Biết <em>ưu tiên</em> việc kỹ thuật và nội dung trên website.',
  lead: 'Học viên cần biết ưu tiên kỹ thuật và nội dung trên website thay vì liệt kê từ khóa. Khóa đi từ nhu cầu tìm kiếm, onpage, kỹ thuật cơ bản, '
    + 'nội dung hữu ích tới theo dõi tiến triển. Mỗi phát hiện có bằng chứng và hướng sửa.',
  rungs: [['search', 'Nhu cầu', 'Người tìm gì'], ['page', 'Onpage', 'Tiêu đề, cấu trúc'], ['code', 'Kỹ thuật', 'Thu thập, lập chỉ mục'],
    ['file', 'Nội dung', 'Hữu ích, đáng tin'], ['chart', 'Theo dõi', 'Thay đổi theo thời gian']],
  tool: 'Website mẫu, Search Console (nếu có)',
  who: {
    title: 'Cho người phụ trách website hoặc viết nội dung.',
    lead: 'Hợp với người quản trị website, người viết bài, nhân sự marketing cần đọc báo cáo SEO của đối tác.',
    journey: [['search', 'Nghiên cứu nhu cầu'], ['page', 'Rà onpage'], ['code', 'Kiểm tra kỹ thuật'], ['file', 'Viết nội dung'], ['chart', 'Theo dõi']],
    inputs: [['globe', 'Website'], ['search', 'Sản phẩm, dịch vụ'], ['chart', 'Search Console (nếu có)'], ['users', 'Câu hỏi khách hay hỏi']],
    outputs: [['search', 'Nhóm chủ đề'], ['list', 'Danh sách việc ưu tiên'], ['file', 'Dàn ý nội dung']],
    fit: ['Tự quản lý website và muốn tự làm SEO cơ bản', 'Viết bài nhưng không rõ viết gì', 'Cần đọc được báo cáo SEO của đối tác', 'Website mới cần nền tảng đúng'],
    notFit: ['Muốn thủ thuật lên hạng nhanh', 'Không có quyền sửa website', 'Chỉ muốn danh sách từ khóa', 'Chưa có nội dung, sản phẩm rõ'],
    src: ['seo', 'essentials']
  },
  modules: {
    title: 'Năm chủ đề, mỗi chủ đề một bài làm.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'kw', label: 'Nhu cầu tìm kiếm', icon: 'search', stage: () => keywordGroups(0), tag: 'BÀI MẪU',
        where: 'Người tìm gì, ở bước nào.', what: 'Nhóm chủ đề theo ý định, ghép với trang phù hợp.'},
      {key: 'map', label: 'Cấu trúc website', icon: 'layers', stage: () => sitemap(1), tag: 'BÀI MẪU',
        where: 'Trang nào trả lời chủ đề nào.', what: 'Sơ đồ trang, liên kết nội bộ, sơ đồ trang XML.'},
      {key: 'audit', label: 'Rà soát có bằng chứng', icon: 'list', stage: () => seoAudit(1), tag: 'BÀI MẪU',
        where: 'Lỗi nào ưu tiên trước.', what: 'Mỗi phát hiện có mức ưu tiên, bằng chứng và hướng sửa.'},
      {key: 'content', label: 'Nội dung hữu ích', icon: 'file', stage: () => lesson('Nội dung hữu ích', ['Người đọc là ai', 'Câu hỏi của họ', 'Trả lời có bằng chứng', 'Tự đánh giá'], 2), tag: 'MÀN HÌNH HỌC',
        where: 'Viết cho người đọc trước.', what: 'Dàn ý trả lời câu hỏi thật, có kinh nghiệm và nguồn.',
        more: [['Theo', 'Google ưu tiên nội dung hữu ích, đáng tin, viết vì người đọc.']]},
      {key: 'speed', label: 'Trải nghiệm trang', icon: 'bolt', stage: () => vitals('before'), tag: 'SỐ MẪU',
        where: 'Trang có dùng tốt trên điện thoại.', what: 'Đọc Core Web Vitals, nhận ra vấn đề cần chuyển cho kỹ thuật.'}
    ],
    src: ['seo', 'helpful', 'vitals']
  },
  prep: {
    principle: 'Học trên một website thật (của doanh nghiệp hoặc mẫu). Mọi phát hiện phải có bằng chứng từ chính website đó.',
    boardLabel: 'RÀ SOÁT MẪU',
    boards: [() => seoAudit(0)],
    tiles: [['globe', 'Website', 'Quyền xem, sửa'], ['chart', 'Search Console', 'Nếu đã có'],
      ['users', 'Câu hỏi của khách', 'Từ tư vấn, bình luận'], ['search', 'Sản phẩm, dịch vụ', 'Danh sách ưu tiên']],
    specs: [['Nền tảng', 'SEO Starter Guide', 'Hướng dẫn cơ bản của Google Search Central.'],
      ['Nội dung', 'Hữu ích, đáng tin, vì người đọc', 'Tài liệu nội dung hữu ích của Google.'],
      ['Chính sách', 'Google Search Essentials', 'Yêu cầu kỹ thuật và chính sách chống spam.']],
    src: ['seo', 'helpful', 'essentials']
  },
  practice: {
    title: 'Rà một website và lập kế hoạch 3 tháng.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#a6e3b8', label: 'Rà soát website', icon: 'form', stage: () => exercise({
        title: 'Rà soát SEO website Nhà Thơm', brief: 'Tìm 10 vấn đề quan trọng nhất, xếp ưu tiên, ghi bằng chứng và hướng sửa.',
        data: 'Website mẫu, danh sách trang, dữ liệu tìm kiếm mẫu', criteria: ['Mỗi vấn đề có bằng chứng', 'Ưu tiên theo ảnh hưởng', 'Có hướng sửa làm được']}),
        facts: [['Nộp', 'Bảng phát hiện và kế hoạch 3 tháng.'], ['Vì sao', 'Học cách ưu tiên, không liệt kê.']]},
      {key: 'outline', group: 'Bài tập', groupColor: '#a6e3b8', label: 'Dàn ý bài viết', icon: 'file', stage: () => keywordGroups(1),
        facts: [['Làm', 'Chọn một câu hỏi, viết dàn ý trả lời.'], ['Học được', 'Viết theo nhu cầu, không nhồi từ khóa.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Có bằng chứng', 2], ['Ưu tiên hợp lý', 1], ['Hướng sửa khả thi', 1], ['Nội dung vì người đọc', 0]], 3),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Cần thêm 50 từ khóa vào trang chủ', 1], ['Website chậm', 2], ['Viết 30 bài mỗi tháng', 3]],
        [['Nhồi từ khóa không giúp người đọc; ghép từ khóa với đúng trang.', 'bad'], ['Chậm ở trang nào, đo thế nào? Cần bằng chứng.', 'warn'], ['Số bài không quan trọng bằng bài trả lời đúng câu hỏi.', 'warn']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['helpful', 'essentials']
  },
  eval: [['Phân biệt việc kỹ thuật và nội dung', '10', 'Câu hỏi tình huống.'], ['Bảng rà soát đạt', '9', 'Theo bảng chấm.'], ['Sửa được 3 lỗi đầu', '7', 'Trong 30 ngày.']],
  evalSrc: ['seo', 'helpful'],
  practiceStep: 'Rà website theo từng phần, ghi bằng chứng, chữa bài.',
  checks: ['Website để thực hành', 'Quyền xem Search Console (nếu có)', 'Danh sách câu hỏi khách', 'Tiêu chí chấm công bố trước',
    'Buổi chữa bảng rà soát', 'Mỗi phát hiện có bằng chứng', 'Kế hoạch 3 tháng có người làm', 'Không dạy thủ thuật trái chính sách'],
  checksSrc: ['essentials', 'seo'],
  faq: [
    ['Học xong có lên top ngay không?', 'Không có cam kết thứ hạng. Khóa dạy cách làm đúng và ưu tiên việc có ảnh hưởng.'],
    ['Có dạy xây liên kết không?', 'Có phần đánh giá liên kết theo chính sách của Google; không dạy mua bán liên kết.'],
    ['AI viết bài SEO được không?', 'Google đánh giá chất lượng nội dung, không phải cách tạo; nội dung tạo để thao túng thứ hạng vi phạm chính sách.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['essentials', 'aiContent'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Nhóm chủ đề', 'Theo ý định tìm kiếm.', '#dinh-dang', 'search'], ['Bảng rà soát', 'Có bằng chứng, có ưu tiên.', '#muc-tieu', 'list'],
    ['Dàn ý nội dung', 'Vì người đọc.', '#muc-tieu', 'file']],
  sisters: sisters('content-marketing', 'website-marketing', 'ai-marketing')
});

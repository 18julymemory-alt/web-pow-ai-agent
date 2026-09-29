// Đào tạo Social Media Marketing (TRAINING_LP_PLAN.md).
import {course} from './course.mjs';
import {syllabus, calendar, contentBrief, fb, storyboard, exercise, rubric, feedback, lesson} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['route', 'Vai trò từng kênh', 'Kế hoạch kênh'], ['calendar', 'Lịch nội dung', 'Lịch một tháng'],
  ['image', 'Sản xuất bản mẫu', 'Ba bài mẫu'], ['chat', 'Tình huống cộng đồng', 'Kịch bản phản hồi'], ['chart', 'Đọc báo cáo', 'Nhận xét tháng']];

export default course({
  slug: 'social-media-marketing', channel: 'eduSocial', name: 'Social Media Marketing',
  docName: 'tài liệu Meta Blueprint và TikTok Academy',
  metaTitle: 'Đào tạo Social Media Marketing: kế hoạch kênh, lịch nội dung, phản hồi, báo cáo',
  metaDescription: 'Khóa Social Media thực hành: lập kế hoạch kênh, lịch nội dung, sản xuất bản mẫu, xử lý tình huống cộng đồng và đọc báo cáo; phân biệt đăng bài, chăm sóc và quảng cáo.',
  sub: 'Vận hành <em>lịch nội dung</em> và <em>phản hồi</em> theo từng kênh.',
  lead: 'Học viên cần vận hành lịch nội dung và phản hồi theo kênh. Khóa đi từ kế hoạch kênh, lịch nội dung, sản xuất bản mẫu, '
    + 'tình huống cộng đồng tới đọc báo cáo; phân biệt rõ đăng bài, chăm sóc khách và chạy quảng cáo.',
  rungs: [['route', 'Kế hoạch kênh', 'Mỗi kênh một vai'], ['calendar', 'Lịch', 'Có người duyệt'], ['image', 'Bản mẫu', 'Ảnh, video, chữ'],
    ['chat', 'Phản hồi', 'Kịch bản tình huống'], ['chart', 'Báo cáo', 'Đọc đúng chỉ số']],
  tool: 'Trang, kênh của doanh nghiệp (quyền phù hợp)',
  who: {
    title: 'Cho người vận hành fanpage, kênh video, cộng đồng.',
    lead: 'Hợp với quản trị kênh, người làm nội dung mạng xã hội, nhân viên trực tin nhắn và bình luận.',
    journey: [['route', 'Lập kế hoạch kênh'], ['calendar', 'Lên lịch'], ['image', 'Sản xuất'], ['chat', 'Phản hồi'], ['chart', 'Đọc báo cáo']],
    inputs: [['globe', 'Kênh đang có'], ['users', 'Câu hỏi, bình luận hay gặp'], ['image', 'Tài nguyên hình ảnh'], ['users', 'Người duyệt']],
    outputs: [['calendar', 'Lịch một tháng'], ['chat', 'Kịch bản phản hồi'], ['chart', 'Mẫu báo cáo tháng']],
    fit: ['Đăng bài không đều, không có lịch', 'Bình luận, tin nhắn bị bỏ sót', 'Chưa rõ đăng gì ở kênh nào', 'Nhiều người cùng quản trị kênh'],
    notFit: ['Chỉ cần chạy quảng cáo: học Facebook Ads, TikTok Ads', 'Không có người trực phản hồi', 'Muốn tăng lượt theo dõi bằng mọi cách', 'Chưa có tài nguyên hình ảnh'],
    src: ['blueprint', 'ttAcademy']
  },
  modules: {
    title: 'Năm chủ đề, từ kế hoạch tới báo cáo.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'cal', label: 'Lịch nội dung', icon: 'calendar', stage: () => calendar(3), tag: 'BÀI MẪU',
        where: 'Tuần này đăng gì, ai duyệt.', what: 'Lịch có chủ đề, định dạng, trạng thái duyệt, ngày trực.'},
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 1), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm.'},
      {key: 'post', label: 'Bài đăng mẫu', icon: 'image', stage: () => fb('fb-feed-img'), tag: 'MÔ PHỎNG',
        where: 'Bài trên bảng tin.', what: 'Một ý chính, ảnh thật, một hành động; soát thông tin trước khi đăng.'},
      {key: 'video', label: 'Video ngắn', icon: 'video', stage: () => storyboard(2), tag: 'BÀI MẪU',
        where: 'Kênh video ngắn.', what: 'Kịch bản bốn nhịp, phụ đề đọc được trên điện thoại.'},
      {key: 'reply', label: 'Tình huống cộng đồng', icon: 'chat', stage: () => lesson('Phản hồi bình luận', ['Phân loại bình luận', 'Trả lời theo kịch bản', 'Chuyển tư vấn', 'Ghi nhận'], 1), tag: 'MÀN HÌNH HỌC',
        where: 'Hỏi giá, khen, chê, khiếu nại.', what: 'Phân loại, kịch bản phản hồi, khi nào chuyển người phụ trách.'}
    ],
    src: ['blueprint', 'ttAcademy']
  },
  prep: {
    principle: 'Tách ba việc: đăng bài, chăm sóc khách, chạy quảng cáo. Mỗi việc có người phụ trách và chỉ số riêng.',
    boardLabel: 'LỊCH NỘI DUNG',
    boards: [() => calendar(2)],
    tiles: [['globe', 'Kênh đang có', 'Quyền quản trị'], ['chat', 'Bình luận mẫu', 'Hỏi giá, khiếu nại'],
      ['image', 'Tài nguyên', 'Ảnh, video được phép'], ['users', 'Người duyệt', 'Thông tin và giọng']],
    specs: [['Học thêm', 'Meta Blueprint', 'Khóa học chính thức của Meta về trang và nội dung.'],
      ['Học thêm', 'TikTok Academy', 'Khóa học chính thức của TikTok.'],
      ['Nội dung', 'Brief trước khi sản xuất', 'Mỗi bài có người đọc, ý chính, hành động.']],
    src: ['blueprint', 'metaSuite', 'ttAcademy']
  },
  practice: {
    title: 'Lập lịch một tháng và xử lý tình huống.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#d4b3ff', label: 'Lịch một tháng', icon: 'form', stage: () => exercise({
        title: 'Lịch nội dung tháng 12 cho Nhà Thơm', brief: 'Lập lịch 4 tuần cho fanpage và kênh video, kèm 3 bài mẫu và kịch bản phản hồi.',
        data: 'Chủ đề sản phẩm, bình luận mẫu, ảnh được phép', criteria: ['Mỗi kênh một vai trò', 'Mỗi bài có brief', 'Có lịch trực phản hồi']}),
        facts: [['Nộp', 'Lịch, 3 bài mẫu, kịch bản phản hồi.'], ['Vì sao', 'Kênh cần nhịp và người trực.']]},
      {key: 'brief', group: 'Bài tập', groupColor: '#d4b3ff', label: 'Brief bài đăng', icon: 'file', stage: () => contentBrief(),
        facts: [['Làm', 'Viết brief cho một bài trước khi sản xuất.'], ['Học được', 'Mỗi bài có mục đích.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Vai trò kênh rõ', 2], ['Lịch có người duyệt', 1], ['Phản hồi đúng kịch bản', 1], ['Đọc báo cáo đúng', 0]], 3),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Đăng 3 bài/ngày mọi kênh giống nhau', 1], ['Bình luận chê: xóa', 2], ['Báo cáo: tổng lượt thích', 3]],
        [['Mỗi kênh cách đọc khác nhau; chọn định dạng hợp kênh.', 'warn'], ['Phản hồi theo kịch bản, chuyển người phụ trách khi cần.', 'bad'], ['Đọc thêm tin nhắn, khách hỏi mua.', 'warn']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['blueprint']
  },
  eval: [['Phân biệt đăng bài, chăm sóc, quảng cáo', '11', 'Câu hỏi tình huống.'], ['Lịch tháng đạt tiêu chí', '9', 'Theo bảng chấm.'], ['Chạy lịch và trực phản hồi', '8', 'Tháng đầu sau khóa.']],
  evalSrc: ['blueprint', 'ttAcademy'],
  practiceStep: 'Lập lịch, sản xuất bài mẫu, đóng vai phản hồi, chữa bài.',
  checks: ['Quyền quản trị kênh', 'Bình luận mẫu để đóng vai', 'Tài nguyên hình ảnh được phép', 'Người duyệt nội dung',
    'Tiêu chí chấm công bố trước', 'Buổi chữa lịch', 'Kịch bản phản hồi có người nhận', 'Mẫu báo cáo tháng'],
  checksSrc: ['blueprint'],
  faq: [
    ['Khóa có dạy chạy quảng cáo không?', 'Không đi sâu; phần quảng cáo nằm ở khóa Facebook Ads, TikTok Ads.'],
    ['Có học Zalo không?', 'Có thể thêm theo kênh doanh nghiệp đang dùng.'],
    ['Có dạy livestream không?', 'Không nằm trong khóa chuẩn; thêm được nếu doanh nghiệp bán qua live.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['blueprint', 'ttAcademy'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Lịch nội dung', 'Có người duyệt.', '#dinh-dang', 'calendar'], ['Kịch bản phản hồi', 'Theo tình huống.', '#dinh-dang', 'chat'],
    ['Mẫu báo cáo', 'Đọc đúng chỉ số.', '#do-luong', 'chart']],
  sisters: sisters('content-marketing', 'tiktok-ads', 'facebook-ads')
});

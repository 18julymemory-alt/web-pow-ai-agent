// Per-course hero picture, "what you learn" band and key points for the
// thirteen Đào tạo Digital Marketing pages (TRAINING_LP_PLAN.md). The hero
// shows the subject itself (a search ad, a storyboard, an event stream…) next
// to a lesson on a phone, so the first screen says what is taught and that
// it is a course.
import {scene} from '../website-lp/mocks.mjs';
import {planCanvas, google, keywordGroups, objectiveMap, fb, storyboard, seoAudit, contentBrief, calendar, pageReview, contactForm,
  debugStream, promptCard, workflow, actionPlan, skillMatrix, lessonPhone} from './mocks.mjs';

const BADGE = 'Đào tạo Digital Marketing · Khóa học';
const EYEBROW = 'KHÓA ĐÀO TẠO DIGITAL MARKETING';
const KICKER = 'ĐÀO TẠO DIGITAL MARKETING';
const GET = 'Học xong bạn làm được';
const NOT = 'Khóa học không hứa';
const lessonSide = (t, steps) => lessonPhone(t, steps);

export const X = {
  'digital-marketing-tong-the': {
    scene: () => scene({badge: BADGE, main: planCanvas(2), side: lessonSide('Vai trò kênh', ['Khách hàng', 'Vai trò kênh', 'Nội dung', 'Đo lường']),
      calls: [['Khách hàng & mục tiêu', 'Bắt đầu từ kinh doanh'], ['Vai trò từng kênh', 'Đón, tạo, nhắc nhu cầu'], ['Kế hoạch một trang', 'Bài cuối khóa']]}),
    intro: {q: 'Khóa Digital Marketing tổng thể học gì?',
      a: 'Học cách nối khách hàng, kênh, nội dung, website và dữ liệu thành một kế hoạch có mục tiêu và chỉ số, thay vì học từng kênh rời rạc. '
        + 'Học viên làm bài trên bài toán của chính mình và kết thúc bằng một kế hoạch một trang tự giải thích được.',
      facts: [['Dành cho', 'Người mới, chủ doanh nghiệp, trưởng nhóm'], ['Cách học', 'Học → làm bài → chữa bài'], ['Đầu ra', 'Kế hoạch một trang cho bài toán thật']]},
    essentials: {title: 'Sáu kiến thức nền của Digital Marketing.', lead: 'Những thứ mọi vị trí marketing đều cần hiểu giống nhau.',
      cards: [['users', 'Hành trình khách hàng', 'Biết đến → cân nhắc → mua → quay lại; mỗi bước khách cần một thông tin khác.'],
        ['route', 'Vai trò từng kênh', 'Tìm kiếm đón nhu cầu có sẵn, mạng xã hội và video tạo nhu cầu, nhắc lại giữ khách đã quan tâm.'],
        ['page', 'Nội dung theo nhu cầu', 'Mỗi nội dung trả lời một câu hỏi của khách ở một bước của hành trình.'],
        ['globe', 'Website là nơi chuyển đổi', 'Kênh đưa người tới; trang đích, form, giỏ hàng quyết định có thành khách không.'],
        ['chart', 'Đo lường', 'Chỉ số nền tảng khác dữ liệu kinh doanh; đối chiếu với CRM và đơn hàng thật.'],
        ['wallet', 'Ngân sách thử', 'Phân bổ theo vai trò kênh, giữ một phần để thử, đọc theo tuần.']],
      get: [GET, ['Lập kế hoạch một trang có mục tiêu và chỉ số', 'Giải thích vì sao chọn kênh nào', 'Đọc báo cáo và nhận ra chỉ số sai mục tiêu',
        'Đánh giá một trang đích', 'Viết hướng nội dung cho từng bước khách hàng']],
      not: [NOT, ['Tăng doanh số ngay trong khóa', 'Thao tác sâu từng công cụ (có khóa riêng)', 'Chứng nhận của nền tảng']],
      src: ['gaStructure', 'metaObjective', 'gaAbout']}
  },
  'google-ads': {
    scene: () => scene({badge: BADGE, main: google('search-text'), side: lessonSide('Đọc truy vấn', ['Lọc truy vấn', 'Đánh dấu', 'Thêm phủ định', 'Ghi lý do']),
      calls: [['Cấu trúc tài khoản', 'Tài khoản → chiến dịch → nhóm'], ['Từ khóa theo ý định', 'Đối sánh, phủ định'], ['Quảng cáo khớp trang', 'Đọc truy vấn, kết quả']]}),
    intro: {q: 'Khóa Google Ads học gì?',
      a: 'Học dựng và kiểm tra chiến dịch quảng cáo tìm kiếm trên Google: cấu trúc tài khoản, từ khóa theo ý định, loại đối sánh, viết quảng cáo khớp trang đích, '
        + 'đọc truy vấn tìm kiếm và kết quả. Bài tập làm ở trạng thái tạm dừng, không tự bật chi tiêu.',
      facts: [['Dành cho', 'Người chạy hoặc kiểm tra tài khoản'], ['Thực hành', 'Chiến dịch mẫu, danh sách truy vấn'], ['Học thêm', 'Google Skillshop (chính thức)']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của Google Ads.', lead: 'Theo tài liệu trợ giúp chính thức của Google Ads.',
      cards: [['layers', 'Ba lớp tài khoản', 'Tài khoản → chiến dịch (ngân sách, vị trí) → nhóm quảng cáo (một chủ đề hẹp, từ khóa và quảng cáo liên quan).'],
        ['search', 'Từ khóa & loại đối sánh', 'Rộng, cụm từ "…", chính xác […]; từ khóa phủ định −… loại truy vấn không phù hợp.'],
        ['target', 'Ý định tìm kiếm', 'Người gõ "giá", "mua" khác người gõ "là gì"; nhóm từ khóa theo ý định.'],
        ['page', 'Quảng cáo khớp trang đích', 'Tiêu đề, mô tả nói đúng điều trang đích có; không hứa điều trang không chứng minh.'],
        ['list', 'Báo cáo cụm từ tìm kiếm', 'Xem người ta thật sự gõ gì; thêm phủ định, tách nhóm khi cần.'],
        ['chart', 'Chuyển đổi & đọc kết quả', 'Đo hành động có giá trị (lead, đơn), đọc cùng dữ liệu kinh doanh, không chỉ tỷ lệ nhấp.']],
      get: [GET, ['Đọc và giải thích cấu trúc một tài khoản', 'Dựng chiến dịch tìm kiếm mẫu', 'Nhóm từ khóa theo ý định, có phủ định',
        'Viết quảng cáo khớp trang đích', 'Đọc truy vấn và kết quả hằng tuần']],
      not: [NOT, ['Chứng nhận Google Ads (do Google cấp trên Skillshop)', 'Kết quả quảng cáo cụ thể', 'Chạy thật khi chưa được cho phép']],
      src: ['gaStructure', 'gaMatch', 'gaCert']}
  },
  'facebook-ads': {
    scene: () => scene({badge: BADGE, main: objectiveMap([['Nhiều người biết thương hiệu', 'Nhận biết', 'Người tiếp cận'],
      ['Khách để lại thông tin', 'Khách hàng tiềm năng', 'Lead phù hợp'], ['Khách mua hàng', 'Doanh số', 'Đơn, doanh thu']], 1), side: fb('fb-feed-img'),
    calls: [['Mục tiêu đúng', 'Theo mục tiêu kinh doanh'], ['Nội dung theo mục tiêu', 'Một lời hứa, một hành động'], ['Chất lượng lead', 'Chấm bằng CRM']]}),
    intro: {q: 'Khóa Facebook Ads học gì?',
      a: 'Học chạy quảng cáo trên Facebook và Instagram bằng Trình quản lý quảng cáo Meta: chọn mục tiêu theo mục tiêu kinh doanh, mô tả nhóm khách, viết nội dung theo mục tiêu, '
        + 'kiểm tra điểm đến và đánh giá chất lượng lead — phân biệt lượt tương tác với khách tư vấn được.',
      facts: [['Dành cho', 'Người chạy, viết, duyệt quảng cáo'], ['Thực hành', 'Chiến dịch lead mẫu, CRM mẫu'], ['Học thêm', 'Meta Blueprint (chính thức)']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của Facebook Ads.', lead: 'Theo Trung tâm trợ giúp doanh nghiệp của Meta.',
      cards: [['target', 'Sáu mục tiêu quảng cáo', 'Nhận biết, lưu lượng truy cập, lượt tương tác, khách hàng tiềm năng, quảng bá ứng dụng, doanh số.'],
        ['layers', 'Ba cấp trong Ads Manager', 'Chiến dịch (mục tiêu) → nhóm quảng cáo (đối tượng, vị trí, ngân sách) → quảng cáo (nội dung).'],
        ['users', 'Đối tượng', 'Mô tả nhóm khách rõ ràng; để hệ thống tìm người trong phạm vi hợp lý.'],
        ['image', 'Nội dung & vị trí', 'Bảng tin, tin, thước phim trên Facebook và Instagram; mỗi vị trí một khung hình.'],
        ['route', 'Điểm đến', 'Form tức thì, tin nhắn, website: kiểm tra có người nhận và câu hỏi phân loại.'],
        ['chart', 'Chất lượng lead', 'Đối chiếu lead với CRM theo nguồn; không đánh giá bằng lượt thích, bình luận.']],
      get: [GET, ['Chọn đúng mục tiêu cho từng chiến dịch', 'Mô tả nhóm khách và chọn vị trí', 'Viết nội dung theo mục tiêu',
        'Kiểm tra điểm đến trước khi chạy', 'Chấm chất lượng lead bằng CRM']],
      not: [NOT, ['Chứng nhận Meta (kỳ thi riêng của Meta)', 'Cách lách chính sách quảng cáo', 'Kết quả quảng cáo cụ thể']],
      src: ['metaObjective', 'metaLevels', 'blueprint']}
  },
  'tiktok-ads': {
    scene: () => scene({badge: BADGE, main: storyboard(0), side: lessonSide('Mở đầu video', ['Câu hỏi đúng nhu cầu', 'Demo', 'Bằng chứng', 'Một hành động']),
      calls: [['Mở đầu video', 'Nói ngay điều khách quan tâm'], ['Mục tiêu chiến dịch', 'Nhận biết → chuyển đổi'], ['Pixel & sự kiện', 'Xem khác mua']]}),
    intro: {q: 'Khóa TikTok Ads học gì?',
      a: 'Học nối video ngắn với mục tiêu và điểm đến trên TikTok Ads Manager: viết mở đầu video, chọn hướng chiến dịch, rà trang đích và đặt sự kiện đo hành động bằng TikTok Pixel. '
        + 'Bài thực hành phân biệt lượt xem với chuyển đổi và kiểm tra quyền nhạc, hình.',
      facts: [['Dành cho', 'Người làm video, chạy quảng cáo, chủ shop'], ['Thực hành', 'Kịch bản, chiến dịch mẫu, thử sự kiện'], ['Học thêm', 'TikTok Academy (chính thức)']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của TikTok Ads.', lead: 'Theo trung tâm trợ giúp TikTok Ads Manager.',
      cards: [['target', 'Ba nhóm mục tiêu', 'Nhận biết (tiếp cận), cân nhắc (lưu lượng, lượt xem video), chuyển đổi (hành động trên website, ứng dụng).'],
        ['video', 'Mở đầu quyết định', 'Vài giây đầu nói điều khách quan tâm; logo và nhạc không giữ được người xem.'],
        ['mobile', 'Video dọc, có phụ đề', 'Chữ trên video, lời thoại, phụ đề nói cùng một thông điệp, đọc được trên điện thoại.'],
        ['shield', 'Quyền nội dung', 'Nhạc, hình, người xuất hiện phải được phép; kiểm tra trước khi đăng.'],
        ['bolt', 'Pixel & sự kiện chuẩn', 'Ghi hành động trên website theo hành trình: xem sản phẩm, thêm giỏ, mua.'],
        ['chart', 'Xem khác chuyển đổi', 'Nhiều lượt xem chưa phải nhiều khách; đọc sự kiện trên website.']],
      get: [GET, ['Viết kịch bản video bốn nhịp', 'Chọn mục tiêu theo việc muốn khách làm', 'Rà trang đích khớp video',
        'Lập danh sách sự kiện cần đo', 'Đọc kết quả từ xem tới hành động']],
      not: [NOT, ['Quay dựng video chuyên sâu', 'Tăng lượt theo dõi nhanh', 'Kết quả quảng cáo cụ thể']],
      src: ['ttObjective', 'ttPixel', 'ttAcademy']}
  },
  'seo': {
    scene: () => scene({badge: BADGE, main: seoAudit(1), side: lessonSide('Nội dung hữu ích', ['Người đọc là ai', 'Câu hỏi của họ', 'Trả lời có bằng chứng', 'Tự đánh giá']),
      calls: [['Nhu cầu tìm kiếm', 'Người tìm gì'], ['Onpage & kỹ thuật', 'Có bằng chứng, có ưu tiên'], ['Nội dung hữu ích', 'Vì người đọc']]}),
    intro: {q: 'Khóa SEO học gì?',
      a: 'Học giúp website được tìm thấy trên Google một cách bền vững: hiểu cách Google thu thập và hiểu trang, nghiên cứu nhu cầu tìm kiếm, tối ưu trên trang, kiểm tra kỹ thuật cơ bản '
        + 'và viết nội dung hữu ích. Mọi phát hiện phải có bằng chứng và hướng sửa.',
      facts: [['Dành cho', 'Người quản trị website, viết nội dung'], ['Thực hành', 'Rà soát website thật, dàn ý bài'], ['Theo', 'Google Search Central']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của SEO.', lead: 'Theo tài liệu Google Search Central.',
      cards: [['search', 'Google tìm & hiểu trang thế nào', 'Thu thập, lập chỉ mục, xếp hạng; trang phải truy cập được và nói rõ nội dung.'],
        ['target', 'Ý định tìm kiếm', 'Mỗi nhóm truy vấn cần một trang trả lời đúng, không nhồi từ khóa.'],
        ['page', 'Tối ưu trên trang', 'Tiêu đề, mô tả, tiêu đề phụ, liên kết nội bộ, văn bản thay thế cho ảnh.'],
        ['code', 'Kỹ thuật cơ bản', 'Sơ đồ trang, chuyển hướng khi đổi URL, tốc độ và trải nghiệm trên điện thoại.'],
        ['file', 'Nội dung hữu ích, đáng tin', 'Viết vì người đọc, thể hiện kinh nghiệm, chuyên môn, độ tin cậy.'],
        ['shield', 'Search Essentials', 'Yêu cầu kỹ thuật và chính sách chống spam; không mua bán liên kết, không nội dung thao túng thứ hạng.']],
      get: [GET, ['Nhóm chủ đề theo ý định tìm kiếm', 'Rà soát website có bằng chứng và ưu tiên', 'Viết dàn ý nội dung trả lời đúng câu hỏi',
        'Đọc được báo cáo SEO của đối tác', 'Lập kế hoạch SEO 3 tháng']],
      not: [NOT, ['Thứ hạng cụ thể hay lên top nhanh', 'Thủ thuật trái chính sách của Google', 'Lưu lượng tăng ngay sau khóa']],
      src: ['seo', 'helpful', 'essentials']}
  },
  'content-marketing': {
    scene: () => scene({badge: BADGE, main: contentBrief(), side: lessonSide('Viết từ brief', ['Người đọc', 'Câu hỏi', 'Bằng chứng', 'Hành động']),
      calls: [['Brief trước khi viết', 'Ai, để làm gì'], ['Chủ đề từ câu hỏi thật', 'Của khách hàng'], ['Biên tập có bằng chứng', 'Thông tin kiểm chứng']]}),
    intro: {q: 'Khóa Content Marketing học gì?',
      a: 'Học viết nội dung có mục đích: xác định người đọc, chọn chủ đề từ câu hỏi thật của khách, viết brief, viết và biên tập, rồi tự đánh giá theo tiêu chí nội dung hữu ích. '
        + 'Bài viết phải trả lời nhu cầu và có thông tin kiểm chứng được.',
      facts: [['Dành cho', 'Người viết, biên tập, marketing kiêm viết'], ['Thực hành', 'Brief + bài hoàn chỉnh'], ['Theo', 'Google: nội dung hữu ích']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của Content Marketing.', lead: 'Nội dung tốt bắt đầu trước khi viết chữ đầu tiên.',
      cards: [['users', 'Người đọc & câu hỏi', 'Ai đọc, họ đang hỏi gì, ở bước nào của hành trình mua.'],
        ['file', 'Brief', 'Người đọc, câu hỏi, ý chính, bằng chứng, hành động tiếp theo; duyệt trước khi viết.'],
        ['page', 'Cấu trúc trả lời trước', 'Mở bài trả lời ngay; thân bài giải thích và chứng minh; kết một hành động.'],
        ['check', 'Bằng chứng & nguồn', 'Thông số, chính sách, dự án đối chiếu với tài liệu doanh nghiệp.'],
        ['chat', 'Giọng thương hiệu', 'Một bộ quy tắc giọng văn để nhiều người viết vẫn nhất quán.'],
        ['repeat', 'Dùng lại đa kênh', 'Một chủ đề thành bài web, bài mạng xã hội, email, kịch bản video.']],
      get: [GET, ['Viết brief đủ phần cho mọi nội dung', 'Lập danh sách chủ đề từ câu hỏi khách', 'Viết và biên tập bài có bằng chứng',
        'Tự đánh giá bài theo tiêu chí', 'Dùng AI hỗ trợ có kiểm chứng']],
      not: [NOT, ['Số bài hay lượt xem cụ thể', 'Viết thay doanh nghiệp sau khóa', 'Thứ hạng tìm kiếm']],
      src: ['helpful', 'aiContent']}
  },
  'social-media-marketing': {
    scene: () => scene({badge: BADGE, main: calendar(2), side: lessonSide('Phản hồi bình luận', ['Phân loại', 'Trả lời theo kịch bản', 'Chuyển tư vấn', 'Ghi nhận']),
      calls: [['Lịch nội dung', 'Có người duyệt'], ['Phản hồi cộng đồng', 'Theo kịch bản'], ['Báo cáo tháng', 'Đọc đúng chỉ số']]}),
    intro: {q: 'Khóa Social Media Marketing học gì?',
      a: 'Học vận hành kênh mạng xã hội hằng ngày: lập kế hoạch kênh, lịch nội dung, sản xuất bản mẫu, xử lý bình luận và tin nhắn, đọc báo cáo. '
        + 'Phân biệt rõ ba việc hay bị trộn lẫn: đăng bài, chăm sóc khách và chạy quảng cáo.',
      facts: [['Dành cho', 'Quản trị kênh, người làm nội dung, trực tin nhắn'], ['Thực hành', 'Lịch một tháng, kịch bản phản hồi'], ['Học thêm', 'Meta Blueprint, TikTok Academy']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của Social Media.', lead: 'Kênh cần nhịp đều và người trực, không chỉ bài đẹp.',
      cards: [['route', 'Vai trò từng kênh', 'Fanpage, kênh video, nhóm cộng đồng mỗi nơi một vai và một kiểu nội dung.'],
        ['calendar', 'Lịch & duyệt', 'Chủ đề, định dạng, người làm, người duyệt, ngày đăng trong một bảng.'],
        ['image', 'Định dạng theo kênh', 'Ảnh, video ngắn, bài chữ, album; khung hình và độ dài theo kênh.'],
        ['chat', 'Cộng đồng & phản hồi', 'Phân loại bình luận, trả lời theo kịch bản, chuyển người phụ trách khi cần.'],
        ['layers', 'Đăng bài ≠ quảng cáo ≠ chăm sóc', 'Ba việc, ba người phụ trách, ba bộ chỉ số.'],
        ['chart', 'Báo cáo đúng chỉ số', 'Tin nhắn, khách hỏi mua, khách quay lại quan trọng hơn tổng lượt thích.']],
      get: [GET, ['Lập kế hoạch kênh', 'Lập và chạy lịch nội dung', 'Viết brief và bài mẫu', 'Phản hồi theo kịch bản tình huống', 'Làm báo cáo tháng']],
      not: [NOT, ['Tăng lượt theo dõi nhanh', 'Chạy quảng cáo chuyên sâu (có khóa riêng)', 'Nội dung lan truyền']],
      src: ['blueprint', 'ttAcademy']}
  },
  'website-marketing': {
    scene: () => scene({badge: BADGE, main: pageReview(1), side: contactForm('error'),
      calls: [['Thông điệp 5 giây', 'Khách hiểu ngay'], ['Form & hành động', 'Báo lỗi, xác nhận'], ['Kế hoạch đo', 'Gửi thành công']]}),
    intro: {q: 'Khóa Website Marketing học gì?',
      a: 'Học nhìn website bằng mắt khách hàng và theo mục tiêu marketing: thông điệp có rõ không, hành động chính ở đâu, form có dễ điền không, trang có nhanh trên điện thoại không, '
        + 'và đo gì để biết trang hiệu quả. Không cần biết lập trình.',
      facts: [['Dành cho', 'Người phụ trách website, trang đích'], ['Thực hành', 'Phiếu đánh giá trang thật'], ['Theo', 'web.dev, Google Analytics']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của Website Marketing.', lead: 'Website là nơi kênh quảng cáo và nội dung biến thành khách.',
      cards: [['target', 'Thông điệp rõ ngay', 'Khách hiểu bạn bán gì, cho ai trong vài giây đầu.'],
        ['tap', 'Một hành động chính', 'Nút chính ở màn hình đầu; các hướng rẽ không làm loãng mục tiêu.'],
        ['form', 'Form dễ điền', 'Nhãn rõ, báo lỗi tại trường, xác nhận khi gửi xong.'],
        ['bolt', 'Nhanh trên điện thoại', 'Đọc Core Web Vitals, biết khi nào chuyển cho kỹ thuật.'],
        ['route', 'Khớp nguồn truy cập', 'Khách từ quảng cáo, tìm kiếm, mạng xã hội cần trang phù hợp.'],
        ['chart', 'Đo đúng', 'Sự kiện gửi thành công, không phải lượt bấm nút; đọc phễu theo bước.']],
      get: [GET, ['Đánh giá trang theo phiếu', 'Tìm lỗi form và điểm khách dừng', 'Đề xuất việc sửa theo ưu tiên', 'Lập kế hoạch đo cho trang', 'Làm việc với người phụ trách kỹ thuật']],
      not: [NOT, ['Dạy lập trình website', 'Thiết kế lại giao diện', 'Tỷ lệ chuyển đổi cụ thể']],
      src: ['forms', 'vitals', 'gaLead']}
  },
  'ga4-tracking': {
    scene: () => scene({badge: BADGE, main: debugStream(3), side: lessonSide('Thử ghi nhận', ['Bật xem trước', 'Thử gửi form', 'Xem sự kiện', 'Thử trường hợp sai']),
      calls: [['Kế hoạch sự kiện', 'Viết trước khi cài'], ['Thẻ · kích hoạt · biến', 'Tag Manager'], ['Thử trong DebugView', 'Cả đúng và sai']]}),
    intro: {q: 'Khóa GA4 & Tracking học gì?',
      a: 'Học cách một hành động của khách được ghi thành dữ liệu: định nghĩa sự kiện trong Google Analytics 4, cấu hình thẻ và trình kích hoạt trong Google Tag Manager, '
        + 'thử ghi nhận bằng chế độ xem trước và DebugView, rồi đọc báo cáo — kiểm tra cả khi sự kiện không được phép ghi.',
      facts: [['Dành cho', 'Người phụ trách đo lường, chạy quảng cáo'], ['Thực hành', 'Đo form trên trang thử'], ['Theo', 'Google Analytics, Tag Manager Help']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của GA4 & Tracking.', lead: 'Theo tài liệu trợ giúp Google Analytics và Tag Manager.',
      cards: [['bolt', 'Mọi thứ là sự kiện', 'GA4 ghi dữ liệu dưới dạng sự kiện kèm tham số: page_view, form_start, purchase…'],
        ['list', 'Tự động, đề xuất, tùy chỉnh', 'Dùng sự kiện đề xuất (như generate_lead) trước khi tự đặt tên để có sẵn báo cáo.'],
        ['check', 'Sự kiện chính', 'Đánh dấu hành động quan trọng với doanh nghiệp để đọc tỷ lệ chuyển đổi.'],
        ['code', 'Thẻ · trình kích hoạt · biến', 'Thẻ gửi dữ liệu, trình kích hoạt quyết định khi nào, biến giữ giá trị; lớp dữ liệu truyền thông tin.'],
        ['eye', 'Xem trước & DebugView', 'Thử cấu hình trước khi xuất bản; xem sự kiện của một máy thử theo thời gian thực.'],
        ['shield', 'Không thu dữ liệu cá nhân', 'Không gửi tên, số điện thoại, email vào tham số sự kiện.']],
      get: [GET, ['Viết kế hoạch sự kiện cho website', 'Cấu hình thẻ và trình kích hoạt cơ bản', 'Thử và chứng minh sự kiện ghi đúng',
        'Chọn sự kiện chính', 'Đọc phễu và đối chiếu với dữ liệu kinh doanh']],
      not: [NOT, ['Số liệu GA4 khớp tuyệt đối với nền tảng quảng cáo', 'Đo phía máy chủ chuyên sâu', 'Theo dõi cá nhân người dùng']],
      src: ['gaAbout', 'gtm', 'gaDebug']}
  },
  'ai-marketing': {
    scene: () => scene({badge: BADGE, main: promptCard(), side: lessonSide('Kiểm chứng bản nháp', ['Tách khẳng định', 'Đối chiếu nguồn', 'Đánh dấu', 'Sửa hoặc bỏ']),
      calls: [['Yêu cầu có nguồn', 'Và giới hạn'], ['Kiểm chứng', 'Từng khẳng định'], ['Duyệt đầu ra', 'Người chịu trách nhiệm']]}),
    intro: {q: 'Khóa AI Marketing học gì?',
      a: 'Học dùng AI nhanh hơn mà vẫn kiểm soát được độ đúng: chọn tác vụ phù hợp, viết yêu cầu có nguồn và giới hạn, kiểm chứng bản nháp, duyệt đầu ra, '
        + 'và giữ quy tắc dữ liệu khi dùng công cụ AI trong công việc marketing.',
      facts: [['Dành cho', 'Người viết, chạy quảng cáo, trưởng nhóm'], ['Thực hành', 'Yêu cầu, kiểm chứng, bản đạt'], ['Theo', 'Google: nội dung tạo bằng AI']]},
    essentials: {title: 'Sáu kiến thức cốt lõi khi dùng AI trong marketing.', lead: 'AI tăng tốc bản nháp; người dùng chịu trách nhiệm bản cuối.',
      cards: [['target', 'Tác vụ hợp AI', 'Nháp, tóm tắt, phân loại, tạo biến thể; không giao AI khẳng định sự thật hay số liệu chưa có nguồn.'],
        ['spark', 'Yêu cầu có nguồn & giới hạn', 'Đưa tài liệu nguồn, nói rõ không được thêm thông tin ngoài nguồn.'],
        ['check', 'Kiểm chứng', 'Tách từng khẳng định, đối chiếu nguồn, sửa hoặc bỏ câu không có căn cứ.'],
        ['shield', 'Dữ liệu nhạy cảm', 'Không đưa dữ liệu khách hàng, hợp đồng vào công cụ chưa được phép.'],
        ['eye', 'Minh bạch', 'Cho người đọc biết cách nội dung được tạo khi phù hợp.'],
        ['file', 'Chất lượng hơn cách tạo', 'Google đánh giá chất lượng nội dung; tạo nội dung để thao túng thứ hạng là vi phạm chính sách.']],
      get: [GET, ['Chọn đúng việc để dùng AI', 'Viết yêu cầu có nguồn và giới hạn', 'Kiểm chứng và đánh dấu thông tin bịa', 'Duyệt đầu ra trước khi dùng', 'Áp dụng quy tắc dữ liệu nội bộ']],
      not: [NOT, ['AI thay hoàn toàn người duyệt', 'Sản xuất nội dung hàng loạt để lên hạng', 'Một công cụ AI cụ thể phù hợp mọi doanh nghiệp']],
      src: ['aiContent', 'genAi', 'helpful']}
  },
  'automation': {
    scene: () => scene({badge: BADGE, main: workflow(1), side: lessonSide('Luồng có nhánh lỗi', ['Trình kích hoạt', 'Điều kiện', 'Hành động', 'Nhánh lỗi']),
      calls: [['Trình kích hoạt', 'Theo sự kiện hoặc thời gian'], ['Điều kiện', 'Rẽ nhánh khi thiếu dữ liệu'], ['Nhánh lỗi', 'Thử lại, báo người']]}),
    intro: {q: 'Khóa Automation học gì?',
      a: 'Học tự động hóa việc lặp lại trong marketing — chép lead, gửi thông báo, cập nhật bảng tính, CRM — bằng luồng có trình kích hoạt, điều kiện và hành động, '
        + 'kèm nhánh lỗi, chống trùng và nhật ký để luồng không hỏng âm thầm.',
      facts: [['Dành cho', 'Người vận hành marketing, quản lý CRM'], ['Thực hành', 'Luồng lead mới, thử trùng và thiếu'], ['Theo', 'Apps Script: trình kích hoạt']]},
    essentials: {title: 'Sáu kiến thức cốt lõi của tự động hóa.', lead: 'Luồng tốt là luồng biết từ chối dữ liệu sai và báo khi hỏng.',
      cards: [['bolt', 'Trình kích hoạt', 'Theo sự kiện (gửi form, sửa bảng tính) hoặc theo thời gian (mỗi giờ, mỗi ngày).'],
        ['sliders', 'Điều kiện', 'Rẽ nhánh khi thiếu số điện thoại, sai định dạng, không thuộc khu vực phục vụ.'],
        ['repeat', 'Hành động', 'Ghi bảng tính, tạo hồ sơ CRM, gửi thông báo; mỗi bước ghi trạng thái.'],
        ['alert', 'Nhánh lỗi & thử lại', 'Lỗi tạm thời thử lại có giãn cách; lỗi kéo dài báo người phụ trách.'],
        ['users', 'Chống trùng', 'Chạy lại không tạo bản ghi trùng; dùng khóa gộp.'],
        ['list', 'Nhật ký & người chịu trách nhiệm', 'Mỗi luồng có người sở hữu, người nhận cảnh báo, nhật ký chạy.']],
      get: [GET, ['Vẽ luồng có điều kiện và nhánh lỗi', 'Dựng luồng lead mới trên công cụ được chọn', 'Thử trùng, thiếu, tạm ngừng', 'Đọc nhật ký và mã trả về', 'Tự động hóa một việc thật trong 30 ngày']],
      not: [NOT, ['Tích hợp phức tạp nhiều hệ thống (dịch vụ riêng)', 'Gửi tin hàng loạt cho người chưa đồng ý', 'Một công cụ phù hợp mọi doanh nghiệp']],
      src: ['triggers', 'owaspApi']}
  },
  'marketing-thuc-chien-cho-doanh-nghiep': {
    scene: () => scene({badge: BADGE, main: actionPlan(0), side: lessonSide('Workshop', ['Bối cảnh', 'Dữ liệu', 'Phương án', 'Kế hoạch']),
      calls: [['Bài toán thật', 'Dữ liệu được phép dùng'], ['Hai phương án', 'So sánh, phản hồi'], ['Kế hoạch 30 ngày', 'Người làm, thời hạn']]}),
    intro: {q: 'Workshop Marketing thực chiến là gì?',
      a: 'Là buổi làm việc trên chính bài toán của doanh nghiệp — lead ít, chi phí cao, bán chậm — với dữ liệu đã ẩn thông tin cá nhân. '
        + 'Đội ngũ làm rõ bối cảnh, thử phương án, nhận phản hồi ngay và ra về với kế hoạch có người làm, thời hạn và cách kiểm tra.',
      facts: [['Dành cho', 'Đội đã có nền tảng, cần áp dụng'], ['Hình thức', 'Workshop theo nhóm'], ['Đầu ra', 'Kế hoạch 30 ngày']]},
    essentials: {title: 'Sáu nguyên tắc của workshop thực chiến.', lead: 'Kết thúc bằng việc làm được, không bằng giấy chứng nhận tham gia.',
      cards: [['search', 'Bài toán một câu, một con số', '“Lead quà Tết nhiều mà đơn ít”: rõ vấn đề, rõ cách đo.'],
        ['shield', 'Dữ liệu đã ẩn cá nhân', 'Chỉ dùng dữ liệu doanh nghiệp đồng ý chia sẻ, đã bỏ thông tin cá nhân.'],
        ['chart', 'Nhận định có số liệu', 'Tìm bước rơi lớn nhất từ dữ liệu, không từ cảm giác.'],
        ['layers', 'Hai phương án', 'Mỗi nhóm dựng phương án, so sánh chi phí, công sức, rủi ro.'],
        ['chat', 'Phản hồi tại chỗ', 'Giảng viên chỉ lỗi và lý do; nhóm sửa và trình lại.'],
        ['flag', 'Người ra quyết định dự buổi cuối', 'Kế hoạch được duyệt ngay, có người làm, thời hạn, cách kiểm tra.']],
      get: [GET, ['Nêu đúng bài toán bằng số liệu', 'So sánh phương án có căn cứ', 'Phân vai kênh cho cả đội', 'Lập kế hoạch 30 ngày', 'Kiểm tra tiến độ sau 30 ngày']],
      not: [NOT, ['POWAI làm thay đội ngũ', 'Kết quả kinh doanh cụ thể', 'Giải mọi bài toán trong một buổi']],
      src: ['gaAbout', 'metaObjective']}
  },
  'dao-tao-doi-ngu-marketing-noi-bo': {
    scene: () => scene({badge: BADGE, main: skillMatrix(1), side: lessonSide('Theo vai trò', ['Nhận brief', 'Làm phần việc', 'Bàn giao', 'Báo cáo']),
      calls: [['Ma trận kỹ năng', 'Biết cần bù ở đâu'], ['Học theo vai trò', 'Phần chung + phần riêng'], ['Quy trình bàn giao', 'Không thất lạc việc']]}),
    intro: {q: 'Đào tạo đội ngũ nội bộ là gì?',
      a: 'Là chương trình thiết kế riêng cho đội marketing của doanh nghiệp: rà vai trò và năng lực đầu vào, chọn kỹ năng cần bù, học chung quy trình, học riêng theo vai trò '
        + 'và làm bài nhóm mô phỏng đúng cách đội phối hợp hằng ngày.',
      facts: [['Dành cho', 'Đội 3–20 người, nhiều vai trò'], ['Hình thức', 'Học chung + theo vai trò + bài nhóm'], ['Đầu ra', 'Quy trình chung, mỗi người một kế hoạch']]},
    essentials: {title: 'Sáu điều làm nên chương trình nội bộ hiệu quả.', lead: 'Mỗi người học đúng phần việc, cả nhóm chạy cùng một quy trình.',
      cards: [['users', 'Ma trận kỹ năng', 'Vai trò × kỹ năng, mức hiện tại; chọn ô ảnh hưởng tới phối hợp.'],
        ['list', 'Phần chung & phần riêng', 'Cả đội học quy trình chung; từng vai trò học phần của mình.'],
        ['layers', 'Workshop theo việc thật', 'Bài tập dựa trên chiến dịch đội đang làm.'],
        ['route', 'Quy trình bàn giao', 'Brief, lead, báo cáo đi qua công cụ chung, có trạng thái.'],
        ['globe', 'Tài liệu nền tảng miễn phí', 'Skillshop, Meta Blueprint, TikTok Academy làm tài liệu đọc thêm theo vai trò.'],
        ['check', 'Đánh giá để học, không để xếp hạng', 'Đánh giá chọn nội dung học và đo khả năng áp dụng.']],
      get: [GET, ['Mỗi người nói đúng việc mình nhận và giao', 'Đội dùng chung quy trình và mẫu báo cáo', 'Bổ sung kỹ năng còn thiếu theo vai trò',
        'Làm bài nhóm theo quy trình thật', 'Mỗi người một kế hoạch áp dụng']],
      not: [NOT, ['Đánh giá để cắt giảm nhân sự', 'Biến mọi người thành chuyên gia mọi kênh', 'Thay thế tuyển dụng vị trí còn thiếu']],
      src: ['skillshop', 'blueprint', 'ttAcademy']}
  }
};

export function withExtra(P) {
  const x = X[P.slug];
  if (!x) throw new Error('No hero/intro for ' + P.slug);
  return {...P, hero: {...P.hero, eyebrow: EYEBROW, scene: x.scene},
    intro: {kicker: KICKER, ...x.intro}, essentials: {eyebrow: 'KIẾN THỨC CỐT LÕI', ...x.essentials},
    toc: {...P.toc, 'cot-loi': 'Cốt lõi', 'muc-tieu': 'Thực hành', 'dinh-dang': 'Chương trình', 'trien-khai': 'Lộ trình'}};
}

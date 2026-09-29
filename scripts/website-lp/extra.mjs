// Per-page hero picture, "what is it" band and key points for the ten
// Website & Landing Page pages (WEBSITE_LP_PLAN.md). The hero shows the
// thing itself (a landing page, a CMS, a speed report…) with numbered
// callouts, so the first screen says what the service is and which group
// it belongs to.
import {scene, homePage, mobileSite, product, checkout, landingDesktop, contactForm, editor, modules, uiStates, wireframe,
  splitTest, uptime, vitals, pipeline, leadDone} from './mocks.mjs';

const BADGE = 'Website & Landing Page · Dịch vụ';
const EYEBROW = 'DỊCH VỤ WEBSITE & LANDING PAGE';
const KICKER = 'WEBSITE & LANDING PAGE';
const GET = 'POWAI bàn giao';
const NOT = 'Tính riêng hoặc cần phối hợp';

const X = {
  'website-doanh-nghiep': {
    scene: () => scene({badge: BADGE, main: homePage(), side: mobileSite('sticky'),
      calls: [['Trang chủ', 'Bạn là ai, làm gì, cho ai'], ['Trang dịch vụ', 'Mỗi dịch vụ một trang'], ['Liên hệ', 'Gọi, nhắn, form trên điện thoại']]}),
    intro: {q: 'Website doanh nghiệp là gì?',
      a: 'Là “văn phòng trực tuyến” của doanh nghiệp: nơi khách tìm hiểu bạn là ai, làm dịch vụ gì, đã làm cho ai và liên hệ thế nào. '
        + 'Khác Landing Page (một chiến dịch) và website bán hàng (đặt mua trực tiếp), website doanh nghiệp phục vụ nhiều nhu cầu tìm hiểu trước khi khách liên hệ.',
      facts: [['Phù hợp', 'Dịch vụ, B2B, sản xuất, dự án'], ['Trang cốt lõi', 'Trang chủ, giới thiệu, dịch vụ, dự án, liên hệ'], ['Đo bằng', 'Liên hệ thành công, khách phù hợp']]},
    essentials: {title: 'Sáu điều làm nên một website doanh nghiệp tốt.', lead: 'Không phải số trang hay hiệu ứng, mà là khách tìm được thông tin và liên hệ được.',
      cards: [['layers', 'Cấu trúc theo câu hỏi của khách', 'Menu tối đa hai tầng; mỗi trang trả lời một câu hỏi: làm gì, cho ai, giá thế nào, đã làm cho ai, liên hệ ra sao.'],
        ['page', 'Mỗi dịch vụ một trang riêng', 'Ai dùng, nhận gì, quy trình, điều kiện; quảng cáo và tìm kiếm dẫn thẳng vào đúng trang.'],
        ['star', 'Bằng chứng thật', 'Dự án, khách hàng, chứng nhận, ảnh xưởng; chỉ đăng thứ đã được phép công bố.'],
        ['mobile', 'Ưu tiên điện thoại', 'Nút gọi, nhắn, form luôn trong tầm tay; chữ đủ lớn; không cuộn ngang.'],
        ['form', 'Form có trạng thái và nơi nhận', 'Báo lỗi, đang gửi, đã nhận; hồ sơ về đúng người phụ trách.'],
        ['search', 'Nền tảng tìm kiếm từ đầu', 'Tiêu đề, mô tả, URL rõ nghĩa, sơ đồ trang XML, chuyển hướng 301 khi đổi URL cũ.']],
      get: [GET, ['Sơ đồ trang và nội dung từng trang đã duyệt', 'Giao diện máy tính và điện thoại', 'Form liên hệ nối về email hoặc CRM',
        'Đo lường sự kiện liên hệ', 'Tài khoản quản trị và hướng dẫn tự cập nhật']],
      not: [NOT, ['Tên miền, hosting, giấy phép phần mềm', 'Viết nội dung dài, chụp ảnh sản phẩm', 'SEO và quảng cáo sau khi ra mắt']],
      src: ['sitemaps', 'move', 'waiForms']}
  },
  'website-ban-hang': {
    scene: () => scene({badge: BADGE, main: product(), side: checkout('ship'),
      calls: [['Trang sản phẩm', 'Giá, biến thể, tồn kho'], ['Giỏ & thanh toán', 'Ít bước, phí giao hiện sớm'], ['Quản lý đơn', 'Trạng thái rõ ràng']]}),
    intro: {q: 'Website bán hàng là gì?',
      a: 'Là cửa hàng trực tuyến của riêng doanh nghiệp: khách xem danh mục, chọn biến thể, đặt hàng và thanh toán; đội vận hành xử lý đơn trong trang quản trị. '
        + 'Khác bán trên sàn, bạn làm chủ giao diện, dữ liệu khách hàng và chương trình khuyến mãi.',
      facts: [['Phù hợp', 'Sản phẩm có giá rõ, mua lặp lại'], ['Thành phần cốt lõi', 'Danh mục, sản phẩm, giỏ, thanh toán, đơn hàng'], ['Đo bằng', 'Đơn thành công, giá trị đơn, tỷ lệ bỏ giỏ']]},
    essentials: {title: 'Sáu điều quyết định website có bán được hay không.', lead: 'Khách bỏ đi ở giỏ và thanh toán nhiều hơn ở trang chủ.',
      cards: [['list', 'Danh mục & bộ lọc theo cách khách chọn', 'Lọc theo nhu cầu (mùi, giá, còn hàng), sắp xếp, tìm kiếm trong cửa hàng.'],
        ['tag', 'Trang sản phẩm đủ để quyết định', 'Giá theo biến thể, tồn kho, ảnh nhiều góc, phí giao, đổi trả ngay dưới nút mua.'],
        ['pay', 'Thanh toán ít bước', 'Mua không cần tài khoản, phí giao hiện sớm, nhiều cách trả: chuyển khoản, cổng thanh toán, COD.'],
        ['alert', 'Xử lý khi đơn đi sai', 'Thanh toán thất bại, đơn trùng, hết hàng giữa chừng đều có thông báo và cách xử lý.'],
        ['receipt', 'Quản trị đơn và kho', 'Trạng thái thanh toán và giao hàng tách riêng; lọc nhanh đơn cần xử lý.'],
        ['stamp', 'Thủ tục & chính sách', 'Thông báo website với Bộ Công Thương qua online.gov.vn; trang chính sách giao hàng, đổi trả, bảo mật.']],
      get: [GET, ['Cửa hàng trên máy tính và điện thoại', 'Sản phẩm mẫu và hướng dẫn nhập tiếp', 'Kết nối cổng thanh toán (thử rồi mới thật)',
        'Email xác nhận đơn', 'Đo lường từ xem sản phẩm tới mua']],
      not: [NOT, ['Phí cổng thanh toán, vận chuyển', 'Chụp ảnh, viết mô tả hàng loạt', 'Kết nối phần mềm kho: xem Tích hợp hệ thống']],
      src: ['product', 'ecom', 'gaEvents']}
  },
  'landing-page': {
    scene: () => scene({badge: BADGE, main: landingDesktop(), side: contactForm('done'),
      calls: [['Tiêu đề khớp quảng cáo', 'Cùng một lời hứa'], ['Lợi ích + bằng chứng', 'Đủ để quyết định'], ['Một form duy nhất', 'Đo gửi thành công']]}),
    intro: {q: 'Landing Page là gì?',
      a: 'Landing Page (trang đích) là trang riêng khách đến sau khi bấm quảng cáo, email hay bài đăng. Trang chỉ phục vụ một chiến dịch và một hành động — '
        + 'để lại thông tin, đăng ký, mua — nên bỏ bớt menu và các hướng rẽ mà website thường có.',
      facts: [['Dùng khi', 'Chạy quảng cáo, ra mắt, sự kiện, ưu đãi'], ['Khác website', 'Một mục tiêu, không nhiều hướng rẽ'], ['Đo bằng', 'Tỷ lệ gửi form, lead phù hợp']]},
    essentials: {title: 'Sáu điều một Landing Page phải có.', lead: 'Trang tốt khi khách hiểu ngay mình đến đúng chỗ và biết phải làm gì tiếp.',
      cards: [['target', 'Khớp lời hứa của quảng cáo', 'Tiêu đề, ảnh, ưu đãi ở màn hình đầu nói đúng điều quảng cáo đã hứa.'],
        ['check', 'Lợi ích trước tính năng', 'Vài lợi ích cụ thể nói bằng ngôn ngữ của khách: tôi được gì, khác gì chỗ khác.'],
        ['star', 'Bằng chứng', 'Ảnh thật, đánh giá có nguồn, chính sách đổi trả, số liệu có căn cứ.'],
        ['form', 'Một form, một nút', 'Ít trường, nhãn rõ, báo lỗi tại trường, lặp lại nút ở cuối trang.'],
        ['bolt', 'Mở nhanh trên điện thoại', 'Khách từ quảng cáo thường dùng điện thoại: ảnh nén, ít mã bên thứ ba.'],
        ['chart', 'Đo và thử được', 'Sự kiện gửi thành công, nguồn chiến dịch đi kèm lead, thử A/B một thay đổi mỗi lần.']],
      get: [GET, ['Nội dung trang: tiêu đề, lợi ích, câu hỏi', 'Thiết kế máy tính và điện thoại', 'Form nối về CRM hoặc email, báo người trực',
        'Sự kiện generate_lead và nguồn chiến dịch', 'Phiên bản B để thử nghiệm (nếu cần)']],
      not: [NOT, ['Chạy quảng cáo đưa người vào trang', 'Tên miền, công cụ dựng trang trả phí', 'Chụp ảnh, quay video sản phẩm']],
      src: ['forms', 'waiForms', 'gaEvents']}
  },
  'wordpress': {
    scene: () => scene({badge: BADGE, main: editor(),
      calls: [['Mẫu trang dễ sửa', 'Khối có sẵn kiểu'], ['Phân quyền', 'Đúng vai trò'], ['Sao lưu trước cập nhật', 'Khôi phục được']]}),
    intro: {q: 'WordPress là gì?',
      a: 'WordPress là hệ quản trị nội dung (CMS) mã nguồn mở, dùng để dựng và tự cập nhật website mà không cần viết code cho mỗi lần sửa. '
        + 'Chức năng mở rộng bằng giao diện (theme) và plugin, vì thế cần chọn ít plugin, phân quyền đúng và sao lưu trước mỗi lần cập nhật.',
      facts: [['Phù hợp', 'Website giới thiệu, tin tức, blog, cửa hàng vừa'], ['Quản trị', 'Trang, bài viết, thư viện, người dùng'], ['Vận hành', 'Cập nhật, sao lưu, phân quyền']]},
    essentials: {title: 'Sáu điều để WordPress dễ dùng và chạy ổn.', lead: 'WordPress mạnh vì linh hoạt; cũng vì linh hoạt mà dễ rối nếu không có quy tắc.',
      cards: [['file', 'Trình soạn khối & mẫu trang', 'Trang dựng từ khối có sẵn kiểu; nhân sự đổi nội dung mà không phá bố cục.'],
        ['list', 'Bài viết & chuyên mục', 'Chuẩn hóa chuyên mục, thẻ, ảnh đại diện, tác giả để blog không rối.'],
        ['code', 'Ít plugin, có lý do', 'Mỗi plugin là mã cần cập nhật và có thể xung đột; giữ cái cần, gỡ cái không dùng.'],
        ['users', 'Vai trò mặc định', 'Quản trị viên, Biên tập viên, Tác giả, Cộng tác viên, Người đăng ký: cấp đúng quyền cho từng người.'],
        ['shield', 'Sao lưu tệp + cơ sở dữ liệu', 'Lưu nhiều bản ở nơi tách khỏi máy chủ; thử khôi phục định kỳ.'],
        ['repeat', 'Cập nhật có kiểm tra', 'Sao lưu trước, bản lớn thử trên bản sao, rà trang và form sau cập nhật.']],
      get: [GET, ['Website WordPress mới hoặc bản đã dọn dẹp', 'Mẫu trang và khối nội dung', 'Danh sách plugin, giấy phép',
        'Tài khoản đã phân quyền', 'Hướng dẫn quản trị, đã thử khôi phục']],
      not: [NOT, ['Giấy phép theme, plugin trả phí', 'Hosting và tên miền', 'Bảo trì định kỳ: xem Bảo trì Website']],
      src: ['wpEditor', 'wpRoles', 'wpBackup']}
  },
  'website-theo-yeu-cau': {
    scene: () => scene({badge: BADGE, main: modules(1), side: uiStates('denied'),
      calls: [['Câu chuyện người dùng', 'Ai, muốn gì, để làm gì'], ['Module & quyền', 'Kiểm tra ở máy chủ'], ['Nghiệm thu theo đợt', 'Theo điều kiện đã chốt']]}),
    intro: {q: 'Website theo yêu cầu là gì?',
      a: 'Là ứng dụng web xây riêng cho nghiệp vụ của doanh nghiệp — cổng khách hàng, đặt lịch, quản lý đơn, báo giá — khi mẫu website hay plugin có sẵn không đáp ứng. '
        + 'Mỗi chức năng được đặc tả, có điều kiện chấp nhận và được bàn giao theo từng đợt.',
      facts: [['Phù hợp', 'Quy trình riêng, nhiều vai trò, nối hệ thống'], ['Bắt đầu từ', 'Câu chuyện người dùng, không từ công nghệ'], ['Nghiệm thu', 'Theo điều kiện đã chốt']]},
    essentials: {title: 'Sáu điều giữ dự án đúng hướng.', lead: 'Dự án theo yêu cầu hỏng thường vì phạm vi mơ hồ, không phải vì công nghệ.',
      cards: [['person', 'Câu chuyện người dùng', '“Là…, tôi muốn…, để…” kèm điều kiện chấp nhận và phần ngoài phạm vi.'],
        ['layers', 'Tách module', 'Mỗi module giữ dữ liệu riêng, có người duyệt riêng; làm và bàn giao theo đợt.'],
        ['shield', 'Phân quyền ở máy chủ', 'Kiểm tra quyền cho từng thao tác và từng bản ghi; OWASP xếp lỗi phân quyền vào nhóm rủi ro hàng đầu.'],
        ['route', 'Ba môi trường', 'Phát triển → thử nghiệm → chính thức; không sửa thẳng trên bản đang chạy.'],
        ['alert', 'Thử ngoại lệ', 'Dữ liệu trống, lỗi tải, không đủ quyền, hệ thống kia tạm ngừng.'],
        ['file', 'Tài liệu & mã nguồn', 'Tài liệu chức năng, hướng dẫn vận hành, quyền truy cập mã nguồn theo hợp đồng.']],
      get: [GET, ['Tài liệu đặc tả và bản mẫu', 'Ứng dụng theo từng đợt đã nghiệm thu', 'Môi trường thử nghiệm',
        'Tài liệu chức năng, quyền, dữ liệu', 'Ghi chú mỗi lần phát hành']],
      not: [NOT, ['Hạ tầng máy chủ, dịch vụ bên thứ ba', 'Chức năng ngoài đặc tả (thêm theo đợt sau)', 'Nhập liệu thủ công dữ liệu cũ']],
      src: ['owaspApi', 'wcag', 'waiForms']}
  },
  'ui-ux': {
    scene: () => scene({badge: BADGE, main: wireframe('ui'), side: uiStates('empty'),
      calls: [['Luồng thao tác', 'Cả nhánh lỗi'], ['Khung dây → bản mẫu', 'Bố cục trước, màu sau'], ['Đủ trạng thái', 'Tải, trống, lỗi, xong']]}),
    intro: {q: 'UI/UX là gì?',
      a: 'UX (trải nghiệm người dùng) là người dùng đi qua các bước có xong việc không, có phải đoán không; UI (giao diện) là từng màn hình trông và phản hồi ra sao. '
        + 'Thiết kế tốt bắt đầu từ tác vụ và luồng thao tác, rồi mới tới màu sắc.',
      facts: [['UX trả lời', 'Người dùng có xong việc không'], ['UI trả lời', 'Màn hình có rõ, nhất quán không'], ['Kiểm chứng', 'Thử với người dùng thật']]},
    essentials: {title: 'Sáu điều của một thiết kế dùng được.', lead: 'Đẹp là cần, nhưng dùng được mới là mục tiêu.',
      cards: [['target', 'Tác vụ ưu tiên', 'Vài việc chính người dùng đến để làm; mọi quyết định thiết kế bám vào đó.'],
        ['route', 'Luồng có nhánh lỗi', 'Điểm vào, bước chính, câu hỏi rẽ nhánh, lỗi và cách quay lại.'],
        ['layers', 'Khung dây trước màu', 'Duyệt vị trí và thứ tự thông tin bằng hộp xám trước khi bàn màu sắc.'],
        ['mobile', 'Đủ trạng thái', 'Đang tải, trống, lỗi, thành công, màn hình nhỏ; không chỉ bản đẹp.'],
        ['eye', 'Khả năng truy cập', 'Tương phản, nhãn, thao tác bằng bàn phím theo WCAG 2.2.'],
        ['users', 'Thử với người dùng', 'Giao tác vụ, quan sát, sửa, thử lại theo vòng nhỏ.']],
      get: [GET, ['Sơ đồ luồng thao tác', 'Khung dây và bản mẫu bấm được', 'Bộ trạng thái màn hình',
        'Hệ thống giao diện: màu, chữ, nút, ô nhập', 'Báo cáo thử người dùng']],
      not: [NOT, ['Lập trình giao diện', 'Nghiên cứu thị trường quy mô lớn', 'Nội dung chữ và ảnh cuối cùng']],
      src: ['wcag', 'waiForms', 'design']}
  },
  'cro-toi-uu-chuyen-doi': {
    scene: () => scene({badge: BADGE, main: splitTest('page'), side: contactForm('error'),
      calls: [['Tìm điểm rơi', 'Đo từng bước'], ['Giả thuyết', 'Vì sao, đổi gì'], ['A/B một thay đổi', 'Đủ mẫu mới kết luận']]}),
    intro: {q: 'CRO là gì?',
      a: 'CRO (Conversion Rate Optimization – tối ưu tỷ lệ chuyển đổi) là cải thiện tỷ lệ người vào website làm hành động có giá trị: gửi form, gọi, mua. '
        + 'Làm bằng cách đo từng bước, tìm chỗ khách dừng lại, sửa lỗi rõ ràng và thử nghiệm có kiểm soát, không đoán.',
      facts: [['Tỷ lệ chuyển đổi', 'Hành động giá trị ÷ lượt truy cập'], ['Làm trên', 'Trang, form, giỏ, thanh toán'], ['Không hứa', 'Một mức tăng trước khi có dữ liệu']]},
    essentials: {title: 'Sáu điều của CRO làm đúng cách.', lead: 'CRO là phương pháp, không phải mẹo đổi màu nút.',
      cards: [['funnel', 'Đo từng bước', 'Sự kiện: vào trang, bắt đầu form, lỗi, gửi thành công, thêm giỏ, mua.'],
        ['eye', 'Hiểu vì sao', 'Độ sâu cuộn, quan sát người dùng, câu hỏi của khách.'],
        ['check', 'Sửa lỗi rõ ràng trước', 'Form không gửi, nút không bấm được, trang chậm: sửa ngay, không cần thử nghiệm.'],
        ['flag', 'Giả thuyết có căn cứ', 'Vì… nếu… thì… đo bằng…; mỗi giả thuyết một thay đổi.'],
        ['sliders', 'A/B có kiểm soát', 'Chia đều lưu lượng, cỡ mẫu định trước, không dừng sớm.'],
        ['users', 'Đọc cả chất lượng', 'Lead phù hợp trong CRM, không chỉ số form tăng.']],
      get: [GET, ['Bản đồ điểm rơi', 'Danh sách lỗi và bản sửa', 'Danh sách giả thuyết ưu tiên', 'Kết quả thử nghiệm', 'Báo cáo mỗi vòng']],
      not: [NOT, ['Thiết kế lại toàn bộ website', 'Công cụ thử nghiệm trả phí (nếu dùng)', 'Mua thêm lưu lượng truy cập']],
      src: ['gaLead', 'gaKey', 'forms']}
  },
  'bao-tri-website': {
    scene: () => scene({badge: BADGE, main: uptime(),
      calls: [['Sao lưu đã thử', 'Khôi phục được thật'], ['Cập nhật an toàn', 'Thử trước, rà sau'], ['Theo dõi sự cố', 'Có người nhận']]}),
    intro: {q: 'Bảo trì website là gì?',
      a: 'Là công việc định kỳ giữ website chạy an toàn và đúng: sao lưu, cập nhật hệ thống và plugin, theo dõi sự cố, kiểm tra form và liên kết, báo cáo. '
        + 'Khác với làm chức năng mới — phần đó tính theo dự án.',
      facts: [['Định kỳ', 'Sao lưu, cập nhật, thử form'], ['Khi có sự cố', 'Có người nhận, khôi phục được'], ['Báo cáo', 'Hằng tháng']]},
    essentials: {title: 'Sáu việc bảo trì phải làm đều.', lead: 'Website không hỏng một lần; nó xấu đi dần nếu không ai theo dõi.',
      cards: [['shield', 'Sao lưu đã thử khôi phục', 'Tệp + cơ sở dữ liệu, lưu ngoài máy chủ; mỗi tháng thử khôi phục một lần.'],
        ['repeat', 'Cập nhật có kiểm tra', 'Bản vá bảo mật sớm; bản lớn thử trên bản sao; rà trang và form sau cập nhật.'],
        ['bell', 'Theo dõi tình trạng', 'Website có mở được, form có gửi được; cảnh báo khi có sự cố.'],
        ['form', 'Thử hành động quan trọng', 'Form, giỏ, thanh toán, nút gọi: định kỳ thử như khách.'],
        ['bolt', 'Giữ tốc độ', 'Ảnh mới chưa nén, mã bên thứ ba mới làm trang chậm dần.'],
        ['receipt', 'Báo cáo tháng', 'Đã làm gì, còn gì, cần doanh nghiệp quyết định gì.']],
      get: [GET, ['Lịch sao lưu và nhật ký', 'Cập nhật định kỳ có ghi chép', 'Tiếp nhận sự cố theo phạm vi', 'Thử form, liên kết hằng tuần', 'Báo cáo tháng']],
      not: [NOT, ['Chức năng mới, thiết kế lại', 'Phí hosting, giấy phép', 'Sửa nội dung vượt số giờ đã thống nhất']],
      src: ['wpBackup', 'wpUpdate', 'caching']}
  },
  'toi-uu-toc-do': {
    scene: () => scene({badge: BADGE, main: vitals('after'), side: mobileSite('sticky'),
      calls: [['LCP ≤ 2,5 s', 'Nội dung chính hiện ra'], ['INP ≤ 200 ms', 'Bấm là phản hồi'], ['CLS ≤ 0,1', 'Bố cục không nhảy']]}),
    intro: {q: 'Tối ưu tốc độ là gì?',
      a: 'Là làm cho trang hiện nội dung chính nhanh, phản hồi ngay khi bấm và không nhảy bố cục — đo bằng ba chỉ số Core Web Vitals: LCP, INP, CLS. '
        + 'Việc gồm đo trên thiết bị khách dùng, tìm nguyên nhân, sửa theo mức ảnh hưởng và đo lại cùng điều kiện.',
      facts: [['LCP tốt', '≤ 2,5 giây'], ['INP tốt', '≤ 200 mili giây'], ['CLS tốt', '≤ 0,1']]},
    essentials: {title: 'Sáu điều cần biết về tốc độ trang.', lead: 'Ngưỡng “tốt” theo web.dev, đọc ở phân vị 75 của lượt tải trang, tách điện thoại và máy tính.',
      cards: [['bolt', 'LCP: nội dung chính', 'Ảnh hoặc khối chữ lớn nhất ở màn hình đầu hiện ra trong 2,5 giây.'],
        ['tap', 'INP: phản hồi', 'Bấm nút, mở menu phản hồi trong 200 mili giây.'],
        ['layers', 'CLS: bố cục ổn định', 'Ảnh, font, quảng cáo không đẩy nội dung khi tải xong.'],
        ['image', 'Ảnh đúng cỡ, đúng lúc', 'Nhiều cỡ ảnh (srcset), định dạng nén tốt, ảnh dưới màn hình đầu tải trễ.'],
        ['code', 'Tài nguyên & mã bên thứ ba', 'CSS quan trọng trước, font ít kiểu, rà khung chat, mã đo lường.'],
        ['chart', 'Dữ liệu thực tế và phòng thí nghiệm', 'Thực tế là người dùng thật; phòng thí nghiệm là một lần tải giả lập. Đọc cả hai.']],
      get: [GET, ['Bảng số trước và sau, cùng điều kiện', 'Danh sách nguyên nhân theo mức ảnh hưởng', 'Bản sửa đã kiểm tra trên bản thử',
        'Quy tắc cho ảnh và mã mới', 'Theo dõi dữ liệu thực tế sau khi sửa']],
      not: [NOT, ['Đổi hosting, CDN (chi phí riêng)', 'Viết lại toàn bộ giao diện', 'Cam kết một điểm số cụ thể']],
      src: ['vitals', 'lcp', 'inp', 'cls', 'psi']}
  },
  'tich-hop-he-thong': {
    scene: () => scene({badge: BADGE, main: pipeline(2), side: leadDone(),
      calls: [['Ánh xạ trường', 'Form → CRM'], ['Chống trùng', 'Gộp theo khóa'], ['Thử lại khi lỗi', 'Không mất lead']]}),
    intro: {q: 'Tích hợp hệ thống là gì?',
      a: 'Là nối website với các hệ thống doanh nghiệp đang dùng — CRM, phần mềm bán hàng, email, bảng tính, công cụ đo lường — qua API, để dữ liệu tự đi đúng chỗ thay vì chép tay. '
        + 'Kết nối tốt xử lý cả lúc lỗi: thiếu dữ liệu, trùng, hệ thống kia tạm ngừng.',
      facts: [['Nối', 'Website ↔ CRM, bán hàng, email, đo lường'], ['Qua', 'API, webhook, công cụ tự động hóa'], ['Đạt khi', 'Không mất, không trùng, có nhật ký']]},
    essentials: {title: 'Sáu điều của một kết nối không mất dữ liệu.', lead: 'Kết nối chạy được khi mọi thứ đúng là chưa đủ; phải chạy đúng khi có lỗi.',
      cards: [['table', 'Ánh xạ trường', 'Trường nào sang trường nào, kiểu dữ liệu, bắt buộc, chuẩn hóa số điện thoại.'],
        ['lock', 'Xác thực an toàn', 'Khóa API ở máy chủ, quyền tối thiểu, không nằm trong mã trang.'],
        ['repeat', 'Lỗi & gửi lại', 'Lưu bản ghi, thử lại lỗi tạm thời, báo người khi lỗi kéo dài.'],
        ['users', 'Chống trùng', 'Khóa gộp (ví dụ số điện thoại chuẩn hóa) để không tạo hồ sơ trùng.'],
        ['list', 'Nhật ký đồng bộ', 'Mỗi bản ghi có trạng thái và mã trả về; đối soát định kỳ.'],
        ['chart', 'Nguồn chiến dịch', 'Gửi kèm nguồn truy cập để đọc hiệu quả theo kênh.']],
      get: [GET, ['Sơ đồ luồng dữ liệu', 'Bảng ánh xạ trường', 'Kết nối chạy trên môi trường thử rồi thật', 'Nhật ký và cảnh báo', 'Tài liệu vận hành, người giữ khóa']],
      not: [NOT, ['Phí API hoặc gói của CRM', 'Hệ thống không có API: cần giải pháp khác', 'Đồng bộ hai chiều phức tạp (đợt sau)']],
      src: ['owaspApi', 'mdnStatus', 'gaLead']}
  }
};

// Merge the extras into a page module.
export function withExtra(P) {
  const x = X[P.slug];
  if (!x) throw new Error('No hero/intro for ' + P.slug);
  return {...P, hero: {...P.hero, eyebrow: EYEBROW, scene: x.scene},
    intro: {kicker: KICKER, ...x.intro}, essentials: x.essentials,
    toc: {...P.toc, 'cot-loi': 'Cốt lõi', 'muc-tieu': 'Tình huống'}};
}

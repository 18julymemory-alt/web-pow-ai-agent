// Website doanh nghiệp — one landing page (WEBSITE_LP_PLAN.md). Content from
// service-content.mjs, service-specific-audit.mjs and the website chapter of
// service-editorial-chapters.mjs; external facts from sources.mjs.
import {sitemap, homePage, servicePage, projects, mobileSite, contactForm, editor, crm, dropoff} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
import {withExtra} from './extra.mjs';
export {CHECKED};

export default withExtra({
  slug: 'website-doanh-nghiep',
  channel: 'webCorp',
  name: 'Website doanh nghiệp',
  checked: CHECKED,
  docName: 'tài liệu web.dev, W3C và Google',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Các trang cần có'),
  contact: CONTACT,
  meta: {
    title: 'Thiết kế website doanh nghiệp: sơ đồ trang, dịch vụ, dự án, liên hệ',
    description: 'Website doanh nghiệp giúp khách hiểu bạn làm gì, tìm đúng dịch vụ và liên hệ trên điện thoại. '
      + 'Sơ đồ trang, nội dung cần chuẩn bị, trạng thái form, đo lường và cách POWAI triển khai.'
  },
  hero: {
    sub: 'Khách tìm được <em>dịch vụ</em> và <em>liên hệ</em> được ngay trên điện thoại.',
    lead: 'Website doanh nghiệp tổ chức giới thiệu, dịch vụ, năng lực, dự án và liên hệ theo đúng câu hỏi khách hay đặt. '
      + 'Phạm vi tốt mô tả cả nội dung, thao tác và cách đội ngũ tự cập nhật sau bàn giao; số trang chỉ là một phần.',
    cta: 'Xem các trang cần có',
    rungs: [['layers', 'Sơ đồ trang', 'Theo câu hỏi của khách'], ['page', 'Trang dịch vụ', 'Ai dùng, nhận gì'],
      ['star', 'Dự án', 'Bằng chứng đã được phép'], ['form', 'Liên hệ', 'Form có trạng thái'], ['users', 'Tự quản trị', 'Sửa không vỡ bố cục']]
  },
  when: {
    title: 'Khi khách cần hiểu bạn trước khi liên hệ.',
    lead: 'Hợp với doanh nghiệp bán dịch vụ, bán cho doanh nghiệp, hoặc có nhiều nhóm sản phẩm cần giải thích. Khách thường xem vài trang rồi mới gọi.',
    journey: [['search', 'Khách tìm tên hoặc nhu cầu'], ['page', 'Vào trang chủ'], ['list', 'Chọn đúng dịch vụ'], ['star', 'Xem dự án, năng lực'],
      ['form', 'Gửi yêu cầu hoặc gọi']],
    inputs: [['layers', 'Danh sách dịch vụ'], ['image', 'Ảnh, dự án được phép dùng'], ['file', 'Thông tin pháp lý, liên hệ'], ['users', 'Người duyệt nội dung']],
    core: 'Sơ đồ trang, thiết kế, phát triển',
    outputs: [['globe', 'Website đã kiểm thử'], ['form', 'Form về đúng nơi nhận'], ['file', 'Hướng dẫn tự cập nhật']],
    fit: ['Khách hỏi đi hỏi lại cùng một thông tin', 'Có nhiều dịch vụ cho nhiều nhóm khách', 'Cần nơi đặt dự án, chứng nhận, đối tác',
      'Quảng cáo, SEO cần trang đích đáng tin'],
    notFit: ['Chỉ chạy một chiến dịch ngắn: dùng Landing Page', 'Cần đặt hàng, thanh toán: xem Website bán hàng',
      'Chưa có người duyệt nội dung', 'Mong website tự mang khách mà không có nguồn truy cập'],
    src: ['design', 'seo']
  },
  formats: {
    eyebrow: 'CÁC TRANG CẦN CÓ',
    title: 'Năm khối khách thật sự xem.',
    lead: 'Chọn từng khối để xem khách cần gì ở đó và POWAI tổ chức ra sao.',
    whereLabel: 'Khách cần', whatLabel: 'Tổ chức thế nào',
    items: [
      {key: 'map', label: 'Sơ đồ trang', icon: 'layers', stage: () => sitemap(1), tag: 'SƠ ĐỒ MẪU',
        where: 'Biết ngay website có gì và đi đâu tiếp.', what: 'Menu theo nhu cầu khách, không theo sơ đồ tổ chức nội bộ; tối đa hai tầng.',
        more: [['Kèm theo', 'Sơ đồ XML cho công cụ tìm kiếm, tạo tự động khi thêm trang.']]},
      {key: 'home', label: 'Trang chủ', icon: 'page', stage: () => homePage({hot: -1}),
        where: 'Hiểu trong vài giây bạn làm gì, cho ai.', what: 'Một câu giới thiệu, ba nhóm dịch vụ, bằng chứng ngắn, một nút liên hệ chính.'},
      {key: 'service', label: 'Trang dịch vụ', icon: 'list', stage: () => servicePage(),
        where: 'Dịch vụ có hợp nhu cầu và điều kiện của mình không.', what: 'Ai dùng, nhận gì, quy trình, điều kiện, ảnh thật và form ngay trên trang.',
        more: [['Lưu ý', 'Mỗi dịch vụ một trang để quảng cáo và SEO dẫn đúng chỗ.']]},
      {key: 'projects', label: 'Dự án & năng lực', icon: 'star', stage: () => projects(),
        where: 'Bằng chứng bạn đã làm việc tương tự.', what: 'Lọc theo ngành, mỗi dự án có bối cảnh, việc đã làm, ảnh được phép dùng.'},
      {key: 'mobile', label: 'Trên điện thoại', icon: 'mobile', stage: () => mobileSite('menu'), tag: 'ĐIỆN THOẠI',
        where: 'Mở menu, bấm gọi, nhắn tin bằng một tay.', what: 'Menu gọn, nút liên hệ cố định cuối màn hình, chữ đủ lớn, không cuộn ngang.'}
    ],
    src: ['design', 'sitemaps', 'seo']
  },
  prep: {
    title: 'Nội dung quyết định phần lớn tiến độ.',
    lead: 'Giao diện làm nhanh được; chờ nội dung và người duyệt mới là phần hay kéo dài.',
    principle: 'Chốt sơ đồ trang và nội dung từng trang trước khi chọn giao diện. Mỗi trang có một hành động chính.',
    boardLabel: 'TRÌNH QUẢN TRỊ NỘI DUNG',
    boards: [() => editor()],
    tiles: [['file', 'Nội dung dịch vụ', 'Ai dùng, nhận gì, quy trình'], ['image', 'Ảnh có quyền dùng', 'Ảnh thật ưu tiên hơn ảnh kho'],
      ['globe', 'Tên miền, hosting', 'Quyền truy cập hiện tại'], ['check', 'Tiêu chí nghiệm thu', 'Thiết bị, luồng liên hệ']],
    assets: [['Chữ', 'Giới thiệu, dịch vụ', 'Người duyệt thông tin.'], ['Ảnh', 'Logo, ảnh, dự án', 'Được phép công bố.'],
      ['Hệ thống', 'Tên miền, hosting, CMS', 'Tài khoản và quyền.'], ['Dữ liệu', 'URL cũ cần giữ', 'Để chuyển hướng khi đổi đường dẫn.']],
    specs: [['Chuyển trang cũ', 'Chuyển hướng 301 từ URL cũ', 'Google khuyên dùng chuyển hướng vĩnh viễn phía máy chủ khi đổi URL.'],
      ['Khả năng truy cập', 'WCAG 2.2', 'Tiêu chuẩn W3C: nhãn form, độ tương phản, thao tác bằng bàn phím.'],
      ['Hiển thị', 'Thiết kế đáp ứng', 'Một nội dung, bố cục đổi theo màn hình.']],
    src: ['move', 'wcag', 'design']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Thử cả lúc form lỗi, không chỉ lúc đẹp.',
    lead: 'Khách vào từ quảng cáo, bấm gửi mà không thấy phản hồi là mất khách. Nhóm đầu là trạng thái form, nhóm sau là nơi dữ liệu đi tới.',
    items: [
      {key: 'error', group: 'Trạng thái form', groupColor: '#9fc8ff', label: 'Nhập sai', icon: 'alert', stage: () => contactForm('error'),
        facts: [['Cần có', 'Báo lỗi ngay tại trường, nói cách sửa, giữ nội dung đã nhập.'], ['Theo', 'Hướng dẫn biểu mẫu của W3C WAI.']]},
      {key: 'sending', group: 'Trạng thái form', groupColor: '#9fc8ff', label: 'Đang gửi', icon: 'clock', stage: () => contactForm('sending'),
        facts: [['Cần có', 'Nút đổi trạng thái, không cho bấm gửi hai lần.'], ['Vì sao', 'Tránh hồ sơ trùng khi mạng chậm.']]},
      {key: 'done', group: 'Trạng thái form', groupColor: '#9fc8ff', label: 'Gửi xong', icon: 'check', stage: () => contactForm('done'),
        facts: [['Cần có', 'Xác nhận đã nhận, mã hồ sơ, khi nào được liên hệ.'], ['Đo', 'Sự kiện gửi thành công, không phải lượt bấm nút.']]},
      {key: 'crm', group: 'Dữ liệu đi đâu', groupColor: '#88e4ff', label: 'Về đúng người nhận', icon: 'users', stage: () => crm('new', ['Form website', 'Gọi', 'Zalo']),
        stageTag: 'CRM MẪU', facts: [['Cần có', 'Hồ sơ vào CRM hoặc email nhóm, có người phụ trách.'], ['Thử', 'Gửi thử trước bàn giao và xem hồ sơ tới nơi.']]},
      {key: 'sticky', group: 'Dữ liệu đi đâu', groupColor: '#88e4ff', label: 'Gọi, nhắn từ điện thoại', icon: 'phone', stage: () => mobileSite('sticky'),
        facts: [['Cần có', 'Nút gọi và nhắn luôn trong tầm tay.'], ['Đo', 'Lượt bấm gọi, nhắn tách riêng với form.']]}
    ],
    note: {label: 'WEBSITE KHÔNG TỰ MANG KHÁCH', ic: 'alert', tone: 'warn',
      text: 'Website cần nguồn truy cập (SEO, quảng cáo, nội dung) và quy trình tiếp nhận. Các phần đó phối hợp riêng, không nằm sẵn trong phạm vi thiết kế.'},
    src: ['waiForms', 'forms']
  },
  measure: {
    eyebrow: 'ĐO LƯỜNG',
    title: 'Đo khách có hoàn tất việc họ đến để làm.',
    lead: 'Bấm từng tầng. Số là một tháng giả định để minh họa cách đọc.',
    tiers: [
      ['visit', 'Vào website', '2.400', [['Người dùng', '2.400', 'Mọi nguồn.'], ['Xem trang dịch vụ', '1.050', 'Tìm đúng nhu cầu.']]],
      ['start', 'Bắt đầu liên hệ', '260', [['Bắt đầu form', '180', 'form_start.'], ['Bấm gọi, nhắn', '80', 'Nút gọi và Zalo.']]],
      ['done', 'Hoàn tất', '96', [['Gửi thành công', '96', 'generate_lead.'], ['Khách phù hợp', '41', 'Nhân viên xác nhận.']]]
    ],
    tips: {start: 'Nhiều người xem dịch vụ mà ít bắt đầu liên hệ: kiểm tra nút có nằm ngay trang dịch vụ không.',
      done: 'Bắt đầu nhiều mà gửi ít: xem lỗi form trên điện thoại.'},
    note: {label: 'DÙNG SỰ KIỆN CÓ SẴN', ic: 'chart', text: 'Google Analytics đo form_start, form_submit và khuyên dùng sự kiện generate_lead cho lead. Đánh dấu sự kiện chính để đọc tỷ lệ chuyển đổi.'},
    src: ['gaLead', 'gaEvents', 'gaKey']
  },
  rollout: {
    title: 'Năm bước từ sơ đồ trang tới bàn giao.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi mở website.',
    steps: [['Chốt cấu trúc', 'Sơ đồ trang, câu hỏi khách, hành động chính từng trang.', 'Sơ đồ trang'],
      ['Bản mẫu có trạng thái', 'Điện thoại, trạng thái trống, lỗi, hoàn tất.', 'Bản mẫu duyệt'],
      ['Nội dung', 'Viết, chọn ảnh, người duyệt chốt từng trang.', 'Nội dung đã duyệt'],
      ['Phát triển & kết nối', 'Dựng trang, form về nơi nhận, đo lường.', 'Bản thử nghiệm'],
      ['Bàn giao', 'Nhân sự tự sửa bài, ảnh, liên hệ; bàn giao quyền.', 'Website, tài liệu']],
    icons: ['layers', 'mobile', 'file', 'code', 'users'],
    phases: [['Thiết kế', [0, 1, 2]], ['Xây dựng', [3]], ['Bàn giao', [4]]],
    checks: ['Menu theo nhu cầu khách', 'Mỗi dịch vụ một trang', 'Form báo lỗi và xác nhận', 'Hồ sơ tới đúng người nhận',
      'Thử trên điện thoại thật', 'Chuyển hướng URL cũ', 'Sự kiện gửi form thành công', 'Nhân sự tự sửa được nội dung'],
    src: ['move', 'forms']
  },
  faq: {
    items: [
      ['Có phải làm lại toàn bộ website cũ?', 'Cần kiểm tra trước. Có thể giữ phần vận hành tốt và chỉ sửa nội dung, luồng hoặc module gây vấn đề.'],
      ['Website xong có tự có khách không?', 'Không. Website cần nguồn truy cập phù hợp và quy trình tiếp nhận; SEO, quảng cáo, nội dung là các phần phối hợp riêng.'],
      ['Chi phí phụ thuộc vào gì?', 'Số mẫu trang, mức tùy chỉnh, nội dung cần viết, dữ liệu cần chuyển và kết nối. Tên miền, hosting, bảo trì là khoản riêng.'],
      ['Đổi website có mất thứ hạng tìm kiếm?', 'Có rủi ro khi đổi URL. Cần danh sách URL cũ và chuyển hướng 301 sang trang mới tương ứng.'],
      ['Nhân viên có tự sửa được không?', 'Có, trong phạm vi khối nội dung đã dựng; POWAI hướng dẫn và thử cùng nhân sự trước bàn giao.'],
      ['Bao lâu thì xong?', 'Tùy số trang và tốc độ duyệt nội dung. Lịch cụ thể chốt sau khi có sơ đồ trang.']
    ],
    topics: [['Phạm vi', 'layers', [0, 2, 5]], ['Sau khi mở', 'globe', [1, 3, 4]]],
    src: ['move', 'seo']
  },
  contactGoals: [['new', 'Làm website mới'], ['redo', 'Làm lại website cũ'], ['content', 'Sắp xếp lại nội dung'], ['leads', 'Tăng liên hệ từ website']],
  recap: {
    title: 'Ba việc trước khi chọn giao diện.',
    items: [['Sơ đồ trang', 'Theo câu hỏi của khách.', '#dinh-dang', 'layers'],
      ['Form có trạng thái', 'Lỗi, đang gửi, đã nhận.', '#muc-tieu', 'form'],
      ['Đo hoàn tất', 'Gửi thành công và khách phù hợp.', '#do-luong', 'chart']]
  },
  sisters: sisters('landing-page', 'wordpress', 'ui-ux')
});

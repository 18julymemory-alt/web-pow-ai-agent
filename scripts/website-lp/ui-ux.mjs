// UI/UX — one landing page (WEBSITE_LP_PLAN.md).
import {flow, wireframe, uiStates, designSystem, usability, contactForm, mobileSite} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
export {CHECKED};

export default {
  slug: 'ui-ux',
  channel: 'webUx',
  name: 'UI/UX',
  checked: CHECKED,
  docName: 'tài liệu W3C và web.dev',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Sản phẩm thiết kế'),
  contact: CONTACT,
  meta: {
    title: 'Thiết kế UI/UX: luồng thao tác, khung dây, bản mẫu có trạng thái, thử người dùng',
    description: 'Thiết kế kiến trúc thông tin, luồng thao tác và hệ thống giao diện nhất quán trên các thiết bị. '
      + 'Khung dây, bản mẫu có trạng thái, thử người dùng, khả năng truy cập và cách POWAI triển khai.'
  },
  hero: {
    sub: 'Người dùng <em>không phải đoán</em> nút nào, bước nào.',
    lead: 'Khi người dùng phải đoán nút bấm hoặc lặp nhiều bước để xong một việc, vấn đề nằm ở luồng thao tác trước khi nằm ở màu sắc. '
      + 'UI/UX đi từ tác vụ ưu tiên, luồng, khung dây, bản mẫu có trạng thái tới thử với người dùng thật.',
    cta: 'Xem sản phẩm thiết kế',
    rungs: [['target', 'Tác vụ ưu tiên', 'Việc người dùng đến làm'], ['route', 'Luồng', 'Cả nhánh rẽ và lỗi'], ['layers', 'Khung dây', 'Bố cục trước màu'],
      ['mobile', 'Bản mẫu', 'Có trạng thái'], ['users', 'Thử người dùng', 'Ghi vấn đề thật']]
  },
  when: {
    title: 'Khi người dùng vào được nhưng làm không xong.',
    lead: 'Hợp khi làm sản phẩm mới, làm lại luồng đặt hàng, đăng ký, đặt lịch, hoặc khi tỷ lệ bỏ giữa chừng cao.',
    journey: [['target', 'Chọn tác vụ ưu tiên'], ['route', 'Vẽ luồng'], ['layers', 'Khung dây'], ['mobile', 'Bản mẫu có trạng thái'],
      ['users', 'Thử và sửa']],
    inputs: [['chart', 'Số liệu hành vi hiện có'], ['chat', 'Phản hồi, câu hỏi của khách'], ['users', 'Người dùng để thử'], ['image', 'Nhận diện thương hiệu']],
    core: 'Luồng, khung dây, bản mẫu, thử nghiệm',
    outputs: [['route', 'Luồng thao tác'], ['mobile', 'Bản mẫu bấm được'], ['layers', 'Hệ thống giao diện']],
    fit: ['Người dùng hỏi nhiều về cách dùng', 'Bỏ giữa chừng ở đăng ký, đặt hàng, đặt lịch', 'Chuẩn bị xây sản phẩm mới',
      'Giao diện mỗi trang một kiểu'],
    notFit: ['Chỉ cần đổi màu, đổi logo', 'Không thể tiếp cận người dùng để thử',
      'Chưa rõ sản phẩm phục vụ ai', 'Muốn duyệt bằng ảnh tĩnh, không bấm thử'],
    src: ['wcag', 'design']
  },
  formats: {
    eyebrow: 'SẢN PHẨM THIẾT KẾ',
    title: 'Năm thứ bạn nhận và dùng được.',
    lead: 'Chọn một sản phẩm để xem nó dùng vào việc gì.',
    whereLabel: 'Dùng để', whatLabel: 'Gồm',
    items: [
      {key: 'flow', label: 'Luồng thao tác', icon: 'route', stage: () => flow(2), tag: 'LUỒNG MẪU',
        where: 'Thống nhất các bước trước khi vẽ.', what: 'Điểm vào, bước chính, câu hỏi rẽ nhánh, lỗi, điểm hoàn tất.'},
      {key: 'wire', label: 'Khung dây', icon: 'layers', stage: () => wireframe('wire'), tag: 'KHUNG DÂY',
        where: 'Duyệt bố cục, thứ tự thông tin.', what: 'Hộp xám, không màu: bàn về vị trí và nội dung, không bàn về màu.'},
      {key: 'ui', label: 'Bản mẫu giao diện', icon: 'image', stage: () => wireframe('ui'), tag: 'BẢN MẪU',
        where: 'Thấy sản phẩm gần như thật.', what: 'Màu, chữ, ảnh thật; bấm qua được luồng chính.'},
      {key: 'states', label: 'Trạng thái màn hình', icon: 'mobile', stage: () => uiStates('loading'), tag: 'TRẠNG THÁI',
        where: 'Không chỉ duyệt bản đẹp.', what: 'Đang tải, trống, lỗi, thành công, màn hình nhỏ.'},
      {key: 'ds', label: 'Hệ thống giao diện', icon: 'layers', stage: () => designSystem(),
        where: 'Mọi màn hình dùng chung thành phần.', what: 'Màu, cỡ chữ, nút, ô nhập, thông báo lỗi; lập trình viên dựng một lần.',
        more: [['Theo', 'Độ tương phản và nhãn theo WCAG 2.2.']]}
    ],
    src: ['wcag', 'design']
  },
  prep: {
    title: 'Bắt đầu từ việc người dùng đến làm.',
    lead: 'Một danh sách tác vụ xếp theo mức quan trọng giúp mọi quyết định thiết kế có căn cứ.',
    principle: 'Vẽ luồng trước khi vẽ giao diện. Duyệt khung dây trước khi duyệt màu.',
    boardLabel: 'LUỒNG THAO TÁC',
    boards: [() => flow(2)],
    tiles: [['target', 'Tác vụ ưu tiên', 'Ba đến năm việc'], ['chart', 'Số liệu hành vi', 'Bỏ ở bước nào'],
      ['users', 'Người dùng thử', 'Vài người mỗi vòng'], ['image', 'Nhận diện', 'Logo, màu, font']],
    assets: [['Chữ', 'Danh sách tác vụ', 'Theo mức quan trọng.'], ['Dữ liệu', 'Số liệu, phản hồi', 'Câu hỏi khách hay gặp.'],
      ['Ảnh', 'Nhận diện thương hiệu', 'Logo, màu, font.'], ['Người', 'Người thử', 'Đúng nhóm người dùng.']],
    specs: [['Khả năng truy cập', 'WCAG 2.2', 'Tiêu chuẩn W3C cho độ tương phản, nhãn, thao tác bàn phím.'],
      ['Biểu mẫu', 'Nhãn, lỗi, xác nhận', 'Hướng dẫn biểu mẫu của W3C WAI.'],
      ['Đáp ứng', 'Bố cục theo màn hình', 'Hướng dẫn thiết kế đáp ứng của web.dev.']],
    src: ['wcag', 'waiForms', 'design']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Kiểm tra cả lỗi, trống dữ liệu và màn hình nhỏ.',
    lead: 'Bản đẹp là trường hợp dễ nhất. Nhóm đầu là trạng thái, nhóm sau là thử với người thật.',
    items: [
      {key: 'empty', group: 'Trạng thái', groupColor: '#e0b3ff', label: 'Trống dữ liệu', icon: 'cart', stage: () => uiStates('empty'),
        facts: [['Cần có', 'Giải thích và gợi ý bước tiếp theo.'], ['Tránh', 'Màn hình trắng.']]},
      {key: 'error', group: 'Trạng thái', groupColor: '#e0b3ff', label: 'Lỗi', icon: 'alert', stage: () => uiStates('error'),
        facts: [['Cần có', 'Nói điều gì xảy ra, dữ liệu còn không, làm gì tiếp.'], ['Theo', 'W3C WAI: thông báo rõ, có hướng dẫn sửa.']]},
      {key: 'success', group: 'Trạng thái', groupColor: '#e0b3ff', label: 'Thành công', icon: 'check', stage: () => uiStates('success'),
        facts: [['Cần có', 'Xác nhận việc đã xong và thông tin cần giữ.'], ['Vì sao', 'Người dùng không bấm lại vì lo chưa xong.']]},
      {key: 'form', group: 'Trạng thái', groupColor: '#e0b3ff', label: 'Nhập sai trong form', icon: 'form', stage: () => contactForm('error'),
        facts: [['Cần có', 'Lỗi tại trường, giữ nội dung đã nhập.'], ['Thử', 'Bàn phím điện thoại đúng loại.']]},
      {key: 'test', group: 'Thử người dùng', groupColor: '#88e4ff', label: 'Phiên thử người dùng', icon: 'users', stage: () => usability(1),
        stageTag: 'KẾT QUẢ MẪU', facts: [['Cách làm', 'Giao tác vụ, quan sát, không gợi ý.'], ['Đọc', 'Tác vụ nhiều người không hoàn tất sửa trước.']]},
      {key: 'small', group: 'Thử người dùng', groupColor: '#88e4ff', label: 'Màn hình nhỏ', icon: 'mobile', stage: () => mobileSite('menu'),
        facts: [['Kiểm', 'Chữ đủ lớn, nút đủ rộng, không cuộn ngang.'], ['Thử', 'Điện thoại thật, một tay.']]}
    ],
    src: ['waiForms', 'wcag']
  },
  measure: {
    title: 'Đo hoàn tất tác vụ trước và sau.',
    lead: 'Bấm từng tầng. Số là một vòng thử giả định với năm người để minh họa cách đọc.',
    sample: 'Một vòng thử giả định với năm người, chỉ để minh họa cách đọc.',
    tiers: [
      ['tasks', 'Tác vụ', '20', [['Lượt thực hiện', '20', '5 người × 4 tác vụ.'], ['Cần trợ giúp', '6', 'Hỏi người điều phối.']]],
      ['done', 'Hoàn tất', '14', [['Tự hoàn tất', '14', 'Không cần gợi ý.'], ['Bỏ cuộc', '3', 'Dừng giữa chừng.']]],
      ['issues', 'Vấn đề', '5', [['Vấn đề ghi nhận', '5', 'Xếp theo mức ảnh hưởng.'], ['Đã sửa ở vòng sau', '4', 'Thử lại để xác nhận.']]]
    ],
    tips: {done: 'Một tác vụ nhiều người bỏ cuộc: xem lại luồng, không chỉ đổi chữ trên nút.',
      issues: 'Cùng vấn đề lặp lại ở vòng sau: cách sửa chưa đúng gốc.'},
    note: {label: 'THỬ THEO VÒNG NHỎ', ic: 'users', text: 'POWAI thử theo vòng nhỏ và sửa giữa các vòng, thay vì một lần thử lớn cuối dự án. Sau khi mở, đo tiếp bằng số liệu hành vi.'},
    src: ['wcag', 'gaEvents']
  },
  rollout: {
    title: 'Sáu bước từ tác vụ tới hệ thống giao diện.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi bàn giao cho lập trình.',
    steps: [['Tác vụ & dữ liệu', 'Việc người dùng đến làm, chỗ họ bỏ.', 'Danh sách ưu tiên'],
      ['Luồng', 'Bước, nhánh rẽ, lỗi.', 'Sơ đồ luồng'],
      ['Khung dây', 'Bố cục và nội dung từng màn.', 'Khung dây duyệt'],
      ['Bản mẫu', 'Giao diện và trạng thái, bấm được.', 'Bản mẫu'],
      ['Thử người dùng', 'Vài người đúng nhóm, ghi vấn đề, sửa, thử lại.', 'Báo cáo thử'],
      ['Hệ thống giao diện', 'Thành phần, quy tắc, bàn giao.', 'Thư viện thành phần']],
    icons: ['target', 'route', 'layers', 'mobile', 'users', 'layers'],
    phases: [['Hiểu', [0, 1]], ['Thiết kế', [2, 3]], ['Kiểm chứng', [4, 5]]],
    checks: ['Tác vụ ưu tiên đã chốt', 'Luồng có nhánh lỗi', 'Trạng thái đang tải', 'Trạng thái trống',
      'Trạng thái lỗi', 'Màn hình 320 px', 'Tương phản đủ theo WCAG', 'Thử với người dùng thật'],
    src: ['wcag', 'waiForms']
  },
  faq: {
    items: [
      ['UI và UX khác nhau thế nào?', 'UX là người dùng đi qua các bước ra sao và có xong việc không; UI là từng màn hình trông và phản hồi thế nào.'],
      ['Có cần thử người dùng không?', 'Nên có. Một vòng nhỏ với vài người đúng nhóm người dùng thường đã lộ ra các chỗ vướng lớn của luồng.'],
      ['Bàn giao cho lập trình viên thế nào?', 'Bản mẫu có trạng thái, thư viện thành phần và ghi chú hành vi từng thành phần.'],
      ['Có làm lại toàn bộ giao diện không?', 'Không bắt buộc. Có thể chỉ làm lại luồng đang có vấn đề và chuẩn hóa thành phần dần.'],
      ['Khả năng truy cập có cần không?', 'Có. WCAG 2.2 giúp nhiều người dùng hơn, kể cả người dùng trong điều kiện khó như nắng gắt, một tay.'],
      ['Mất bao lâu?', 'Tùy số tác vụ và vòng thử; lịch chốt sau khi có danh sách tác vụ ưu tiên.']
    ],
    topics: [['Cách làm', 'route', [0, 1, 5]], ['Bàn giao', 'layers', [2, 3, 4]]],
    src: ['wcag']
  },
  contactGoals: [['new', 'Thiết kế sản phẩm mới'], ['flow', 'Làm lại một luồng'], ['ds', 'Hệ thống giao diện'], ['test', 'Thử người dùng']],
  recap: {
    title: 'Ba việc trước khi chọn màu.',
    items: [['Luồng thao tác', 'Cả nhánh lỗi.', '#dinh-dang', 'route'],
      ['Trạng thái', 'Tải, trống, lỗi, xong.', '#muc-tieu', 'mobile'],
      ['Thử người thật', 'Theo vòng nhỏ.', '#do-luong', 'users']]
  },
  sisters: sisters('cro-toi-uu-chuyen-doi', 'website-theo-yeu-cau', 'landing-page')
};

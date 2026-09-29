// Tích hợp hệ thống — one landing page (WEBSITE_LP_PLAN.md).
import {pipeline, fieldMap, syncLog, payload, contactForm, crm, environments, leadDone} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
export {CHECKED};

export default {
  slug: 'tich-hop-he-thong',
  channel: 'webIntegrate',
  name: 'Tích hợp hệ thống',
  checked: CHECKED,
  docName: 'tài liệu OWASP, MDN và Google Analytics',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Luồng dữ liệu'),
  contact: CONTACT,
  meta: {
    title: 'Tích hợp website với CRM, API, công cụ đo lường: ánh xạ trường, xử lý lỗi, gửi lại',
    description: 'Kết nối website với CRM, công cụ đo lường hoặc hệ thống nội bộ theo khả năng API và phân quyền. '
      + 'Ánh xạ trường, xác thực, xử lý lỗi, chống trùng, nhật ký đồng bộ và kiểm thử trước bàn giao.'
  },
  hero: {
    sub: 'Khách gửi form, hồ sơ <em>về đúng nơi</em>, không trùng, không mất.',
    lead: 'Khách gửi form nhưng thông tin không về đúng CRM hoặc bị tạo trùng là lỗi tích hợp hay gặp. '
      + 'POWAI xác định dữ liệu từ form, ánh xạ trường và người nhận, xử lý xác thực, lỗi và gửi lại, ghi trạng thái và thông báo.',
    cta: 'Xem luồng dữ liệu',
    rungs: [['form', 'Nguồn', 'Form, đơn, sự kiện'], ['table', 'Ánh xạ', 'Trường ↔ trường'], ['lock', 'Xác thực', 'Khóa ở máy chủ'],
      ['repeat', 'Lỗi & gửi lại', 'Không mất bản ghi'], ['list', 'Nhật ký', 'Biết dừng ở đâu']]
  },
  when: {
    title: 'Khi dữ liệu phải chép tay giữa các hệ thống.',
    lead: 'Hợp khi form, đơn hàng, lịch hẹn trên website cần vào CRM, phần mềm bán hàng, email, bảng tính hoặc công cụ đo lường.',
    journey: [['form', 'Khách gửi form'], ['shield', 'Kiểm tra dữ liệu'], ['link', 'Gửi qua API'], ['users', 'Vào CRM, giao người'],
      ['bell', 'Báo nhân viên']],
    inputs: [['form', 'Form, đơn trên website'], ['link', 'Tài liệu API hệ thống nhận'], ['lock', 'Tài khoản kỹ thuật'], ['users', 'Quy tắc giao người']],
    core: 'Ánh xạ, kết nối, xử lý lỗi',
    outputs: [['link', 'Kết nối đã kiểm thử'], ['table', 'Bảng ánh xạ trường'], ['list', 'Nhật ký, cảnh báo']],
    fit: ['Nhân viên chép lead từ email sang CRM', 'Lead bị trùng hoặc thất lạc', 'Cần nguồn chiến dịch đi kèm lead',
      'Đơn web cần vào phần mềm bán hàng'],
    notFit: ['Hệ thống nhận không có API hoặc cách nhập tự động', 'Chưa thống nhất quy trình tiếp nhận lead',
      'Muốn đồng bộ mọi thứ hai chiều ngay từ đầu', 'Không có người theo dõi cảnh báo lỗi'],
    src: ['owaspApi', 'gaLead']
  },
  formats: {
    eyebrow: 'LUỒNG DỮ LIỆU',
    title: 'Bốn tài liệu cho một kết nối chắc.',
    lead: 'Chọn một tài liệu để xem nó trả lời câu hỏi gì.',
    whereLabel: 'Trả lời', whatLabel: 'Gồm',
    items: [
      {key: 'pipe', label: 'Sơ đồ luồng', icon: 'route', stage: () => pipeline(2), tag: 'SƠ ĐỒ MẪU',
        where: 'Dữ liệu đi qua những đâu.', what: 'Nguồn, bước kiểm tra, API, hệ thống nhận, thông báo; nhánh lỗi và trùng.'},
      {key: 'map', label: 'Ánh xạ trường', icon: 'table', stage: () => fieldMap(1), tag: 'VÍ DỤ',
        where: 'Trường nào sang trường nào.', what: 'Kiểu dữ liệu, bắt buộc hay không, chuẩn hóa (số điện thoại, ngày), khóa chống trùng.'},
      {key: 'payload', label: 'Dữ liệu gửi đi', icon: 'code', stage: () => payload(), tag: 'VÍ DỤ',
        where: 'Chính xác gửi gì.', what: 'Chỉ trường cần dùng; khóa API nằm ở máy chủ, không nằm trong mã trang.',
        more: [['Theo', 'OWASP API Security Top 10: xác thực, phân quyền theo đối tượng, giới hạn tài nguyên.']]},
      {key: 'log', label: 'Nhật ký đồng bộ', icon: 'list', stage: () => syncLog(2), tag: 'NHẬT KÝ MẪU',
        where: 'Bản ghi nào thành công, lỗi, đang thử lại.', what: 'Mã trả về, cách xử lý, người được báo khi lỗi kéo dài.',
        more: [['Mã trả về', 'Đọc theo nhóm mã trạng thái HTTP (MDN): 2xx thành công, 4xx lỗi yêu cầu, 5xx lỗi máy chủ.']]}
    ],
    src: ['owaspApi', 'mdnStatus']
  },
  prep: {
    title: 'Tài liệu API và quy tắc tiếp nhận trước.',
    lead: 'Kết nối chỉ đúng khi quy trình tiếp nhận đã rõ: lead vào đâu, ai nhận, trùng thì sao.',
    principle: 'Thử lỗi kết nối, dữ liệu thiếu và gửi trùng trước khi bàn giao. Không để lỗi kết nối làm mất lead.',
    boardLabel: 'ÁNH XẠ TRƯỜNG',
    boards: [() => fieldMap(4)],
    tiles: [['link', 'Tài liệu API', 'Hệ thống nhận'], ['lock', 'Tài khoản kỹ thuật', 'Quyền tối thiểu'],
      ['users', 'Quy tắc giao người', 'Theo khu vực, sản phẩm'], ['shield', 'Dữ liệu cá nhân', 'Thu gì, lưu đâu']],
    assets: [['Hệ thống', 'Tài liệu API', 'Giới hạn, mã lỗi.'], ['Tài khoản', 'Khóa API riêng', 'Cho môi trường thử và thật.'],
      ['Quy tắc', 'Giao người, chống trùng', 'Khóa gộp là gì.'], ['Pháp lý', 'Đồng ý liên hệ', 'Nội dung do doanh nghiệp duyệt.']],
    specs: [['Xác thực', 'Khóa ở máy chủ', 'Không đặt khóa API trong mã chạy trên trình duyệt.'],
      ['Phân quyền', 'Quyền tối thiểu', 'OWASP: lỗi phân quyền là nhóm rủi ro hàng đầu của API.'],
      ['Đo lường', 'generate_lead + nguồn', 'Gửi kèm nguồn chiến dịch để đọc hiệu quả theo kênh.']],
    src: ['owaspApi', 'gaLead']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Thử những lúc kết nối không suôn sẻ.',
    lead: 'Nhóm đầu là phía khách, nhóm sau là phía hệ thống.',
    items: [
      {key: 'form', group: 'Phía khách', groupColor: '#b8e08f', label: 'Khách nhập thiếu', icon: 'form', stage: () => contactForm('error'),
        facts: [['Cần có', 'Kiểm tra ở form và ở máy chủ.'], ['Tránh', 'Gửi bản ghi thiếu trường bắt buộc sang CRM.']]},
      {key: 'done', group: 'Phía khách', groupColor: '#b8e08f', label: 'Khách thấy đã nhận', icon: 'check', stage: () => leadDone(),
        facts: [['Cần có', 'Khách thấy xác nhận kể cả khi CRM tạm lỗi.'], ['Vì sao', 'Bản ghi đã lưu và đang chờ gửi lại.']]},
      {key: 'dup', group: 'Phía hệ thống', groupColor: '#88e4ff', label: 'Gửi trùng', icon: 'repeat', stage: () => syncLog(1),
        stageTag: 'NHẬT KÝ MẪU', facts: [['Cần có', 'Khóa gộp (ví dụ số điện thoại chuẩn hóa).'], ['Kết quả', 'Gộp vào hồ sơ cũ, ghi thêm lần liên hệ.']]},
      {key: 'down', group: 'Phía hệ thống', groupColor: '#88e4ff', label: 'CRM tạm ngừng', icon: 'alert', stage: () => syncLog(2),
        stageTag: 'NHẬT KÝ MẪU', facts: [['Cần có', 'Xếp hàng, thử lại có giãn cách.'], ['Báo', 'Người phụ trách khi lỗi kéo dài.']]},
      {key: 'auth', group: 'Phía hệ thống', groupColor: '#88e4ff', label: 'Khóa hết hạn', icon: 'lock', stage: () => syncLog(3),
        stageTag: 'NHẬT KÝ MẪU', facts: [['Cần có', 'Cảnh báo ngay, không thử lại vô ích.'], ['Phòng', 'Lịch gia hạn khóa, người giữ khóa.']]},
      {key: 'crm', group: 'Phía hệ thống', groupColor: '#88e4ff', label: 'Về đúng người', icon: 'users', stage: () => crm('qualified', ['Form website', 'Đơn web', 'Form website']),
        stageTag: 'CRM MẪU', facts: [['Cần có', 'Quy tắc giao người theo khu vực, sản phẩm.'], ['Thử', 'Mỗi quy tắc một bản ghi thử.']]}
    ],
    src: ['mdnStatus', 'owaspApi']
  },
  measure: {
    title: 'Đo kết nối bằng bản ghi tới nơi.',
    lead: 'Bấm từng tầng. Số là một tháng giả định để minh họa cách đọc.',
    tiers: [
      ['sent', 'Gửi đi', '420', [['Form gửi thành công', '420', 'Trên website.'], ['Bản ghi tạo', '420', 'Trong hàng đợi.']]],
      ['synced', 'Tới CRM', '416', [['Đồng bộ thành công', '404', 'Lần đầu.'], ['Thành công sau thử lại', '12', 'Lỗi tạm thời.']]],
      ['handled', 'Được xử lý', '398', [['Có người nhận', '398', 'Theo quy tắc giao.'], ['Gộp trùng', '18', 'Cùng số điện thoại.']]]
    ],
    tips: {synced: 'Gửi đi nhiều hơn tới CRM: xem nhật ký lỗi 4xx, thường do trường thiếu hoặc sai định dạng.',
      handled: 'Nhiều bản ghi không có người nhận: quy tắc giao người thiếu trường hợp.'},
    note: {label: 'ĐỐI SOÁT HẰNG TUẦN', ic: 'table', text: 'So số form thành công trên website với số bản ghi trong CRM. Chênh lệch là bản ghi cần tìm trong nhật ký.'},
    src: ['gaLead', 'mdnStatus']
  },
  rollout: {
    title: 'Sáu bước từ ánh xạ tới vận hành.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi bật kết nối thật.',
    steps: [['Khảo sát', 'Nguồn, hệ thống nhận, API, quy tắc tiếp nhận.', 'Sơ đồ luồng'],
      ['Ánh xạ trường', 'Kiểu, bắt buộc, chuẩn hóa, khóa gộp.', 'Bảng ánh xạ'],
      ['Kết nối trên môi trường thử', 'Khóa riêng cho thử nghiệm.', 'Kết nối thử'],
      ['Kiểm thử lỗi', 'Thiếu trường, trùng, tạm ngừng, hết hạn khóa.', 'Biên bản kiểm thử'],
      ['Bật thật & theo dõi', 'Nhật ký, cảnh báo, đối soát tuần đầu.', 'Nhật ký tuần đầu'],
      ['Bàn giao', 'Tài liệu, người giữ khóa, cách xử lý lỗi.', 'Tài liệu vận hành']],
    icons: ['search', 'table', 'link', 'alert', 'bell', 'file'],
    phases: [['Thiết kế', [0, 1]], ['Kết nối', [2, 3]], ['Vận hành', [4, 5]]],
    checks: ['Khóa API ở máy chủ', 'Quyền tài khoản tối thiểu', 'Kiểm tra dữ liệu ở máy chủ', 'Chuẩn hóa số điện thoại',
      'Chống trùng bằng khóa gộp', 'Thử lại khi lỗi tạm thời', 'Cảnh báo khi lỗi kéo dài', 'Đối soát website ↔ CRM'],
    src: ['owaspApi', 'mdnStatus']
  },
  faq: {
    items: [
      ['Kết nối được với CRM nào?', 'Hệ thống có API hoặc cách nhập tự động. POWAI đọc tài liệu API trước khi báo phạm vi.'],
      ['Có dùng công cụ tự động hóa có sẵn không?', 'Được, nếu đáp ứng yêu cầu lỗi, trùng và bảo mật; có trường hợp cần viết kết nối riêng.'],
      ['Lỡ CRM lỗi thì lead có mất?', 'Không nếu thiết kế đúng: bản ghi lưu lại, thử lại và báo người phụ trách.'],
      ['Có đồng bộ hai chiều không?', 'Có thể, nhưng phức tạp hơn nhiều; thường bắt đầu một chiều và mở rộng sau.'],
      ['Dữ liệu cá nhân xử lý ra sao?', 'Chỉ gửi trường cần dùng, lưu ở nơi có phân quyền; nội dung đồng ý và yêu cầu pháp lý do doanh nghiệp duyệt.'],
      ['Ai theo dõi sau bàn giao?', 'Người được giao nhận cảnh báo; có thể gộp vào phạm vi bảo trì.']
    ],
    topics: [['Khả năng', 'link', [0, 1, 3]], ['An toàn', 'shield', [2, 4, 5]]],
    src: ['owaspApi']
  },
  contactGoals: [['crm', 'Form → CRM'], ['orders', 'Đơn web → phần mềm bán hàng'], ['tracking', 'Đo lường, nguồn chiến dịch'], ['fix', 'Sửa kết nối đang lỗi']],
  recap: {
    title: 'Ba việc cho một kết nối không mất dữ liệu.',
    items: [['Ánh xạ trường', 'Kể cả khóa gộp.', '#dinh-dang', 'table'],
      ['Thử lỗi trước', 'Thiếu, trùng, ngừng.', '#muc-tieu', 'alert'],
      ['Đối soát', 'Website ↔ CRM.', '#do-luong', 'list']]
  },
  sisters: sisters('website-theo-yeu-cau', 'website-ban-hang', 'bao-tri-website')
};

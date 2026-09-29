// Website theo yêu cầu — one landing page (WEBSITE_LP_PLAN.md).
import {userStory, modules, environments, roles, flow, uiStates, fieldMap, syncLog} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
import {withExtra} from './extra.mjs';
export {CHECKED};

export default withExtra({
  slug: 'website-theo-yeu-cau',
  channel: 'webCustom',
  name: 'Website theo yêu cầu',
  checked: CHECKED,
  docName: 'tài liệu W3C, OWASP và web.dev',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Cách đặc tả'),
  contact: CONTACT,
  meta: {
    title: 'Website, ứng dụng web theo yêu cầu: đặc tả, module, phân quyền, kiểm thử',
    description: 'Khi nghiệp vụ riêng không giải quyết được bằng mẫu website: làm rõ câu chuyện người dùng, tách module, phân quyền, '
      + 'môi trường thử nghiệm và tiêu chí nghiệm thu trước khi chọn công nghệ.'
  },
  hero: {
    sub: 'Làm rõ <em>nghiệp vụ</em> trước, chọn công nghệ sau.',
    lead: 'Quy trình riêng, nhiều vai trò người dùng, dữ liệu nối với hệ thống nội bộ: những thứ mẫu website thông thường không làm được. '
      + 'Mỗi chức năng có câu chuyện người dùng, điều kiện chấp nhận và phần ngoài phạm vi rõ ràng.',
    cta: 'Xem cách đặc tả',
    rungs: [['person', 'Câu chuyện', 'Ai, muốn gì, để làm gì'], ['layers', 'Module', 'Tách theo nghiệp vụ'], ['shield', 'Phân quyền', 'Theo vai trò'],
      ['route', 'Môi trường', 'Thử trước khi chạy'], ['check', 'Nghiệm thu', 'Theo điều kiện đã chốt']]
  },
  when: {
    title: 'Khi quy trình của bạn không giống ai.',
    lead: 'Hợp với cổng khách hàng, hệ thống đặt lịch, quản lý đơn nội bộ, công cụ báo giá. Cần người nắm nghiệp vụ tham gia suốt dự án.',
    journey: [['users', 'Liệt kê vai trò'], ['person', 'Viết câu chuyện người dùng'], ['layers', 'Tách module'], ['code', 'Làm theo từng đợt'],
      ['check', 'Nghiệm thu từng module']],
    inputs: [['file', 'Quy trình hiện tại'], ['users', 'Vai trò, số người dùng'], ['table', 'Dữ liệu, biểu mẫu đang dùng'], ['link', 'Hệ thống cần nối']],
    core: 'Đặc tả, thiết kế, phát triển theo đợt',
    outputs: [['file', 'Đặc tả chức năng'], ['globe', 'Ứng dụng đã kiểm thử'], ['shield', 'Tài liệu quyền, dữ liệu']],
    fit: ['Đang làm bằng bảng tính, tin nhắn, giấy tờ', 'Nhiều vai trò cần thấy dữ liệu khác nhau', 'Cần nối với CRM, kho, kế toán',
      'Có người nghiệp vụ duyệt từng đợt'],
    notFit: ['Nhu cầu giới thiệu, bán hàng thông thường', 'Chưa rõ quy trình, muốn "làm rồi tính"',
      'Không có người duyệt đặc tả', 'Cần xong toàn bộ trong một lần bàn giao'],
    src: ['owaspApi', 'wcag']
  },
  formats: {
    eyebrow: 'CÁCH ĐẶC TẢ',
    title: 'Năm tài liệu trước khi viết mã.',
    lead: 'Chọn một tài liệu để xem nó trả lời câu hỏi gì.',
    whereLabel: 'Trả lời', whatLabel: 'Gồm',
    items: [
      {key: 'story', label: 'Câu chuyện người dùng', icon: 'person', stage: () => userStory(), tag: 'ĐẶC TẢ MẪU',
        where: 'Ai cần gì, để làm gì.', what: 'Câu chuyện, điều kiện chấp nhận, phần ngoài phạm vi.'},
      {key: 'modules', label: 'Bản đồ module', icon: 'layers', stage: () => modules(1), tag: 'ĐẶC TẢ MẪU',
        where: 'Hệ thống gồm những phần nào.', what: 'Module, dữ liệu mỗi module giữ, module nào gọi module nào.'},
      {key: 'flow', label: 'Luồng thao tác', icon: 'route', stage: () => flow(2), tag: 'ĐẶC TẢ MẪU',
        where: 'Người dùng đi qua những bước nào.', what: 'Bước chính, nhánh rẽ, lỗi và cách quay lại.'},
      {key: 'roles', label: 'Ma trận quyền', icon: 'shield', stage: () => roles(2, 'app'), tag: 'VÍ DỤ QUYỀN',
        where: 'Vai trò nào được làm gì.', what: 'Quyền theo vai trò và theo từng bản ghi; kiểm tra ở máy chủ, không chỉ ẩn nút.',
        more: [['Theo', 'OWASP xếp lỗi phân quyền ở nhóm rủi ro hàng đầu của API.']]},
      {key: 'env', label: 'Môi trường', icon: 'globe', stage: () => environments(1), tag: 'QUY TRÌNH',
        where: 'Thử ở đâu, phát hành thế nào.', what: 'Phát triển, thử nghiệm, chính thức; mỗi lần phát hành có ghi chú.'}
    ],
    src: ['owaspApi', 'waiForms']
  },
  prep: {
    title: 'Người nắm nghiệp vụ là tài nguyên quan trọng nhất.',
    lead: 'Đặc tả chỉ đúng khi người làm việc đó hằng ngày cùng viết và duyệt.',
    principle: 'Mỗi chức năng có điều kiện chấp nhận viết trước. Không có điều kiện thì chưa làm.',
    boardLabel: 'ĐẶC TẢ MẪU',
    boards: [() => userStory()],
    tiles: [['users', 'Người nghiệp vụ', 'Duyệt từng đợt'], ['table', 'Mẫu dữ liệu thật', 'Đã ẩn thông tin cá nhân'],
      ['link', 'Tài liệu API', 'Hệ thống cần nối'], ['shield', 'Yêu cầu dữ liệu', 'Ai được xem gì']],
    assets: [['Chữ', 'Quy trình hiện tại', 'Kể cả ngoại lệ.'], ['Dữ liệu', 'Biểu mẫu, bảng tính', 'Đang dùng hằng ngày.'],
      ['Hệ thống', 'Tài liệu API', 'CRM, kho, kế toán.'], ['Quyết định', 'Người duyệt', 'Mỗi module một người.']],
    specs: [['Phân quyền', 'Kiểm tra ở máy chủ', 'OWASP API Top 10: kiểm soát truy cập theo đối tượng và chức năng.'],
      ['Biểu mẫu', 'Nhãn, lỗi, xác nhận', 'Hướng dẫn biểu mẫu của W3C WAI.'],
      ['Khả năng truy cập', 'WCAG 2.2', 'Thao tác bằng bàn phím, tương phản, nhãn.']],
    src: ['owaspApi', 'waiForms', 'wcag']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Thử luồng chính cùng ngoại lệ.',
    lead: 'Mỗi chức năng thử cả khi dữ liệu trống, lỗi, và khi người dùng không đủ quyền.',
    items: [
      {key: 'empty', group: 'Trạng thái', groupColor: '#b9a8f2', label: 'Chưa có dữ liệu', icon: 'file', stage: () => uiStates('empty'),
        facts: [['Cần có', 'Nói rõ vì sao trống và làm gì tiếp.'], ['Tránh', 'Màn hình trắng không giải thích.']]},
      {key: 'error', group: 'Trạng thái', groupColor: '#b9a8f2', label: 'Lỗi tải', icon: 'alert', stage: () => uiStates('error'),
        facts: [['Cần có', 'Thông báo dễ hiểu, cách thử lại, dữ liệu không mất.'], ['Ghi', 'Lỗi vào nhật ký cho kỹ thuật.']]},
      {key: 'perm', group: 'Trạng thái', groupColor: '#b9a8f2', label: 'Không đủ quyền', icon: 'shield', stage: () => uiStates('denied'),
        facts: [['Cần có', 'Máy chủ từ chối, không chỉ ẩn nút.'], ['Thử', 'Gọi thẳng đường dẫn bằng tài khoản thấp quyền.']]},
      {key: 'map', group: 'Kết nối', groupColor: '#88e4ff', label: 'Dữ liệu sang hệ thống khác', icon: 'link', stage: () => fieldMap(1),
        facts: [['Cần có', 'Ánh xạ trường, quy tắc bắt buộc.'], ['Thử', 'Thiếu trường, sai định dạng.']]},
      {key: 'log', group: 'Kết nối', groupColor: '#88e4ff', label: 'Kết nối lỗi', icon: 'repeat', stage: () => syncLog(2),
        stageTag: 'NHẬT KÝ MẪU', facts: [['Cần có', 'Thử lại, báo người phụ trách.'], ['Tránh', 'Mất bản ghi khi hệ thống kia tạm ngừng.']]}
    ],
    src: ['owaspApi', 'mdnStatus']
  },
  measure: {
    title: 'Đo tiến độ bằng chức năng đã nghiệm thu.',
    lead: 'Bấm từng tầng. Số là một dự án giả định để minh họa cách đọc.',
    sample: 'Một dự án giả định, chỉ để minh họa cách đọc.',
    tiers: [
      ['scope', 'Phạm vi', '42', [['Câu chuyện người dùng', '42', 'Đã có điều kiện chấp nhận.'], ['Ngoài phạm vi', '9', 'Ghi rõ, để đợt sau.']]],
      ['built', 'Đã làm', '30', [['Hoàn thành', '30', 'Trên môi trường thử nghiệm.'], ['Lỗi mở', '6', 'Theo mức ảnh hưởng.']]],
      ['accepted', 'Nghiệm thu', '26', [['Được duyệt', '26', 'Người nghiệp vụ xác nhận.'], ['Cần sửa', '4', 'Chưa đạt điều kiện.']]]
    ],
    tips: {built: 'Lỗi mở tăng nhanh: dừng làm chức năng mới, sửa lỗi ảnh hưởng người dùng trước.',
      accepted: 'Nhiều chức năng "cần sửa": điều kiện chấp nhận viết chưa đủ rõ.'},
    note: {label: 'LÀM THEO ĐỢT', ic: 'calendar', text: 'Mỗi đợt bàn giao vài module dùng được, thay vì chờ toàn bộ. Phản hồi đợt trước điều chỉnh đợt sau.'},
    src: ['owaspApi', 'wcag']
  },
  rollout: {
    title: 'Sáu bước, bàn giao theo đợt.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước mỗi lần phát hành.',
    steps: [['Khảo sát', 'Vai trò, quy trình, dữ liệu, hệ thống.', 'Báo cáo khảo sát'],
      ['Đặc tả', 'Câu chuyện, module, quyền, ngoài phạm vi.', 'Tài liệu đặc tả'],
      ['Bản mẫu', 'Luồng chính và trạng thái.', 'Bản mẫu bấm được'],
      ['Phát triển theo đợt', 'Mỗi đợt vài module.', 'Bản thử nghiệm'],
      ['Nghiệm thu', 'Theo điều kiện đã chốt.', 'Biên bản'],
      ['Phát hành & bàn giao', 'Ghi chú phát hành, tài liệu.', 'Hệ thống, tài liệu']],
    icons: ['search', 'file', 'mobile', 'code', 'check', 'globe'],
    phases: [['Làm rõ', [0, 1, 2]], ['Xây dựng', [3, 4]], ['Phát hành', [5]]],
    checks: ['Mỗi chức năng có điều kiện chấp nhận', 'Phần ngoài phạm vi ghi rõ', 'Quyền kiểm tra ở máy chủ', 'Trạng thái trống, lỗi, tải',
      'Thử bằng tài khoản thấp quyền', 'Có môi trường thử nghiệm', 'Ghi chú mỗi lần phát hành', 'Tài liệu chức năng bàn giao'],
    src: ['owaspApi', 'waiForms']
  },
  faq: {
    items: [
      ['Chọn công nghệ gì?', 'Sau khi có đặc tả: dựa trên nghiệp vụ, hệ thống cần nối, đội vận hành và ngân sách duy trì.'],
      ['Chi phí tính thế nào?', 'Theo số module, vai trò, kết nối và độ phức tạp; báo giá sau khi có đặc tả, không theo số trang.'],
      ['Có sửa được sau khi bàn giao?', 'Có. Thay đổi đi qua môi trường thử nghiệm, có ghi chú phát hành.'],
      ['Mã nguồn thuộc về ai?', 'Thỏa thuận trong hợp đồng; POWAI khuyến nghị bàn giao mã nguồn và tài liệu cho doanh nghiệp.'],
      ['Có làm dần được không?', 'Nên làm dần: đợt đầu các module quan trọng nhất, dùng thật rồi mới làm tiếp.'],
      ['Dữ liệu cá nhân xử lý ra sao?', 'Chỉ thu dữ liệu cần dùng, phân quyền xem; yêu cầu pháp lý cụ thể nên hỏi ý kiến pháp chế của doanh nghiệp.']
    ],
    topics: [['Phạm vi', 'layers', [0, 1, 4]], ['Sau bàn giao', 'shield', [2, 3, 5]]],
    src: ['owaspApi']
  },
  contactGoals: [['portal', 'Cổng khách hàng'], ['internal', 'Công cụ nội bộ'], ['booking', 'Đặt lịch, đặt chỗ'], ['replace', 'Thay bảng tính, giấy tờ']],
  recap: {
    title: 'Ba việc trước khi viết mã.',
    items: [['Câu chuyện người dùng', 'Có điều kiện chấp nhận.', '#dinh-dang', 'person'],
      ['Quyền ở máy chủ', 'Không chỉ ẩn nút.', '#muc-tieu', 'shield'],
      ['Làm theo đợt', 'Dùng thật rồi làm tiếp.', '#trien-khai', 'route']]
  },
  sisters: sisters('tich-hop-he-thong', 'ui-ux', 'bao-tri-website')
});

// Bảo trì Website — one landing page (WEBSITE_LP_PLAN.md).
import {backups, updates, uptime, careReport, environments, contactForm, vitals, media} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
import {withExtra} from './extra.mjs';
export {CHECKED};

export default withExtra({
  slug: 'bao-tri-website',
  channel: 'webCare',
  name: 'Bảo trì Website',
  checked: CHECKED,
  docName: 'tài liệu WordPress.org, MDN và web.dev',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Việc bảo trì'),
  contact: CONTACT,
  meta: {
    title: 'Bảo trì website: sao lưu, cập nhật, theo dõi sự cố, báo cáo hằng tháng',
    description: 'Rà soát cập nhật, sao lưu và hạng mục kỹ thuật cần xử lý trong phạm vi bảo trì thống nhất. '
      + 'Sao lưu đã thử khôi phục, cập nhật an toàn, theo dõi form và sự cố, báo cáo tháng.'
  },
  hero: {
    sub: 'Cập nhật không làm <em>mất nội dung</em>, sự cố không làm mất khách.',
    lead: 'Một lần cập nhật lỗi hoặc một sự cố hosting có thể làm mất nội dung và gián đoạn liên hệ. '
      + 'Bảo trì có checklist sao lưu, cập nhật và khôi phục; có bản sao lưu dùng được và người tiếp nhận sự cố theo phạm vi.',
    cta: 'Xem việc bảo trì',
    rungs: [['shield', 'Sao lưu', 'Đã thử khôi phục'], ['repeat', 'Cập nhật', 'Thử trước, rà sau'], ['form', 'Thử form', 'Mỗi tuần'],
      ['bell', 'Sự cố', 'Có người nhận'], ['receipt', 'Báo cáo', 'Mỗi tháng']]
  },
  when: {
    title: 'Khi website đang chạy và đang mang khách về.',
    lead: 'Website càng quan trọng với việc bán hàng thì càng cần người theo dõi. Phạm vi bảo trì ghi rõ việc gì làm định kỳ, việc gì tính riêng.',
    journey: [['shield', 'Sao lưu định kỳ'], ['repeat', 'Cập nhật có kiểm tra'], ['form', 'Thử form, liên kết'], ['bell', 'Phát hiện sự cố'],
      ['receipt', 'Báo cáo tháng']],
    inputs: [['globe', 'Quyền hosting, tên miền'], ['code', 'Quyền quản trị website'], ['list', 'Danh sách chức năng quan trọng'], ['users', 'Người nhận báo cáo']],
    core: 'Sao lưu, cập nhật, theo dõi, xử lý',
    outputs: [['shield', 'Bản sao lưu dùng được'], ['check', 'Website cập nhật'], ['receipt', 'Báo cáo tháng']],
    fit: ['Website nhận form, đơn hàng hằng ngày', 'Không có kỹ thuật nội bộ', 'Từng mất nội dung hoặc bị lỗi sau cập nhật',
      'Dùng nhiều plugin, tích hợp'],
    notFit: ['Cần thêm chức năng mới lớn: tính theo dự án', 'Không cấp được quyền hosting',
      'Muốn sửa nội dung hằng ngày thay đội ngũ', 'Website sắp làm lại toàn bộ'],
    src: ['wpBackup', 'wpUpdate']
  },
  formats: {
    eyebrow: 'VIỆC BẢO TRÌ',
    title: 'Năm việc làm định kỳ.',
    lead: 'Chọn một việc để xem làm gì và bạn nhận được gì.',
    whereLabel: 'Làm gì', whatLabel: 'Bạn nhận',
    items: [
      {key: 'backup', label: 'Sao lưu', icon: 'shield', stage: () => backups(0), tag: 'NHẬT KÝ MẪU',
        where: 'Tệp và cơ sở dữ liệu, lưu ở nơi tách khỏi máy chủ.', what: 'Nhật ký sao lưu và lần thử khôi phục gần nhất.',
        more: [['Theo', 'WordPress khuyên giữ nhiều bản sao lưu ở nhiều nơi khác nhau.']]},
      {key: 'update', label: 'Cập nhật', icon: 'repeat', stage: () => updates(1), tag: 'QUẢN TRỊ',
        where: 'Lõi, plugin, giao diện, thư viện.', what: 'Danh sách đã cập nhật; bản lớn thử trên bản sao trước.'},
      {key: 'watch', label: 'Theo dõi sự cố', icon: 'bell', stage: () => uptime(), tag: 'NHẬT KÝ MẪU',
        where: 'Website có mở được, form có gửi được.', what: 'Nhật ký sự cố: nguyên nhân, cách xử lý, cách phòng lặp lại.'},
      {key: 'env', label: 'Bản sao thử nghiệm', icon: 'route', stage: () => environments(1), tag: 'QUY TRÌNH',
        where: 'Nơi thử thay đổi trước khi làm trên bản thật.', what: 'Thay đổi rủi ro không làm thẳng trên website đang chạy.'},
      {key: 'report', label: 'Báo cáo tháng', icon: 'receipt', stage: () => careReport(), tag: 'BÁO CÁO MẪU',
        where: 'Tổng hợp việc đã làm.', what: 'Đã làm gì, còn gì, cần doanh nghiệp quyết định gì.'}
    ],
    src: ['wpBackup', 'wpUpdate', 'wpUpgrade']
  },
  prep: {
    title: 'Bàn giao quyền và danh sách việc quan trọng.',
    lead: 'Bảo trì cần biết chức năng nào không được phép hỏng.',
    principle: 'Bản sao lưu chỉ có giá trị khi đã thử khôi phục được. Mỗi tháng thử ít nhất một lần trên bản sao.',
    boardLabel: 'NHẬT KÝ SAO LƯU',
    boards: [() => backups(3)],
    tiles: [['globe', 'Quyền hosting', 'Tệp, cơ sở dữ liệu'], ['code', 'Quyền quản trị', 'Tài khoản riêng'],
      ['list', 'Chức năng quan trọng', 'Form, giỏ, thanh toán'], ['bell', 'Người nhận báo', 'Khi có sự cố']],
    assets: [['Hệ thống', 'Hosting, tên miền', 'Ngày hết hạn.'], ['Danh sách', 'Plugin, giấy phép', 'Ngày gia hạn.'],
      ['Chữ', 'Phạm vi bảo trì', 'Việc định kỳ, việc tính riêng.'], ['Liên hệ', 'Người nhận báo cáo', 'Và người quyết định.']],
    specs: [['Sao lưu', 'Tệp + cơ sở dữ liệu', 'Cần cả hai để khôi phục đầy đủ một website WordPress.'],
      ['Trước cập nhật', 'Sao lưu trước', 'Tài liệu cập nhật WordPress nhắc sao lưu trước khi cập nhật.'],
      ['Bộ nhớ đệm', 'Cache-Control', 'Sau cập nhật giao diện, kiểm tra bộ nhớ đệm để khách thấy bản mới (MDN).']],
    src: ['wpBackup', 'wpUpdate', 'caching']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Những sự cố bảo trì phải bắt được.',
    lead: 'Nhóm đầu là sự cố khách thấy ngay, nhóm sau là thứ âm thầm xấu đi.',
    items: [
      {key: 'form', group: 'Khách thấy ngay', groupColor: '#9fe0c9', label: 'Form không gửi được', icon: 'form', stage: () => contactForm('error'),
        facts: [['Bắt bằng', 'Thử form định kỳ, theo dõi sự kiện gửi thành công.'], ['Xử lý', 'Khôi phục, sửa, báo lại số lead có thể đã mất.']]},
      {key: 'down', group: 'Khách thấy ngay', groupColor: '#9fe0c9', label: 'Website không mở được', icon: 'alert', stage: () => uptime(),
        stageTag: 'NHẬT KÝ MẪU', facts: [['Bắt bằng', 'Công cụ theo dõi tình trạng.'], ['Xử lý', 'Liên hệ hosting, khôi phục bản sao lưu nếu cần.']]},
      {key: 'update', group: 'Khách thấy ngay', groupColor: '#9fe0c9', label: 'Lỗi sau cập nhật', icon: 'repeat', stage: () => updates(1),
        stageTag: 'QUẢN TRỊ', facts: [['Phòng', 'Thử trên bản sao, rà trang và form sau cập nhật.'], ['Xử lý', 'Quay lại bản trước.']]},
      {key: 'slow', group: 'Âm thầm xấu đi', groupColor: '#88e4ff', label: 'Trang chậm dần', icon: 'bolt', stage: () => vitals('before'),
        facts: [['Nguyên nhân hay gặp', 'Ảnh mới chưa nén, thêm mã bên thứ ba.'], ['Bắt bằng', 'Đo định kỳ trên điện thoại.']]},
      {key: 'media', group: 'Âm thầm xấu đi', groupColor: '#88e4ff', label: 'Ảnh nặng được tải lên', icon: 'image', stage: () => media(),
        stageTag: 'QUẢN TRỊ', facts: [['Bắt bằng', 'Rà thư viện hằng tháng.'], ['Phòng', 'Giới hạn kích thước khi tải lên.']]}
    ],
    src: ['wpBackup', 'vitals']
  },
  measure: {
    title: 'Đo bảo trì bằng thứ doanh nghiệp quan tâm.',
    lead: 'Bấm từng tầng. Số là một tháng giả định để minh họa cách đọc.',
    tiers: [
      ['backup', 'Sao lưu', '30', [['Bản sao lưu', '30', 'Hằng ngày.'], ['Thử khôi phục', '1', 'Trên bản sao.']]],
      ['update', 'Cập nhật', '7', [['Thành phần cập nhật', '7', 'Lõi, plugin, giao diện.'], ['Lỗi sau cập nhật', '1', 'Đã khôi phục.']]],
      ['incident', 'Sự cố', '2', [['Sự cố ghi nhận', '2', 'Có nguyên nhân.'], ['Thời gian xử lý', '40 phút', 'Từ lúc phát hiện.']]]
    ],
    tips: {update: 'Lỗi sau cập nhật lặp lại ở cùng plugin: đề xuất thay hoặc bỏ plugin đó.',
      incident: 'Sự cố phát hiện muộn: thêm theo dõi tự động cho form và trang quan trọng.'},
    note: {label: 'PHẠM VI GHI RÕ', ic: 'file', text: 'Việc định kỳ (sao lưu, cập nhật, theo dõi) tách với việc phát sinh (chức năng mới, sửa giao diện). Hai loại việc có cách tính riêng.'},
    src: ['wpBackup', 'wpUpdate']
  },
  rollout: {
    title: 'Năm bước để bắt đầu bảo trì.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra mỗi tháng.',
    steps: [['Tiếp nhận', 'Quyền, danh sách chức năng quan trọng.', 'Biên bản tiếp nhận'],
      ['Rà hiện trạng', 'Phiên bản, plugin, sao lưu, tốc độ.', 'Báo cáo hiện trạng'],
      ['Thiết lập', 'Sao lưu tự động ngoài máy chủ, theo dõi.', 'Lịch sao lưu'],
      ['Thử khôi phục', 'Khôi phục lên bản sao, kiểm tra.', 'Biên bản thử'],
      ['Định kỳ & báo cáo', 'Cập nhật, thử form, báo cáo tháng.', 'Báo cáo tháng']],
    icons: ['users', 'search', 'shield', 'repeat', 'receipt'],
    phases: [['Tiếp nhận', [0, 1]], ['Thiết lập', [2, 3]], ['Hằng tháng', [4]]],
    checks: ['Sao lưu tệp + cơ sở dữ liệu', 'Bản sao lưu ngoài máy chủ', 'Thử khôi phục trong tháng', 'Cập nhật bản vá bảo mật',
      'Bản lớn thử trên bản sao', 'Thử form sau cập nhật', 'Rà liên kết hỏng', 'Báo cáo gửi người quyết định'],
    src: ['wpBackup', 'wpUpdate']
  },
  faq: {
    items: [
      ['Bảo trì gồm những gì?', 'Sao lưu, cập nhật, theo dõi sự cố, thử form, báo cáo tháng. Phạm vi chi tiết thống nhất trong hợp đồng.'],
      ['Sửa nội dung có nằm trong bảo trì?', 'Tùy gói. Thường có một lượng giờ nhỏ cho sửa nội dung; chức năng mới tính riêng.'],
      ['Website không làm bằng WordPress thì sao?', 'Vẫn bảo trì được, cách sao lưu và cập nhật theo công nghệ website đang dùng.'],
      ['Sự cố ngoài giờ ai xử lý?', 'Theo phạm vi đã thống nhất: kênh báo, thời gian phản hồi và người tiếp nhận ghi rõ.'],
      ['Có cần bảo trì nếu website ít thay đổi?', 'Có. Hệ thống, plugin và chứng chỉ vẫn cần cập nhật; sao lưu vẫn cần thử khôi phục.'],
      ['Hosting có do POWAI quản lý?', 'Có thể hỗ trợ; tài khoản hosting và tên miền nên đứng tên doanh nghiệp.']
    ],
    topics: [['Phạm vi', 'file', [0, 1, 3]], ['Hệ thống', 'globe', [2, 4, 5]]],
    src: ['wpBackup', 'wpUpdate']
  },
  contactGoals: [['care', 'Bảo trì định kỳ'], ['incident', 'Đang có sự cố'], ['backup', 'Thiết lập sao lưu'], ['audit', 'Rà soát hiện trạng']],
  recap: {
    title: 'Ba việc để ngủ ngon.',
    items: [['Sao lưu đã thử', 'Khôi phục được thật.', '#dinh-dang', 'shield'],
      ['Cập nhật có kiểm tra', 'Thử trước, rà sau.', '#muc-tieu', 'repeat'],
      ['Có người nhận sự cố', 'Và báo cáo tháng.', '#do-luong', 'bell']]
  },
  sisters: sisters('wordpress', 'toi-uu-toc-do', 'tich-hop-he-thong')
});

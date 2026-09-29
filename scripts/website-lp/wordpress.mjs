// WordPress — one landing page (WEBSITE_LP_PLAN.md). Default roles, backup
// and update advice from the WordPress.org documentation in sources.mjs.
import {editor, media, updates, roles, backups, homePage, mobileSite, uptime} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
import {withExtra} from './extra.mjs';
export {CHECKED};

export default withExtra({
  slug: 'wordpress',
  channel: 'webWp',
  name: 'WordPress',
  checked: CHECKED,
  docName: 'tài liệu WordPress.org',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Phần quản trị'),
  contact: CONTACT,
  meta: {
    title: 'Website WordPress: dựng mới, sắp xếp nội dung, phân quyền, cập nhật an toàn',
    description: 'Xây hoặc cải tiến website WordPress với cấu trúc nội dung, mẫu trang dễ sửa, phân quyền tài khoản và quy trình sao lưu, cập nhật. '
      + 'Cần chuẩn bị gì, đo gì và POWAI triển khai thế nào.'
  },
  hero: {
    sub: 'Nhân sự tự sửa nội dung mà <em>không phá bố cục</em> đã duyệt.',
    lead: 'Website khó cập nhật, hoặc thay plugin làm chức năng chập chờn, là hai vấn đề hay gặp với WordPress. '
      + 'POWAI tổ chức mẫu trang dễ sửa, chuẩn hóa bài viết, quản lý ảnh và quyền, thử duyệt, xuất bản và khôi phục.',
    cta: 'Xem phần quản trị',
    rungs: [['file', 'Mẫu trang', 'Khối có sẵn kiểu'], ['list', 'Bài viết', 'Chuyên mục rõ'], ['image', 'Thư viện', 'Ảnh đã nén, có alt'],
      ['users', 'Phân quyền', 'Đúng vai trò'], ['shield', 'Cập nhật', 'Sao lưu trước']]
  },
  when: {
    title: 'Khi đội ngũ cần tự đăng bài, sửa trang mỗi tuần.',
    lead: 'WordPress hợp với website nội dung, giới thiệu, tin tức, cửa hàng vừa và nhỏ. Cần người chịu trách nhiệm cập nhật hệ thống.',
    journey: [['person', 'Nhân sự đăng nhập'], ['file', 'Mở mẫu trang'], ['image', 'Sửa chữ, thay ảnh'], ['eye', 'Xem trước trên điện thoại'],
      ['check', 'Xuất bản']],
    inputs: [['globe', 'Website hiện tại, hosting'], ['list', 'Danh sách plugin đang dùng'], ['users', 'Ai sửa gì'], ['file', 'Nội dung, ảnh']],
    core: 'Cấu trúc nội dung, mẫu trang, phân quyền',
    outputs: [['layers', 'Mẫu trang dễ sửa'], ['users', 'Tài khoản đúng quyền'], ['file', 'Hướng dẫn quản trị']],
    fit: ['Nhiều người cùng đăng bài, sửa trang', 'Website WordPress hiện tại khó sửa hoặc hay lỗi', 'Cần blog, tin tức, trang dịch vụ',
      'Muốn chủ động nội dung, không phụ thuộc lập trình viên'],
    notFit: ['Nghiệp vụ riêng phức tạp: xem Website theo yêu cầu', 'Không ai theo dõi cập nhật hệ thống',
      'Muốn cài thêm plugin cho mọi nhu cầu nhỏ', 'Chỉ cần một trang chiến dịch'],
    src: ['wpAdmin', 'wpEditor']
  },
  formats: {
    eyebrow: 'PHẦN QUẢN TRỊ',
    title: 'Bốn màn hình nhân sự dùng hằng tuần.',
    lead: 'Mô phỏng trình quản trị, không phải giao diện thật. Chọn một màn hình để xem POWAI sắp xếp gì ở đó.',
    whereLabel: 'Dùng để', whatLabel: 'POWAI sắp xếp',
    items: [
      {key: 'editor', label: 'Soạn trang', icon: 'file', stage: () => editor(), tag: 'QUẢN TRỊ',
        where: 'Sửa trang dịch vụ, trang giới thiệu.', what: 'Mẫu trang dựng từ khối có sẵn kiểu chữ, màu; người sửa chỉ đổi nội dung.',
        more: [['Theo', 'Trình soạn khối (block editor) của WordPress.']]},
      {key: 'media', label: 'Thư viện ảnh', icon: 'image', stage: () => media(), tag: 'QUẢN TRỊ',
        where: 'Tải và chọn ảnh cho bài, trang.', what: 'Đặt tên file, kích thước, văn bản thay thế; ảnh nặng được đánh dấu cần nén.'},
      {key: 'roles', label: 'Người dùng & quyền', icon: 'users', stage: () => roles(1), tag: 'QUẢN TRỊ',
        where: 'Ai được làm gì.', what: 'Nhân sự nội dung dùng Biên tập viên hoặc Tác giả; ít tài khoản Quản trị viên.',
        more: [['Theo', 'Vai trò mặc định WordPress: Quản trị viên, Biên tập viên, Tác giả, Cộng tác viên, Người đăng ký.']]},
      {key: 'updates', label: 'Cập nhật', icon: 'shield', stage: () => updates(1), tag: 'QUẢN TRỊ',
        where: 'Lõi, plugin, giao diện.', what: 'Sao lưu trước, bản lớn thử trên bản sao, rà trang và form sau cập nhật.'}
    ],
    src: ['wpEditor', 'wpRoles', 'wpUpdate']
  },
  prep: {
    title: 'Kiểm kê trước khi sửa.',
    lead: 'Với website đang chạy, việc đầu tiên là biết đang có gì và cái gì đang được dùng.',
    principle: 'Mỗi plugin phải có lý do. Chức năng làm được bằng mẫu trang thì không cài thêm plugin.',
    boardLabel: 'CẬP NHẬT CHỜ XỬ LÝ',
    boards: [() => updates(0)],
    tiles: [['globe', 'Quyền hosting', 'Tệp, cơ sở dữ liệu'], ['list', 'Danh sách plugin', 'Đang dùng, không dùng'],
      ['users', 'Danh sách tài khoản', 'Ai còn cần quyền'], ['shield', 'Bản sao lưu', 'Tệp + cơ sở dữ liệu']],
    assets: [['Hệ thống', 'Hosting, tên miền', 'Tài khoản quản trị.'], ['Dữ liệu', 'Bản sao lưu gần nhất', 'Đã thử khôi phục?'],
      ['Danh sách', 'Plugin và giao diện', 'Bản quyền, nhà phát triển.'], ['Chữ', 'Quy trình duyệt bài', 'Ai viết, ai duyệt.']],
    specs: [['Sao lưu', 'Tệp + cơ sở dữ liệu', 'WordPress khuyên sao lưu cả hai, lưu nhiều bản ở nhiều nơi.'],
      ['Cập nhật', 'Sao lưu trước khi cập nhật', 'Tài liệu WordPress nhắc sao lưu cơ sở dữ liệu và tệp trước khi cập nhật.'],
      ['Quyền', 'Vai trò và năng lực', 'Mỗi vai trò có sẵn tập năng lực mặc định.']],
    src: ['wpBackup', 'wpUpdate', 'wpRoles']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Những lúc WordPress hay trục trặc.',
    lead: 'Nhóm đầu là khi sửa nội dung, nhóm sau là khi hệ thống thay đổi.',
    items: [
      {key: 'layout', group: 'Khi sửa nội dung', groupColor: '#a9c4ec', label: 'Sửa làm vỡ bố cục', icon: 'layers', stage: () => editor(),
        stageTag: 'QUẢN TRỊ', facts: [['Phòng', 'Khối có sẵn kiểu, khóa phần bố cục.'], ['Thử', 'Nhân sự tự sửa trước khi bàn giao.']]},
      {key: 'image', group: 'Khi sửa nội dung', groupColor: '#a9c4ec', label: 'Ảnh nặng làm chậm trang', icon: 'image', stage: () => media(),
        stageTag: 'QUẢN TRỊ', facts: [['Phòng', 'Kích thước tối đa khi tải lên, định dạng nén.'], ['Kiểm', 'Ảnh đánh dấu "cần nén".']]},
      {key: 'mobile', group: 'Khi sửa nội dung', groupColor: '#a9c4ec', label: 'Trên điện thoại khác máy tính', icon: 'mobile', stage: () => mobileSite('sticky'),
        facts: [['Phòng', 'Xem trước bản điện thoại trước khi xuất bản.'], ['Vì sao', 'Phần lớn khách đọc trên điện thoại.']]},
      {key: 'plugin', group: 'Khi hệ thống thay đổi', groupColor: '#88e4ff', label: 'Plugin lỗi sau cập nhật', icon: 'alert', stage: () => uptime(),
        stageTag: 'NHẬT KÝ MẪU', facts: [['Phòng', 'Thử bản lớn trên bản sao trước.'], ['Xử lý', 'Khôi phục bản sao lưu trước cập nhật.']]},
      {key: 'backup', group: 'Khi hệ thống thay đổi', groupColor: '#88e4ff', label: 'Cần khôi phục', icon: 'shield', stage: () => backups(2),
        stageTag: 'NHẬT KÝ MẪU', facts: [['Cần có', 'Bản sao lưu ngoài máy chủ, đã thử khôi phục.'], ['Theo', 'Hướng dẫn sao lưu của WordPress.']]}
    ],
    src: ['wpBackup', 'wpUpgrade']
  },
  measure: {
    eyebrow: 'ĐO LƯỜNG',
    title: 'Đo việc tự quản trị có trôi không.',
    lead: 'Bấm từng tầng. Số là một quý giả định để minh họa cách đọc.',
    sample: 'Một quý giả định, chỉ để minh họa cách đọc.',
    tiers: [
      ['post', 'Nội dung', '36', [['Bài, trang xuất bản', '36', 'Nhân sự tự làm.'], ['Cần hỗ trợ kỹ thuật', '3', 'Việc phải nhờ người khác.']]],
      ['update', 'Cập nhật', '14', [['Lần cập nhật', '14', 'Lõi, plugin, giao diện.'], ['Lỗi sau cập nhật', '1', 'Đã khôi phục.']]],
      ['restore', 'Khôi phục', '1', [['Lần thử khôi phục', '1', 'Trên bản sao.'], ['Thời gian khôi phục', '25 phút', 'Từ bản sao lưu.']]]
    ],
    tips: {post: 'Nhiều việc phải nhờ kỹ thuật: mẫu trang thiếu khối, hoặc hướng dẫn chưa đủ.',
      update: 'Lỗi sau cập nhật lặp lại: xem lại plugin đó, cân nhắc thay hoặc bỏ.'},
    note: {label: 'CHỈ SỐ NỘI BỘ', ic: 'users', text: 'Các con số này dùng để quản trị, không phải chỉ số kinh doanh. Chỉ số kinh doanh đo bằng hoàn tất tác vụ của khách trên website.'},
    src: ['wpAdmin', 'wpBackup']
  },
  rollout: {
    title: 'Năm bước tới website tự quản trị được.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi bàn giao.',
    steps: [['Kiểm kê', 'Plugin, giao diện, tài khoản, sao lưu.', 'Báo cáo hiện trạng'],
      ['Cấu trúc nội dung', 'Trang, chuyên mục, mẫu trang.', 'Sơ đồ nội dung'],
      ['Dựng mẫu trang', 'Khối có sẵn kiểu, bản điện thoại.', 'Mẫu trang duyệt'],
      ['Phân quyền & sao lưu', 'Vai trò, sao lưu tự động ngoài máy chủ.', 'Danh sách quyền'],
      ['Hướng dẫn & bàn giao', 'Nhân sự tự sửa, thử khôi phục.', 'Tài liệu, video ngắn']],
    icons: ['list', 'layers', 'file', 'shield', 'users'],
    phases: [['Hiện trạng', [0, 1]], ['Dựng', [2, 3]], ['Bàn giao', [4]]],
    checks: ['Plugin không dùng đã gỡ', 'Mỗi người đúng vai trò', 'Ít tài khoản Quản trị viên', 'Sao lưu tệp + cơ sở dữ liệu',
      'Bản sao lưu ngoài máy chủ', 'Đã thử khôi phục', 'Ảnh có kích thước tối đa', 'Nhân sự tự sửa được trang'],
    src: ['wpBackup', 'wpRoles']
  },
  faq: {
    items: [
      ['WordPress có an toàn không?', 'Phụ thuộc cách vận hành: cập nhật đều, ít plugin, quyền đúng người, sao lưu và thử khôi phục.'],
      ['Có nên cài nhiều plugin?', 'Không. Mỗi plugin thêm mã cần cập nhật và có thể xung đột; chỉ giữ plugin có lý do rõ.'],
      ['Có chuyển website cũ sang được không?', 'Được, cần danh sách URL cũ để chuyển hướng và kiểm tra nội dung sau khi chuyển.'],
      ['Nhân viên có cần biết code?', 'Không, trong phạm vi khối nội dung đã dựng. Thay đổi bố cục mới cần kỹ thuật.'],
      ['Cập nhật bao lâu một lần?', 'Theo phát hành của lõi và plugin; bản vá bảo mật nên cập nhật sớm, bản lớn thử trước trên bản sao.'],
      ['Có gói bảo trì sau bàn giao?', 'Có thể tách thành phạm vi riêng, xem trang Bảo trì Website.']
    ],
    topics: [['An toàn', 'shield', [0, 1, 4]], ['Sử dụng', 'users', [2, 3, 5]]],
    src: ['wpUpdate', 'wpAdmin']
  },
  contactGoals: [['new', 'Làm website WordPress mới'], ['fix', 'Sửa website WordPress đang lỗi'], ['cleanup', 'Dọn plugin, phân quyền'], ['train', 'Hướng dẫn nhân sự']],
  recap: {
    title: 'Ba việc để WordPress chạy ổn.',
    items: [['Mẫu trang dễ sửa', 'Khối có sẵn kiểu.', '#dinh-dang', 'file'],
      ['Quyền đúng người', 'Ít Quản trị viên.', '#dinh-dang', 'users'],
      ['Sao lưu, thử khôi phục', 'Trước mỗi cập nhật lớn.', '#muc-tieu', 'shield']]
  },
  sisters: sisters('bao-tri-website', 'website-doanh-nghiep', 'toi-uu-toc-do')
});

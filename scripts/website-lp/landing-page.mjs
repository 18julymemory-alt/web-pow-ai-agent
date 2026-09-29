// Landing Page — one landing page (WEBSITE_LP_PLAN.md).
import {lpAnatomy, lpVariants, match, contactForm, splitTest, scrollMap, crm, leadDone} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
import {withExtra} from './extra.mjs';
export {CHECKED};

export default withExtra({
  slug: 'landing-page',
  channel: 'webLanding',
  name: 'Landing Page',
  checked: CHECKED,
  docName: 'tài liệu web.dev, W3C và Google',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Cấu trúc trang'),
  contact: CONTACT,
  meta: {
    title: 'Thiết kế Landing Page chiến dịch: một thông điệp, một hành động',
    description: 'Landing Page gom thông điệp, bằng chứng và form vào một hành trình ngắn khớp với quảng cáo. '
      + 'Cấu trúc trang, trạng thái form, đo lường, thử nghiệm và cách POWAI triển khai.'
  },
  hero: {
    sub: 'Một chiến dịch. <em>Một thông điệp</em>. Một hành động.',
    lead: 'Quảng cáo dẫn tới trang có quá nhiều lựa chọn thì khách không biết làm gì tiếp. Landing Page khớp tiêu đề với lời hứa của quảng cáo, '
      + 'giải thích đủ lợi ích để quyết định, đưa bằng chứng và một form đo được.',
    cta: 'Xem cấu trúc trang',
    rungs: [['target', 'Khớp quảng cáo', 'Cùng lời hứa'], ['check', 'Lợi ích', 'Đủ để quyết định'], ['star', 'Bằng chứng', 'Ảnh thật, đánh giá'],
      ['form', 'Một form', 'Có trạng thái'], ['chart', 'Đo & thử', 'Gửi thành công']]
  },
  when: {
    title: 'Khi có một chiến dịch và một việc muốn khách làm.',
    lead: 'Hợp cho quảng cáo, ra mắt sản phẩm, sự kiện, ưu đãi theo mùa. Không thay cho website giới thiệu đầy đủ.',
    journey: [['tap', 'Khách bấm quảng cáo'], ['target', 'Thấy đúng lời hứa'], ['check', 'Đọc lợi ích, bằng chứng'], ['form', 'Điền form'],
      ['check', 'Nhận xác nhận']],
    inputs: [['target', 'Thông điệp quảng cáo'], ['tag', 'Ưu đãi, điều kiện'], ['image', 'Ảnh, video thật'], ['users', 'Nơi nhận lead']],
    core: 'Viết, thiết kế, dựng, đo',
    outputs: [['page', 'Trang chiến dịch'], ['form', 'Form về đúng nơi'], ['chart', 'Sự kiện gửi thành công']],
    fit: ['Chạy quảng cáo cho một sản phẩm hoặc ưu đãi', 'Cần ra trang nhanh cho sự kiện', 'Muốn so hai cách nói trên cùng lưu lượng',
      'Trang chủ hiện quá nhiều hướng đi'],
    notFit: ['Cần giới thiệu nhiều dịch vụ: dùng Website doanh nghiệp', 'Chưa có ưu đãi hay thông điệp rõ',
      'Không có người tiếp nhận lead', 'Muốn gom mọi sản phẩm vào một trang'],
    src: ['forms', 'seo']
  },
  formats: {
    eyebrow: 'CẤU TRÚC TRANG',
    title: 'Năm phần, theo thứ tự khách cần.',
    lead: 'Chọn từng phần để xem nó ở đâu trên trang và viết thế nào.',
    whereLabel: 'Mục đích', whatLabel: 'Viết thế nào',
    items: [
      {key: 'head', label: 'Tiêu đề khớp quảng cáo', icon: 'target', stage: () => lpAnatomy(0), tag: 'BỐ CỤC MẪU',
        where: 'Khách biết mình vào đúng chỗ.', what: 'Nhắc lại lời hứa của quảng cáo: sản phẩm, ưu đãi, điều kiện. Ảnh đúng món.',
        more: [['Lưu ý', 'Không hứa điều trang không chứng minh được chỉ để tăng lượt bấm.']]},
      {key: 'benefit', label: 'Lợi ích', icon: 'check', stage: () => lpAnatomy(1), tag: 'BỐ CỤC MẪU',
        where: 'Đủ lý do để quyết định.', what: 'Ba đến năm lợi ích cụ thể, nói bằng ngôn ngữ của khách, không liệt kê tính năng.'},
      {key: 'proof', label: 'Bằng chứng', icon: 'star', stage: () => lpAnatomy(2), tag: 'BỐ CỤC MẪU',
        where: 'Tin rằng lời hứa là thật.', what: 'Ảnh thật, đánh giá có nguồn, chính sách đổi trả, dự án được phép công bố.'},
      {key: 'form', label: 'Một form', icon: 'form', stage: () => lpAnatomy(3), tag: 'BỐ CỤC MẪU',
        where: 'Làm việc duy nhất trang muốn.', what: 'Ít trường, nhãn rõ, một câu phân loại nhu cầu; lặp lại nút ở cuối trang.',
        more: [['Đo', 'Chỉ tính lead khi máy chủ nhận xong, không tính lượt bấm nút.']]},
      {key: 'match', label: 'Mỗi quảng cáo một trang', icon: 'layers', stage: () => lpVariants(),
        where: 'Không dẫn mọi quảng cáo về một trang chung.', what: 'Cùng khung, đổi tiêu đề, ảnh, ưu đãi theo từng nhóm quảng cáo.'}
    ],
    src: ['forms', 'waiForms']
  },
  prep: {
    title: 'Chốt lời hứa trước khi thiết kế.',
    lead: 'Trang chỉ tốt bằng thông điệp và ưu đãi đưa vào.',
    principle: 'Một trang, một mục tiêu. Mọi phần trên trang đều dẫn tới cùng một hành động.',
    boardLabel: 'LỜI HỨA ↔ TRANG ĐÍCH',
    boards: [() => match(true)],
    tiles: [['target', 'Thông điệp quảng cáo', 'Tiêu đề, ưu đãi'], ['image', 'Ảnh, video thật', 'Đúng sản phẩm quảng cáo'],
      ['file', 'Điều kiện ưu đãi', 'Thời hạn, số lượng'], ['users', 'Nơi nhận lead', 'CRM, email, người trực']],
    assets: [['Chữ', 'Tiêu đề và lợi ích', 'Duyệt trước thiết kế.'], ['Ảnh', 'Ảnh hoặc video', 'Được phép dùng.'],
      ['Dữ liệu', 'Nơi nhận lead', 'Người phụ trách.'], ['Đo lường', 'Mã đo lường', 'Analytics, nền tảng quảng cáo.']],
    specs: [['Form', 'Nhãn gắn với ô nhập', 'Hướng dẫn biểu mẫu của W3C WAI và web.dev.'],
      ['Tốc độ', 'Core Web Vitals', 'Trang từ quảng cáo thường mở trên điện thoại.'],
      ['Đo lường', 'generate_lead', 'Sự kiện đề xuất của Google Analytics cho lead.']],
    src: ['waiForms', 'vitals', 'gaEvents']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Kiểm tra cả form lỗi và thành công.',
    lead: 'Không lấy lượt bấm nút làm lead. Nhóm đầu là khách thấy gì, nhóm sau là dữ liệu đi đâu.',
    items: [
      {key: 'err', group: 'Khách thấy', groupColor: '#f3a9c9', label: 'Nhập sai', icon: 'alert', stage: () => contactForm('error'),
        facts: [['Cần có', 'Báo lỗi tại trường và cách sửa.'], ['Theo', 'W3C WAI: thông báo lỗi ngắn, rõ, có hướng dẫn.']]},
      {key: 'ok', group: 'Khách thấy', groupColor: '#f3a9c9', label: 'Gửi thành công', icon: 'check', stage: () => contactForm('done'),
        facts: [['Cần có', 'Xác nhận đã nhận và bước tiếp theo.'], ['Đo', 'generate_lead khi máy chủ nhận xong.']]},
      {key: 'scroll', group: 'Khách thấy', groupColor: '#f3a9c9', label: 'Không cuộn tới form', icon: 'eye', stage: () => scrollMap(), stageTag: 'BÁO CÁO MẪU',
        facts: [['Dấu hiệu', 'Ít người xem tới phần form.'], ['Thử', 'Nút ở màn hình đầu, rút gọn phần trên.']]},
      {key: 'crm', group: 'Dữ liệu đi đâu', groupColor: '#88e4ff', label: 'Lead về CRM', icon: 'users', stage: () => crm('qualified', ['Quảng cáo Tết', 'Quảng cáo sinh nhật', 'Tìm kiếm']),
        stageTag: 'CRM MẪU', facts: [['Cần có', 'Nguồn chiến dịch đi kèm lead.'], ['Để', 'Biết quảng cáo nào ra khách phù hợp.']]},
      {key: 'thanks', group: 'Dữ liệu đi đâu', groupColor: '#88e4ff', label: 'Gọi lại nhanh', icon: 'phone', stage: () => leadDone(),
        facts: [['Cần có', 'Báo nhân viên ngay khi có lead.'], ['Vì sao', 'Lead chiến dịch nguội nhanh.']]}
    ],
    src: ['waiForms', 'gaLead']
  },
  measure: {
    title: 'Đo lead, và lead phù hợp.',
    lead: 'Bấm từng tầng. Số là một chiến dịch giả định để minh họa cách đọc.',
    sample: 'Một chiến dịch giả định, chỉ để minh họa cách đọc.',
    tiers: [
      ['visit', 'Vào trang', '1.800', [['Lượt vào từ quảng cáo', '1.800', 'page_view.'], ['Cuộn tới form', '520', 'Theo độ sâu cuộn.']]],
      ['start', 'Bắt đầu form', '240', [['Bắt đầu form', '240', 'form_start.'], ['Gặp lỗi', '61', 'Sự kiện lỗi form.']]],
      ['lead', 'Lead', '118', [['Gửi thành công', '118', 'generate_lead.'], ['Lead phù hợp', '52', 'Xác nhận trong CRM.']]]
    ],
    tips: {start: 'Nhiều người cuộn tới form mà ít bắt đầu: form trông dài hoặc hỏi thông tin nhạy cảm quá sớm.',
      lead: 'Lead nhiều mà phù hợp ít: thêm câu phân loại, nói rõ điều kiện ưu đãi.'},
    note: {label: 'THỬ MỘT THAY ĐỔI MỖI LẦN', ic: 'sliders', text: 'So hai phiên bản trên cùng lưu lượng, đổi một thứ (tiêu đề, ảnh, form), chạy đủ lâu và đọc cả lead phù hợp.'},
    src: ['gaLead', 'gaEvents']
  },
  rollout: {
    title: 'Năm bước tới trang chạy được quảng cáo.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi bật quảng cáo.',
    steps: [['Chốt lời hứa', 'Thông điệp, ưu đãi, hành động duy nhất.', 'Bản tóm tắt'],
      ['Viết & thiết kế', 'Năm phần, bản điện thoại trước.', 'Bản mẫu duyệt'],
      ['Dựng & kết nối', 'Form về CRM, email, báo người trực.', 'Trang thử nghiệm'],
      ['Kiểm thử', 'Form lỗi, thành công, tốc độ, đo lường.', 'Biên bản kiểm thử'],
      ['Chạy & thử nghiệm', 'Đọc số tuần đầu, thử một thay đổi.', 'Báo cáo, phiên bản B']],
    icons: ['target', 'mobile', 'link', 'check', 'sliders'],
    phases: [['Chuẩn bị', [0, 1]], ['Dựng', [2, 3]], ['Chạy', [4]]],
    checks: ['Tiêu đề khớp quảng cáo', 'Một hành động chính', 'Form báo lỗi tại trường', 'Màn xác nhận sau gửi',
      'Lead về đúng người', 'Sự kiện generate_lead', 'Mở nhanh trên điện thoại', 'Nguồn chiến dịch đi kèm lead'],
    src: ['forms', 'vitals']
  },
  faq: {
    items: [
      ['Landing Page khác trang chủ thế nào?', 'Trang chủ phục vụ nhiều nhu cầu; Landing Page phục vụ một chiến dịch và bỏ các hướng rẽ không cần.'],
      ['Có cần menu không?', 'Thường giữ tối thiểu hoặc bỏ, để khách tập trung vào một hành động.'],
      ['Form nên có mấy trường?', 'Đủ để gọi lại và phân loại. Bớt trường có thể tăng lead nhưng cũng tăng lead không phù hợp; đo cả hai.'],
      ['Một trang dùng cho nhiều quảng cáo được không?', 'Được nếu cùng lời hứa. Quảng cáo nói khác nhau nên có phiên bản trang tương ứng.'],
      ['Bao lâu thì có trang?', 'Tùy tốc độ chốt thông điệp và nội dung; phần dựng thường nhanh hơn phần duyệt.'],
      ['Có hứa tỷ lệ chuyển đổi không?', 'Không. Tỷ lệ phụ thuộc quảng cáo, ưu đãi và sản phẩm; POWAI đo và thử nghiệm để cải thiện.']
    ],
    topics: [['Nội dung', 'page', [0, 1, 2]], ['Chiến dịch', 'target', [3, 4, 5]]],
    src: ['forms', 'waiForms']
  },
  contactGoals: [['campaign', 'Trang cho chiến dịch mới'], ['launch', 'Ra mắt sản phẩm, sự kiện'], ['improve', 'Sửa trang đang chạy'], ['ab', 'Thử nghiệm A/B']],
  recap: {
    title: 'Ba việc cho một trang chiến dịch.',
    items: [['Khớp lời hứa', 'Tiêu đề = quảng cáo.', '#dinh-dang', 'target'],
      ['Form có trạng thái', 'Lỗi và thành công.', '#muc-tieu', 'form'],
      ['Đo lead phù hợp', 'Không chỉ lượt bấm.', '#do-luong', 'chart']]
  },
  sisters: sisters('cro-toi-uu-chuyen-doi', 'website-doanh-nghiep', 'tich-hop-he-thong')
});

// Tối ưu chuyển đổi quảng cáo (CRO) — one landing page. Mostly method; the
// few external facts (experiments, form guidance) are cited from Google's
// help centre and web.dev as read on CHECKED.
import {google, form, match, checkout, dropoff, splitTest, leadDone, crm} from './mocks.mjs';

const S = id => 'https://support.google.com/google-ads/answer/' + id;
const MC = '/dich-vu/quang-cao-da-kenh/';

export const CHECKED = '2026-09-29';

export const SOURCES = {
  experiments: [S('6261395'), 'Google Ads: tạo thử nghiệm'],
  experimentsFaq: [S('13826584'), 'Google Ads: câu hỏi về thử nghiệm'],
  conversions: [S('1722022'), 'Google Ads: đo lường chuyển đổi'],
  landing: [S('6238826'), 'Google Ads: tối ưu quảng cáo và trang đích'],
  forms: ['https://web.dev/learn/forms/', 'web.dev: thiết kế biểu mẫu'],
  vitals: ['https://web.dev/articles/vitals', 'web.dev: Core Web Vitals']
};

export default {
  slug: 'toi-uu-chuyen-doi-quang-cao',
  channel: 'cro',
  name: 'Tối ưu chuyển đổi quảng cáo',
  checked: CHECKED,
  docName: 'tài liệu Google và web.dev',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  meta: {
    title: 'Tối ưu chuyển đổi quảng cáo: trang đích, form, thanh toán, A/B test',
    description: 'Tìm điểm khách dừng lại giữa quảng cáo và hành động: thông điệp khớp trang đích, form, thanh toán trên điện thoại, '
      + 'A/B testing có kiểm soát và cách đo, cách POWAI triển khai.'
  },
  hero: {
    sub: 'Sửa chỗ khách <em>dừng lại</em> trước khi tăng tiền quảng cáo.',
    lead: 'Nhiều lượt nhấp mà ít lead thường là lỗi sau quảng cáo: trang đích không khớp, form dài hoặc báo lỗi khó hiểu, '
      + 'thanh toán vướng trên điện thoại. Trang này đi từ tìm điểm rơi tới thử nghiệm và đo lại.',
    cta: 'Xem bốn điểm hay rơi',
    rungs: [['search', 'Khớp thông điệp', 'Quảng cáo ↔ trang đích'], ['form', 'Form', 'Ít bước, báo lỗi rõ'], ['mobile', 'Thanh toán', 'Trên điện thoại'],
      ['sliders', 'A/B test', 'Một thay đổi mỗi lần'], ['chart', 'Đo lại', 'Cả chất lượng lead']]
  },
  when: {
    title: 'Hợp khi quảng cáo có người bấm mà không có người làm.',
    lead: 'Tối ưu chuyển đổi làm việc trên phần sau lượt nhấp. Cần đo được từng bước trước, rồi mới sửa và thử.',
    journey: [['tap', 'Khách bấm quảng cáo'], ['page', 'Vào trang đích'], ['form', 'Bắt đầu form hoặc giỏ'], ['alert', 'Dừng ở một bước'],
      ['check', 'Sửa, thử lại, đo hoàn tất']],
    inputs: [['page', 'Trang đích, form, giỏ hàng'], ['code', 'Sự kiện từng bước'], ['users', 'CRM'], ['sliders', 'Giả thuyết']],
    core: 'Tìm điểm rơi, sửa, thử nghiệm',
    outputs: [['funnel', 'Bước rơi nhiều nhất'], ['check', 'Tỷ lệ hoàn tất'], ['users', 'Lead phù hợp']],
    fit: ['Lượt nhấp ổn mà lead hoặc đơn ít', 'Form hay giỏ hàng có nhiều người bỏ dở', 'Đủ lưu lượng để so hai phương án',
      'Có thể sửa trang đích, form, giao diện thanh toán'],
    notFit: ['Chưa đo được từng bước trên trang', 'Lưu lượng quá ít để kết luận', 'Muốn thay mọi thứ cùng lúc',
      'Muốn cam kết trước một mức tăng cụ thể'],
    src: ['conversions', 'landing']
  },
  formats: {
    eyebrow: 'BỐN ĐIỂM HAY RƠI',
    title: 'Khách dừng lại ở đâu.',
    lead: 'Chọn một điểm để xem lỗi hay gặp và cách sửa.',
    whereLabel: 'Kiểm tra', whatLabel: 'Sửa thế nào',
    items: [
      {key: 'match', label: 'Thông điệp ↔ trang đích', icon: 'search', stage: () => match(false), tag: 'CHƯA KHỚP',
        where: 'Lời hứa trong quảng cáo có hiện ngay trên trang không.', what: 'Mở đúng sản phẩm, đúng giá, đúng ưu đãi đã nói.',
        more: [['Lưu ý', 'Không hứa điều không chứng minh được chỉ để tăng tỷ lệ nhấp.']]},
      {key: 'fixed', label: 'Trang đích đã khớp', icon: 'check', stage: () => match(true), tag: 'ĐÃ KHỚP',
        where: 'Tiêu đề, ảnh, giá và nút trên màn hình đầu.', what: 'Khách thấy ngay điều quảng cáo đã nói và một nút để làm tiếp.'},
      {key: 'form', label: 'Form tư vấn', icon: 'form', stage: () => form(false),
        where: 'Số trường, nhãn, báo lỗi, màn cảm ơn.', what: 'Bỏ trường thừa, nhãn rõ, báo lỗi ngay tại trường, xác nhận khi gửi xong.',
        more: [['Lưu ý', 'Bớt trường có thể tăng lead rác; đo chất lượng cùng số form.']]},
      {key: 'checkout', label: 'Thanh toán trên điện thoại', icon: 'mobile', stage: () => checkout('ship'),
        where: 'Tốc độ, bàn phím, phí giao, báo lỗi.', what: 'Hiện phí giao sớm, chọn đúng bàn phím, báo lỗi rõ, ít bước.',
        more: [['Lưu ý', 'Thử trên điện thoại thật; sửa thanh toán cần kiểm thử để không ảnh hưởng đơn đang chạy.']]},
      {key: 'ab', label: 'A/B test', icon: 'sliders', stage: () => splitTest('page'), tag: 'THỬ NGHIỆM MẪU',
        where: 'Một thay đổi so với phương án hiện tại.', what: 'Giữ A, thử B, chia đều lưu lượng, đo đủ lâu, đọc cả chất lượng lead.'}
    ],
    src: ['landing', 'forms', 'experiments']
  },
  prep: {
    title: 'Đo từng bước trước khi sửa.',
    lead: 'Không đo được bước nào thì không biết khách rơi ở đâu.',
    principle: 'Ghi sự kiện cho từng bước: vào trang, bắt đầu form, lỗi, gửi thành công, thêm giỏ, thanh toán, mua. Đối chiếu lead với CRM.',
    boards: [() => dropoff()],
    tiles: [['code', 'Sự kiện từng bước', 'Bắt đầu, lỗi, hoàn tất'], ['mobile', 'Điện thoại thật', 'Kiểm tra thao tác'],
      ['bolt', 'Tốc độ trang', 'Core Web Vitals'], ['users', 'CRM', 'Chất lượng lead']],
    assets: [['Trang', 'Danh sách trang đích', 'Theo từng quảng cáo.'], ['Sự kiện', 'Sự kiện từng bước', 'Kể cả lỗi form.'],
      ['Dữ liệu', 'CRM', 'Lead phù hợp.'], ['Chữ', 'Danh sách giả thuyết', 'Mỗi giả thuyết một thay đổi.']],
    specs: [['Sự kiện form', 'Bắt đầu · lỗi · gửi thành công', 'Phân biệt người bỏ giữa chừng với người gặp lỗi.'],
      ['Thử nghiệm Google Ads', 'Chia 50% lưu lượng', 'Google khuyên 50% để so sánh công bằng.'],
      ['Tốc độ', 'Core Web Vitals', 'Chỉ số trải nghiệm trang của web.dev.']],
    src: ['conversions', 'forms', 'vitals']
  },
  goals: {
    title: 'Tăng hoàn tất, giữ chất lượng.',
    lead: 'Nhóm đầu là mục tiêu, nhóm sau là cách đọc theo phân nhóm.',
    items: [
      {key: 'leads', group: 'Mục tiêu', groupColor: '#eac897', label: 'Tăng lead phù hợp', icon: 'form', stage: () => leadDone(),
        facts: [['Đo bằng', 'Form gửi thành công và lead phù hợp.'], ['Lưu ý', 'Không chỉ tăng số bấm nút.']]},
      {key: 'checkout', group: 'Mục tiêu', groupColor: '#eac897', label: 'Giảm rơi khi mua', icon: 'cart', stage: () => checkout('pay'),
        facts: [['Đo bằng', 'Giỏ → thanh toán → mua.'], ['Lưu ý', 'Đối chiếu lỗi với giao dịch thật.']]},
      {key: 'budget', group: 'Mục tiêu', groupColor: '#eac897', label: 'Nâng hiệu quả ngân sách', icon: 'wallet', stage: () => crm('qualified', ['Tìm kiếm', 'Mạng xã hội', 'Tìm kiếm']),
        stageTag: 'CRM', facts: [['Đo bằng', 'Chi phí mỗi lead phù hợp.'], ['Lưu ý', 'Giữ chất lượng khi tỷ lệ tăng.']]},
      {key: 'device', group: 'Phân nhóm', groupColor: '#88e4ff', label: 'Theo thiết bị', icon: 'mobile', stage: () => checkout('cart'),
        facts: [['Đọc', 'Lỗi và hoàn tất trên điện thoại, máy tính.'], ['Vì sao', 'Phần lớn lỗi thao tác nằm trên điện thoại.']]},
      {key: 'source', group: 'Phân nhóm', groupColor: '#88e4ff', label: 'Theo nguồn truy cập', icon: 'route', stage: () => google('search-text'),
        facts: [['Đọc', 'Tìm kiếm, mạng xã hội, khách quay lại.'], ['Vì sao', 'Nhu cầu khác nhau cần trang khác nhau.']]},
      {key: 'step', group: 'Phân nhóm', groupColor: '#88e4ff', label: 'Theo bước', icon: 'funnel', stage: () => dropoff(),
        stageTag: 'BÁO CÁO MẪU', facts: [['Đọc', 'Bắt đầu form, lỗi, gửi thành công, bỏ giỏ.'], ['Vì sao', 'Sửa bước rơi nhiều nhất trước.']]}
    ],
    note: {label: 'KHÔNG HỨA TRƯỚC MỨC TĂNG', ic: 'alert', tone: 'warn',
      text: 'Mức cải thiện phụ thuộc lưu lượng, sản phẩm và dữ liệu hiện có. POWAI đo hiện trạng và thử nghiệm trước, không cam kết một con số trước khi có dữ liệu.'},
    src: ['conversions', 'experimentsFaq']
  },
  measure: {
    title: 'Đọc trước và sau mỗi thay đổi.',
    lead: 'Bấm từng tầng. Số là một tháng giả định để minh họa cách đọc.',
    tiers: [
      ['visit', 'Vào trang', '1.000', [['Lượt vào trang', '1.000', 'Từ quảng cáo.'], ['Thoát ngay', '38%', 'Rời đi không thao tác.']]],
      ['start', 'Bắt đầu', '310', [['Bắt đầu form', '310', 'Nhập ít nhất một trường.'], ['Gặp lỗi', '96', 'Báo lỗi ít nhất một lần.']]],
      ['done', 'Hoàn tất', '142', [['Gửi thành công', '142', 'Màn cảm ơn hiện ra.'], ['Lead phù hợp', '58', 'Nhân viên xác nhận.']]]
    ],
    tips: {start: 'Nhiều người gặp lỗi: sửa nhãn, định dạng số điện thoại, bàn phím.', done: 'Hoàn tất tăng mà lead phù hợp không tăng: thêm câu hỏi phân loại.'},
    note: {label: 'THỬ NGHIỆM ĐỦ LÂU', ic: 'clock', text: 'Không dừng thử nghiệm khi mới có vài chuyển đổi. Lưu lượng thấp có thể chưa đủ để kết luận; đọc cả chất lượng lead ở CRM.'},
    src: ['experiments', 'experimentsFaq', 'conversions']
  },
  rollout: {
    title: 'Sáu bước từ đo hiện trạng tới kết luận.',
    steps: [['Đo hiện trạng', 'Sự kiện từng bước, số liệu 2–4 tuần gần nhất.', 'Bản đồ điểm rơi'],
      ['Rà trải nghiệm', 'Điện thoại thật, tốc độ, form, thanh toán.', 'Danh sách lỗi'],
      ['Lập giả thuyết', 'Mỗi lỗi một giả thuyết, xếp theo mức ảnh hưởng.', 'Danh sách ưu tiên'],
      ['Sửa lỗi rõ ràng', 'Lỗi kỹ thuật sửa ngay, không cần thử nghiệm.', 'Bản sửa đã kiểm tra'],
      ['A/B test', 'Một thay đổi, chia đều, đủ thời gian.', 'Kết quả thử nghiệm'],
      ['Báo cáo & áp dụng', 'Đọc cả chất lượng lead; áp dụng bản thắng.', 'Báo cáo, bản áp dụng']],
    icons: ['chart', 'mobile', 'form', 'check', 'sliders', 'target'],
    phases: [['Tìm hiểu', [0, 1, 2]], ['Sửa & thử', [3, 4]], ['Kết luận', [5]]],
    checks: ['Sự kiện cho từng bước', 'Đo lỗi form', 'Kiểm tra trên điện thoại thật', 'Trang đích khớp quảng cáo',
      'Phí giao hiện sớm', 'Một thay đổi mỗi thử nghiệm', 'Tiêu chí thắng đặt trước', 'CRM đo chất lượng lead'],
    src: ['experiments', 'forms']
  },
  faq: {
    items: [
      ['Có thể cam kết tăng gấp đôi tỷ lệ chuyển đổi?', 'Không thể kết luận trước khi đo hiện trạng và thử nghiệm. Mức cải thiện phụ thuộc lưu lượng, sản phẩm và chất lượng dữ liệu.'],
      ['Bớt trường trong form có tốt không?', 'Thường tăng số form, nhưng có thể tăng lead rác. Đo cả lead phù hợp trong CRM.'],
      ['A/B test cần bao nhiêu lưu lượng?', 'Đủ để mỗi phương án có số chuyển đổi đáng tin. Lưu lượng thấp thì sửa lỗi rõ ràng trước, thử nghiệm sau.'],
      ['Có cần làm lại website không?', 'Thường không. Phần lớn điểm rơi nằm ở vài trang đích, form và bước thanh toán.'],
      ['Lỗi nào sửa ngay không cần thử?', 'Lỗi kỹ thuật: form không gửi được, báo lỗi sai, trang chậm, nút không bấm được trên điện thoại.'],
      ['Mất bao lâu?', 'Tùy lưu lượng. Đo hiện trạng và sửa lỗi rõ ràng trong vài tuần; mỗi thử nghiệm chạy tới khi đủ dữ liệu.']
    ],
    topics: [['Kết quả', 'chart', [0, 1, 2]], ['Cách làm', 'route', [3, 4, 5]]],
    src: ['experimentsFaq', 'forms']
  },
  contactGoals: [['leads', 'Tăng lead phù hợp'], ['checkout', 'Giảm bỏ giỏ'], ['landing', 'Sửa trang đích'], ['audit', 'Rà soát đo lường']],
  recap: {
    title: 'Ba việc trước khi tăng tiền quảng cáo.',
    items: [['Đo từng bước', 'Biết khách rơi ở đâu.', '#chuan-bi', 'funnel'],
      ['Sửa điểm rơi lớn nhất', 'Trang đích, form, thanh toán.', '#dinh-dang', 'form'],
      ['Thử nghiệm có kiểm soát', 'Một thay đổi, đủ thời gian.', '#do-luong', 'sliders']]
  },
  sisters: [['Performance Marketing', 'Phối hợp nhiều kênh theo cùng một hệ đo.', MC + 'performance-marketing/'],
    ['Remarketing', 'Nói tiếp với người đã quan tâm.', MC + 'remarketing/'],
    ['Google Ads', 'Ba trang chi tiết về các loại chiến dịch Google.', MC + 'google-ads/']]
};

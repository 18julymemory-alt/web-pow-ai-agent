// Performance Marketing — one landing page. A way of running several paid
// channels against one business result and one measurement system. The few
// platform facts (experiments, UTM, conversion tracking) come from Google's
// help centres as read on CHECKED; everything else is method, not a number.
import {SOURCES as META} from '../facebook-ads-lp/data.mjs';
import {fb, google, crm, signal, crossReport, budgetSplit, splitTest, trend} from './mocks.mjs';

const S = id => 'https://support.google.com/google-ads/answer/' + id;
const MC = '/dich-vu/quang-cao-da-kenh/';

export const CHECKED = '2026-09-29';

export const SOURCES = {
  conversions: [S('1722022'), 'Google: đo lường chuyển đổi'],
  experiments: [S('6261395'), 'Google: tạo thử nghiệm'],
  experimentsFaq: [S('13826584'), 'Google: câu hỏi về thử nghiệm'],
  utm: ['https://support.google.com/analytics/answer/10917952', 'GA4: tạo URL có UTM'],
  sources: ['https://support.google.com/analytics/answer/11242870', 'GA4: nguồn lưu lượng, gắn thẻ tự động'],
  metaCapi: [META.capi[0], 'Meta: Conversions API'],
  metaCrm: [META.crmLeads[0], 'Meta: lead chuyển đổi từ CRM']
};

export default {
  slug: 'performance-marketing',
  channel: 'performance',
  name: 'Performance Marketing',
  checked: CHECKED,
  docName: 'tài liệu Google và Meta',
  SOURCES,
  sourceLabel: 'Tài liệu nền tảng:',
  meta: {
    title: 'Performance Marketing: phối hợp kênh theo kết quả kinh doanh',
    description: 'Performance Marketing: chia vai trò kênh (đón nhu cầu, tạo nhu cầu, tiếp nối), một hệ đo chung với UTM, sự kiện và CRM, '
      + 'thử nghiệm ngân sách có kiểm soát và cách POWAI triển khai.'
  },
  hero: {
    sub: 'Nhiều kênh, <em>một con số kinh doanh</em> để đọc.',
    lead: 'Performance Marketing là cách chạy nhiều kênh quảng cáo theo cùng một kết quả: khách phù hợp, đơn đã giao, doanh thu. '
      + 'Mỗi kênh có vai trò riêng; một hệ đo chung cho biết tiền nên dời đi đâu.',
    cta: 'Xem bốn vai trò kênh',
    rungs: [['search', 'Đón nhu cầu', 'Tìm kiếm, sản phẩm'], ['play', 'Tạo nhu cầu', 'Video, mạng xã hội'], ['repeat', 'Tiếp nối', 'Remarketing'],
      ['sliders', 'Thử nghiệm', 'Một biến mỗi lần'], ['chart', 'Một hệ đo', 'UTM, sự kiện, CRM']]
  },
  when: {
    title: 'Hợp khi đã chạy vài kênh mà không biết kênh nào thật sự mang khách.',
    lead: 'Mỗi nền tảng tự báo kết quả của mình và thường đếm trùng. Performance Marketing đặt một thước đo chung rồi mới chia ngân sách.',
    journey: [['target', 'Chọn một kết quả kinh doanh'], ['layers', 'Chia vai trò cho từng kênh'], ['code', 'Đo chung: UTM, sự kiện, CRM'],
      ['chart', 'Đọc chi phí mỗi khách phù hợp'], ['sliders', 'Dời ngân sách, thử nghiệm tiếp']],
    inputs: [['target', 'Mục tiêu kinh doanh'], ['wallet', 'Ngân sách tháng'], ['code', 'Sự kiện, UTM'], ['users', 'CRM']],
    core: 'Một hệ đo chung cho mọi kênh',
    outputs: [['chart', 'Chi phí mỗi khách phù hợp theo kênh'], ['sliders', 'Đề xuất dời ngân sách'], ['check', 'Kết quả thử nghiệm']],
    fit: ['Đang chạy từ hai kênh trở lên', 'Có đội bán hàng ghi kết quả vào CRM', 'Ngân sách đủ để thử nghiệm có ý nghĩa',
      'Muốn biết tiền tăng thêm nên đặt vào đâu'],
    notFit: ['Chưa đo được lead hay đơn trên kênh nào', 'Chưa có CRM hay bảng theo dõi khách', 'Mong được tính phí chỉ khi có đơn',
      'Muốn thay đổi mọi thứ cùng lúc'],
    src: ['conversions', 'utm']
  },
  formats: {
    eyebrow: 'BỐN VAI TRÒ KÊNH',
    title: 'Mỗi kênh một việc.',
    lead: 'Chọn một vai trò để xem kênh nào đảm nhận và đọc kết quả thế nào.',
    whereLabel: 'Kênh thường dùng', whatLabel: 'Đọc kết quả bằng',
    items: [
      {key: 'capture', label: 'Đón nhu cầu', icon: 'search', stage: () => google('search-text'),
        where: 'Google Tìm kiếm, Shopping, Performance Max.', what: 'Chi phí mỗi lead, đơn; tách riêng nhu cầu tên thương hiệu.'},
      {key: 'create', label: 'Tạo nhu cầu', icon: 'play', stage: () => fb('ig-reels'),
        where: 'Facebook, Instagram, TikTok, YouTube.', what: 'Người tiếp cận, lượt xem, lượt tìm thương hiệu; không chỉ CPA ngắn hạn.'},
      {key: 'nurture', label: 'Tiếp nối', icon: 'repeat', stage: () => signal('remarketing'), tag: 'HÀNH TRÌNH',
        where: 'Remarketing trên Google và Meta, Zalo cho khách cũ.', what: 'Hoàn tất, lead phù hợp; loại người đã mua.'},
      {key: 'test', label: 'Thử nghiệm', icon: 'sliders', stage: () => splitTest('budget'), tag: 'THỬ NGHIỆM MẪU',
        where: 'Thử nghiệm chiến dịch của Google Ads, A/B test của Meta.', what: 'Một biến, tiêu chí trước, đủ thời gian.'}
    ],
    note: {label: 'KHÔNG CỘNG BÁO CÁO CÁC NỀN TẢNG', ic: 'alert', tone: 'warn',
      text: 'Một khách có thể được Google, Facebook và TikTok cùng ghi nhận. Cộng báo cáo các nền tảng sẽ ra số lớn hơn thực tế; đối chiếu bằng CRM và GA4.'},
    src: ['conversions', 'experiments']
  },
  prep: {
    title: 'Một hệ đo trước khi chia tiền.',
    lead: 'Không có hệ đo chung thì mọi so sánh giữa kênh chỉ là so báo cáo của từng nền tảng.',
    principle: 'Mọi liên kết có UTM, mọi hành động có sự kiện, mọi lead có trạng thái trong CRM. Sau đó mới phân bổ ngân sách.',
    boards: [() => crossReport()],
    tiles: [['link', 'UTM', 'utm_source, utm_medium, utm_campaign'], ['code', 'Sự kiện chuyển đổi', 'Google, Meta, TikTok'],
      ['users', 'CRM', 'Trạng thái từng khách'], ['chart', 'Bảng tổng hợp', 'Một bảng cho mọi kênh']],
    assets: [['Liên kết', 'Quy tắc đặt UTM', 'Giống nhau cho mọi kênh.'], ['Sự kiện', 'Danh sách sự kiện', 'Lead, đơn, gọi điện.'],
      ['Dữ liệu', 'CRM', 'Lead phù hợp, đơn đã giao.'], ['Bảng', 'Báo cáo tuần', 'Chi phí mỗi khách phù hợp.']],
    specs: [['UTM', 'utm_source · utm_medium · utm_campaign', 'Ba tham số GA4 khuyên luôn dùng.'],
      ['Thử nghiệm Google Ads', 'Chia 50% lưu lượng', 'Google khuyên chia 50% để so sánh; không bảo đảm chi tiêu bằng nhau.'],
      ['Lead từ CRM', 'Gửi ngược về nền tảng', 'Meta và Google nhận kết quả CRM để tối ưu theo lead phù hợp.']],
    src: ['utm', 'experiments', 'experimentsFaq', 'metaCrm']
  },
  goals: {
    title: 'Chọn một con số kinh doanh.',
    lead: 'Nhóm đầu là mục tiêu, nhóm sau là cách đọc và phân bổ.',
    items: [
      {key: 'quality', group: 'Mục tiêu', groupColor: '#a2dfc5', label: 'Khách chất lượng', icon: 'users', stage: () => crm('qualified', ['Tìm kiếm', 'Mạng xã hội', 'Video']),
        stageTag: 'CRM', facts: [['Đo bằng', 'Lead → phù hợp → mua, theo từng kênh.'], ['Đọc', 'Chi phí mỗi lead phù hợp.']]},
      {key: 'revenue', group: 'Mục tiêu', groupColor: '#a2dfc5', label: 'Doanh thu', icon: 'cart', stage: () => crm('sale', ['Tìm kiếm', 'Remarketing', 'Mạng xã hội']),
        stageTag: 'CRM', facts: [['Đo bằng', 'Giá trị đơn đã giao, sau hoàn hủy.'], ['Lưu ý', 'ROAS không phải lợi nhuận.']]},
      {key: 'scale', group: 'Mục tiêu', groupColor: '#a2dfc5', label: 'Mở rộng có kiểm soát', icon: 'trend', stage: () => trend(),
        stageTag: 'BÁO CÁO MẪU', facts: [['Cách làm', 'Thêm kênh hoặc thị trường từng bước.'], ['Điều kiện', 'Giữ tiêu chí chất lượng trước khi tăng tiền.']]},
      {key: 'split', group: 'Phân bổ', groupColor: '#88e4ff', label: 'Chia ngân sách theo vai trò', icon: 'wallet', stage: () => budgetSplit(),
        stageTag: 'KẾ HOẠCH MẪU', facts: [['Cách làm', 'Chia theo vai trò kênh, giữ phần cho thử nghiệm.'], ['Lưu ý', 'Tỷ lệ là ví dụ, khác nhau ở từng doanh nghiệp.']]},
      {key: 'read', group: 'Phân bổ', groupColor: '#88e4ff', label: 'Đọc một bảng chung', icon: 'table', stage: () => crossReport(),
        stageTag: 'BÁO CÁO MẪU', facts: [['Cách làm', 'Đặt số nền tảng cạnh số CRM.'], ['Vì sao', 'Tránh đếm trùng giữa các kênh.']]}
    ],
    note: {label: 'THEO HIỆU QUẢ KHÔNG PHẢI TRẢ THEO ĐƠN', ic: 'alert', tone: 'warn',
      text: 'Nền tảng vẫn thu tiền theo cơ chế quảng cáo; phí triển khai theo hợp đồng. "Theo hiệu quả" là cách đặt mục tiêu, đo và tối ưu, không phải cam kết chỉ tính phí theo doanh thu.'},
    src: ['conversions', 'metaCrm']
  },
  measure: {
    title: 'Đọc theo tầng, theo kênh.',
    lead: 'Bấm từng tầng. Số nền tảng dùng để điều chỉnh trong kênh; số CRM dùng để chia tiền giữa kênh.',
    tiers: [
      ['lead', 'Lead', '298', [['Lead nền tảng báo', '298', 'Cộng các kênh, có trùng.'], ['Lead trong CRM', '214', 'Sau khi lọc trùng.']]],
      ['qualified', 'Lead phù hợp', '100', [['Lead phù hợp', '100', 'Nhân viên xác nhận.'], ['Chi phí mỗi lead phù hợp', '300 nghìn', '30 triệu ÷ 100 (số mẫu).']]],
      ['sale', 'Đơn đã giao', '38', [['Đơn đã giao', '38', 'Đối chiếu CRM.'], ['Doanh thu sau hoàn hủy', '96 triệu', 'Chưa trừ giá vốn.']]]
    ],
    tips: {lead: 'Lead nền tảng lớn hơn CRM nhiều: kiểm tra trùng và lead rác.', qualified: 'Một kênh rẻ lead nhưng ít lead phù hợp: đổi câu hỏi phân loại hoặc dời tiền.'},
    note: {label: 'GỬI KẾT QUẢ CRM VỀ NỀN TẢNG', ic: 'code', text: 'Khi CRM gửi ngược lead phù hợp và đơn về Google, Meta, các nền tảng tối ưu theo khách thật thay vì chỉ theo lượt gửi form.'},
    src: ['conversions', 'sources', 'metaCapi', 'metaCrm']
  },
  rollout: {
    title: 'Sáu bước từ mục tiêu tới phân bổ.',
    steps: [['Chọn con số kinh doanh', 'Khách phù hợp, đơn đã giao hay doanh thu.', 'Định nghĩa kết quả'],
      ['Rà đo lường', 'UTM, sự kiện, CRM trên mọi kênh đang chạy.', 'Danh sách lỗ hổng đo'],
      ['Chia vai trò kênh', 'Đón nhu cầu, tạo nhu cầu, tiếp nối.', 'Kế hoạch kênh'],
      ['Phân bổ & thử nghiệm', 'Ngân sách theo vai trò, một thử nghiệm mỗi lần.', 'Kế hoạch thử nghiệm'],
      ['Báo cáo tuần', 'Một bảng chung, số nền tảng cạnh số CRM.', 'Báo cáo tuần'],
      ['Dời ngân sách', 'Theo chi phí mỗi khách phù hợp và kết quả thử nghiệm.', 'Nhật ký thay đổi']],
    icons: ['target', 'code', 'layers', 'sliders', 'chart', 'wallet'],
    phases: [['Nền tảng', [0, 1, 2]], ['Vận hành', [3, 4]], ['Tối ưu', [5]]],
    checks: ['Một con số kinh doanh đã thống nhất', 'UTM cho mọi liên kết', 'Sự kiện chuyển đổi trên mọi kênh', 'CRM ghi trạng thái lead',
      'Lọc trùng lead giữa kênh', 'Phần ngân sách cho thử nghiệm', 'Báo cáo tuần một bảng', 'Quy tắc dời ngân sách'],
    src: ['utm', 'experiments']
  },
  faq: {
    items: [
      ['Performance Marketing có nghĩa chỉ trả tiền khi có đơn?', 'Không. Nền tảng vẫn thu theo cơ chế quảng cáo; phí triển khai theo hợp đồng. "Theo hiệu quả" là cách đặt mục tiêu, đo và tối ưu.'],
      ['Vì sao tổng lead các nền tảng lớn hơn CRM?', 'Một khách có thể được nhiều nền tảng ghi nhận, và có lead trùng, lead rác. Đọc số CRM khi chia ngân sách.'],
      ['Nên dồn tiền vào kênh rẻ lead nhất?', 'Chưa chắc. So chi phí mỗi lead phù hợp và đơn đã giao; kênh tạo nhu cầu có độ trễ nên đọc theo tuần.'],
      ['Thử nghiệm bao lâu thì kết luận?', 'Đủ thời gian và đủ chuyển đổi để so. Google khuyên chia 50% lưu lượng; không dừng khi mới vài chuyển đổi.'],
      ['Cần những kênh nào?', 'Tùy sản phẩm. Thường có một kênh đón nhu cầu, một kênh tạo nhu cầu và remarketing; bắt đầu ít kênh rồi thêm dần.'],
      ['POWAI báo cáo gì?', 'Một bảng chung mỗi tuần: chi phí, lead nền tảng, lead phù hợp, đơn đã giao theo kênh, và đề xuất dời ngân sách.']
    ],
    topics: [['Cách hiểu', 'globe', [0, 4, 5]], ['Đọc số', 'chart', [1, 2, 3]]],
    src: ['experimentsFaq', 'conversions']
  },
  contactGoals: [['quality', 'Tăng khách phù hợp'], ['revenue', 'Tăng doanh thu'], ['split', 'Chia lại ngân sách kênh'], ['audit', 'Rà soát đo lường']],
  recap: {
    title: 'Ba việc trước khi chia ngân sách.',
    items: [['Một con số', 'Khách phù hợp, đơn hoặc doanh thu.', '#muc-tieu', 'target'],
      ['Một hệ đo', 'UTM, sự kiện, CRM.', '#chuan-bi', 'code'],
      ['Một thử nghiệm mỗi lần', 'Một biến, đủ thời gian.', '#dinh-dang', 'sliders']]
  },
  sisters: [['Remarketing', 'Nói tiếp với người đã quan tâm.', MC + 'remarketing/'],
    ['Tối ưu chuyển đổi', 'Sửa điểm khách dừng lại trên trang đích và form.', MC + 'toi-uu-chuyen-doi-quang-cao/'],
    ['Google Ads', 'Ba trang chi tiết về các loại chiến dịch Google.', MC + 'google-ads/']]
};

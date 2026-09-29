// Remarketing — one landing page. Remarketing runs on Google Ads and Meta;
// the platform facts (list thresholds, membership, Performance Max signals,
// custom audiences) come from their help centres as read on CHECKED.
import {SOURCES as META} from '../facebook-ads-lp/data.mjs';
import {fb, site, crm, signal, windows, frequency} from './mocks.mjs';

const S = id => 'https://support.google.com/google-ads/answer/' + id;
const MC = '/dich-vu/quang-cao-da-kenh/';

export const CHECKED = '2026-09-29';

export const SOURCES = {
  segments: [S('2472738'), 'Google: tệp dữ liệu hoạt động thế nào'],
  setup: [S('2454000'), 'Google: thiết lập tệp dữ liệu'],
  customerMatch: [S('6379332'), 'Google: Customer Match'],
  pmaxSignals: [S('14587068'), 'Google: tín hiệu Performance Max'],
  fix: [S('2590189'), 'Google: sửa tệp và thẻ website'],
  metaCustom: [META.custom[0], 'Meta: đối tượng tùy chỉnh'],
  metaPixel: [META.pixel[0], 'Meta: Pixel'],
  metaCatalog: [META.catalogAds[0], 'Meta: quảng cáo danh mục']
};

export default {
  slug: 'remarketing',
  channel: 'remarketing',
  name: 'Remarketing',
  checked: CHECKED,
  docName: 'tài liệu Google Ads và Meta',
  SOURCES,
  sourceLabel: 'Tài liệu nền tảng:',
  meta: {
    title: 'Remarketing: nói tiếp với người đã quan tâm',
    description: 'Remarketing trên Google và Meta: chia tệp theo hành vi và thời gian, loại người đã mua, kiểm soát tần suất, '
      + 'dữ liệu khách hàng được phép dùng, cách đo và triển khai cùng POWAI.'
  },
  hero: {
    sub: 'Nói tiếp <em>đúng điều khách đã quan tâm</em>, không bám đuổi.',
    lead: 'Remarketing hiện quảng cáo cho người đã ghé website, xem video, bỏ giỏ hoặc đã là khách. '
      + 'Làm tốt là chia tệp theo hành vi và thời gian, loại người đã mua, và giữ tần suất vừa phải.',
    cta: 'Xem bốn cách làm',
    rungs: [['page', 'Đã xem trang', 'Nhắc món vừa xem'], ['cart', 'Bỏ giỏ', 'Giải đáp rào cản'], ['play', 'Đã xem video', 'Kể tiếp câu chuyện'],
      ['users', 'Khách cũ', 'Mua lại, món đi kèm'], ['minus', 'Đã mua', 'Loại khỏi tệp cũ']]
  },
  when: {
    title: 'Hợp khi đã có người ghé qua mà chưa mua.',
    lead: 'Remarketing không tạo khách mới. Nó giúp người đã quan tâm quay lại hoàn tất, nên cần đủ lưu lượng và đo lường trước.',
    journey: [['page', 'Khách xem sản phẩm hoặc dịch vụ'], ['close', 'Rời đi chưa mua'], ['users', 'Vào tệp theo hành vi'],
      ['eye', 'Thấy quảng cáo tiếp nối'], ['check', 'Quay lại mua hoặc để lại số']],
    inputs: [['code', 'Thẻ Google, Meta Pixel'], ['users', 'Tệp theo hành vi'], ['table', 'Danh sách khách được phép dùng'], ['creative', 'Thông điệp tiếp nối']],
    core: 'Nền tảng hiện quảng cáo cho người trong tệp',
    outputs: [['repeat', 'Lượt quay lại'], ['check', 'Đơn, lead từ người cũ'], ['alert', 'Tần suất cần theo dõi']],
    fit: ['Website có lượt truy cập đều mỗi ngày', 'Chu kỳ mua dài: khách cần xem nhiều lần', 'Có giỏ hàng hoặc form mà nhiều người bỏ dở',
      'Có danh sách khách cũ được phép dùng để quảng cáo'],
    notFit: ['Website quá ít người vào: tệp không đủ để chạy', 'Chưa gắn thẻ hay Pixel', 'Chỉ có một mẫu quảng cáo cho mọi người',
      'Muốn dùng danh sách mua từ bên ngoài'],
    src: ['segments', 'metaCustom']
  },
  formats: {
    eyebrow: 'BỐN CÁCH LÀM',
    title: 'Mỗi hành vi, một thông điệp.',
    lead: 'Chọn một cách để xem khách đã làm gì và thấy quảng cáo nào sau đó.',
    whereLabel: 'Khách đã làm gì', whatLabel: 'Quảng cáo nói gì',
    items: [
      {key: 'site', label: 'Đã xem trang, dịch vụ', icon: 'page', stage: () => signal('remarketing'), tag: 'HÀNH TRÌNH',
        where: 'Xem một trang sản phẩm hoặc dịch vụ rồi rời đi.', what: 'Nhắc lại giá trị của đúng thứ họ đã xem.',
        more: [['Cần', 'Thẻ Google hoặc Meta Pixel trên website.']]},
      {key: 'cart', label: 'Bỏ giỏ', icon: 'cart', stage: () => fb('cat-retarget'),
        where: 'Thêm vào giỏ hoặc bắt đầu thanh toán mà chưa mua.', what: 'Hiện đúng sản phẩm, giải đáp phí giao, đổi trả.',
        more: [['Cần', 'Danh mục sản phẩm và sự kiện khớp mã sản phẩm để hiện đúng món.']]},
      {key: 'video', label: 'Đã xem video, tương tác', icon: 'play', stage: () => signal('viewer'), tag: 'HÀNH TRÌNH',
        where: 'Xem video, thích hoặc lưu bài.', what: 'Nội dung sâu hơn: cách dùng, đánh giá, lời mời.',
        more: [['Lưu ý', 'Người xem video không mặc định là người muốn mua.']]},
      {key: 'crm', label: 'Khách cũ (danh sách)', icon: 'table', stage: () => signal('customer'), tag: 'DỮ LIỆU',
        where: 'Đã mua hoặc đã để lại thông tin.', what: 'Mua lại, món đi kèm; hoặc loại khỏi quảng cáo tìm khách mới.',
        more: [['Điều kiện', 'Chỉ dùng dữ liệu khách đã đồng ý; nền tảng mã hóa trước khi đối sánh.']]}
    ],
    note: {label: 'PERFORMANCE MAX KHÔNG CHỈ CHẠY KHÁCH CŨ', ic: 'alert', tone: 'warn',
      text: 'Danh sách khách trong Performance Max là tín hiệu; hệ thống có thể hiện quảng cáo cho người ngoài danh sách. Kiểm tra cách nhắm của từng chiến dịch trước khi gọi là remarketing.'},
    src: ['segments', 'pmaxSignals', 'metaCatalog']
  },
  prep: {
    title: 'Tệp, thông điệp và quy tắc loại trừ.',
    lead: 'Remarketing tốt là chia tệp đúng, không phải nhiều quảng cáo hơn.',
    principle: 'Mỗi tệp một thông điệp. Tệp gần loại tệp xa để không chồng lặp; người đã mua loại khỏi tệp chưa mua.',
    boards: [() => windows(1)],
    tiles: [['code', 'Thẻ, Pixel', 'Trên mọi trang cần đo'], ['users', 'Tệp đủ lớn', 'Google: tối thiểu 100 người hoạt động trong 30 ngày'],
      ['clock', 'Thời hạn thành viên', 'Google: tối đa 540 ngày'], ['minus', 'Loại trừ', 'Người đã mua, nhân viên']],
    assets: [['Sự kiện', 'Thẻ Google, Meta Pixel', 'Xem trang, thêm giỏ, mua.'], ['Danh mục', 'Danh mục sản phẩm', 'Cho quảng cáo hiện đúng món.'],
      ['Dữ liệu', 'Danh sách khách', 'Chỉ khách đã đồng ý.'], ['Chữ', 'Thông điệp theo tệp', 'Mỗi tệp một câu.']],
    specs: [['Tệp tối thiểu (Google)', '100 người hoạt động / 30 ngày', 'Áp dụng cho Mạng Hiển thị và Mạng Tìm kiếm; dưới mức này quảng cáo không chạy.'],
      ['Thời hạn thành viên (Google)', 'Tối đa 540 ngày', 'Người không hoạt động quá 18 tháng bị loại khỏi tệp.'],
      ['Danh sách khách', 'Customer Match / đối tượng tùy chỉnh', 'Dữ liệu bên thứ nhất, được mã hóa khi đối sánh.'],
      ['Khung thời gian', '1–7, 8–30, 31–90 ngày', 'Ví dụ của POWAI, chỉnh theo chu kỳ mua.']],
    src: ['segments', 'customerMatch', 'metaCustom']
  },
  goals: {
    title: 'Mục tiêu theo trạng thái của khách.',
    lead: 'Nhóm đầu là việc cần khách làm. Nhóm sau là cách kiểm soát để không làm phiền.',
    items: [
      {key: 'finish', group: 'Mục tiêu', groupColor: '#c9b8ec', label: 'Hoàn tất đơn, form', icon: 'check', stage: () => fb('cat-retarget'),
        facts: [['Tệp', 'Bỏ giỏ, bỏ form.'], ['Đo bằng', 'Hoàn tất, và loại người đã chuyển đổi.']]},
      {key: 'advice', group: 'Mục tiêu', groupColor: '#c9b8ec', label: 'Tư vấn sâu hơn', icon: 'chat', stage: () => site(),
        facts: [['Tệp', 'Người xem trang dịch vụ, bài hướng dẫn.'], ['Đo bằng', 'Lead phù hợp, không chỉ lượt quay lại.']]},
      {key: 'rebuy', group: 'Mục tiêu', groupColor: '#c9b8ec', label: 'Mua lại, mua thêm', icon: 'repeat', stage: () => crm('sale', ['Remarketing', 'Website', 'Remarketing']),
        stageTag: 'CRM', facts: [['Tệp', 'Khách cũ có nhu cầu liên quan.'], ['Lưu ý', 'Tách ngân sách chăm sóc khỏi tìm khách mới.']]},
      {key: 'windows', group: 'Kiểm soát', groupColor: '#85e1c1', label: 'Khung thời gian', icon: 'clock', stage: () => windows(0),
        stageTag: 'CÀI ĐẶT MẪU', facts: [['Cách làm', 'Chia tệp 1–7, 8–30, 31–90 ngày; tệp gần loại tệp xa.'], ['Lưu ý', 'Là ví dụ, chỉnh theo chu kỳ mua.']]},
      {key: 'exclude', group: 'Kiểm soát', groupColor: '#85e1c1', label: 'Loại người đã mua', icon: 'minus', stage: () => windows(3),
        stageTag: 'CÀI ĐẶT MẪU', facts: [['Cách làm', 'Loại người đã mua khỏi tệp chưa mua.'], ['Vì sao', 'Không trả tiền nhắc người đã xong.']]},
      {key: 'frequency', group: 'Kiểm soát', groupColor: '#85e1c1', label: 'Tần suất', icon: 'repeat', stage: () => frequency(),
        stageTag: 'BÁO CÁO MẪU', facts: [['Theo dõi', 'Số lần một người thấy quảng cáo.'], ['Khi cao', 'Mở rộng tệp hoặc đổi thông điệp.']]}
    ],
    note: {label: 'DỮ LIỆU KHÁCH HÀNG', ic: 'shield', tone: 'warn',
      text: 'Chỉ dùng dữ liệu khách hàng tự thu thập và được phép dùng cho quảng cáo. Không mua danh sách bên ngoài. Tỷ lệ đối sánh không phải tỷ lệ người sẽ thấy quảng cáo.'},
    src: ['customerMatch', 'metaCustom', 'segments']
  },
  measure: {
    title: 'Đo kết quả tăng thêm, không chỉ lượt quay lại.',
    lead: 'Người trong tệp remarketing vốn đã quan tâm; một phần sẽ quay lại dù không có quảng cáo. Bấm từng tầng để xem cách đọc.',
    tiers: [
      ['list', 'Người trong tệp', '8.400', [['Người trong tệp', '8.400', 'Người hoạt động trong khung thời gian.'], ['Tần suất', '3,2', 'Số lần trung bình một người thấy quảng cáo.']]],
      ['back', 'Quay lại', '620', [['Lượt quay lại', '620', 'Người bấm quảng cáo quay lại trang.'], ['Chi phí mỗi lượt', 'Theo nền tảng', 'Đọc cùng tầng sau, không đọc riêng.']]],
      ['done', 'Hoàn tất', '74', [['Đơn, lead', '74', 'Người hoàn tất sau khi quay lại.'], ['Lead phù hợp', '31', 'Xác nhận trong CRM.']]]
    ],
    tips: {list: 'Tần suất tăng mà quay lại không tăng: tệp nhỏ hoặc thông điệp lặp.', done: 'Muốn biết kết quả tăng thêm thật, chạy thử nghiệm có nhóm đối chứng khi đủ lưu lượng.'},
    note: {label: 'KẾT QUẢ TĂNG THÊM', ic: 'chart', text: 'Báo cáo nền tảng đếm cả người lẽ ra vẫn quay lại. Khi đủ lưu lượng, so với một nhóm không thấy quảng cáo để biết phần tăng thêm.'},
    src: ['segments', 'metaPixel']
  },
  rollout: {
    title: 'Sáu bước từ thẻ tới báo cáo.',
    steps: [['Kiểm tra đo lường', 'Thẻ Google, Meta Pixel, sự kiện xem trang, thêm giỏ, mua.', 'Sự kiện chạy thử đã ghi'],
      ['Chia tệp', 'Theo hành vi và khung thời gian; tệp loại trừ.', 'Sơ đồ tệp'],
      ['Thông điệp', 'Mỗi tệp một thông điệp và một điểm đến.', 'Bộ quảng cáo theo tệp'],
      ['Dữ liệu khách', 'Làm sạch danh sách được phép dùng, tải lên.', 'Danh sách đã đối sánh'],
      ['Chạy & theo dõi', 'Tần suất, lượt quay lại, hoàn tất.', 'Ghi chú tuần đầu'],
      ['Điều chỉnh & báo cáo', 'Mở rộng hoặc thu hẹp tệp, đổi thông điệp, đối chiếu CRM.', 'Báo cáo định kỳ']],
    icons: ['code', 'users', 'creative', 'table', 'play', 'chart'],
    phases: [['Chuẩn bị', [0, 1, 2, 3]], ['Chạy', [4]], ['Tối ưu', [5]]],
    checks: ['Thẻ Google hoặc Meta Pixel trên mọi trang', 'Sự kiện thêm giỏ và mua', 'Tệp đủ người hoạt động', 'Tệp loại trừ người đã mua',
      'Mỗi tệp một thông điệp', 'Danh sách khách đã đồng ý', 'Theo dõi tần suất', 'CRM ghi đơn và lead'],
    src: ['setup', 'fix', 'metaPixel']
  },
  faq: {
    items: [
      ['Remarketing có phải bám đuổi khách không?', 'Không nên. Làm đúng là chia tệp theo hành vi, nói đúng điều khách đã xem, giới hạn tần suất và loại người đã mua.'],
      ['Website ít người vào có chạy được không?', 'Google yêu cầu tệp có tối thiểu 100 người hoạt động trong 30 ngày để chạy trên Mạng Hiển thị và Tìm kiếm. Tệp nhỏ hơn thì chưa chạy được.'],
      ['Performance Max có phải chỉ chạy remarketing?', 'Không. Danh sách khách trong Performance Max là tín hiệu; hệ thống có thể tiếp cận ngoài nhóm đó.'],
      ['Dùng số điện thoại khách cũ được không?', 'Được, nếu khách đã đồng ý và dữ liệu do doanh nghiệp tự thu thập. Nền tảng mã hóa dữ liệu khi đối sánh.'],
      ['Chạy remarketing trên kênh nào?', 'Google (Hiển thị, YouTube, Tìm kiếm, Performance Max) và Meta (Facebook, Instagram). Zalo Ads có đối tượng tùy chỉnh từ số điện thoại và người đã tương tác.'],
      ['Làm sao biết remarketing có hiệu quả thật?', 'Đọc lead phù hợp và đơn trong CRM, và khi đủ lưu lượng thì so với nhóm đối chứng không thấy quảng cáo.']
    ],
    topics: [['Cách làm', 'route', [0, 2, 4]], ['Dữ liệu & đo', 'shield', [1, 3, 5]]],
    src: ['segments', 'customerMatch', 'pmaxSignals']
  },
  contactGoals: [['finish', 'Tăng hoàn tất đơn, form'], ['advice', 'Nhắc người đã xem dịch vụ'], ['rebuy', 'Mua lại, mua thêm'], ['audit', 'Rà soát tệp đang chạy']],
  recap: {
    title: 'Ba việc trước khi chạy remarketing.',
    items: [['Đo trước', 'Thẻ và Pixel trên mọi trang.', '#chuan-bi', 'code'],
      ['Chia tệp', 'Theo hành vi, thời gian, loại người đã mua.', '#muc-tieu', 'users'],
      ['Đo phần tăng thêm', 'CRM và nhóm đối chứng.', '#do-luong', 'chart']]
  },
  sisters: [['Performance Marketing', 'Phối hợp nhiều kênh theo cùng một hệ đo.', MC + 'performance-marketing/'],
    ['Google Ads', 'Ba trang chi tiết về các loại chiến dịch Google.', MC + 'google-ads/'],
    ['Facebook Ads', 'Ba trang chi tiết về Facebook, Instagram, Messenger.', MC + 'facebook-ads/']]
};


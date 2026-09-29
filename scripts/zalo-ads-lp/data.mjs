// Content for the three Zalo Ads landing pages.
//
// Every platform fact here was checked against the Zalo Ads business guides
// (ads.zalo.me/business) and the ZNS page on CHECKED. Numbers that describe a
// platform limit come from those pages; every other number on the pages is a
// sample and is labelled as one. Sentences stay short on purpose.

export const CHECKED = '2026-09-28';

// Zalo Ads states that a VAT invoice is issued for each top-up but does not
// publish the rate on the pages checked. Left null on purpose: the page
// shows no rate and says the rate follows the invoice.
export const TAX_RATE = null;

const B = slug => 'https://ads.zalo.me/business/' + slug + '/';

// key → [url, link text]. Rendered by shared.sourceList (a URL id is used as is).
export const SOURCES = {
  formats: [B('cac-hinh-thuc-quang-cao-tren-zalo-ads'), 'Các hình thức quảng cáo'],
  pricing: [B('cac-hinh-thuc-tinh-phi-va-cach-dat-gia-thau-tren-zalo-ads'), 'Hình thức tính phí & đặt giá thầu'],
  oa: [B('huong-dan-tao-quang-cao-zalo-official-account'), 'Quảng cáo Official Account'],
  message: [B('huong-dan-tao-quang-cao-tin-nhan-tren-zalo-ads-message-ads'), 'Quảng cáo tin nhắn'],
  audience: [B('chon-nhom-doi-tuong-quang-cao'), 'Nhóm đối tượng quảng cáo'],
  article: [B('quang-cao-bai-viet-tren-zalo'), 'Quảng cáo bài viết'],
  topup: [B('huong-dan-nap-tien-vao-tai-khoan-zalo-ads'), 'Nạp tiền vào tài khoản'],
  vat: [B('toi-muon-xuat-hoa-don-vat-cho-so-tien-nap-duoc-khong'), 'Hóa đơn VAT cho tiền nạp'],
  invoiceNotes: [B('luu-y-xuat-hoa-don-zalo-ads'), 'Lưu ý xuất hóa đơn'],
  budgetBid: [B('huong-dan-tao-quang-cao-dat-gia-thau-theo-ngan-sach'), 'Đặt giá thầu theo ngân sách'],
  setup: [B('thiet-lap-quang-cao-de-dang'), 'Thiết lập quảng cáo'],
  form: [B('huong-dan-tao-quang-cao-form'), 'Quảng cáo Form'],
  formRules: [B('quy-dinh-ve-su-dung-zalo-form'), 'Quy định sử dụng Zalo Form'],
  website: [B('huong-dan-quang-cao-website'), 'Quảng cáo website'],
  video: [B('huong-dan-tao-quang-cao-video'), 'Quảng cáo video'],
  videoDiary: [B('quang-cao-video-tren-nhat-ky-zalo'), 'Video trên Nhật ký Zalo'],
  commerce: [B('huong-dan-tao-quang-cao-commerce'), 'Quảng cáo Commerce'],
  license: [B('san-pham-can-giay-phep'), 'Sản phẩm cần giấy phép'],
  pixel: [B('huong-dan-thiet-lap-zalo-ads-pixel'), 'Thiết lập Zalo Ads Pixel'],
  pixelOpt: [B('toi-uu-quang-cao-website-zalo-ads-pixel'), 'Tối ưu quảng cáo website bằng Pixel'],
  zns: ['https://zalo.solutions/zns', 'Zalo Notification Service (ZNS)']
};

// Points that could not be confirmed on CHECKED. They are left out of the
// pages or worded as an illustration; listed here for the next review.
export const UNVERIFIED = [
  'Thuế suất VAT trên tiền nạp: Zalo Ads chỉ ghi có xuất hóa đơn VAT, không ghi mức thuế. TAX_RATE để null.',
  'Mức nạp tối thiểu và nạp qua VietQR: không thấy trong hướng dẫn nạp tiền đã kiểm tra.',
  'Kích thước banner Display ngoài Medium Rectangle: trang hình thức quảng cáo không liệt kê.',
  'Nhắm theo thiết bị, hệ điều hành và danh sách nhóm sở thích cụ thể: chỉ thấy tên chung "nền tảng", "sở thích".',
  'Ảnh quảng cáo website: hướng dẫn website ghi 1028 × 533, các hướng dẫn khác ghi 1024 × 533. Trang dùng 1024 × 533.',
  'Ảnh 1024 × 533 và mô tả 90 ký tự cho Form, Tin nhắn, Commerce: hướng dẫn riêng không ghi, trang dùng khung chung của thẻ quảng cáo.',
  'Tài khoản cá nhân chạy quảng cáo tin nhắn: các trang Zalo nói khác nhau; trang ghi cần OA đã xác thực.',
  'Vùng an toàn chính xác của ảnh 1024 × 533: Zalo không công bố; hình trên trang là minh họa.',
  'Quy định nội dung ZNS: chỉ ghi ZNS là tin thông báo theo mẫu, tách khỏi Zalo Ads.',
  'Tên đầy đủ các mục tiêu trong công cụ tạo quảng cáo: trang dùng tên hình thức quảng cáo Zalo công bố.'
];

/* ================================================================== *
 * Page 01 — six ways to run
 * ================================================================== */
export const TYPES = [
  {
    id: 'oa', tag: 'OFFICIAL ACCOUNT',
    title: 'Quảng cáo Official Account',
    description: 'Mời người dùng Zalo bấm Quan tâm trang OA của doanh nghiệp.',
    bestFor: 'Hợp khi muốn có một tệp người quan tâm OA để trò chuyện, gửi bài viết về sau.',
    sourceKeys: ['oa', 'formats', 'pricing']
  },
  {
    id: 'web', tag: 'WEBSITE & BÀI VIẾT',
    title: 'Website & Bài viết OA',
    description: 'Đưa người dùng tới website của bạn hoặc một bài viết đã đăng trên OA.',
    bestFor: 'Hợp khi đã có trang sản phẩm hoặc bài viết đủ tốt để khách tự đọc.',
    sourceKeys: ['website', 'article', 'pixel']
  },
  {
    id: 'form', tag: 'FORM',
    title: 'Quảng cáo Form',
    description: 'Bấm quảng cáo là mở biểu mẫu trong Zalo, tên và số điện thoại điền sẵn.',
    bestFor: 'Hợp khi cần số điện thoại để gọi lại và ngành hàng nằm trong danh sách Zalo hỗ trợ.',
    sourceKeys: ['form', 'formRules', 'pricing']
  },
  {
    id: 'msg', tag: 'TIN NHẮN',
    title: 'Quảng cáo tin nhắn',
    description: 'Bấm quảng cáo là mở cuộc trò chuyện 1:1 với OA, có lời chào soạn sẵn.',
    bestFor: 'Hợp khi khách cần hỏi trước khi mua và có người trực trả lời trên OA.',
    sourceKeys: ['message', 'pricing']
  },
  {
    id: 'commerce', tag: 'COMMERCE',
    title: 'Quảng cáo Commerce',
    description: 'Khách xem sản phẩm, chọn loại và đặt mua ngay trong Zalo.',
    bestFor: 'Hợp khi bán hàng hóa hữu hình, có người xác nhận đơn và giao hàng.',
    sourceKeys: ['commerce', 'pricing']
  },
  {
    id: 'media', tag: 'VIDEO & DISPLAY',
    title: 'Video & Display',
    description: 'Video và banner trên Zalo và các trang, ứng dụng trong mạng Zalo.',
    bestFor: 'Hợp khi ra mắt sản phẩm hoặc cần nhiều người biết tên thương hiệu trong thời gian ngắn.',
    sourceKeys: ['video', 'videoDiary', 'formats']
  }
];

// [name, label, text] — the orbit on page 01.
export const JOURNEY = [
  ['Lướt Zalo', 'CHẶNG 1 · ĐANG LƯỚT',
    'Khách mở Zalo để nhắn tin, xem Nhật ký, đọc tin hoặc nghe nhạc. Quảng cáo nằm giữa những thứ họ đang xem.'],
  ['Thấy quảng cáo', 'CHẶNG 2 · DỪNG LẠI',
    'Zalo Ads chọn người thấy quảng cáo theo đối tượng và giá thầu bạn đặt. Một ảnh và một câu mô tả phải đủ để họ dừng lại.'],
  ['Quan tâm · nhắn · form · web', 'CHẶNG 3 · HÀNH ĐỘNG',
    'Khách bấm Quan tâm OA, mở cuộc trò chuyện, để lại số trong form hoặc vào website. Kiểu quảng cáo quyết định nút dẫn tới đâu.'],
  ['Tư vấn qua Zalo', 'CHẶNG 4 · NGƯỜI THẬT',
    'Nhân viên trả lời tin nhắn trên OA hoặc gọi lại số vừa để lại. Trả lời chậm thì khách nguội.'],
  ['Đơn hàng & CRM', 'CHẶNG 5 · GHI NHẬN',
    'Đơn và trạng thái khách được ghi vào CRM. Số điện thoại khách đã mua có thể tải lên làm đối tượng tùy chỉnh.']
];

const IMG_1024 = ['Ảnh quảng cáo', '1024 × 533 px · tối đa 2 MB'];
const SAFE = ['Vùng an toàn', 'Sản phẩm và chữ ở giữa ảnh', 'Zalo không công bố vùng an toàn chính xác. Hình bên chỉ minh họa.'];
const REVIEW = ['Duyệt', '30–60 phút', 'Thời gian duyệt ghi trong hướng dẫn của từng hình thức.'];
const FEED_PLACES = [['Nhật ký (News Feed)', true], ['Bài viết (Article)', true]];

/* Per type: chapter content. Formats: [id, name, where, what]. */
export const PANELS = {
  oa: {
    formats: [
      ['oa-feed', 'Thẻ quảng cáo trong Nhật ký', 'Giữa các bài trong Nhật ký (News Feed) của Zalo.',
        'Ảnh 1024 × 533, tên OA có dấu xác thực, nhãn Quảng cáo, một câu mô tả và nút Quan tâm.'],
      ['oa-page', 'Trang OA sau khi bấm', 'Khi khách chạm tên hoặc ảnh của quảng cáo.',
        'Ảnh bìa, ảnh đại diện, nút Quan tâm và Nhắn tin, menu ba nút và các bài đã đăng.'],
      ['oa-network', 'Trong mạng Zalo', 'Trang tin tức và ứng dụng nghe nhạc thuộc mạng Zalo (Zalo Network).',
        'Cùng ảnh và mô tả, hiện thành một thẻ giữa nội dung của trang.'],
      ['oa-chat', 'Trò chuyện sau khi quan tâm', 'Cuộc trò chuyện với OA trong Zalo.',
        'Người đã quan tâm nhắn cho OA; nhân viên trả lời như một cuộc chat thường.']
    ],
    billing: [['CPC', 'Trả khi khách nhấp vào quảng cáo.'], ['CPF', 'Trả cho mỗi lượt quan tâm OA.']],
    how: ['Bạn chọn đối tượng, giá thầu và ngân sách',
      'Zalo Ads chọn người thấy thẻ quảng cáo',
      'Thẻ hiện trong Nhật ký, bài viết hoặc mạng Zalo',
      'Khách bấm Quan tâm hoặc mở trang OA',
      'Người quan tâm nhắn tin, nhân viên trả lời'],
    inputs: ['OA đã xác thực', 'Ảnh 1024 × 533', 'Mô tả ngắn', 'Người trực tin nhắn'],
    outputs: 'Lượt quan tâm OA; người quan tâm chưa phải người mua',
    setup: {
      pick: [['Official Account', 'on'], ['Website'], ['Tin nhắn']],
      audience: 'Nữ · 25–45 tuổi · TP.HCM',
      pricing: 'CPC hoặc CPF',
      budget: 'Từ 500.000đ/ngày',
      placements: [...FEED_PLACES, ['Mạng Zalo (Zalo Network)', true]],
      ad: [['s-shelf', 'r192', 'Ảnh chính'], ['s-desk', 'r192', 'Ảnh thay thế'], ['s3', 'r192', 'Ảnh sản phẩm']]
    },
    specs: [
      [...IMG_1024, 'Kích thước Zalo yêu cầu cho thẻ quảng cáo OA.'],
      ['Mô tả', 'tối đa 90 ký tự', 'Một câu nói rõ vì sao nên quan tâm OA.'],
      SAFE,
      ['OA', 'Đã xác thực · quyền Admin', 'Người tạo quảng cáo phải là Admin hoặc được OA ủy quyền.'],
      ['Tính phí', 'CPC · CPF', 'Theo lượt nhấp hoặc theo lượt quan tâm.'],
      ['Ngân sách', 'Từ 500.000đ/ngày', 'Mức tối thiểu trong hướng dẫn quảng cáo OA.'],
      ['Giá tự đặt', 'Từ 10.000đ/lượt quan tâm · tối thiểu 100 lượt', 'Khi tự đặt giá cho mỗi lượt quan tâm.'],
      ['Giấy phép', 'Theo ngành hàng', 'Ngành cần giấy phép phải tải lên trước khi gửi duyệt.'],
      REVIEW
    ],
    assets: [
      ['Ảnh', 'Ảnh 1024 × 533', 'Sản phẩm rõ, ít chữ, nằm giữa ảnh.'],
      ['Chữ', 'Mô tả dưới 90 ký tự', 'Nói khách được gì khi quan tâm OA.'],
      ['Trang', 'Trang OA', 'Ảnh bìa, menu ba nút, bài viết gần đây.'],
      ['Tin nhắn', 'Câu trả lời mẫu', 'Cho người vừa quan tâm và nhắn tới.']
    ],
    measure: [
      ['Quan tâm', 'follow', 'plus', 'Lượt quan tâm', 'Khách thành người quan tâm OA; OA hiện trong danh sách của họ.'],
      ['Xem trang OA', 'oapage', 'eye', 'Lượt nhấp', 'Trang OA mở với ảnh bìa, menu và bài viết.'],
      ['Nhắn tin', 'chat', 'chat', 'Người nhắn tin', 'Cuộc trò chuyện với OA mở ra; nhân viên trả lời.'],
      ['Tư vấn xong', 'crm', 'check', 'Đội tư vấn xác nhận', 'Nhân viên ghi khách đã được tư vấn vào CRM.']
    ],
    track: 'Zalo Ads đếm lượt nhấp và lượt quan tâm. Người nhắn tin và người đã được tư vấn phải đếm trong hộp thư OA và CRM.',
    bid: 'CPF trả cho mỗi lượt quan tâm, CPC trả cho mỗi lượt nhấp. Tự đặt giá thì từ 10.000đ mỗi lượt quan tâm, tối thiểu 100 lượt.',
    caution: 'Lượt quan tâm không phải khách hàng. Đo thêm tỷ lệ người quan tâm có nhắn tin.',
    paths: [
      ['Quan tâm rồi nhắn', 'Chào người mới quan tâm bằng một câu hỏi cụ thể để họ nhắn lại.'],
      ['Bài viết cho người đã quan tâm', 'Đăng bài đều trên OA để người quan tâm có lý do mở lại.'],
      ['Đo theo tỷ lệ nhắn tin', 'So số người nhắn trên số lượt quan tâm theo từng mẫu quảng cáo.']
    ],
    diagnosis: [
      ['Nhiều lượt quan tâm OA nhưng ít người nhắn', 'Lời chào có hỏi gì cụ thể không? Menu OA có nút nhắn tư vấn rõ không?'],
      ['Quảng cáo bị từ chối vì thiếu giấy phép', 'Ngành cần giấy phép phải tải lên trước khi gửi duyệt. Đọc lý do từ chối rồi bổ sung.']
    ],
    diag: {
      'Nhiều lượt quan tâm OA nhưng ít người nhắn': [['Lượt quan tâm', '1.200', 'good'], ['CPF', '12.000₫', 'good'], ['Người nhắn tin', '36', 'fix']],
      'Quảng cáo bị từ chối vì thiếu giấy phép': [['Mẫu gửi duyệt', '4', 'good'], ['Bị từ chối', '3', 'fix'], ['Giấy phép đã tải', '0', 'fix']]
    },
    checks: ['OA đã xác thực', 'Quyền Admin hoặc được ủy quyền', 'Ảnh 1024 × 533, dưới 2 MB', 'Mô tả dưới 90 ký tự',
      'Giấy phép ngành đã tải lên', 'Lời chào cho người mới quan tâm', 'Người trực tin nhắn trên OA']
  },

  web: {
    formats: [
      ['web-feed', 'Thẻ quảng cáo website', 'Nhật ký, bài viết và mạng Zalo.',
        'Ảnh, tên, mô tả và một nút như Mua ngay, Đặt ngay, Gọi điện hoặc Chat ngay.'],
      ['web-site', 'Website sau khi bấm', 'Mở trong trình duyệt của Zalo.',
        'Trang sản phẩm của bạn; nút gọi và nút Zalo nổi ở góc màn hình.'],
      ['art-feed', 'Thẻ quảng cáo bài viết', 'Nhật ký và mạng Zalo.',
        'Ảnh, mô tả và nút như Xem thêm; dẫn tới một bài đã đăng trên OA.'],
      ['art-read', 'Bài viết OA sau khi bấm', 'Mở ngay trong Zalo.',
        'Tiêu đề, ảnh, các đoạn viết và nút liên hệ ở cuối bài.']
    ],
    billing: [['CPC', 'Website và Bài viết đều tính theo lượt nhấp.']],
    how: ['Bạn chọn đối tượng và giá mỗi lượt nhấp',
      'Zalo Ads chọn người thấy thẻ quảng cáo',
      'Thẻ hiện trong Nhật ký, bài viết hoặc mạng Zalo',
      'Khách bấm và mở website hoặc bài viết OA',
      'Zalo Ads Pixel ghi lượt bấm nút và trang cảm ơn'],
    inputs: ['Ảnh 1024 × 533', 'Mô tả ngắn', 'Website hoặc bài viết OA', 'Zalo Ads Pixel'],
    outputs: 'Lượt vào trang, lượt đọc bài; đơn chỉ đếm được khi website đã gắn Pixel',
    setup: {
      pick: [['Website', 'on'], ['Bài viết'], ['Official Account']],
      audience: 'Nữ · 25–45 tuổi · Hà Nội, TP.HCM',
      pricing: 'CPC',
      budget: 'Đặt thầu theo ngân sách · từ 200.000đ/ngày',
      placements: [...FEED_PLACES, ['Mạng Zalo (Zalo Network)', true]],
      ad: [['s-desk', 'r192', 'Ảnh chính'], ['s2', 'r192', 'Ảnh sản phẩm'], ['s-shelf', 'r192', 'Ảnh bài viết']]
    },
    specs: [
      [...IMG_1024, 'Hướng dẫn website ghi 1028 × 533, các hướng dẫn khác ghi 1024 × 533. POWAI đối chiếu trong công cụ khi tạo.'],
      ['Mô tả', 'tối đa 90 ký tự', 'Áp dụng cho cả Website và Bài viết.'],
      SAFE,
      ['Nút website', 'Đặt ngay · Mua ngay · Gọi điện · Chat ngay', 'Chọn một nút khi tạo quảng cáo website.'],
      ['Nút bài viết', 'Xem thêm · Thử ngay · Tải ngay', 'Chọn một nút khi tạo quảng cáo bài viết.'],
      ['Bài viết', 'OA đã xác thực · bài đã đăng', 'Chỉ quảng bá được bài đã xuất bản trên OA.'],
      ['Tính phí', 'CPC', 'Trả theo lượt nhấp.'],
      ['Zalo Ads Pixel', 'Sự kiện nút bấm · sự kiện đường dẫn URL', 'Tạo trong Thư viện › Chuyển đổi rồi gắn lên website.'],
      REVIEW
    ],
    assets: [
      ['Ảnh', 'Ảnh 1024 × 533', 'Cùng món hàng với trang sẽ mở.'],
      ['Chữ', 'Mô tả dưới 90 ký tự', 'Một lợi ích, một lời mời.'],
      ['Trang', 'Trang đích hoặc bài OA', 'Mở đúng món trong ảnh, không mở trang chủ.'],
      ['Sự kiện', 'Zalo Ads Pixel', 'Sự kiện nút bấm và trang cảm ơn.']
    ],
    measure: [
      ['Mua ngay', 'site', 'page', 'Lượt nhấp', 'Trang sản phẩm mở trong trình duyệt của Zalo.'],
      ['Xem thêm', 'article', 'file', 'Lượt nhấp', 'Bài viết OA mở ngay trong Zalo.'],
      ['Nút Zalo', 'zbtn', 'chat', 'Sự kiện nút bấm', 'Khách bấm nút Zalo trên website; Pixel ghi một lượt bấm.'],
      ['Đặt hàng', 'order', 'cart', 'Sự kiện đường dẫn URL', 'Trang cảm ơn mở ra; Pixel ghi theo đường dẫn của trang.']
    ],
    track: 'Zalo Ads đếm lượt nhấp. Việc khách làm trên website cần Zalo Ads Pixel: sự kiện nút bấm hoặc sự kiện đường dẫn URL. Muốn tối ưu theo chuyển đổi, sự kiện phải ở trạng thái Đang hoạt động, tức có dữ liệu trong 7 ngày.',
    bid: 'Website và Bài viết tính theo CPC. Tối ưu theo chuyển đổi chỉ dùng cho quảng cáo Website đã có Pixel.',
    caution: 'Lượt nhấp chưa phải người đọc. Trang tải chậm trong trình duyệt của Zalo làm mất người đã bấm.',
    paths: [
      ['Bài viết trước, website sau', 'Người đọc hết bài OA đã hiểu sản phẩm; mời họ sang trang mua ở lượt sau.'],
      ['Gắn Pixel trước khi chạy', 'Tạo sự kiện nút bấm cho nút gọi, nút Zalo và sự kiện đường dẫn cho trang cảm ơn.'],
      ['UTM cho từng mẫu', 'Gắn UTM để GA4 tách được khách từ Zalo Ads theo từng quảng cáo.']
    ],
    diagnosis: [
      ['Nhiều lượt nhấp, ít đơn', 'Trang có mở đúng món trong ảnh không? Trang cảm ơn có được Pixel ghi không?'],
      ['Quảng cáo bị từ chối vì thiếu giấy phép', 'Mỹ phẩm cần Phiếu công bố. Tải giấy phép rồi gửi duyệt lại.']
    ],
    diag: {
      'Nhiều lượt nhấp, ít đơn': [['Lượt nhấp', '940', 'good'], ['Sự kiện nút bấm', '58', 'consider'], ['Sự kiện đường dẫn URL', '3', 'fix']],
      'Quảng cáo bị từ chối vì thiếu giấy phép': [['Mẫu gửi duyệt', '3', 'good'], ['Bị từ chối', '2', 'fix'], ['Phiếu công bố', 'Chưa tải', 'fix']]
    },
    checks: ['Ảnh đúng kích thước, dưới 2 MB', 'Mô tả dưới 90 ký tự', 'Liên kết mở đúng trang sản phẩm', 'Trang tải nhanh trên điện thoại',
      'Pixel có sự kiện nút bấm', 'Sự kiện đường dẫn cho trang cảm ơn', 'Bài viết đã đăng trên OA đã xác thực']
  },

  form: {
    formats: [
      ['form-feed', 'Thẻ quảng cáo Form', 'Nhật ký và bài viết trong Zalo.',
        'Ảnh, mô tả và nút Đăng ký.'],
      ['form-open', 'Form mở trong Zalo', 'Ngay khi khách bấm, không rời Zalo.',
        'Tên và số điện thoại điền sẵn; thêm câu hỏi theo mẫu tư vấn, mua sản phẩm hoặc thông tin sản phẩm.'],
      ['form-thanks', 'Màn cảm ơn', 'Sau khi khách gửi.',
        'Lời cảm ơn và bước tiếp theo.'],
      ['form-manage', 'Dữ liệu Form', 'Trong công cụ Zalo Ads.',
        'Danh sách người đã gửi; tải về bằng Tải dữ liệu Form để gọi lại.']
    ],
    billing: [['CPC', 'Trả theo lượt nhấp.'], ['CPA', 'Trả theo lượt gửi form.'], ['CPM', 'Trả theo 1.000 lượt hiển thị.']],
    how: ['Bạn chọn mẫu form và câu hỏi',
      'Zalo Ads chọn người thấy quảng cáo',
      'Khách bấm Đăng ký, form mở với tên và số điện thoại điền sẵn',
      'Khách gửi, màn cảm ơn hiện ra',
      'Bạn tải dữ liệu Form và gọi lại'],
    inputs: ['OA hoặc Hồ sơ quảng cáo', 'Câu hỏi form', 'Ngành được hỗ trợ', 'Người gọi lại'],
    outputs: 'Danh sách tên và số điện thoại; lead chưa gọi thì chưa phải khách',
    setup: {
      pick: [['Form', 'on'], ['Tin nhắn'], ['Website']],
      audience: 'Nữ · 25–45 tuổi · TP.HCM',
      pricing: 'CPC · CPA · CPM',
      budget: 'Từ 3.000đ/lượt nhấp · 200.000đ/ngày',
      placements: FEED_PLACES,
      ad: [['s-shelf', 'r192', 'Ảnh chính'], ['s2', 'r192', 'Ảnh sản phẩm'], ['s-hero', 'r192', 'Ảnh không gian']]
    },
    specs: [
      [...IMG_1024, 'Khung chung của thẻ quảng cáo Zalo; hướng dẫn Form không ghi riêng.'],
      ['Mô tả', 'tối đa 90 ký tự', 'Khung chung của thẻ quảng cáo; kiểm lại trong công cụ khi tạo.'],
      SAFE,
      ['Trường bắt buộc', 'Họ tên · Số điện thoại', 'Điền sẵn từ tài khoản Zalo của khách.'],
      ['Câu hỏi thêm', 'Tối đa 20 câu', 'Nên giữ 1–2 câu để form ngắn.'],
      ['Mẫu form', 'Tư vấn · Mua sản phẩm · Thông tin sản phẩm', 'Chọn mẫu gần nhất với việc khách cần làm.'],
      ['Ngành được hỗ trợ', 'Bất động sản · thẩm mỹ viện · mỹ phẩm · tài chính · giải trí',
        'Mỹ phẩm từ 14/02/2023; tài chính theo danh sách Zalo. Xem quy định sử dụng Zalo Form.'],
      ['Giá & ngân sách', 'Từ 3.000đ/lượt nhấp · 200.000đ/ngày', 'Mức tối thiểu trong hướng dẫn quảng cáo Form.'],
      ['Dữ liệu', 'Tải dữ liệu Form · Lead Center', 'Tải về để gọi lại hoặc nhập CRM.'],
      REVIEW
    ],
    assets: [
      ['Ảnh', 'Ảnh 1024 × 533', 'Nói rõ khách nhận được gì khi đăng ký.'],
      ['Câu hỏi', 'Một đến hai câu phân loại', 'Giúp biết ai cần gọi trước.'],
      ['Form', 'Mẫu form', 'Tư vấn, mua sản phẩm hoặc thông tin sản phẩm.'],
      ['Dữ liệu', 'Lịch tải dữ liệu Form', 'Tải, lọc trùng, chia người gọi trong ngày.']
    ],
    measure: [
      ['Đăng ký', 'formopen', 'form', 'Mở form', 'Form mở ngay trong Zalo, tên và số điện thoại đã điền.'],
      ['Gửi', 'lead', 'send', 'Lượt gửi form', 'Màn cảm ơn hiện ra; người gửi nằm trong dữ liệu Form.'],
      ['Gọi lại', 'crm', 'check', 'Đội tư vấn xác nhận', 'Nhân viên gọi, ghi số đúng và đúng nhu cầu vào CRM.']
    ],
    track: 'Người gửi form nằm trong dữ liệu Form của Zalo Ads. Tải về bằng Tải dữ liệu Form hoặc Lead Center, gọi lại và ghi trạng thái vào CRM.',
    bid: 'Form tính theo CPC, CPA hoặc CPM. Với CPC, giá từ 3.000đ mỗi lượt nhấp và ngân sách từ 200.000đ mỗi ngày.',
    caution: 'Form điền sẵn rất dễ gửi, nên có người không nhớ đã đăng ký. Gọi lại càng sớm càng tốt.',
    paths: [
      ['Ít câu hỏi, gọi nhanh', 'Giữ tên, số điện thoại và một câu phân loại. Gọi trong ngày khách gửi.'],
      ['Lọc trùng trước khi gọi', 'Gộp số trùng giữa các lần tải dữ liệu Form trước khi chia cho nhân viên.'],
      ['Người gửi form thành đối tượng', 'Người đã gửi form dùng làm đối tượng tùy chỉnh để nhắc lại hoặc loại trừ.']
    ],
    diagnosis: [
      ['Nhiều form nhưng số điện thoại sai / trùng', 'Lọc trùng khi tải dữ liệu Form. Thêm một câu phân loại để người bấm nhầm bỏ qua.'],
      ['Quảng cáo bị từ chối vì thiếu giấy phép', 'Kiểm tra ngành có trong danh sách Form không; mỹ phẩm cần Phiếu công bố.']
    ],
    diag: {
      'Nhiều form nhưng số điện thoại sai / trùng': [['Lượt gửi form', '180', 'good'], ['Số trùng', '42', 'fix'], ['Gọi được', '61', 'consider']],
      'Quảng cáo bị từ chối vì thiếu giấy phép': [['Mẫu gửi duyệt', '2', 'good'], ['Bị từ chối', '2', 'fix'], ['Ngành trong danh sách', 'Chưa rõ', 'consider']]
    },
    checks: ['Ngành nằm trong danh sách Form', 'OA hoặc Hồ sơ quảng cáo', 'Mẫu form và 1–2 câu hỏi', 'Màn cảm ơn có bước tiếp theo',
      'Giấy phép ngành đã tải', 'Người gọi lại trong ngày', 'Lịch tải dữ liệu Form và lọc trùng']
  },

  msg: {
    formats: [
      ['msg-feed', 'Thẻ quảng cáo tin nhắn', 'Nhật ký và bài viết trong Zalo.',
        'Ảnh, mô tả và nút Nhắn tin.'],
      ['msg-text', 'Lời chào bằng chữ', 'Mở trong cuộc trò chuyện 1:1 với OA.',
        'Kịch bản chữ tối đa 2.000 ký tự và các nút trả lời nhanh.'],
      ['msg-image', 'Lời chào có ảnh', 'Cùng cuộc trò chuyện.',
        'Ảnh kèm lời chào; khách vẫn thấy nút Gửi tin nhắn, Mở website, Gọi điện.'],
      ['msg-talk', 'Nhân viên trả lời', 'Hộp thư OA.',
        'Nhân viên đọc tin khách gửi và trả lời như một cuộc chat thường.']
    ],
    billing: [['CPC', 'Trả theo lượt nhấp.'], ['CPA', 'Trả theo lượt liên hệ qua OA.']],
    how: ['Bạn viết kịch bản lời chào và nút',
      'Zalo Ads chọn người thấy quảng cáo',
      'Khách bấm Nhắn tin, cuộc trò chuyện 1:1 mở ra',
      'Khách chọn nút hoặc gõ câu hỏi',
      'Nhân viên trả lời trên OA, ghi khách vào CRM'],
    inputs: ['OA đã xác thực', 'Kịch bản lời chào', 'Ảnh quảng cáo', 'Người trực tin nhắn'],
    outputs: 'Cuộc trò chuyện với OA; khách chỉ thành đơn khi có người trả lời',
    setup: {
      pick: [['Tin nhắn', 'on'], ['Form'], ['Official Account']],
      audience: 'Nữ · 25–45 tuổi · TP.HCM',
      pricing: 'CPC · CPA',
      ad: [['s-shelf', 'r192', 'Ảnh quảng cáo'], ['s1', 'r192', 'Ảnh lời chào'], ['s6', 'r192', 'Ảnh sản phẩm']]
    },
    specs: [
      [...IMG_1024, 'Khung chung của thẻ quảng cáo Zalo; hướng dẫn tin nhắn không ghi riêng.'],
      ['Mô tả', 'tối đa 90 ký tự', 'Khung chung của thẻ quảng cáo; kiểm lại trong công cụ khi tạo.'],
      ['Tên kịch bản', 'tối đa 50 ký tự', 'Tên nội bộ để phân biệt các kịch bản.'],
      ['Nội dung tin nhắn', 'tối đa 2.000 ký tự', 'Lời chào gửi khi khách mở cuộc trò chuyện.'],
      SAFE,
      ['Loại lời chào', 'Chữ · Ảnh kèm chữ', 'Chọn một loại khi tạo kịch bản.'],
      ['Nút trả lời', 'Gửi tin nhắn · Mở website · Gọi điện', 'Khách bấm để đi tiếp mà không phải gõ.'],
      ['OA', 'Đã xác thực', 'Quảng cáo tin nhắn cần OA đã xác thực.'],
      ['Tính phí', 'CPC · CPA', 'CPA tính theo lượt liên hệ.']
    ],
    assets: [
      ['Ảnh', 'Ảnh quảng cáo', 'Gợi ra câu khách muốn hỏi.'],
      ['Tin nhắn', 'Kịch bản lời chào', 'Chào, hỏi khách cần gì, gợi ba nút.'],
      ['Câu hỏi', 'Câu trả lời mẫu', 'Giá, giao hàng, cách dùng.'],
      ['Người', 'Người trực tin', 'Có mặt trong giờ quảng cáo chạy.']
    ],
    measure: [
      ['Nhắn tin', 'chat', 'chat', 'Lượt liên hệ', 'Cuộc trò chuyện 1:1 mở với lời chào soạn sẵn.'],
      ['Gửi tin nhắn', 'msgsent', 'send', 'Khách gửi tin', 'Khách bấm nút và gửi câu hỏi đầu tiên.'],
      ['Gọi điện', 'call', 'phone', 'Lượt bấm gọi', 'Nút Gọi điện mở trình gọi; bấm gọi chưa chắc đã nối máy.'],
      ['Tư vấn xong', 'crm', 'check', 'Đội tư vấn xác nhận', 'Nhân viên trả lời và ghi khách đã được tư vấn vào CRM.']
    ],
    track: 'Zalo Ads đếm lượt nhấp và lượt liên hệ. Ai được tư vấn, ai mua phải ghi trong hộp thư OA và CRM.',
    bid: 'Tin nhắn tính theo CPC hoặc CPA; với CPA, bạn trả khi khách liên hệ qua OA.',
    caution: 'Tin nhắn đến ngoài giờ mà không ai trả lời thì tiền vẫn đã trả. Chạy quảng cáo trong giờ có người trực.',
    paths: [
      ['Lời chào có câu hỏi', 'Hỏi khách cần gì ngay trong lời chào để câu đầu tiên có nội dung.'],
      ['Nút đúng việc', 'Gửi tin nhắn cho người muốn hỏi, Gọi điện cho người muốn nói ngay, Mở website cho người muốn tự xem.'],
      ['Người đã nhắn thành đối tượng', 'Người đã tương tác với quảng cáo tin nhắn dùng làm đối tượng tùy chỉnh.']
    ],
    diagnosis: [
      ['Tin nhắn đến nhưng phản hồi chậm', 'Đo thời gian trả lời đầu tiên. Chạy quảng cáo theo giờ có người trực.'],
      ['Nhiều tin nhắn, ít số điện thoại', 'Đọc lại 20 cuộc chat gần nhất. Kịch bản có hỏi số điện thoại đúng lúc không.']
    ],
    diag: {
      'Tin nhắn đến nhưng phản hồi chậm': [['Cuộc trò chuyện', '150', 'good'], ['Trả lời đầu tiên', '47 phút', 'fix'], ['Được tư vấn', '38', 'consider']],
      'Nhiều tin nhắn, ít số điện thoại': [['Cuộc trò chuyện', '140', 'good'], ['Có số điện thoại', '17', 'fix'], ['Đã mua', '6', 'consider']]
    },
    checks: ['OA đã xác thực', 'Tên kịch bản dưới 50 ký tự', 'Lời chào dưới 2.000 ký tự', 'Ba nút trả lời đã cài',
      'Người trực trong giờ chạy', 'Câu trả lời mẫu cho câu hay hỏi', 'Ghi khách được tư vấn vào CRM']
  },

  commerce: {
    formats: [
      ['com-feed', 'Thẻ sản phẩm', 'Nhật ký và bài viết trong Zalo.',
        'Ảnh sản phẩm, mô tả và nút Mua ngay.'],
      ['com-page', 'Trang sản phẩm (Mini Page)', 'Mở ngay trong Zalo khi khách bấm.',
        'Ảnh, giá, mô tả và nút Đặt mua.'],
      ['com-order', 'Form đặt hàng', 'Sau khi bấm Đặt mua.',
        'Tên, số điện thoại, địa chỉ; chọn loại sản phẩm, tối đa 3 nhóm lựa chọn.'],
      ['com-done', 'Doanh nghiệp xác nhận', 'Trong Mini Page của doanh nghiệp.',
        'Đơn chờ xác nhận; doanh nghiệp liên hệ khách rồi giao hàng.']
    ],
    billing: [['CPC', 'Trả theo lượt nhấp.'], ['CPA', 'Trả theo đơn đặt trên Mini Page.']],
    how: ['Bạn tạo Mini Page với sản phẩm, giá, lựa chọn',
      'Zalo Ads chọn người thấy thẻ sản phẩm',
      'Khách bấm, xem trang sản phẩm trong Zalo',
      'Khách điền form đặt hàng và gửi',
      'Doanh nghiệp xác nhận, giao hàng, đối chiếu đơn đã giao'],
    inputs: ['OA hoặc Hồ sơ quảng cáo', 'Sản phẩm & giá', 'Ảnh sản phẩm', 'Người xác nhận đơn'],
    outputs: 'Đơn đặt trên Mini Page; đơn đặt chưa phải đơn đã giao',
    setup: {
      pick: [['Commerce', 'on'], ['Website'], ['Form']],
      audience: 'Nữ · 25–45 tuổi · toàn quốc',
      pricing: 'CPC · CPA',
      budget: 'CPC từ 500đ · 200.000đ/ngày',
      ad: [['s1', 'r192', 'Tinh dầu'], ['s6', 'r192', 'Nến thơm'], ['s3', 'r192', 'Khuếch tán']]
    },
    specs: [
      [...IMG_1024, 'Khung chung của thẻ quảng cáo Zalo; hướng dẫn Commerce không ghi riêng.'],
      ['Mô tả', 'tối đa 90 ký tự', 'Khung chung của thẻ quảng cáo; kiểm lại trong công cụ khi tạo.'],
      SAFE,
      ['Sản phẩm', 'Hàng hóa hữu hình', 'Commerce dành cho hàng hóa có giao nhận.'],
      ['Form đặt hàng', 'Tên · Số điện thoại · Địa chỉ', 'Thêm tối đa 3 nhóm lựa chọn như mùi, dung tích.'],
      ['Giá CPC', 'Từ 500đ/lượt nhấp · 200.000đ/ngày', 'Mức tối thiểu khi tính theo lượt nhấp.'],
      ['Giá CPA', 'Từ 60.000đ/đơn · 500.000đ/ngày', 'Mức tối thiểu khi tính theo đơn đặt.'],
      ['Quản lý đơn', 'Trong Mini Page', 'Đơn mới cần doanh nghiệp xác nhận.'],
      REVIEW
    ],
    assets: [
      ['Ảnh', 'Ảnh sản phẩm', 'Nền sạch, thấy rõ món hàng.'],
      ['Chữ', 'Mô tả dưới 90 ký tự', 'Giá trị chính và ưu đãi nếu có.'],
      ['Trang', 'Mini Page', 'Giá, lựa chọn, chính sách giao.'],
      ['Người', 'Người xác nhận đơn', 'Gọi khách trong ngày trước khi gửi hàng.']
    ],
    measure: [
      ['Mua ngay', 'pdp', 'tag', 'Lượt nhấp', 'Trang sản phẩm mở trong Zalo với nút Đặt mua.'],
      ['Đặt mua', 'orderform', 'cart', 'Đơn đặt', 'Form đặt hàng mở; khách điền địa chỉ và gửi.'],
      ['Đơn đã giao', 'crm', 'check', 'Đơn đã giao', 'Doanh nghiệp xác nhận, giao hàng và đánh dấu trong CRM.']
    ],
    track: 'Đơn đặt nằm trong Mini Page. Đơn đã giao, hủy, hoàn phải đối chiếu trong CRM hoặc hệ thống bán hàng.',
    bid: 'CPC từ 500đ mỗi lượt nhấp với ngân sách từ 200.000đ mỗi ngày. CPA từ 60.000đ mỗi đơn với ngân sách từ 500.000đ mỗi ngày.',
    caution: 'Đơn đặt chưa phải đơn đã giao. Gọi xác nhận trước khi gửi hàng để giảm đơn ảo.',
    paths: [
      ['Một sản phẩm, một trang', 'Mỗi thẻ quảng cáo mở đúng một món; lựa chọn mùi, dung tích để trong form.'],
      ['Xác nhận đơn nhanh', 'Gọi hoặc nhắn xác nhận trong ngày; khách chờ lâu dễ hủy.'],
      ['Khách đã mua thành đối tượng', 'Tải số điện thoại khách đã nhận hàng lên làm đối tượng tùy chỉnh để mời mua lại hoặc loại trừ.']
    ],
    diagnosis: [
      ['Nhiều đơn đặt, ít đơn giao', 'Đếm đơn gọi không được, đơn hủy. Kiểm tra giá và phí giao có hiện rõ trước khi đặt.'],
      ['Quảng cáo bị từ chối vì thiếu giấy phép', 'Mỹ phẩm cần Phiếu công bố. Đọc danh sách sản phẩm cần giấy phép trước khi tạo.']
    ],
    diag: {
      'Nhiều đơn đặt, ít đơn giao': [['Đơn đặt', '64', 'good'], ['Xác nhận được', '39', 'consider'], ['Đơn đã giao', '27', 'fix']],
      'Quảng cáo bị từ chối vì thiếu giấy phép': [['Mẫu gửi duyệt', '6', 'good'], ['Bị từ chối', '4', 'fix'], ['Phiếu công bố', 'Chưa tải', 'fix']]
    },
    checks: ['OA hoặc Hồ sơ quảng cáo', 'Sản phẩm là hàng hóa hữu hình', 'Mini Page có giá, lựa chọn, phí giao', 'Giấy phép ngành đã tải',
      'Người xác nhận đơn trong ngày', 'Quy trình giao hàng và đổi trả', 'Đối chiếu đơn đã giao trong CRM']
  },

  media: {
    formats: [
      ['vid-feed', 'Video trong Nhật ký', 'Giữa các bài trong Nhật ký Zalo.',
        'Video tự phát, thanh tiến trình, nút bật tiếng và nút kêu gọi.'],
      ['vid-news', 'Video trên trang tin tức', 'Trang tin tức trong mạng Zalo.',
        'Video chen giữa các bài tin, có nhãn Quảng cáo.'],
      ['dsp-news', 'Banner trang tin tức', 'Trang tin tức trong mạng Zalo.',
        'Banner ảnh nằm giữa các bài tin.'],
      ['dsp-music', 'Banner ứng dụng nghe nhạc', 'Ứng dụng nghe nhạc trong mạng Zalo.',
        'Banner ảnh trong màn hình đang phát nhạc.'],
      ['dsp-mrec', 'Medium Rectangle', 'Trang và ứng dụng trong mạng Zalo.',
        'Banner khối chữ nhật; kiểu Display duy nhất tính theo lượt nhấp.']
    ],
    billing: [['CPM', 'Video và Display tính theo 1.000 lượt hiển thị.'], ['CPC', 'Riêng Medium Rectangle tính theo lượt nhấp.']],
    how: ['Bạn chọn video hoặc banner, đối tượng, ngân sách',
      'Zalo Ads phân phối theo lượt hiển thị',
      'Video, banner hiện trong Nhật ký, trang tin tức, ứng dụng nghe nhạc',
      'Khách xem; một số người bấm sang trang hoặc OA',
      'Đo người xem, rồi người nhắn OA và lượt tìm tên thương hiệu'],
    inputs: ['Video MP4 tối đa 60 giây', 'Ảnh bìa 1200 × 627', 'Banner', 'Trang đích hoặc OA'],
    outputs: 'Lượt hiển thị và lượt xem; hiếm khi ra đơn ngay',
    setup: {
      pick: [['Video', 'on'], ['Display'], ['Bài viết']],
      audience: 'Nữ · 22–45 tuổi · toàn quốc',
      pricing: 'CPM',
      placements: [['Nhật ký', true], ['Trang tin tức', true], ['Ứng dụng nghe nhạc', true]],
      ad: [['s-hero', 'r169', 'Video 16:9'], ['s-tall', 'r916', 'Video 9:16'], ['s6', 'r11', 'Video 1:1']]
    },
    specs: [
      ['Ảnh bìa video', '1200 × 627 px · tối đa 2 MB', 'Ảnh hiện trước khi video phát.'],
      ['Mô tả', 'tối đa 90 ký tự', 'Chú thích của video.'],
      ['Tỷ lệ video', '16:9 · 9:16 · 1:1', 'Theo hướng dẫn quảng cáo video.'],
      ['Tệp video', 'MP4 · H.264', 'Định dạng Zalo yêu cầu.'],
      ['Thời lượng', 'Tối đa 60 giây', 'Giới hạn trong hướng dẫn quảng cáo video.'],
      ['Video Nhật ký', 'Tối đa 150 MB · ảnh từ 1440 × 810', 'Theo hướng dẫn video trên Nhật ký Zalo.'],
      ['Medium Rectangle', 'Tính theo CPC', 'Kiểu Display duy nhất tính theo lượt nhấp.'],
      ['Banner khác', 'Xem trong công cụ', 'Trang hướng dẫn chưa liệt kê kích thước banner.'],
      REVIEW
    ],
    assets: [
      ['Video', 'Video ngắn', 'Sản phẩm rõ ngay những giây đầu.'],
      ['Ảnh', 'Ảnh bìa 1200 × 627', 'Ảnh hiện trước khi phát.'],
      ['Ảnh', 'Banner', 'Một thông điệp, logo của doanh nghiệp.'],
      ['Trang', 'Trang đích hoặc OA', 'Nơi người tò mò tìm hiểu thêm.']
    ],
    measure: [
      ['Xem video', 'view', 'play', 'Lượt xem', 'Video phát trong Nhật ký; thanh tiến trình chạy.'],
      ['Xem thêm', 'site', 'page', 'Lượt nhấp', 'Trang đích mở; với Medium Rectangle, lượt nhấp là thứ bạn trả tiền.'],
      ['Nhắn OA', 'chat', 'chat', 'Người nhắn tin', 'Một số người xem nhắn OA để hỏi thêm.']
    ],
    track: 'Lượt hiển thị và lượt xem do Zalo Ads đếm. Muốn biết sau đó có ai hỏi mua, đếm người nhắn OA và gắn UTM cho trang đích.',
    bid: 'Video và Display tính theo CPM. Riêng Medium Rectangle tính theo CPC.',
    caution: 'Video và banner thường ít lượt nhấp. Đừng so với quảng cáo Form hay Tin nhắn bằng chi phí mỗi lead.',
    paths: [
      ['Ra mắt rồi nhắc lại', 'Video tuần đầu, sau đó quảng cáo OA hoặc Tin nhắn cho người đã xem.'],
      ['Một thông điệp cho mọi vị trí', 'Cùng một câu chính trên video Nhật ký, trang tin tức và banner để khách nhận ra.'],
      ['Đo lượt tìm tên thương hiệu', 'So lượt tìm tên thương hiệu và người nhắn OA trước và sau đợt chạy.']
    ],
    diagnosis: [
      ['Xem nhiều, ít người hỏi', 'Video có nói rõ tên và cách liên hệ không? Có OA để người tò mò nhắn không?'],
      ['Quảng cáo bị từ chối vì thiếu giấy phép', 'Ngành cần giấy phép phải tải lên cả với video và banner.']
    ],
    diag: {
      'Xem nhiều, ít người hỏi': [['Lượt hiển thị', '180.000', 'good'], ['Lượt xem', '42.000', 'good'], ['Người nhắn OA', '12', 'fix']],
      'Quảng cáo bị từ chối vì thiếu giấy phép': [['Mẫu gửi duyệt', '5', 'good'], ['Bị từ chối', '3', 'fix'], ['Giấy phép đã tải', '0', 'fix']]
    },
    checks: ['Video MP4 H.264, tối đa 60 giây', 'Ảnh bìa 1200 × 627, dưới 2 MB', 'Mô tả dưới 90 ký tự', 'Sản phẩm rõ ngay những giây đầu',
      'Giấy phép ngành đã tải', 'Kế hoạch nhắc lại người đã xem', 'Đo người nhắn OA và lượt tìm tên thương hiệu']
  }
};

/* ================================================================== *
 * Page 02 — choosing
 * ================================================================== */
// Business goal → Zalo Ads format. Zalo lists formats, not objectives, on the
// pages checked; each goal maps to the format that serves it.
export const OBJECTIVES = [
  {id: 'follow', title: 'Có thêm người quan tâm OA', icon: 'plus',
    format: 'Official Account',
    where: 'Trang OA; khách bấm Quan tâm ngay trên thẻ quảng cáo.',
    pricing: 'CPC hoặc CPF.',
    needs: 'OA đã xác thực, quyền Admin, người trực tin nhắn.'},
  {id: 'traffic', title: 'Đưa khách vào website', icon: 'page',
    format: 'Website',
    where: 'Website của bạn, mở trong trình duyệt của Zalo.',
    pricing: 'CPC.',
    needs: 'Trang đích tải nhanh, Zalo Ads Pixel, UTM.'},
  {id: 'awareness', title: 'Nhiều người biết tới', icon: 'eye',
    format: 'Video · Display · Bài viết',
    where: 'Ở lại trang đang xem; một số người mở bài viết OA hoặc trang đích.',
    pricing: 'Video, Display theo CPM; Medium Rectangle và Bài viết theo CPC.',
    needs: 'Video tối đa 60 giây, banner hoặc bài viết đã đăng trên OA.'},
  {id: 'leads', title: 'Lấy số điện thoại', icon: 'form',
    format: 'Form',
    where: 'Form mở ngay trong Zalo, tên và số điện thoại điền sẵn.',
    pricing: 'CPC, CPA hoặc CPM.',
    needs: 'Ngành trong danh sách Form, người gọi lại trong ngày.'},
  {id: 'chat', title: 'Trò chuyện 1:1', icon: 'chat',
    format: 'Tin nhắn',
    where: 'Cuộc trò chuyện với OA, có lời chào soạn sẵn.',
    pricing: 'CPC hoặc CPA.',
    needs: 'OA đã xác thực, kịch bản lời chào, người trực.'},
  {id: 'sell', title: 'Bán hàng trong Zalo', icon: 'cart',
    format: 'Commerce',
    where: 'Trang sản phẩm trong Zalo, rồi form đặt hàng.',
    pricing: 'CPC hoặc CPA.',
    needs: 'Hàng hóa hữu hình, người xác nhận đơn và giao hàng.'}
];

// Five readiness stages → the ad a person at that stage should see.
export const READINESS = [
  {id: 'cold', name: 'Chưa biết', icon: 'play', state: 'Chưa từng nghe tới shop.',
    aim: 'Làm họ nhớ tên và biết shop bán gì.', run: 'Video, Display', content: 'Sản phẩm trong không gian thật, một thông điệp.', cta: 'Xem thêm'},
  {id: 'warm', name: 'Đã quan tâm', icon: 'heart', state: 'Đã xem video hoặc đọc một bài.',
    aim: 'Giữ liên lạc để nói tiếp.', run: 'Official Account, Bài viết', content: 'Lý do nên quan tâm OA, bài viết hướng dẫn.', cta: 'Quan tâm'},
  {id: 'hot', name: 'Đang cân nhắc', icon: 'search', state: 'Đang so giá, tìm cách dùng.',
    aim: 'Cho xem chi tiết hoặc lấy số để tư vấn.', run: 'Website, Form', content: 'Trang sản phẩm rõ giá, form ngắn.', cta: 'Đăng ký'},
  {id: 'lead', name: 'Đã liên hệ', icon: 'chat', state: 'Đã nhắn OA hoặc để lại số.',
    aim: 'Trả lời câu còn thiếu, hẹn lịch.', run: 'Tin nhắn', content: 'Lời chào hỏi đúng nhu cầu, ba nút đi tiếp.', cta: 'Nhắn tin'},
  {id: 'customer', name: 'Đã mua', icon: 'cart', state: 'Đã có đơn.',
    aim: 'Mua lại hoặc mua món đi kèm.', run: 'Đối tượng tùy chỉnh, Commerce', content: 'Món đi kèm, ưu đãi cho khách cũ.', cta: 'Mua ngay'}
];

// Audiences in three families.
export const AUDIENCES = [
  {id: 'location', family: 'hard', title: 'Vị trí', icon: 'pin',
    text: 'Tỉnh thành nơi quảng cáo được hiện.',
    use: 'Luôn đặt đúng khu vực giao hàng hoặc phục vụ.'},
  {id: 'gender', family: 'hard', title: 'Giới tính', icon: 'person',
    text: 'Nam, nữ hoặc cả hai.',
    use: 'Khi sản phẩm dành rõ cho một nhóm.'},
  {id: 'age', family: 'hard', title: 'Độ tuổi', icon: 'calendar',
    text: 'Khoảng tuổi được thấy quảng cáo.',
    use: 'Khi sản phẩm không dành cho mọi lứa tuổi.'},
  {id: 'interest', family: 'hint', title: 'Sở thích', icon: 'heart',
    text: 'Chủ đề người dùng quan tâm; danh sách cụ thể chọn trong công cụ.',
    use: 'Thu hẹp khi chưa có dữ liệu khách của riêng bạn.'},
  {id: 'platform', family: 'hint', title: 'Nền tảng', icon: 'mobile',
    text: 'Nơi người dùng mở Zalo và các trang trong mạng Zalo.',
    use: 'Khi trang đích chỉ tốt trên một loại màn hình.'},
  {id: 'phones', family: 'data', title: 'Danh sách số điện thoại', icon: 'table',
    text: 'Tệp số điện thoại khách cũ, tối đa 10 MB.',
    use: 'Nhắc khách cũ, hoặc loại trừ họ khỏi quảng cáo tìm khách mới.'},
  {id: 'formmanage', family: 'data', title: 'Người gửi Form', icon: 'form',
    text: 'Người đã gửi form trong Zalo Ads (Form Manage).',
    use: 'Nhắc người đã đăng ký, hoặc loại trừ để không trả tiền lại.'},
  {id: 'messaged', family: 'data', title: 'Người đã nhắn tin', icon: 'chat',
    text: 'Người đã tương tác với quảng cáo tin nhắn.',
    use: 'Mời người đã hỏi sang bước đặt mua.'},
  {id: 'lookalike', family: 'data', title: 'Đối tượng tương tự', icon: 'users',
    text: 'Người giống một nhóm nguồn có 1.000–10.000 số điện thoại đang hoạt động.',
    use: 'Tìm khách mới khi đã có nhóm nguồn tốt.'},
  {id: 'saved', family: 'data', title: 'Đối tượng đã lưu', icon: 'folder',
    text: 'Bộ điều kiện đã lưu để dùng lại cho quảng cáo sau.',
    use: 'Giữ cùng một nhóm khi so các mẫu quảng cáo.'}
];

export const FAMILIES = {
  hard: ['Ràng buộc cứng', '#ffbd80'],
  hint: ['Sở thích & hành vi', '#c0a2ff'],
  data: ['Dữ liệu của doanh nghiệp', '#85e1c1']
};

/* ================================================================== *
 * Page 03 — money, bidding, measurement, rollout
 * ================================================================== */
export const COST_BUCKETS = [
  ['ads', 'auction', 'Nạp vào Zalo Ads', 'Tiền quảng cáo nạp trước vào tài khoản. Hóa đơn VAT xuất theo số tiền nạp.'],
  ['make', 'creative', 'Nội dung & vận hành OA', 'Ảnh, video, bài viết OA, kịch bản tin nhắn, người trực và người gọi lại.'],
  ['fee', 'users', 'Phí dịch vụ POWAI', 'Công dựng, theo dõi, điều chỉnh và báo cáo. Xuất hóa đơn riêng.']
];

// [key, label, icon, text]
export const BILLING = [
  ['topup', 'Nạp tiền trước', 'wallet',
    'Tài khoản Zalo Ads trả trước. Nạp bằng thẻ Visa, Master, JCB, thẻ ATM hoặc Internet Banking, ZaloPay, MoMo, chuyển khoản MSB hoặc mã voucher 22 ký tự.'],
  ['daily', 'Ngân sách theo ngày', 'calendar',
    'Đặt thầu theo ngân sách là cách mặc định, từ 200.000đ mỗi ngày. Một số hình thức có mức riêng, như OA từ 500.000đ mỗi ngày.'],
  ['invoice', 'Hóa đơn VAT', 'receipt',
    'Adtima xuất hóa đơn VAT cho số tiền nạp, theo các lần nạp ngày hôm trước và theo từng kênh nạp.'],
  ['taxcode', 'Thông tin xuất hóa đơn', 'alert',
    'Khai tên, địa chỉ, mã số thuế và email trước hoặc khi nạp. Sai mã số thuế thì không xuất lại được; sai tên, địa chỉ báo ads@zalo.me trong 5 ngày làm việc.'],
  ['entity', 'Một tài khoản, một doanh nghiệp', 'shield',
    'Mỗi tài khoản xuất hóa đơn cho một doanh nghiệp. Không hỗ trợ đổi pháp nhân hoặc đổi từ cá nhân sang doanh nghiệp.']
];

// Five ways to pay: [tag, name, text, you set, you get, where, caution, example]
export const BIDS = {
  budget: ['MẶC ĐỊNH', 'Đặt thầu theo ngân sách', 'Bạn trả lời "Bạn có thể trả bao nhiêu chi phí cho quảng cáo này?"; Zalo Ads tự phân bổ.',
    'Ngân sách mỗi ngày', 'Kết quả trong ngân sách', 'Từ 200.000đ mỗi ngày.', 'Ít kiểm soát giá của từng lượt.',
    'Ngân sách 300.000đ/ngày: hệ thống tự chia cho các lượt trong ngày.'],
  cpc: ['LƯỢT NHẤP', 'CPC · theo lượt nhấp', 'Trả mỗi lần khách nhấp vào quảng cáo.',
    'Giá mỗi lượt nhấp', 'Lượt nhấp', 'Mọi hình thức trừ Video và Display thường.', 'Nhấp chưa phải khách hàng.',
    'Form từ 3.000đ, Commerce từ 500đ mỗi lượt nhấp.'],
  cpm: ['HIỂN THỊ', 'CPM · theo 1.000 lượt hiển thị', 'Trả cho mỗi 1.000 lần quảng cáo hiện ra.',
    'Giá 1.000 lượt hiển thị', 'Lượt hiển thị', 'Video, Display, Form.', 'Hiển thị nhiều chưa chắc có người xem kỹ.',
    'Video và Display (trừ Medium Rectangle) tính theo CPM.'],
  cpa: ['HÀNH ĐỘNG', 'CPA · theo hành động', 'Trả khi khách gửi form, liên hệ qua OA hoặc đặt hàng trên Mini Page.',
    'Giá mỗi hành động', 'Form, liên hệ, đơn đặt', 'Form, Tin nhắn, Commerce.', 'Hành động được ghi chưa phải khách đã mua.',
    'Commerce: từ 60.000đ mỗi đơn, ngân sách từ 500.000đ mỗi ngày.'],
  cpf: ['QUAN TÂM OA', 'CPF · theo lượt quan tâm', 'Trả mỗi khi có người bấm Quan tâm OA.',
    'Giá mỗi lượt quan tâm', 'Người quan tâm OA', 'Quảng cáo Official Account.', 'Người quan tâm chưa chắc sẽ nhắn tin.',
    'Tự đặt giá từ 10.000đ mỗi lượt, tối thiểu 100 lượt.']
};
export const BID_ORDER = ['budget', 'cpc', 'cpm', 'cpa', 'cpf'];

// One sample month.
export const SAMPLE = {impressions: 60000, reach: 24000, clicks: 900, follows: 320, followChats: 58, convos: 70, lead: 48,
  qualified: 22, placed: 30, delivered: 21, spend: 8000000, revenue: 9450000, allCost: 12500000};

export const KPIS = {
  impressions: ['Lượt hiển thị', 'Số lần quảng cáo hiện trên màn hình.', 'Tăng mà lượt nhấp không tăng: xem lại ảnh và mô tả.'],
  reach: ['Người tiếp cận', 'Số người khác nhau đã thấy quảng cáo.', 'Ít người nhưng nhiều hiển thị: một người thấy quá nhiều lần.'],
  cpm: ['CPM', 'Chi phí cho 1.000 lượt hiển thị.', 'CPM tăng: đối tượng hẹp hoặc mùa cao điểm.'],
  clicks: ['Lượt nhấp', 'Lượt bấm vào quảng cáo.', 'Gồm cả người bấm nhầm; đọc cùng bước sau.'],
  ctr: ['CTR', 'Lượt nhấp ÷ lượt hiển thị.', 'CTR thấp: ảnh hoặc mô tả chưa khiến người xem muốn bấm.'],
  cpc: ['CPC', 'Tiền ÷ lượt nhấp.', 'CPC thấp chưa chắc tốt nếu khách không ở lại.'],
  follows: ['Lượt quan tâm OA', 'Người bấm Quan tâm OA từ quảng cáo.', 'Tăng nhanh mà không ai nhắn: xem lại lời chào.'],
  cpf: ['CPF', 'Tiền ÷ lượt quan tâm.', 'CPF rẻ chưa chắc tốt nếu người quan tâm không nhắn.'],
  followChat: ['% người quan tâm có nhắn', 'Người nhắn tin ÷ lượt quan tâm.', 'Thấp: lời chào và menu OA chưa mời nhắn.'],
  lead: ['Lead', 'Người gửi form.', 'Tăng nhanh bất thường: kiểm tra số trùng.'],
  cpl: ['CPL', 'Tiền ÷ lead.', 'CPL thấp mà không gọi được thì vô ích.'],
  convos: ['Cuộc trò chuyện', 'Cuộc chat mới với OA sau khi bấm quảng cáo.', 'Nhiều cuộc nhưng ít số điện thoại: xem lại kịch bản.'],
  qualified: ['Được tư vấn', 'Khách được nhân viên xác nhận đã tư vấn đúng nhu cầu.', 'Cần CRM ghi lại; Zalo Ads không tự biết.'],
  placed: ['Đơn đặt', 'Đơn gửi từ form đặt hàng hoặc website.', 'Gồm cả đơn sau này hủy.'],
  delivered: ['Đơn đã giao', 'Đơn giao thành công, đối chiếu trong CRM.', 'Con số gần doanh thu thật nhất.'],
  revenue: ['Doanh thu', 'Tổng giá trị đơn đã giao.', 'Chưa trừ giá vốn và phí giao.'],
  roas: ['ROAS', 'Doanh thu ÷ tiền quảng cáo.', 'Chưa trừ giá vốn, phí giao, phí dịch vụ.'],
  cac: ['CAC', 'Tổng chi phí thu hút ÷ khách mới.', 'Tính cả nội dung, vận hành OA và phí dịch vụ.']
};

// [id, label, value, metric ids]
export const KPI_TIERS = [
  ['show', 'Hiển thị', SAMPLE.impressions, ['impressions', 'reach', 'cpm']],
  ['click', 'Nhấp', SAMPLE.clicks, ['clicks', 'ctr', 'cpc']],
  ['follow', 'Quan tâm OA', SAMPLE.follows, ['follows', 'cpf', 'followChat']],
  ['lead', 'Lead & tin nhắn', SAMPLE.lead, ['lead', 'cpl', 'convos', 'qualified']],
  ['sale', 'Đơn hàng', SAMPLE.placed, ['placed', 'delivered', 'revenue', 'roas', 'cac']]
];

// Measurement stations: [icon, name, purpose, when, io]
export const TRACKING = {
  utm: ['link', 'UTM', 'Gắn nguồn vào liên kết để GA4 biết khách đến từ quảng cáo Zalo nào.',
    'Mọi quảng cáo dẫn ra website.', 'Liên kết → phiên truy cập có nguồn'],
  site: ['page', 'Website', 'Trang đích mở trong trình duyệt của Zalo.',
    'Quảng cáo Website, Video, Display.', 'Lượt nhấp → lượt vào trang'],
  pixel: ['code', 'GA4 / Zalo Ads Pixel', 'GA4 đọc nguồn; Zalo Ads Pixel ghi sự kiện nút bấm và sự kiện đường dẫn URL.',
    'Muốn đo việc khách làm trên website.', 'Hành động trên web → sự kiện'],
  form: ['form', 'Form', 'Form mở trong Zalo, tên và số điện thoại điền sẵn.',
    'Chạy quảng cáo Form.', 'Lượt nhấp → lượt gửi form'],
  manage: ['table', 'Dữ liệu Form', 'Người đã gửi nằm trong dữ liệu Form (Form Manage).',
    'Sau mỗi ngày chạy.', 'Form → danh sách'],
  download: ['upload', 'Tải về / CRM', 'Tải dữ liệu Form hoặc Lead Center, lọc trùng, nhập CRM.',
    'Trước khi chia người gọi.', 'Danh sách → khách cần gọi'],
  oamsg: ['chat', 'Tin nhắn OA', 'Khách mở cuộc trò chuyện với OA từ quảng cáo.',
    'Quảng cáo OA và Tin nhắn.', 'Lượt nhấp → cuộc trò chuyện'],
  inbox: ['mail', 'Hộp thư OA', 'Nhân viên trả lời và gắn nhãn cho từng cuộc.',
    'Luôn cần khi nhận tin nhắn.', 'Cuộc trò chuyện → nhãn'],
  commerce: ['store', 'Commerce', 'Khách đặt mua trên Mini Page trong Zalo.',
    'Quảng cáo Commerce.', 'Lượt nhấp → đơn đặt'],
  order: ['cart', 'Đơn đặt → xác nhận', 'Doanh nghiệp xác nhận đơn trong Mini Page rồi giao hàng.',
    'Mỗi đơn mới.', 'Đơn đặt → đơn đã giao'],
  crm: ['users', 'CRM', 'Nơi ghi trạng thái thật của từng khách: đã tư vấn, đã mua, đã giao.',
    'Muốn biết lượt nào thành tiền.', 'Lead, tin nhắn, đơn → trạng thái'],
  custom: ['repeat', 'Đối tượng tùy chỉnh', 'Tải danh sách số điện thoại từ CRM lên Zalo Ads (tối đa 10 MB).',
    'Muốn nhắc khách cũ hoặc tìm người giống họ.', 'CRM → đối tượng']
};

// [name, meaning, note, confirmed?] — names are the plain labels the
// reports and the Pixel screen use, no technical event codes.
export const EVENTS = [
  ['Lượt nhấp', 'Nhấp vào quảng cáo', 'Zalo Ads đếm. Gồm cả người bấm nhầm.'],
  ['Lượt quan tâm', 'Bấm Quan tâm OA', 'Zalo Ads đếm. Người quan tâm chưa chắc sẽ nhắn.'],
  ['Sự kiện nút bấm', 'Bấm nút trên website', 'Tạo trong Zalo Ads Pixel cho nút gọi, nút Zalo. Là lượt bấm, chưa phải cuộc gọi.'],
  ['Sự kiện đường dẫn URL', 'Mở trang cảm ơn', 'Pixel ghi khi khách tới một đường dẫn, ví dụ trang cảm ơn sau khi đặt.'],
  ['Lượt gửi form', 'Gửi form trong Zalo', 'Có trong dữ liệu Form. Chưa gọi thì chưa biết số đúng hay sai.'],
  ['Lượt liên hệ', 'Nhắn OA từ quảng cáo', 'Khách mở cuộc trò chuyện. Chưa ai trả lời thì chưa phải tư vấn.'],
  ['Đơn đặt', 'Đặt trên Mini Page', 'Chờ doanh nghiệp xác nhận.'],
  ['Đội tư vấn xác nhận', 'Khách đã được tư vấn', 'Nhân viên ghi trong CRM sau khi gọi hoặc trả lời.', true],
  ['Đơn đã giao', 'Đơn giao thành công', 'Đối chiếu trong CRM hoặc hệ thống bán hàng.', true]
];

// Ten steps: [title, what, output]
export const ROLLOUT = [
  ['Tìm hiểu', 'Doanh nghiệp bán gì, cho ai, khu vực nào, đang nhận khách qua đâu.', 'Bản tóm tắt mục tiêu'],
  ['Kiểm tra tài khoản & OA', 'Tài khoản Zalo Ads, OA đã xác thực, quyền Admin cho người vận hành.', 'Danh sách việc cần sửa'],
  ['Giấy phép & hóa đơn', 'Giấy phép theo ngành; thông tin xuất hóa đơn khai trước khi nạp.', 'Hồ sơ đủ để gửi duyệt'],
  ['Chọn cách chạy', 'Hình thức, cách tính phí, đối tượng cho từng nhóm khách.', 'Sơ đồ quảng cáo'],
  ['Cài đo lường', 'UTM, Zalo Ads Pixel, lịch tải dữ liệu Form, nhãn hộp thư OA, CRM.', 'Sự kiện chạy thử đã ghi'],
  ['Chuẩn bị nội dung', 'Ảnh 1024 × 533, mô tả dưới 90 ký tự, video, bài viết OA, kịch bản tin nhắn.', 'Bộ nội dung đã duyệt nội bộ'],
  ['Dựng & gửi duyệt', 'Tạo quảng cáo, tải giấy phép, gửi duyệt; thường 30–60 phút.', 'Quảng cáo đã duyệt'],
  ['Chạy & theo dõi', 'Theo dõi hằng ngày trong tuần đầu; người trực tin và người gọi lại sẵn sàng.', 'Ghi chú tuần đầu'],
  ['Điều chỉnh', 'Đổi ảnh, đổi lời chào, dời ngân sách theo số liệu.', 'Nhật ký thay đổi'],
  ['Báo cáo', 'Đọc từ lượt hiển thị tới đơn đã giao, đối chiếu với CRM.', 'Báo cáo định kỳ']
];
export const PHASES = [['Chuẩn bị', [0, 1, 2, 3]], ['Dựng quảng cáo', [4, 5, 6]], ['Chạy & tối ưu', [7, 8, 9]]];

export const PREP = [
  'Tài khoản Zalo Ads của doanh nghiệp',
  'OA đã xác thực',
  'Quyền Admin OA cho người tạo quảng cáo',
  'Giấy phép theo ngành (Phiếu công bố, Giấy xác nhận nội dung…)',
  'Thông tin xuất hóa đơn: tên, địa chỉ, mã số thuế, email',
  'Cách nạp tiền: thẻ, ZaloPay, MoMo, chuyển khoản',
  'Ảnh 1024 × 533, dưới 2 MB',
  'Mô tả dưới 90 ký tự',
  'Video MP4 tối đa 60 giây',
  'Trang đích hoặc bài viết OA đã đăng',
  'Mẫu form và 1–2 câu hỏi',
  'Kịch bản tin nhắn và người trực',
  'Danh sách số điện thoại khách cũ (tối đa 10 MB)',
  'CRM ghi trạng thái khách'
];
export const PREP_GROUPS = [
  ['Tài khoản, OA & giấy phép', 'shield', [0, 1, 2, 3]],
  ['Nội dung & trang', 'image', [6, 7, 8, 9]],
  ['Form, tin nhắn & dữ liệu', 'chat', [10, 11, 12, 13]],
  ['Hóa đơn & nạp tiền', 'wallet', [4, 5]]
];

export const FAQ = [
  ['Dùng tài khoản Zalo cá nhân chạy quảng cáo được không?',
    'Nhiều hình thức cần OA: quảng cáo OA cần quyền Admin, Tin nhắn và Bài viết cần OA đã xác thực; Form và Commerce cần OA hoặc Hồ sơ quảng cáo. POWAI khuyên dùng OA của doanh nghiệp để tài khoản không gắn với một người.'],
  ['Vì sao cần OA đã xác thực?',
    'Quảng cáo Tin nhắn và Bài viết yêu cầu OA đã xác thực. Dấu xác thực cũng giúp khách biết đó là trang chính thức của doanh nghiệp.'],
  ['Ngành nào cần giấy phép?',
    'Theo danh sách của Zalo: thực phẩm chức năng, thuốc, thiết bị y tế cần Giấy xác nhận nội dung; mỹ phẩm cần Phiếu công bố. Rượu dưới 15 độ, thú y, spa, game, tài chính, xổ số, chứng khoán, vàng cũng có yêu cầu riêng.'],
  ['Ngành nào chạy được Form, Commerce?',
    'Form mở cho các ngành trong danh sách Zalo: bất động sản, thẩm mỹ viện, mỹ phẩm (từ 14/02/2023), một số dịch vụ tài chính và giải trí. Commerce dành cho hàng hóa hữu hình.'],
  ['Chạy Zalo Ads tối thiểu bao nhiêu tiền?',
    'Đặt thầu theo ngân sách từ 200.000đ mỗi ngày. Một số hình thức có mức riêng: OA từ 500.000đ mỗi ngày; Commerce tính CPA từ 500.000đ mỗi ngày. Zalo cũng khuyên đặt tối thiểu 50 lượt nhấn mỗi ngày.'],
  ['Nạp tiền bằng cách nào?',
    'Thẻ Visa, Master, JCB; thẻ ATM hoặc Internet Banking; ZaloPay; MoMo; chuyển khoản MSB; hoặc mã voucher 22 ký tự.'],
  ['Có hóa đơn VAT không?',
    'Có. Zalo Ads xuất hóa đơn VAT cho số tiền nạp; thuế suất và cách tính theo hóa đơn — POWAI đối chiếu khi nạp. Hóa đơn do Adtima xuất; khai thông tin trước khi nạp vì sai mã số thuế thì không sửa được.'],
  ['Bao lâu thì quảng cáo được duyệt?',
    'Các hướng dẫn của Zalo ghi thời gian duyệt khoảng 30–60 phút sau khi gửi.'],
  ['Quảng cáo bị từ chối thì làm gì?',
    'Đọc lý do từ chối. Thường là thiếu giấy phép, nội dung sai quy định hoặc ảnh sai kích thước. Sửa hoặc tải giấy phép rồi gửi duyệt lại.'],
  ['Nhiều lượt quan tâm mà ít đơn thì sao?',
    'Lượt quan tâm chỉ là bước đầu. Đo tiếp tỷ lệ người quan tâm có nhắn tin, số người được tư vấn và đơn đã giao; sửa lời chào và menu OA trước khi tăng tiền.'],
  ['Zalo Ads khác Facebook, TikTok Ads thế nào?',
    'Zalo Ads dẫn khách về OA, cuộc trò chuyện, form hoặc trang sản phẩm ngay trong Zalo, nơi khách đã quen nhắn tin. Facebook và TikTok mạnh ở nội dung để lướt và xem. Nhiều doanh nghiệp chạy song song rồi so chi phí mỗi khách được tư vấn.'],
  ['ZNS có phải quảng cáo không?',
    'Không. ZNS là tin thông báo theo mẫu gửi cho khách, như xác nhận đơn hay nhắc lịch. Nó là dịch vụ riêng, không nằm trong Zalo Ads.'],
  ['Ai sở hữu tài khoản và OA?',
    'Doanh nghiệp nên sở hữu tài khoản Zalo Ads và OA. POWAI được cấp quyền để vận hành; dừng hợp tác thì thu hồi quyền.'],
  ['Phí POWAI có nằm trong tiền nạp Zalo Ads không?',
    'Không. Tiền quảng cáo nạp thẳng vào tài khoản Zalo Ads của doanh nghiệp. Phí dịch vụ POWAI xuất hóa đơn riêng.']
];
export const FAQ_TOPICS = [
  ['Chi phí & hóa đơn', 'wallet', [4, 5, 6, 13]],
  ['Tài khoản & OA', 'shield', [0, 1, 12]],
  ['Duyệt & giấy phép', 'stamp', [2, 3, 7, 8]],
  ['Chọn kênh & đo lường', 'chart', [9, 10, 11]]
];

// Goals for the contact form select.
export const CONTACT_GOALS = [
  ['follow', 'Tăng người quan tâm OA'], ['messages', 'Nhận tin nhắn hỏi mua'], ['leads', 'Thu số điện thoại khách'],
  ['sales', 'Bán qua website hoặc Commerce'], ['awareness', 'Ra mắt, tăng nhận biết']
];

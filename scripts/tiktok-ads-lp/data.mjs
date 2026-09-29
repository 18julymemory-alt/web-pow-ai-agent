// Content for the three TikTok Ads landing pages.
//
// Every fact here was checked against TikTok Ads Help Center (and one TikTok
// for Business blog post) on CHECKED. Numbers that describe a platform limit
// come from those pages; every other number on the pages is a sample and is
// labelled as one. Sentences stay short on purpose.

export const CHECKED = '2026-09-28';

// Vietnam VAT on advertising services, from 01/07/2025 (Luật Thuế GTGT số
// 48/2024/QH15), as TikTok states it in the vat source below.
export const TAX_RATE = 0.1;

const H = slug => 'https://ads.tiktok.com/help/article/' + slug;
const R = slug => 'https://ads.tiktok.com/resources/help/article/' + slug;

// key → [url, link text]. Rendered by shared.sourceList (a URL id is used as is).
export const SOURCES = {
  objectives: [H('choose-right-objective'), 'Chọn mục tiêu'],
  brandConsideration: [H('about-the-brand-consideration-objective?lang=en'), 'Mục tiêu cân nhắc thương hiệu'],
  smartPlus: [H('about-updates-to-smart-plus?lang=en'), 'Smart+'],
  gmvMax: [H('about-gmv-max-campaigns-in-tiktok-ads-manager?lang=en'), 'Chiến dịch GMV Max'],
  gmvMigration: [H('gmv-max-migration-tiktok-shop-ads'), 'GMV Max thay quảng cáo TikTok Shop'],
  productGmv: [H('about-product-gmv-max'), 'Product GMV Max'],
  liveGmv: [H('about-live-gmv-max?lang=en'), 'LIVE GMV Max'],
  gmvGuide: [H('gmv-max-guidelines?lang=vi'), 'Hướng dẫn GMV Max'],
  topview: [H('about-topview?lang=en'), 'TopView'],
  topviewSpecs: [H('tiktok-reservation-topview'), 'Thông số TopView'],
  topreach: ['https://ads.tiktok.com/business/en/blog/introducing-topreach', 'Giới thiệu TopReach'],
  topfeed: [H('reach-frequency-campaigns-top-feed?lang=en'), 'Phạm vi & tần suất · TopFeed'],
  reservation: [H('about-tentative-reservation?lang=en'), 'Đặt chỗ tạm'],
  searchCampaign: [H('about-search-ads-campaign?lang=en'), 'Chiến dịch tìm kiếm'],
  searchAvail: [H('search-ads-campaign-availability?lang=en'), 'Thị trường có chiến dịch tìm kiếm'],
  autoSearch: [H('about-automatic-search-placement?lang=en'), 'Vị trí tìm kiếm tự động'],
  adNetwork: [H('pangle-placement'), 'Vị trí Pangle'],
  blockList: [H('block-list'), 'Danh sách chặn'],
  appBundle: [H('global-app-bundle-placement?lang=en'), 'Gói ứng dụng toàn cầu'],
  placements: [H('automatic-select-placement'), 'Chọn vị trí'],
  infeedSpecs: [H('tiktok-auction-in-feed-ads?lang=en'), 'Thông số In-Feed'],
  carouselSpecs: [H('specifications-for-carousel-ads'), 'Thông số Carousel'],
  carousel: [H('carousel-ads?lang=en'), 'Quảng cáo Carousel'],
  spark: [H('spark-ads'), 'Spark Ads'],
  cml: [H('commercial-music-library'), 'Thư viện nhạc thương mại'],
  instantForm: [H('build-instant-form'), 'Tạo biểu mẫu tức thì'],
  formQuestions: [H('about-instant-form-question-types-and-settings?lang=en'), 'Câu hỏi & cài đặt biểu mẫu'],
  leadsCenter: [H('leads-center-manage'), 'Trung tâm khách hàng tiềm năng'],
  crmIntegr: [H('available-crm-integrations-tiktok-lead-generation?lang=en'), 'Kết nối CRM'],
  messaging: [H('about-tiktok-messaging-ads'), 'Quảng cáo tin nhắn'],
  zalo: [R('how-to-set-up-direct-integration-with-zalo-for-instant-messaging-ads'), 'Kết nối Zalo'],
  dmSetup: [H('how-to-set-up-tiktok-direct-messaging-ads'), 'Tin nhắn trong TikTok'],
  videoShopping: [H('how-to-set-up-video-shopping-ads-with-showcase'), 'Video mua sắm'],
  anchor: [H('using-product-anchor-link-in-video-shopping-ads'), 'Liên kết sản phẩm trong video'],
  liveShopping: [H('how-to-create-live-shopping-ads?lang=en'), 'Quảng cáo LIVE'],
  productCard: [H('about-interactive-add-ons-for-video-shopping-ads?lang=en'), 'Tiện ích tương tác'],
  catalogs: [H('catalogs?lang=en'), 'Danh mục sản phẩm'],
  catalogAds: [H('about-catalog-ads-in-tiktok-ads-manager?lang=en'), 'Quảng cáo danh mục'],
  budget: [H('budget?lang=en'), 'Ngân sách'],
  bidding: [H('bidding-strategies'), 'Chiến lược giá thầu'],
  bidBest: [H('best-practices-for-bidding-strategies?lang=en'), 'Mẹo đặt giá thầu'],
  valueBid: [R('available-bidding-strategies-for-value-based-optimization-for-app'), 'Giá thầu theo giá trị'],
  hybrid: [H('hybrid-bidding-for-performance-auction'), 'Giá thầu kết hợp'],
  vat: [H('vietnam-vat-cit?lang=vi'), 'Thuế GTGT tại Việt Nam'],
  payment: [R('asia-pacific-apac-supported-payment-methods'), 'Phương thức thanh toán'],
  billing: [H('tiktok-billing-options?lang=en'), 'Cách thanh toán'],
  gmvPay: [H('about-gmv-pay?lang=en'), 'GMV Pay'],
  pixel: [H('tiktok-pixel'), 'TikTok Pixel'],
  utm: [H('track-offsite-web-events-with-utm-parameters'), 'Tham số UTM'],
  events: [H('standard-events-parameters?lang=en'), 'Sự kiện tiêu chuẩn'],
  eventsUpdate: [R('how-to-adopt-tiktoks-updated-standard-events'), 'Cập nhật tên sự kiện'],
  eventsApi: [H('events-api'), 'Events API'],
  dedup: [H('event-deduplication?lang=en'), 'Khử trùng lặp sự kiện'],
  offline: [H('about-offline-event-sets?lang=en'), 'Sự kiện ngoại tuyến'],
  crmEvents: [H('how-to-map-crm-events-to-standard-events-in-tiktok-events-manager'), 'Sự kiện CRM'],
  csvPostback: [R('how-to-postback-signals-through-csv?lang=en'), 'Gửi kết quả bằng CSV'],
  custom: [H('custom-audiences'), 'Đối tượng tùy chỉnh'],
  lookalike: [H('lookalike-audience'), 'Đối tượng tương tự'],
  targeting: [H('ad-targeting'), 'Nhắm mục tiêu'],
  behavior: [H('behavior-targeting?lang=en'), 'Nhắm theo hành vi'],
  interest: [H('interest-targeting'), 'Nhắm theo sở thích'],
  smartTargeting: [H('smart-targeting?lang=en'), 'Nhắm mục tiêu thông minh'],
  bc: [H('tiktok-business-center?lang=en'), 'Business Center'],
  review: [H('what-to-do-if-your-ad-or-ad-group-was-rejected-on-tiktok?lang=en'), 'Quảng cáo bị từ chối'],
  appeal: [H('one-click-appeal-for-other-ad-types?lang=en'), 'Kháng nghị']
};

// Points that could not be confirmed on CHECKED. They are left out of the
// pages or worded as an illustration; listed here for the next review.
export const UNVERIFIED = [
  'Giới hạn giá thầu (Bid Cap): không còn trong tài liệu chiến lược giá thầu hiện tại, nên không đưa lên trang.',
  'Mức ngân sách tối thiểu bằng VND: tài liệu chỉ ghi USD, trang chỉ ghi USD.',
  'Danh sách thị trường Việt Nam của GMV Max: chỉ thấy trong đoạn trích tìm kiếm.',
  'Chiến dịch tìm kiếm riêng: danh sách thị trường 04/2026 chưa có Việt Nam.',
  'Mục tiêu cân nhắc thương hiệu (Branded Mission): chỉ mở cho khách hàng được chọn.',
  'TopReach ở Việt Nam: bài giới thiệu không nêu danh sách thị trường.',
  'Tỷ lệ chính xác của vùng an toàn: TikTok chỉ cho tải tệp mẫu; hình trên trang là minh họa.',
  'Thanh nút đổi màu: thời điểm và cách hiện là mô phỏng.',
  'Tên trường bắt buộc của danh mục: trang không liệt kê từng trường.'
];

/* ================================================================== *
 * Page 01 — six ways to run
 * ================================================================== */
export const TYPES = [
  {
    id: 'infeed', tag: 'IN-FEED',
    title: 'Video In-Feed',
    description: 'Video dọc 9:16 xen giữa các video trong trang Dành cho bạn.',
    bestFor: 'Hợp khi có video dọc ngắn, cần người chưa biết shop dừng lại và bấm sang website.',
    sourceKeys: ['infeedSpecs', 'placements', 'carouselSpecs']
  },
  {
    id: 'spark', tag: 'SPARK ADS',
    title: 'Spark Ads (bài của nhà sáng tạo)',
    description: 'Quảng bá một bài đăng thật của tài khoản shop hoặc của nhà sáng tạo.',
    bestFor: 'Hợp khi đã có video tự nhiên được xem nhiều, hoặc đang hợp tác với nhà sáng tạo.',
    sourceKeys: ['spark', 'infeedSpecs']
  },
  {
    id: 'lead', tag: 'FORM & TIN NHẮN',
    title: 'Thu khách tiềm năng (form & tin nhắn)',
    description: 'Bấm quảng cáo là mở biểu mẫu tức thì hoặc khung chat.',
    bestFor: 'Hợp khi cần số điện thoại hoặc cuộc trò chuyện để tư vấn, và có người gọi lại, người trực tin.',
    sourceKeys: ['instantForm', 'formQuestions', 'messaging']
  },
  {
    id: 'shop', tag: 'VIDEO & LIVE SHOPPING',
    title: 'Video & LIVE bán hàng (GMV Max)',
    description: 'Video và phiên LIVE gắn sản phẩm; khách mua ngay trong ứng dụng.',
    bestFor: 'Hợp khi đã có cửa hàng TikTok Shop hoặc danh mục sản phẩm, và có người lên LIVE.',
    sourceKeys: ['gmvMax', 'gmvMigration', 'videoShopping']
  },
  {
    id: 'search', tag: 'TÌM KIẾM',
    title: 'Quảng cáo trong tìm kiếm',
    description: 'Quảng cáo xen trong kết quả khi khách gõ tìm trên TikTok.',
    bestFor: 'Hợp khi khách hay tìm tên sản phẩm, cách dùng hoặc so sánh ngay trên TikTok.',
    sourceKeys: ['autoSearch', 'searchCampaign', 'searchAvail']
  },
  {
    id: 'brand', tag: 'THƯƠNG HIỆU · ĐẶT TRƯỚC',
    title: 'TopView, TopReach & đặt trước',
    description: 'Vị trí nổi bật mua trước: video đầu tiên khi mở ứng dụng hoặc đầu trang Dành cho bạn.',
    bestFor: 'Hợp khi ra mắt sản phẩm, vào mùa cao điểm và cần phủ rộng trong thời gian ngắn.',
    sourceKeys: ['topview', 'topreach', 'topfeed']
  }
];

// [name, label, text] — the orbit on page 01.
export const JOURNEY = [
  ['Lướt video', 'CHẶNG 1 · ĐANG LƯỚT',
    'Khách mở TikTok để giải trí. Video nối tiếp nhau trong Dành cho bạn, mỗi video chỉ có vài giây để giữ người xem.'],
  ['Dừng xem', 'CHẶNG 2 · DỪNG LẠI',
    'TikTok chọn người xem dựa trên mục tiêu, đối tượng và video bạn đưa vào. Giây đầu quyết định họ xem tiếp hay vuốt đi.'],
  ['Bấm / nhắn / mua', 'CHẶNG 3 · HÀNH ĐỘNG',
    'Khách bấm nút kêu gọi, chạm thẻ sản phẩm, gửi tin nhắn hoặc đăng ký. Nút nào dẫn tới đâu được chọn từ lúc tạo quảng cáo.'],
  ['Trang đích / form / cửa hàng', 'CHẶNG 4 · ĐIỂM ĐẾN',
    'Khách tới website, mở biểu mẫu tức thì, khung chat hoặc trang sản phẩm trong TikTok Shop. Điểm đến phải nói tiếp đúng điều video đã hứa.'],
  ['Tư vấn', 'CHẶNG 5 · NGƯỜI THẬT',
    'Nhân viên trả lời tin nhắn, gọi lại số vừa để lại hoặc trả lời bình luận trong LIVE. Trả lời chậm thì khách nguội.'],
  ['Đơn hàng & CRM', 'CHẶNG 6 · GHI NHẬN',
    'Đơn và trạng thái khách được ghi vào CRM hoặc cửa hàng. Kết quả thật gửi ngược về TikTok để hệ thống học đúng người.']
];

/* Per type: chapter content. Formats: [id, name, where, what]. */
export const PANELS = {
  infeed: {
    formats: [
      ['fy-video', 'Video trong Dành cho bạn', 'Giữa các video trong trang Dành cho bạn, toàn màn hình dọc.',
        'Video 9:16 có tiếng, tên tài khoản, nhãn Được tài trợ, chú thích ngắn và thanh nút kêu gọi.'],
      ['fy-cta', 'Thanh nút nổi bật', 'Cùng video, khi khách xem tiếp.',
        'Thanh nút ở đáy chuyển sang màu nổi để mời bấm. Thời điểm và cách hiện do TikTok quyết định.'],
      ['carousel', 'Carousel ảnh', 'Trong Dành cho bạn, như một bài đăng nhiều ảnh.',
        'Từ 2 đến 35 ảnh vuốt ngang, luôn kèm nhạc, có dấu chấm chỉ ảnh đang xem.'],
      ['ad-network', 'Pangle (mạng đối tác)', 'Trong ứng dụng đối tác của TikTok, ngoài TikTok.',
        'Video hoặc ảnh hiện trong ứng dụng khác. Có thể loại ứng dụng không muốn bằng danh sách chặn.'],
      ['app-bundle', 'Gói ứng dụng toàn cầu', 'Trong một số ứng dụng khác của cùng hệ sinh thái.',
        'Dùng lại video In-Feed, hiện theo giao diện của ứng dụng chứa quảng cáo.']
    ],
    how: ['TikTok chọn người có khả năng làm hành động bạn chọn',
      'Phiên đấu giá quyết định video nào được hiện',
      'Video hiện giữa trang Dành cho bạn',
      'Khách bấm nút và mở trang trong trình duyệt của ứng dụng',
      'Pixel và Events API ghi lại xem sản phẩm, giỏ hàng, đơn'],
    inputs: ['Video dọc 9:16', 'Văn bản quảng cáo', 'Trang sản phẩm', 'Sự kiện đo trên website'],
    outputs: 'Lượt vào trang và đơn được ghi nhận; lượt xem cao chưa chắc có đơn',
    setup: {
      campaign: [['Lưu lượng truy cập'], ['Doanh số', 'on'], ['Lượt xem video']],
      goal: 'Chuyển đổi · Mua hàng',
      where: 'Website',
      placements: [['TikTok', true], ['Pangle', false], ['Gói ứng dụng toàn cầu', false]],
      ad: [['s-tall', 'r916', '9:16 chính'], ['s6', 'r11', '1:1 cho Pangle'], ['s-hero', 'r169', '16:9 phụ']]
    },
    specs: [
      ['Video 9:16', '540 × 960 px trở lên', 'Mức tối thiểu của TikTok. Quay dọc từ đầu để không có viền.'],
      ['Video 1:1', '640 × 640 px trở lên', 'Dùng khi chạy thêm Pangle hoặc ứng dụng đối tác.'],
      ['Video 16:9', '960 × 540 px trở lên', 'Được chấp nhận nhưng hiện nhỏ trong khung dọc.'],
      ['Văn bản quảng cáo', 'tối đa 100 ký tự', 'Không chèn liên kết, @ hay hashtag.'],
      ['Tên hiển thị', 'tối đa 20 ký tự', 'Tên thương hiệu trên quảng cáo (10 ký tự với tiếng Trung, Nhật, Hàn).'],
      ['Hình đại diện', '98 × 98 px · dưới 50 KB', 'Chi tiết chính nằm trong vùng 66 × 66 ở giữa.'],
      ['Thời lượng', 'Tối đa 10 phút', 'Giới hạn kỹ thuật. Video ngắn dễ xem hết hơn.'],
      ['Tệp video', 'MP4, MOV, MPEG, 3GP, AVI · tối đa 500 MB', 'Tốc độ bit từ 516 kbps.'],
      ['Vùng an toàn', 'Cột nút bên phải · chữ ở đáy', 'Vùng cụ thể tùy khung; TikTok cho tải tệp mẫu. Hình bên chỉ minh họa.'],
      ['Nhạc', 'Thư viện nhạc thương mại', 'Doanh nghiệp không dùng thư viện nhạc thường; dùng nhạc thương mại hoặc âm thanh tự làm.']
    ],
    assets: [
      ['9:16', 'Video dọc', 'Quay dọc từ đầu, sản phẩm xuất hiện ngay giây đầu.'],
      ['Chữ', 'Văn bản quảng cáo', 'Một câu lợi ích, không hashtag, không liên kết.'],
      ['Trang', 'Trang sản phẩm', 'Mở đúng món trong video, không mở trang chủ.'],
      ['Sự kiện', 'Pixel + Events API', 'Đo xem hàng, thêm giỏ, mua.']
    ],
    measure: [
      ['Xem sản phẩm', 'product', 'eye', 'ViewContent', 'Trang sản phẩm mở trong trình duyệt của ứng dụng.'],
      ['Thêm vào giỏ', 'cart', 'cart', 'AddToCart', 'Món hàng vào giỏ; khách chưa trả tiền.'],
      ['Đặt hàng', 'order', 'check', 'Purchase', 'Trang xác nhận đơn hiện ra kèm giá trị đơn.']
    ],
    track: 'Cần TikTok Pixel trên website và nên thêm Events API từ máy chủ. Hai nguồn gửi cùng một sự kiện phải có cùng event_id để TikTok khử trùng lặp.',
    bid: 'Bắt đầu với Số kết quả tối đa. Chỉ đặt Chi phí mục tiêu khi đã có đủ đơn để biết mức hợp lý.',
    caution: 'Lượt xem 2 giây chưa phải người quan tâm. Trang tải chậm làm mất một phần người đã bấm.',
    paths: [
      ['Ba cảnh mở đầu khác nhau', 'Giữ phần thân video, đổi giây đầu. So tỷ lệ xem 2 giây và 6 giây giữa các bản.'],
      ['Nhiều video cho một mục tiêu', 'Đưa vài video vào cùng nhóm quảng cáo để hệ thống dồn tiền cho bản được xem nhiều.'],
      ['Đo tới đơn, không dừng ở lượt xem', 'Tối ưu cho Purchase khi website đã ghi đủ đơn. Khi còn ít đơn, AddToCart là bước tạm.']
    ],
    diagnosis: [
      ['Xem nhiều, ít bấm', 'Thanh nút có rõ không? Trang mở ra có đúng điều video vừa hứa không?'],
      ['Bấm nhiều, ít đơn', 'Kiểm tra tốc độ trang, phí giao và sự kiện Purchase có gửi đúng giá trị không.']
    ],
    diag: {
      'Xem nhiều, ít bấm': [['Xem 2 giây', '24.000', 'good'], ['Xem 6 giây', '11.000', 'good'], ['CTR', '0,4%', 'fix']],
      'Bấm nhiều, ít đơn': [['Lượt nhấp', '880', 'good'], ['AddToCart', '96', 'good'], ['Purchase', '4', 'fix']]
    },
    checks: ['Video quay dọc 9:16', 'Chữ nằm ngoài cột nút và phần chữ ở đáy', 'Nhạc lấy từ thư viện thương mại', 'Văn bản không có liên kết, hashtag',
      'Liên kết mở đúng trang sản phẩm', 'Pixel ghi ViewContent, AddToCart, Purchase', 'Events API có event_id để khử trùng lặp']
  },

  spark: {
    formats: [
      ['spark-post', 'Bài đăng của tài khoản shop', 'Trong Dành cho bạn, như một video thường của tài khoản.',
        'Bài đăng thật; lượt thích, bình luận, theo dõi cộng vào chính bài đó.'],
      ['spark-creator', 'Bài của nhà sáng tạo', 'Trong Dành cho bạn, dưới tên nhà sáng tạo.',
        'Video do nhà sáng tạo đăng, có nút theo dõi và số lượt thích thật, thêm thanh nút của shop.'],
      ['spark-profile', 'Trang hồ sơ sau khi chạm tên', 'Khi khách chạm tên hoặc ảnh đại diện.',
        'Trang hồ sơ với các video khác của tài khoản để khách xem tiếp.'],
      ['spark-code', 'Mã ủy quyền', 'Trong ứng dụng của người đăng bài.',
        'Chủ bài tạo mã ủy quyền, chọn thời hạn, rồi gửi cho người chạy quảng cáo.']
    ],
    how: ['Chủ bài tạo mã ủy quyền và gửi cho doanh nghiệp',
      'Bài đăng được chọn làm quảng cáo',
      'TikTok hiện bài cho người có khả năng làm hành động bạn chọn',
      'Khách bấm nút, theo dõi hoặc mở trang hồ sơ',
      'Tương tác cộng vào bài; hành động trên website đo bằng Pixel'],
    inputs: ['Bài đăng đã có', 'Mã ủy quyền', 'Nút kêu gọi', 'Trang đích hoặc hồ sơ'],
    outputs: 'Lượt xem, theo dõi và hành động sau khi bấm; tương tác cộng vào bài gốc',
    setup: {
      campaign: [['Lượt xem video'], ['Tương tác cộng đồng'], ['Doanh số', 'on']],
      goal: 'Chuyển đổi · Mua hàng',
      where: 'Website',
      placements: [['TikTok', true], ['Pangle', false]],
      ad: [['s-tall', 'r916', 'Bài của shop'], ['s3', 'r916', 'Bài nhà sáng tạo'], ['s1', 'r916', 'Bài khác']]
    },
    specs: [
      ['Video 9:16', '540 × 960 px trở lên', 'Bài đăng dọc, theo thông số In-Feed.'],
      ['Chú thích bài', 'tối đa 150 ký tự', 'Lấy từ bài gốc, không sửa trong trình quản lý quảng cáo.'],
      ['Mã ủy quyền', 'Thời hạn do chủ bài chọn', 'Tạo trong ứng dụng TikTok của người đăng bài.'],
      ['Tương tác', 'Thích · bình luận · chia sẻ · theo dõi', 'Cộng vào bài đăng và tài khoản gốc.'],
      ['Thời lượng', 'Tối đa 10 phút', 'Theo giới hạn video In-Feed.'],
      ['Nhạc', 'Nhạc được phép dùng cho quảng cáo', 'Bài dùng nhạc không có quyền thương mại có thể không chạy được.']
    ],
    assets: [
      ['9:16', 'Bài đăng dọc', 'Video đã được xem tự nhiên là ứng viên tốt.'],
      ['Mã', 'Mã ủy quyền', 'Xin từ chủ bài, ghi rõ thời hạn.'],
      ['Người', 'Nhà sáng tạo', 'Thỏa thuận quyền dùng bài và thời gian chạy.'],
      ['Trang', 'Trang đích', 'Khớp món trong video.']
    ],
    measure: [
      ['Theo dõi', 'follow', 'plus', 'Theo dõi', 'Khách bấm theo dõi; tài khoản có thêm người theo dõi.'],
      ['Xem hồ sơ', 'profile', 'person', 'Xem hồ sơ', 'Trang hồ sơ mở với các video khác.'],
      ['Xem sản phẩm', 'product', 'eye', 'ViewContent', 'Trang sản phẩm mở trong trình duyệt của ứng dụng.'],
      ['Đặt hàng', 'order', 'check', 'Purchase', 'Đơn hoàn tất trên website, ghi kèm giá trị.']
    ],
    track: 'Lượt xem, thích, theo dõi do TikTok đếm và cộng vào bài. Hành động trên website cần Pixel và Events API mới đọc được.',
    bid: 'Với mục tiêu Doanh số, bắt đầu với Số kết quả tối đa. Tương tác đẹp chưa chắc có đơn.',
    caution: 'Bài của nhà sáng tạo cần thỏa thuận quyền dùng rõ ràng. Bình luận dưới bài là công khai, cần người trả lời.',
    paths: [
      ['Chọn bài đã tự chạy tốt', 'Lấy bài có tỷ lệ xem hết cao làm quảng cáo, thay vì làm video mới từ đầu.'],
      ['Nhiều nhà sáng tạo, một sản phẩm', 'Mỗi người kể một kiểu. So tỷ lệ bấm và đơn theo từng bài.'],
      ['Hồ sơ gọn để xem tiếp', 'Ghim video về sản phẩm trên hồ sơ để người tò mò xem thêm.']
    ],
    diagnosis: [
      ['Mỏi nội dung', 'Tần suất tăng, tỷ lệ xem 6 giây giảm dần. Thay bài hoặc thêm bài của nhà sáng tạo khác.'],
      ['Nhiều thích, ít đơn', 'Đọc bình luận xem khách hỏi gì. Trang đích có đúng món trong bài không.']
    ],
    diag: {
      'Mỏi nội dung': [['Tần suất', '3,8', 'fix'], ['Xem 6 giây', '9%', 'fix'], ['CPM', '58.000₫', 'consider']],
      'Nhiều thích, ít đơn': [['Lượt thích', '4.200', 'good'], ['Lượt nhấp', '310', 'good'], ['Purchase', '3', 'fix']]
    },
    checks: ['Mã ủy quyền còn hạn', 'Thỏa thuận quyền dùng với nhà sáng tạo', 'Nhạc trong bài dùng được cho quảng cáo', 'Hồ sơ gọn, có video ghim',
      'Có người trả lời bình luận', 'Liên kết mở đúng trang', 'Pixel ghi ViewContent và Purchase']
  },

  lead: {
    formats: [
      ['lead-video', 'Video kèm nút Đăng ký', 'Trong Dành cho bạn.',
        'Video như quảng cáo thường, thanh nút Đăng ký hoặc Nhận báo giá.'],
      ['form-open', 'Biểu mẫu tức thì', 'Mở ngay trong TikTok khi khách bấm nút.',
        'Câu hỏi điền sẵn từ thông tin khách đã có; có thể thêm câu hỏi phân loại.'],
      ['form-thanks', 'Màn cảm ơn', 'Sau khi khách gửi.',
        'Lời cảm ơn, bước tiếp theo và nút gọi hoặc xem website.'],
      ['dm-open', 'Tin nhắn trong TikTok', 'Nút Gửi tin nhắn mở hộp thư TikTok với tài khoản doanh nghiệp.',
        'Lời chào và câu hỏi gợi ý; cuộc chat diễn ra ngay trong TikTok.'],
      ['zalo-open', 'Tin nhắn qua Zalo', 'Nút mở Zalo Official Account của doanh nghiệp.',
        'Cuộc chat chuyển sang Zalo; cần OA đã nối với TikTok.']
    ],
    how: ['TikTok chọn người có khả năng để lại thông tin hoặc nhắn tin',
      'Video hiện với nút Đăng ký hoặc Gửi tin nhắn',
      'Biểu mẫu mở sẵn thông tin, hoặc khung chat mở với lời chào',
      'Khách gửi; lead lưu ở Trung tâm khách hàng tiềm năng hoặc hộp thư',
      'Lead được tải về hoặc đẩy sang CRM để gọi lại'],
    inputs: ['Video dọc 9:16', 'Câu hỏi biểu mẫu', 'Chính sách quyền riêng tư', 'Người gọi lại, người trực tin'],
    outputs: 'Danh sách lead có tên, số điện thoại, hoặc cuộc trò chuyện; lead chưa gọi thì chưa phải khách',
    setup: {
      campaign: [['Lưu lượng truy cập'], ['Khách hàng tiềm năng', 'on'], ['Doanh số']],
      goal: 'Gửi biểu mẫu',
      where: 'Biểu mẫu tức thì',
      placements: [['TikTok', true], ['Pangle', false]],
      ad: [['s-tall', 'r916', '9:16 video'], ['s-shelf', 'r191', 'Ảnh đầu form'], ['s6', 'r11', 'Hình đại diện']]
    },
    specs: [
      ['Video 9:16', '540 × 960 px trở lên', 'Theo thông số In-Feed.'],
      ['Chính sách quyền riêng tư', 'Bắt buộc có liên kết', 'Biểu mẫu không tạo được nếu thiếu.'],
      ['Loại biểu mẫu', 'Nhiều khách hơn · Ý định cao hơn', 'Loại ý định cao thêm bước xem lại và CAPTCHA trước khi gửi.'],
      ['Câu hỏi', 'Điền sẵn · trắc nghiệm · trả lời ngắn', 'Câu trắc nghiệm tối đa 10 lựa chọn; có thể đặt câu hỏi phân loại.'],
      ['Lưu lead', '90 ngày trong Trung tâm khách hàng tiềm năng', 'Chỉ quản trị viên tải được. Nên nối CRM để không mất lead.'],
      ['Tin nhắn', 'Hộp thư TikTok · Zalo · Messenger · WhatsApp · LINE', 'Tin nhắn trong TikTok cần tài khoản doanh nghiệp mở nhận tin từ mọi người.']
    ],
    assets: [
      ['9:16', 'Video dọc', 'Nói rõ khách nhận được gì khi đăng ký.'],
      ['Câu hỏi', 'Bộ câu hỏi', 'Ít câu, mỗi câu giúp phân loại khách.'],
      ['Trang', 'Chính sách quyền riêng tư', 'Trang công khai trên website của doanh nghiệp.'],
      ['Tin nhắn', 'Lời chào & câu gợi ý', 'Những câu khách hay hỏi nhất.']
    ],
    measure: [
      ['Đăng ký', 'formopen', 'form', 'Mở biểu mẫu', 'Biểu mẫu mở ngay trong TikTok, không sang website.'],
      ['Gửi', 'lead', 'send', 'Lead', 'Màn cảm ơn hiện ra. Lead nằm ở Trung tâm khách hàng tiềm năng.'],
      ['Gửi tin nhắn', 'chat', 'chat', 'Bắt đầu trò chuyện', 'Khung chat mở với lời chào và câu hỏi gợi ý.'],
      ['Lead phù hợp', 'crm', 'check', 'Lead phù hợp', 'Nhân viên gọi, đánh dấu trong CRM rồi gửi trạng thái về TikTok.']
    ],
    track: 'Lead lưu trong TikTok và phải được lấy ra: tải tệp ở Trung tâm khách hàng tiềm năng hoặc nối CRM. Gửi trạng thái lead phù hợp về qua Events API hoặc tệp CSV để tối ưu cho chất lượng.',
    bid: 'Bắt đầu với Số kết quả tối đa. Chỉ đặt Chi phí mục tiêu khi đã biết bao nhiêu lead thành khách.',
    caution: 'Biểu mẫu điền sẵn rất dễ gửi, nên có lead không nhớ đã đăng ký. Gọi lại càng sớm càng tốt.',
    paths: [
      ['Nhiều lead để thử thị trường', 'Loại Nhiều khách hơn, ít câu hỏi. Đo tỷ lệ gọi được trước khi tăng tiền.'],
      ['Ít lead nhưng rõ nhu cầu', 'Loại Ý định cao hơn, thêm một câu phân loại. Mỗi lead đắt hơn nhưng dễ chốt.'],
      ['Chat cho khách cần hỏi', 'Khách muốn hỏi giá, hỏi mẫu thì mở tin nhắn trong TikTok hoặc Zalo, có người trực.']
    ],
    diagnosis: [
      ['Lead rẻ nhưng gọi không được', 'Xem lead được gọi sau bao lâu. Thử loại biểu mẫu có bước xem lại.'],
      ['Nhiều tin nhắn, ít số điện thoại', 'Đọc lại 20 cuộc chat gần nhất. Kiểm tra thời gian trả lời đầu tiên.']
    ],
    diag: {
      'Lead rẻ nhưng gọi không được': [['Lead', '64', 'good'], ['CPL', '42.000₫', 'good'], ['Gọi được', '15', 'fix']],
      'Nhiều tin nhắn, ít số điện thoại': [['Cuộc trò chuyện', '140', 'good'], ['Trả lời đầu tiên', '52 phút', 'fix'], ['Có số điện thoại', '19', 'consider']]
    },
    checks: ['Liên kết chính sách quyền riêng tư', 'Chọn loại biểu mẫu', 'Ít câu hỏi, có câu phân loại', 'Màn cảm ơn có bước tiếp theo',
      'Người gọi lại trong ngày', 'Hộp thư mở nhận tin, có người trực', 'Lead tải về hoặc nối CRM']
  },

  shop: {
    formats: [
      ['shop-video', 'Video gắn sản phẩm', 'Trong Dành cho bạn, với thẻ sản phẩm ở đáy video.',
        'Video của shop hoặc nhà sáng tạo, gắn từ 1 đến 20 sản phẩm.'],
      ['shop-pdp', 'Trang sản phẩm trong ứng dụng', 'Mở khi khách chạm thẻ sản phẩm.',
        'Ảnh, giá, đánh giá và nút Mua ngay, không rời TikTok.'],
      ['shop-live', 'Quảng cáo LIVE', 'Đưa người xem vào phiên LIVE đang phát.',
        'Số người xem, bình luận, túi hàng và sản phẩm đang ghim.'],
      ['shop-catalog', 'Quảng cáo danh mục', 'Dành cho bạn; sản phẩm lấy từ danh mục.',
        'Ảnh, tên, giá lấy từ danh mục; dẫn về website hoặc ứng dụng.']
    ],
    how: ['Cửa hàng hoặc danh mục gửi sản phẩm, giá, tồn kho',
      'GMV Max chọn video, phiên LIVE và người xem',
      'Khách thấy video gắn sản phẩm hoặc phiên LIVE',
      'Khách chạm thẻ, xem trang sản phẩm và mua',
      'Đơn và doanh thu ghi trong cửa hàng; ROI tính bằng doanh thu ÷ chi phí'],
    inputs: ['Cửa hàng TikTok Shop', 'Video gắn sản phẩm', 'Phiên LIVE', 'Mục tiêu ROI'],
    outputs: 'Đơn hàng và doanh thu (GMV) trong cửa hàng; ROI của GMV Max chưa trừ giá vốn',
    gmv: true,
    setup: {
      rail: ['Chiến dịch', 'Cửa hàng & sản phẩm', 'Nội dung', 'Xem lại'],
      campaign: [['Product GMV Max', 'on'], ['LIVE GMV Max'], ['Doanh số · danh mục']],
      goal: 'Mục tiêu ROI',
      where: 'TikTok Shop',
      placements: [['Video của shop', true], ['Video nhà sáng tạo', true], ['Phiên LIVE', false]],
      ad: [['s-tall', 'r916', 'Video gắn sản phẩm'], ['s1', 'r11', 'Ảnh sản phẩm'], ['s-shelf', 'r916', 'Video LIVE']]
    },
    specs: [
      ['Video 9:16', '540 × 960 px trở lên', 'Theo thông số In-Feed.'],
      ['Sản phẩm gắn', '1–20 sản phẩm mỗi video', 'Gắn bằng liên kết sản phẩm trong video.'],
      ['Tài khoản', 'Một tài khoản quảng cáo cho mỗi cửa hàng', 'Theo hướng dẫn GMV Max.'],
      ['Mục tiêu ROI', 'Giữ ít nhất 3 ngày', 'Đổi liên tục làm hệ thống khó học.'],
      ['Danh mục', 'Sản phẩm · giá · ảnh · tình trạng hàng', 'Cần cho quảng cáo danh mục dẫn về website hoặc ứng dụng.'],
      ['LIVE', 'Có người dẫn và lịch phát', 'Quảng cáo đưa người xem vào phiên đang phát.']
    ],
    assets: [
      ['9:16', 'Video gắn sản phẩm', 'Sản phẩm rõ ngay giây đầu.'],
      ['Video', 'Kịch bản LIVE', 'Giờ phát, món ghim, ưu đãi.'],
      ['Danh mục', 'Danh mục sản phẩm', 'Giá, tồn kho đúng với cửa hàng.'],
      ['Người', 'Người lên LIVE', 'Trả lời bình luận, ghim món đang nói.']
    ],
    measure: [
      ['Mở thẻ sản phẩm', 'pdp', 'tag', 'Xem sản phẩm', 'Trang sản phẩm mở ngay trong TikTok.'],
      ['Mua ngay', 'order', 'cart', 'Đặt hàng', 'Đơn tạo trong cửa hàng, kèm giá trị.'],
      ['Vào LIVE', 'live', 'play', 'Xem LIVE', 'Phiên LIVE mở với sản phẩm đang ghim.'],
      ['Đơn đã giao', 'crm', 'check', 'Đơn đã giao', 'Đơn giao thành công, không hoàn, đối chiếu trong cửa hàng.']
    ],
    track: 'Đơn và doanh thu của GMV Max ghi trong cửa hàng TikTok Shop, không cần Pixel. Nếu bán cả qua website, dùng quảng cáo danh mục với Pixel và Events API gửi mã sản phẩm.',
    bid: 'GMV Max tối ưu theo mục tiêu ROI. Đặt mức ROI từ số liệu thật và giữ ít nhất 3 ngày trước khi đổi.',
    caution: 'ROI trong GMV Max là doanh thu ÷ chi phí quảng cáo, chưa trừ giá vốn, phí sàn, hoàn hàng. Đó không phải lợi nhuận.',
    paths: [
      ['Video của nhiều nhà sáng tạo', 'Để GMV Max dùng cả video của shop lẫn video nhà sáng tạo đã gắn sản phẩm.'],
      ['LIVE theo lịch cố định', 'Phát cùng giờ mỗi tuần, ghim món đang nói, dùng LIVE GMV Max để kéo người xem.'],
      ['Đọc đơn đã giao', 'So doanh thu trong báo cáo với đơn giao thành công sau hoàn, hủy.']
    ],
    diagnosis: [
      ['Xem nhiều, ít đơn', 'Giá, phí giao, đánh giá trên trang sản phẩm có ổn không. Thẻ sản phẩm có đúng món trong video không.'],
      ['Mỏi nội dung', 'ROI giảm dần khi video cũ chạy lâu. Thêm video mới vào cửa hàng.']
    ],
    diag: {
      'Xem nhiều, ít đơn': [['Xem trang sản phẩm', '2.600', 'good'], ['Đặt hàng', '14', 'consider'], ['Đơn đã giao', '8', 'fix']],
      'Mỏi nội dung': [['Video mới trong 14 ngày', '0', 'fix'], ['ROI', '2,1', 'consider'], ['CPM', '64.000₫', 'consider']]
    },
    checks: ['Cửa hàng TikTok Shop đã duyệt', 'Một tài khoản quảng cáo cho cửa hàng', 'Sản phẩm có giá, ảnh, tồn kho đúng', 'Video gắn đúng món',
      'Lịch LIVE và người dẫn', 'Mục tiêu ROI từ số liệu thật', 'Đối chiếu đơn đã giao, hoàn, hủy']
  },

  search: {
    formats: [
      ['search-grid', 'Kết quả tìm kiếm', 'Trong lưới kết quả khi khách gõ tìm trên TikTok.',
        'Video nằm giữa các kết quả, có nhãn Được tài trợ.'],
      ['search-open', 'Mở từ kết quả', 'Khi khách chạm ô quảng cáo trong lưới.',
        'Video mở toàn màn hình với thanh nút, như In-Feed.'],
      ['search-auto', 'Vị trí tìm kiếm tự động', 'Bật sẵn cho nhiều mục tiêu; dùng lại quảng cáo In-Feed.',
        'Không cần nội dung riêng. TikTok ghép quảng cáo với từ khách tìm.'],
      ['search-campaign', 'Chiến dịch tìm kiếm riêng', 'Chỉ ở một số thị trường; danh sách hiện chưa có Việt Nam.',
        'Chọn từ khóa, từ 20 từ mỗi nhóm; hỗ trợ Spark và Carousel.']
    ],
    how: ['Khách gõ tìm trên TikTok',
      'TikTok ghép từ khách tìm với quảng cáo liên quan',
      'Quảng cáo hiện trong lưới kết quả, nhãn Được tài trợ',
      'Khách chạm, video mở toàn màn hình với thanh nút',
      'Hành động sau khi bấm được ghi bằng Pixel'],
    inputs: ['Video In-Feed sẵn có', 'Từ khách hay tìm', 'Trang sản phẩm', 'Sự kiện đo trên website'],
    outputs: 'Lượt bấm từ tìm kiếm và hành động sau đó; người tìm đã có nhu cầu nhưng còn so sánh',
    setup: {
      campaign: [['Lưu lượng truy cập'], ['Khách hàng tiềm năng'], ['Doanh số', 'on']],
      goal: 'Chuyển đổi · Mua hàng',
      where: 'Website',
      placements: [['TikTok', true], ['Vị trí tìm kiếm tự động', true], ['Pangle', false]],
      ad: [['s-tall', 'r916', '9:16 video'], ['s2', 'r916', 'Video hướng dẫn'], ['s4', 'r916', 'Video so sánh']]
    },
    specs: [
      ['Video 9:16', '540 × 960 px trở lên', 'Dùng lại quảng cáo In-Feed.'],
      ['Văn bản quảng cáo', 'tối đa 100 ký tự', 'Theo quảng cáo In-Feed.'],
      ['Vị trí tìm kiếm tự động', 'Bật sẵn · áp dụng toàn cầu', 'Trước đây gọi là Search Ads Toggle.'],
      ['Mục tiêu hỗ trợ', 'Doanh số · Khách hàng tiềm năng · Lưu lượng · Ứng dụng · Phạm vi tiếp cận', 'Thêm Lượt xem video và Tương tác cộng đồng.'],
      ['Từ khóa', 'Từ 20 từ khóa mỗi nhóm', 'Chỉ với chiến dịch tìm kiếm riêng, chưa có ở Việt Nam.'],
      ['Nhãn', 'Được tài trợ', 'Hiện trên ô quảng cáo trong kết quả.']
    ],
    assets: [
      ['9:16', 'Video trả lời câu hỏi', 'Cách dùng, so sánh, giá: thứ khách hay tìm.'],
      ['Chữ', 'Văn bản quảng cáo', 'Có từ khách hay gõ.'],
      ['Trang', 'Trang sản phẩm', 'Mở đúng món khách tìm.'],
      ['Dữ liệu', 'Danh sách câu khách hỏi', 'Lấy từ bình luận, tin nhắn và ô tìm kiếm.']
    ],
    measure: [
      ['Mở video', 'open', 'play', 'Xem video', 'Video mở toàn màn hình từ kết quả tìm kiếm.'],
      ['Xem sản phẩm', 'product', 'eye', 'ViewContent', 'Trang sản phẩm mở trong trình duyệt của ứng dụng.'],
      ['Đặt hàng', 'order', 'check', 'Purchase', 'Đơn hoàn tất trên website, ghi kèm giá trị.']
    ],
    track: 'Tìm kiếm dùng cùng Pixel và Events API như In-Feed. Nên xem báo cáo theo vị trí để biết đơn đến từ tìm kiếm hay Dành cho bạn.',
    bid: 'Dùng chung chiến lược với nhóm quảng cáo. Số kết quả tối đa là điểm khởi đầu an toàn.',
    caution: 'Chiến dịch tìm kiếm riêng chưa có ở Việt Nam theo danh sách thị trường của TikTok. Ở Việt Nam, tìm kiếm chạy qua vị trí tự động.',
    paths: [
      ['Video trả lời câu hỏi', 'Làm video cho câu khách hay tìm: cách dùng, so sánh, giá. Chúng hợp cả Dành cho bạn lẫn tìm kiếm.'],
      ['Giữ vị trí tìm kiếm bật', 'Để quảng cáo có mặt khi người đã xem video quay lại tìm tên sản phẩm.'],
      ['Nghe câu hỏi trong bình luận', 'Câu khách hỏi dưới video thường là thứ họ sẽ gõ tìm. Làm video trả lời.']
    ],
    diagnosis: [
      ['Xem nhiều, ít bấm', 'Ô trong lưới có cho thấy sản phẩm ngay không? Ảnh bìa video quyết định lượt chạm.'],
      ['Bấm nhiều, ít đơn', 'Video mở ra có trả lời đúng điều khách vừa tìm không. Trang đích có đúng món không.']
    ],
    diag: {
      'Xem nhiều, ít bấm': [['Hiển thị trong tìm kiếm', '6.800', 'good'], ['Xem 2 giây', '1.900', 'consider'], ['CTR', '0,3%', 'fix']],
      'Bấm nhiều, ít đơn': [['Lượt nhấp', '420', 'good'], ['ViewContent', '300', 'good'], ['Purchase', '2', 'fix']]
    },
    checks: ['Vị trí tìm kiếm tự động đang bật', 'Video trả lời câu khách hay tìm', 'Ảnh bìa cho thấy sản phẩm', 'Văn bản có từ khách hay gõ',
      'Liên kết mở đúng trang sản phẩm', 'Pixel ghi ViewContent, Purchase', 'Xem lại danh sách thị trường trước khi hứa chiến dịch tìm kiếm riêng']
  },

  brand: {
    formats: [
      ['topview', 'TopView', 'Video đầu tiên khi mở ứng dụng, toàn màn hình, có tiếng.',
        'Video dọc đặt trước, chỉ cho khách hàng đủ điều kiện; nội dung duyệt trước khoảng 2 ngày.'],
      ['topfeed', 'TopFeed', 'Vị trí đầu trong Dành cho bạn sau khi mở ứng dụng.',
        'Mua theo phạm vi tiếp cận và tần suất đặt trước.'],
      ['topreach', 'TopReach', 'Kết hợp TopView và TopFeed.',
        'Tối đa 1 lượt hiển thị mỗi người trong 24 giờ; mở ở một số thị trường.'],
      ['rf', 'Phạm vi tiếp cận & tần suất', 'Dành cho bạn, mua trước theo số người và số lần.',
        'Biết trước số người tiếp cận, tần suất và giá trước khi chạy.']
    ],
    how: ['Đặt trước vị trí, ngày chạy và số người tiếp cận',
      'TikTok duyệt nội dung trước ngày chạy',
      'Video hiện ở vị trí nổi bật, toàn màn hình',
      'Khách xem, bấm vào trang hoặc theo dõi tài khoản',
      'Đo người tiếp cận, tần suất, lượt xem hết'],
    inputs: ['Video dọc có tiếng', 'Ngày chạy đã chọn', 'Ngân sách đặt trước', 'Trang đích hoặc hồ sơ'],
    outputs: 'Người tiếp cận, tần suất và lượt xem đã đặt; đơn hàng không phải mục tiêu chính',
    setup: {
      campaign: [['Phạm vi tiếp cận', 'on'], ['Lượt xem video'], ['Tương tác cộng đồng']],
      goal: 'Đặt trước',
      where: 'Trang đích',
      placements: [['TopView', true], ['TopFeed', true], ['Dành cho bạn', true]],
      ad: [['s-tall', 'r916', 'Video TopView'], ['s-hero', 'r169', 'Không dùng 16:9'], ['s-shelf', 'r916', 'Video TopFeed']]
    },
    specs: [
      ['Video 9:16', '540 × 960 px trở lên', 'Theo thông số video dọc của TikTok.'],
      ['Chữ trên TopView', 'Hiện tối đa 4 dòng', 'Chữ dài hơn bị ẩn.'],
      ['Duyệt nội dung', 'Trước khoảng 2 ngày', 'Nội dung TopView phải được duyệt trước ngày chạy.'],
      ['Tần suất TopReach', '1 lượt mỗi người / 24 giờ', 'Theo bài giới thiệu TopReach.'],
      ['Điều kiện', 'Khách hàng đủ điều kiện', 'Mua qua đại diện TikTok; không tự bật trong mọi tài khoản.'],
      ['Đặt chỗ tạm', 'Giữ chỗ trước khi xác nhận', 'Dành cho chiến dịch đặt trước.']
    ],
    assets: [
      ['9:16', 'Video mở đầu', 'Có tiếng, sản phẩm rõ trong giây đầu.'],
      ['Video', 'Bản thay thế', 'Cho TopFeed và những ngày sau.'],
      ['Trang', 'Trang đích', 'Trang ra mắt hoặc hồ sơ tài khoản.'],
      ['Dữ liệu', 'Lịch chạy', 'Ngày ra mắt, mùa cao điểm.']
    ],
    measure: [
      ['Xem hết video', 'view', 'play', 'Xem hết', 'Video chạy hết với tiếng, rồi chuyển về Dành cho bạn.'],
      ['Xem sản phẩm', 'product', 'eye', 'ViewContent', 'Trang sản phẩm mở trong trình duyệt của ứng dụng.'],
      ['Theo dõi', 'follow', 'plus', 'Theo dõi', 'Khách theo dõi tài khoản để xem thêm video.']
    ],
    track: 'Người tiếp cận, tần suất và lượt xem do TikTok đếm. Muốn biết sau đó có ai mua, vẫn cần Pixel trên website.',
    bid: 'Mua theo hình thức đặt trước: giá và số lượt được xác nhận trước khi chạy, không đấu giá từng lượt.',
    caution: 'TopView và TopReach không mở cho mọi tài khoản và mọi thị trường. Hỏi đại diện TikTok trước khi lên kế hoạch.',
    paths: [
      ['Ra mắt trong một ngày', 'TopView ngày đầu, sau đó In-Feed nhắc lại cho người đã xem.'],
      ['Mùa cao điểm', 'Đặt trước tần suất để đủ số lần nhắc trong tuần mua sắm.'],
      ['Nối với Spark', 'Dùng bài của nhà sáng tạo ở những ngày sau để câu chuyện tự nhiên hơn.']
    ],
    diagnosis: [
      ['Mỏi nội dung', 'Tần suất vượt mức định, lượt xem hết giảm. Thay bản video hoặc giảm tần suất.'],
      ['Xem nhiều, ít bấm', 'Video thương hiệu thường ít bấm. Đo thêm người theo dõi mới và lượt tìm tên thương hiệu.']
    ],
    diag: {
      'Mỏi nội dung': [['Người tiếp cận', '210.000', 'good'], ['Tần suất', '4,2', 'fix'], ['Xem hết', '6%', 'fix']],
      'Xem nhiều, ít bấm': [['Người tiếp cận', '180.000', 'good'], ['CTR', '0,2%', 'consider'], ['Theo dõi mới', '1.100', 'good']]
    },
    checks: ['Hỏi điều kiện mua TopView, TopReach', 'Chọn ngày và giữ chỗ', 'Video có tiếng, sản phẩm ngay giây đầu', 'Chữ không quá 4 dòng',
      'Nộp duyệt trước khoảng 2 ngày', 'Kế hoạch nhắc lại sau ngày chạy', 'Pixel đo hành động trên website']
  }
};

/* ================================================================== *
 * Page 02 — choosing
 * ================================================================== */
// The seven objectives in TikTok Ads Manager (awareness, consideration,
// conversion). Brand consideration is left to a note: select customers only.
export const OBJECTIVES = [
  {id: 'reach', title: 'Phạm vi tiếp cận', icon: 'eye',
    optimise: 'Nhiều người khác nhau thấy quảng cáo.',
    where: 'Không cần đi đâu; khách xem ngay trong Dành cho bạn.',
    measure: 'Người tiếp cận, lượt hiển thị, tần suất, CPM.',
    needs: 'Video dễ nhớ; chưa cần website.'},
  {id: 'traffic', title: 'Lưu lượng truy cập', icon: 'page',
    optimise: 'Lượt bấm hoặc lượt vào trang đích.',
    where: 'Website hoặc ứng dụng.',
    measure: 'Lượt nhấp, CTR, CPC, lượt vào trang đích.',
    needs: 'Trang đích tải nhanh trên điện thoại.'},
  {id: 'views', title: 'Lượt xem video', icon: 'play',
    optimise: 'Người có khả năng xem video lâu hơn.',
    where: 'Ở lại trong TikTok, xem tiếp video.',
    measure: 'Xem 2 giây, xem 6 giây, thời gian xem trung bình.',
    needs: 'Video giữ được người xem ngay giây đầu.'},
  {id: 'community', title: 'Tương tác cộng đồng', icon: 'heart',
    optimise: 'Người theo dõi tài khoản hoặc ghé trang hồ sơ.',
    where: 'Trang hồ sơ TikTok của doanh nghiệp.',
    measure: 'Người theo dõi mới, lượt xem hồ sơ.',
    needs: 'Hồ sơ gọn, đủ video tốt để xem tiếp.'},
  {id: 'leads', title: 'Khách hàng tiềm năng', icon: 'form',
    optimise: 'Người để lại thông tin hoặc nhắn tin.',
    where: 'Biểu mẫu tức thì, tin nhắn TikTok, Zalo hoặc website.',
    measure: 'Lead, CPL, lead phù hợp, cuộc trò chuyện.',
    needs: 'Chính sách quyền riêng tư, người gọi lại, CRM.'},
  {id: 'app', title: 'Quảng bá ứng dụng', icon: 'install',
    optimise: 'Lượt cài hoặc hành động trong ứng dụng.',
    where: 'Trang ứng dụng trên kho ứng dụng.',
    measure: 'Lượt cài, sự kiện trong ứng dụng.',
    needs: 'Công cụ đo ứng dụng đã nối với TikTok.'},
  {id: 'sales', title: 'Doanh số', icon: 'cart',
    optimise: 'Người có khả năng mua.',
    where: 'Website, ứng dụng hoặc cửa hàng TikTok Shop.',
    measure: 'Purchase, giá trị đơn, ROAS; GMV và ROI với TikTok Shop.',
    needs: 'Pixel và Events API, hoặc cửa hàng TikTok Shop; có thể thêm danh mục.'}
];

// Five readiness stages → the ad a person at that stage should see.
export const READINESS = [
  {id: 'cold', name: 'Chưa biết', icon: 'play', state: 'Chưa từng nghe tới shop.',
    aim: 'Làm họ dừng lại và nhớ tên shop.', run: 'TopView, video In-Feed', content: 'Người thật dùng sản phẩm, giây đầu rõ ràng.', cta: 'Tìm hiểu thêm'},
  {id: 'warm', name: 'Đã quan tâm', icon: 'heart', state: 'Đã xem video, thích bài hoặc theo dõi.',
    aim: 'Cho thấy người khác đang dùng.', run: 'Spark Ads với bài nhà sáng tạo', content: 'Bài thật của nhà sáng tạo, bình luận thật.', cta: 'Xem thêm'},
  {id: 'hot', name: 'Đang cân nhắc', icon: 'search', state: 'Đang tìm, so giá, đọc đánh giá.',
    aim: 'Có mặt khi họ tìm, trả lời điều họ hỏi.', run: 'Tìm kiếm, video gắn sản phẩm', content: 'Video so sánh, hướng dẫn, giá rõ ràng.', cta: 'Mua ngay'},
  {id: 'lead', name: 'Đã liên hệ', icon: 'chat', state: 'Đã nhắn tin hoặc để lại số.',
    aim: 'Nhắc lịch, gửi thông tin còn thiếu.', run: 'Quảng cáo tin nhắn nhắc lại', content: 'Lịch hẹn, ưu đãi có hạn.', cta: 'Gửi tin nhắn'},
  {id: 'customer', name: 'Đã mua', icon: 'cart', state: 'Đã có đơn.',
    aim: 'Mua lại hoặc mua món đi kèm.', run: 'LIVE, quảng cáo mua lại', content: 'Món đi kèm, phiên LIVE ưu đãi cho khách cũ.', cta: 'Vào LIVE'}
];

// Audiences in three families.
export const AUDIENCES = [
  {id: 'location', family: 'hard', title: 'Vị trí', icon: 'pin',
    text: 'Quốc gia, tỉnh thành nơi quảng cáo được hiện.',
    use: 'Luôn đặt đúng khu vực giao hàng hoặc phục vụ.'},
  {id: 'age', family: 'hard', title: 'Độ tuổi', icon: 'person',
    text: 'Nhóm tuổi được thấy quảng cáo. Một số ngành phải giới hạn tuổi cao hơn.',
    use: 'Khi sản phẩm không dành cho người nhỏ tuổi.'},
  {id: 'language', family: 'hard', title: 'Ngôn ngữ', icon: 'globe',
    text: 'Ngôn ngữ người xem dùng trên ứng dụng.',
    use: 'Khi video và trang đích chỉ có một ngôn ngữ.'},
  {id: 'interest', family: 'hint', title: 'Sở thích', icon: 'heart',
    text: 'Chủ đề người xem hay quan tâm, TikTok suy ra từ hoạt động dài hạn.',
    use: 'Làm gợi ý khởi đầu cho tài khoản mới.'},
  {id: 'behavior', family: 'hint', title: 'Tương tác video, nhà sáng tạo, hashtag', icon: 'hash',
    text: 'Người vừa xem, thích, bình luận video cùng chủ đề, theo dõi nhà sáng tạo hoặc xem hashtag.',
    use: 'Nhắm người đang quan tâm trong thời gian gần đây.'},
  {id: 'smart', family: 'hint', title: 'Smart+ / nhắm mục tiêu thông minh', icon: 'auto',
    text: 'TikTok mở rộng ra ngoài gợi ý khi thấy người khác có khả năng làm hành động hơn.',
    use: 'Khi sự kiện đo đã đúng và muốn hệ thống tự tìm.'},
  {id: 'customer', family: 'data', title: 'Tệp khách hàng', icon: 'table',
    text: 'Email, số điện thoại khách cũ, được mã hóa trước khi khớp.',
    use: 'Loại trừ khách cũ, hoặc làm nguồn cho đối tượng tương tự.'},
  {id: 'website', family: 'data', title: 'Người vào website', icon: 'page',
    text: 'Người đã xem trang, thêm vào giỏ, ghi bởi TikTok Pixel.',
    use: 'Nhắc lại món đã xem.'},
  {id: 'engagement', family: 'data', title: 'Người tương tác', icon: 'like',
    text: 'Người đã xem, thích, bình luận, chia sẻ quảng cáo hoặc video của tài khoản.',
    use: 'Mời người đã quan tâm sang bước tiếp.'},
  {id: 'leadgen', family: 'data', title: 'Người mở biểu mẫu', icon: 'form',
    text: 'Người đã mở hoặc gửi biểu mẫu tức thì.',
    use: 'Nhắc người mở biểu mẫu nhưng chưa gửi.'},
  {id: 'shop', family: 'data', title: 'Hoạt động cửa hàng', icon: 'store',
    text: 'Người đã xem, thêm giỏ hoặc mua trong cửa hàng TikTok Shop.',
    use: 'Mời mua lại, gợi ý món đi kèm.'},
  {id: 'lookalike', family: 'data', title: 'Đối tượng tương tự', icon: 'users',
    text: 'Người giống một nhóm nguồn; chọn mức hẹp, cân bằng hoặc rộng.',
    use: 'Tìm khách mới khi đã có nhóm nguồn tốt.'}
];

export const FAMILIES = {
  hard: ['Ràng buộc cứng', '#ffbd80'],
  hint: ['Gợi ý cho hệ thống', '#c0a2ff'],
  data: ['Dữ liệu của doanh nghiệp', '#85e1c1']
};

/* ================================================================== *
 * Page 03 — money, bidding, measurement, rollout
 * ================================================================== */
export const COST_BUCKETS = [
  ['ads', 'auction', 'Trả cho TikTok', 'Tiền quảng cáo thực chi, cộng thuế GTGT 10% theo quy định hiện hành.'],
  ['make', 'creative', 'Sản xuất nội dung', 'Video dọc, nhà sáng tạo, người lên LIVE, trang đích, phần cài đo lường.'],
  ['fee', 'users', 'Phí dịch vụ POWAI', 'Công dựng, theo dõi, điều chỉnh và báo cáo. Xuất hóa đơn riêng.']
];

// [key, label, icon, text]
export const BILLING = [
  ['daily', 'Ngân sách hằng ngày', 'calendar',
    'Mức chi mỗi ngày. Nhóm quảng cáo cần trên 20 USD mỗi ngày, chiến dịch trên 50 USD. Có ngày chi tới 125% mức đặt.'],
  ['lifetime', 'Ngân sách trọn đời', 'clock',
    'Tổng tiền cho cả thời gian chạy, tối thiểu 20 USD × số ngày. Loại ngân sách không đổi được sau khi chạy.'],
  ['pay', 'Nạp tiền & thanh toán', 'pay',
    'Tài khoản VND nạp trước bằng thẻ ngân hàng, chuyển khoản trực tuyến, MoMo hoặc ZaloPay. Đã chuyển sang trừ tự động thì không quay lại nạp tay.'],
  ['tax', 'Thuế GTGT 10%', 'tag',
    'Từ 01/07/2025, tiền quảng cáo chịu thuế GTGT 10% theo Luật Thuế GTGT số 48/2024/QH15. Ví dụ: 1.000 + 100 thuế = 1.100.'],
  ['invoice', 'Hóa đơn & mã số thuế', 'receipt',
    'Khai mã số thuế 10 hoặc 13 số để hóa đơn đúng tên doanh nghiệp. Phí dịch vụ POWAI xuất hóa đơn riêng.']
];

// Five bid strategies.
export const BIDS = {
  max: ['TỰ ĐỘNG', 'Số kết quả tối đa', 'Chi hết ngân sách để có nhiều kết quả nhất. Trước đây gọi là Chi phí thấp nhất.',
    'Ngân sách', 'Nhiều kết quả nhất', 'Không cần số liệu trước.', 'Chi phí mỗi kết quả có thể tăng khi tăng ngân sách.',
    'Bắt đầu chiến dịch mới, chưa biết chi phí hợp lý.'],
  costcap: ['MỤC TIÊU CHI PHÍ', 'Chi phí mục tiêu mỗi kết quả', 'Giữ chi phí bình quân quanh một mức. Trước đây gọi là Cost Cap.',
    'Mức chi phí bình quân', 'Kết quả quanh mức đó', 'Đã biết chi phí mỗi kết quả thường gặp.', 'Đặt quá thấp thì ít được phân phối.',
    'Mục tiêu 150.000₫ mỗi lead: có lead 120.000₫, có lead 190.000₫.'],
  roas: ['GIÁ TRỊ', 'ROAS tối thiểu', 'Giữ doanh thu trên chi phí không thấp hơn một mức.',
    'Tỷ lệ ROAS mong muốn', 'Đơn có giá trị quanh mức đó', 'Purchase gửi kèm giá trị.', 'Đặt quá cao thì ít được phân phối.',
    'ROAS 3: 1₫ quảng cáo mong mang về 3₫ doanh thu.'],
  value: ['GIÁ TRỊ', 'Giá trị cao nhất', 'Chi hết ngân sách để có tổng giá trị đơn cao nhất.',
    'Ngân sách', 'Tổng giá trị cao nhất', 'Purchase có giá trị đơn.', 'Có thể ít đơn hơn nhưng đơn lớn hơn.',
    'Hai đơn 500.000₫ hay một đơn 2.000.000₫: chọn tổng tiền.'],
  roi: ['TIKTOK SHOP', 'Mục tiêu ROI (GMV Max)', 'GMV Max hướng tới mức doanh thu cửa hàng ÷ chi phí quảng cáo bạn đặt.',
    'Mức ROI', 'Doanh thu cửa hàng quanh mức đó', 'Cửa hàng TikTok Shop, một tài khoản quảng cáo cho cửa hàng.', 'Giữ ít nhất 3 ngày trước khi đổi.',
    'ROI 4: 1₫ quảng cáo mong mang về 4₫ doanh thu cửa hàng.']
};
export const BID_ORDER = ['max', 'costcap', 'roas', 'value', 'roi'];

// Funnel tiers and their metrics on one sample month.
export const SAMPLE = {impressions: 80000, reach: 30000, v2s: 24000, v6s: 11000, v100: 4000, watch: 6.2, clicks: 880, landing: 640,
  convos: 90, lead: 52, qualified: 20, sale: 12, spend: 9000000, revenue: 15600000, allCost: 14000000};

export const KPIS = {
  impressions: ['Lượt hiển thị', 'Số lần quảng cáo hiện trên màn hình.', 'Tăng mà lượt xem 2 giây không tăng: xem lại cảnh mở đầu.'],
  reach: ['Người tiếp cận', 'Số người khác nhau đã thấy quảng cáo.', 'Ít người nhưng nhiều hiển thị: tần suất đang cao.'],
  frequency: ['Tần suất', 'Lượt hiển thị ÷ người tiếp cận.', 'Tần suất cao và tỷ lệ xem giảm: đổi video.'],
  cpm: ['CPM', 'Chi phí cho 1.000 lượt hiển thị.', 'CPM tăng: đối tượng hẹp hoặc mùa cao điểm.'],
  v2s: ['Xem 2 giây', 'Lượt xem ít nhất 2 giây liên tục.', 'Thấp so với hiển thị: cảnh đầu chưa giữ được người xem.'],
  v6s: ['Xem 6 giây', 'Lượt xem ít nhất 6 giây.', 'Rơi mạnh từ 2 giây xuống 6 giây: phần sau mở đầu chưa đủ hấp dẫn.'],
  watch: ['Thời gian xem trung bình', 'Số giây trung bình mỗi lượt xem.', 'So với độ dài video để biết người xem rời ở đâu.'],
  complete: ['Tỷ lệ xem hết', 'Lượt xem tới hết video ÷ lượt hiển thị.', 'Video dài ít người xem hết; đừng so video dài với video ngắn.'],
  clicks: ['Lượt nhấp', 'Lượt bấm vào nút hoặc liên kết trên quảng cáo.', 'Khác với lượt thích, bình luận.'],
  ctr: ['CTR', 'Lượt nhấp ÷ lượt hiển thị.', 'CTR thấp: video chưa khiến người xem muốn bấm.'],
  cpc: ['CPC', 'Tiền ÷ lượt nhấp.', 'CPC thấp chưa chắc tốt nếu khách không ở lại.'],
  lead: ['Lead', 'Người gửi biểu mẫu hoặc để lại số.', 'Tăng nhanh bất thường: kiểm tra lead trùng.'],
  cpl: ['CPL', 'Tiền ÷ lead.', 'CPL thấp mà không gọi được thì vô ích.'],
  qualified: ['Lead phù hợp', 'Lead được nhân viên xác nhận đúng nhu cầu.', 'Cần CRM ghi lại, TikTok không tự biết.'],
  cpql: ['CPQL', 'Tiền ÷ lead phù hợp.', 'Gần doanh thu hơn CPL.'],
  convos: ['Cuộc trò chuyện', 'Cuộc chat mới sau khi bấm quảng cáo.', 'Nhiều cuộc nhưng ít số điện thoại: xem lại kịch bản trả lời.'],
  sale: ['Lượt mua', 'Đơn được ghi nhận.', 'Đối chiếu với đơn đã giao trong hệ thống bán hàng.'],
  gmv: ['GMV / doanh thu', 'Tổng giá trị đơn ghi nhận.', 'GMV gồm cả đơn sau này bị hủy, hoàn.'],
  roas: ['ROAS', 'Doanh thu ÷ tiền quảng cáo.', 'Chưa trừ giá vốn, phí giao, phí dịch vụ.'],
  roi: ['ROI (GMV Max)', 'Doanh thu cửa hàng ÷ chi phí quảng cáo, theo cách TikTok gọi trong GMV Max.',
    'Không phải ROI kinh doanh: chưa trừ giá vốn, phí sàn, hoàn hàng.'],
  cac: ['CAC', 'Tổng chi phí thu hút ÷ khách mới.', 'Tính cả sản xuất và phí dịch vụ, không chỉ tiền TikTok.']
};

// [id, label, value, metric ids]
export const KPI_TIERS = [
  ['show', 'Hiển thị & tiếp cận', SAMPLE.impressions, ['impressions', 'reach', 'frequency', 'cpm']],
  ['view', 'Lượt xem video', SAMPLE.v2s, ['v2s', 'v6s', 'watch', 'complete']],
  ['click', 'Nhấp', SAMPLE.clicks, ['clicks', 'ctr', 'cpc']],
  ['lead', 'Khách tiềm năng', SAMPLE.lead, ['lead', 'cpl', 'qualified', 'cpql', 'convos']],
  ['sale', 'Đơn hàng', SAMPLE.sale, ['sale', 'gmv', 'roas', 'roi', 'cac']]
];

// Measurement stations: [id, icon, name, purpose, when, io]
export const TRACKING = {
  utm: ['link', 'UTM', 'Gắn nguồn vào liên kết để công cụ phân tích biết khách đến từ quảng cáo nào.',
    'Mọi quảng cáo dẫn ra website.', 'Liên kết → phiên truy cập có nguồn'],
  catalog: ['table', 'Danh mục', 'Danh sách sản phẩm có mã, giá, ảnh. Sự kiện gửi mã để khớp.',
    'Bán nhiều mã hàng, chạy quảng cáo danh mục.', 'Tệp sản phẩm → quảng cáo tự ghép'],
  pixel: ['code', 'Website + Pixel', 'Đoạn mã TikTok Pixel trên website ghi hành động của khách trong trình duyệt.',
    'Có website và muốn đo hành động sau khi bấm.', 'Hành động trên web → sự kiện'],
  eventsApi: ['lock', 'Events API', 'Máy chủ của website gửi sự kiện thẳng cho TikTok.',
    'Muốn đo ổn định hơn khi trình duyệt chặn mã. Dùng cùng Pixel với cùng event_id.', 'Máy chủ → sự kiện'],
  events: ['chart', 'Events Manager', 'Nơi xem sự kiện đến từ đâu, có lỗi gì, có bị trùng không.',
    'Luôn cần để kiểm tra trước khi chạy.', 'Sự kiện → báo cáo, tối ưu'],
  forms: ['form', 'Biểu mẫu → tải lead', 'Lead từ biểu mẫu tức thì lưu 90 ngày; tải về hoặc nối CRM.',
    'Chạy quảng cáo biểu mẫu.', 'Biểu mẫu → danh sách lead'],
  inbox: ['chat', 'Tin nhắn → CRM', 'Cuộc chat trong TikTok hoặc Zalo. Nhân viên ghi lead, đơn vào CRM.',
    'Chạy quảng cáo tin nhắn.', 'Tin nhắn → nhãn → CRM'],
  shop: ['store', 'Dữ liệu TikTok Shop', 'Đơn, doanh thu, hoàn hủy ghi ngay trong cửa hàng.',
    'Chạy GMV Max hoặc video mua sắm.', 'Đơn trong cửa hàng → báo cáo'],
  crm: ['users', 'CRM', 'Nơi ghi trạng thái thật của từng khách: phù hợp, đã mua.',
    'Muốn biết lead nào thành tiền.', 'Lead → trạng thái'],
  offline: ['upload', 'Gửi kết quả về TikTok', 'Trạng thái từ CRM gửi ngược về qua Events API, sự kiện ngoại tuyến hoặc tệp CSV.',
    'Muốn TikTok tối ưu cho lead phù hợp hoặc đơn thật.', 'CRM → sự kiện → tối ưu']
};

// [event name, label, note, confirmed?]
export const EVENTS = [
  ['ViewContent', 'Xem sản phẩm', 'Trang một món hàng. Kèm mã sản phẩm nếu có danh mục.'],
  ['Contact', 'Liên hệ', 'Bấm gọi, bấm nhắn. Là lượt bấm, chưa phải cuộc gọi thành công.'],
  ['Lead', 'Để lại thông tin', 'Gửi biểu mẫu trên web hoặc biểu mẫu tức thì. Tên cũ là SubmitForm.'],
  ['CompleteRegistration', 'Hoàn tất đăng ký', 'Đăng ký tài khoản, đăng ký sự kiện.'],
  ['AddToCart', 'Thêm vào giỏ', 'Món hàng vào giỏ. Khách chưa trả tiền.'],
  ['InitiateCheckout', 'Bắt đầu thanh toán', 'Khách mở bước thanh toán, chưa trả tiền.'],
  ['Purchase', 'Mua hàng', 'Đơn hoàn tất, kèm giá trị. Tên cũ là CompletePayment. Đối chiếu với đơn thật.', true],
  ['Lead phù hợp', 'Lead đã xác nhận', 'Nhân viên xác nhận trong CRM, gửi về qua Events API hoặc tệp CSV.', true]
];

// Ten steps: [title, what, output]
export const ROLLOUT = [
  ['Tìm hiểu', 'Doanh nghiệp bán gì, cho ai, khu vực nào, đang nhận khách qua đâu.', 'Bản tóm tắt mục tiêu'],
  ['Kiểm tra tài khoản', 'Business Center, tài khoản quảng cáo, tài khoản TikTok, cửa hàng, quyền truy cập.', 'Danh sách việc cần sửa'],
  ['Chọn cách chạy', 'Mục tiêu, điểm đến, kiểu quảng cáo cho từng nhóm khách.', 'Sơ đồ chiến dịch'],
  ['Cài đo lường', 'Pixel, Events API, sự kiện, nối biểu mẫu, hộp thư hoặc cửa hàng.', 'Sự kiện chạy thử đã ghi'],
  ['Chuẩn bị nội dung', 'Video 9:16, nhạc thương mại, mã ủy quyền Spark, câu hỏi biểu mẫu.', 'Bộ nội dung đã duyệt'],
  ['Dựng chiến dịch', 'Chiến dịch, nhóm quảng cáo, quảng cáo, ngân sách, vị trí.', 'Chiến dịch chờ bật'],
  ['Kiểm tra trước khi bật', 'Liên kết, sự kiện, chính sách quảng cáo, người trực tin, lịch LIVE.', 'Biên bản kiểm tra'],
  ['Chạy & theo dõi', 'Theo dõi hằng ngày trong tuần đầu, không sửa vội.', 'Ghi chú tuần đầu'],
  ['Điều chỉnh', 'Thêm video mới, dời ngân sách, tách hoặc gộp nhóm theo số liệu.', 'Nhật ký thay đổi'],
  ['Báo cáo', 'Đọc từ lượt hiển thị tới đơn đã giao, đối chiếu với CRM và cửa hàng.', 'Báo cáo định kỳ']
];
export const PHASES = [['Chuẩn bị', [0, 1, 2, 3]], ['Dựng chiến dịch', [4, 5, 6]], ['Chạy & tối ưu', [7, 8, 9]]];

export const PREP = [
  'Business Center của doanh nghiệp',
  'Tài khoản quảng cáo đứng tên doanh nghiệp',
  'Tài khoản TikTok doanh nghiệp (cho Spark và tin nhắn)',
  'Quyền Quản trị hoặc Tiêu chuẩn cho người vận hành',
  'Cách nạp tiền: thẻ, chuyển khoản, MoMo, ZaloPay',
  'Mã số thuế 10 hoặc 13 số để xuất hóa đơn',
  'TikTok Pixel đã cài trên website',
  'Events API gửi sự kiện từ máy chủ',
  'Cửa hàng TikTok Shop hoặc danh mục sản phẩm',
  'Video dọc 9:16, có vài bản mở đầu',
  'Nhạc từ thư viện nhạc thương mại',
  'Nhà sáng tạo và mã ủy quyền Spark',
  'Người trực tin nhắn trong giờ chạy',
  'Người lên LIVE và lịch phát',
  'Người gọi lại lead trong ngày'
];
export const PREP_GROUPS = [
  ['Tài khoản & quyền', 'shield', [0, 1, 2, 3]],
  ['Thanh toán & thuế', 'wallet', [4, 5]],
  ['Đo lường & cửa hàng', 'code', [6, 7, 8]],
  ['Nội dung & người', 'video', [9, 10, 11, 12, 13, 14]]
];

export const FAQ = [
  ['Chạy TikTok Ads tối thiểu bao nhiêu tiền?',
    'TikTok đặt mức tối thiểu theo USD: ngân sách chiến dịch trên 50 USD, nhóm quảng cáo trên 20 USD mỗi ngày (trọn đời là 20 USD × số ngày). Mức tương đương bằng VND hiện trong trình quản lý. Mức đủ để hệ thống học còn phụ thuộc chi phí mỗi kết quả.'],
  ['Bao lâu thì quảng cáo được duyệt?',
    'Phần lớn quảng cáo được xét trong 24 giờ. Nội dung TopView cần duyệt trước khoảng 2 ngày. Bị từ chối thì đọc lý do, sửa và gửi lại, hoặc kháng nghị nếu thấy sai.'],
  ['Tiền quảng cáo có chịu thuế không?',
    'Có. Từ 01/07/2025, tiền quảng cáo TikTok tại Việt Nam chịu thuế GTGT 10%. Khai mã số thuế doanh nghiệp để hóa đơn đúng tên.'],
  ['Không có website có chạy được không?',
    'Được. Biểu mẫu tức thì, tin nhắn và TikTok Shop không cần website. Nhưng không có website hay cửa hàng thì khó đo đơn hàng.'],
  ['Spark Ads khác quảng cáo thường thế nào?',
    'Spark Ads dùng bài đăng thật của tài khoản shop hoặc nhà sáng tạo. Lượt thích, bình luận, theo dõi cộng vào bài gốc. Cần mã ủy quyền từ chủ bài.'],
  ['Dùng nhạc đang thịnh hành được không?',
    'Doanh nghiệp không được dùng thư viện nhạc thường cho quảng cáo. Dùng Thư viện nhạc thương mại (miễn phí) hoặc âm thanh tự làm, có quyền dùng.'],
  ['Nên chọn biểu mẫu hay tin nhắn?',
    'Biểu mẫu hợp khi cần số điện thoại để gọi và có người gọi nhanh. Tin nhắn hợp khi khách cần hỏi nhiều và có người trực. Tin nhắn trong TikTok cho mục tiêu lead có ở Đông Nam Á, gồm Việt Nam.'],
  ['GMV Max là gì?',
    'Từ 07/2025, GMV Max là kiểu mặc định và duy nhất cho quảng cáo TikTok Shop. Bạn đặt mục tiêu ROI, hệ thống tự chọn video, phiên LIVE và người xem.'],
  ['ROI trong GMV Max có phải lợi nhuận không?',
    'Không. ROI ở đây là doanh thu cửa hàng ÷ chi phí quảng cáo, chưa trừ giá vốn, phí sàn, hoàn hàng.'],
  ['Quảng cáo tìm kiếm có chạy ở Việt Nam không?',
    'Vị trí tìm kiếm tự động áp dụng toàn cầu và bật sẵn. Riêng chiến dịch tìm kiếm độc lập thì danh sách thị trường của TikTok hiện chưa có Việt Nam.'],
  ['Pixel và Events API khác nhau thế nào?',
    'Pixel chạy trên trình duyệt của khách. Events API gửi từ máy chủ. Nên dùng cả hai với cùng event_id để TikTok khử trùng lặp.'],
  ['Vì sao số trong TikTok khác số đơn thật?',
    'TikTok ghi nhận theo khoảng thời gian sau khi xem hoặc bấm, có thể trùng với kênh khác. Đơn thật phải đối chiếu trong hệ thống bán hàng, CRM hoặc cửa hàng.'],
  ['Ai sở hữu tài khoản quảng cáo?',
    'Doanh nghiệp nên sở hữu Business Center, tài khoản quảng cáo, Pixel và tài khoản TikTok. POWAI được cấp quyền để vận hành; dừng hợp tác thì thu hồi quyền.'],
  ['Phí dịch vụ POWAI có nằm trong tiền TikTok không?',
    'Không. Tiền quảng cáo nạp thẳng vào tài khoản TikTok của doanh nghiệp. Phí dịch vụ POWAI xuất hóa đơn riêng.']
];
export const FAQ_TOPICS = [
  ['Chi phí & thuế', 'wallet', [0, 2, 13]],
  ['Chọn cách chạy', 'route', [3, 4, 6, 9]],
  ['Nội dung & cửa hàng', 'video', [5, 7, 8]],
  ['Đo lường & tài khoản', 'chart', [10, 11, 12, 1]]
];

// Goals for the contact form select.
export const CONTACT_GOALS = [
  ['sales', 'Bán hàng qua website'], ['shop', 'Bán qua TikTok Shop, LIVE'], ['leads', 'Thu số điện thoại khách'],
  ['messages', 'Nhận tin nhắn hỏi mua'], ['awareness', 'Ra mắt, tăng nhận biết']
];

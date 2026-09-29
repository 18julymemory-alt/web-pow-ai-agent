// Sources for the Thương mại điện tử pages (COMMERCE_LP_PLAN.md): the
// platforms' own seller education (Học viện Shopee / Shopee Uni, Học viện
// TikTok Shop), the Ministry of Industry and Trade portal, Google Search
// Central and Google Analytics. Read on CHECKED. Several seller articles
// need a seller login to read in full; the pages only state what the public
// summary says and send the reader to the source for current rules.
export const CHECKED = '2026-09-29';

const SP = 'https://banhang.shopee.vn/edu/';
const TT = 'https://seller-vn.tiktok.com/university/';

export const SOURCES = {
  shopeeEdu: [SP, 'Học viện Shopee (Shopee Uni)'],
  shopeeStart: [SP + 'courseDetail/11', 'Shopee: bắt đầu bán hàng'],
  shopeeImages: [SP + 'article/238', 'Shopee: hình ảnh sản phẩm'],
  shopeeVariants: [SP + 'article/66', 'Shopee: phân loại hàng'],
  shopeeDesc: [SP + 'article/2911/cach-mo-ta-san-pham-shopee-dung-chuan', 'Shopee: mô tả sản phẩm'],
  shopeeCategory: [SP + 'article/7944', 'Shopee: danh mục của shop'],
  shopeeSearchAds: [SP + 'article/2186', 'Shopee: quảng cáo tìm kiếm sản phẩm'],
  shopeeShopAds: [SP + 'article/2191', 'Shopee: quảng cáo shop'],
  shopeeFees: [SP + 'article/251', 'Shopee: các loại phí bán hàng'],
  shopeeFailRate: [SP + 'article/240', 'Shopee: tỷ lệ đơn không thành công'],
  shopeeOrders: [SP + 'article/17672', 'Shopee: thời hạn xử lý đơn'],
  ttUni: [TT + 'home', 'Học viện TikTok Shop'],
  ttRegister: [TT + 'essay?knowledge_id=6837770400712449&default_language=vi-VN', 'TikTok Shop: hướng dẫn đăng ký người bán'],
  ttListing: [TT + 'essay?knowledge_id=6837791128454914', 'TikTok Shop: đăng bán sản phẩm'],
  ttTitle: [TT + 'essay?knowledge_id=5918681919178512', 'TikTok Shop: tiêu đề, mô tả, hình ảnh, video'],
  ttContent: [TT + 'essay?knowledge_id=6837773789480706', 'TikTok Shop: chính sách nội dung'],
  ttBrand: [TT + 'essay?knowledge_id=8064144491513601', 'TikTok Shop: sản phẩm có thương hiệu'],
  ecom: ['https://online.gov.vn/', 'Bộ Công Thương: cổng quản lý thương mại điện tử'],
  product: ['https://developers.google.com/search/docs/appearance/structured-data/merchant-listing', 'Google Search Central: dữ liệu sản phẩm'],
  gaEvents: ['https://support.google.com/analytics/answer/9267735', 'Google Analytics: sự kiện đề xuất'],
  forms: ['https://web.dev/learn/forms/', 'web.dev: biểu mẫu']
};

export const UNVERIFIED = [
  'Phí sàn, điều kiện chương trình, thời hạn xử lý đơn: thay đổi theo sàn, ngành hàng và tài khoản; trang chỉ dẫn tới nguồn, không nêu con số.',
  'Một số bài trong Học viện Shopee cần đăng nhập Kênh Người Bán để đọc đầy đủ.',
  'Giao diện Kênh Người Bán trên trang là mô phỏng chung, không phải giao diện thật của sàn nào.',
  'Doanh số, lượt bán, tỷ lệ hoàn hủy, giá thầu trên trang là số mẫu.'
];

const TM = '/dich-vu/thuong-mai-dien-tu/';
const ALL = {
  'shopee': ['Shopee', 'Gian hàng, biến thể, xử lý đơn.'],
  'tiktok-shop': ['TikTok Shop', 'Video gắn đúng sản phẩm.'],
  'website-ban-hang': ['Website bán hàng', 'Kênh bán riêng bên cạnh sàn.'],
  'thiet-lap-gian-hang': ['Thiết lập gian hàng', 'Hồ sơ, danh mục, vận chuyển.'],
  'toi-uu-san-pham': ['Tối ưu sản phẩm', 'Ảnh, tên, thuộc tính, biến thể.'],
  'quang-cao-san': ['Quảng cáo sàn', 'Chọn SKU, đối soát đơn hoàn tất.'],
  'van-hanh-gian-hang': ['Vận hành gian hàng', 'Đơn, tin nhắn, hoàn hủy.'],
  'content-thuong-mai-dien-tu': ['Content thương mại điện tử', 'Mô tả, ảnh, video sản phẩm.']
};
export const sisters = (...slugs) => slugs.map(s => [ALL[s][0], ALL[s][1], TM + s + '/']);

export const CONTACT = {
  website: 'Gian hàng hoặc website hiện tại',
  budget: 'Số sản phẩm (SKU) dự kiến',
  title: 'Gửi bối cảnh gian hàng, nhận đề xuất phạm vi.',
  hint: 'POWAI cần biết bạn bán gì, bán ở sàn nào và ai đang xử lý đơn. Ba thông tin đó quyết định việc nên làm trước: dữ liệu sản phẩm, trang bán hay vận hành.'
};

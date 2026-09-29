// Sources for the Website & Landing Page pages (WEBSITE_LP_PLAN.md). Only
// official documentation: web.dev, W3C/WAI, MDN, WordPress.org, Google Search
// Central, Google Analytics, PageSpeed Insights, OWASP and the Vietnamese
// Ministry of Industry and Trade. Read on CHECKED; the facts quoted on the
// pages (Core Web Vitals thresholds, WordPress default roles, backup advice,
// form guidance, the e-commerce notification portal) come from these pages.
export const CHECKED = '2026-09-29';

const WD = 'https://web.dev/';
const GS = 'https://developers.google.com/search/docs/';
const WP = 'https://developer.wordpress.org/advanced-administration/';
const GA = 'https://support.google.com/analytics/answer/';

export const SOURCES = {
  forms: [WD + 'learn/forms/', 'web.dev: biểu mẫu'],
  design: [WD + 'learn/design/', 'web.dev: thiết kế đáp ứng'],
  images: [WD + 'learn/design/responsive-images', 'web.dev: ảnh đáp ứng'],
  lazy: [WD + 'learn/performance/lazy-load-images-and-iframe-elements', 'web.dev: tải ảnh trễ'],
  vitals: [WD + 'articles/vitals', 'web.dev: Core Web Vitals'],
  lcp: [WD + 'articles/lcp', 'web.dev: LCP'],
  inp: [WD + 'articles/inp', 'web.dev: INP'],
  cls: [WD + 'articles/cls', 'web.dev: CLS'],
  psi: ['https://developers.google.com/speed/docs/insights/v5/about', 'PageSpeed Insights: dữ liệu thực tế và phòng thí nghiệm'],
  caching: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching', 'MDN: bộ nhớ đệm HTTP'],
  wcag: ['https://www.w3.org/TR/WCAG22/', 'W3C: WCAG 2.2'],
  waiForms: ['https://www.w3.org/WAI/tutorials/forms/', 'W3C WAI: hướng dẫn biểu mẫu'],
  seo: [GS + 'fundamentals/seo-starter-guide', 'Google Search Central: SEO cơ bản'],
  sitemaps: [GS + 'crawling-indexing/sitemaps/overview', 'Google Search Central: sơ đồ trang web'],
  move: [GS + 'crawling-indexing/site-move-with-url-changes', 'Google Search Central: chuyển trang có đổi URL'],
  redirects: [GS + 'crawling-indexing/301-redirects', 'Google Search Central: chuyển hướng'],
  product: [GS + 'appearance/structured-data/merchant-listing', 'Google Search Central: dữ liệu sản phẩm'],
  wpAdmin: [WP, 'WordPress: sổ tay quản trị'],
  wpBackup: [WP + 'security/backup/', 'WordPress: sao lưu'],
  wpUpgrade: [WP + 'upgrade/upgrading/', 'WordPress: nâng cấp'],
  wpUpdate: ['https://wordpress.org/documentation/article/updating-wordpress/', 'WordPress: cập nhật'],
  wpRoles: ['https://wordpress.org/documentation/article/roles-and-capabilities/', 'WordPress: vai trò và quyền'],
  wpEditor: ['https://wordpress.org/documentation/article/wordpress-block-editor/', 'WordPress: trình soạn khối'],
  gaLead: [GA + '12944921', 'Google Analytics: báo cáo form tạo lead'],
  gaEvents: [GA + '9267735', 'Google Analytics: sự kiện đề xuất'],
  gaKey: [GA + '12946393', 'Google Analytics: sự kiện chính'],
  owaspApi: ['https://owasp.org/API-Security/', 'OWASP: API Security Top 10'],
  mdnStatus: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status', 'MDN: mã trạng thái HTTP'],
  ecom: ['https://online.gov.vn/', 'Bộ Công Thương: cổng quản lý thương mại điện tử']
};

// Points the pages state carefully because they could not be confirmed on
// the source itself, or depend on the client's own systems.
export const UNVERIFIED = [
  'Điều kiện và hồ sơ thông báo website bán hàng: trang chỉ dẫn tới online.gov.vn, không tóm tắt thủ tục vì quy định có thể thay đổi.',
  'Yêu cầu pháp lý về dữ liệu cá nhân trong form: trang khuyên hỏi ý kiến pháp chế, không trích điều khoản.',
  'Tên trường, mã lỗi và giới hạn API của CRM: phụ thuộc hệ thống khách dùng, các ví dụ trên trang là mẫu.',
  'Số phiên bản plugin, dung lượng sao lưu, thời gian tải, tỷ lệ cuộn: toàn bộ là số mẫu.'
];

const WL = '/dich-vu/website-landing-page/';
const ALL = {
  'website-doanh-nghiep': ['Website doanh nghiệp', 'Giới thiệu năng lực, dịch vụ, dự án và liên hệ.'],
  'website-ban-hang': ['Website bán hàng', 'Danh mục, sản phẩm, giỏ hàng và đơn.'],
  'landing-page': ['Landing Page', 'Một chiến dịch, một hành động.'],
  'wordpress': ['WordPress', 'Dựng và quản trị nội dung dễ sửa.'],
  'website-theo-yeu-cau': ['Website theo yêu cầu', 'Nghiệp vụ riêng, vai trò riêng.'],
  'ui-ux': ['UI/UX', 'Luồng thao tác và bản mẫu có trạng thái.'],
  'cro-toi-uu-chuyen-doi': ['CRO – tối ưu chuyển đổi', 'Tìm điểm rơi và thử nghiệm.'],
  'bao-tri-website': ['Bảo trì Website', 'Sao lưu, cập nhật, xử lý sự cố.'],
  'toi-uu-toc-do': ['Tối ưu tốc độ', 'Đo, sửa, đo lại trên điện thoại.'],
  'tich-hop-he-thong': ['Tích hợp hệ thống', 'Form, CRM, API và dữ liệu.']
};
// Three "Xem thêm" links to pages of the same group.
export const sisters = (...slugs) => slugs.map(s => [ALL[s][0], ALL[s][1], WL + s + '/']);

// Contact form wording shared by the ten pages.
export const CONTACT = {
  website: 'Website hiện tại (nếu có)',
  budget: 'Thời điểm cần hoàn thành',
  title: 'Gửi bối cảnh, nhận đề xuất phạm vi.',
  hint: 'POWAI cần biết website phục vụ ai, khách cần làm gì trên đó và hệ thống nào đang dùng. Ba thông tin đó quyết định phạm vi và cách làm được đề xuất.'
};

// Renamed chapters for the website pages (same ids as the ads pages).
export const toc = format => ({'khi-nao': 'Khi nào cần', 'dinh-dang': format, 'muc-tieu': 'Tình huống thực tế'});

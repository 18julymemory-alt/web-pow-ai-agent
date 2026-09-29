// Sources for the Đào tạo Digital Marketing pages (TRAINING_LP_PLAN.md).
// Official documentation and the platforms' own learning programmes only,
// read on CHECKED. Facts quoted on the pages (Google Ads account layers and
// match types, Skillshop certification, Meta objectives, TikTok objective
// groups and Pixel events, Tag Manager tags/triggers/variables, GA4
// DebugView and recommended events, Search Central guidance on helpful and
// AI-generated content, Apps Script triggers) come from these pages.
export const CHECKED = '2026-09-29';

const GA = 'https://support.google.com/google-ads/answer/';
const AN = 'https://support.google.com/analytics/answer/';
const TM = 'https://support.google.com/tagmanager/answer/';
const GS = 'https://developers.google.com/search/docs/';
const FB = 'https://www.facebook.com/business/';
const TT = 'https://ads.tiktok.com/help/article/';

export const SOURCES = {
  skillshop: ['https://skillshop.withgoogle.com/', 'Google Skillshop: khóa học chính thức'],
  gaCert: [GA + '9702955', 'Google Ads: chứng nhận'],
  gaStructure: [GA + '14752782', 'Google Ads: cấu trúc tài khoản'],
  gaMatch: [GA + '7478529', 'Google Ads: loại đối sánh từ khóa'],
  gaKeywords: [GA + '2453981', 'Google Ads: lập danh sách từ khóa'],
  blueprint: [FB + 'learn', 'Meta Blueprint: khóa học chính thức'],
  metaObjective: [FB + 'help/1438417719786914', 'Meta: chọn mục tiêu quảng cáo'],
  metaLevels: [FB + 'help/621956575422138', 'Meta: các cấp trong Ads Manager'],
  ttAcademy: ['https://ads.tiktok.com/business/en/academy', 'TikTok Academy: khóa học chính thức'],
  ttObjective: [TT + 'choose-right-objective', 'TikTok Ads: chọn mục tiêu'],
  ttPixel: [TT + 'tiktok-pixel', 'TikTok Ads: TikTok Pixel'],
  seo: [GS + 'fundamentals/seo-starter-guide', 'Google Search Central: SEO cơ bản'],
  helpful: [GS + 'fundamentals/creating-helpful-content', 'Google Search Central: nội dung hữu ích'],
  essentials: [GS + 'essentials', 'Google Search Essentials'],
  aiContent: ['https://developers.google.com/search/blog/2023/02/google-search-and-ai-content', 'Google Search Central: nội dung tạo bằng AI'],
  genAi: [GS + 'fundamentals/using-gen-ai-content', 'Google Search Central: dùng AI tạo nội dung'],
  gaEvents: [AN + '9267735', 'Google Analytics: sự kiện đề xuất'],
  gaAbout: [AN + '9322688', 'Google Analytics: về sự kiện'],
  gaDebug: [AN + '7201382', 'Google Analytics: DebugView'],
  gaLead: [AN + '12944921', 'Google Analytics: báo cáo form tạo lead'],
  gtm: [TM + '6103657', 'Tag Manager: thẻ, trình kích hoạt, biến'],
  gtmPreview: [TM + '6107056', 'Tag Manager: xem trước và gỡ lỗi'],
  forms: ['https://web.dev/learn/forms/', 'web.dev: biểu mẫu'],
  vitals: ['https://web.dev/articles/vitals', 'web.dev: Core Web Vitals'],
  triggers: ['https://developers.google.com/apps-script/guides/triggers/installable', 'Apps Script: trình kích hoạt'],
  metaSuite: [FB + 'help/blueprint', 'Meta: học trực tuyến Blueprint'],
  owaspApi: ['https://owasp.org/API-Security/', 'OWASP: API Security Top 10'],
  mdnStatus: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status', 'MDN: mã trạng thái HTTP']
};

// Points the pages state carefully because they could not be confirmed on
// the source itself, or depend on the client.
export const UNVERIFIED = [
  'Chứng nhận của POWAI: điều kiện và đơn vị cấp xác nhận theo từng chương trình; chứng nhận của Google, Meta, TikTok là chương trình riêng của các nền tảng.',
  'Giao diện Ads Manager, GA4, Tag Manager có thể đổi; bài học dạy theo giao diện tại thời điểm học.',
  'Số học viên, điểm đánh giá, số buổi trên trang là số mẫu.',
  'Luồng tự động hóa dùng công cụ nào tùy doanh nghiệp; ví dụ trên trang là mô phỏng.'
];

const DT = '/dich-vu/dao-tao-digital-marketing/';
const ALL = {
  'digital-marketing-tong-the': ['Digital Marketing tổng thể', 'Nền tảng: khách hàng, kênh, nội dung, dữ liệu.'],
  'google-ads': ['Đào tạo Google Ads', 'Từ khóa, cấu trúc, đọc truy vấn.'],
  'facebook-ads': ['Đào tạo Facebook Ads', 'Mục tiêu, nội dung, chất lượng lead.'],
  'tiktok-ads': ['Đào tạo TikTok Ads', 'Video, mục tiêu, sự kiện.'],
  'seo': ['Đào tạo SEO', 'Nhu cầu, onpage, kỹ thuật.'],
  'content-marketing': ['Đào tạo Content Marketing', 'Brief, chủ đề, biên tập.'],
  'social-media-marketing': ['Đào tạo Social Media', 'Lịch nội dung, phản hồi.'],
  'website-marketing': ['Đào tạo Website Marketing', 'Đánh giá trang đích.'],
  'ga4-tracking': ['Đào tạo GA4 & Tracking', 'Sự kiện, thẻ, kiểm tra.'],
  'ai-marketing': ['Đào tạo AI Marketing', 'Yêu cầu có nguồn, kiểm chứng.'],
  'automation': ['Đào tạo Automation', 'Luồng có nhánh lỗi.'],
  'marketing-thuc-chien-cho-doanh-nghiep': ['Marketing thực chiến', 'Workshop trên bài toán thật.'],
  'dao-tao-doi-ngu-marketing-noi-bo': ['Đào tạo đội ngũ nội bộ', 'Theo vai trò, cùng quy trình.']
};
export const sisters = (...slugs) => slugs.map(s => [ALL[s][0], ALL[s][1], DT + s + '/']);

export const CONTACT = {
  website: 'Website doanh nghiệp (nếu có)',
  budget: 'Số học viên dự kiến',
  title: 'Gửi bối cảnh đội ngũ, nhận đề cương đề xuất.',
  hint: 'POWAI cần biết ai sẽ học, họ đang phụ trách việc gì và cần áp dụng vào bài toán nào. Ba thông tin đó quyết định độ sâu và bài thực hành của chương trình.'
};

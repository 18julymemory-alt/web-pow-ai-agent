// Content for the three ChatGPT Ads landing pages.
//
// ChatGPT Ads opened in Vietnam on 23/09/2026 and changes quickly. Every
// platform fact here comes from OpenAI's own pages (openai.com,
// help.openai.com, developers.openai.com/ads, openai.com/policies/ad-policies)
// as read on CHECKED. Numbers that describe a platform limit come from those
// pages; every other number on the pages is a sample and is labelled as one.
// Features OpenAI calls beta, alpha or test are labelled "Đang thử nghiệm".

export const CHECKED = '2026-09-29';

// OpenAI does not state a VAT rate for Vietnamese advertisers on any page
// checked. Left null on purpose: the page shows no rate and says tax follows
// the documents OpenAI issues.
export const TAX_RATE = null;

// The minimum daily budget of an Ads Manager account billed in VND, from the
// minimum campaign spend table in "Create Campaigns for ChatGPT Ads".
export const MIN_DAILY_VND = 19000;

const H = slug => 'https://help.openai.com/en/articles/' + slug;
const D = slug => 'https://developers.openai.com/ads' + (slug ? '/' + slug : '');
const O = slug => 'https://openai.com/' + slug + '/';

// key → [url, link text]. Rendered by shared.sourceList (a URL id is used as is).
export const SOURCES = {
  expand: [O('index/chatgpt-ads-expands-southeast-asia-taiwan'), 'Mở tại Đông Nam Á & Đài Loan (23/09/2026)'],
  newWays: [O('index/new-ways-to-buy-chatgpt-ads'), 'Cách mua ChatGPT Ads mới'],
  expanding: [O('index/expanding-access-to-ai-with-chatgpt-ads'), 'Mở rộng ChatGPT Ads'],
  inChat: [H('20001047-ads-in-chatgpt'), 'Quảng cáo trong ChatGPT'],
  basics: [H('20001207-ads-in-chatgpt-the-basics'), 'ChatGPT Ads: cơ bản'],
  quickstart: [H('20001224-quickstart-launch-your-first-campaign'), 'Chạy chiến dịch đầu tiên'],
  campaigns: [H('20001210-create-campaigns-for-chatgpt-ads'), 'Tạo chiến dịch'],
  adGroups: [H('20001211-create-ad-groups-for-chatgpt-ads'), 'Tạo nhóm quảng cáo'],
  ads: [H('20001212-create-ads-for-chatgpt'), 'Tạo quảng cáo'],
  hints: [H('20001521-write-context-hints-for-chatgpt-ads'), 'Viết gợi ý ngữ cảnh'],
  bulk: [H('20001218-bulk-upload-campaign-schema-checklist'), 'Bulk upload: thông số'],
  convCamp: [H('20001412-conversion-optimized-campaigns'), 'Chiến dịch tối ưu chuyển đổi'],
  convMeasure: [H('20001409-conversion-measurement'), 'Đo lường chuyển đổi'],
  results: [H('20001214-measure-results'), 'Đọc kết quả'],
  billing: [H('20001216-billing-payment'), 'Thanh toán'],
  budgets: [H('20001413-daily-budgets'), 'Ngân sách ngày'],
  availability: [H('20001245-ads-manager-availability'), 'Quốc gia dùng Ads Manager'],
  account: [H('20001213-ads-manager-beta-account-setup'), 'Tạo tài khoản Ads Manager'],
  customAud: [H('20001346-set-up-custom-audiences-for-your-campaign'), 'Đối tượng tùy chỉnh'],
  feedCamp: [H('20001268-create-campaigns-from-product-feeds'), 'Chiến dịch từ danh mục sản phẩm'],
  agents: [H('20001524-sponsored-agents-in-chatgpt-ads'), 'Sponsored Agents'],
  faq: [H('20001220-frequently-asked-questions'), 'Câu hỏi thường gặp'],
  policies: [O('policies/ad-policies'), 'Chính sách quảng cáo'],
  dev: [D(''), 'Tài liệu kỹ thuật Ads'],
  pixel: [D('measurement-pixel'), 'Measurement Pixel'],
  capi: [D('conversions-api'), 'Conversions API'],
  events: [D('supported-events'), 'Sự kiện được hỗ trợ'],
  imageTag: [D('image-tag'), 'Image tag'],
  targeting: [D('campaign-targeting'), 'Nhắm mục tiêu chiến dịch'],
  devAud: [D('custom-audiences'), 'Custom Audiences (API)'],
  feeds: [D('product-feeds'), 'Product Feeds']
};

// Points that could not be confirmed on CHECKED. They are left out of the
// pages or worded as an illustration; listed here for the next review.
export const UNVERIFIED = [
  'Thuế GTGT cho nhà quảng cáo tại Việt Nam: không thấy trang OpenAI nào ghi. TAX_RATE để null.',
  'Hóa đơn: trang Thanh toán chỉ nói trừ thẻ theo ngưỡng (trả sau) và khách do đội bán hàng quản lý thì theo hóa đơn; chưa thấy mẫu chứng từ cho Việt Nam.',
  'Nhắm vùng nhỏ hơn quốc gia tại Việt Nam: tài liệu ghi có tỉnh/thành, thành phố, mã bưu chính "khi có"; chưa kiểm được danh sách cho Việt Nam.',
  'Chọn ngôn ngữ quảng cáo: tài liệu nói ngôn ngữ được xét theo vị trí, cài đặt và ngôn ngữ cuộc trò chuyện; chưa thấy ô chọn ngôn ngữ trong Ads Manager.',
  'Favicon: một trang ghi tối thiểu 256 × 256, trang khác ghi 128 × 128. Trang khuyên dùng 256 × 256 để đạt cả hai.',
  'Dòng tiêu đề ngữ cảnh phía trên thẻ: chưa thấy mô tả chi tiết; mô phỏng vẽ để minh họa.',
  'Danh sách đủ sự kiện chuẩn: đã đối chiếu 10 tên (page_viewed … app_opened); tên sự kiện nhóm dùng thử chưa đối chiếu nên không ghi.',
  'Tin tuyển dụng và cho thuê nhà cá nhân trong danh sách cấm: không thấy trong phần chính sách đã đọc, nên không ghi.',
  'Quảng cáo video: không thấy định dạng video trong tài liệu ChatGPT Ads đã đọc.',
  'Sponsored Agents tại Việt Nam: OpenAI ghi đang alpha giới hạn với một số nhà quảng cáo ở Mỹ; chưa có lịch cho Việt Nam.',
  'Chiến lược "Maximize Results": có trang Help Center riêng nhưng chưa đọc đủ để mô tả, nên không đưa vào trang.'
];

/* ================================================================== *
 * Page 01 — six ways to run
 * ================================================================== */
export const TYPES = [
  {
    id: 'card', tag: 'THẺ QUẢNG CÁO',
    title: 'Thẻ quảng cáo dưới câu trả lời',
    description: 'Một thẻ có tên, tiêu đề, mô tả và ảnh vuông, nằm dưới cuối câu trả lời của ChatGPT.',
    bestFor: 'Hợp khi có một trang đích rõ ràng cho đúng nhu cầu người dùng vừa hỏi.',
    sourceKeys: ['inChat', 'basics', 'ads']
  },
  {
    id: 'pair', tag: 'HAI THẺ CÙNG LÚC',
    title: 'Hai thẻ cùng lúc',
    description: 'Dưới một câu trả lời có thể có nhiều hơn một thẻ, của cùng hoặc khác nhà quảng cáo.',
    bestFor: 'Hợp khi một câu hỏi có nhiều hướng: mỗi mẫu quảng cáo trả lời một hướng.',
    sourceKeys: ['inChat', 'ads']
  },
  {
    id: 'product', tag: 'THẺ SẢN PHẨM',
    title: 'Thẻ sản phẩm từ danh mục',
    description: 'Ảnh, tên, giá, giá khuyến mãi, sao đánh giá và thương hiệu lấy thẳng từ danh mục sản phẩm.',
    bestFor: 'Hợp khi bán hàng có danh mục sạch, giá và tồn kho cập nhật hằng ngày.',
    sourceKeys: ['feedCamp', 'feeds', 'basics']
  },
  {
    id: 'carousel', tag: 'CAROUSEL SẢN PHẨM',
    title: 'Carousel sản phẩm',
    description: 'Nhiều thẻ sản phẩm xếp ngang, người dùng vuốt hoặc bấm mũi tên để xem tiếp.',
    bestFor: 'Hợp khi câu hỏi mở ra nhiều lựa chọn và danh mục có nhiều mẫu cùng nhóm.',
    sourceKeys: ['feedCamp', 'feeds', 'dev']
  },
  {
    id: 'conv', tag: 'TỐI ƯU CHUYỂN ĐỔI',
    title: 'Tối ưu chuyển đổi',
    description: 'Cùng thẻ quảng cáo, nhưng ChatGPT phân phối theo một sự kiện trên website: đăng ký, mua, gửi form.',
    bestFor: 'Hợp khi website đã gắn Pixel hoặc Conversions API và đã có sự kiện chạy thật.',
    sourceKeys: ['convCamp', 'pixel', 'capi']
  },
  {
    id: 'agent', tag: 'ĐANG THỬ NGHIỆM',
    title: 'Trò chuyện với thương hiệu',
    description: 'Từ quảng cáo, người dùng mở một cuộc trò chuyện có nhãn rõ ràng với trợ lý AI của doanh nghiệp.',
    bestFor: 'OpenAI đang thử nghiệm (alpha) với một số nhà quảng cáo tại Mỹ. Chưa đăng ký được ở Việt Nam.',
    sourceKeys: ['agents']
  }
];

// [name, label, text] — the orbit on page 01.
export const JOURNEY = [
  ['Người dùng hỏi', 'CHẶNG 1 · ĐANG HỎI',
    'Người dùng gói Free hoặc Go hỏi ChatGPT về một nhu cầu cụ thể: chọn quà, tìm khóa học, so sánh dịch vụ.'],
  ['ChatGPT trả lời', 'CHẶNG 2 · TRẢ LỜI ĐỘC LẬP',
    'Câu trả lời được viết độc lập. OpenAI nói quảng cáo không ảnh hưởng tới câu trả lời ChatGPT đưa ra.'],
  ['Thẻ "Được tài trợ"', 'CHẶNG 3 · QUẢNG CÁO',
    'Nếu có quảng cáo phù hợp với ngữ cảnh, thẻ hiện dưới cuối câu trả lời, gắn nhãn tài trợ và tách khỏi câu trả lời.'],
  ['Bấm hoặc trò chuyện', 'CHẶNG 4 · HÀNH ĐỘNG',
    'Người dùng bấm thẻ để sang trang đích. Với Sponsored Agents (đang thử nghiệm), họ có thể mở cuộc trò chuyện với doanh nghiệp.'],
  ['Trang đích, sản phẩm', 'CHẶNG 5 · TỰ XEM',
    'Trang mở ra phải đúng thứ người dùng vừa hỏi. Pixel hoặc Conversions API ghi lại việc họ làm tiếp theo.'],
  ['Tư vấn & đơn hàng', 'CHẶNG 6 · GHI NHẬN',
    'Nhân viên gọi lại, xác nhận đơn và ghi vào CRM. Ads Manager chỉ thấy số liệu tổng hợp, không thấy cuộc trò chuyện.']
];

// The three principles OpenAI states for ads in ChatGPT.
export const PRINCIPLES = [
  ['shield', 'Không ảnh hưởng câu trả lời', 'Quảng cáo tách khỏi câu trả lời và không làm ChatGPT nói tốt về nhà quảng cáo.', ['inChat', 'basics']],
  ['lock', 'Cuộc trò chuyện riêng tư', 'Nhà quảng cáo không nhận nội dung trò chuyện, lịch sử, tên, email hay vị trí chính xác; chỉ nhận số liệu tổng hợp.', ['inChat']],
  ['sliders', 'Người dùng tự kiểm soát', 'Ẩn quảng cáo, gửi phản hồi, xem vì sao thấy quảng cáo, tắt cá nhân hóa, xóa dữ liệu quảng cáo.', ['inChat']]
];

const HEAD50 = ['Tiêu đề', 'tối đa 50 ký tự', 'Giới hạn trong tài liệu Tạo quảng cáo và Bulk upload.'];
const DESC100 = ['Mô tả', 'tối đa 100 ký tự', 'Giới hạn trong tài liệu Tạo quảng cáo và Bulk upload.'];
const IMG = ['Ảnh vuông', 'tối thiểu 640 × 640 · tối đa 1200 × 1200', 'Ảnh 1:1. Ảnh hiện trong khung cố định ở bên phải thẻ.'];
const FAVICON = ['Favicon', 'Vuông · từ 256 × 256 px', 'Ảnh đại diện nhỏ cạnh tên nhà quảng cáo, đặt ở cấp tài khoản.'];
const LANDING = ['Trang đích', 'Đúng với quảng cáo', 'Trang phải khớp điều quảng cáo nói và tuân thủ chính sách quảng cáo của OpenAI.'];
const HINTS = ['Gợi ý ngữ cảnh', 'Tối đa 2.000 gợi ý / nhóm', 'Đặt ở cấp nhóm quảng cáo. Không phải từ khóa khớp chính xác.'];
const FEED = ['Danh mục sản phẩm', 'CSV · URL · SFTP', 'Chín trường bắt buộc trong phần thông tin cơ bản của sản phẩm.'];
const FEED_EXPIRE = ['Hạn dữ liệu', 'Sản phẩm hết hạn sau 2 tuần', 'Nên tải lại toàn bộ ít nhất mỗi ngày, bằng URL hoặc SFTP tự động.'];
const PIXEL = ['Pixel / Conversions API', 'Một sự kiện chuẩn / chiến dịch', 'Sự kiện tùy chỉnh chưa dùng được để tối ưu chuyển đổi.'];


/* Per type: chapter content. Formats: [id, name, where, what]. */
export const PANELS = {
  card: {
    formats: [
      ['card-phone', 'Trên điện thoại', 'Dưới cuối câu trả lời, trong ứng dụng iOS hoặc Android.',
        'Nhãn "Được tài trợ", favicon và tên, tiêu đề, mô tả, ảnh vuông. Bấm cả thẻ để mở trang đích.'],
      ['card-web', 'Trên máy tính', 'Dưới câu trả lời, trong ChatGPT trên trình duyệt.',
        'Cùng thẻ, rộng hơn. Tách khỏi câu trả lời bằng đường kẻ và nhãn tài trợ.'],
      ['card-context', 'Có dòng tiêu đề ngữ cảnh', 'Phía trên thẻ, do ChatGPT hiển thị.',
        'Một dòng giới thiệu ngắn đặt trên thẻ. Bố cục vẽ để minh họa; OpenAI quyết định khi nào hiện.'],
      ['card-menu', 'Menu ⋯ của người dùng', 'Góc phải thẻ quảng cáo.',
        'Ẩn quảng cáo, báo cáo quảng cáo, xem vì sao thấy quảng cáo này.'],
      ['card-settings', 'Cài đặt quảng cáo', 'Trong phần cài đặt của người dùng.',
        'Công tắc cá nhân hóa quảng cáo và nút xóa dữ liệu dùng cho quảng cáo.']
    ],
    billing: [['CPM', 'Mục tiêu Views: trả theo 1.000 lượt hiển thị.'], ['CPC', 'Mục tiêu Clicks: trả theo lượt nhấp hợp lệ.']],
    how: ['Bạn viết gợi ý ngữ cảnh và mẫu quảng cáo',
      'Người dùng hỏi, ChatGPT trả lời độc lập',
      'ChatGPT chọn quảng cáo hợp ngữ cảnh cuộc trò chuyện',
      'Thẻ "Được tài trợ" hiện dưới câu trả lời',
      'Người dùng bấm thẻ, trang đích mở ra'],
    inputs: ['Gợi ý ngữ cảnh', 'Tiêu đề, mô tả, ảnh vuông', 'Trang đích', 'Ngân sách ngày'],
    outputs: 'Lượt hiển thị và lượt nhấp; không thấy nội dung cuộc trò chuyện',
    setup: {
      objective: 'Clicks',
      pick: [['Views · CPM'], ['Clicks · CPC', 'on'], ['Conversions · oCPC / oCPM']],
      hints: ['Người dùng tìm quà tân gia giá vừa phải', 'Hỏi cách làm phòng ngủ thơm dịu, dễ ngủ', 'So sánh nến thơm và tinh dầu cho căn hộ nhỏ'],
      audience: 'Việt Nam · iOS, Android, web',
      budget: '300.000₫ / ngày (mẫu)'
    },
    specs: [HEAD50, DESC100, IMG, FAVICON, LANDING, HINTS,
      ['Nhãn', '"Được tài trợ"', 'ChatGPT tự gắn; mẫu quảng cáo không được giả giao diện ChatGPT.']],
    assets: [
      ['Chữ', 'Tiêu đề dưới 50 ký tự', 'Nói đúng thứ người dùng đang tìm.'],
      ['Chữ', 'Mô tả dưới 100 ký tự', 'Một lợi ích và một thông tin giúp quyết định.'],
      ['Ảnh', 'Ảnh vuông 1:1', 'Sản phẩm rõ, ít chữ trên ảnh.'],
      ['Trang', 'Trang đích', 'Mở đúng món trong quảng cáo, không mở trang chủ.']
    ],
    measure: [
      ['Bấm thẻ', 'land', 'tap', 'Clicks', 'Trang đích mở ra; Ads Manager cộng một lượt nhấp.'],
      ['Xem sản phẩm', 'pdp', 'eye', 'page_viewed', 'Pixel ghi một lượt xem trang nếu website đã gắn.'],
      ['Gửi form', 'lead', 'form', 'lead_created', 'Khách để lại số; Pixel ghi một lead.'],
      ['Tư vấn xong', 'crm', 'check', 'Ghi trong CRM', 'Nhân viên gọi lại và ghi khách phù hợp vào CRM.']
    ],
    track: 'Ads Manager đếm lượt hiển thị, lượt nhấp, chi tiêu, CTR, CPC và CPM trung bình. Việc khách làm trên website cần Pixel hoặc Conversions API; khách phù hợp phải ghi trong CRM.',
    bid: 'Mục tiêu Views trả theo 1.000 lượt hiển thị, Clicks trả theo lượt nhấp hợp lệ. Ngân sách đặt theo ngày ở cấp chiến dịch.',
    caution: 'Gợi ý ngữ cảnh không phải lệnh khớp chính xác. Quảng cáo có thể không hiện ở cuộc trò chuyện bạn nghĩ tới.',
    paths: [
      ['Một nhu cầu, một nhóm quảng cáo', 'Tách nhóm theo tình huống người dùng hỏi: quà tặng, phòng ngủ, căn hộ nhỏ.'],
      ['Trang đích trả lời tiếp câu hỏi', 'Người vừa hỏi "quà dưới 500 nghìn" cần thấy ngay các món dưới 500 nghìn.'],
      ['Đọc CTR sau 15 phút, chi tiêu sau nửa ngày', 'Lượt hiển thị và CTR cập nhật khoảng 15 phút một lần; chi tiêu có thể trễ 7–8 giờ.']
    ],
    diagnosis: [
      ['Hiển thị ít', 'Gợi ý ngữ cảnh có quá hẹp không? Ngành có nằm trong nhóm bị hạn chế không? Ngân sách có dưới mức tối thiểu không?'],
      ['Nhiều lượt nhấp, ít chuyển đổi', 'Trang đích có trả lời đúng câu người dùng vừa hỏi không? Pixel có ghi được sự kiện không?'],
      ['Quảng cáo bị từ chối', 'Đọc lý do. Hay gặp: ngành không được phép, trang đích sai chính sách, mẫu quảng cáo bắt chước giao diện ChatGPT.']
    ],
    diag: {
      'Hiển thị ít': [['Gợi ý ngữ cảnh', '3', 'fix'], ['Lượt hiển thị / ngày', '120', 'consider'], ['Ngân sách', 'Đủ mức tối thiểu', 'good']],
      'Nhiều lượt nhấp, ít chuyển đổi': [['Lượt nhấp', '640', 'good'], ['CTR', '1,1%', 'good'], ['lead_created', '2', 'fix']],
      'Quảng cáo bị từ chối': [['Mẫu gửi duyệt', '4', 'good'], ['Bị từ chối', '3', 'fix'], ['Lý do', 'Giống giao diện ChatGPT', 'consider']]
    },
    checks: ['Ngành có được phép chạy không', 'Tài khoản Ads Manager đã xác minh', 'Tiêu đề dưới 50 ký tự', 'Mô tả dưới 100 ký tự',
      'Ảnh vuông từ 640 × 640', 'Favicon 256 × 256', 'Gợi ý ngữ cảnh theo tình huống', 'Trang đích đúng quảng cáo']
  },

  pair: {
    formats: [
      ['pair-same', 'Hai thẻ cùng nhà quảng cáo', 'Dưới cùng một câu trả lời, trên điện thoại.',
        'Hai mẫu của Nhà Thơm xếp dọc: một cho quà tặng, một cho phòng ngủ.'],
      ['pair-two', 'Hai nhà quảng cáo khác nhau', 'Dưới cùng một câu trả lời.',
        'Mỗi thẻ có nhãn, tên và favicon riêng. Người dùng so hai lựa chọn.'],
      ['pair-web', 'Trên máy tính', 'ChatGPT trên trình duyệt.',
        'Hai thẻ xếp dọc dưới câu trả lời, tách bằng đường kẻ và nhãn tài trợ.']
    ],
    billing: [['CPM', 'Views: trả theo 1.000 lượt hiển thị.'], ['CPC', 'Clicks: trả theo lượt nhấp hợp lệ.']],
    how: ['Bạn tạo nhiều mẫu trong cùng nhóm quảng cáo',
      'ChatGPT trả lời câu hỏi độc lập',
      'Hệ thống chọn một hoặc nhiều quảng cáo hợp ngữ cảnh',
      'Các thẻ hiện dưới câu trả lời, mỗi thẻ gắn nhãn tài trợ',
      'Người dùng chọn thẻ hợp nhất và bấm'],
    inputs: ['Nhiều mẫu quảng cáo', 'Gợi ý ngữ cảnh', 'Trang đích cho từng mẫu', 'Ngân sách ngày'],
    outputs: 'Lượt hiển thị, lượt nhấp theo từng mẫu; bạn không chọn được vị trí thẻ',
    setup: {
      objective: 'Views',
      pick: [['Views · CPM', 'on'], ['Clicks · CPC'], ['Conversions · oCPC / oCPM']],
      hints: ['Chọn quà tặng đồng nghiệp cuối năm', 'Quà tân gia cho người thích mùi gỗ', 'Gợi ý quà sinh nhật cho mẹ dưới 500 nghìn'],
      audience: 'Việt Nam · mọi nền tảng',
      budget: '300.000₫ / ngày (mẫu)'
    },
    specs: [HEAD50, DESC100, IMG, FAVICON, LANDING, HINTS,
      ['Số thẻ', 'Một hoặc nhiều', 'Theo Help Center, dưới câu trả lời có thể có một hoặc nhiều quảng cáo.']],
    assets: [
      ['Chữ', 'Mỗi mẫu một hướng', 'Quà tặng, phòng ngủ, căn hộ nhỏ.'],
      ['Ảnh', 'Ảnh vuông khác nhau', 'Hai thẻ cạnh nhau cần phân biệt được.'],
      ['Trang', 'Trang đích riêng', 'Mỗi mẫu mở đúng trang của nó.'],
      ['Chữ', 'Gợi ý ngữ cảnh', 'Viết theo tình huống, không theo từ khóa.']
    ],
    measure: [
      ['Thẻ 1', 'land', 'tap', 'Clicks', 'Trang quà tặng mở ra.'],
      ['Thẻ 2', 'pdp', 'eye', 'Clicks', 'Trang nến phòng ngủ mở ra.'],
      ['Tư vấn xong', 'crm', 'check', 'Ghi trong CRM', 'Khách gọi lại, nhân viên ghi vào CRM.']
    ],
    track: 'Ads Manager tách số liệu theo từng quảng cáo. So lượt nhấp của từng mẫu rồi đối chiếu với khách được tư vấn trong CRM.',
    bid: 'Cùng cách tính phí với thẻ đơn: Views theo CPM, Clicks theo CPC.',
    caution: 'Bạn không chọn được thẻ của mình hiện ở vị trí nào hay hiện cạnh ai. Đừng viết quảng cáo so sánh với thẻ bên cạnh.',
    paths: [
      ['Hai mẫu, hai hướng trả lời', 'Viết mẫu thứ hai cho một hướng khác của cùng câu hỏi, không lặp lại mẫu đầu.'],
      ['So theo lượt nhấp rồi theo CRM', 'Mẫu nhiều lượt nhấp chưa chắc cho nhiều khách phù hợp hơn.'],
      ['Giữ thương hiệu dễ nhận', 'Favicon và tên giống nhau ở mọi mẫu để người dùng nhận ra.']
    ],
    diagnosis: [
      ['Một mẫu gần như không hiển thị', 'Mẫu có khác nhu cầu của nhóm quảng cáo không? Thử tách sang nhóm có gợi ý ngữ cảnh riêng.'],
      ['Nhiều lượt nhấp, ít chuyển đổi', 'Hai mẫu có mở cùng một trang chủ không? Mỗi mẫu cần trang đích riêng.']
    ],
    diag: {
      'Một mẫu gần như không hiển thị': [['Mẫu A · hiển thị', '4.200', 'good'], ['Mẫu B · hiển thị', '90', 'fix'], ['Nhóm quảng cáo', 'Chung', 'consider']],
      'Nhiều lượt nhấp, ít chuyển đổi': [['Lượt nhấp', '510', 'good'], ['Trang đích', 'Trang chủ', 'consider'], ['lead_created', '3', 'fix']]
    },
    checks: ['Ngành có được phép chạy không', 'Mỗi mẫu một hướng nhu cầu', 'Tiêu đề dưới 50 ký tự', 'Mô tả dưới 100 ký tự',
      'Ảnh vuông khác nhau', 'Trang đích riêng cho từng mẫu', 'Gợi ý ngữ cảnh theo tình huống']
  },

  product: {
    formats: [
      ['prod-phone', 'Thẻ sản phẩm trên điện thoại', 'Dưới câu trả lời khi người dùng hỏi mua.',
        'Ảnh, tên, giá, giá khuyến mãi, sao đánh giá và thương hiệu, lấy từ danh mục sản phẩm.'],
      ['prod-web', 'Trên máy tính', 'ChatGPT trên trình duyệt.',
        'Cùng thông tin sản phẩm, khung rộng hơn.'],
      ['prod-land', 'Trang sản phẩm sau khi bấm', 'Website của bạn.',
        'Đúng sản phẩm, đúng giá như trên thẻ.']
    ],
    billing: [['CPC', 'Clicks: trả theo lượt nhấp hợp lệ.'], ['oCPC', 'Conversions: tối ưu theo sự kiện, trả theo lượt nhấp.']],
    how: ['Bạn tải danh mục sản phẩm lên (CSV, URL hoặc SFTP)',
      'Tạo chiến dịch từ danh mục',
      'Người dùng hỏi mua, ChatGPT trả lời độc lập',
      'Thẻ sản phẩm hợp ngữ cảnh hiện dưới câu trả lời',
      'Người dùng bấm sang trang sản phẩm'],
    inputs: ['Danh mục sản phẩm', 'Ảnh sản phẩm', 'Giá và giá khuyến mãi', 'Trang sản phẩm'],
    outputs: 'Lượt nhấp vào từng sản phẩm; chiến dịch từ danh mục chỉ nhắm được theo quốc gia',
    setup: {
      objective: 'Clicks',
      pick: [['Views · CPM'], ['Clicks · CPC', 'on'], ['Conversions · oCPC / oCPM']],
      hints: ['Tìm nến thơm làm quà dưới 500 nghìn', 'Mua tinh dầu cho phòng ngủ', 'So sánh máy khuếch tán que gỗ'],
      audience: 'Việt Nam (cấp quốc gia)',
      budget: '400.000₫ / ngày (mẫu)'
    },
    specs: [FEED, FEED_EXPIRE,
      ['Thông tin hiển thị', 'Ảnh · tên · giá · giá KM · sao · thương hiệu', 'Những gì thẻ sản phẩm có thể lấy từ danh mục.'],
      ['Nhắm địa lý', 'Chỉ cấp quốc gia', 'Chiến dịch mới từ danh mục chỉ nhắm và loại trừ theo quốc gia.'],
      LANDING, HINTS],
    assets: [
      ['Danh mục', 'Tệp danh mục sản phẩm', 'Chín trường bắt buộc, giá đúng với website.'],
      ['Ảnh', 'Ảnh sản phẩm', 'Nền sạch, thấy rõ món hàng.'],
      ['Trang', 'Trang sản phẩm', 'Cùng giá, cùng tên như trong danh mục.'],
      ['Dữ liệu', 'Lịch tải lại mỗi ngày', 'Sản phẩm hết hạn sau 2 tuần nếu không cập nhật.']
    ],
    measure: [
      ['Bấm sản phẩm', 'pdp', 'tag', 'Clicks', 'Trang sản phẩm mở ra với đúng giá trên thẻ.'],
      ['Thêm vào giỏ', 'cart', 'cart', 'items_added', 'Pixel ghi khi khách thêm vào giỏ.'],
      ['Đặt hàng', 'order', 'check', 'order_created', 'Trang cảm ơn mở ra; Pixel ghi một đơn.'],
      ['Đơn đã giao', 'crm', 'check', 'Ghi trong CRM', 'Đối chiếu trong CRM hoặc hệ thống bán hàng.']
    ],
    track: 'Ads Manager đếm lượt nhấp theo sản phẩm. Đơn đặt cần Pixel hoặc Conversions API; đơn đã giao đối chiếu trong CRM.',
    bid: 'Chạy với Clicks (CPC) hoặc Conversions. Chiến dịch từ danh mục chỉ nhắm theo quốc gia.',
    caution: 'Giá trên thẻ lấy từ danh mục. Danh mục cũ thì thẻ hiện giá sai và sản phẩm hết hạn sau 2 tuần.',
    paths: [
      ['Danh mục trước, quảng cáo sau', 'Sửa tên, ảnh và giá trong danh mục trước khi tạo chiến dịch.'],
      ['Tải lại mỗi ngày', 'Dùng URL hoặc SFTP tự động để giá và tồn kho luôn khớp website.'],
      ['Đo tới đơn đã giao', 'Gắn order_created rồi đối chiếu đơn giao trong CRM.']
    ],
    diagnosis: [
      ['Sản phẩm không hiện', 'Danh mục có quá 2 tuần chưa cập nhật không? Có thiếu trường bắt buộc không?'],
      ['Nhiều lượt nhấp, ít đơn', 'Giá trên thẻ có khớp trang sản phẩm không? Trang cảm ơn có gắn Pixel không?']
    ],
    diag: {
      'Sản phẩm không hiện': [['Sản phẩm trong danh mục', '120', 'good'], ['Lần tải gần nhất', '16 ngày trước', 'fix'], ['Thiếu trường', '8 dòng', 'consider']],
      'Nhiều lượt nhấp, ít đơn': [['Lượt nhấp', '880', 'good'], ['Giá lệch website', '12 sản phẩm', 'consider'], ['order_created', '4', 'fix']]
    },
    checks: ['Ngành có được phép chạy không', 'Danh mục đủ chín trường bắt buộc', 'Giá khớp website', 'Ảnh sản phẩm rõ',
      'Tải lại danh mục mỗi ngày', 'Pixel ghi order_created', 'Đối chiếu đơn giao trong CRM']
  },

  carousel: {
    formats: [
      ['car-phone', 'Carousel trên điện thoại', 'Dưới câu trả lời, vuốt ngang.',
        'Nhiều thẻ sản phẩm cạnh nhau; mỗi thẻ có ảnh, tên, giá, sao và thương hiệu.'],
      ['car-web', 'Carousel trên máy tính', 'ChatGPT trên trình duyệt.',
        'Hàng thẻ sản phẩm có nút mũi tên để xem tiếp.'],
      ['car-land', 'Trang sản phẩm sau khi bấm', 'Website của bạn.',
        'Mỗi thẻ mở đúng trang sản phẩm của nó.']
    ],
    billing: [['CPC', 'Clicks: trả theo lượt nhấp hợp lệ.'], ['oCPC', 'Conversions: tối ưu theo sự kiện, trả theo lượt nhấp.']],
    how: ['Bạn tải danh mục có nhiều sản phẩm cùng nhóm',
      'Tạo chiến dịch từ danh mục',
      'Người dùng hỏi một câu có nhiều lựa chọn',
      'Nhiều sản phẩm hợp ngữ cảnh hiện thành một hàng',
      'Người dùng vuốt, bấm sản phẩm hợp nhất'],
    inputs: ['Danh mục nhiều sản phẩm', 'Ảnh sản phẩm đồng bộ', 'Giá và giá khuyến mãi', 'Trang sản phẩm'],
    outputs: 'Lượt nhấp theo từng sản phẩm; thứ tự thẻ do hệ thống chọn',
    setup: {
      objective: 'Conversions',
      pick: [['Views · CPM'], ['Clicks · CPC'], ['Conversions · oCPC / oCPM', 'on']],
      hints: ['Gợi ý bộ quà chăm sóc bản thân', 'Chọn mùi hương cho từng phòng', 'Quà tặng khách hàng số lượng lớn'],
      audience: 'Việt Nam (cấp quốc gia)',
      budget: '500.000₫ / ngày (mẫu)'
    },
    specs: [FEED, FEED_EXPIRE,
      ['Thông tin hiển thị', 'Ảnh · tên · giá · giá KM · sao · thương hiệu', 'Mỗi thẻ trong hàng lấy từ một dòng của danh mục.'],
      ['Nhắm địa lý', 'Chỉ cấp quốc gia', 'Chiến dịch mới từ danh mục chỉ nhắm và loại trừ theo quốc gia.'],
      LANDING],
    assets: [
      ['Danh mục', 'Nhiều sản phẩm cùng nhóm', 'Đủ lựa chọn để hàng thẻ có ý nghĩa.'],
      ['Ảnh', 'Ảnh đồng bộ', 'Cùng nền, cùng góc chụp để dễ so.'],
      ['Trang', 'Trang từng sản phẩm', 'Mỗi thẻ mở đúng trang của nó.'],
      ['Dữ liệu', 'Lịch tải lại mỗi ngày', 'Giá và tồn kho luôn khớp.']
    ],
    measure: [
      ['Bấm thẻ 1', 'pdp', 'tag', 'Clicks', 'Trang sản phẩm thứ nhất mở ra.'],
      ['Thêm vào giỏ', 'cart', 'cart', 'items_added', 'Pixel ghi khi khách thêm vào giỏ.'],
      ['Thanh toán', 'checkout', 'pay', 'checkout_started', 'Khách vào bước thanh toán.'],
      ['Đơn đã giao', 'crm', 'check', 'Ghi trong CRM', 'Đối chiếu trong CRM.']
    ],
    track: 'Ads Manager đếm lượt nhấp theo sản phẩm. Giỏ hàng, thanh toán và đơn cần Pixel hoặc Conversions API.',
    bid: 'Chạy với Clicks hoặc Conversions. Với Conversions, chọn một sự kiện chuẩn như order_created.',
    caution: 'Bạn không chọn được sản phẩm nào đứng đầu hàng. Ảnh lệch nhau làm hàng thẻ khó so sánh.',
    paths: [
      ['Nhóm sản phẩm theo nhu cầu', 'Gom sản phẩm cùng nhu cầu để hàng thẻ trả lời trọn một câu hỏi.'],
      ['Ảnh cùng một chuẩn', 'Cùng nền, cùng tỷ lệ để người dùng so giá và kiểu dáng.'],
      ['Tối ưu theo đơn khi đủ dữ liệu', 'Chuyển sang Conversions khi order_created đã ghi đều.']
    ],
    diagnosis: [
      ['Chỉ một sản phẩm được bấm', 'Giá các sản phẩm khác có cao bất thường không? Ảnh có rõ không?'],
      ['Chưa đo được chuyển đổi', 'Pixel hoặc Conversions API đã gửi items_added và order_created chưa?']
    ],
    diag: {
      'Chỉ một sản phẩm được bấm': [['Sản phẩm A', '410 nhấp', 'good'], ['Sản phẩm B–E', '18 nhấp', 'fix'], ['Ảnh', 'Không đồng bộ', 'consider']],
      'Chưa đo được chuyển đổi': [['Lượt nhấp', '760', 'good'], ['items_added', '0', 'fix'], ['Pixel', 'Chưa gắn', 'consider']]
    },
    checks: ['Ngành có được phép chạy không', 'Danh mục có nhiều sản phẩm cùng nhóm', 'Ảnh đồng bộ', 'Giá khớp website',
      'Tải lại danh mục mỗi ngày', 'Pixel ghi giỏ hàng và đơn', 'Đối chiếu đơn giao trong CRM']
  },

  conv: {
    formats: [
      ['conv-card', 'Thẻ dẫn về website', 'Dưới câu trả lời.',
        'Thẻ giống thẻ thường; khác ở cách hệ thống chọn người thấy.'],
      ['conv-site', 'Website có Pixel', 'Trang đích của bạn.',
        'Pixel ghi page_viewed khi trang mở và lead_created khi khách gửi form.'],
      ['conv-thanks', 'Chuyển đổi hoàn tất', 'Trang cảm ơn.',
        'Sự kiện chuẩn đã chọn cho chiến dịch được gửi về Ads Manager.'],
      ['conv-report', 'Báo cáo Ads Manager', 'Trong Ads Manager.',
        'Chuyển đổi được quy về quảng cáo; có thể mất 24–48 giờ mới hiện.']
    ],
    billing: [['oCPC', 'Tối ưu theo chuyển đổi, trả theo lượt nhấp hợp lệ.'], ['oCPM', 'Tối ưu theo chuyển đổi, trả theo 1.000 lượt hiển thị. Đang thử nghiệm (beta).'],
      ['Bid Cap', 'Mức tối đa bạn muốn trả cho một chuyển đổi. Không phải giá bị trừ.']],
    how: ['Bạn gắn Pixel hoặc Conversions API',
      'Chọn một sự kiện chuẩn cho chiến dịch',
      'ChatGPT chọn hiển thị cho người có khả năng làm sự kiện đó',
      'Người dùng bấm thẻ và hoàn tất trên website',
      'Sự kiện gửi về Ads Manager, hệ thống học tiếp'],
    inputs: ['Pixel hoặc Conversions API', 'Một sự kiện chuẩn', 'Bid Cap (tùy chọn)', 'Trang đích có form hoặc giỏ hàng'],
    outputs: 'Chuyển đổi được quy về quảng cáo; bạn vẫn trả theo nhấp hoặc hiển thị, không trả theo chuyển đổi',
    setup: {
      objective: 'Conversions',
      pick: [['Views · CPM'], ['Clicks · CPC'], ['Conversions · oCPC / oCPM', 'on']],
      hints: ['Đặt quà tặng doanh nghiệp số lượng lớn', 'Tìm nơi in logo lên hộp quà', 'Báo giá quà tặng khách hàng cuối năm'],
      audience: 'Việt Nam · iOS, Android, web',
      budget: '500.000₫ / ngày · Bid Cap 150.000₫ (mẫu)'
    },
    specs: [PIXEL,
      ['Sự kiện', 'Không đổi sau khi tạo', 'Sự kiện tối ưu chọn khi tạo chiến dịch, không sửa được về sau.'],
      ['Cách tính phí', 'oCPC · oCPM (beta)', 'Trả theo lượt nhấp hoặc 1.000 lượt hiển thị.'],
      ['Bid Cap', 'Mức tối đa cho một chuyển đổi', 'Dùng để cạnh tranh trong phiên đấu giá; không phải giá bị trừ.'],
      ['Ứng dụng', 'app_installed · app_opened', 'Chỉ gửi được qua Conversions API.'],
      HEAD50, DESC100, IMG],
    assets: [
      ['Sự kiện', 'Pixel trên website', 'Mã JavaScript đặt trên mọi trang.'],
      ['Sự kiện', 'Conversions API', 'Máy chủ gửi sự kiện, bền hơn khi trình duyệt chặn.'],
      ['Trang', 'Trang cảm ơn', 'Nơi ghi sự kiện hoàn tất.'],
      ['Chữ', 'Mẫu quảng cáo', 'Tiêu đề, mô tả, ảnh vuông như thẻ thường.']
    ],
    measure: [
      ['Bấm thẻ', 'land', 'tap', 'Clicks', 'Trang đích mở ra, Pixel ghi page_viewed.'],
      ['Gửi form', 'lead', 'form', 'lead_created', 'Khách gửi form; đây là sự kiện tối ưu của chiến dịch mẫu.'],
      ['Đăng ký', 'reg', 'person', 'registration_completed', 'Khách tạo tài khoản trên website.'],
      ['Lead phù hợp', 'crm', 'check', 'Ghi trong CRM', 'Nhân viên gọi lại và xác nhận đúng nhu cầu.']
    ],
    track: 'Chiến dịch Conversions cần Pixel và/hoặc Conversions API. Mỗi chiến dịch tối ưu cho một sự kiện chuẩn; sự kiện tùy chỉnh chưa dùng được. Chuyển đổi có thể mất 24–48 giờ mới hiện trong báo cáo.',
    bid: 'Chọn trả theo lượt nhấp (oCPC) hoặc theo lượt hiển thị (oCPM, đang beta). Bid Cap là mức tối đa cho một chuyển đổi, không phải giá bị trừ.',
    caution: 'Tối ưu chuyển đổi không có nghĩa là trả tiền theo chuyển đổi. Lead do Pixel ghi chưa chắc là khách phù hợp.',
    paths: [
      ['Đo trước, tối ưu sau', 'Chạy Clicks và gắn Pixel trước; khi sự kiện đã ghi đều mới chuyển sang Conversions.'],
      ['Pixel cộng Conversions API', 'Gửi cùng sự kiện từ trình duyệt và máy chủ để ít mất dữ liệu.'],
      ['Chọn sự kiện gần doanh thu', 'lead_created hoặc order_created, không chọn page_viewed.']
    ],
    diagnosis: [
      ['Chưa đo được chuyển đổi', 'Pixel hoặc Conversions API đã gắn và gửi đúng tên sự kiện chuẩn chưa?'],
      ['Nhiều lead, ít khách phù hợp', 'Form có câu hỏi phân loại không? Nhân viên có ghi kết quả gọi vào CRM không?']
    ],
    diag: {
      'Chưa đo được chuyển đổi': [['Lượt nhấp', '1.020', 'good'], ['lead_created', '0', 'fix'], ['Pixel', 'Chưa gắn', 'consider']],
      'Nhiều lead, ít khách phù hợp': [['lead_created', '96', 'good'], ['Gọi được', '58', 'consider'], ['Lead phù hợp', '11', 'fix']]
    },
    checks: ['Ngành có được phép chạy không', 'Pixel đã gắn mọi trang', 'Conversions API từ máy chủ', 'Chọn một sự kiện chuẩn',
      'Sự kiện đã ghi đều trước khi tối ưu', 'Bid Cap đặt theo dữ liệu thật', 'CRM ghi lead phù hợp']
  },

  agent: {
    formats: [
      ['agent-card', 'Thẻ có nút Trò chuyện', 'Dưới câu trả lời.',
        'Thẻ quảng cáo có thêm nút mở cuộc trò chuyện với doanh nghiệp.'],
      ['agent-open', 'Khung trò chuyện thương hiệu', 'Mở ngay trong ChatGPT, tách khỏi cuộc trò chuyện gốc.',
        'Tên doanh nghiệp, nhãn tài trợ và câu chào. Người dùng hỏi tiếp về sản phẩm.'],
      ['agent-suggest', 'Gợi ý sản phẩm', 'Trong cuộc trò chuyện với doanh nghiệp.',
        'Trợ lý của doanh nghiệp gợi ý sản phẩm và đưa liên kết sang website.'],
      ['agent-site', 'Sang website', 'Khi người dùng sẵn sàng.',
        'Người dùng bấm liên kết để mua hoặc đặt trên website của doanh nghiệp.']
    ],
    billing: [['Chưa công bố', 'OpenAI chưa công bố cách tính phí riêng cho Sponsored Agents.']],
    how: ['Doanh nghiệp được OpenAI mời vào bản thử nghiệm',
      'Người dùng thấy quảng cáo hợp ngữ cảnh',
      'Người dùng chọn mở cuộc trò chuyện có nhãn rõ ràng',
      'Trợ lý của doanh nghiệp trả lời câu hỏi về sản phẩm',
      'Người dùng theo liên kết sang website khi sẵn sàng'],
    inputs: ['Thông tin sản phẩm, dịch vụ', 'Câu trả lời cho câu hỏi hay gặp', 'Trang đích', 'Suất tham gia thử nghiệm'],
    outputs: 'Cuộc trò chuyện với doanh nghiệp; doanh nghiệp chỉ thấy tin người dùng gửi trực tiếp cho mình',
    setup: {
      objective: 'Thử nghiệm',
      pick: [['Views · CPM'], ['Clicks · CPC'], ['Sponsored Agents · theo lời mời', 'on']],
      hints: ['Hỏi cách chọn mùi hương cho quà tặng', 'Cần tư vấn quà tặng số lượng lớn', 'So sánh các bộ quà chăm sóc bản thân'],
      audience: 'Mỹ · theo lời mời',
      budget: 'Chưa công bố'
    },
    specs: [
      ['Tình trạng', 'Alpha · theo lời mời', 'OpenAI đang thử với một số nhà quảng cáo tại Mỹ.'],
      ['Việt Nam', 'Chưa đăng ký được', 'Chưa thấy lịch mở cho Việt Nam trong tài liệu OpenAI.'],
      ['Riêng tư', 'Chỉ tin nhắn gửi trực tiếp', 'Doanh nghiệp chỉ thấy tin người dùng gửi trong cuộc trò chuyện với mình.'],
      ['Nhãn', 'Được tài trợ', 'Cuộc trò chuyện tách khỏi câu trả lời độc lập và cuộc trò chuyện gốc.'],
      ['Cách tính phí', 'Chưa công bố', 'Không ghi mức phí khi OpenAI chưa công bố.']
    ],
    assets: [
      ['Chữ', 'Thông tin sản phẩm', 'Giá, chất liệu, cách dùng, chính sách giao.'],
      ['Chữ', 'Câu hỏi hay gặp', 'Những câu nhân viên vẫn trả lời mỗi ngày.'],
      ['Trang', 'Trang đích', 'Nơi người dùng sang khi muốn mua.'],
      ['Người', 'Người theo dõi', 'Đọc lại cuộc trò chuyện để sửa thông tin.']
    ],
    measure: [
      ['Trò chuyện', 'agentchat', 'chat', 'Cuộc trò chuyện', 'Khung trò chuyện với doanh nghiệp mở ra.'],
      ['Xem gợi ý', 'agentsuggest', 'tag', 'Gợi ý sản phẩm', 'Trợ lý của doanh nghiệp gợi ý món phù hợp.'],
      ['Sang website', 'land', 'page', 'Clicks', 'Người dùng theo liên kết sang website.']
    ],
    track: 'OpenAI chưa công bố báo cáo riêng cho Sponsored Agents. Phần trên website vẫn đo bằng Pixel hoặc Conversions API.',
    bid: 'Chưa có cách tính phí công khai. POWAI không ghi mức phí khi OpenAI chưa công bố.',
    caution: 'Đang thử nghiệm tại Mỹ. Không lên kế hoạch ngân sách cho kiểu này ở Việt Nam cho tới khi OpenAI mở.',
    paths: [
      ['Chuẩn bị nội dung trước', 'Gom thông tin sản phẩm và câu hỏi hay gặp; dùng được cho website và mọi kênh.'],
      ['Chạy thẻ thường trong lúc chờ', 'Thẻ quảng cáo dẫn về form hoặc trang tư vấn cho người cần hỏi thêm.'],
      ['Theo dõi thông báo của OpenAI', 'POWAI cập nhật trang này khi OpenAI mở cho Việt Nam.']
    ],
    diagnosis: [
      ['Muốn dùng nhưng chưa được mời', 'Hiện chỉ một số nhà quảng cáo ở Mỹ được thử. Dùng thẻ dẫn về form tư vấn thay thế.']
    ],
    diag: {
      'Muốn dùng nhưng chưa được mời': [['Tình trạng', 'Alpha', 'consider'], ['Thị trường', 'Mỹ', 'consider'], ['Việt Nam', 'Chưa mở', 'fix']]
    },
    checks: ['Ngành có được phép chạy không', 'Thông tin sản phẩm đầy đủ', 'Câu trả lời cho câu hỏi hay gặp', 'Trang đích sẵn sàng',
      'Đã hiểu đây là bản thử nghiệm', 'Kế hoạch thay thế bằng thẻ thường']
  }
};

/* ================================================================== *
 * Page 02 — choosing
 * ================================================================== */
// The three campaign objectives in Ads Manager.
export const OBJECTIVES = [
  {id: 'views', title: 'Views — nhiều người thấy', icon: 'eye',
    optimize: 'Số lượt hiển thị.',
    pricing: 'CPM: mỗi 1.000 lượt hiển thị.',
    needs: 'Mẫu quảng cáo, gợi ý ngữ cảnh, ngân sách ngày.'},
  {id: 'clicks', title: 'Clicks — đưa người vào website', icon: 'tap',
    optimize: 'Lượt nhấp sang website hoặc trang sản phẩm.',
    pricing: 'CPC: mỗi lượt nhấp hợp lệ.',
    needs: 'Trang đích đúng quảng cáo, UTM để đọc trong GA4.'},
  {id: 'conversions', title: 'Conversions — hành động trên website', icon: 'convert',
    optimize: 'Một sự kiện chuẩn chọn khi tạo chiến dịch.',
    pricing: 'oCPC theo lượt nhấp, hoặc oCPM theo 1.000 lượt hiển thị (beta). Không trả theo chuyển đổi.',
    needs: 'Pixel và/hoặc Conversions API; sự kiện chuẩn, không dùng sự kiện tùy chỉnh.'}
];

// Five readiness stages → the ad a person at that stage should see.
export const READINESS = [
  {id: 'cold', name: 'Chưa biết thương hiệu', icon: 'eye', state: 'Đang hỏi chung chung, chưa nghĩ tới shop nào.',
    aim: 'Để họ thấy tên và thứ shop bán.', run: 'Thẻ đơn hoặc hai thẻ · Views (CPM)', content: 'Một lợi ích rõ, ảnh sản phẩm.', cta: 'Xem thêm'},
  {id: 'research', name: 'Đang tìm hiểu, so sánh', icon: 'search', state: 'Hỏi cách chọn, so sánh các lựa chọn.',
    aim: 'Cho thêm thông tin giúp quyết định.', run: 'Thẻ có dòng tiêu đề ngữ cảnh · Clicks', content: 'Trang hướng dẫn chọn, bảng so sánh.', cta: 'Tìm hiểu'},
  {id: 'buy', name: 'Sẵn sàng mua', icon: 'cart', state: 'Hỏi thẳng món cần mua, tầm giá.',
    aim: 'Đưa tới đúng sản phẩm, đúng giá.', run: 'Thẻ sản phẩm hoặc carousel · Clicks, Conversions', content: 'Danh mục sạch, giá khớp website.', cta: 'Mua ngay'},
  {id: 'advice', name: 'Cần được tư vấn', icon: 'chat', state: 'Có câu hỏi riêng, cần người trả lời.',
    aim: 'Cho họ nơi hỏi tiếp.', run: 'Thẻ dẫn về form · Trò chuyện với thương hiệu (thử nghiệm, chưa có ở Việt Nam)', content: 'Form ngắn, người gọi lại trong ngày.', cta: 'Nhận tư vấn'},
  {id: 'customer', name: 'Đã là khách', icon: 'repeat', state: 'Đã mua hoặc đã để lại số.',
    aim: 'Không trả tiền lại cho người đã mua, hoặc chào món đi kèm.', run: 'Đối tượng tùy chỉnh · loại trừ hoặc điều chỉnh giá thầu', content: 'Món đi kèm, ưu đãi khách cũ.', cta: 'Mua thêm'}
];

// Context & audience, three families.
export const AUDIENCES = [
  {id: 'hints', family: 'context', title: 'Gợi ý ngữ cảnh', icon: 'thought',
    text: 'Mô tả tình huống mà quảng cáo có ích, tối đa 2.000 gợi ý mỗi nhóm quảng cáo.',
    use: 'Luôn cần. Viết theo tình huống người dùng hỏi, không theo từ khóa.'},
  {id: 'hintgood', family: 'context', title: 'Gợi ý tốt và chưa tốt', icon: 'check',
    text: 'Gợi ý tốt tả một tình huống cụ thể; gợi ý chưa tốt chỉ là một từ khóa trống.',
    use: 'Khi viết lại gợi ý cho nhóm hiển thị ít.'},
  {id: 'country', family: 'limit', title: 'Quốc gia & khu vực', icon: 'pin',
    text: 'Nhắm theo quốc gia; tài liệu ghi có tỉnh/thành, thành phố "khi có". Chiến dịch từ danh mục chỉ theo quốc gia.',
    use: 'Luôn đặt Việt Nam. Vùng nhỏ hơn: kiểm tra trong Ads Manager.'},
  {id: 'platform', family: 'limit', title: 'Nền tảng', icon: 'mobile',
    text: 'iOS, Android và web; web tách được máy tính, iOS web và Android web.',
    use: 'Khi trang đích chỉ tốt trên một loại màn hình.'},
  {id: 'who', family: 'limit', title: 'Ai thấy quảng cáo', icon: 'person',
    text: 'Người dùng gói Free và Go, từ 18 tuổi. Plus, Pro, Business, Enterprise, Edu không có quảng cáo.',
    use: 'Không chỉnh được; dùng để ước lượng ai có thể thấy.'},
  {id: 'include', family: 'data', title: 'Đối tượng tùy chỉnh', icon: 'users',
    text: 'Danh sách khách của bạn; cần tối thiểu 25.000 người khớp mới dùng được để nhắm.',
    use: 'Khi có danh sách khách lớn đã đồng ý nhận quảng cáo.'},
  {id: 'exclude', family: 'data', title: 'Loại trừ khách cũ', icon: 'minus',
    text: 'Đối tượng loại trừ không cần số người khớp tối thiểu.',
    use: 'Không trả tiền quảng cáo cho người vừa mua.'},
  {id: 'multiplier', family: 'data', title: 'Điều chỉnh giá thầu', icon: 'sliders',
    text: 'Tăng hoặc giảm giá thầu cho một đối tượng tùy chỉnh (cũng cần 25.000 người khớp).',
    use: 'Khi một nhóm khách đáng giá hơn phần còn lại.'}
];

export const FAMILIES = {
  context: ['Ngữ cảnh', '#85e1c1'],
  limit: ['Ràng buộc', '#ffbd80'],
  data: ['Dữ liệu doanh nghiệp', '#c0a2ff']
};

// Industries, three families + contexts with no ads. [id, family, title, icon, text]
export const INDUSTRIES = [
  ['retail', 'ok', 'Hàng tiêu dùng, bán lẻ', 'cart', 'Được chạy khi sản phẩm và trang đích đúng chính sách quảng cáo.'],
  ['local', 'ok', 'Dịch vụ địa phương, du lịch', 'pin', 'Spa, sửa chữa, nhà hàng, khách sạn, tour, vé.'],
  ['digital', 'ok', 'Sản phẩm số, giáo dục', 'code', 'Ứng dụng, phần mềm, dịch vụ trực tuyến, khóa học.'],
  ['finance', 'review', 'Tài chính', 'coin', 'Xét từng trường hợp, chỉ tại Mỹ. Ngoài Mỹ, quảng cáo tài chính nhìn chung bị cấm.'],
  ['health', 'review', 'Y tế, pháp lý', 'shield', 'Xét từng trường hợp với nhà quảng cáo được duyệt; đang mở dần.'],
  ['adult', 'no', 'Người lớn, hẹn hò', 'close', 'Ứng dụng hẹn hò, sản phẩm và dịch vụ tình dục.'],
  ['alcohol', 'no', 'Rượu bia, thuốc lá, chất cấm', 'close', 'Đồ uống trên 0,5% cồn, thuốc lá, nicotine; ma túy, cần sa và chất bị kiểm soát.'],
  ['gambling', 'no', 'Cờ bạc, hàng giả, chính trị', 'close', 'Cá cược, xổ số, casino; hàng giả vi phạm nhãn hiệu; vận động chính trị.'],
  ['sensitive', 'ctx', 'Ngữ cảnh nhạy cảm, dưới 18 tuổi', 'alert', 'Không hiện quảng cáo gần chủ đề sức khỏe cá nhân, sức khỏe tinh thần, chính trị, và cho tài khoản được xác định dưới 18 tuổi.']
];

export const IND_FAMILIES = {
  ok: ['Được chạy', '#85e1c1'],
  review: ['Xét từng trường hợp', '#ffbd80'],
  no: ['Không được chạy', '#ff9bc1'],
  ctx: ['Không hiện quảng cáo', '#e0cd9b']
};

/* ================================================================== *
 * Page 03 — money, bidding, measurement, rollout
 * ================================================================== */
export const COST_BUCKETS = [
  ['ads', 'auction', 'Trả cho OpenAI', 'Tiền quảng cáo trừ vào thẻ theo ngưỡng sau khi quảng cáo đã chạy (trả sau).'],
  ['make', 'creative', 'Mẫu quảng cáo & danh mục', 'Tiêu đề, mô tả, ảnh vuông, gợi ý ngữ cảnh, danh mục sản phẩm, trang đích.'],
  ['fee', 'users', 'Phí dịch vụ POWAI', 'Công dựng, theo dõi, điều chỉnh và báo cáo. Xuất hóa đơn riêng.']
];

// [key, label, icon, text]
export const BILLING = [
  ['pay', 'Cách thanh toán', 'pay',
    'Trả sau: OpenAI trừ vào thẻ tín dụng lưu trong Ads Manager khi chi tiêu chạm ngưỡng. Không tự đổi được ngưỡng.'],
  ['currency', 'Đơn vị tiền tệ', 'coin',
    'Quốc gia, tiền tệ và pháp nhân gắn với tài khoản khi tạo; có thể không tự sửa được về sau. Chọn VND nếu thanh toán bằng tiền Việt.'],
  ['budget', 'Ngân sách chiến dịch', 'calendar',
    'Ngân sách đặt theo ngày ở cấp chiến dịch.'],
  ['minimum', 'Mức tối thiểu', 'wallet',
    `Ngân sách ngày tối thiểu tùy tiền tệ của tài khoản: tài khoản VND từ ${MIN_DAILY_VND.toLocaleString('vi-VN')}₫/ngày; USD từ 25 USD/ngày.`],
  ['invoice', 'Hóa đơn & thuế', 'receipt',
    'Thuế và hóa đơn theo chứng từ OpenAI xuất; POWAI đối chiếu khi thanh toán.']
];

// Ways to pay: [tag, name, text, you set, you pay for, where, caution, example]
export const BIDS = {
  cpm: ['VIEWS', 'CPM · theo 1.000 lượt hiển thị', 'Mục tiêu Views. Trả cho mỗi 1.000 lần quảng cáo hiện ra.',
    'Ngân sách ngày', 'Lượt hiển thị', 'Mục tiêu Views.', 'Hiển thị chưa chắc đã có người đọc kỹ.',
    'Hợp khi cần nhiều người biết tên thương hiệu.'],
  cpc: ['CLICKS', 'CPC · theo lượt nhấp', 'Mục tiêu Clicks. Trả cho mỗi lượt nhấp hợp lệ.',
    'Ngân sách ngày', 'Lượt nhấp hợp lệ', 'Mục tiêu Clicks.', 'Nhấp chưa phải khách hàng.',
    'Hợp khi có trang đích tốt và muốn đo từ lượt nhấp.'],
  ocpc: ['CONVERSIONS', 'oCPC · tối ưu chuyển đổi, trả theo nhấp', 'Mục tiêu Conversions. Hệ thống tối ưu theo một sự kiện chuẩn, bạn trả theo lượt nhấp.',
    'Sự kiện chuẩn, Bid Cap (tùy chọn)', 'Lượt nhấp hợp lệ', 'Cần Pixel hoặc Conversions API.', 'Không trả theo chuyển đổi.',
    'Sự kiện không đổi được sau khi tạo chiến dịch.'],
  ocpm: ['BETA', 'oCPM · tối ưu chuyển đổi, trả theo hiển thị', 'Mục tiêu Conversions, trả theo 1.000 lượt hiển thị. Đang thử nghiệm (beta), đang mở rộng dần.',
    'Sự kiện chuẩn, Bid Cap (tùy chọn)', '1.000 lượt hiển thị', 'Tài khoản đã được mở beta.', 'Có thể chưa có trong tài khoản của bạn.',
    'Chọn khi tạo chiến dịch Conversions nếu tài khoản có.'],
  bidcap: ['BID CAP', 'Bid Cap · mức tối đa cho một chuyển đổi', 'Mức cao nhất bạn muốn trả cho một chuyển đổi; hệ thống dùng để cạnh tranh trong phiên đấu giá.',
    'Mức tối đa mỗi chuyển đổi', 'Vẫn là nhấp hoặc hiển thị', 'Chiến dịch Conversions.', 'Không phải giá bị trừ, không phải CPA cam kết.',
    'Đặt quá thấp thì quảng cáo ít được hiện.']
};
export const BID_ORDER = ['cpm', 'cpc', 'ocpc', 'ocpm', 'bidcap'];

// One sample month.
export const SAMPLE = {impressions: 80000, clicks: 960, conversions: 64, qualified: 22, delivered: 18,
  spend: 9000000, revenue: 21600000};

export const KPIS = {
  impressions: ['Impressions', 'Số lần quảng cáo hiện ra. Cập nhật khoảng 15 phút một lần.', 'Ít: gợi ý ngữ cảnh hẹp, ngành bị hạn chế hoặc ngân sách thấp.'],
  cpm: ['Avg CPM', 'Chi tiêu ÷ nghìn lượt hiển thị.', 'Chi tiêu có thể trễ 7–8 giờ: đừng đọc CPM buổi sáng.'],
  clicks: ['Clicks', 'Lượt nhấp hợp lệ vào quảng cáo.', 'Tăng mà chuyển đổi không tăng: xem lại trang đích.'],
  ctr: ['CTR', 'Lượt nhấp ÷ lượt hiển thị.', 'CTR thấp: tiêu đề hoặc ảnh chưa khớp câu người dùng hỏi.'],
  cpc: ['Avg CPC', 'Chi tiêu ÷ lượt nhấp.', 'CPC thấp chưa chắc tốt nếu khách không ở lại.'],
  conversions: ['Conversions', 'Sự kiện chuẩn được quy về quảng cáo. Có thể mất 24–48 giờ.', 'Bằng 0: kiểm tra Pixel, Conversions API và tên sự kiện.'],
  cpa: ['CPA', 'Chi tiêu ÷ chuyển đổi.', 'Không phải giá bạn bị trừ; bạn vẫn trả theo nhấp hoặc hiển thị.'],
  cvr: ['Tỷ lệ chuyển đổi', 'Chuyển đổi ÷ lượt nhấp.', 'Thấp: trang đích không trả lời tiếp câu hỏi.'],
  qualified: ['Lead phù hợp', 'Khách được nhân viên xác nhận đúng nhu cầu (CRM).', 'Ads Manager không tự biết; cần CRM ghi lại.'],
  cpql: ['CPQL', 'Chi tiêu ÷ lead phù hợp.', 'Con số so được giữa ChatGPT Ads và kênh khác.'],
  delivered: ['Đơn đã giao', 'Đơn giao thành công, đối chiếu trong CRM.', 'Con số gần doanh thu thật nhất.'],
  roas: ['ROAS', 'Doanh thu đơn đã giao ÷ chi tiêu.', 'Chưa trừ giá vốn, phí giao và phí dịch vụ.']
};

// [id, label, value, metric ids]
export const KPI_TIERS = [
  ['show', 'Hiển thị', SAMPLE.impressions, ['impressions', 'cpm']],
  ['click', 'Nhấp', SAMPLE.clicks, ['clicks', 'ctr', 'cpc']],
  ['conv', 'Chuyển đổi', SAMPLE.conversions, ['conversions', 'cpa', 'cvr']],
  ['crm', 'Lead phù hợp · đơn giao', SAMPLE.qualified, ['qualified', 'cpql', 'delivered', 'roas']]
];

// Measurement stations: [icon, name, purpose, when, io]
export const TRACKING = {
  utm: ['link', 'UTM', 'Gắn nguồn vào liên kết để GA4 tách khách đến từ ChatGPT Ads theo từng quảng cáo.',
    'Mọi quảng cáo dẫn ra website.', 'Liên kết → phiên truy cập có nguồn'],
  site: ['page', 'Website + Pixel', 'Measurement Pixel (JavaScript) ghi sự kiện chuẩn trên trình duyệt.',
    'Muốn đo việc khách làm trên website.', 'Hành động trên web → sự kiện'],
  tag: ['image', 'Image tag', 'Gửi một sự kiện khi trang tải mà không chạy JavaScript; mỗi lần tải ảnh là một sự kiện.',
    'Trang không chạy được mã JavaScript.', 'Trang tải → một sự kiện'],
  capi: ['code', 'Conversions API', 'Máy chủ gửi sự kiện; app_installed và app_opened chỉ gửi được đường này.',
    'Muốn bền hơn khi trình duyệt chặn, hoặc đo ứng dụng.', 'Máy chủ → sự kiện'],
  report: ['chart', 'Báo cáo Ads Manager', 'Impressions, Clicks, Spend, CTR, Avg CPC, Avg CPM, Conversions.',
    'Mỗi ngày chạy.', 'Sự kiện → chuyển đổi được quy về quảng cáo'],
  feed: ['table', 'Danh mục sản phẩm', 'Tải bằng CSV, URL hoặc SFTP; sản phẩm hết hạn sau 2 tuần.',
    'Chạy thẻ sản phẩm hoặc carousel.', 'Danh mục → thẻ sản phẩm'],
  crm: ['users', 'CRM', 'Nơi ghi trạng thái thật của từng khách: đã tư vấn, đã mua, đã giao.',
    'Muốn biết lượt nào thành tiền.', 'Lead, đơn → trạng thái'],
  custom: ['repeat', 'Đối tượng tùy chỉnh', 'Danh sách khách từ CRM tải lên Ads Manager để nhắm, loại trừ hoặc chỉnh giá thầu.',
    'Nhắm cần 25.000 người khớp; loại trừ không cần.', 'CRM → đối tượng'],
  ga4: ['trend', 'GA4 đối chiếu', 'Đọc phiên có UTM để so với số trong Ads Manager.',
    'Luôn nên có.', 'Phiên có nguồn → đối chiếu']
};

// [name, label, text, confirmed?] — standard event names exactly as in
// developers.openai.com/ads/supported-events.
export const EVENTS = [
  ['page_viewed', 'Trang tải xong', 'Pixel ghi khi trang mở. Chỉ cho biết người đã tới.'],
  ['contents_viewed', 'Xem một sản phẩm', 'Khách xem một sản phẩm hoặc nội dung cụ thể.'],
  ['items_added', 'Thêm vào giỏ', 'Khách thêm sản phẩm vào giỏ.'],
  ['checkout_started', 'Bắt đầu thanh toán', 'Khách vào bước thanh toán.'],
  ['order_created', 'Tạo đơn', 'Đơn đặt thành công trên website. Chưa phải đơn đã giao.'],
  ['lead_created', 'Gửi form', 'Khách để lại thông tin. Chưa gọi thì chưa biết đúng hay sai.'],
  ['registration_completed', 'Đăng ký xong', 'Khách tạo tài khoản.'],
  ['subscription_created', 'Đăng ký gói', 'Khách bắt đầu một gói trả phí.'],
  ['Lead phù hợp', 'Nhân viên xác nhận', 'Ghi trong CRM sau khi gọi lại.', true],
  ['Đơn đã giao', 'Giao thành công', 'Đối chiếu trong CRM hoặc hệ thống bán hàng.', true]
];

// Ten steps: [title, what, output]
export const ROLLOUT = [
  ['Tìm hiểu', 'Doanh nghiệp bán gì, cho ai, người dùng hay hỏi ChatGPT điều gì về nhu cầu đó.', 'Bản tóm tắt mục tiêu'],
  ['Kiểm tra ngành', 'Ngành có trong nhóm được chạy không; trang đích có đúng chính sách không.', 'Kết luận chạy được hay không'],
  ['Tài khoản & thanh toán', 'Ads Manager bằng email công việc, xác minh doanh nghiệp, tiền tệ VND, thẻ thanh toán.', 'Tài khoản sẵn sàng'],
  ['Chọn cách chạy', 'Mục tiêu, cấu trúc chiến dịch → nhóm → quảng cáo, ngân sách ngày.', 'Sơ đồ chiến dịch'],
  ['Cài đo lường', 'UTM, Pixel, Conversions API, sự kiện chuẩn, CRM.', 'Sự kiện chạy thử đã ghi'],
  ['Viết gợi ý ngữ cảnh', 'Tình huống người dùng hỏi, theo từng nhóm quảng cáo.', 'Bộ gợi ý ngữ cảnh'],
  ['Mẫu quảng cáo & danh mục', 'Tiêu đề, mô tả, ảnh vuông, favicon; danh mục sản phẩm nếu bán hàng.', 'Bộ nội dung đã duyệt nội bộ'],
  ['Chạy & theo dõi', 'Đọc lượt hiển thị, CTR mỗi ngày; chi tiêu sau 7–8 giờ; chuyển đổi sau 24–48 giờ.', 'Ghi chú tuần đầu'],
  ['Điều chỉnh', 'Viết lại gợi ý, đổi mẫu, dời ngân sách theo số liệu.', 'Nhật ký thay đổi'],
  ['Báo cáo', 'Từ lượt hiển thị tới lead phù hợp và đơn đã giao, đối chiếu CRM.', 'Báo cáo định kỳ']
];
export const PHASES = [['Chuẩn bị', [0, 1, 2, 3]], ['Dựng quảng cáo', [4, 5, 6]], ['Chạy & tối ưu', [7, 8, 9]]];

export const PREP = [
  'Tài khoản Ads Manager bằng email công việc',
  'Xác minh doanh nghiệp',
  'Logo / favicon vuông 256 × 256',
  'Thẻ thanh toán, tiền tệ VND',
  'Ngành nằm trong nhóm được chạy',
  'Trang đích đúng chính sách quảng cáo',
  'Tiêu đề dưới 50 ký tự, mô tả dưới 100 ký tự',
  'Ảnh vuông từ 640 × 640',
  'Gợi ý ngữ cảnh cho từng nhóm quảng cáo',
  'Danh mục sản phẩm (nếu bán hàng)',
  'Pixel trên website',
  'Conversions API từ máy chủ',
  'Danh sách khách (nếu dùng đối tượng tùy chỉnh)',
  'CRM và người tiếp nhận lead'
];
export const PREP_GROUPS = [
  ['Tài khoản & thanh toán', 'shield', [0, 1, 2, 3]],
  ['Ngành & trang đích', 'stamp', [4, 5]],
  ['Mẫu quảng cáo & ngữ cảnh', 'image', [6, 7, 8, 9]],
  ['Đo lường & dữ liệu', 'code', [10, 11, 12, 13]]
];

export const FAQ = [
  ['ChatGPT Ads đã chạy được ở Việt Nam chưa?',
    'Có. Ngày 23/09/2026 OpenAI công bố ChatGPT Ads bắt đầu triển khai tại Việt Nam cùng Indonesia, Malaysia, Philippines, Singapore, Thái Lan và Đài Loan. Doanh nghiệp mua qua đội ngũ của OpenAI, agency đối tác, đối tác công nghệ, hoặc tự chạy bằng Ads Manager nếu đủ điều kiện; Việt Nam có trong danh sách quốc gia dùng Ads Manager.'],
  ['Ai thấy quảng cáo?',
    'Người dùng gói Free và Go. Plus, Pro, Business, Enterprise và Edu không có quảng cáo. Tài khoản được xác định dưới 18 tuổi không thấy quảng cáo.'],
  ['Quảng cáo có làm ChatGPT nói tốt về thương hiệu không?',
    'Không. OpenAI nói quảng cáo không ảnh hưởng tới câu trả lời; quảng cáo nằm dưới cuối câu trả lời, gắn nhãn tài trợ và tách riêng.'],
  ['Nhà quảng cáo có đọc được cuộc trò chuyện không?',
    'Không. Nhà quảng cáo không nhận nội dung trò chuyện, lịch sử, bộ nhớ, tên, email, vị trí chính xác hay địa chỉ IP; chỉ nhận số liệu tổng hợp như lượt hiển thị và lượt nhấp.'],
  ['Khác Google Ads chỗ nào?',
    'Google Ads khớp theo từ khóa người dùng gõ. ChatGPT Ads dùng gợi ý ngữ cảnh: bạn tả tình huống quảng cáo có ích, ChatGPT chọn theo ngữ cảnh cuộc trò chuyện. Gợi ý ngữ cảnh không phải từ khóa khớp chính xác.'],
  ['Ngành nào không chạy được?',
    'Người lớn và hẹn hò, rượu bia và thuốc lá, cờ bạc, hàng giả, chất cấm, chính trị. Tài chính, y tế và pháp lý chỉ xét từng trường hợp; quảng cáo tài chính ngoài Mỹ nhìn chung bị cấm.'],
  ['Chi phí tối thiểu là bao nhiêu?',
    `Ngân sách ngày tối thiểu tùy tiền tệ của tài khoản: tài khoản VND từ ${MIN_DAILY_VND.toLocaleString('vi-VN')}₫/ngày. Đây là mức tối thiểu để chạy, chưa phải mức đủ để đọc kết quả.`],
  ['Thanh toán thế nào, có hóa đơn không?',
    'Trả sau bằng thẻ tín dụng lưu trong Ads Manager, trừ khi chi tiêu chạm ngưỡng. Thuế và hóa đơn theo chứng từ OpenAI xuất; POWAI đối chiếu khi thanh toán.'],
  ['Cần chuẩn bị gì để đo chuyển đổi?',
    'Measurement Pixel trên website và/hoặc Conversions API từ máy chủ, gửi sự kiện chuẩn như lead_created hay order_created. Sự kiện tùy chỉnh chưa dùng được để tối ưu chuyển đổi.'],
  ['Có quảng cáo video không?',
    'Tại ngày kiểm tra, tài liệu ChatGPT Ads của OpenAI mô tả thẻ có chữ và ảnh vuông, thẻ sản phẩm và carousel; không thấy định dạng video.'],
  ['"Trò chuyện với thương hiệu" là gì, đã dùng được chưa?',
    'Là Sponsored Agents: từ quảng cáo, người dùng mở cuộc trò chuyện có nhãn rõ với trợ lý AI của doanh nghiệp. OpenAI đang thử nghiệm (alpha) với một số nhà quảng cáo tại Mỹ; chưa đăng ký được ở Việt Nam.'],
  ['Nên chạy ngay hay chờ?',
    'Nếu ngành được phép và đã có trang đích tốt, chạy thử với ngân sách nhỏ để học cách người dùng hỏi. Nếu chưa đo được chuyển đổi, gắn Pixel trước; nếu ngành đang bị xét từng trường hợp, chờ.'],
  ['Ai giữ tài khoản?',
    'Doanh nghiệp nên sở hữu tài khoản Ads Manager và thẻ thanh toán. POWAI được cấp quyền để vận hành; dừng hợp tác thì thu hồi quyền.'],
  ['Phí POWAI có nằm trong tiền trả cho OpenAI không?',
    'Không. OpenAI trừ tiền quảng cáo vào thẻ của doanh nghiệp. Phí dịch vụ POWAI xuất hóa đơn riêng.']
];
export const FAQ_TOPICS = [
  ['Có chạy được không', 'globe', [0, 1, 5, 11]],
  ['Riêng tư & câu trả lời', 'shield', [2, 3, 4]],
  ['Chi phí & tài khoản', 'wallet', [6, 7, 12, 13]],
  ['Đo lường & định dạng', 'chart', [8, 9, 10]]
];

// Goals for the contact form select.
export const CONTACT_GOALS = [
  ['views', 'Nhiều người biết tới thương hiệu'], ['clicks', 'Đưa khách vào website'], ['leads', 'Thu lead tư vấn'],
  ['sales', 'Bán hàng từ danh mục sản phẩm'], ['check', 'Kiểm tra ngành có chạy được không']
];

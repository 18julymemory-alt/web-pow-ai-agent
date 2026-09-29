// Content for the three Facebook Ads landing pages.
//
// Every fact here was checked against Meta Business Help Center and the Meta
// Ads Guide on CHECKED. Numbers that describe a platform limit come from those
// pages; every other number on the pages is a sample and is labelled as one.
// Sentences stay short on purpose.

export const CHECKED = '2026-09-25';

const H = id => 'https://www.facebook.com/business/help/' + id;
const G = p => 'https://www.facebook.com/business/ads-guide/update/' + p;

// key → [url, link text]. Rendered by shared.sourceList (a URL id is used as is).
export const SOURCES = {
  objectives: [H('1438417719786914'), 'Mục tiêu chiến dịch'],
  advPlus: [H('733979527611858'), 'Advantage+'],
  advCampaign: [H('1292656978738967'), 'Chiến dịch Advantage+'],
  advAudience: [H('273363992030035'), 'Đối tượng Advantage+'],
  controls: [H('938372127764391'), 'Kiểm soát đối tượng'],
  placements: [H('682655495435254'), 'Vị trí quảng cáo'],
  bidding: [H('1619591734742116'), 'Chiến lược giá thầu'],
  perfGoals: [H('782657799338685'), 'Mục tiêu hiệu quả'],
  budget: [H('214319341922580'), 'Ngân sách'],
  charges: [H('716180208457684'), 'Cách tính phí'],
  vat: [H('938907633499274'), 'Thuế trên hóa đơn'],
  pixel: [H('742478679120153'), 'Meta Pixel'],
  capi: [H('2041148702652965'), 'Conversions API'],
  events: [H('402791146561655'), 'Sự kiện tiêu chuẩn'],
  domain: [H('245311299870862'), 'Xác minh tên miền'],
  ctm: [H('1816962591668838'), 'Quảng cáo nhắn tin'],
  ctwa: [H('447934475640650'), 'Quảng cáo tới WhatsApp'],
  msgLeads: [H('734075733714274'), 'Thu lead qua tin nhắn'],
  instantForm: [H('761812391313386'), 'Biểu mẫu tức thì'],
  formTypes: [H('252352181957512'), 'Loại biểu mẫu'],
  leadAbout: [H('1481110642181372'), 'Quảng cáo khách hàng tiềm năng'],
  leadBest: [H('435270316658768'), 'Mẹo cho quảng cáo lead'],
  leadCreate: [H('375478503258484'), 'Tạo biểu mẫu'],
  leadAccess: [H('1440176552713521'), 'Truy cập lead'],
  leadDownload: [H('734933888443065'), 'Tải lead về'],
  crmLeads: [H('279369167153556'), 'Lead chuyển đổi từ CRM'],
  crmIntegr: [H('301355140655035'), 'Kết nối CRM'],
  prefill: [H('438193446367413'), 'Câu hỏi điền sẵn'],
  prohibited: [H('219356599612120'), 'Chính sách câu hỏi'],
  catLeads: [H('2069037703372194'), 'Danh mục & lead'],
  leadSpecs: [H('908491205873167'), 'Thông số quảng cáo lead'],
  catalogAds: [H('397103717129942'), 'Quảng cáo danh mục Advantage+'],
  custom: [H('744354708981227'), 'Đối tượng tùy chỉnh'],
  lookalike: [H('164749007013531'), 'Đối tượng tương tự'],
  restricted: [H('422289316306981'), 'Tài khoản bị hạn chế'],
  imgFeed: [G('image/facebook-feed'), 'Thông số ảnh Bảng tin'],
  vidFeed: [G('video/facebook-feed'), 'Thông số video Bảng tin'],
  carousel: [G('carousel/facebook-feed'), 'Thông số Carousel'],
  story: [G('image/instagram-story'), 'Thông số Stories'],
  reels: [G('video/instagram-reels'), 'Thông số Reels'],
  collection: [G('collection'), 'Thông số Bộ sưu tập'],
  marketplace: [G('image/facebook-marketplace'), 'Thông số Marketplace'],
  search: [G('image/facebook-search'), 'Thông số Kết quả tìm kiếm'],
  fbStory: [G('image/facebook-story'), 'Thông số Facebook Stories'],
  audienceNetwork: [G('image/audience-network-native'), 'Thông số Audience Network']
};

/* ================================================================== *
 * Page 01 — six ways to run
 * ================================================================== */
export const TYPES = [
  {
    id: 'feed', tag: 'BẢNG TIN',
    title: 'Bảng tin (ảnh & video)',
    description: 'Ảnh hoặc video xen giữa bài viết khi khách lướt.',
    bestFor: 'Hợp khi có ảnh sản phẩm rõ ràng và cần người xem bấm vào website.',
    sourceKeys: ['placements', 'imgFeed', 'vidFeed']
  },
  {
    id: 'stories', tag: 'STORIES & REELS',
    title: 'Stories & Reels',
    description: 'Toàn màn hình dọc 9:16, xem nhanh rồi vuốt.',
    bestFor: 'Hợp khi có video dọc ngắn và cần người chưa biết thương hiệu dừng lại.',
    sourceKeys: ['story', 'reels', 'fbStory']
  },
  {
    id: 'carousel', tag: 'CAROUSEL & BỘ SƯU TẬP',
    title: 'Carousel & Bộ sưu tập',
    description: 'Nhiều thẻ trượt ngang, hoặc ảnh bìa kèm lưới sản phẩm.',
    bestFor: 'Hợp khi có nhiều sản phẩm hoặc nhiều lợi ích cần kể theo thứ tự.',
    sourceKeys: ['carousel', 'collection']
  },
  {
    id: 'messaging', tag: 'NHẮN TIN',
    title: 'Quảng cáo nhắn tin',
    description: 'Bấm quảng cáo là mở khung chat với trang.',
    bestFor: 'Hợp khi khách cần hỏi giá, hỏi mẫu trước khi mua và có người trực tin.',
    sourceKeys: ['ctm', 'ctwa', 'msgLeads']
  },
  {
    id: 'leadform', tag: 'BIỂU MẪU',
    title: 'Form khách hàng tiềm năng',
    description: 'Khách để lại thông tin ngay trong ứng dụng, không cần website.',
    bestFor: 'Hợp khi cần số điện thoại để gọi tư vấn và có người gọi lại nhanh.',
    sourceKeys: ['leadAbout', 'instantForm', 'formTypes']
  },
  {
    id: 'catalog', tag: 'ADVANTAGE+ / DANH MỤC',
    title: 'Bán hàng theo danh mục',
    description: 'Quảng cáo tự lấy ảnh, tên, giá từ danh mục sản phẩm.',
    bestFor: 'Hợp khi bán nhiều mã hàng và website đã gửi sự kiện kèm mã sản phẩm.',
    sourceKeys: ['catalogAds', 'pixel', 'capi']
  }
];

// [name, label, text] — the orbit on page 01.
export const JOURNEY = [
  ['Lướt bảng tin', 'CHẶNG 1 · ĐANG LƯỚT',
    'Khách mở ứng dụng để xem bạn bè, video, tin tức. Họ không đi tìm sản phẩm. Quảng cáo phải khiến họ dừng lại.'],
  ['Thấy quảng cáo', 'CHẶNG 2 · DỪNG LẠI',
    'Meta chọn người xem và vị trí dựa trên mục tiêu, đối tượng và nội dung bạn đưa vào. Vài giây đầu quyết định họ có lướt qua hay không.'],
  ['Bấm / nhắn tin', 'CHẶNG 3 · HÀNH ĐỘNG',
    'Khách bấm nút: xem thêm, gửi tin nhắn, đăng ký hoặc mua. Nút nào dẫn tới đâu phải chọn từ lúc tạo quảng cáo.'],
  ['Trang đích / chat / form', 'CHẶNG 4 · ĐIỂM ĐẾN',
    'Khách tới website, mở khung chat hoặc điền biểu mẫu ngay trong ứng dụng. Điểm đến phải nói tiếp đúng điều quảng cáo đã hứa.'],
  ['Tư vấn', 'CHẶNG 5 · NGƯỜI THẬT',
    'Nhân viên trả lời tin nhắn hoặc gọi lại số vừa để lại. Trả lời chậm thì khách nguội, dù quảng cáo tốt.'],
  ['Đơn hàng & CRM', 'CHẶNG 6 · GHI NHẬN',
    'Đơn và trạng thái khách được ghi vào CRM. Kết quả thật gửi ngược về Meta để hệ thống học đúng người.']
];

/* Per type: chapter content. Formats: [id, name, where, what]. */
export const PANELS = {
  feed: {
    formats: [
      ['fb-feed-img', 'Ảnh trên Bảng tin Facebook', 'Giữa các bài viết trên Bảng tin, cả điện thoại và máy tính.',
        'Một ảnh 4:5 hoặc 1:1, văn bản chính, dòng tiêu đề và nút kêu gọi.'],
      ['fb-feed-vid', 'Video trên Bảng tin', 'Bảng tin Facebook. Video tự phát không tiếng khi khách lướt tới.',
        'Video 4:5 hoặc 1:1. Nên có phụ đề vì nhiều người xem không bật tiếng.'],
      ['ig-feed', 'Bảng tin Instagram', 'Giữa các bài đăng của những người khách đang theo dõi.',
        'Ảnh hoặc video 4:5, chú thích ngắn, thanh nút ngay dưới ảnh.'],
      ['marketplace', 'Marketplace', 'Xen trong lưới tin rao bán của Marketplace.',
        'Ảnh vuông, tên và giá, trông như một tin rao.'],
      ['search', 'Kết quả tìm kiếm', 'Trong kết quả khi khách tìm trên Facebook hoặc Marketplace.',
        'Dùng lại ảnh và chữ của quảng cáo Bảng tin, có nhãn Được tài trợ.'],
      ['threads', 'Threads', 'Giữa các bài viết trên Threads.',
        'Chữ ngắn kèm ảnh hoặc video, lấy từ nội dung đã làm cho Instagram.'],
      ['an-banner', 'Audience Network', 'Trong ứng dụng của đối tác Meta, ngoài Facebook và Instagram.',
        'Banner hoặc quảng cáo gốc ghép từ ảnh và chữ sẵn có.']
    ],
    how: ['Meta chọn người có khả năng làm hành động bạn chọn',
      'Phiên đấu giá quyết định quảng cáo nào được hiện',
      'Ảnh hoặc video hiện giữa Bảng tin',
      'Khách bấm nút và mở website',
      'Pixel và Conversions API ghi lại lượt xem, giỏ hàng, đơn'],
    inputs: ['Ảnh hoặc video 4:5', 'Văn bản chính và tiêu đề', 'Trang sản phẩm', 'Sự kiện đo trên website'],
    outputs: 'Lượt vào trang và đơn hàng được ghi nhận; số lượt nhấp cao chưa chắc có đơn',
    setup: {
      campaign: [['Lưu lượng truy cập'], ['Doanh số', 'on'], ['Khách hàng tiềm năng']],
      goal: 'Tối đa hóa số lượt chuyển đổi',
      where: 'Website',
      placements: [['Bảng tin Facebook', true], ['Bảng tin Instagram', true], ['Marketplace', true], ['Audience Network', false]],
      ad: [['s-desk', 'r45', '4:5 Bảng tin'], ['s6', 'r11', '1:1'], ['s-tall', 'r916', '9:16 cho Stories']]
    },
    specs: [
      ['Ảnh 4:5', '1440 × 1800 px', 'Tỷ lệ khuyến nghị cho Bảng tin. Ảnh 1:1 vẫn dùng được.'],
      ['Văn bản chính', '50–150 ký tự', 'Khuyến nghị. Phần dài hơn bị ẩn sau chữ Xem thêm.'],
      ['Dòng tiêu đề', '27 ký tự', 'Khuyến nghị. Dài hơn có thể bị cắt trên điện thoại.'],
      ['Tệp ảnh', 'JPG, PNG · tối đa 30 MB', 'Chiều rộng tối thiểu 600 px.'],
      ['Thời lượng video', '1 giây – 241 phút', 'Giới hạn kỹ thuật. Video Bảng tin nên ngắn và có phụ đề.'],
      ['Tệp video', 'MP4, MOV · tối đa 4 GB', 'Chiều rộng tối thiểu 120 px.']
    ],
    assets: [
      ['4:5', 'Ảnh hoặc video dọc', 'Chiếm nhiều màn hình hơn ảnh ngang khi lướt.'],
      ['Chữ', 'Văn bản chính', 'Câu đầu nói lợi ích, vì phần sau bị ẩn.'],
      ['Trang', 'Trang sản phẩm', 'Mở đúng món trong ảnh, không mở trang chủ.'],
      ['Sự kiện', 'Pixel + Conversions API', 'Đo xem hàng, thêm giỏ, mua.']
    ],
    measure: [
      ['Xem sản phẩm', 'product', 'eye', 'ViewContent', 'Trang sản phẩm mở ra trong trình duyệt của ứng dụng.'],
      ['Thêm vào giỏ', 'cart', 'cart', 'AddToCart', 'Món hàng vào giỏ; khách chưa trả tiền.'],
      ['Đặt hàng', 'order', 'check', 'Purchase', 'Trang xác nhận đơn hiện ra kèm giá trị đơn.'],
      ['Gọi cửa hàng', 'call', 'phone', 'Contact', 'Điện thoại bật màn hình gọi tới hotline.']
    ],
    track: 'Cần Pixel trên website và nên có thêm Conversions API từ máy chủ. Hai nguồn cùng gửi một sự kiện thì phải có mã khử trùng lặp để không đếm hai lần.',
    bid: 'Với mục tiêu Doanh số, bắt đầu bằng Số lượng cao nhất. Chỉ đặt mục tiêu chi phí khi đã có đủ đơn để biết mức hợp lý.',
    caution: 'Lượt nhấp liên kết không phải lượt vào trang. Trang tải chậm làm mất một phần người đã bấm.',
    paths: [
      ['Một sản phẩm, nhiều cách kể', 'Cùng một món, thử ảnh sản phẩm, ảnh đang dùng và video ngắn. Để hệ thống chọn bản khách dừng lại nhiều hơn.'],
      ['Tách người mới và người cũ', 'Người đã mua nhận lời mời khác người chưa biết shop. Loại trừ khách cũ khỏi chiến dịch tìm khách mới.'],
      ['Đo tới đơn, không dừng ở lượt nhấp', 'Chọn tối ưu cho Purchase khi website đã ghi đủ đơn. Khi còn ít đơn, AddToCart là bước tạm.']
    ],
    diagnosis: [
      ['Nhiều nhấp, ít lượt xem trang', 'Kiểm tra tốc độ trang trên điện thoại. So sánh lượt nhấp liên kết với lượt xem trang đích.'],
      ['Có giỏ hàng nhưng ít đơn', 'Kiểm tra phí giao, cách thanh toán và bước nhập địa chỉ. Xem sự kiện Purchase có được gửi đúng giá trị không.']
    ],
    diag: {
      'Nhiều nhấp, ít lượt xem trang': [['Lượt nhấp liên kết', '1.240', 'good'], ['CTR (liên kết)', '1,6%', 'good'], ['Lượt xem trang đích', '310', 'fix']],
      'Có giỏ hàng nhưng ít đơn': [['Lượt xem trang', '2.050', 'good'], ['AddToCart', '146', 'good'], ['Purchase', '5', 'fix']]
    },
    checks: ['Ảnh 4:5 và 1:1 cho cùng một nội dung', 'Câu đầu văn bản chính nói lợi ích', 'Liên kết mở đúng trang sản phẩm',
      'Pixel ghi ViewContent, AddToCart, Purchase', 'Conversions API có mã khử trùng lặp', 'Tên miền đã xác minh', 'Loại trừ khách đã mua']
  },

  stories: {
    formats: [
      ['fb-story', 'Facebook Stories', 'Giữa các tin 24 giờ, toàn màn hình dọc.',
        'Ảnh hoặc video 9:16. Chừa trống vùng trên và dưới để tên trang và nút không che chữ.'],
      ['ig-story', 'Instagram Stories', 'Giữa các tin của người khách theo dõi.',
        'Cùng khung 9:16. Khách chạm để xem tiếp hoặc vuốt để bỏ qua.'],
      ['fb-reels', 'Facebook Reels', 'Giữa các video ngắn dạng dọc.',
        'Video 9:16 có tiếng, cột nút thích, bình luận, chia sẻ bên phải.'],
      ['ig-reels', 'Instagram Reels', 'Trong trình xem Reels, mở từ tab Reels, Bảng tin hoặc Khám phá.',
        'Video dọc tới 15 phút. Người xem vẫn thích, bình luận, lưu được như video thường.']
    ],
    how: ['Meta chọn người hay xem video dọc',
      'Quảng cáo chen giữa các tin hoặc video ngắn',
      'Vài giây đầu giữ người xem ở lại',
      'Khách vuốt lên, bấm nút hoặc gửi tin nhắn',
      'Lượt xem video và hành động sau đó được ghi lại'],
    inputs: ['Video dọc 9:16', 'Nhạc hoặc giọng nói gốc', 'Phụ đề', 'Nút kêu gọi'],
    outputs: 'Lượt xem, người tiếp cận và hành động sau khi xem; lượt xem chưa phải khách mua',
    setup: {
      campaign: [['Mức độ nhận biết', 'on'], ['Lượt tương tác'], ['Doanh số']],
      goal: 'Tối đa hóa lượt xem ThruPlay',
      where: 'Trên quảng cáo',
      placements: [['Stories Facebook', true], ['Stories Instagram', true], ['Reels Facebook', true], ['Reels Instagram', true]],
      ad: [['s-tall', 'r916', '9:16 video'], ['s-hero', 'r169', 'Không dùng 16:9'], ['s-desk', 'r45', '4:5 phụ']]
    },
    specs: [
      ['Video 9:16', '1440 × 2560 px', 'Tỷ lệ khuyến nghị cho Stories và Reels.'],
      ['Vùng an toàn', '14% trên · 35% dưới · 6% hai bên', 'Không đặt chữ, logo ở các vùng này.'],
      ['Văn bản chính Stories', '125 ký tự', 'Khuyến nghị cho Stories.'],
      ['Văn bản chính Reels', '44 ký tự', 'Khuyến nghị cho Reels Instagram.'],
      ['Thời lượng Reels', '0 giây – 15 phút', 'Giới hạn kỹ thuật. Quảng cáo ngắn dễ xem hết hơn.'],
      ['Tệp video', 'MP4, MOV · tối đa 4 GB', 'Rộng tối thiểu 250 px với video dưới 30 giây.']
    ],
    assets: [
      ['9:16', 'Video dọc', 'Quay dọc từ đầu, không cắt từ video ngang.'],
      ['Video', 'Ba giây đầu', 'Có sản phẩm hoặc người thật ngay khung hình đầu.'],
      ['Chữ', 'Phụ đề', 'Người xem không bật tiếng vẫn hiểu.'],
      ['Tin nhắn', 'Nút kêu gọi', 'Một việc duy nhất: xem thêm, nhắn tin hoặc mua.']
    ],
    measure: [
      ['Tìm hiểu thêm', 'product', 'page', 'ViewContent', 'Trang sản phẩm mở ra ngay trên điện thoại.'],
      ['Gửi tin nhắn', 'chat', 'chat', 'Bắt đầu cuộc trò chuyện', 'Khung chat mở ra với lời chào của shop.'],
      ['Mua ngay', 'order', 'cart', 'Purchase', 'Đơn hoàn tất trên website và được ghi kèm giá trị.']
    ],
    track: 'Lượt xem video do Meta tự đếm. Hành động sau khi xem cần Pixel, Conversions API hoặc tin nhắn được ghi nhận thì mới đọc được.',
    bid: 'Với mục tiêu nhận biết, dùng Số lượng cao nhất. Giới hạn giá thầu chỉ dành cho người đã quen đọc chi phí.',
    caution: 'Video cắt từ bản ngang thường mất chữ ở hai bên. Chữ đặt sát đáy sẽ bị nút che.',
    paths: [
      ['Ba bản mở đầu khác nhau', 'Giữ phần thân video, đổi ba giây đầu. So tỷ lệ xem tới cuối giữa các bản.'],
      ['Từ người xem thành người được nhắc lại', 'Tạo nhóm người đã xem phần lớn video. Chạy quảng cáo carousel hoặc nhắn tin cho nhóm đó.'],
      ['Người thật nói chuyện', 'Nhân viên cầm sản phẩm và nói một câu. Cách này thường tự nhiên hơn một đoạn phim quảng cáo.']
    ],
    diagnosis: [
      ['Người xem lướt qua ngay', 'Xem lại khung hình đầu. Đưa sản phẩm hoặc câu hỏi lên trước, bớt logo mở đầu.'],
      ['Xem nhiều nhưng ít bấm', 'Nút kêu gọi có rõ không. Trang mở ra có đúng thứ trong video không.']
    ],
    diag: {
      'Người xem lướt qua ngay': [['Lượt hiển thị', '48.000', 'good'], ['Xem 3 giây', '9%', 'fix'], ['Tần suất', '1,6', 'good']],
      'Xem nhiều nhưng ít bấm': [['ThruPlay', '6.300', 'good'], ['Lượt nhấp liên kết', '41', 'fix'], ['Tần suất', '2,1', 'consider']]
    },
    checks: ['Video quay dọc 9:16', 'Chữ và logo nằm trong vùng an toàn', 'Có phụ đề', 'Ba giây đầu có sản phẩm',
      'Âm thanh gốc hoặc nhạc được phép dùng', 'Nút kêu gọi khớp nội dung video', 'Nhóm người đã xem video để nhắc lại']
  },

  carousel: {
    formats: [
      ['carousel', 'Carousel trên Bảng tin', 'Bảng tin Facebook, có trên điện thoại và máy tính.',
        'Từ 2 tới 10 thẻ. Mỗi thẻ có ảnh hoặc video, tiêu đề và liên kết riêng.'],
      ['carousel-ig', 'Carousel trên Instagram', 'Bảng tin Instagram, khách vuốt ngang để xem.',
        'Các thẻ vuông cùng kích thước, thanh nút dưới ảnh.'],
      ['collection', 'Bộ sưu tập', 'Bảng tin trên điện thoại.',
        'Ảnh hoặc video bìa phía trên, bốn sản phẩm nhỏ bên dưới.'],
      ['instant-exp', 'Trải nghiệm tức thì', 'Mở toàn màn hình khi khách chạm vào Bộ sưu tập.',
        'Trang tải nhanh trong ứng dụng: ảnh bìa, chữ, lưới sản phẩm, nút sang website.']
    ],
    how: ['Meta chọn người có khả năng xem nhiều sản phẩm',
      'Quảng cáo hiện với thẻ đầu tiên',
      'Khách vuốt ngang hoặc chạm để mở bộ sưu tập',
      'Mỗi thẻ dẫn về đúng trang của sản phẩm đó',
      'Lượt xem hàng và đơn được ghi theo từng sản phẩm'],
    inputs: ['2–10 ảnh cùng tỷ lệ', 'Tiêu đề từng thẻ', 'Liên kết từng sản phẩm', 'Ảnh bìa bộ sưu tập'],
    outputs: 'Lượt xem từng sản phẩm và đơn hàng; thẻ đầu thường được xem nhiều nhất',
    setup: {
      campaign: [['Lưu lượng truy cập'], ['Doanh số', 'on'], ['Lượt tương tác']],
      goal: 'Tối đa hóa số lượt chuyển đổi',
      where: 'Website',
      placements: [['Bảng tin Facebook', true], ['Bảng tin Instagram', true], ['Stories', false], ['Audience Network', false]],
      ad: [['s6', 'r11', 'Thẻ 1'], ['s3', 'r11', 'Thẻ 2'], ['s1', 'r11', 'Thẻ 3']]
    },
    specs: [
      ['Ảnh thẻ 1:1', '1080 × 1080 px', 'Khuyến nghị tối thiểu 1080 px mỗi chiều.'],
      ['Văn bản chính', '80 ký tự', 'Khuyến nghị cho Carousel.'],
      ['Dòng tiêu đề thẻ', '20 ký tự', 'Khuyến nghị cho mỗi thẻ.'],
      ['Mô tả thẻ', '18 ký tự', 'Khuyến nghị; không phải vị trí nào cũng hiện.'],
      ['Số thẻ', '2–10 thẻ', 'Ít nhất hai thẻ.'],
      ['Liên kết', 'Bắt buộc có URL trang đích', 'Mỗi thẻ có thể dẫn tới một trang riêng.'],
      ['Ảnh bìa Bộ sưu tập', '1.91:1 – 1:1', 'Ảnh hoặc video bìa.'],
      ['Dòng tiêu đề Bộ sưu tập', '40 ký tự', 'Khuyến nghị.'],
      ['Trải nghiệm tức thì', 'Bắt buộc với Bộ sưu tập', 'Trang mở ra khi khách chạm vào quảng cáo.']
    ],
    assets: [
      ['1:1', 'Ảnh cùng khung', 'Các thẻ cùng tỷ lệ, cùng nền để nhìn như một dãy.'],
      ['Carousel', 'Thứ tự thẻ', 'Thẻ đầu là món chủ lực, thẻ cuối là lời mời.'],
      ['Trang', 'Trang từng sản phẩm', 'Mỗi thẻ mở đúng món của thẻ đó.'],
      ['Danh mục', 'Bộ sưu tập', 'Cần danh mục hoặc chọn tay các sản phẩm.']
    ],
    measure: [
      ['Thẻ nến thơm', 'product', 'eye', 'ViewContent', 'Trang nến thơm mở ra, đúng món trên thẻ.'],
      ['Thẻ tinh dầu', 'product2', 'eye', 'ViewContent', 'Trang tinh dầu mở ra; sự kiện mang mã sản phẩm khác.'],
      ['Xem cả bộ', 'instant', 'list', 'Mở trải nghiệm', 'Trải nghiệm tức thì mở toàn màn hình trong ứng dụng.'],
      ['Mua', 'order', 'cart', 'Purchase', 'Đơn hoàn tất trên website.']
    ],
    track: 'Mỗi thẻ nên dẫn tới trang riêng và gửi ViewContent kèm mã sản phẩm. Như vậy mới biết thẻ nào kéo được khách.',
    bid: 'Dùng Số lượng cao nhất cho Doanh số. Khi đã ghi được giá trị đơn, cân nhắc Giá trị cao nhất.',
    caution: 'Meta có thể tự đổi thứ tự thẻ nếu bật tùy chọn tự động. Tắt nếu câu chuyện phải đi theo thứ tự.',
    paths: [
      ['Một câu chuyện nhiều bước', 'Thẻ 1 nêu vấn đề, thẻ 2 và 3 là cách dùng, thẻ cuối là lời mời. Giữ thứ tự cố định.'],
      ['Nhiều món, một nhu cầu', 'Mỗi thẻ một món cho cùng một nhu cầu, như quà tặng. Để thứ tự tự động.'],
      ['Bộ sưu tập cho khách trên điện thoại', 'Dùng khi có video bìa tốt và nhiều sản phẩm. Trải nghiệm tức thì mở nhanh hơn website.']
    ],
    diagnosis: [
      ['Chỉ thẻ đầu được bấm', 'Thẻ sau có ảnh yếu hoặc trùng nhau. Đổi thẻ 2 thành món khác hẳn.'],
      ['Mở bộ sưu tập nhưng ít sang website', 'Kiểm tra nút trong trải nghiệm tức thì và giá có hiện không.']
    ],
    diag: {
      'Chỉ thẻ đầu được bấm': [['Nhấp thẻ 1', '420', 'good'], ['Nhấp thẻ 2', '38', 'fix'], ['Nhấp thẻ 3', '51', 'consider']],
      'Mở bộ sưu tập nhưng ít sang website': [['Mở trải nghiệm', '1.900', 'good'], ['Thời gian xem', '14 giây', 'good'], ['Sang website', '22', 'fix']]
    },
    checks: ['Ít nhất 3 thẻ cùng tỷ lệ 1:1', 'Tiêu đề thẻ ngắn gọn', 'Mỗi thẻ có liên kết riêng', 'Chọn thứ tự cố định hay tự động',
      'Ảnh hoặc video bìa cho Bộ sưu tập', 'Trải nghiệm tức thì có nút sang website', 'ViewContent gửi kèm mã sản phẩm']
  },

  messaging: {
    formats: [
      ['msg-feed', 'Quảng cáo trên Bảng tin', 'Bảng tin Facebook và Instagram.',
        'Ảnh hoặc video như quảng cáo thường, nút Gửi tin nhắn thay cho nút tới website.'],
      ['msg-story', 'Quảng cáo trên Stories', 'Stories và Reels.',
        'Khung dọc 9:16, nút Gửi tin nhắn ở cuối màn hình.'],
      ['msg-chat', 'Khung chat mở ra', 'Messenger, Instagram Direct hoặc WhatsApp, tùy điểm đến bạn chọn.',
        'Lời chào và các câu hỏi gợi ý soạn sẵn. Khách chạm một câu là gửi.'],
      ['msg-lead', 'Hỏi thông tin trong chat', 'Ngay trong khung chat.',
        'Chuỗi câu hỏi tự động xin nhu cầu và số điện thoại. Câu trả lời thành lead.']
    ],
    how: ['Meta chọn người có khả năng nhắn tin cho doanh nghiệp',
      'Quảng cáo hiện với nút Gửi tin nhắn',
      'Khách chạm nút, khung chat mở với lời chào',
      'Nhân viên hoặc trả lời tự động tiếp chuyện',
      'Cuộc trò chuyện bắt đầu được đếm; đơn phải ghi ở CRM'],
    inputs: ['Ảnh hoặc video', 'Lời chào', 'Câu hỏi gợi ý', 'Người trực tin nhắn'],
    outputs: 'Số cuộc trò chuyện bắt đầu; một cuộc trò chuyện chưa phải khách mua',
    setup: {
      campaign: [['Lượt tương tác', 'on'], ['Khách hàng tiềm năng'], ['Doanh số']],
      goal: 'Tối đa hóa số cuộc trò chuyện',
      where: 'Ứng dụng nhắn tin',
      placements: [['Messenger', true], ['Instagram', true], ['WhatsApp', false]],
      ad: [['s6', 'r45', '4:5 Bảng tin'], ['s-tall', 'r916', '9:16 Stories'], ['s3', 'r11', '1:1']]
    },
    specs: [
      ['Ảnh 4:5', '1440 × 1800 px', 'Theo thông số của vị trí hiển thị, ví dụ Bảng tin.'],
      ['Văn bản chính', '50–150 ký tự', 'Khuyến nghị cho Bảng tin.'],
      ['Lời chào', 'Một đoạn ngắn', 'Nói rõ khách đang nhắn cho ai và sẽ được giúp gì.'],
      ['Câu hỏi gợi ý', 'Giá bao nhiêu? · Còn hàng không? · Giao mấy ngày?', 'Khách chạm là gửi.'],
      ['Điểm đến', 'Messenger · Instagram · WhatsApp', 'Chọn một hoặc nhiều ứng dụng.'],
      ['Người trực tin', 'Trong giờ quảng cáo chạy', 'Trả lời chậm làm mất khách đã nhắn.']
    ],
    assets: [
      ['Ảnh', 'Ảnh sản phẩm', 'Có giá hoặc ưu đãi để khách có lý do hỏi.'],
      ['Kịch bản', 'Lời chào', 'Một câu, có tên shop và điều sẽ giúp.'],
      ['Tin nhắn', 'Câu hỏi gợi ý', 'Những câu khách hay hỏi nhất.'],
      ['Tin nhắn', 'Mẫu trả lời nhanh', 'Giá, phí giao, cách đặt — để nhân viên trả lời đồng nhất.']
    ],
    measure: [
      ['Gửi tin nhắn', 'chat', 'chat', 'Bắt đầu cuộc trò chuyện', 'Khung chat mở ra với lời chào và câu hỏi gợi ý.'],
      ['Hỏi giá', 'chatprice', 'tag', 'Bắt đầu cuộc trò chuyện', 'Khách chạm câu gợi ý, câu hỏi gửi đi ngay.'],
      ['Để lại số', 'chatlead', 'phone', 'Lead', 'Khách gửi số điện thoại trong chat; nhân viên đánh dấu là lead.'],
      ['Chốt đơn', 'crm', 'check', 'Purchase', 'Đơn được ghi trong CRM, rồi gửi về Meta qua Conversions API.']
    ],
    track: 'Meta đếm số cuộc trò chuyện bắt đầu. Lead và đơn trong chat chỉ đo được khi nhân viên đánh dấu hoặc hệ thống gửi sự kiện về.',
    bid: 'Bắt đầu với Số lượng cao nhất. Mục tiêu chi phí trên mỗi cuộc trò chuyện chỉ nên đặt khi đã biết bao nhiêu cuộc thành đơn.',
    caution: 'Nhiều tin nhắn chưa chắc nhiều đơn. Cần đếm cả số cuộc có số điện thoại và số đơn chốt.',
    paths: [
      ['Hỏi giá trước khi mua', 'Ảnh có giá, câu gợi ý hỏi mẫu và phí giao. Nhân viên có sẵn bảng giá.'],
      ['Thu số điện thoại trong chat', 'Thêm câu hỏi tự động xin nhu cầu và số điện thoại. Chuyển thành lead cho người gọi.'],
      ['Gửi kết quả về Meta', 'Đánh dấu cuộc trò chuyện có đơn. Hệ thống học tìm thêm người giống vậy.']
    ],
    diagnosis: [
      ['Nhiều tin nhắn, ít đơn', 'Đọc lại 20 cuộc chat gần nhất. Khách hỏi gì mà không được trả lời?'],
      ['Khách nhắn rồi im', 'Kiểm tra thời gian trả lời đầu tiên và câu mở đầu của nhân viên.']
    ],
    diag: {
      'Nhiều tin nhắn, ít đơn': [['Cuộc trò chuyện', '186', 'good'], ['Có số điện thoại', '41', 'consider'], ['Đơn chốt', '6', 'fix']],
      'Khách nhắn rồi im': [['Cuộc trò chuyện', '120', 'good'], ['Trả lời đầu tiên', '47 phút', 'fix'], ['Khách nhắn tiếp', '18%', 'consider']]
    },
    checks: ['Trang và tài khoản nhắn tin đã nối', 'Lời chào có tên shop', 'Câu hỏi gợi ý là câu khách hay hỏi', 'Có người trực trong giờ chạy',
      'Bảng giá, phí giao để trả lời nhanh', 'Cách đánh dấu lead và đơn trong hộp thư', 'CRM ghi nguồn tin nhắn']
  },

  leadform: {
    formats: [
      ['lead-ad', 'Quảng cáo trên Bảng tin', 'Bảng tin, Stories và Reels.',
        'Ảnh hoặc video như quảng cáo thường, nút Đăng ký hoặc Nhận báo giá.'],
      ['form-intro', 'Màn giới thiệu', 'Mở ngay trong ứng dụng khi khách chạm nút.',
        'Ảnh, tiêu đề và vài dòng nói khách sẽ nhận được gì.'],
      ['form-fields', 'Câu hỏi điền sẵn', 'Trong biểu mẫu.',
        'Tên, số điện thoại, email lấy sẵn từ hồ sơ. Khách xem lại và sửa nếu cần.'],
      ['form-thanks', 'Màn cảm ơn', 'Sau khi khách gửi.',
        'Lời cảm ơn, bước tiếp theo và nút gọi hoặc xem website.']
    ],
    how: ['Meta chọn người có khả năng điền biểu mẫu',
      'Quảng cáo hiện với nút Đăng ký',
      'Biểu mẫu mở ngay trong ứng dụng, đã điền sẵn thông tin',
      'Khách gửi, lead lưu trong Meta',
      'Lead được tải về hoặc đẩy sang CRM để gọi lại'],
    inputs: ['Ảnh hoặc video', 'Câu hỏi biểu mẫu', 'Chính sách quyền riêng tư', 'Người gọi lại'],
    outputs: 'Danh sách lead có tên và số điện thoại; lead chưa gọi thì chưa phải khách',
    setup: {
      campaign: [['Lượt tương tác'], ['Khách hàng tiềm năng', 'on'], ['Doanh số']],
      goal: 'Tối đa hóa số khách hàng tiềm năng',
      where: 'Biểu mẫu tức thì',
      placements: [['Bảng tin Facebook', true], ['Bảng tin Instagram', true], ['Stories', true], ['Reels', true]],
      ad: [['s-desk', 'r45', '4:5 quảng cáo'], ['s-shelf', 'r191', 'Ảnh đầu form'], ['s-tall', 'r916', '9:16']]
    },
    specs: [
      ['Ảnh 4:5', '1440 × 1800 px', 'Ảnh quảng cáo theo thông số của vị trí hiển thị.'],
      ['Chính sách quyền riêng tư', 'Bắt buộc có liên kết', 'Biểu mẫu không tạo được nếu thiếu.'],
      ['Loại biểu mẫu', 'Nhiều khách hơn · Mức độ ý định cao hơn', 'Loại thứ hai có thêm bước xem lại trước khi gửi.'],
      ['Câu hỏi điền sẵn', 'Họ tên · Số điện thoại · Email · Thành phố', 'Lấy từ thông tin khách đã có trên tài khoản.'],
      ['Câu hỏi tự viết', 'Trắc nghiệm hoặc trả lời ngắn', 'Mỗi câu thêm vào làm ít người điền hơn nhưng lead rõ hơn.'],
      ['Câu hỏi bị giới hạn', 'Sức khỏe, tài chính, giấy tờ tùy thân…', 'Có quy định riêng. Kiểm tra chính sách trước khi thêm.']
    ],
    assets: [
      ['Ảnh', 'Ảnh quảng cáo', 'Nói rõ khách nhận được gì khi điền.'],
      ['Câu hỏi', 'Bộ câu hỏi', 'Ít câu, mỗi câu giúp phân loại khách.'],
      ['Trang', 'Chính sách quyền riêng tư', 'Trang công khai trên website của doanh nghiệp.'],
      ['Kịch bản', 'Kịch bản gọi lại', 'Câu mở đầu nhắc lại điều khách vừa đăng ký.']
    ],
    measure: [
      ['Nhận báo giá', 'formopen', 'form', 'Mở biểu mẫu', 'Biểu mẫu mở ngay trong ứng dụng, không sang website.'],
      ['Gửi', 'lead', 'send', 'Lead', 'Màn cảm ơn hiện ra. Lead nằm trong Meta, chờ tải về.'],
      ['Gọi ngay', 'call', 'phone', 'Contact', 'Nút ở màn cảm ơn mở cuộc gọi tới hotline.'],
      ['Lead phù hợp', 'crm', 'check', 'Lead phù hợp', 'Nhân viên gọi, đánh dấu trong CRM rồi gửi trạng thái về Meta.']
    ],
    track: 'Lead lưu trong Meta và phải được lấy ra: tải tệp, xem trong Meta Business Suite hoặc nối CRM. Gửi trạng thái lead phù hợp về Meta để tối ưu cho chất lượng.',
    bid: 'Bắt đầu với Số lượng cao nhất. Khi đã gửi được trạng thái lead phù hợp, có thể tối ưu cho lead chuyển đổi.',
    caution: 'Biểu mẫu điền sẵn rất dễ gửi, nên có lead không nhớ đã đăng ký. Gọi lại càng sớm càng tốt.',
    paths: [
      ['Nhiều lead để thử thị trường', 'Loại Nhiều khách hơn, ít câu hỏi. Đo tỷ lệ gọi được trước khi tăng tiền.'],
      ['Ít lead nhưng rõ nhu cầu', 'Loại Mức độ ý định cao hơn, thêm một câu hỏi về nhu cầu. Chi phí mỗi lead cao hơn nhưng dễ chốt.'],
      ['Nối CRM, gửi chất lượng về', 'Lead chảy thẳng vào CRM. Trạng thái phù hợp gửi ngược về Meta.']
    ],
    diagnosis: [
      ['Lead rẻ nhưng gọi không được', 'Xem lead được gọi sau bao lâu. Thử loại biểu mẫu có bước xem lại.'],
      ['Lead không đúng nhu cầu', 'Thêm câu hỏi phân loại. Kiểm tra ảnh quảng cáo có hứa quá mức không.']
    ],
    diag: {
      'Lead rẻ nhưng gọi không được': [['Lead', '64', 'good'], ['Chi phí mỗi lead', '45.000₫', 'good'], ['Gọi được', '17', 'fix']],
      'Lead không đúng nhu cầu': [['Lead', '52', 'good'], ['Gọi được', '38', 'good'], ['Lead phù hợp', '6', 'fix']]
    },
    checks: ['Liên kết chính sách quyền riêng tư', 'Chọn loại biểu mẫu', 'Ít câu hỏi, có câu phân loại', 'Màn cảm ơn có bước tiếp theo',
      'Người gọi lại trong ngày', 'Lead tải về hoặc nối CRM', 'Cách đánh dấu lead phù hợp']
  },

  catalog: {
    formats: [
      ['cat-carousel', 'Carousel sản phẩm', 'Bảng tin Facebook và Instagram.',
        'Mỗi thẻ là một sản phẩm lấy từ danh mục: ảnh, tên, giá.'],
      ['cat-collection', 'Bộ sưu tập từ danh mục', 'Bảng tin trên điện thoại.',
        'Ảnh bìa và các sản phẩm chọn theo từng người xem.'],
      ['cat-retarget', 'Nhắc sản phẩm đã xem', 'Bảng tin và Stories.',
        'Đúng món khách đã xem hoặc bỏ trong giỏ trên website.'],
      ['cat-market', 'Marketplace', 'Lưới tin rao của Marketplace.',
        'Sản phẩm từ danh mục hiện như tin rao, kèm giá.']
    ],
    how: ['Danh mục gửi ảnh, tên, giá, tình trạng hàng',
      'Website gửi sự kiện kèm mã sản phẩm',
      'Meta chọn món hợp với từng người',
      'Khách bấm và mở đúng trang sản phẩm',
      'Đơn được ghi kèm mã và giá trị'],
    inputs: ['Danh mục sản phẩm', 'Pixel và Conversions API', 'Mã sản phẩm khớp nhau', 'Mẫu quảng cáo'],
    outputs: 'Đơn hàng và giá trị đơn theo từng sản phẩm; danh mục sai giá thì quảng cáo cũng sai',
    setup: {
      campaign: [['Lưu lượng truy cập'], ['Doanh số', 'on'], ['Mức độ nhận biết']],
      goal: 'Tối đa hóa giá trị chuyển đổi',
      where: 'Website',
      placements: [['Bảng tin', true], ['Stories', true], ['Marketplace', true], ['Audience Network', false]],
      ad: [['s6', 'r11', 'Từ danh mục'], ['s3', 'r11', 'Từ danh mục'], ['s1', 'r11', 'Từ danh mục']]
    },
    specs: [
      ['Trường bắt buộc', 'id · title · description · availability · condition · price · link · image_link · brand', 'Các trường chính của danh mục.'],
      ['Ảnh sản phẩm 1:1', '1080 × 1080 px', 'Theo khuyến nghị Carousel. Ảnh nền sạch dễ nhìn hơn.'],
      ['Sự kiện kèm mã', 'ViewContent · AddToCart · Purchase', 'Mỗi sự kiện gửi content_ids.'],
      ['Khớp mã', 'content_ids trùng id trong danh mục', 'Không khớp thì Meta không biết khách xem món nào.'],
      ['Cập nhật danh mục', 'Theo lịch hoặc qua API', 'Giá và tình trạng hàng phải đúng với website.']
    ],
    assets: [
      ['Dữ liệu', 'Tệp danh mục', 'Mỗi dòng một sản phẩm, có id, giá, ảnh.'],
      ['Sự kiện', 'Sự kiện có mã', 'ViewContent, AddToCart, Purchase kèm content_ids.'],
      ['Ảnh', 'Ảnh sản phẩm', 'Cùng nền, cùng khung để lưới nhìn gọn.'],
      ['Danh mục', 'Bộ sản phẩm', 'Nhóm món theo nhu cầu, giá hoặc tồn kho.']
    ],
    measure: [
      ['Xem sản phẩm', 'product', 'eye', 'ViewContent', 'Trang sản phẩm mở ra; sự kiện gửi kèm mã món hàng.'],
      ['Thêm vào giỏ', 'cart', 'cart', 'AddToCart', 'Món hàng vào giỏ, mã khớp với danh mục.'],
      ['Mua', 'order', 'check', 'Purchase', 'Đơn hoàn tất, kèm giá trị và mã từng món.']
    ],
    track: 'Pixel hoặc Conversions API phải gửi content_ids trùng với id trong danh mục. Nên kiểm tra tỷ lệ khớp trong Events Manager trước khi chạy.',
    bid: 'Dùng Số lượng cao nhất, hoặc Giá trị cao nhất khi đơn có giá trị rõ. Mục tiêu ROAS chỉ đặt khi đã đủ đơn.',
    caution: 'Giá trên danh mục khác giá trên website làm khách mất lòng tin. Cập nhật danh mục theo lịch.',
    paths: [
      ['Nhắc lại món đã xem', 'Nhắm người đã xem hoặc thêm vào giỏ trong vài ngày gần đây.'],
      ['Tìm khách mới bằng danh mục', 'Để Meta chọn món cho người chưa ghé website.'],
      ['Chia bộ sản phẩm', 'Tách hàng bán chạy, hàng mới, hàng giá cao để đọc kết quả riêng.']
    ],
    diagnosis: [
      ['Sản phẩm không được hiện', 'Kiểm tra danh mục có lỗi, hết hàng hoặc bị từ chối.'],
      ['Nhiều xem, ít đơn', 'Kiểm tra giá và tình trạng hàng trên danh mục có khớp website không.']
    ],
    diag: {
      'Sản phẩm không được hiện': [['Sản phẩm trong danh mục', '48', 'good'], ['Được duyệt', '31', 'fix'], ['Hết hàng', '5', 'consider']],
      'Nhiều xem, ít đơn': [['ViewContent', '3.400', 'good'], ['AddToCart', '210', 'good'], ['Purchase', '7', 'fix']]
    },
    checks: ['Danh mục có đủ trường bắt buộc', 'Ảnh sản phẩm rõ, cùng khung', 'Danh mục cập nhật theo lịch', 'Pixel gửi content_ids',
      'Conversions API gửi Purchase kèm giá trị', 'Tỷ lệ khớp mã đã kiểm tra', 'Bộ sản phẩm cho từng nhóm']
  }
};

/* ================================================================== *
 * Page 02 — choosing
 * ================================================================== */
// The six campaign objectives Meta offers.
export const OBJECTIVES = [
  {id: 'awareness', title: 'Mức độ nhận biết', icon: 'eye',
    optimise: 'Nhiều người nhìn thấy và nhớ quảng cáo.',
    where: 'Không cần đi đâu; khách xem ngay trên Bảng tin, Stories, Reels.',
    measure: 'Người tiếp cận, lượt hiển thị, tần suất, lượt xem video.',
    needs: 'Video hoặc ảnh dễ nhớ; chưa cần website.'},
  {id: 'traffic', title: 'Lưu lượng truy cập', icon: 'page',
    optimise: 'Lượt nhấp liên kết hoặc lượt xem trang đích.',
    where: 'Website, ứng dụng, hoặc khung chat.',
    measure: 'Lượt nhấp liên kết, lượt xem trang đích, CPC.',
    needs: 'Trang đích tải nhanh trên điện thoại.'},
  {id: 'engagement', title: 'Lượt tương tác', icon: 'chat',
    optimise: 'Tin nhắn, lượt xem video, lượt thích bài hoặc trang.',
    where: 'Khung chat, bài viết hoặc video ngay trong ứng dụng.',
    measure: 'Cuộc trò chuyện bắt đầu, tương tác với bài, ThruPlay.',
    needs: 'Người trực tin nhắn nếu chọn tin nhắn.'},
  {id: 'leads', title: 'Khách hàng tiềm năng', icon: 'form',
    optimise: 'Người để lại thông tin liên hệ.',
    where: 'Biểu mẫu tức thì, khung chat, website hoặc cuộc gọi.',
    measure: 'Lead, chi phí mỗi lead, lead phù hợp.',
    needs: 'Chính sách quyền riêng tư, người gọi lại, CRM.'},
  {id: 'app', title: 'Quảng bá ứng dụng', icon: 'install',
    optimise: 'Lượt cài hoặc hành động trong ứng dụng.',
    where: 'Trang ứng dụng trên kho ứng dụng.',
    measure: 'Lượt cài, sự kiện trong ứng dụng.',
    needs: 'Ứng dụng đã đăng ký với Meta và SDK hoặc công cụ đo.'},
  {id: 'sales', title: 'Doanh số', icon: 'cart',
    optimise: 'Người có khả năng mua hoặc làm hành động giá trị.',
    where: 'Website, ứng dụng, khung chat hoặc cuộc gọi.',
    measure: 'Purchase, giá trị đơn, ROAS.',
    needs: 'Pixel và Conversions API, có thể thêm danh mục.'}
];

// Five readiness stages → the ad a person at that stage should see.
export const READINESS = [
  {id: 'cold', name: 'Chưa biết', icon: 'play', state: 'Chưa từng nghe tới shop.',
    aim: 'Làm họ dừng lại và nhớ tên shop.', run: 'Reels, video ngắn', content: 'Người thật dùng sản phẩm, ba giây đầu rõ ràng.', cta: 'Tìm hiểu thêm'},
  {id: 'warm', name: 'Đã quan tâm', icon: 'creative', state: 'Đã xem video, ghé trang hoặc thích bài.',
    aim: 'Cho xem nhiều lựa chọn.', run: 'Carousel', content: 'Mỗi thẻ một món hoặc một lợi ích.', cta: 'Xem thêm'},
  {id: 'hot', name: 'Đang cân nhắc', icon: 'tag', state: 'Đang so giá, còn vài câu hỏi.',
    aim: 'Trả lời câu hỏi trước khi họ đi.', run: 'Quảng cáo nhắn tin', content: 'Ảnh có giá, câu gợi ý hỏi giá và phí giao.', cta: 'Gửi tin nhắn'},
  {id: 'lead', name: 'Đã liên hệ', icon: 'form', state: 'Đã nhắn tin hoặc để lại số.',
    aim: 'Nhắc lịch, gửi thông tin còn thiếu.', run: 'Tin nhắn nhắc, quảng cáo nhắc lại', content: 'Lịch hẹn, ưu đãi có hạn.', cta: 'Đặt ngay'},
  {id: 'customer', name: 'Đã mua', icon: 'cart', state: 'Đã có đơn.',
    aim: 'Mua lại hoặc mua thêm món khác.', run: 'Danh mục, nhắc sản phẩm liên quan', content: 'Món đi kèm, món thay thế định kỳ.', cta: 'Mua ngay'}
];

// Audiences in three families.
export const AUDIENCES = [
  {id: 'location', family: 'hard', title: 'Vị trí', icon: 'pin',
    text: 'Quốc gia, tỉnh thành, bán kính quanh cửa hàng.',
    use: 'Luôn đặt đúng khu vực giao hàng hoặc phục vụ.'},
  {id: 'age', family: 'hard', title: 'Độ tuổi tối thiểu', icon: 'person',
    text: 'Chặn người dưới một độ tuổi. Một số ngành bắt buộc độ tuổi cao hơn.',
    use: 'Khi sản phẩm không dành cho người nhỏ tuổi.'},
  {id: 'detailed', family: 'hint', title: 'Nhắm mục tiêu chi tiết', icon: 'heart',
    text: 'Sở thích, hành vi, nhân khẩu học mà Meta suy ra.',
    use: 'Làm gợi ý khởi đầu. Hệ thống có thể mở rộng ra ngoài khi thấy hiệu quả hơn.'},
  {id: 'advantage', family: 'hint', title: 'Đối tượng Advantage+', icon: 'auto',
    text: 'Meta tự tìm người, dùng gợi ý của bạn làm điểm bắt đầu.',
    use: 'Khi đã có sự kiện đo tốt và muốn hệ thống tự tìm.'},
  {id: 'customer', family: 'data', title: 'Danh sách khách hàng', icon: 'table',
    text: 'Email, số điện thoại khách cũ, được mã hóa trước khi khớp.',
    use: 'Loại trừ khách cũ, hoặc làm nguồn cho đối tượng tương tự.'},
  {id: 'visitor', family: 'data', title: 'Người vào website', icon: 'page',
    text: 'Người đã xem trang hoặc thêm vào giỏ, ghi bởi Pixel.',
    use: 'Nhắc lại món đã xem.'},
  {id: 'engager', family: 'data', title: 'Người tương tác Trang / Instagram', icon: 'like',
    text: 'Người đã thích, bình luận, lưu bài hoặc ghé trang.',
    use: 'Mời người đã quan tâm sang bước tiếp.'},
  {id: 'viewer', family: 'data', title: 'Người xem video', icon: 'play',
    text: 'Người đã xem một phần hoặc gần hết video.',
    use: 'Nhắc lại sau quảng cáo video.'},
  {id: 'messager', family: 'data', title: 'Người đã nhắn tin', icon: 'chat',
    text: 'Người đã gửi tin nhắn cho trang.',
    use: 'Nhắc người đã hỏi giá nhưng chưa mua.'},
  {id: 'lookalike', family: 'data', title: 'Đối tượng tương tự', icon: 'users',
    text: 'Người giống một nhóm nguồn, như khách đã mua.',
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
  ['ads', 'auction', 'Trả cho Meta', 'Tiền quảng cáo thực chi theo lượt hiển thị hoặc kết quả, cộng thuế nếu có.'],
  ['make', 'creative', 'Sản xuất nội dung', 'Ảnh, video dọc, bài viết, trang đích, phần cài đo lường.'],
  ['fee', 'users', 'Phí dịch vụ POWAI', 'Công dựng, theo dõi, điều chỉnh và báo cáo. Xuất hóa đơn riêng.']
];

// [key, label, icon, text]
export const BILLING = [
  ['daily', 'Ngân sách hằng ngày', 'calendar',
    'Số tiền trung bình bạn muốn chi mỗi ngày. Có ngày chi hơn, có ngày chi ít hơn, nhưng tính theo tuần vẫn bám mức đã đặt.'],
  ['lifetime', 'Ngân sách trọn đời', 'clock',
    'Tổng số tiền cho cả thời gian chạy. Cần ngày kết thúc. Meta tự phân bổ theo ngày.'],
  ['pay', 'Phương thức thanh toán', 'pay',
    'Thẻ, ví hoặc nạp trước tùy nơi. Tài khoản có thể bị trừ tiền theo ngưỡng hoặc theo kỳ.'],
  ['tax', 'Thuế', 'tag',
    'Thuế có thể được cộng vào tiền quảng cáo, tùy quốc gia và thông tin doanh nghiệp đã khai. Mức thuế hiện trên biên lai.'],
  ['invoice', 'Biên lai & hóa đơn', 'receipt',
    'Biên lai tải trong mục Thanh toán của tài khoản quảng cáo. Phí dịch vụ POWAI xuất hóa đơn riêng.']
];

// Five bid strategies.
export const BIDS = {
  volume: ['TỰ ĐỘNG', 'Số lượng cao nhất', 'Chi hết ngân sách để có nhiều kết quả nhất.',
    'Ngân sách', 'Nhiều kết quả nhất', 'Không cần số liệu trước.', 'Chi phí mỗi kết quả có thể tăng khi tăng ngân sách.',
    'Bắt đầu chiến dịch mới, chưa biết chi phí hợp lý.'],
  costcap: ['MỤC TIÊU CHI PHÍ', 'Mục tiêu chi phí trên mỗi kết quả', 'Giữ chi phí bình quân quanh một mức.',
    'Mức chi phí bình quân', 'Kết quả quanh mức đó', 'Đã biết chi phí mỗi kết quả thường gặp.', 'Đặt quá thấp thì ít được phân phối.',
    'Mục tiêu 150.000₫ mỗi lead: có lead 120.000₫, có lead 190.000₫.'],
  bidcap: ['GIỚI HẠN', 'Giới hạn giá thầu', 'Không đặt giá cao hơn một mức trong mỗi phiên đấu giá.',
    'Giá thầu tối đa', 'Kết quả trong giới hạn', 'Hiểu rõ giá trị một kết quả và cách đấu giá.', 'Dễ không chi hết ngân sách.',
    'Giới hạn 20.000₫: phiên nào cần cao hơn thì bỏ qua.'],
  roas: ['GIÁ TRỊ', 'Mục tiêu ROAS', 'Giữ tỷ lệ doanh thu trên chi phí quanh một mức.',
    'Tỷ lệ ROAS mong muốn', 'Giá trị đơn quanh mức đó', 'Sự kiện Purchase gửi kèm giá trị.', 'Đặt quá cao thì ít được phân phối.',
    'ROAS 300%: 1₫ quảng cáo mong mang về 3₫ doanh thu.'],
  value: ['GIÁ TRỊ', 'Giá trị cao nhất', 'Chi hết ngân sách để có tổng giá trị đơn cao nhất.',
    'Ngân sách', 'Tổng giá trị cao nhất', 'Purchase có giá trị đơn.', 'Có thể ít đơn hơn nhưng đơn lớn hơn.',
    'Hai đơn 500.000₫ hay một đơn 2.000.000₫: chọn tổng tiền.']
};
export const BID_ORDER = ['volume', 'costcap', 'bidcap', 'roas', 'value'];

// Funnel tiers and their metrics on one sample month.
export const SAMPLE = {impressions: 60000, reach: 24000, clicks: 960, landing: 720, convos: 110, lead: 48, qualified: 19,
  sale: 11, spend: 9000000, revenue: 14300000, allCost: 13000000};

export const KPIS = {
  impressions: ['Lượt hiển thị', 'Số lần quảng cáo hiện trên màn hình.', 'Tăng mà không có nhấp: xem lại ảnh mở đầu.'],
  reach: ['Người tiếp cận', 'Số người khác nhau đã thấy quảng cáo.', 'Ít người nhưng nhiều hiển thị: tần suất đang cao.'],
  frequency: ['Tần suất', 'Lượt hiển thị ÷ người tiếp cận.', 'Tần suất cao và CTR giảm: đổi nội dung.'],
  cpm: ['CPM', 'Chi phí cho 1.000 lượt hiển thị.', 'CPM tăng: đối tượng hẹp hoặc mùa cao điểm.'],
  clicks: ['Lượt nhấp liên kết', 'Lượt bấm dẫn ra khỏi quảng cáo.', 'Khác với tổng lượt nhấp, vốn gồm cả bấm xem ảnh, thích.'],
  ctr: ['CTR (liên kết)', 'Lượt nhấp liên kết ÷ lượt hiển thị.', 'CTR thấp: nội dung chưa khiến người xem muốn bấm.'],
  cpc: ['CPC (liên kết)', 'Tiền ÷ lượt nhấp liên kết.', 'CPC thấp chưa chắc tốt nếu khách không ở lại.'],
  landing: ['Lượt xem trang đích', 'Người bấm và trang tải xong.', 'Chênh nhiều so với lượt nhấp: trang chậm.'],
  convos: ['Số cuộc trò chuyện bắt đầu', 'Cuộc chat mới sau khi bấm quảng cáo.', 'Nhiều cuộc nhưng ít số điện thoại: xem lại kịch bản.'],
  cpconvo: ['Chi phí mỗi cuộc trò chuyện', 'Tiền ÷ cuộc trò chuyện bắt đầu.', 'Chỉ có nghĩa khi biết bao nhiêu cuộc thành đơn.'],
  lead: ['Lead', 'Người để lại thông tin liên hệ.', 'Tăng nhanh bất thường: kiểm tra lead ảo, lead trùng.'],
  cpl: ['CPL', 'Tiền ÷ lead.', 'CPL thấp mà không gọi được thì vô ích.'],
  qualified: ['Lead phù hợp', 'Lead được nhân viên xác nhận đúng nhu cầu.', 'Cần CRM ghi lại, Meta không tự biết.'],
  cpql: ['CPQL', 'Tiền ÷ lead phù hợp.', 'Chỉ số gần doanh thu hơn CPL.'],
  sale: ['Lượt mua', 'Đơn hàng được ghi nhận.', 'Đối chiếu với đơn thật trong hệ thống bán hàng.'],
  revenue: ['Doanh thu', 'Tổng giá trị đơn ghi nhận.', 'Phải gửi giá trị kèm sự kiện Purchase.'],
  roas: ['ROAS', 'Doanh thu ÷ tiền quảng cáo.', 'Chưa trừ giá vốn, phí giao, phí dịch vụ.'],
  cac: ['CAC', 'Tổng chi phí thu hút ÷ khách mới.', 'Tính cả sản xuất và phí dịch vụ, không chỉ tiền Meta.']
};

// [id, label, value, metric ids]
export const KPI_TIERS = [
  ['show', 'Hiển thị & tiếp cận', SAMPLE.impressions, ['impressions', 'reach', 'frequency', 'cpm']],
  ['click', 'Nhấp', SAMPLE.clicks, ['clicks', 'ctr', 'cpc']],
  ['land', 'Trang đích / hội thoại', SAMPLE.landing, ['landing', 'convos', 'cpconvo']],
  ['lead', 'Khách tiềm năng', SAMPLE.lead, ['lead', 'cpl', 'qualified', 'cpql']],
  ['sale', 'Đơn hàng', SAMPLE.sale, ['sale', 'revenue', 'roas', 'cac']]
];

// Measurement stations: [id, icon, name, purpose, when, io]
export const TRACKING = {
  utm: ['link', 'UTM', 'Gắn nguồn vào liên kết để công cụ phân tích biết khách đến từ quảng cáo nào.',
    'Mọi quảng cáo dẫn ra website.', 'Liên kết → phiên truy cập có nguồn'],
  catalog: ['table', 'Danh mục', 'Danh sách sản phẩm có id, giá, ảnh. Sự kiện gửi mã để khớp.',
    'Bán nhiều mã hàng, chạy quảng cáo danh mục.', 'Tệp sản phẩm → quảng cáo tự ghép'],
  pixel: ['code', 'Website + Pixel', 'Đoạn mã trên website ghi hành động của khách trong trình duyệt.',
    'Có website và muốn đo hành động sau khi bấm.', 'Hành động trên web → sự kiện'],
  capi: ['lock', 'Conversions API', 'Máy chủ của website gửi sự kiện trực tiếp cho Meta.',
    'Muốn đo ổn định hơn khi trình duyệt chặn mã. Dùng cùng Pixel, có mã khử trùng lặp.', 'Máy chủ → sự kiện'],
  events: ['chart', 'Events Manager', 'Nơi xem sự kiện đến từ đâu, có lỗi gì, khớp bao nhiêu.',
    'Luôn cần để kiểm tra trước khi chạy.', 'Sự kiện → báo cáo, tối ưu'],
  forms: ['form', 'Biểu mẫu → tải lead', 'Lead từ biểu mẫu tức thì lưu trong Meta, tải về hoặc nối CRM.',
    'Chạy quảng cáo biểu mẫu.', 'Biểu mẫu → danh sách lead'],
  inbox: ['chat', 'Tin nhắn → hộp thư', 'Cuộc chat vào hộp thư chung. Nhân viên gắn nhãn lead, đơn.',
    'Chạy quảng cáo nhắn tin.', 'Tin nhắn → nhãn → CRM'],
  crm: ['users', 'CRM', 'Nơi ghi trạng thái thật của từng khách: phù hợp, đã mua.',
    'Muốn biết lead nào thành tiền.', 'Lead → trạng thái'],
  offline: ['upload', 'Gửi kết quả về Meta', 'Trạng thái từ CRM gửi ngược về qua Conversions API.',
    'Muốn Meta tối ưu cho lead phù hợp hoặc đơn thật.', 'CRM → sự kiện → tối ưu']
};

// [event name, label, note, confirmed?]
export const EVENTS = [
  ['PageView', 'Xem trang', 'Mọi trang tải xong. Chỉ cho biết có người ghé.'],
  ['ViewContent', 'Xem sản phẩm', 'Trang một món hàng. Kèm mã sản phẩm nếu có danh mục.'],
  ['Contact', 'Liên hệ', 'Bấm gọi, bấm nhắn. Là lượt bấm, chưa phải cuộc gọi thành công.'],
  ['Bắt đầu cuộc trò chuyện', 'Mở chat', 'Meta tự đếm khi quảng cáo nhắn tin mở cuộc chat mới.'],
  ['Lead', 'Để lại thông tin', 'Gửi biểu mẫu trên web hoặc biểu mẫu tức thì.'],
  ['CompleteRegistration', 'Hoàn tất đăng ký', 'Đăng ký tài khoản, đăng ký sự kiện.'],
  ['AddToCart', 'Thêm vào giỏ', 'Món hàng vào giỏ. Khách chưa trả tiền.'],
  ['Purchase', 'Mua hàng', 'Đơn hoàn tất, kèm giá trị. Đối chiếu với đơn thật.', true],
  ['Lead phù hợp', 'Lead đã xác nhận', 'Nhân viên xác nhận trong CRM, gửi về qua Conversions API.', true]
];

// Ten steps: [title, what, output]
export const ROLLOUT = [
  ['Tìm hiểu', 'Doanh nghiệp bán gì, cho ai, khu vực nào, đang nhận khách qua đâu.', 'Bản tóm tắt mục tiêu'],
  ['Kiểm tra tài khoản', 'Tài khoản doanh nghiệp, Trang, Instagram, tài khoản quảng cáo, quyền truy cập.', 'Danh sách việc cần sửa'],
  ['Chọn cách chạy', 'Mục tiêu chiến dịch, điểm đến, kiểu quảng cáo cho từng nhóm khách.', 'Sơ đồ chiến dịch'],
  ['Cài đo lường', 'Pixel, Conversions API, xác minh tên miền, sự kiện, nối biểu mẫu hoặc hộp thư.', 'Sự kiện chạy thử đã ghi'],
  ['Chuẩn bị nội dung', 'Ảnh 4:5, video 9:16, chữ, lời chào, câu hỏi biểu mẫu.', 'Bộ nội dung đã duyệt'],
  ['Dựng chiến dịch', 'Chiến dịch, nhóm quảng cáo, quảng cáo, ngân sách, vị trí.', 'Chiến dịch chờ bật'],
  ['Kiểm tra trước khi bật', 'Liên kết, sự kiện, chính sách quảng cáo, người trực tin.', 'Biên bản kiểm tra'],
  ['Chạy & theo dõi', 'Theo dõi hằng ngày trong tuần đầu, không sửa vội.', 'Ghi chú tuần đầu'],
  ['Điều chỉnh', 'Đổi nội dung, dời ngân sách, tách hoặc gộp nhóm theo số liệu.', 'Nhật ký thay đổi'],
  ['Báo cáo', 'Đọc từ lượt hiển thị tới đơn, đối chiếu với CRM.', 'Báo cáo định kỳ']
];
export const PHASES = [['Chuẩn bị', [0, 1, 2, 3]], ['Dựng chiến dịch', [4, 5, 6]], ['Chạy & tối ưu', [7, 8, 9]]];

export const PREP = [
  'Tài khoản doanh nghiệp (Business Portfolio)',
  'Trang Facebook đang hoạt động',
  'Tài khoản Instagram nối với Trang',
  'Tài khoản quảng cáo của chính doanh nghiệp',
  'Quyền quản trị cấp cho người vận hành',
  'Phương thức thanh toán hợp lệ',
  'Thông tin xuất hóa đơn, mã số thuế',
  'Tên miền đã xác minh',
  'Pixel đã cài trên website',
  'Conversions API gửi sự kiện từ máy chủ',
  'Danh mục sản phẩm (nếu bán nhiều mã)',
  'Người trực tin nhắn trong giờ chạy',
  'Người gọi lại lead trong ngày',
  'Video dọc 9:16',
  'Ảnh 4:5 và 1:1'
];
export const PREP_GROUPS = [
  ['Tài khoản & quyền', 'shield', [0, 1, 2, 3, 4]],
  ['Thanh toán', 'wallet', [5, 6]],
  ['Website & đo lường', 'code', [7, 8, 9, 10]],
  ['Người & nội dung', 'chat', [11, 12, 13, 14]]
];

export const FAQ = [
  ['Chạy Facebook Ads tối thiểu bao nhiêu tiền?',
    'Meta có mức ngân sách tối thiểu tùy loại tiền và cách tối ưu, hiện trong Trình quản lý quảng cáo khi bạn đặt. Mức đủ để học thì phụ thuộc chi phí mỗi kết quả: cần đủ tiền để có vài chục kết quả mỗi tuần.'],
  ['Bao lâu thì thấy kết quả?',
    'Quảng cáo có thể hiện trong vài giờ sau khi được duyệt. Tuần đầu hệ thống còn học, kết quả dao động. Nên đọc số sau ít nhất một đến hai tuần, không sửa liên tục.'],
  ['Không có website có chạy được không?',
    'Được. Quảng cáo nhắn tin và biểu mẫu tức thì không cần website. Nhưng không có website thì khó chạy danh mục và khó đo đơn hàng.'],
  ['Nên chọn nhắn tin hay biểu mẫu?',
    'Nhắn tin hợp khi khách cần hỏi nhiều và có người trực. Biểu mẫu hợp khi cần số điện thoại để gọi và có người gọi lại nhanh. Có thể thử cả hai với cùng ngân sách.'],
  ['Nhiều tin nhắn nhưng ít đơn là do đâu?',
    'Thường do trả lời chậm, thiếu bảng giá, hoặc quảng cáo hứa khác thực tế. Đọc lại các cuộc chat và đo thời gian trả lời đầu tiên.'],
  ['Lead từ biểu mẫu có đáng tin không?',
    'Biểu mẫu điền sẵn rất dễ gửi, nên có lead không nhớ đã đăng ký. Gọi lại sớm, thêm câu hỏi phân loại, hoặc dùng loại biểu mẫu có bước xem lại.'],
  ['Pixel và Conversions API khác nhau thế nào?',
    'Pixel chạy trên trình duyệt của khách. Conversions API gửi từ máy chủ, ít bị chặn hơn. Nên dùng cả hai và khử trùng lặp để không đếm hai lần.'],
  ['Vì sao số trong Meta khác số đơn thật?',
    'Meta ghi nhận theo khoảng thời gian sau khi xem hoặc bấm, có thể trùng với kênh khác. Đơn thật phải đối chiếu trong hệ thống bán hàng hoặc CRM.'],
  ['Có nên bật Advantage+?',
    'Advantage+ để Meta tự chọn đối tượng, vị trí hoặc nội dung. Hợp khi đã đo tốt. Khi đo còn sai, hệ thống sẽ tối ưu theo con số sai.'],
  ['Nhắm đối tượng thật hẹp có tốt hơn?',
    'Không hẳn. Đối tượng quá hẹp làm chi phí tăng và hệ thống ít chỗ học. Chỉ khóa những gì thật sự bắt buộc như khu vực và độ tuổi.'],
  ['Tài khoản quảng cáo bị hạn chế thì làm gì?',
    'Đọc thông báo trong Account Quality để biết lý do. Có thể yêu cầu xem xét lại nếu cho rằng có nhầm lẫn. Không tạo tài khoản mới để lách hạn chế.'],
  ['Quảng cáo bị từ chối thì sao?',
    'Đọc lý do, sửa nội dung hoặc trang đích theo chính sách, rồi gửi lại. Nếu thấy từ chối sai có thể yêu cầu xem xét.'],
  ['Ai sở hữu tài khoản quảng cáo?',
    'Doanh nghiệp nên sở hữu tài khoản doanh nghiệp, Trang, tài khoản quảng cáo và Pixel. POWAI được cấp quyền để vận hành, dừng hợp tác thì thu hồi quyền.'],
  ['Phí dịch vụ POWAI có nằm trong ngân sách Meta không?',
    'Không. Tiền quảng cáo trả thẳng cho Meta qua phương thức thanh toán của doanh nghiệp. Phí dịch vụ POWAI xuất hóa đơn riêng.']
];
export const FAQ_TOPICS = [
  ['Chi phí & thời gian', 'wallet', [0, 1, 13]],
  ['Chọn cách chạy', 'route', [2, 3, 8, 9]],
  ['Kết quả & đo lường', 'chart', [4, 5, 6, 7]],
  ['Tài khoản & chính sách', 'shield', [10, 11, 12]]
];

// Goals for the contact form select.
export const CONTACT_GOALS = [
  ['sales', 'Bán hàng qua website'], ['messages', 'Nhận tin nhắn hỏi mua'], ['leads', 'Thu số điện thoại khách'],
  ['awareness', 'Tăng nhận biết thương hiệu'], ['catalog', 'Chạy danh mục sản phẩm']
];

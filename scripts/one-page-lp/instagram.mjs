// Instagram Ads — one landing page.
// Instagram ads are bought in Meta Ads Manager, so every platform fact here
// is the one already checked for the Facebook Ads pages (facebook-ads-lp/
// data.mjs, same CHECKED date and SOURCES). Numbers that are not a platform
// limit are samples and say so.
import {SOURCES, CHECKED} from '../facebook-ads-lp/data.mjs';
import {fb, site, chat, signal} from './mocks.mjs';

const MC = '/dich-vu/quang-cao-da-kenh/';

export default {
  slug: 'instagram-ads',
  channel: 'instagram',
  name: 'Instagram Ads',
  checked: CHECKED,
  docName: 'tài liệu Meta',
  SOURCES,
  sourceLabel: 'Tài liệu Meta:',
  meta: {
    title: 'Instagram Ads: định dạng, mục tiêu và đo lường',
    description: 'Quảng cáo Instagram trên Bảng tin, Stories, Reels và Carousel: khi nào nên dùng, thông số nội dung, '
      + 'mục tiêu chiến dịch trong Meta Ads Manager, cách đo và triển khai cùng POWAI.'
  },
  hero: {
    sub: 'Đưa sản phẩm vào <em>những gì khách đang lướt</em> trên Instagram.',
    lead: 'Quảng cáo Instagram chạy trong Meta Ads Manager, cùng tài khoản với Facebook Ads. Khác nhau ở cách khách xem: '
      + 'ảnh dọc trên Bảng tin, Stories và Reels toàn màn hình, Carousel vuốt ngang. Trang này gom đủ trong một chỗ.',
    cta: 'Xem bốn định dạng',
    rungs: [['image', 'Bảng tin', 'Ảnh, video 4:5'], ['mobile', 'Stories', 'Toàn màn hình 9:16'],
      ['play', 'Reels', 'Video dọc có tiếng'], ['layers', 'Carousel', 'Nhiều thẻ vuốt ngang'], ['cart', 'Đơn & tư vấn', 'Đo bằng Pixel, CRM']]
  },
  when: {
    title: 'Hợp với sản phẩm cần được nhìn thấy.',
    lead: 'Khách không đi tìm quảng cáo trên Instagram: họ đang lướt. Quảng cáo phải làm họ dừng lại, rồi dẫn tới trang, khung chat hoặc form.',
    journey: [['eye', 'Khách lướt Bảng tin, Stories, Reels'], ['image', 'Thấy ảnh hoặc video của shop'],
      ['tap', 'Bấm nút: xem trang, nhắn tin, để lại số'], ['chat', 'Shop trả lời, tư vấn'], ['check', 'Đơn hoặc lead ghi vào CRM']],
    inputs: [['image', 'Ảnh, video dọc'], ['creative', 'Văn bản ngắn'], ['page', 'Trang đích hoặc khung chat'], ['code', 'Meta Pixel']],
    core: 'Meta chọn người xem theo mục tiêu và đối tượng',
    outputs: [['eye', 'Lượt xem, lượt tiếp cận'], ['tap', 'Lượt nhấp, tin nhắn, lead'], ['cart', 'Đơn khi đã gắn Pixel']],
    fit: ['Sản phẩm đẹp khi nhìn: mỹ phẩm, thời trang, đồ trang trí, đồ ăn', 'Có ảnh hoặc video thật, quay dọc được',
      'Khách ra quyết định nhanh hoặc cần xem nhiều mẫu', 'Đã có Facebook Ads: cùng tài khoản, thêm vị trí Instagram'],
    notFit: ['Chỉ có ảnh ngang, chữ nhiều, không quay được video', 'Dịch vụ cần giải thích dài mới hiểu',
      'Chưa có trang đích hay người trực tin nhắn', 'Chỉ muốn tăng người theo dõi mà không đo đơn'],
    src: ['placements', 'objectives']
  },
  formats: {
    eyebrow: 'BỐN ĐỊNH DẠNG',
    title: 'Khách thấy quảng cáo ở đâu.',
    lead: 'Chọn một vị trí để xem quảng cáo nằm giữa nội dung thật ra sao.',
    items: [
      {key: 'feed', label: 'Bảng tin Instagram', icon: 'image', stage: () => fb('ig-feed'),
        where: 'Giữa các bài đăng của những người khách đang theo dõi.',
        what: 'Ảnh hoặc video 4:5, chú thích ngắn, thanh nút ngay dưới ảnh.',
        more: [['Thông số', 'Ảnh 4:5, 1440 × 1800 px; ảnh 1:1 vẫn dùng được.']]},
      {key: 'story', label: 'Instagram Stories', icon: 'mobile', stage: () => fb('ig-story'),
        where: 'Giữa các tin của người khách theo dõi.',
        what: 'Khung dọc 9:16. Khách chạm để xem tiếp hoặc vuốt để bỏ qua.',
        more: [['Thông số', 'Ảnh hoặc video 9:16, 1440 × 2560 px. Chừa trống vùng trên và dưới cho tên và nút.']]},
      {key: 'reels', label: 'Instagram Reels', icon: 'play', stage: () => fb('ig-reels'),
        where: 'Trong trình xem Reels, mở từ tab Reels, Bảng tin hoặc Khám phá.',
        what: 'Video dọc 9:16 có tiếng, cột nút bên phải, nút kêu gọi ở dưới.',
        more: [['Văn bản chính', 'Khuyến nghị 44 ký tự cho Reels Instagram.']]},
      {key: 'carousel', label: 'Carousel', icon: 'layers', stage: () => fb('carousel-ig'),
        where: 'Bảng tin Instagram; khách vuốt ngang để xem.',
        what: 'Nhiều thẻ ảnh hoặc video, mỗi thẻ một sản phẩm hoặc một lợi ích.',
        more: [['Dùng khi', 'Có nhiều mẫu, hoặc cần kể theo thứ tự: vấn đề → cách dùng → kết quả.']]}
    ],
    note: {label: 'CÙNG TÀI KHOẢN VỚI FACEBOOK', ic: 'layers',
      text: 'Instagram là một nhóm vị trí trong Meta Ads Manager. Một chiến dịch có thể chạy cả Facebook và Instagram; tắt vị trí nào thì quảng cáo không hiện ở đó. Chi tiết từng vị trí xem trang Facebook Ads.'},
    src: ['placements', 'imgFeed', 'story', 'reels', 'carousel']
  },
  prep: {
    title: 'Nội dung quay dọc từ đầu.',
    lead: 'Một bộ nội dung cho ba khung: 4:5 cho Bảng tin, 9:16 cho Stories và Reels, thêm 1:1 khi cần.',
    principle: 'Quay dọc từ đầu, không cắt từ video ngang. Chữ và logo nằm trong vùng an toàn; ba giây đầu thấy sản phẩm.',
    texts: [{label: 'Văn bản chính Reels (khuyến nghị)', limit: 44, text: 'Nến gỗ tuyết tùng, đốt đến 40 giờ.'}],
    frames: [
      {w: 1440, h: 1800, ratio: '4:5', label: 'Bảng tin', img: 's-desk'},
      {w: 1440, h: 2560, ratio: '9:16', label: 'Stories, Reels', img: 's-tall', video: true}
    ],
    tiles: [['layers', 'Carousel', 'Nhiều thẻ cùng tỷ lệ'], ['creative', 'Phụ đề', 'Nhiều người xem không bật tiếng'],
      ['page', 'Trang đích', 'Mở đúng món trong ảnh'], ['code', 'Meta Pixel', 'Đo đơn và lead trên website']],
    assets: [['4:5', 'Ảnh hoặc video Bảng tin', 'Sản phẩm rõ, ít chữ.'], ['9:16', 'Video dọc', 'Có tiếng, có phụ đề.'],
      ['Chữ', 'Văn bản chính ngắn', 'Câu đầu nói lợi ích.'], ['Trang', 'Trang đích', 'Tải nhanh trên điện thoại.']],
    specs: [['Ảnh Bảng tin', '4:5 · 1440 × 1800 px', 'Tỷ lệ khuyến nghị cho Bảng tin; 1:1 vẫn dùng được.'],
      ['Stories, Reels', '9:16 · 1440 × 2560 px', 'Tỷ lệ khuyến nghị cho Stories và Reels.'],
      ['Văn bản chính Reels', '44 ký tự', 'Khuyến nghị cho Reels Instagram; dài hơn có thể bị cắt.'],
      ['Vùng an toàn', 'Trên và dưới khung 9:16', 'Tên trang và nút nằm ở đó; đừng đặt chữ quan trọng.']],
    src: ['imgFeed', 'story', 'reels', 'carousel']
  },
  goals: {
    title: 'Chọn mục tiêu, rồi mới chọn người xem.',
    lead: 'Meta có sáu mục tiêu chiến dịch; ba mục tiêu hay dùng cho Instagram bên dưới. Nhóm màu thứ hai là cách chọn người xem.',
    items: [
      {key: 'awareness', group: 'Mục tiêu', groupColor: '#edb1d8', label: 'Mức độ nhận biết', icon: 'eye', stage: () => fb('ig-reels'),
        facts: [['Tối ưu cho', 'Nhiều người nhìn thấy và nhớ quảng cáo.'], ['Đo bằng', 'Người tiếp cận, tần suất, lượt xem video.']]},
      {key: 'traffic', group: 'Mục tiêu', groupColor: '#edb1d8', label: 'Lưu lượng truy cập', icon: 'page', stage: () => site(),
        facts: [['Tối ưu cho', 'Lượt nhấp liên kết hoặc lượt xem trang đích.'], ['Đo bằng', 'Lượt xem trang đích, CPC.'], ['Cần', 'Trang đích tải nhanh trên điện thoại.']]},
      {key: 'leads', group: 'Mục tiêu', groupColor: '#edb1d8', label: 'Khách hàng tiềm năng', icon: 'form', stage: () => chat(),
        facts: [['Tối ưu cho', 'Người để lại thông tin hoặc bắt đầu nhắn tin.'], ['Đo bằng', 'Lead, lead phù hợp trong CRM.'], ['Cần', 'Người trực tin nhắn, người gọi lại.']]},
      {key: 'sales', group: 'Mục tiêu', groupColor: '#edb1d8', label: 'Doanh số', icon: 'cart', stage: () => fb('carousel-ig'),
        facts: [['Tối ưu cho', 'Người có khả năng mua.'], ['Đo bằng', 'Purchase, giá trị đơn, ROAS.'], ['Cần', 'Pixel và Conversions API.']]},
      {key: 'engaged', group: 'Người xem', groupColor: '#85e1c1', label: 'Người đã tương tác', icon: 'heart', stage: () => signal('viewer'),
        stageTag: 'DẤU HIỆU', facts: [['Là ai', 'Người đã xem video, thích hoặc lưu bài của tài khoản.'], ['Dùng để', 'Nói tiếp bằng cách dùng, đánh giá, ưu đãi.']]},
      {key: 'visitors', group: 'Người xem', groupColor: '#85e1c1', label: 'Khách đã vào website', icon: 'page', stage: () => signal('visitor'),
        stageTag: 'DẤU HIỆU', facts: [['Là ai', 'Người đã ghé trang, ghi nhận bằng Meta Pixel.'], ['Dùng để', 'Nhắc lại món đã xem, loại người đã mua.']]},
      {key: 'customers', group: 'Người xem', groupColor: '#85e1c1', label: 'Danh sách khách', icon: 'users', stage: () => signal('customer'),
        stageTag: 'DẤU HIỆU', facts: [['Là ai', 'Khách cũ tải lên làm đối tượng tùy chỉnh.'], ['Dùng để', 'Loại trừ, hoặc tìm người giống họ.']]}
    ],
    note: {label: 'ĐỐI TƯỢNG LÀ GỢI Ý', ic: 'users', text: 'Với Advantage+, đối tượng bạn chọn là gợi ý; Meta có thể hiển thị cho người ngoài nhóm đó. Muốn giới hạn cứng thì dùng phần kiểm soát đối tượng.'},
    src: ['objectives', 'advAudience', 'controls', 'custom']
  },
  measure: {
    title: 'Đọc từ lượt xem tới đơn đã giao.',
    lead: 'Bấm từng tầng để xem chỉ số của tầng đó. Hai tầng cuối phải lấy từ CRM, Meta không tự biết.',
    tiers: [
      ['view', 'Xem', '60.000', [['Lượt hiển thị', '60.000', 'Số lần quảng cáo hiện ra.'], ['Người tiếp cận', '24.000', 'Số người khác nhau đã thấy.']]],
      ['click', 'Nhấp · nhắn', '960', [['Lượt nhấp liên kết', '960', 'Người bấm sang trang.'], ['Cuộc trò chuyện', '110', 'Người bắt đầu nhắn tin.']]],
      ['lead', 'Lead', '48', [['Lead', '48', 'Người để lại thông tin.'], ['Lead phù hợp', '19', 'Nhân viên xác nhận trong CRM.']]],
      ['sale', 'Đơn', '21', [['Đơn đã giao', '21', 'Đối chiếu trong CRM hoặc hệ thống bán hàng.'], ['ROAS', 'Doanh thu ÷ chi tiêu', 'Chưa trừ giá vốn và phí dịch vụ.']]]
    ],
    tips: {view: 'Tần suất cao mà nhấp thấp: tệp nhỏ hoặc nội dung lặp.', lead: 'Lead tăng mà lead phù hợp không tăng: thêm câu hỏi phân loại.'},
    note: {label: 'CẦN PIXEL VÀ CONVERSIONS API', ic: 'code', text: 'Muốn thấy đơn và lead trên website trong báo cáo, gắn Meta Pixel và gửi sự kiện qua Conversions API. Lead trong CRM đối chiếu thủ công hoặc qua kết nối CRM.'},
    src: ['pixel', 'capi', 'events', 'crmLeads']
  },
  rollout: {
    title: 'Sáu bước từ tài khoản tới báo cáo.',
    steps: [['Kiểm tra tài khoản', 'Tài khoản quảng cáo, trang Facebook và tài khoản Instagram đã liên kết.', 'Danh sách việc cần sửa'],
      ['Chọn mục tiêu', 'Mục tiêu chiến dịch, vị trí Instagram, nhóm người xem.', 'Sơ đồ chiến dịch'],
      ['Cài đo lường', 'Meta Pixel, Conversions API, UTM, CRM.', 'Sự kiện chạy thử đã ghi'],
      ['Làm nội dung', 'Ảnh 4:5, video 9:16 có phụ đề, văn bản ngắn.', 'Bộ nội dung đã duyệt nội bộ'],
      ['Chạy & theo dõi', 'Đọc số hằng ngày tuần đầu; người trực tin nhắn sẵn sàng.', 'Ghi chú tuần đầu'],
      ['Điều chỉnh & báo cáo', 'Đổi nội dung, dời ngân sách, đối chiếu CRM.', 'Báo cáo định kỳ']],
    icons: ['shield', 'target', 'code', 'image', 'play', 'chart'],
    phases: [['Chuẩn bị', [0, 1, 2]], ['Chạy', [3, 4]], ['Tối ưu', [5]]],
    checks: ['Tài khoản Instagram liên kết với trang', 'Ảnh 4:5 và video 9:16', 'Phụ đề cho video', 'Chữ trong vùng an toàn',
      'Trang đích mở đúng món', 'Meta Pixel và Conversions API', 'Người trực tin nhắn', 'CRM ghi lead và đơn'],
    src: ['placements', 'pixel']
  },
  faq: {
    items: [
      ['Chạy Instagram có cần tài khoản riêng không?', 'Không. Quảng cáo Instagram tạo trong Meta Ads Manager, cùng tài khoản quảng cáo với Facebook. Cần liên kết tài khoản Instagram với trang để quảng cáo hiện đúng tên.'],
      ['Ảnh đẹp là đủ để chạy Instagram?', 'Ảnh cần giúp khách hiểu sản phẩm, nhưng còn phải có thông điệp, điểm đến và đo lường. Thử các góc giá trị khác nhau, không chỉ đổi màu của cùng một thiết kế.'],
      ['Nên chọn Bảng tin hay Reels?', 'Có video dọc thì thử Reels và Stories; chỉ có ảnh thì bắt đầu với Bảng tin và Carousel. Để Meta tự chọn vị trí khi chưa biết vị trí nào tốt hơn.'],
      ['Tăng người theo dõi có giúp bán hàng?', 'Không trực tiếp. Người theo dõi là tín hiệu; đo tiếp tin nhắn, lead phù hợp và đơn đã giao.'],
      ['Có đo được đơn hàng không?', 'Có, khi website gắn Meta Pixel và Conversions API. Đơn qua tin nhắn hoặc điện thoại cần ghi trong CRM.'],
      ['Chi phí tính thế nào?', 'Meta tính phí theo lượt hiển thị hoặc hành động tùy mục tiêu và cách đặt giá thầu. Chi tiết ngân sách, thuế và hóa đơn xem trang Facebook Ads, phần Chi phí & hiệu quả.']
    ],
    topics: [['Bắt đầu', 'globe', [0, 2, 5]], ['Đo lường', 'chart', [1, 3, 4]]],
    src: ['placements', 'charges', 'pixel']
  },
  contactGoals: [['awareness', 'Nhiều người biết tới'], ['traffic', 'Đưa khách vào website'], ['leads', 'Thu lead, tin nhắn'], ['sales', 'Bán hàng']],
  recap: {
    title: 'Ba việc trước khi chạy Instagram.',
    items: [['Chọn vị trí', 'Bảng tin, Stories, Reels hay Carousel.', '#dinh-dang', 'image'],
      ['Làm nội dung dọc', 'Ảnh 4:5, video 9:16 có phụ đề.', '#chuan-bi', 'play'],
      ['Đo tới đơn', 'Pixel, Conversions API, CRM.', '#do-luong', 'chart']]
  },
  sisters: [['Facebook Ads', 'Cùng tài khoản với Instagram: ba trang chi tiết về định dạng, mục tiêu và chi phí.', MC + 'facebook-ads/'],
    ['TikTok Ads', 'Video dọc giữa những video khách đang lướt.', MC + 'tiktok-ads/'],
    ['Remarketing', 'Nói tiếp với người đã xem, đã ghé trang.', MC + 'remarketing/']]
};


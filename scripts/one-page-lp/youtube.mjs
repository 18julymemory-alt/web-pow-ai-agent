// YouTube Ads — one landing page. YouTube ads run as Google Ads Video and
// Demand Gen campaigns; facts come from Google Ads Help as read on CHECKED.
import {google, site, signal} from './mocks.mjs';

const S = id => 'https://support.google.com/google-ads/answer/' + id;
const MC = '/dich-vu/quang-cao-da-kenh/';

export const CHECKED = '2026-09-29';

export const SOURCES = {
  formats: [S('2375464'), 'Các định dạng quảng cáo video'],
  nonskip: [S('11462260'), 'In-stream không thể bỏ qua'],
  goals: [S('10197127'), 'Mục tiêu chiến dịch Video'],
  reach: [S('10581234'), 'Chiến dịch Video Reach'],
  demandGen: [S('15110871'), 'Video Action chuyển sang Demand Gen'],
  dgAbout: [S('13695777'), 'Chiến dịch Demand Gen'],
  specs: [S('13704860'), 'Thông số tài sản Demand Gen'],
  conversions: [S('1722022'), 'Đo lường chuyển đổi'],
  segments: [S('2472738'), 'Tệp dữ liệu của bạn']
};

export default {
  slug: 'youtube-ads',
  channel: 'youtube',
  name: 'YouTube Ads',
  checked: CHECKED,
  docName: 'tài liệu Google Ads',
  SOURCES,
  sourceLabel: 'Tài liệu Google:',
  meta: {
    title: 'YouTube Ads: định dạng video, mục tiêu và đo lường',
    description: 'Quảng cáo YouTube: in-stream bỏ qua được và không bỏ qua được, bumper, in-feed, Shorts, masthead; '
      + 'chọn mục tiêu lượt xem, độ phủ hay chuyển đổi (Demand Gen), cách đo và triển khai cùng POWAI.'
  },
  hero: {
    sub: 'Chọn cách kể chuyện theo <em>điều bạn cần người xem làm</em>.',
    lead: 'Quảng cáo YouTube chạy trong Google Ads. Mỗi vị trí video có nhịp kể và cách đo khác nhau: '
      + 'muốn nhiều lượt xem, muốn nhiều người nhớ tên, hay muốn đơn hàng. Trang này đi từ định dạng tới đo lường.',
    cta: 'Xem sáu định dạng',
    rungs: [['play', 'In-stream', 'Bỏ qua sau 5 giây'], ['bolt', 'Bumper', 'Tối đa 6 giây'], ['search', 'In-feed', 'Ảnh thu nhỏ + tiêu đề'],
      ['mobile', 'Shorts', 'Video dọc'], ['convert', 'Demand Gen', 'Khi cần chuyển đổi']]
  },
  when: {
    title: 'Hợp khi sản phẩm cần được xem mới hiểu.',
    lead: 'Video giải thích, trình diễn và tạo ghi nhớ tốt hơn ảnh. Đổi lại là chi phí làm video và thời gian từ lúc xem tới lúc mua dài hơn.',
    journey: [['play', 'Khách xem video trên YouTube'], ['eye', 'Thấy quảng cáo trước, giữa hoặc trong danh sách video'],
      ['tap', 'Xem tiếp, bấm vào kênh hoặc website'], ['search', 'Tìm tên thương hiệu về sau'], ['check', 'Đơn hoặc lead ghi nhận']],
    inputs: [['video', 'Video trên YouTube'], ['target', 'Mục tiêu chiến dịch'], ['users', 'Đối tượng'], ['page', 'Trang đích']],
    core: 'Google phân phối video theo mục tiêu và giá thầu',
    outputs: [['eye', 'Lượt xem, độ phủ, tần suất'], ['tap', 'Lượt nhấp, lượt tìm thương hiệu'], ['cart', 'Chuyển đổi khi chạy Demand Gen và đã đo']],
    fit: ['Sản phẩm cần trình diễn: đồ gia dụng, khóa học, phần mềm', 'Ra mắt sản phẩm, cần nhiều người biết nhanh',
      'Đã có video hoặc làm được video ngắn đều đặn', 'Muốn nhắc lại người đã ghé website bằng video'],
    notFit: ['Chưa có video và chưa có ngân sách làm video', 'Chỉ muốn đơn ngay trong tuần đầu',
      'Không đo được website, không có trang đích', 'So video với tìm kiếm chỉ bằng chi phí mỗi lead'],
    src: ['formats', 'goals']
  },
  formats: {
    eyebrow: 'SÁU ĐỊNH DẠNG',
    title: 'Video của bạn xuất hiện ở đâu.',
    lead: 'Chọn một định dạng để xem vị trí và thời lượng. Không có một độ dài chung cho mọi định dạng.',
    items: [
      {key: 'skip', label: 'In-stream bỏ qua được', icon: 'play', stage: () => google('vid-skip'),
        where: 'Trước, giữa hoặc sau video khác.', what: 'Người xem có thể bỏ qua sau 5 giây.',
        more: [['Lưu ý', '5 giây là lúc có thể bỏ qua, không phải độ dài video. Đưa điều quan trọng vào đầu.']]},
      {key: 'nonskip', label: 'In-stream không bỏ qua', icon: 'video', stage: () => google('vid-nonskip'),
        where: 'Trước, giữa hoặc sau video khác.', what: 'Không có nút bỏ qua; loại tiêu chuẩn dài 7–15 giây.',
        more: [['Lưu ý', 'Quảng cáo in-stream không bỏ qua dài tối đa 60 giây tùy trường hợp; kiểm tra phân nhóm đang chọn.']]},
      {key: 'bumper', label: 'Bumper', icon: 'bolt', stage: () => google('vid-bumper'),
        where: 'Trước, giữa hoặc sau video khác.', what: 'Video không bỏ qua, dài 5–6 giây.',
        more: [['Dùng khi', 'Một thông điệp ngắn để nhắc tên thương hiệu.']]},
      {key: 'infeed', label: 'In-feed', icon: 'search', stage: () => google('vid-infeed'),
        where: 'Kết quả tìm kiếm và các luồng khám phá của YouTube.', what: 'Ảnh thu nhỏ, tiêu đề và mô tả; người xem bấm để xem.'},
      {key: 'shorts', label: 'Shorts', icon: 'mobile', stage: () => google('shorts'),
        where: 'Giữa các video Shorts trên điện thoại.', what: 'Video dọc 9:16; người xem có thể lướt qua.'},
      {key: 'masthead', label: 'Masthead', icon: 'layers', stage: () => google('masthead'),
        where: 'Vị trí nổi bật trên trang chủ YouTube.', what: 'Cách mua và điều kiện khác chiến dịch video thường.',
        more: [['Lưu ý', 'Hỏi điều kiện đặt mua trước khi lên kế hoạch.']]}
    ],
    src: ['formats', 'nonskip']
  },
  prep: {
    title: 'Ba bản video cho ba khung.',
    lead: 'Ngang cho in-stream, dọc cho Shorts, vuông khi chiến dịch cần. Video phải được tải lên YouTube.',
    principle: 'Dựng bản dọc riêng, không thu nhỏ video ngang. Năm giây đầu nói rõ chủ đề; có phụ đề vì nhiều người xem không bật tiếng.',
    frames: [
      {w: 1920, h: 1080, ratio: '16:9', label: 'In-stream, in-feed', img: 's-hero', video: true},
      {w: 1080, h: 1920, ratio: '9:16', label: 'Shorts', img: 's-tall', video: true},
      {w: 1080, h: 1080, ratio: '1:1', label: 'Vuông', img: 's6', video: true}
    ],
    tiles: [['play', 'Video trên YouTube', 'Kênh của doanh nghiệp'], ['creative', 'Phụ đề', 'Đọc được trên điện thoại'],
      ['image', 'Ảnh thu nhỏ', 'Cho in-feed'], ['page', 'Trang đích', 'Cho người muốn tìm hiểu thêm']],
    assets: [['16:9', 'Bản ngang', 'Cho in-stream.'], ['9:16', 'Bản dọc', 'Cho Shorts.'], ['1:1', 'Bản vuông', 'Khi chiến dịch cần.'],
      ['Chữ', 'Tiêu đề, mô tả', 'Cho in-feed và nút kêu gọi.']],
    specs: [['Bản ngang', '16:9 · gợi ý 1920 × 1080 px', 'Gợi ý xuất file của POWAI cho video ngang.'],
      ['Bản dọc', '9:16 · gợi ý 1080 × 1920 px', 'Dựng riêng cho Shorts.'],
      ['Bản vuông', '1:1 · gợi ý 1080 × 1080 px', 'Khi vị trí hoặc chiến dịch cần.'],
      ['Bumper', '5–6 giây', 'Không bỏ qua được.'], ['In-stream không bỏ qua', '7–15 giây (tiêu chuẩn)', 'Theo tài liệu Google.'],
      ['Nguồn video', 'Video lưu trên YouTube', 'Kiểm tra quyền dùng nhạc và hình ảnh.']],
    src: ['formats', 'nonskip', 'specs']
  },
  goals: {
    title: 'Lượt xem, độ phủ hay chuyển đổi.',
    lead: 'Mục tiêu quyết định định dạng và cách tính phí. Nhóm màu thứ hai là người xem.',
    items: [
      {key: 'views', group: 'Mục tiêu', groupColor: '#f4adad', label: 'Lượt xem', icon: 'play', stage: () => google('vid-skip'),
        facts: [['Chiến dịch', 'Video, mục tiêu lượt xem.'], ['Đo bằng', 'Lượt xem, CPV, mức xem tiếp.']]},
      {key: 'reach', group: 'Mục tiêu', groupColor: '#f4adad', label: 'Độ phủ', icon: 'eye', stage: () => google('vid-bumper'),
        facts: [['Chiến dịch', 'Video Reach.'], ['Đo bằng', 'Người tiếp cận, tần suất, CPM.']]},
      {key: 'conv', group: 'Mục tiêu', groupColor: '#f4adad', label: 'Chuyển đổi', icon: 'convert', stage: () => site(),
        facts: [['Chiến dịch', 'Demand Gen. Video Action đã được nâng cấp sang Demand Gen.'], ['Đo bằng', 'Lead, đơn; cần đo chuyển đổi trên website.']]},
      {key: 'visitors', group: 'Người xem', groupColor: '#85e1c1', label: 'Người đã vào website', icon: 'page', stage: () => signal('visitor'),
        stageTag: 'DẤU HIỆU', facts: [['Là ai', 'Người đã ghé website, ghi bằng thẻ Google.'], ['Điều kiện', 'Tệp cần đủ người hoạt động mới chạy được.']]},
      {key: 'viewers', group: 'Người xem', groupColor: '#85e1c1', label: 'Người đã xem kênh', icon: 'play', stage: () => signal('viewer'),
        stageTag: 'DẤU HIỆU', facts: [['Là ai', 'Người đã xem video hoặc tương tác với kênh liên kết.'], ['Dùng để', 'Kể tiếp phần sau của câu chuyện.']]},
      {key: 'interest', group: 'Người xem', groupColor: '#85e1c1', label: 'Nhóm quan tâm mới', icon: 'heart', stage: () => signal('affinity'),
        stageTag: 'DẤU HIỆU', facts: [['Là ai', 'Người có mối quan tâm liên quan.'], ['Lưu ý', 'Đây là tìm người mới, không phải remarketing.']]}
    ],
    note: {label: 'LƯỢT XEM KHÔNG THAY THẾ ĐƠN', ic: 'alert', tone: 'warn',
      text: 'Lượt xem và lượt hiển thị là hai chỉ số khác nhau, và không quy đổi ra đơn. Muốn đo lead hoặc đơn, chạy Demand Gen và đo chuyển đổi trên website.'},
    src: ['goals', 'reach', 'demandGen', 'dgAbout']
  },
  measure: {
    title: 'Đọc từ lượt xem tới đơn.',
    lead: 'Bấm từng tầng. Tầng cuối lấy từ CRM hoặc hệ thống bán hàng.',
    tiers: [
      ['view', 'Xem', '42.000', [['Lượt xem', '42.000', 'Người xem đủ thời lượng tính là một lượt xem.'], ['Tần suất', '2,4', 'Số lần trung bình một người thấy quảng cáo.']]],
      ['click', 'Nhấp · tìm', '380', [['Lượt nhấp', '380', 'Người bấm sang website.'], ['Tìm tên thương hiệu', 'Tăng 30%', 'So trước và sau đợt chạy (số mẫu).']]],
      ['conv', 'Chuyển đổi', '26', [['Lead, đơn', '26', 'Ghi bằng đo chuyển đổi của Google Ads.'], ['Lead phù hợp', '12', 'Nhân viên xác nhận trong CRM.']]]
    ],
    tips: {view: 'Bị bỏ qua sớm: xem lại 5 giây đầu.', click: 'Xem nhiều mà ít bấm: kiểm tra nút kêu gọi và trang đích.'},
    note: {label: 'ĐO LƯỜNG CHUYỂN ĐỔI', ic: 'code', text: 'Cài thẻ Google và sự kiện chuyển đổi trước khi chạy Demand Gen. Lượt tìm tên thương hiệu và người vào trực tiếp nên đọc trước và sau đợt chạy.'},
    src: ['conversions', 'goals']
  },
  rollout: {
    title: 'Sáu bước từ kịch bản tới báo cáo.',
    steps: [['Chọn mục tiêu', 'Lượt xem, độ phủ hay chuyển đổi; chọn định dạng theo đó.', 'Sơ đồ chiến dịch'],
      ['Kịch bản', 'Năm giây đầu, lợi ích, bằng chứng, lời mời.', 'Kịch bản đã duyệt'],
      ['Làm video', 'Bản ngang, dọc, vuông; phụ đề; tải lên kênh.', 'Video trên YouTube'],
      ['Cài đo lường', 'Thẻ Google, chuyển đổi, UTM.', 'Sự kiện chạy thử đã ghi'],
      ['Chạy & theo dõi', 'Tỷ lệ xem, tần suất, lượt nhấp.', 'Ghi chú tuần đầu'],
      ['Điều chỉnh & báo cáo', 'Đổi phần mở đầu, dời ngân sách, đối chiếu CRM.', 'Báo cáo định kỳ']],
    icons: ['target', 'form', 'video', 'code', 'play', 'chart'],
    phases: [['Chuẩn bị', [0, 1, 2]], ['Chạy', [3, 4]], ['Tối ưu', [5]]],
    checks: ['Mục tiêu đã chọn', 'Video tải lên YouTube', 'Năm giây đầu rõ chủ đề', 'Có phụ đề', 'Bản dọc cho Shorts',
      'Thẻ Google và chuyển đổi', 'Trang đích sẵn sàng', 'Kế hoạch nhắc lại người đã xem'],
    src: ['formats', 'conversions']
  },
  faq: {
    items: [
      ['Video Action có còn dùng được không?', 'Không. Google đã nâng cấp Video Action lên Demand Gen. Với mục tiêu lead hoặc đơn, chạy Demand Gen và đo chuyển đổi.'],
      ['Video nên dài bao nhiêu?', 'Tùy định dạng: bumper 5–6 giây, in-stream không bỏ qua loại tiêu chuẩn 7–15 giây, in-stream bỏ qua được không có độ dài chung. Quan trọng là năm giây đầu.'],
      ['Có cần kênh YouTube không?', 'Có. Video quảng cáo phải được tải lên YouTube; nên dùng kênh của doanh nghiệp.'],
      ['Lượt xem nhiều nhưng ít đơn?', 'Lượt xem không quy đổi ra đơn. Kiểm tra nút kêu gọi, trang đích, và dùng Demand Gen nếu mục tiêu là chuyển đổi.'],
      ['Nhắc lại người đã xem được không?', 'Được, với tệp người đã xem kênh hoặc đã vào website, khi tệp đủ điều kiện.'],
      ['Chi phí tính thế nào?', 'Tùy mục tiêu: theo lượt xem (CPV) hoặc 1.000 lượt hiển thị (CPM). Ngân sách, thuế và hóa đơn xem trang Google Ads, phần Chi phí & hiệu quả.']
    ],
    topics: [['Định dạng', 'play', [0, 1, 2]], ['Hiệu quả', 'chart', [3, 4, 5]]],
    src: ['demandGen', 'nonskip', 'segments']
  },
  contactGoals: [['views', 'Tăng lượt xem'], ['reach', 'Nhiều người biết tới'], ['conv', 'Lead, đơn từ video'], ['remarketing', 'Nhắc lại người đã xem']],
  recap: {
    title: 'Ba việc trước khi chạy YouTube.',
    items: [['Chọn mục tiêu', 'Lượt xem, độ phủ hay chuyển đổi.', '#muc-tieu', 'target'],
      ['Làm năm giây đầu', 'Chủ đề rõ trước khi có nút bỏ qua.', '#chuan-bi', 'play'],
      ['Đo tới đơn', 'Thẻ Google, chuyển đổi, CRM.', '#do-luong', 'chart']]
  },
  sisters: [['Google Ads', 'Ba trang chi tiết về Search, Performance Max, Video và chi phí.', MC + 'google-ads/'],
    ['TikTok Ads', 'Video dọc giữa những video khách đang lướt.', MC + 'tiktok-ads/'],
    ['Remarketing', 'Nói tiếp với người đã xem, đã ghé trang.', MC + 'remarketing/']]
};


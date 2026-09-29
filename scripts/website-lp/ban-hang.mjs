// Website bán hàng — one landing page (WEBSITE_LP_PLAN.md).
import {category, product, checkout, payFail, orders, mobileSite, leadDone, media} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
import {withExtra} from './extra.mjs';
export {CHECKED};

export default withExtra({
  slug: 'website-ban-hang',
  channel: 'webShop',
  name: 'Website bán hàng',
  checked: CHECKED,
  docName: 'tài liệu Google, web.dev và Bộ Công Thương',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Hành trình mua'),
  contact: CONTACT,
  meta: {
    title: 'Thiết kế website bán hàng: danh mục, trang sản phẩm, giỏ hàng, thanh toán, đơn',
    description: 'Website bán hàng từ danh mục, bộ lọc, trang sản phẩm có biến thể và tồn kho tới giỏ hàng, thanh toán và quản lý đơn. '
      + 'Cần chuẩn bị gì, đo gì và POWAI triển khai thế nào.'
  },
  hero: {
    sub: 'Khách tìm được món cần mua và <em>thanh toán xong</em> trên điện thoại.',
    lead: 'Website bán hàng thiết kế danh mục, chi tiết sản phẩm và hành trình đặt hàng theo mô hình bán của bạn. '
      + 'Phần hay mất khách nằm ở giỏ và thanh toán; phần hay mất thời gian nội bộ nằm ở đối soát đơn.',
    cta: 'Xem hành trình mua',
    rungs: [['list', 'Danh mục', 'Lọc, sắp xếp'], ['tag', 'Sản phẩm', 'Giá, biến thể, tồn'], ['cart', 'Giỏ hàng', 'Sửa trước khi đặt'],
      ['pay', 'Thanh toán', 'Cả khi thất bại'], ['receipt', 'Đơn hàng', 'Trạng thái rõ']]
  },
  when: {
    title: 'Khi khách muốn tự chọn và mua, không cần hỏi.',
    lead: 'Hợp khi sản phẩm có giá rõ, mua lặp lại, hoặc bạn muốn một kênh bán không phụ thuộc sàn. Cần người vận hành đơn mỗi ngày.',
    journey: [['search', 'Tìm hoặc bấm quảng cáo'], ['list', 'Lọc danh mục'], ['tag', 'Xem sản phẩm'], ['cart', 'Thêm giỏ, sửa số lượng'],
      ['pay', 'Thanh toán, nhận xác nhận']],
    inputs: [['tag', 'Danh sách sản phẩm, giá'], ['image', 'Ảnh sản phẩm'], ['pay', 'Cổng thanh toán, COD'], ['box', 'Chính sách giao, đổi trả']],
    core: 'Danh mục, giỏ, thanh toán, quản lý đơn',
    outputs: [['store', 'Cửa hàng đã kiểm thử'], ['receipt', 'Luồng đơn có trạng thái'], ['chart', 'Đo từ xem tới mua']],
    fit: ['Có danh sách sản phẩm và giá ổn định', 'Muốn kênh bán riêng bên cạnh sàn', 'Có người xử lý đơn và chăm sóc khách',
      'Chạy quảng cáo cần trang sản phẩm có thể mua ngay'],
    notFit: ['Giá thay đổi theo từng khách: cân nhắc form báo giá', 'Chưa có quy trình giao, đổi trả',
      'Vài sản phẩm, một chiến dịch: Landing Page đủ', 'Không ai theo dõi đơn hằng ngày'],
    src: ['product', 'ecom']
  },
  formats: {
    eyebrow: 'HÀNH TRÌNH MUA',
    title: 'Bốn màn hình quyết định đơn hàng.',
    lead: 'Chọn một màn hình để xem khách cần gì và lỗi hay gặp.',
    whereLabel: 'Khách cần', whatLabel: 'Làm thế nào',
    items: [
      {key: 'cat', label: 'Danh mục & bộ lọc', icon: 'list', stage: () => category(),
        where: 'Thu hẹp nhanh tới món hợp nhu cầu và giá.', what: 'Bộ lọc theo cách khách chọn (mùi, giá, còn hàng), hiện rõ món hết hàng.'},
      {key: 'pdp', label: 'Trang sản phẩm', icon: 'tag', stage: () => product(),
        where: 'Giá, biến thể, còn hàng, phí giao, đổi trả.', what: 'Chọn biến thể đổi giá và ảnh; biến thể hết hàng hiện rõ; thông tin giao ngay dưới nút mua.',
        more: [['Kèm theo', 'Dữ liệu có cấu trúc Product để công cụ tìm kiếm đọc giá và tình trạng hàng.']]},
      {key: 'checkout', label: 'Giỏ & thanh toán', icon: 'pay', stage: () => checkout('ship'), tag: 'ĐIỆN THOẠI',
        where: 'Ít bước, phí giao hiện sớm, báo lỗi rõ.', what: 'Sửa số lượng trong giỏ, mua không cần tài khoản, thử cả thanh toán thất bại.'},
      {key: 'orders', label: 'Quản lý đơn', icon: 'receipt', stage: () => orders(1), tag: 'QUẢN TRỊ',
        where: 'Nhân viên thấy đơn nào cần xử lý trước.', what: 'Trạng thái thanh toán và giao tách riêng; đơn lỗi thanh toán nổi lên để gọi lại.'}
    ],
    note: {label: 'THỦ TỤC VỚI BỘ CÔNG THƯƠNG', ic: 'stamp',
      text: 'Website bán hàng thực hiện thông báo với Bộ Công Thương qua cổng online.gov.vn. Hồ sơ và điều kiện theo quy định hiện hành; POWAI chuẩn bị các trang thông tin cần có trên website, doanh nghiệp đứng tên thủ tục.'},
    src: ['product', 'forms', 'ecom']
  },
  prep: {
    title: 'Dữ liệu sản phẩm sạch trước khi dựng.',
    lead: 'Nhập sản phẩm là phần tốn công nhất nếu dữ liệu chưa thống nhất.',
    principle: 'Một bảng sản phẩm chuẩn: mã, tên, biến thể, giá, tồn, ảnh, mô tả. Website, sàn và kho dùng cùng mã.',
    boardLabel: 'THƯ VIỆN ẢNH SẢN PHẨM',
    boards: [() => media()],
    tiles: [['table', 'Bảng sản phẩm', 'Mã, biến thể, giá, tồn'], ['image', 'Ảnh cùng tỷ lệ', 'Nền, góc chụp thống nhất'],
      ['pay', 'Thanh toán', 'Cổng, COD, hoàn tiền'], ['box', 'Giao hàng', 'Phí, vùng, thời gian']],
    assets: [['Dữ liệu', 'Bảng sản phẩm', 'Cùng mã với kho.'], ['Ảnh', 'Ảnh sản phẩm', 'Cùng tỷ lệ, đã nén.'],
      ['Chữ', 'Chính sách', 'Giao, đổi trả, bảo mật, thanh toán.'], ['Hệ thống', 'Tài khoản cổng thanh toán', 'Môi trường thử và thật.']],
    specs: [['Dữ liệu có cấu trúc', 'Product / Offer', 'Google đọc giá, tình trạng, giao hàng, đổi trả từ trang bán.'],
      ['Ảnh', 'srcset + nén', 'Trình duyệt chọn ảnh vừa màn hình (web.dev).'],
      ['Thông báo website', 'online.gov.vn', 'Cổng quản lý thương mại điện tử của Bộ Công Thương.']],
    src: ['product', 'images', 'ecom']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Thử những lúc đơn hàng đi sai.',
    lead: 'Kiểm thử giá trị đơn, đơn trùng và thông báo xác nhận. Nhóm đầu là phía khách, nhóm sau là phía vận hành.',
    items: [
      {key: 'phone', group: 'Phía khách', groupColor: '#ffc59a', label: 'Sai số điện thoại', icon: 'alert', stage: () => checkout('ship'),
        facts: [['Cần có', 'Báo lỗi đúng trường, bàn phím số, giữ giỏ hàng.'], ['Thử', 'Trên điện thoại thật, mạng chậm.']]},
      {key: 'pay', group: 'Phía khách', groupColor: '#ffc59a', label: 'Thanh toán thất bại', icon: 'pay', stage: () => payFail(),
        facts: [['Cần có', 'Báo rõ chưa trừ tiền hay đã trừ, cách thử lại hoặc đổi sang COD.'], ['Tránh', 'Tạo đơn trùng khi khách bấm lại.']]},
      {key: 'done', group: 'Phía khách', groupColor: '#ffc59a', label: 'Đặt xong', icon: 'check', stage: () => leadDone(),
        facts: [['Cần có', 'Mã đơn, tổng tiền, thời gian giao, email hoặc tin nhắn xác nhận.'], ['Đo', 'Sự kiện purchase với giá trị đơn.']]},
      {key: 'ops', group: 'Phía vận hành', groupColor: '#88e4ff', label: 'Đối soát đơn', icon: 'receipt', stage: () => orders(1), stageTag: 'QUẢN TRỊ',
        facts: [['Cần có', 'Lọc đơn lỗi thanh toán, chưa xử lý, đã hoàn tiền.'], ['Thử', 'Giá trị đơn trên web khớp cổng thanh toán.']]},
      {key: 'mobile', group: 'Phía vận hành', groupColor: '#88e4ff', label: 'Hỗ trợ khi khách hỏi', icon: 'chat', stage: () => mobileSite('sticky'),
        facts: [['Cần có', 'Nút gọi, nhắn luôn hiện; nhân viên tra đơn theo số điện thoại.'], ['Vì sao', 'Nhiều khách hỏi trước khi trả tiền.']]}
    ],
    src: ['forms', 'gaEvents']
  },
  measure: {
    title: 'Đọc từ lượt xem sản phẩm tới đơn thành công.',
    lead: 'Bấm từng tầng. Số là một tháng giả định để minh họa cách đọc.',
    tiers: [
      ['view', 'Xem sản phẩm', '5.200', [['Xem sản phẩm', '5.200', 'view_item.'], ['Thêm giỏ', '640', 'add_to_cart.']]],
      ['checkout', 'Thanh toán', '310', [['Bắt đầu thanh toán', '310', 'begin_checkout.'], ['Lỗi thanh toán', '27', 'Từ cổng thanh toán.']]],
      ['buy', 'Mua', '188', [['Đơn thành công', '188', 'purchase.'], ['Hoàn / hủy', '9', 'Theo lý do.']]]
    ],
    tips: {checkout: 'Nhiều người thêm giỏ mà ít bắt đầu thanh toán: phí giao hiện quá muộn hoặc bắt buộc tạo tài khoản.',
      buy: 'Đơn trên web khác cổng thanh toán: kiểm tra đơn trùng và đơn thất bại.'},
    note: {label: 'SỰ KIỆN ĐỀ XUẤT', ic: 'chart', text: 'Google Analytics có sẵn nhóm sự kiện thương mại (view_item, add_to_cart, begin_checkout, purchase). Dùng đúng tên để có sẵn báo cáo.'},
    src: ['gaEvents', 'gaKey']
  },
  rollout: {
    title: 'Sáu bước từ bảng sản phẩm tới đơn đầu tiên.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi mở bán.',
    steps: [['Mô hình bán', 'Sản phẩm, biến thể, giá, giao, thanh toán.', 'Bản mô tả luồng đơn'],
      ['Dữ liệu sản phẩm', 'Chuẩn bảng, ảnh, mô tả.', 'Bảng sản phẩm sạch'],
      ['Bản mẫu', 'Danh mục, sản phẩm, giỏ, thanh toán trên điện thoại.', 'Bản mẫu duyệt'],
      ['Phát triển', 'Cổng thanh toán ở chế độ thử, email xác nhận.', 'Bản thử nghiệm'],
      ['Kiểm thử đơn', 'Đơn thành công, thất bại, trùng, hoàn tiền.', 'Biên bản kiểm thử'],
      ['Mở bán & bàn giao', 'Chuyển cổng sang thật, hướng dẫn xử lý đơn.', 'Cửa hàng, tài liệu']],
    icons: ['store', 'table', 'mobile', 'code', 'receipt', 'check'],
    phases: [['Chuẩn bị', [0, 1]], ['Xây dựng', [2, 3]], ['Mở bán', [4, 5]]],
    checks: ['Giá theo biến thể đúng', 'Hết hàng hiện rõ', 'Phí giao hiện trước thanh toán', 'Thanh toán thất bại có hướng dẫn',
      'Không tạo đơn trùng', 'Email xác nhận đơn', 'Sự kiện purchase có giá trị', 'Trang chính sách đầy đủ'],
    src: ['gaEvents', 'forms']
  },
  faq: {
    items: [
      ['Có cần làm website khi đã bán trên sàn?', 'Không bắt buộc. Website hợp khi muốn kênh bán riêng, chạy quảng cáo tới trang của mình và giữ dữ liệu khách.'],
      ['Có kết nối với kho, phần mềm bán hàng?', 'Được nếu hệ thống có API. Phạm vi kết nối khảo sát riêng, xem trang Tích hợp hệ thống.'],
      ['Thủ tục với Bộ Công Thương ai làm?', 'Doanh nghiệp đứng tên thông báo trên online.gov.vn; POWAI chuẩn bị các trang thông tin website cần có.'],
      ['Chi phí phụ thuộc vào gì?', 'Số sản phẩm cần nhập, biến thể, cổng thanh toán, kết nối kho và mức tùy biến giao diện.'],
      ['Nhân viên có tự thêm sản phẩm được không?', 'Có. POWAI bàn giao hướng dẫn thêm, sửa, ẩn sản phẩm và xử lý đơn.'],
      ['Làm sao biết khách bỏ ở đâu?', 'Đo từng bước: xem sản phẩm, thêm giỏ, bắt đầu thanh toán, mua; bước rơi nhiều nhất sửa trước.']
    ],
    topics: [['Trước khi làm', 'store', [0, 2, 3]], ['Vận hành', 'receipt', [1, 4, 5]]],
    src: ['ecom', 'gaEvents']
  },
  contactGoals: [['new', 'Mở cửa hàng online'], ['redo', 'Làm lại website bán hàng'], ['checkout', 'Giảm bỏ giỏ'], ['connect', 'Kết nối kho, thanh toán']],
  recap: {
    title: 'Ba việc trước khi mở bán.',
    items: [['Dữ liệu sản phẩm', 'Một bảng, một mã.', '#chuan-bi', 'table'],
      ['Thử đơn đi sai', 'Lỗi, thất bại, trùng.', '#muc-tieu', 'alert'],
      ['Đo tới đơn', 'purchase có giá trị.', '#do-luong', 'chart']]
  },
  sisters: sisters('tich-hop-he-thong', 'cro-toi-uu-chuyen-doi', 'toi-uu-toc-do')
});

// Tối ưu tốc độ — one landing page (WEBSITE_LP_PLAN.md). Core Web Vitals
// thresholds and field/lab data from web.dev and PageSpeed Insights docs.
import {vitals, waterfall, cacheRules, imageDiet, media, mobileSite, uiStates, backups} from './mocks.mjs';
import {CHECKED, SOURCES, CONTACT, toc, sisters} from './sources.mjs';
import {withExtra} from './extra.mjs';
export {CHECKED};

export default withExtra({
  slug: 'toi-uu-toc-do',
  channel: 'webSpeed',
  name: 'Tối ưu tốc độ',
  checked: CHECKED,
  docName: 'tài liệu web.dev, PageSpeed Insights và MDN',
  SOURCES,
  sourceLabel: 'Tài liệu tham khảo:',
  toc: toc('Chỉ số & nguyên nhân'),
  contact: CONTACT,
  meta: {
    title: 'Tối ưu tốc độ website: Core Web Vitals, ảnh, tài nguyên chặn hiển thị, bộ nhớ đệm',
    description: 'Đo tốc độ trên thiết bị khách thật dùng, tìm nguyên nhân (ảnh nặng, tài nguyên chặn hiển thị, mã bên thứ ba, cache), '
      + 'sửa theo thứ tự ảnh hưởng và đo lại cùng điều kiện.'
  },
  hero: {
    sub: 'Đo trên <em>điện thoại thật</em>, sửa chỗ nặng nhất, đo lại cùng điều kiện.',
    lead: 'Trang chậm hoặc phản hồi kém trên thiết bị khách thật sự dùng làm mất khách trước khi họ đọc nội dung. '
      + 'POWAI đo ảnh nặng và cách tải, rà tài nguyên chặn hiển thị, đánh giá cache theo hệ thống rồi đo lại cùng điều kiện.',
    cta: 'Xem chỉ số & nguyên nhân',
    rungs: [['bolt', 'LCP', 'Nội dung chính hiện ra'], ['tap', 'INP', 'Phản hồi khi bấm'], ['layers', 'CLS', 'Bố cục không nhảy'],
      ['image', 'Ảnh', 'Đúng cỡ, đúng lúc'], ['repeat', 'Đo lại', 'Cùng điều kiện']]
  },
  when: {
    title: 'Khi khách phải chờ, hoặc bấm mà trang không phản hồi.',
    lead: 'Đặc biệt quan trọng với trang nhận khách từ quảng cáo và trang bán hàng mở trên điện thoại.',
    journey: [['mobile', 'Khách mở trên điện thoại'], ['clock', 'Chờ nội dung chính'], ['tap', 'Bấm nút, mở menu'], ['layers', 'Bố cục nhảy khi tải'],
      ['alert', 'Bỏ đi trước khi đọc']],
    inputs: [['globe', 'Danh sách trang quan trọng'], ['code', 'Quyền sửa mã, hosting'], ['chart', 'Số liệu người dùng thật'], ['image', 'Thư viện ảnh']],
    core: 'Đo, tìm nguyên nhân, sửa, đo lại',
    outputs: [['bolt', 'Chỉ số trước / sau'], ['list', 'Danh sách đã sửa'], ['file', 'Quy tắc giữ tốc độ']],
    fit: ['Trang đích quảng cáo mở chậm trên điện thoại', 'Chỉ số Core Web Vitals chưa đạt', 'Nhiều ảnh lớn, nhiều mã bên thứ ba',
      'Sắp tăng ngân sách quảng cáo'],
    notFit: ['Chỉ muốn điểm số đẹp trong công cụ đo', 'Không có quyền sửa mã hay hosting',
      'Website sắp làm lại toàn bộ', 'Muốn so hai lần đo khác thiết bị, khác mạng'],
    src: ['vitals', 'psi']
  },
  formats: {
    eyebrow: 'CHỈ SỐ & NGUYÊN NHÂN',
    title: 'Ba chỉ số, bốn nguyên nhân hay gặp.',
    lead: 'Chọn một mục để xem nó đo gì và thường sửa ở đâu.',
    whereLabel: 'Đo / cho biết', whatLabel: 'Thường sửa',
    items: [
      {key: 'cwv', label: 'Core Web Vitals', icon: 'bolt', stage: () => vitals('before'), tag: 'SỐ MẪU',
        where: 'LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 là "tốt" theo web.dev, đọc ở phân vị 75.', what: 'Tách điện thoại và máy tính; ưu tiên trang có nhiều khách.',
        more: [['Dữ liệu', 'Dữ liệu thực tế (người dùng thật, nhiều tuần gần nhất) khác dữ liệu phòng thí nghiệm (một lần tải giả lập).']]},
      {key: 'waterfall', label: 'Tài nguyên khi tải', icon: 'list', stage: () => waterfall(3), tag: 'SỐ MẪU',
        where: 'Tài nguyên nào chặn hiển thị, cái nào nặng.', what: 'CSS quan trọng tải trước, font ít kiểu, JavaScript chia nhỏ hoặc hoãn.'},
      {key: 'image', label: 'Ảnh', icon: 'image', stage: () => imageDiet(), tag: 'SỐ MẪU',
        where: 'Ảnh lớn hơn màn hình, định dạng cũ.', what: 'Nhiều cỡ ảnh (srcset), định dạng nén tốt, ảnh dưới màn hình đầu tải trễ.'},
      {key: 'shift', label: 'Bố cục nhảy', icon: 'layers', stage: () => uiStates('loading'), tag: 'TRẠNG THÁI',
        where: 'Nội dung đẩy nhau khi ảnh, quảng cáo, font tải xong.', what: 'Đặt sẵn kích thước ảnh, khung chờ đúng chỗ.'},
      {key: 'cache', label: 'Bộ nhớ đệm', icon: 'repeat', stage: () => cacheRules(1), tag: 'VÍ DỤ',
        where: 'Lần tải sau có dùng lại tài nguyên không.', what: 'Cache-Control theo loại tệp; tên tệp đổi khi nội dung đổi.',
        more: [['Theo', 'Hướng dẫn bộ nhớ đệm HTTP của MDN.']]}
    ],
    src: ['vitals', 'lcp', 'inp', 'cls', 'caching']
  },
  prep: {
    title: 'Chọn trang và điều kiện đo trước.',
    lead: 'Không so hai lần đo khác thiết bị hoặc mạng để kết luận cải thiện.',
    principle: 'Ghi lại thiết bị, mạng, trang và thời điểm đo. Đo lại đúng các điều kiện đó sau khi sửa.',
    boardLabel: 'TÀI NGUYÊN KHI TẢI',
    boards: [() => waterfall(3)],
    tiles: [['globe', 'Trang quan trọng', 'Trang chủ, đích, sản phẩm'], ['mobile', 'Thiết bị đo', 'Điện thoại tầm trung'],
      ['chart', 'Dữ liệu thực tế', 'Người dùng thật'], ['code', 'Quyền sửa', 'Mã, hosting, CDN']],
    assets: [['Danh sách', 'Trang cần đo', 'Kèm lưu lượng.'], ['Hệ thống', 'Hosting, CDN', 'Quyền cấu hình.'],
      ['Dữ liệu', 'Kết quả đo trước', 'Ghi điều kiện.'], ['Mã', 'Mã bên thứ ba', 'Chat, đo lường, quảng cáo.']],
    specs: [['Ngưỡng tốt', 'LCP 2,5 s · INP 200 ms · CLS 0,1', 'Theo web.dev, ở phân vị 75 của lượt tải trang.'],
      ['PageSpeed Insights', 'Thực tế + phòng thí nghiệm', 'Dữ liệu thực tế từ người dùng Chrome; phòng thí nghiệm là một lần tải giả lập.'],
      ['Ảnh', 'srcset + loading="lazy"', 'Hướng dẫn ảnh đáp ứng và tải trễ của web.dev.']],
    src: ['vitals', 'psi', 'images', 'lazy']
  },
  goals: {
    eyebrow: 'TÌNH HUỐNG THỰC TẾ',
    title: 'Trước và sau, cùng điều kiện.',
    lead: 'Nhóm đầu là kết quả đo, nhóm sau là nguyên nhân hay quay lại sau khi đã sửa.',
    items: [
      {key: 'before', group: 'Kết quả đo', groupColor: '#8fe3f0', label: 'Trước khi sửa', icon: 'alert', stage: () => vitals('before'),
        stageTag: 'SỐ MẪU', facts: [['Đọc', 'LCP và CLS chưa đạt trên điện thoại.'], ['Nguyên nhân', 'Ảnh banner nặng, ảnh không đặt kích thước.']]},
      {key: 'after', group: 'Kết quả đo', groupColor: '#8fe3f0', label: 'Sau khi sửa', icon: 'check', stage: () => vitals('after'),
        stageTag: 'SỐ MẪU', facts: [['Đọc', 'Cả ba chỉ số trong ngưỡng tốt.'], ['Lưu ý', 'Dữ liệu thực tế cần vài tuần để phản ánh thay đổi.']]},
      {key: 'mobile', group: 'Kết quả đo', groupColor: '#8fe3f0', label: 'Trên điện thoại thật', icon: 'mobile', stage: () => mobileSite('sticky'),
        facts: [['Thử', 'Mở, cuộn, bấm menu và nút liên hệ.'], ['Vì sao', 'Công cụ đo không thay được cảm nhận khi dùng.']]},
      {key: 'upload', group: 'Hay quay lại', groupColor: '#88e4ff', label: 'Ảnh mới chưa nén', icon: 'image', stage: () => media(),
        stageTag: 'QUẢN TRỊ', facts: [['Phòng', 'Giới hạn kích thước khi tải lên, tự tạo nhiều cỡ.'], ['Kiểm', 'Rà thư viện định kỳ.']]},
      {key: 'third', group: 'Hay quay lại', groupColor: '#88e4ff', label: 'Thêm mã bên thứ ba', icon: 'code', stage: () => waterfall(5),
        stageTag: 'SỐ MẪU', facts: [['Phòng', 'Mỗi mã mới được đo trước khi thêm.'], ['Cách', 'Tải trễ khung chat, gỡ mã không dùng.']]}
    ],
    src: ['vitals', 'lazy']
  },
  measure: {
    title: 'Đọc tốc độ cùng hành vi.',
    lead: 'Bấm từng tầng. Số là một tháng giả định trên trang đích để minh họa cách đọc.',
    tiers: [
      ['load', 'Lượt tải', '4.000', [['Lượt tải trên điện thoại', '4.000', 'Trang đích.'], ['LCP tốt', '62%', 'Trước khi sửa.']]],
      ['stay', 'Ở lại', '2.900', [['Không thoát ngay', '2.900', 'Có tương tác.'], ['INP tốt', '81%', 'Trước khi sửa.']]],
      ['act', 'Hành động', '210', [['Gửi form, bấm gọi', '210', 'Sự kiện chính.'], ['So với tháng trước', '—', 'Đọc sau khi sửa.']]]
    ],
    tips: {load: 'LCP tốt thấp: xem ảnh hoặc chữ lớn nhất ở màn hình đầu tải lúc nào.',
      stay: 'Thoát ngay nhiều trên điện thoại: đo lại trên mạng di động, không chỉ wifi.'},
    note: {label: 'ĐIỂM SỐ KHÔNG PHẢI MỤC TIÊU', ic: 'alert', text: 'Điểm trong công cụ phòng thí nghiệm dùng để tìm lỗi. Mục tiêu là trải nghiệm của người dùng thật và việc họ hoàn tất.'},
    src: ['psi', 'vitals']
  },
  rollout: {
    title: 'Năm bước, đo trước và đo sau.',
    lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi kết luận.',
    steps: [['Đo hiện trạng', 'Trang, thiết bị, mạng ghi rõ.', 'Bảng số trước'],
      ['Tìm nguyên nhân', 'Ảnh, tài nguyên chặn, mã bên thứ ba, cache.', 'Danh sách theo ảnh hưởng'],
      ['Sửa theo thứ tự', 'Việc ảnh hưởng lớn, rủi ro thấp trước.', 'Bản sửa trên bản thử'],
      ['Đo lại', 'Cùng điều kiện, rồi theo dõi dữ liệu thực tế.', 'Bảng số sau'],
      ['Quy tắc giữ tốc độ', 'Ảnh, mã mới, kiểm tra định kỳ.', 'Tài liệu quy tắc']],
    icons: ['chart', 'search', 'code', 'repeat', 'file'],
    phases: [['Đo', [0, 1]], ['Sửa', [2, 3]], ['Giữ', [4]]],
    checks: ['Ghi điều kiện đo', 'Ảnh đầu trang không tải trễ', 'Ảnh dưới dùng loading="lazy"', 'Ảnh có kích thước đặt sẵn',
      'Font ít kiểu', 'Mã bên thứ ba được rà', 'Cache theo loại tệp', 'Đo lại cùng điều kiện'],
    src: ['lazy', 'caching', 'vitals']
  },
  faq: {
    items: [
      ['Có cam kết điểm 100 không?', 'Không. Điểm phòng thí nghiệm dao động theo lần đo; mục tiêu là chỉ số người dùng thật trong ngưỡng tốt.'],
      ['Vì sao công cụ báo khác nhau?', 'Dữ liệu thực tế là người dùng thật nhiều tuần; phòng thí nghiệm là một lần tải giả lập trên một thiết bị, một mạng.'],
      ['Có cần đổi hosting?', 'Chỉ khi đo thấy máy chủ phản hồi chậm. Phần lớn trường hợp sửa ảnh và tài nguyên trước.'],
      ['Sửa tốc độ có làm vỡ giao diện?', 'Có rủi ro; POWAI sửa trên bản thử và rà trang, form trước khi đưa lên bản thật.'],
      ['Bao lâu thì thấy kết quả?', 'Đo phòng thí nghiệm thấy ngay; dữ liệu thực tế cần vài tuần để phản ánh.'],
      ['Có ảnh hưởng SEO không?', 'Trải nghiệm trang là một phần Google xem xét; tốc độ tốt trước hết giúp khách ở lại.']
    ],
    topics: [['Chỉ số', 'bolt', [0, 1, 4]], ['Cách làm', 'code', [2, 3, 5]]],
    src: ['psi', 'vitals']
  },
  contactGoals: [['landing', 'Trang đích quảng cáo chậm'], ['cwv', 'Core Web Vitals chưa đạt'], ['images', 'Tối ưu ảnh'], ['audit', 'Đo và báo cáo hiện trạng']],
  recap: {
    title: 'Ba việc để trang nhanh và giữ nhanh.',
    items: [['Đo đúng điều kiện', 'Điện thoại, mạng thật.', '#chuan-bi', 'mobile'],
      ['Sửa chỗ nặng nhất', 'Thường là ảnh.', '#dinh-dang', 'image'],
      ['Quy tắc giữ tốc độ', 'Cho ảnh và mã mới.', '#trien-khai', 'file']]
  },
  sisters: sisters('bao-tri-website', 'cro-toi-uu-chuyen-doi', 'landing-page')
});

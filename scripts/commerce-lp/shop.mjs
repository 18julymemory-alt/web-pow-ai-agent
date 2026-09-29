// Page factory for the Thương mại điện tử pages (COMMERCE_LP_PLAN.md). Every
// page shares the method of the e-commerce group (service-editorial-chapters
// .mjs: reconcile goods data, standardise the listing, test the whole buying
// flow, reconcile operations) and the nine chapters of the one-page renderer
// with a topic hero, a "what is it" band and a key-points chapter.
import {CHECKED, SOURCES, CONTACT} from './sources.mjs';
import {scene} from './mocks.mjs';

const BADGE = 'Thương mại điện tử · Dịch vụ';

// Two answers every page shares (from the e-commerce group's FAQ).
const FAQ_COMMON = [
  ['Có nhận làm riêng ảnh và nội dung không?', 'Có thể tách thành phạm vi riêng; thông số và công dụng phải được doanh nghiệp duyệt trước khi xuất bản.'],
  ['Sao không có một mức phí sàn chung?', 'Phí và điều kiện khác theo nền tảng, ngành hàng, chương trình và tài khoản. Dự toán lấy từ điều kiện đang áp dụng trong Kênh Người Bán.']
];

export function shop(o) {
  return {
    slug: o.slug, channel: o.channel, name: o.name, checked: CHECKED, docName: o.docName.startsWith('tài liệu') ? o.docName : 'tài liệu ' + o.docName, SOURCES, sourceLabel: 'Tài liệu tham khảo:',
    toc: {'khi-nao': 'Khi nào cần', 'cot-loi': 'Cốt lõi', 'dinh-dang': o.formatsToc, 'muc-tieu': 'Tình huống'},
    contact: CONTACT,
    meta: {title: o.metaTitle, description: o.metaDescription},
    hero: {eyebrow: 'DỊCH VỤ THƯƠNG MẠI ĐIỆN TỬ', sub: o.sub, lead: o.lead, cta: o.cta, rungs: [],
      scene: () => scene({badge: BADGE, ...o.scene()})},
    intro: {kicker: 'THƯƠNG MẠI ĐIỆN TỬ', ...o.intro},
    essentials: o.essentials,
    when: o.when,
    formats: o.formats,
    prep: o.prep,
    goals: {eyebrow: 'TÌNH HUỐNG THỰC TẾ', ...o.goals},
    measure: o.measure,
    rollout: {
      lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi bàn giao.',
      steps: [['Đối chiếu nguồn hàng', 'Bảng SKU, biến thể, giá, tồn, tài nguyên gốc và người cập nhật từng trường.', 'Bảng dữ liệu hàng hóa'],
        ['Chuẩn hóa trang bán', o.step2, 'Trang bán đã duyệt'],
        ['Thử cả luồng mua', 'Chọn biến thể, đặt, tiếp nhận, xử lý thiếu hàng và hủy.', 'Biên bản thử đơn mẫu'],
        ['Đối soát vận hành', 'Lý do hủy, hoàn, sai hàng, chậm xử lý; chọn việc cải thiện trước.', 'Báo cáo đối soát'],
        ['Bàn giao & theo dõi', 'Hướng dẫn người vận hành, lịch rà soát định kỳ.', 'Tài liệu vận hành']],
      icons: ['table', 'tag', 'cart', 'receipt', 'users'],
      phases: [['Dữ liệu', [0, 1]], ['Thử', [2, 3]], ['Bàn giao', [4]]],
      ...o.rollout
    },
    faq: {items: [...o.faq, ...FAQ_COMMON], topics: [['Phạm vi', 'store', [0, 1, 2]], ['Chi phí & nội dung', 'wallet', [3, 4, 5]]], src: o.faqSrc},
    contactGoals: [['new', 'Mở kênh bán mới'], ['fix', 'Sửa gian hàng đang bán'], ['ops', 'Chuẩn hóa vận hành'], ['ads', 'Quảng cáo trên sàn']],
    recap: o.recap,
    sisters: o.sisters
  };
}

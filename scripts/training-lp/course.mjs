// Course factory for the Đào tạo Digital Marketing pages (TRAINING_LP_PLAN.md).
// Every course page shares the method of the training group
// (service-editorial-chapters.mjs: survey, syllabus by output, practice with
// feedback, evaluation of application) and the eight chapters of the
// one-page renderer. A course module hands over what is specific to it.
import {CHECKED, SOURCES, CONTACT} from './sources.mjs';
import {withExtra} from './extra.mjs';

const TOC = {'khi-nao': 'Dành cho ai', 'dinh-dang': 'Chương trình học', 'chuan-bi': 'Cần chuẩn bị',
  'muc-tieu': 'Bài thực hành', 'do-luong': 'Đánh giá', 'trien-khai': 'Lộ trình'};

// Two answers every course shares (from the training group's FAQ).
const FAQ_COMMON = [
  ['Có cấp chứng nhận không?', 'Chứng nhận, đơn vị cấp và điều kiện hoàn thành được xác nhận theo từng chương trình; không mặc định mọi khóa đều có.'],
  ['Có phải dùng ngân sách chạy thật không?', 'Không bắt buộc. Có thể học bằng tình huống và môi trường mô phỏng; chạy thật cần thống nhất tài khoản, quyền và ngân sách trước buổi học.']
];

export function course(o) {
  const name = o.name;
  return withExtra({
    slug: o.slug, channel: o.channel, name, checked: CHECKED, docName: o.docName, SOURCES, sourceLabel: 'Tài liệu tham khảo:',
    toc: TOC, contact: CONTACT,
    meta: {title: o.metaTitle, description: o.metaDescription},
    hero: {sub: o.sub, lead: o.lead, cta: 'Xem chương trình học', rungs: o.rungs},
    when: {eyebrow: 'DÀNH CHO AI', core: 'Học, thực hành, nhận phản hồi', ...o.who},
    formats: {eyebrow: 'CHƯƠNG TRÌNH HỌC', whereLabel: 'Học gì', whatLabel: 'Bài làm', ...o.modules},
    prep: {
      eyebrow: 'CẦN CHUẨN BỊ',
      title: 'Học trên bài toán gần với việc thật.',
      lead: 'Tình huống và dữ liệu càng gần công việc, học viên càng dễ áp dụng sau khóa học.',
      assets: [['Học viên', 'Vai trò, kiến thức nền', 'Công việc cần áp dụng.'], ['Dữ liệu', 'Tình huống được phép dùng', 'Đã ẩn thông tin cá nhân.'],
        ['Công cụ', o.tool, 'Quyền truy cập phù hợp trình độ.'], ['Lịch', 'Hình thức, số buổi', 'Người phối hợp trong doanh nghiệp.']],
      ...o.prep
    },
    goals: {eyebrow: 'BÀI THỰC HÀNH', ...o.practice, items: o.practice.items.map(it => ({stageTag: 'BÀI HỌC VIÊN', ...it}))},
    measure: {
      eyebrow: 'ĐÁNH GIÁ',
      title: 'Đánh giá bằng bài làm, không bằng điểm danh.',
      lead: 'Ba mức: hiểu, làm, ứng dụng. Bấm từng mức; số là một lớp giả định để minh họa cách đọc.',
      sample: 'Một lớp 12 học viên giả định, chỉ để minh họa cách đọc.',
      tiers: [
        ['understand', 'Hiểu', '12', [['Học viên hoàn thành bài học', '12', 'Tham gia đủ phần lý thuyết.'], o.eval[0]]],
        ['do', 'Làm', '10', [['Nộp bài thực hành', '10', 'Đúng hạn, đủ phần.'], o.eval[1]]],
        ['apply', 'Ứng dụng', '8', [['Có kế hoạch áp dụng', '8', 'Việc làm trong 30 ngày.'], o.eval[2]]]
      ],
      tips: {do: 'Nhiều bài thiếu phần giải thích: thêm một buổi chữa bài trước khi sang chủ đề mới.',
        apply: 'Kế hoạch áp dụng chung chung: yêu cầu ghi người làm, thời hạn và cách kiểm tra.'},
      note: {label: 'TIÊU CHÍ ĐẶT TRƯỚC', ic: 'check', text: 'Mỗi bài thực hành có tiêu chí chấm công bố từ đầu. Học viên biết thế nào là đạt trước khi làm.'},
      src: o.evalSrc
    },
    rollout: {
      eyebrow: 'LỘ TRÌNH HỌC',
      title: 'Năm bước từ khảo sát tới áp dụng.',
      lead: 'Mỗi bước kết thúc bằng một thứ xem được. Bên dưới là danh sách kiểm tra trước khi khai giảng.',
      steps: [['Khảo sát đầu vào', 'Người ra quyết định, người vận hành, người đọc báo cáo.', 'Bảng năng lực đầu vào'],
        ['Chốt đề cương', 'Mỗi chủ đề gắn với một bài làm cụ thể.', 'Đề cương, lịch học'],
        ['Học & thực hành', o.practiceStep, 'Bài làm có phản hồi'],
        ['Đánh giá', 'Chấm theo tiêu chí; ghi phần còn cần hướng dẫn.', 'Nhận xét từng học viên'],
        ['Kế hoạch áp dụng', 'Việc làm sau khóa, người làm, cách kiểm tra.', 'Kế hoạch 30 ngày']],
      icons: ['users', 'list', 'form', 'check', 'flag'],
      phases: [['Chuẩn bị', [0, 1]], ['Học', [2, 3]], ['Áp dụng', [4]]],
      checks: o.checks,
      src: o.checksSrc
    },
    faq: {items: [...o.faq, ...FAQ_COMMON], topics: [['Nội dung', 'list', [0, 1, 2]], ['Tổ chức', 'calendar', [3, 4, 5]]], src: o.faqSrc},
    contactGoals: [['team', 'Đào tạo đội ngũ'], ['workshop', 'Workshop theo bài toán'], ['coach', 'Kèm cặp 1–1'], ['path', 'Tư vấn lộ trình học']],
    recap: {title: o.recapTitle, items: o.recap},
    sisters: o.sisters
  });
}

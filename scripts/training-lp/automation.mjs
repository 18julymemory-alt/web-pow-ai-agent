// Đào tạo Automation (TRAINING_LP_PLAN.md). Trigger concepts from the Apps
// Script documentation; the tool itself depends on the client.
import {course} from './course.mjs';
import {syllabus, workflow, pipeline, syncLog, fieldMap, lesson, exercise, rubric, feedback} from './mocks.mjs';
import {CHECKED, sisters} from './sources.mjs';
export {CHECKED};

const MODS = [['bolt', 'Trình kích hoạt', 'Danh sách sự kiện khởi động'], ['sliders', 'Điều kiện', 'Bảng điều kiện'],
  ['repeat', 'Hành động', 'Luồng mẫu'], ['alert', 'Nhánh lỗi, chạy lại', 'Kịch bản lỗi'], ['list', 'Theo dõi', 'Nhật ký và cảnh báo']];

export default course({
  slug: 'automation', channel: 'eduAuto', name: 'Automation',
  docName: 'tài liệu Google Apps Script và OWASP',
  metaTitle: 'Đào tạo Automation marketing: trình kích hoạt, điều kiện, hành động, nhánh lỗi',
  metaDescription: 'Khóa tự động hóa thực hành: vẽ luồng có điều kiện và nhánh lỗi, xử lý dữ liệu trùng và thiếu, chạy lại an toàn và theo dõi nhật ký.',
  sub: 'Tự vẽ luồng có <em>điều kiện</em> và <em>nhánh lỗi</em>.',
  lead: 'Học viên cần tự vẽ luồng có điều kiện và nhánh lỗi. Khóa đi từ trình kích hoạt, điều kiện, hành động tới xử lý lỗi và chạy lại; '
    + 'thử sự kiện trùng và thiếu dữ liệu trước khi coi luồng hoàn tất.',
  rungs: [['bolt', 'Kích hoạt', 'Khi nào chạy'], ['sliders', 'Điều kiện', 'Rẽ nhánh'], ['repeat', 'Hành động', 'Làm gì'],
    ['alert', 'Lỗi', 'Chạy lại an toàn'], ['list', 'Nhật ký', 'Biết dừng ở đâu']],
  tool: 'Công cụ tự động hóa doanh nghiệp chọn',
  who: {
    title: 'Cho người muốn bớt việc chép tay giữa các hệ thống.',
    lead: 'Hợp với nhân sự marketing vận hành, người quản lý CRM, trưởng nhóm muốn chuẩn hóa quy trình tiếp nhận lead.',
    journey: [['bolt', 'Chọn trình kích hoạt'], ['sliders', 'Đặt điều kiện'], ['repeat', 'Thực hiện hành động'], ['alert', 'Xử lý lỗi'], ['list', 'Theo dõi']],
    inputs: [['list', 'Quy trình đang làm tay'], ['link', 'Công cụ, hệ thống cần nối'], ['table', 'Dữ liệu mẫu'], ['users', 'Người nhận cảnh báo']],
    outputs: [['repeat', 'Luồng mẫu'], ['alert', 'Kịch bản lỗi'], ['list', 'Nhật ký và cảnh báo']],
    fit: ['Chép lead từ form sang bảng tính mỗi ngày', 'Gửi email, tin nhắn lặp lại bằng tay', 'Luồng tự động đang chạy hay lỗi âm thầm', 'Muốn tự làm luồng đơn giản'],
    notFit: ['Cần tích hợp phức tạp nhiều hệ thống: xem dịch vụ Tích hợp', 'Không có quyền truy cập hệ thống', 'Muốn tự động hóa việc chưa có quy trình', 'Không ai theo dõi cảnh báo'],
    src: ['triggers', 'owaspApi']
  },
  modules: {
    title: 'Năm chủ đề, từ trình kích hoạt tới nhật ký.',
    lead: 'Chọn một chủ đề để xem học gì và nộp gì.',
    items: [
      {key: 'flow', label: 'Luồng có điều kiện', icon: 'repeat', stage: () => workflow(1), tag: 'BÀI MẪU',
        where: 'Khi nào chạy, rẽ nhánh thế nào.', what: 'Trình kích hoạt, điều kiện, hành động, nhánh thiếu dữ liệu và nhánh lỗi.',
        more: [['Theo', 'Trình kích hoạt có thể theo sự kiện (gửi form, sửa bảng tính) hoặc theo thời gian.']]},
      {key: 'syl', label: 'Đề cương', icon: 'list', stage: () => syllabus(MODS, 3), tag: 'MẪU',
        where: 'Toàn bộ khóa trên một trang.', what: 'Mỗi chủ đề có một bài làm.'},
      {key: 'map', label: 'Ánh xạ dữ liệu', icon: 'table', stage: () => fieldMap(1), tag: 'VÍ DỤ',
        where: 'Trường nào sang trường nào.', what: 'Chuẩn hóa số điện thoại, khóa chống trùng, trường bắt buộc.'},
      {key: 'pipe', label: 'Luồng một lead', icon: 'route', stage: () => pipeline(3), tag: 'SƠ ĐỒ MẪU',
        where: 'Dữ liệu đi qua đâu.', what: 'Mỗi bước ghi trạng thái để biết dừng ở đâu.'},
      {key: 'log', label: 'Nhật ký và chạy lại', icon: 'list', stage: () => syncLog(2), tag: 'NHẬT KÝ MẪU',
        where: 'Bản ghi nào lỗi, đã thử lại chưa.', what: 'Đọc mã trả về, thử lại lỗi tạm thời, báo người khi lỗi kéo dài.'}
    ],
    src: ['triggers', 'mdnStatus']
  },
  prep: {
    principle: 'Luồng chỉ tự động hóa quy trình đã chạy ổn bằng tay. Mỗi luồng có người chịu trách nhiệm và người nhận cảnh báo.',
    boardLabel: 'LUỒNG MẪU',
    boards: [() => workflow(2)],
    tiles: [['list', 'Quy trình hiện tại', 'Các bước đang làm tay'], ['link', 'Công cụ', 'Tài khoản thử'],
      ['table', 'Dữ liệu mẫu', 'Có trùng, có thiếu'], ['bell', 'Người nhận cảnh báo', 'Khi luồng lỗi']],
    specs: [['Trình kích hoạt', 'Theo sự kiện hoặc thời gian', 'Tài liệu trình kích hoạt của Google Apps Script.'],
      ['Kết nối', 'Khóa ở nơi an toàn, quyền tối thiểu', 'OWASP API Security Top 10.'],
      ['Mã trả về', 'Đọc theo nhóm mã HTTP', 'Tài liệu mã trạng thái HTTP của MDN.']],
    src: ['triggers', 'owaspApi', 'mdnStatus']
  },
  practice: {
    title: 'Dựng một luồng và thử cho nó hỏng.',
    lead: 'Nhóm đầu là bài tập, nhóm sau là cách chấm.',
    items: [
      {key: 'ex', group: 'Bài tập', groupColor: '#b8e08f', label: 'Luồng lead mới', icon: 'form', stage: () => exercise({
        title: 'Lead form → bảng tính → báo nhân viên', brief: 'Dựng luồng khi có lead: kiểm tra số điện thoại, ghi bảng tính, báo nhân viên; có nhánh lỗi.',
        data: 'Form thử, bảng tính thử, 20 bản ghi mẫu có trùng và thiếu', criteria: ['Có nhánh thiếu dữ liệu', 'Không tạo bản ghi trùng', 'Lỗi có cảnh báo người nhận']}),
        facts: [['Nộp', 'Sơ đồ luồng, ảnh cấu hình, biên bản thử.'], ['Vì sao', 'Luồng chạy đúng khi mọi thứ đúng chưa đủ.']]},
      {key: 'dup', group: 'Bài tập', groupColor: '#b8e08f', label: 'Thử trùng và thiếu', icon: 'alert', stage: () => syncLog(1),
        facts: [['Làm', 'Gửi bản ghi trùng, thiếu số điện thoại.'], ['Học được', 'Luồng phải biết từ chối.']]},
      {key: 'rubric', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Tiêu chí chấm', icon: 'check', stage: () => rubric([['Trình kích hoạt đúng', 2], ['Có nhánh điều kiện', 1], ['Chống trùng', 0], ['Cảnh báo khi lỗi', 1]], 2),
        facts: [['Mức', 'Chưa đạt, đạt, tốt.'], ['Công bố', 'Trước khi làm bài.']]},
      {key: 'fb', group: 'Cách chấm', groupColor: '#88e4ff', label: 'Nhận xét bài', icon: 'chat', stage: () => feedback(
        [['Chạy mỗi phút, đọc lại toàn bộ bảng', 1], ['Không kiểm tra số điện thoại', 2], ['Lỗi: bỏ qua', 3]],
        [['Dùng trình kích hoạt theo sự kiện gửi form.', 'warn'], ['Thiếu số thì rẽ nhánh xin bổ sung.', 'bad'], ['Lỗi phải được ghi và báo người nhận.', 'bad']]),
        facts: [['Cách làm', 'Chỉ ra lỗi và lý do.'], ['Kết quả', 'Bản sửa được chấm lại.']]}
    ],
    src: ['triggers']
  },
  eval: [['Vẽ được luồng có nhánh lỗi', '11', 'Bài vẽ trên giấy.'], ['Luồng mẫu qua thử lỗi', '8', 'Trùng, thiếu, tạm ngừng.'], ['Tự động hóa một việc thật', '6', 'Trong 30 ngày.']],
  evalSrc: ['triggers'],
  practiceStep: 'Vẽ luồng, dựng trên công cụ thử, thử lỗi, chữa bài.',
  checks: ['Quy trình chạy ổn bằng tay', 'Tài khoản công cụ thử', 'Dữ liệu mẫu có trùng và thiếu', 'Tiêu chí chấm công bố trước',
    'Có nhánh lỗi trong mọi luồng', 'Khóa kết nối không nằm trong tài liệu chia sẻ', 'Người nhận cảnh báo', 'Nhật ký chạy luồng'],
  checksSrc: ['owaspApi', 'triggers'],
  faq: [
    ['Khóa dùng công cụ nào?', 'Công cụ doanh nghiệp đang dùng hoặc chọn; tư duy trình kích hoạt, điều kiện, hành động áp dụng cho nhiều công cụ.'],
    ['Có cần biết lập trình không?', 'Không cho luồng cơ bản; luồng phức tạp hoặc kết nối API riêng cần phối hợp kỹ thuật.'],
    ['Tự động hóa gửi tin nhắn hàng loạt được không?', 'Chỉ gửi cho người đã đồng ý nhận; tuân thủ quy định dữ liệu và chính sách của kênh.'],
    ['Học mấy buổi?', 'Tùy đầu vào; chốt sau khảo sát. Mỗi buổi có một bài làm.']
  ],
  faqSrc: ['triggers'],
  recapTitle: 'Ba thứ học viên mang về.',
  recap: [['Luồng mẫu', 'Có nhánh lỗi.', '#dinh-dang', 'repeat'], ['Kịch bản thử', 'Trùng, thiếu, ngừng.', '#muc-tieu', 'alert'],
    ['Nhật ký, cảnh báo', 'Biết dừng ở đâu.', '#dinh-dang', 'list']],
  sisters: sisters('ai-marketing', 'ga4-tracking', 'dao-tao-doi-ngu-marketing-noi-bo')
});

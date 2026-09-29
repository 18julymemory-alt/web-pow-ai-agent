HOÀN THIỆN 3 TRANG GOOGLE ADS SAU ĐỢT SỬA NGÀY 25/09

Bối cảnh — đã làm xong, KHÔNG làm lại:
- Trang 2 (page-goals.mjs) và trang 3 (page-budget.mjs) đã chuyển sang khung của trang 1: panel-toc, chap-head có số chương, workbench "danh sách | thông tin | mô phỏng".
- Component mới nằm trong scripts/google-ads-lp/scenes.mjs:
  • khung chương: chapterHead, chapter, toc, workbench, facts, note;
  • màn hình điện thoại: siteScreen có nút nổi Gọi/Zalo/Messenger, callScreen, zaloScreen, messengerScreen, formScreen, bookingScreen, mailScreen;
  • hình minh họa: SIGNALS (9 dấu hiệu đối tượng), invoiceScreen, bidScreen, eventStream, crmScreen.
- CSS mới nằm cuối dist/google-ads-lp.css, phần "SCENES". JS có thêm calculator().
- Cảnh "04 · Đo điều gì" ở trang 1 đã dùng các màn hình mới.

Build: node scripts/build-service-pages.mjs --google-only
Xem: node serve.mjs → http://127.0.0.1:4173/dich-vu/quang-cao-da-kenh/google-ads/

GIỮ NGUYÊN toàn bộ nội dung chữ; phần dài đưa vào "Đọc tiếp" (hàm more()/facts()), không xóa.
KHÔNG vẽ logo/wordmark Google, YouTube, Zalo, Messenger.
KHÔNG sửa trang chủ, style.css, navigation.js/css, các trang dịch vụ khác.
Không thêm thư viện.

======================================================================
VIỆC 1 — TRANG 1: CÁC KHỐI CÒN NHIỀU CHỮ
======================================================================

Dùng lại workbench/facts/note trong scenes.mjs.

1a. Chương "02 · Chạy như thế nào" của 5 chiến dịch không phải Search (guideBlocks trong page-formats.mjs):
  - Các thẻ pillars đang toàn chữ → đổi thành workbench.
  - Mỗi mục có một mô phỏng: màn cài đặt chiến dịch trung tính, hoặc machine() đầu vào → lõi → đầu ra.
  - "Ví dụ cấu hình" đưa vào facts().

1b. Chương "05 · Cách triển khai" (chapterPaths):
  - Hướng đi: thẻ có biểu đồ mini bằng lineChart/barChart.
  - Chẩn đoán: bảng báo cáo nhỏ có một chỉ số tô đỏ → mũi tên → thẻ "Kiểm tra". Chữ dài vào "Đọc tiếp".

1c. Khối "Bạn đưa vào / Bạn nhận lại" ở chương 02:
  - Đổi sang machine() của visuals.mjs thay cho hai danh sách chữ.

======================================================================
VIỆC 2 — DỌN CSS
======================================================================

dist/google-ads-lp.css đang ~197 KB vì nhiều lớp style chồng nhau.

- Gom rule trùng, xóa selector không còn xuất hiện trong 3 file HTML đã build.
  Viết script kiểm tra: liệt kê class trong CSS mà HTML/JS không dùng.
- Mục tiêu ≤ 120 KB, không có !important.
- So ảnh chụp trước/sau ở 1440 và 390: khác biệt ≤ 1%.

======================================================================
VIỆC 3 — THÔNG TIN THẬT
======================================================================

Thay placeholder trong shared.mjs (placeholders):
- [HOTLINE] = <điền số hotline>
- [ZALO] = <điền link zalo.me/...>
- [FORM_ENDPOINT] = <điền URL nhận form hoặc để trống nếu chưa có>

Thẻ liên hệ ở chương 09 trang 3:
- Hotline dùng tel:.
- Zalo dùng link zalo.me.

======================================================================
VIỆC 4 — KIỂM TRA LẠI TOÀN BỘ
======================================================================

- Cập nhật scripts/test-google-ads-lp.cjs cho cấu trúc mới của trang 2 và 3. Mỗi trang kiểm tra:
  (a) có đúng 1 .panel-toc, link trỏ đúng id chương;
  (b) mọi .chap có .chap-head.has-num;
  (c) mỗi chương có ≥ 1 trong: .workbench, .stage, .v-pipeline, .v-funnel, .sc-road, .checklist, .sc-faq, form;
  (d) bấm lần lượt mọi nút [data-format] trong mọi .workbench: pane tương ứng hiện, không lỗi console;
  (e) phễu chỉ số, trạm đường ống, 10 bước triển khai, tab hỏi đáp, ô tính thử đều hoạt động;
  (f) 1440 / 768 / 390 / 320px không cuộn ngang.
- Viết scripts/ga-visual-audit.cjs:
  • chụp từng pane của mọi workbench trên cả 3 trang, trước khi chụp đặt img loading="eager";
  • ghép thành ảnh tổng trong .sites-runtime/visual-audit/.
- Soát ảnh tổng. Sửa mọi chỗ:
  • chữ tràn khỏi điện thoại;
  • chữ bị che bởi nút nổi;
  • ảnh trống;
  • tiêu đề quảng cáo quá 2 dòng.

======================================================================
THỨ TỰ LÀM
======================================================================

Việc 1 → 2 → 3 → 4, làm liên tục.
Xong gửi tôi:
- ảnh toàn trang 1440 + 390 của cả 3 trang;
- ảnh tổng audit;
- kết quả test;
- dung lượng CSS trước/sau.

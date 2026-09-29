LÀM LẠI TRANG 2 VÀ TRANG 3 THEO ĐÚNG GIAO DIỆN TRANG 1 — BẮT BUỘC HOÀN THÀNH HẾT

Trang 2: /dich-vu/quang-cao-da-kenh/google-ads/chon-cach-chay/   (scripts/google-ads-lp/page-goals.mjs)
Trang 3: /dich-vu/quang-cao-da-kenh/google-ads/chi-phi-hieu-qua/ (scripts/google-ads-lp/page-budget.mjs)
Chi tiết từng khối: xem PHẦN C trong GOOGLE_ADS_FIX_VISUALS_PROMPT.md.
GIỮ NGUYÊN toàn bộ nội dung chữ; phần không hiện sẵn đưa vào "Đọc tiếp", không xóa.

======================================================================
REVIEW BẢN HIỆN TẠI (đã chạy thử lúc 24/09)
======================================================================

Trang 3 CHƯA ĐƯỢC SỬA:
- File HTML y hệt bản ngày 23/09 (54.833 byte).
- 0 workbench, 0 mô phỏng, 0 thanh chương.
- Vẫn là lưới thẻ chữ: 6 thẻ đặt thầu, 14 dòng chỉ số, 9 thẻ công cụ, 8 thẻ sự kiện.

Trang 2 mới sửa được 1/4:
- Khối "Mục tiêu" có mô phỏng điện thoại đẹp hơn, nhưng cột giữa vẫn hiện đủ 4 khối chữ (yêu cầu là 2).
- Khối "Mức độ sẵn sàng" vẫn là 5 dòng bảng chữ 4 cột.
- Khối "Đối tượng" vẫn là 9 thẻ chữ.
- Không có thanh chương, không có số chương lớn "01 02 03" như trang 1.
- Tiêu đề section vẫn dùng kiểu cũ (kicker + H2), khác trang 1.

Nguyên nhân gốc:
- Các component làm nên giao diện trang 1 đang nằm riêng trong page-formats.mjs, nên trang 2 và 3 không dùng lại được:
  panel-toc, chap-head has-num, chap-num, chap-title, workbench, wb-list, wb-panes, wb-pane, wb-body, wb-facts, stage, demo-tag, device, mk-*.
- google-ads-lp.css tăng lên 159 KB, do mỗi trang tự viết style riêng.

======================================================================
VIỆC 1 — ĐƯA COMPONENT CỦA TRANG 1 VỀ DÙNG CHUNG
======================================================================

Tách từ page-formats.mjs sang scripts/google-ads-lp/shared.mjs và export:
- chapterNav(items)
  → <nav class="panel-toc"> dính ở đầu, tự sáng theo vị trí cuộn.
- chapter({id, num, kicker, title, lead, body})
  → <section class="chap"> với <div class="chap-head has-num"><span class="chap-num">.
- workbench({items, render})
  → wb-list | wb-panes (wb-body + stage).
  → Chọn mục trái thì đổi pane.
  → role tablist/tab/tabpanel, điều khiển được bằng bàn phím.
  → Mobile: wb-list thành hàng cuộn ngang, stage xuống dưới.
- facts(list, {visible:2})
  → chỉ hiện 2 dòng dt/dd, phần còn lại nằm trong nút "Đọc tiếp".
- note({type, title, text})
  → dải ghi chú có icon, chỉ hiện 1 câu + "Đọc tiếp".
- stage(mockHtml)
  → vùng sáng "MÔ PHỎNG".

Yêu cầu:
- Trang 1 chuyển sang dùng các hàm này và phải trông y như cũ (so ảnh trước/sau).
- Gộp CSS trùng về một bộ class dùng chung; google-ads-lp.css ≤ 100 KB.

======================================================================
VIỆC 2 — TRANG 2 (mọi section đi qua chapter(); có chapterNav)
======================================================================

chapterNav: 01 Mục tiêu · 02 Mức độ sẵn sàng · 03 Đối tượng · 04 Tóm tắt

01 Mục tiêu (workbench đã có)
- facts chỉ hiện "Loại chiến dịch" + "Lời kêu gọi".
- "Đo điều gì" và "Doanh nghiệp cần chuẩn bị" vào "Đọc tiếp".
- Dải "Lưu ý" dùng note().

02 Mức độ sẵn sàng (BỎ bảng 5 dòng)
- Đầu chương: dải ngang 5 chặng, hình người nhỏ đứng ở chặng đang chọn, thanh mức độ tô màu.
- workbench:
  • trái: 5 chặng;
  • giữa: facts "Việc cần làm" + "Cách chạy" ("Nội dung nên đưa", "Lời kêu gọi" vào "Đọc tiếp");
  • stage: mô phỏng quảng cáo người ở chặng đó nhìn thấy:
    - Chưa biết bạn: trình phát video có nhãn "Quảng cáo · 0:05" + nút "Bỏ qua";
    - Đã quan tâm: thẻ nguồn cấp khám phá trên điện thoại;
    - Đang cân nhắc: kết quả tìm kiếm có giá/ khuyến mãi;
    - Đã liên hệ: tin nhắn/ quảng cáo nhắc lịch hẹn;
    - Đã mua: thư hướng dẫn sử dụng + gợi ý sản phẩm liên quan.

03 Đối tượng (BỎ lưới 9 thẻ)
- workbench:
  • trái: 9 đối tượng chia 3 nhóm có tiêu đề nhóm + chấm màu;
  • giữa: 1–2 câu + "Chọn khi";
  • stage: hình minh họa tín hiệu cho từng đối tượng, theo mục C2.3 trong GOOGLE_ADS_FIX_VISUALS_PROMPT.md. Không ghi % giả.
- "Điều kiện áp dụng" dùng note().
- Link tài liệu Google chuyển vào "Đọc tiếp" của note.

04 Tóm tắt
- 3 ô có hình minh họa nhỏ.
- Khối "Tiếp theo" giữ.

======================================================================
VIỆC 3 — TRANG 3 (mọi section đi qua chapter(); có chapterNav)
======================================================================

chapterNav: 01 Chi phí · 02 Đặt thầu · 03 Chỉ số · 04 Đo lường · 05 Sự kiện · 06 Triển khai · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

01 Chi phí
- Sơ đồ ngân sách → 3 khoản thành hình dòng tiền chảy vào 3 ngăn.
- workbench 3 mục (Tiền trả cho Google / Thuế và phí / Hóa đơn và bên thanh toán), stage = trang thanh toán/ hóa đơn trung tính, tô sáng đúng dòng.
- Dải "Chưa áp mức thuế" dùng note().
- Thêm công cụ ước tính ngân sách nếu chưa có.

02 Đặt thầu (BỎ lưới 6 thẻ)
- workbench:
  • trái: 6 chiến lược nhóm theo Lượt nhấp · Chuyển đổi · Giá trị · Thủ công;
  • giữa: chip "Doanh nghiệp đưa vào → Google tối ưu theo" + "Cần có" ("Lưu ý" vào "Đọc tiếp");
  • stage: bảng cài đặt giá thầu trung tính + biểu đồ mini cho phần "Ví dụ" (theo C3.2).

03 Chỉ số (BỎ 14 dòng chữ)
- workbench:
  • trái: 5 giai đoạn vẽ thành phễu;
  • giữa: thẻ chỉ số có công thức bằng hình + số mẫu (lời khuyên vào "Đọc tiếp");
  • stage: bảng báo cáo trung tính, tô sáng cột đang chọn.

04 Đo lường (BỎ lưới 9 thẻ)
- Sơ đồ đường ống ở đầu chương; bấm trạm = chọn mục trong workbench.
- stage: giao diện thu nhỏ của từng công cụ (theo C3.4).

05 Sự kiện (BỎ lưới 8 thẻ)
- workbench:
  • trái: 8 sự kiện, nhóm Tín hiệu (vàng) / Đã xác nhận (xanh);
  • stage: điện thoại khách thao tác + khung nhật ký "event: …".

06 Triển khai
- Lộ trình 3 chặng, 10 mốc có icon + huy hiệu đầu ra; bấm mốc hiện chi tiết.

07 Chuẩn bị
- Checklist 3 nhóm + vòng tiến độ.

08 Hỏi đáp
- Tab chủ đề (Chi phí · Đo lường · Chạy & tối ưu · Hợp tác & dữ liệu), mở sẵn câu đầu mỗi tab.

09 Liên hệ
- Form 2–3 bước có thanh tiến độ + thẻ Hotline/ Zalo.

======================================================================
TIÊU CHÍ NGHIỆM THU — viết thành test tự động trong scripts/test-google-ads-lp.cjs, TEST PHẢI PASS MỚI ĐƯỢC BÁO XONG
======================================================================

Với trang 2 và 3:
1. Có đúng 1 <nav class="panel-toc">, số link bằng số chương.
2. Mọi <section> trong <main> (trừ hero, thanh 3 bước, khối "Tiếp theo") có .chap-head.has-num.
3. Mỗi chương có ít nhất 1 trong: .workbench, .stage, .pipeline, svg có kích thước ≥ 240×160.
4. Không còn lưới nào có > 3 thẻ chữ cạnh nhau mà không có hình (không còn .card/.aud/.bid-card/.kpi-row/.term dạng lưới cũ).
5. Trong mỗi .wb-pane đang hiện, số dd hiển thị ≤ 2.
6. Chữ đang hiện (bỏ phần tử ẩn, tab không active, "Đọc tiếp" đang đóng): trang 2 ≤ 800, trang 3 ≤ 1.200; không khối nào > 40 chữ.
7. Toàn bộ chữ gốc vẫn có trong DOM. So với bản hiện tại: tổng chữ trong DOM không giảm quá 3%.
8. 1440 / 768 / 390 / 320px không cuộn ngang; không lỗi console; mọi tab/ workbench bấm được bằng chuột và bàn phím.
9. Trang 1 sau khi đổi sang component dùng chung: chụp lại, khác biệt pixel ≤ 1% so với trước.

======================================================================
CÁCH LÀM
======================================================================

- Làm LIÊN TỤC Việc 1 → 2 → 3, không dừng giữa chừng.
- Chỉ dừng khi test ở trên pass hết.
- Khi xong, gửi tôi:
  (a) ảnh toàn trang 2 và 3 ở 1440 + 390;
  (b) contact sheet mọi stage/ mô phỏng của trang 2 và 3;
  (c) kết quả test;
  (d) danh sách ảnh còn thiếu cập nhật vào ANH-CAN-TAO.md.
- Không sửa trang chủ, style.css, navigation.js/css, các trang dịch vụ khác. Không thêm thư viện.

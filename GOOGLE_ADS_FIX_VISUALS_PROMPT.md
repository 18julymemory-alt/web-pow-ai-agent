SỬA ẢNH/ MÔ PHỎNG CHO GIỐNG THỰC TẾ + LÀM TRANG 2, 3 THEO KIỂU TRANG 1

Phạm vi: 3 trang Google Ads
- Trang 1: /dich-vu/quang-cao-da-kenh/google-ads/ (page-formats.mjs)
- Trang 2: /dich-vu/quang-cao-da-kenh/google-ads/chon-cach-chay/ (page-goals.mjs)
- Trang 3: /dich-vu/quang-cao-da-kenh/google-ads/chi-phi-hieu-qua/ (page-budget.mjs)

Dùng chung: shared.mjs, dist/google-ads-lp.css, dist/google-ads-lp.js.
GIỮ NGUYÊN toàn bộ nội dung chữ. Phần không hiện sẵn thì đưa vào mục mở rộng, không xóa.

======================================================================
PHẦN A — ẢNH ĐANG BỊ MÉO, SAI THỰC TẾ (sửa trước)
======================================================================

Lỗi đã xác định trong dist/assets/ga/ (tạo bởi scripts/ga-crop-photos.cjs):

1. p1–p6.webp (180×189–196px):
   - Cắt từ máy tính bảng đặt nghiêng trong commerce.png → mép xiên, dính viền trắng, dính thanh giao diện ở đáy.
   - Chỉ rộng 180px → mờ khi hiển thị lớn.
2. scene-shelf.webp, scene-tall.webp: dính mép máy tính bảng đen ở cạnh phải.
3. scene-desk.webp: còn viền màn hình → nhìn như "ảnh chụp màn hình trong màn hình".
4. scene-hero.webp: lọ nước hoa trên đá, không khớp thương hiệu mẫu "nến & tinh dầu".
5. Trong mô phỏng:
   - Ảnh bị kéo/ép tỷ lệ.
   - Thẻ quảng cáo quá hẹp: tiêu đề chỉ 1–2 chữ mỗi dòng, "Nến & tinh dầu ·" bị cắt đôi, nhãn "Quảng cáo" bị ép.
   - Khung trình duyệt nghiêng quá nhiều.
   - Quá nhiều thanh xám giả nội dung.

Việc cần làm:

A1. Ảnh sản phẩm
   - Bỏ cách cắt từ vùng máy tính bảng nghiêng.
   - Chỉ dùng ảnh có sản phẩm chụp thẳng, nền sạch.
   - Nếu không cắt được ảnh đạt chuẩn A3 từ ảnh gốc trong dist/assets/product-photos/:
     • đặt ảnh tạm là khung màu trơn có tên sản phẩm;
     • ghi rõ trong file ANH-CAN-TAO.md (xem PHẦN D) để tôi tạo ảnh mới;
     • KHÔNG dùng ảnh lỗi.

A2. Mọi ảnh trong mô phỏng phải nằm trong khung có aspect-ratio cố định + object-fit:cover.
   - Không kéo giãn.
   - Không để lộ viền thiết bị hay giao diện của ảnh gốc.

A3. Chuẩn ảnh
   - Độ phân giải thật ≥ 2 lần kích thước hiển thị lớn nhất.
   - Xuất WebP chất lượng 0.82–0.86.
   - Có bản @1x và @2x (srcset).
   - Ảnh thumbnail ≤ 40 KB, ảnh cảnh ≤ 150 KB.

A4. Thống nhất một thương hiệu mẫu "Nhà Thơm" (nến, tinh dầu, kem dưỡng, khuếch tán, sữa tắm, khăn).
   - Mọi ảnh và mô phỏng dùng đúng bộ sản phẩm này.
   - Bỏ ảnh nước hoa.
   - Tên miền mẫu đổi thành nhathom.example (không dùng tên miền có thể là của doanh nghiệp thật).

A5. Khung trình duyệt/điện thoại trong khối mô phỏng
   - Nghiêng tối đa 3–4° (hero được nghiêng hơn).
   - Không dùng perspective làm chữ trong mô phỏng bị méo.

A6. Chữ trong mô phỏng
   - ≥ 11px ở 1440px.
   - Tiêu đề quảng cáo không xuống dòng quá 2 dòng.
   - Không cắt giữa cụm từ.
   - Khung mô phỏng đủ rộng theo đúng bố cục nền tảng.

A7. Thanh xám giả nội dung
   - Tối đa 2–3 thanh mỗi mô phỏng.
   - Thay bằng nội dung mẫu thật (kết quả tự nhiên, bài viết, video khác).

======================================================================
PHẦN B — CHUẨN BỐ CỤC THỰC TẾ CHO TỪNG ĐỊNH DẠNG
======================================================================

Dựng theo đúng thứ tự thành phần dưới đây.
KHÔNG vẽ logo/wordmark Google, YouTube, Gmail, Play, Zalo, Messenger; dùng thanh tìm kiếm, khung trình duyệt, icon trung tính.

- Search · Quảng cáo văn bản:
  nhãn "Được tài trợ" in đậm → hàng [icon tròn + tên site + URL xám] → tiêu đề xanh (≤ 2 dòng) → mô tả xám 2 dòng.
  Quảng cáo nằm TRÊN kết quả tự nhiên.
- Search · Liên kết trang:
  như trên + 2–4 liên kết con dạng dòng chữ xanh hoặc nút bo tròn dưới mô tả.
- Search · Tài sản hình ảnh:
  như trên + ảnh vuông 1:1 khoảng 90–110px ở bên phải khối chữ.
- Search · Thành phần cuộc gọi:
  trên điện thoại, nút "Gọi" bo tròn nằm cạnh/ dưới tiêu đề.
- Performance Max:
  lưới 4 bề mặt thu nhỏ (kết quả tìm kiếm, thẻ sản phẩm, trình phát video, thẻ nguồn cấp); cùng một ảnh/ tiêu đề xuất hiện ở cả 4.
- Shopping · Thẻ sản phẩm:
  nhóm có nhãn "Được tài trợ" ở đầu. Mỗi thẻ:
  • ảnh vuông 1:1 nền sáng;
  • tên sản phẩm ≤ 2 dòng;
  • giá đậm;
  • tên cửa hàng xám.
  Hàng ngang 4–5 thẻ, cuộn ngang.
- Shopping · Trang sản phẩm:
  ảnh lớn trái, tên + giá + tình trạng còn hàng + nút "Thêm vào giỏ" phải.
- Demand Gen · Ảnh đơn:
  thẻ nguồn cấp trên điện thoại, ảnh 1.91:1 hoặc 4:5 phủ ngang → tiêu đề 1–2 dòng → "Được tài trợ · nhathom.example" → nút hành động.
- Demand Gen · Carousel:
  nhiều thẻ ảnh 1:1 cùng chiều cao, trượt ngang, thẻ sau lộ một phần.
- Demand Gen · Video:
  khung 16:9 hoặc 9:16 có nút phát, tiêu đề và nút hành động dưới.
- Hiển thị (Display):
  trang bài viết có nội dung thật; banner nằm trong ô quảng cáo có nhãn nhỏ "Quảng cáo ⓘ" ở góc.
- Video · Có thể bỏ qua:
  • trình phát 16:9;
  • góc dưới trái: nhãn vàng "Quảng cáo · 0:05";
  • góc dưới phải: nút "Bỏ qua quảng cáo ▸|" (hiện sau giây thứ 5);
  • dưới trình phát: thẻ đồng hành có nút hành động.
- Video · Không thể bỏ qua / Bumper:
  như trên, không có nút bỏ qua; bumper ghi thời lượng ≤ 6 giây.
- Video · In-feed:
  kết quả video (ảnh 16:9 trái, tiêu đề + "Được tài trợ" phải) nằm giữa các kết quả khác.
- Video dọc (Shorts):
  • 9:16 toàn màn;
  • tên kênh + nhãn "Được tài trợ" dưới trái;
  • thanh nút hành động dưới cùng;
  • cột nút tương tác bên phải.
- Masthead:
  banner video lớn đầu trang chủ nền tảng video, dưới là lưới video.
- App · Quảng cáo cài đặt:
  icon ứng dụng 1:1 bo góc → tên → đánh giá/ danh mục → nút "Cài đặt" rộng → dải ảnh chụp màn hình dọc.
- Hộp thư:
  dòng quảng cáo trong hộp thư có nhãn "Được tài trợ", bấm mở ra thư quảng cáo có ảnh.
- Trang đích mẫu:
  đầu trang, tiêu đề, 1 câu, các nút liên hệ (Gọi / Nhắn tin / Để lại thông tin), ảnh sản phẩm/ dịch vụ.

B1. Viết script scripts/ga-visual-audit.cjs:
    - chụp riêng TỪNG khối mô phỏng (mọi định dạng của mọi chiến dịch, cả trang 2 và 3) ở 1440px và 390px;
    - lưu vào .sites-runtime/visual-audit/;
    - ghép thành một ảnh tổng (contact sheet).
B2. Đối chiếu từng ảnh với checklist A2–A7 và bảng PHẦN B, sửa đến khi đạt.
B3. Gửi tôi contact sheet trước và sau khi sửa.

======================================================================
PHẦN C — TRANG 2 VÀ TRANG 3 THIẾT KẾ THEO KIỂU TRANG 1
======================================================================

"Kiểu trang 1" gồm các thành phần sau — dùng lại đúng component trong shared.mjs:
  (1) Thanh chương dính ở đầu (01 … 0n), tự sáng theo vị trí cuộn.
  (2) Đầu chương: số chương lớn gradient + kicker + H2 + 1 câu dẫn.
  (3) WORKBENCH 3 cột:
      • trái: danh sách lựa chọn;
      • giữa: tiêu đề + tối đa 2 dòng thông tin có nhãn;
      • phải: vùng sáng "MÔ PHỎNG" có hình.
      Chọn mục bên trái → cột giữa và mô phỏng đổi theo.
      Mobile: danh sách thành hàng cuộn ngang, mô phỏng xuống dưới.
  (4) Dải ghi chú có icon (Nguyên tắc / Cần đo / Lưu ý) + nút "Đọc tiếp" mở phần còn lại.
  (5) Sơ đồ bước có icon và đường nối.
  (6) Bảng kiểu "Bản vẽ kích thước"/ "Bộ tài nguyên" khi có danh sách.

Quy tắc:
- Tối đa 40 chữ hiện sẵn mỗi khối.
- Cột giữa workbench chỉ hiện 2 dòng thông tin; các dòng còn lại vào "Đọc tiếp".
- Mỗi chương phải có ít nhất 1 mô phỏng/ hình minh họa.

---------- TRANG 2 · CHỌN CÁCH CHẠY ----------
Thêm thanh chương: 01 Mục tiêu · 02 Mức độ sẵn sàng · 03 Đối tượng · 04 Tóm tắt.

C2.1 Mục tiêu (đang là workbench — giữ, tinh chỉnh)
  - Cột giữa chỉ hiện "Loại chiến dịch" và "Lời kêu gọi"; "Đo điều gì" và "Doanh nghiệp cần chuẩn bị" vào "Đọc tiếp".
  - Mỗi mục tiêu một mô phỏng RIÊNG, đúng bảng PHẦN B:
    • Nhận cuộc gọi: kết quả tìm kiếm trên điện thoại có nút Gọi;
    • Yêu cầu tư vấn: trang đích có form;
    • Đặt lịch: trang đích có lịch chọn giờ;
    • Tăng đơn hàng: thẻ sản phẩm Shopping;
    • Truy cập chất lượng: kết quả tìm kiếm → trang dịch vụ;
    • Giới thiệu sản phẩm: trình phát video;
    • Tiếp cận lại: banner trong trang bài viết;
    • Nhận diện: masthead.
  - 4 ô bước dưới mô phỏng giữ.

C2.2 Mức độ sẵn sàng (đang là 5 dòng bảng chữ)
  → Trên cùng: dải ngang 5 chặng có hình người nhỏ di chuyển + thanh mức độ màu.
  → Workbench:
    • trái: 5 chặng (Chưa biết bạn … Đã mua) kèm chấm mức độ;
    • giữa: "Việc cần làm" + "Cách chạy"; "Nội dung nên đưa" và "Lời kêu gọi" vào "Đọc tiếp";
    • phải: mô phỏng quảng cáo mà người ở chặng đó nhìn thấy:
      - Chưa biết bạn: video;
      - Đã quan tâm: thẻ nguồn cấp Demand Gen;
      - Đang cân nhắc: kết quả tìm kiếm có giá;
      - Đã liên hệ: tin nhắn/ quảng cáo nhắc lịch hẹn;
      - Đã mua: thư hướng dẫn sử dụng + gợi ý sản phẩm liên quan.

C2.3 Đối tượng (đang là 9 thẻ chữ)
  → Workbench:
    • trái: 9 đối tượng chia 3 nhóm có tiêu đề nhóm và chấm màu (Ý định · Sở thích & nhân khẩu · Dữ liệu của bạn);
    • giữa: 1–2 câu + "Chọn khi" (phần còn lại vào "Đọc tiếp");
    • phải: hình minh họa TÍN HIỆU:
      - Người đang tìm dịch vụ: thanh tìm kiếm gõ câu;
      - Người đang tìm hiểu để mua: 2 sản phẩm đặt cạnh so sánh;
      - Nhóm cùng sở thích: các bong bóng chủ đề quanh một người;
      - Nhóm do bạn gợi ý: từ khóa/ trang web → nhóm người;
      - Tuổi & giới tính: biểu tượng các nhóm tuổi, KHÔNG ghi % giả;
      - Danh sách khách: bảng tính → mã hóa → khớp;
      - Người đã vào website: trình duyệt có dấu chân qua các trang;
      - Người đã xem video: lịch sử xem;
      - Quảng cáo lại: vòng lặp website → rời đi → thấy lại quảng cáo.
  → "Điều kiện áp dụng" thành dải ghi chú (4) có "Đọc tiếp".

C2.4 Tóm tắt 3 câu hỏi: giữ 3 ô, thêm hình minh họa nhỏ cho mỗi ô.

---------- TRANG 3 · CHI PHÍ & HIỆU QUẢ ----------
Thêm thanh chương: 01 Chi phí · 02 Đặt thầu · 03 Chỉ số · 04 Đo lường · 05 Sự kiện · 06 Triển khai · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ.

C3.1 Chi phí
  - Sơ đồ cây "Ngân sách một tháng → 3 khoản" thành hình minh họa: một ví/ nguồn tiền chia dòng chảy vào 3 ngăn có icon (giữ ghi chú "ba cột bằng nhau vì tỷ trọng khác nhau").
  - 3 thẻ "Tiền trả cho Google / Thuế và phí / Hóa đơn và bên thanh toán" thành workbench:
    • phải: mô phỏng một TRANG THANH TOÁN/ HÓA ĐƠN trung tính (không logo), tô sáng đúng dòng tương ứng (chi phí quảng cáo / dòng thuế / bên xuất hóa đơn).
  - Dải "Chưa áp mức thuế" thành dải ghi chú (4).
  - Nếu chưa có công cụ ước tính ngân sách: thêm lại từ logic trong dist/google-ads-experience.js, kết quả là số lớn + phễu đổi theo số nhập.

C3.2 Đặt thầu (đang là 6 thẻ chữ hiện cùng lúc)
  → Workbench:
    • trái: 6 chiến lược nhóm theo Lượt nhấp · Chuyển đổi · Giá trị · Thủ công;
    • giữa: cặp chip "Doanh nghiệp đưa vào → Google tối ưu theo" + "Cần có"; "Lưu ý" vào "Đọc tiếp";
    • phải: mô phỏng BẢNG CÀI ĐẶT GIÁ THẦU trung tính với lựa chọn đang bật + BIỂU ĐỒ MINI cho phần "Ví dụ":
      - Lượt nhấp: cột lượt nhấp;
      - Chuyển đổi: số yêu cầu;
      - CPA mục tiêu: các chấm chi phí từng yêu cầu dao động quanh đường mục tiêu 200.000 ₫;
      - Giá trị: 2 đơn 500.000 ₫ so với 1 đơn 2.000.000 ₫;
      - ROAS: 1 ₫ vào → 4 ₫ giá trị;
      - Thủ công: thanh trượt CPC tối đa.
  → "Đọc đúng con số mục tiêu" thành dải ghi chú.

C3.3 Chỉ số (đang là 14 dòng chữ dài)
  → Workbench:
    • trái: 5 giai đoạn (Hiển thị · Nhấp · Trang đích · Liên hệ · Đơn hàng & doanh thu) vẽ thành phễu nhỏ dần;
    • giữa: các chỉ số của giai đoạn dưới dạng thẻ nhỏ, mỗi thẻ có công thức bằng hình (vd CTR = [lượt nhấp] ÷ [lần hiển thị] với số mẫu và thanh tỷ lệ); lời khuyên vào "Đọc tiếp";
    • phải: mô phỏng BẢNG BÁO CÁO trung tính, tô sáng cột của các chỉ số đang chọn.

C3.4 Đo lường (đang là 9 thẻ chữ)
  → Trên: sơ đồ đường ống [Liên kết có UTM] → [Trang web + form + nút gọi] → [GTM] → [Chuyển đổi] / [GA4] / [Theo dõi cuộc gọi] → [CRM] → [Offline conversion quay về]; Enhanced Conversions gắn vào form; Merchant Center là nhánh sản phẩm. Chấm dữ liệu chạy dọc ống.
  → Bấm trạm = chọn mục trong workbench bên dưới:
    • giữa: "Cần khi" + "Đầu vào → Đầu ra"; "Không bắt buộc" vào "Đọc tiếp";
    • phải: giao diện thu nhỏ của công cụ:
      - UTM: thanh địa chỉ tô màu tham số;
      - GTM: danh sách thẻ + điều kiện + dấu tích;
      - Chuyển đổi: bảng hành động + số;
      - GA4: biểu đồ đường + danh sách sự kiện;
      - Enhanced Conversions: email ••••@•••• + ổ khóa;
      - Call tracking: nhật ký cuộc gọi, số che;
      - CRM: bảng khách có cột trạng thái;
      - Offline conversion: tệp CSV tải lên;
      - Merchant Center: lưới sản phẩm có trạng thái duyệt.

C3.5 Sự kiện (đang là 8 thẻ chữ)
  → Workbench:
    • trái: 8 sự kiện, chia nhóm "Tín hiệu" (vàng) và "Đã xác nhận" (xanh: qualified_lead, sale);
    • giữa: tên hiển thị + ghi chú;
    • phải: mô phỏng điện thoại khách đang thao tác + một khung nhật ký bên dưới in dòng "event: click_call" tương ứng, hành động trên điện thoại được tô sáng.
  → "Giới hạn của sự kiện" thành dải ghi chú.

C3.6 Triển khai (10 bước)
  → Lộ trình 3 chặng (Chuẩn bị · Dựng · Chạy & tối ưu).
  → 10 mốc có icon + huy hiệu "đầu ra".
  → Bấm mốc hiện chi tiết; đường tô sáng theo cuộn.

C3.7 Chuẩn bị (13 mục): checklist chia 3 nhóm có icon + vòng tiến độ.

C3.8 Hỏi đáp (15 câu): tab chủ đề (Chi phí · Đo lường · Chạy & tối ưu · Hợp tác & dữ liệu), mở sẵn câu đầu mỗi tab.

C3.9 Liên hệ: form 2–3 bước có thanh tiến độ + 2 thẻ Hotline/ Zalo có icon lớn (giữ placeholder [HOTLINE], [ZALO]).

======================================================================
PHẦN D — FILE ANH-CAN-TAO.md
======================================================================

Tạo ANH-CAN-TAO.md ở thư mục gốc, liệt kê mọi ảnh chưa đạt chuẩn A3, mỗi ảnh gồm:
- mã;
- vị trí dùng;
- tỷ lệ và kích thước;
- mô tả để tạo bằng AI.

Yêu cầu chung cho ảnh cần tạo:
- ảnh chụp sản phẩm thật, ánh sáng mềm, nền be/ trắng ấm hoặc bàn gỗ;
- KHÔNG chữ, KHÔNG logo, KHÔNG nhãn thương hiệu trên bao bì, KHÔNG mặt người rõ.

Tối thiểu gồm:
- 6 ảnh sản phẩm 1:1 (1200×1200):
  • nến thơm nắp gỗ 200g;
  • lọ tinh dầu nâu nhỏ giọt 30ml;
  • hũ kem dưỡng trắng nắp đen 50ml;
  • lọ khuếch tán que gỗ 150ml;
  • chai sữa tắm xanh ô liu vòi nhấn 500ml;
  • khăn cotton dệt tổ ong gấp gọn.
- 1 ảnh cảnh "Góc thư giãn cuối ngày" ở 3 tỷ lệ: 1.91:1 (1200×628), 4:5 (960×1200), 9:16 (1080×1920).
- 1 khung hình video 16:9 (1920×1080): bàn tay rót tinh dầu vào máy khuếch tán.
- 1 ảnh dịch vụ cho trang 2: kỹ thuật viên sửa máy lạnh, chỉ thấy tay/ lưng.

Script ga-crop-photos.cjs sửa để đọc ảnh mới từ dist/assets/product-photos/nhathom/ khi có, xuất đúng A3.

======================================================================
KỸ THUẬT & KIỂM TRA
======================================================================

Kỹ thuật:
- Chỉ CSS/SVG + JS thuần, không thêm thư viện, không Three.js.
- Chuyển động dừng khi ngoài màn hình và khi prefers-reduced-motion.
- Workbench và thanh chương dùng role="tablist"/"tab"/"tabpanel", điều khiển được bằng bàn phím.
- google-ads-lp.css hiện 141 KB: gom các rule trùng, bỏ rule không dùng, mục tiêu ≤ 90 KB.
- Không sửa trang chủ, style.css, navigation.js/css, các trang dịch vụ khác.

Kiểm tra:
- 1440 / 768 / 390 / 320px không cuộn ngang.
- Tương phản chữ ≥ 4.5:1.
- Mỗi chương có ≥ 1 hình.
- Chữ hiện sẵn: trang 2 ≤ 800, trang 3 ≤ 1.200.
- Không lỗi console.
- Cập nhật scripts/test-google-ads-lp.cjs cho workbench mới của trang 2 và 3.

THỨ TỰ LÀM — sau mỗi bước build + gửi ảnh cho tôi duyệt rồi mới làm tiếp:
1. PHẦN A + B: sửa ảnh và mô phỏng trang 1. Gửi contact sheet trước/ sau + ANH-CAN-TAO.md.
2. Trang 2: C2.1–C2.4. Chụp 1440 + 390.
3. Trang 3: C3.1–C3.3. Chụp 1440 + 390.
4. Trang 3: C3.4–C3.9. Chụp 1440 + 390.
5. Audit toàn bộ mô phỏng 3 trang bằng ga-visual-audit.cjs + test.

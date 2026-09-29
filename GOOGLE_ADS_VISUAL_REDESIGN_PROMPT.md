Thiết kế lại TOÀN BỘ các khối nhiều chữ trên 3 trang Google Ads theo hướng "nhìn là hiểu":
/dich-vu/quang-cao-da-kenh/google-ads/                    (trang 1 – renderer scripts/google-ads-lp/page-formats.mjs)
/dich-vu/quang-cao-da-kenh/google-ads/chon-cach-chay/     (trang 2 – page-goals.mjs)
/dich-vu/quang-cao-da-kenh/google-ads/chi-phi-hieu-qua/   (trang 3 – page-budget.mjs)
Component dùng chung: scripts/google-ads-lp/shared.mjs · CSS: dist/google-ads-lp.css · JS: dist/google-ads-lp.js
Tham khảo thêm: GOOGLE_ADS_UI_PLAN.md (ưu tiên phần "BẢN BỔ SUNG 23/09").

HIỆN TRẠNG (đo từ bản build hiện tại)
- Trang 1: 8.958 chữ. Mỗi chiến dịch có 6 chương, mỗi chương 100–616 chữ; chỉ chương "Quảng cáo xuất hiện ở đâu" có mô phỏng, các chương còn lại gần như toàn thẻ chữ.
- Trang 2: 2.298 chữ, riêng khối "Doanh nghiệp muốn nhận được điều gì?" 1.252 chữ.
- Trang 3: 3.982 chữ, riêng khối "Đọc từ lần hiển thị tới đồng doanh thu" 1.411 chữ, "Đặt thầu" 774 chữ, FAQ 668 chữ.
- Màu nền/thẻ/viền gần như cùng một màu đen nên nhìn phẳng.

NGUYÊN TẮC BẮT BUỘC
1. GIỮ NGUYÊN toàn bộ nội dung chữ. Chữ không hiện sẵn thì đưa vào phần mở rộng (ngăn chi tiết, tab, "Xem chi tiết", tooltip trên điểm đánh dấu), không xóa.
2. Mỗi khối phải có một HÌNH CHÍNH lớn hơn phần chữ. Khối nói về nền tảng → mô phỏng giao diện nền tảng. Khối nói về quy trình → sơ đồ có chuyển động. Khối nói về con số → biểu đồ/đồng hồ/phễu có số thật mẫu.
3. Tối đa 40 chữ hiện sẵn mỗi khối. Chữ hiện sẵn mỗi lượt xem: trang 1 ≤ 1.500 (một chiến dịch đang mở), trang 2 ≤ 800, trang 3 ≤ 1.200.
4. Mỗi lần chỉ hiện một lựa chọn (một chiến dịch, một mục tiêu, một chiến lược thầu, một tầng phễu…), không hiện song song tất cả.
5. Mô phỏng giống BỐ CỤC thật của nền tảng (thanh tìm kiếm, nhãn "Được tài trợ", thẻ sản phẩm có giá, trình phát có nút "Bỏ qua", trang ứng dụng có nút "Cài đặt", bảng báo cáo, danh sách thẻ…) nhưng KHÔNG vẽ logo/wordmark của Google, YouTube, Zalo, Messenger. Thay luôn ô logo "G" đang có ở hero trang 1 và mọi logo Google khác bằng dạng trung tính. Nút Zalo/Messenger dùng icon chat chung + nhãn chữ.
6. Dùng lại bộ sản phẩm mẫu hiện có (nến thơm, tinh dầu, kem dưỡng…) cho mọi mô phỏng để thống nhất.

MÀU (dist/google-ads-lp.css)
- Hero giữ #02050c như trang chủ, ngay dưới hero chuyển dần sang --bg:#07111F; section xen kẽ --bg-alt:#0B1829.
- Mỗi section có 1–2 quầng sáng radial-gradient 600–800px, màu accent của section ở 18–25%, đặt lệch sau khối chính.
- Thẻ: linear-gradient(160deg,#172A42,#0F1E33); viền rgba(255,255,255,.09); box-shadow inset 0 1px 0 rgba(255,255,255,.08), 0 20px 50px rgba(0,0,0,.35). Hover/đang chọn: linear-gradient(160deg,#1C3350,#122540) + vòng sáng accent.
- Chữ chính #F3F8FC, phụ #C9D8E6, mờ #93A9BE. Thân bài 16px, line-height 1.85, tối đa 68 ký tự/dòng. Không chữ dưới 11px trừ số thứ tự.
- Accent 3 mức: chữ 100%, nền 12%, viền 28%. Chiến dịch: Search #88e4ff, PMax #c0a2ff, Shopping #85e1c1, Demand Gen #ffbd80, Video #ff9bc1, App #e0cd9b. Trạng thái: tốt #8ce0b4, cân nhắc #e0cd9b, cần sửa #ff9b9b.
- --stage:#EEF3F8 làm nền cho mọi mô phỏng giao diện nền tảng.

====================================================================
TRANG 1 — CÁCH CHẠY & ĐỊNH DẠNG
====================================================================

[1.1] Hero (136 chữ) — giữ bố cục. Chồng thẻ 3D bỏ ô logo "G", thay bằng thẻ trung tính (thanh tìm kiếm / trình phát / thẻ sản phẩm). Áp màu mới.

[1.2] #journey "Một lượt hiển thị chỉ là một điểm trên đường đi" (249 chữ, quỹ đạo 6 nút + đoạn giải thích)
→ Cảnh kể chuyện theo cuộn (sticky): bên trái một điện thoại cố định, bên phải 6 chặng. Cuộn tới chặng nào, màn hình điện thoại đổi theo:
  Nhu cầu (bong bóng suy nghĩ) → Tìm/khám phá (gõ tìm kiếm, cuộn nguồn cấp) → Quảng cáo ("Được tài trợ" nổi lên) → Trang đích (trang dịch vụ mở ra) → Hotline/chat/form (ngón tay chạm nút) → Theo dõi khách và đơn hàng (một dòng mới xuất hiện trong bảng khách).
  Mỗi chặng tối đa 25 chữ. Mobile: điện thoại ở trên, chặng lướt ngang.

[1.3] Thẻ chọn 6 loại chiến dịch
→ Thẻ = 60% mô phỏng (trong khung thiết bị nghiêng 3D, trên mảng màu linear-gradient(135deg, accent 35%, accent 8%)) + 40% chữ (số, tên, 1 câu). Đoạn "khi nào dùng" chuyển vào panel thành dòng "Phù hợp khi…".
  Rê chuột/chạm/focus → vòng lặp 4–6 giây: Search gõ tìm → quảng cáo trượt lên đầu; PMax ánh sáng chạy qua 4 màn nhỏ; Shopping băng chuyền sản phẩm, thẻ của mình nổi lên; Demand Gen cuộn nguồn cấp dừng ở thẻ ảnh lớn; Video đến giây 5 hiện "Bỏ qua"; App chạm "Cài đặt" → tải → mở.

[1.4] Panel mỗi chiến dịch — 6 chương. Thêm thanh chương dính ở đầu panel, mỗi chương là một tab có icon; mặc định mở chương 1, bấm mới mở chương khác (không hiện cả 6 cùng lúc).

  [1.4a] "Quảng cáo xuất hiện ở đâu" (228–616 chữ; danh sách định dạng + khối wb-facts "Xuất hiện ở đâu / Khách thấy gì / Cần chuẩn bị")
  → Danh sách định dạng thành hàng tab ẢNH THU NHỎ (mỗi tab là hình nhỏ của định dạng đó), không phải danh sách chữ.
  → Mô phỏng lớn ở giữa trên --stage. 3 dòng wb-facts thành 3 ĐIỂM ĐÁNH DẤU ①②③ gắn trực tiếp lên mô phỏng (① vị trí hiển thị, ② phần khách nhìn thấy, ③ thứ cần chuẩn bị); rê/chạm vào điểm thì hiện chú thích. Dưới mô phỏng chỉ còn 1 câu.
  → Demand Gen (616 chữ, 7 định dạng): gom 3 định dạng Display vào 1 tab "Hiển thị (đang chuyển sang Demand Gen)".

  [1.4b] "Cách hoạt động / Chạy … theo …" (~320 chữ; chuỗi 5 bước + phần riêng từng loại)
  → Chuỗi 5 bước thành sơ đồ hành trình ngang, mỗi chặng có mini-mockup, đường nối phát sáng màu chiến dịch, chấm tín hiệu chạy dọc.
  → "Bạn đưa vào / Bạn nhận lại" thành CỖ MÁY: các ô đầu vào (icon + nhãn: từ khóa, tiêu đề, ảnh, video, nguồn sản phẩm, tín hiệu…) trượt vào khối trung tâm → ra các bề mặt/ kết quả ở bên kia.
  → Search: "Ba mức đối sánh" thành vòng tròn đồng tâm (rộng / cụm từ / chính xác) có chip truy vấn mẫu bay vào/ra khi đổi mức, công tắc "thêm từ phủ định". "Viết trong giới hạn ký tự" thành ô nhập có thanh đếm + bản xem trước kết quả tìm kiếm cạnh bên.

  [1.4c] "Nội dung và thông số" (155–224 chữ; ô thông số + 3 thẻ)
  → Mỗi thông số là một KHUNG ĐÚNG TỶ LỆ (1:1, 1.91:1, 4:5, 9:16, 16:9) có ảnh sản phẩm mẫu bên trong và kích thước ghi trên cạnh như bản vẽ kỹ thuật; thông số ký tự là ô chữ mẫu có thanh đếm.
  → 3 thẻ dưới thành "BỘ TÀI SẢN": một thư mục mở ra, bên trong là các tệp có hình thu nhỏ (ảnh, video, logo, tiêu đề), tick khi đủ.

  [1.4d] "Kết quả chỉ đọc được khi đã đo" (100–166 chữ)
  → Cảnh tương tác: trái điện thoại trang đích có 4 nút Gọi hotline / Nhắn Zalo / Messenger / Gửi form; giữa đường dẫn sáng; phải bảng báo cáo 4 bộ đếm + cột "Đội tư vấn xác nhận". 4 chip là nút điều khiển: bấm → ngón tay chạm nút → chấm tín hiệu (nhãn click_call, click_zalo…) bay sang bảng → bộ đếm +1 → cột xác nhận hiện trạng thái. Đoạn văn còn 1 câu chú thích.
  → "Giá thầu" và "Lưu ý" thành 2 thẻ nhỏ cạnh nhau, mỗi thẻ có hình (núm vặn mục tiêu; vòng đối sánh thu nhỏ), nội dung đầy đủ trong phần mở rộng.

  [1.4e] "Hướng đi và cách đọc khi có vấn đề" (140–276 chữ; 3 hướng đi + các ca chẩn đoán "Dấu hiệu / Kiểm tra")
  → 3 hướng đi thành 3 thẻ "LỘ TRÌNH", mỗi thẻ có biểu đồ mini minh họa kết quả mong đợi (đường tăng, mở rộng vùng, khiên thương hiệu).
  → Mỗi ca chẩn đoán thành một BẢNG ĐIỀU KHIỂN MINI: dòng chỉ số có một chỉ số đỏ (vd lượt nhấp cao / yêu cầu thấp) → mũi tên → thẻ "Kiểm tra" có icon. Bấm để xem chi tiết.

  [1.4f] "Danh sách kiểm tra" (66–100 chữ) — giữ checklist + vòng tiến độ, thêm icon cho từng mục, gom theo nhóm.

[1.5] #recap "Sáu loại, sáu tình huống" (159 chữ)
→ 6 ô, mỗi ô: hình thu nhỏ mô phỏng của loại đó + 1 câu tình huống; bấm quay lại panel tương ứng. Khối "Chưa rõ nên chạy loại nào?" có hình mũi tên dẫn sang trang 2.

====================================================================
TRANG 2 — CHỌN CÁCH CHẠY
====================================================================

[2.1] Hero (124 chữ, bậc thang 3D 5 tầng) → giữ, biến thành cầu thang 3D có hình người nhỏ đi lên từng bậc (Chưa biết bạn → Đã mua), mỗi bậc sáng lên theo thứ tự.

[2.2] #muc-tieu "Doanh nghiệp muốn nhận được điều gì?" (1.252 chữ; 8 mục tiêu, mỗi mục có mô phỏng + chuỗi + wb-facts, đang hiện cả 8)
→ Trên: 8 Ô MỤC TIÊU lớn có icon và màu (2 hàng × 4, mobile 2 × 4 cuộn ngang). Mỗi lần chỉ mở 1 mục.
→ Dưới: MỘT panel kết quả cho mục đang chọn: trái = mô phỏng chiến dịch gợi ý; phải = chuỗi thành dãy 3–4 icon nối nhau; wb-facts thành 3 huy hiệu có icon. Phần giải thích dài vào "Xem chi tiết".
→ Chữ hiện sẵn cả khối ≤ 180.

[2.3] #hanh-trinh "Cùng một người, khác thời điểm…" (294 chữ; 5 bậc có chấm mức độ)
→ Dải hành trình ngang với hình người di chuyển qua 5 chặng; ở mỗi chặng hiện MẪU QUẢNG CÁO người đó nhìn thấy (video → nguồn cấp khám phá → kết quả tìm kiếm → quảng cáo nhắc lại → tin nhắn sau mua). Chấm mức độ thành thanh nhiệt độ màu.

[2.4] #doi-tuong "Nhắm ai, và nhắm bằng dấu hiệu gì" (481 chữ; 9 thẻ đối tượng)
→ Chia 3 NHÓM màu: Ý định (đang tìm dịch vụ, đang tìm hiểu để mua) · Sở thích & nhân khẩu (cùng sở thích, nhóm do bạn gợi ý, tuổi & giới tính) · Dữ liệu của bạn (danh sách khách, người đã vào website, người đã xem video, quảng cáo lại).
→ Mỗi thẻ là MỘT HÌNH MINH HỌA tín hiệu: thanh tìm kiếm; giỏ hàng; bong bóng sở thích; từ khóa → nhóm người; biểu tượng tuổi/giới; bảng tính → mã hóa → khớp; trình duyệt có dấu chân; trình phát video; mũi tên vòng lặp. Mặt trước: hình + tên; lật/ mở để đọc chi tiết.

[2.5] "Ba câu hỏi trước khi mở tài khoản" (96 chữ) → 3 ô số lớn có icon, nối nhau bằng mũi tên; khối tiếp theo có hình dẫn sang trang 3.

====================================================================
TRANG 3 — CHI PHÍ & HIỆU QUẢ
====================================================================

[3.1] Hero (104 chữ, phễu 5 mức meter3d) → phễu kính 3D, các hạt sáng rơi qua từng tầng và thưa dần (Lần hiển thị → Khách có nhu cầu phù hợp), số mẫu ở mỗi tầng.

[3.2] #chi-phi "Ngân sách quảng cáo không phải toàn bộ chi phí" (262 chữ; 4 phần chi phí + 3 thẻ)
→ Một BIỂU ĐỒ ngân sách một tháng mẫu (cột xếp chồng hoặc vòng tròn) 4 phần màu: Trả cho nền tảng / Sản xuất & vận hành / Phí dịch vụ; rê vào phần nào hiện giải thích phần đó.
→ 3 thẻ "Tiền trả cho Google / Thuế và phí / Hóa đơn và bên thanh toán" thành 3 hình: hóa đơn mẫu, dấu thuế, thẻ thanh toán — chữ trong phần mở rộng.
→ Nếu trang chưa có công cụ ước tính ngân sách: thêm lại từ logic trong dist/google-ads-experience.js (ngân sách/ngày × số ngày, CPL tự nhập → số yêu cầu), kết quả hiện số lớn + phễu thay đổi theo số nhập, ghi rõ "phép tính tham khảo".

[3.3] #dat-thau "Đặt thầu là chọn điều muốn Google tối ưu" (774 chữ; 6 thẻ chiến lược hiện cùng lúc)
→ Một DẢI CHỌN từ "Tự kiểm soát" tới "Tự động theo giá trị": CPC thủ công · Tối đa hóa lượt nhấp · Tối đa hóa chuyển đổi · CPA mục tiêu · Tối đa hóa giá trị · ROAS mục tiêu. Mỗi lần chỉ hiện 1.
→ Panel chiến lược đang chọn: sơ đồ "Doanh nghiệp đưa vào → khối tối ưu → Google tối ưu theo" có chuyển động; ví dụ vẽ thành BIỂU ĐỒ MINI (vd CPA mục tiêu: các chấm chi phí từng yêu cầu dao động quanh đường mục tiêu; ROAS 400%: 1 đồng vào → 4 đồng giá trị; tối đa hóa giá trị: 2 đơn nhỏ vs 1 đơn lớn). Lưu ý vào thẻ màu vàng thu gọn.

[3.4] #do-luong (1.411 chữ) — tách thành 3 cảnh:
  [3.4a] "Đọc từ lần hiển thị tới đồng doanh thu" (5 giai đoạn, 14 chỉ số)
  → PHỄU TƯƠNG TÁC dọc: mỗi tầng rộng theo số mẫu; bấm tầng → hiện chỉ số của tầng đó dưới dạng PHƯƠNG TRÌNH HÌNH (vd CTR = lượt nhấp ÷ lần hiển thị, với số mẫu và thanh tỷ lệ), lời khuyên trong ngăn chi tiết.
  [3.4b] "Muốn có con số thì phải cài trước" (9 công cụ)
  → SƠ ĐỒ ĐƯỜNG ỐNG: [Liên kết có UTM] → [Trang web + form + nút gọi] → [GTM] → [Chuyển đổi Google Ads] / [GA4] / [Call tracking] → [CRM / lead sheet] → [Offline conversion quay về Google Ads]; Enhanced Conversions gắn vào form; Merchant Center là nhánh riêng cho sản phẩm.
    Mỗi trạm có GIAO DIỆN THU NHỎ: UTM thanh địa chỉ tô màu tham số; GTM danh sách thẻ + tích khi chạy; Chuyển đổi bảng hành động + số; GA4 biểu đồ đường + danh sách sự kiện; Enhanced Conversions ô email ••••@•••• + ổ khóa; Call tracking nhật ký cuộc gọi (số che); CRM bảng khách có cột trạng thái; Offline conversion mũi tên quay về kèm dòng đơn hàng; Merchant Center lưới sản phẩm có trạng thái duyệt.
    Chấm dữ liệu chạy dọc ống; bấm trạm mở ngăn chi tiết với đủ Cần khi / Không bắt buộc / Đầu vào → Đầu ra. Mobile: ống xoay dọc.
  [3.4c] "Đặt tên thống nhất để không đọc nhầm" (8 sự kiện)
  → DÒNG SỰ KIỆN theo hành trình một khách: mỗi hành động (xem trang, xem dịch vụ, bấm gọi, nhấp Zalo, nhấp Messenger, gửi yêu cầu, được xác nhận, mua) bật ra một nhãn sự kiện kiểu nhật ký (page_view, view_service…). Nhóm "tín hiệu" màu vàng, nhóm "đã xác nhận" (qualified_lead, sale) màu xanh.

[3.5] #trien-khai "POWAI làm gì…" (297 chữ; 10 bước) → LỘ TRÌNH 3 chặng (Chuẩn bị · Dựng · Chạy & tối ưu) dạng đường cong có 10 mốc; mỗi mốc icon + huy hiệu "đầu ra"; đường tô sáng dần theo cuộn.

[3.6] #chuan-bi "Mười ba thứ cần có…" → giữ checklist + vòng tiến độ, gom 3 nhóm có icon (Tài khoản & quyền · Đo lường · Nội dung & trang đích).

[3.7] #faq (668 chữ, 15 câu) → tab chủ đề có icon: Chi phí · Đo lường · Chạy & tối ưu · Hợp tác & dữ liệu; mở sẵn câu đầu mỗi tab; câu trả lời có icon/ minh họa nhỏ khi phù hợp.

[3.8] #lien-he → form thành 2–3 bước có thanh tiến độ; bên cạnh 2 thẻ Hotline / Zalo có icon lớn ([HOTLINE], [ZALO] giữ placeholder); nền quầng sáng cyan.

[3.9] "Ba việc quyết định hiệu quả ngân sách" → 3 ô số lớn có icon + hình dẫn về trang 1.

====================================================================
VIDEO NGẮN (làm sau cùng, tùy chọn)
====================================================================
Dùng Playwright recordVideo quay 6 vòng lặp ở [1.3] và cảnh [1.2], nén ffmpeg sang WebM + MP4, 720p, 4–6 giây, mỗi file < 500 KB, lưu dist/assets/ga-lp/video/, có poster WebP. Đặt ở đầu mỗi panel chiến dịch với muted loop playsinline preload="none", chỉ phát khi vào màn hình. Không có ffmpeg thì bỏ qua và báo tôi.

KỸ THUẬT
- Chỉ CSS/SVG + JS thuần. 3D bằng perspective/transform, chỉ animate transform/opacity. Không thêm thư viện, không Three.js.
- Mọi chuyển động chỉ chạy khi khối trong màn hình (IntersectionObserver), tắt khi prefers-reduced-motion (hiện khung tĩnh cuối). Nghiêng theo chuột chỉ bật khi (hover:hover).
- Hình minh họa/ mô phỏng viết thành hàm tái sử dụng trong scripts/google-ads-lp/visuals.mjs; dữ liệu lấy từ file data hiện có.
- Tab/ chọn một-trong-nhiều dùng role="tablist"/"tab"/"tabpanel", điều khiển được bằng bàn phím; điểm đánh dấu trên mô phỏng là <button> có aria-label.
- Không sửa trang chủ, style.css, navigation.js/css, header/menu/footer, các trang dịch vụ khác.

KIỂM TRA (cập nhật scripts/test-google-ads-lp.cjs)
- 1440 / 768 / 390 / 320px không cuộn ngang; tương phản chữ ≥ 4.5:1.
- Đếm chữ ĐANG HIỆN (bỏ qua phần tử ẩn, tab không active, ngăn đóng): trang 1 ≤ 1.500 mỗi chiến dịch, trang 2 ≤ 800, trang 3 ≤ 1.200; không khối nào > 40 chữ hiện sẵn.
- Mỗi section có ít nhất 1 hình (svg/ mô phỏng/ video).
- Mọi tab, điểm đánh dấu, trạm đường ống, phễu, checklist, form hoạt động; không lỗi console.
- Mỗi trang < 600 KB chưa tính video.

THỨ TỰ LÀM — sau mỗi bước build rồi chụp desktop 1440 + mobile 390 cho tôi duyệt trước khi sang bước sau:
1. Màu + visuals.mjs (bộ mô phỏng, icon, khung tỷ lệ, đường ống, phễu dùng chung).
2. Trang 1: [1.1]–[1.3].
3. Trang 1: [1.4a]–[1.4f] cho Search trước; tôi duyệt xong mới áp cho 5 chiến dịch còn lại; rồi [1.5].
4. Trang 2: [2.1]–[2.5].
5. Trang 3: [3.1]–[3.3].
6. Trang 3: [3.4]–[3.9].
7. Video ngắn + test.

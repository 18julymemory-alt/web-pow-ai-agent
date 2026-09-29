LÀM LẠI TRANG TIKTOK ADS THEO ĐÚNG FORMAT GOOGLE ADS / FACEBOOK ADS (3 TRANG)

Mục tiêu: trang dịch vụ TikTok Ads trông và hoạt động giống bộ 3 trang Google Ads và Facebook Ads đã làm xong:
- cùng khung, màu và component;
- thanh 3 bước, mục lục dính, số chương lớn;
- workbench "danh sách | thông tin | mô phỏng", nút "Đọc tiếp";
- mô phỏng giống thật, sơ đồ, phễu, đường ống.

XÓA toàn bộ nội dung và code TikTok cũ, viết nội dung mới.

Mẫu để làm theo: scripts/facebook-ads-lp/ (data.mjs, mocks.mjs, page-formats.mjs, page-goals.mjs, page-budget.mjs) và buildFacebookAds() trong scripts/build-service-pages.mjs. TikTok làm y hệt cách Facebook đã làm.

======================================================================
0. XÓA CÁI CŨ
======================================================================

Xóa hẳn (vẫn còn trong git nếu cần xem lại):
- scripts/tiktok-detail-page.mjs (99 KB)
- scripts/test-tiktok-ads.cjs
- dist/tiktok-ads-detail.css
- dist/tiktok-ads-detail.js
- Ảnh chụp/video cũ của TikTok trong screenshots/, .sites-runtime/ (nếu có)

Trong scripts/build-service-pages.mjs:
- bỏ import tiktokDetailPage;
- bỏ nhánh --tiktok-only cũ và nhánh child.slug==='tiktok-ads' trong vòng lặp;
- thay bằng buildTikTokAds() giống buildFacebookAds();
- --tiktok-only chỉ build 3 trang TikTok mới.

Các kênh khác (Google, Facebook, Instagram, YouTube, Zalo…) phải build ra giống hệt trước khi sửa. So sánh file HTML trước/sau.

======================================================================
1. KIẾN TRÚC — DÙNG CHUNG, KHÔNG COPY
======================================================================

Tạo thư mục scripts/tiktok-ads-lp/ gồm:
- data.mjs
- mocks.mjs
- page-formats.mjs
- page-goals.mjs
- page-budget.mjs

Dùng lại từ scripts/google-ads-lp/ (shared, visuals, scenes: chapter, toc, workbench, facts, note, siteScreen, formScreen, invoiceScreen, bidScreen, eventStream, crmScreen, SIGNALS, funnel, pipeline…) và từ facebook-ads-lp/ nếu có phần dùng được.

shared.mjs hiện có document_({channel}) với nhánh riêng cho 'facebook' và FB_PAGES:
- Đổi thành bảng cấu hình CHANNELS = {google, facebook, tiktok}. Mỗi kênh có:
  • pages (3 trang);
  • nhãn stepsBar;
  • nhãn crumbs;
  • CSS phụ (nếu có);
  • accent mặc định;
  • nhãn nguồn ("Tài liệu Google:", "Tài liệu Meta:", "Tài liệu TikTok:").
- Không thêm if/else cho từng kênh.
- Build lại Google và Facebook phải ra HTML giống hệt (trừ thay đổi bắt buộc).

CSS và JS:
- 3 trang TikTok load: style.css, navigation.css, google-ads-lp.css và dist/tiktok-ads-lp.css (chỉ style mock TikTok, ≤ 25 KB).
- JS dùng lại dist/google-ads-lp.js.
- Body class "ga-lp tt-lp". Accent mặc định #ff9bc1 (màu Social & Nội dung của trang chủ).

URL:
1. /dich-vu/quang-cao-da-kenh/tiktok-ads/ — Cách chạy & định dạng
2. /dich-vu/quang-cao-da-kenh/tiktok-ads/chon-cach-chay/ — Chọn cách chạy
3. /dich-vu/quang-cao-da-kenh/tiktok-ads/chi-phi-hieu-qua/ — Chi phí & hiệu quả

Hash cũ của trang TikTok chuyển về trang 1.

======================================================================
2. MÔ PHỎNG TIKTOK (scripts/tiktok-ads-lp/mocks.mjs)
======================================================================

Quy tắc chung:
- bố cục thật, KHÔNG vẽ logo/wordmark TikTok (kể cả hình nốt nhạc), CapCut, Lemon8, TikTok Shop;
- thương hiệu mẫu Nhà Thơm (nhathom.example) và 6 sản phẩm có sẵn;
- khung 9:16 là chính;
- ảnh/video trong khung tỷ lệ cố định, object-fit:cover;
- chữ ≥ 11px;
- nghiêng tối đa 4°.

Mock cần có:
- Video Dành cho bạn (quảng cáo In-Feed), điện thoại 9:16 toàn màn:
  • tab trên cùng "Đang follow · Dành cho bạn";
  • cột nút bên phải: avatar, tim, bình luận, lưu, chia sẻ, đĩa nhạc tròn;
  • góc dưới trái: tên tài khoản + nhãn "Được tài trợ" + chú thích 2 dòng + dòng nhạc chạy;
  • thanh nút hành động dưới cùng, đổi màu sau vài giây (Mua ngay / Tìm hiểu thêm / Gửi tin nhắn).
- Spark Ads: giống trên nhưng là bài của tài khoản thật / nhà sáng tạo, có "Được tài trợ", nút Follow, số lượt thích.
- Quảng cáo dạng ảnh (carousel ảnh): nhiều ảnh vuốt ngang, chấm chỉ số ảnh, nhạc nền.
- Video có gắn sản phẩm: thẻ sản phẩm nhỏ nổi trên video (ảnh + tên + giá) → bấm mở trang sản phẩm trong ứng dụng có nút "Mua ngay".
- LIVE bán hàng: màn LIVE có số người xem, bình luận chạy, túi hàng có số sản phẩm, thẻ sản phẩm đang ghim.
- Kết quả tìm kiếm: ô tìm kiếm, lưới 2 cột video, một ô có nhãn "Được tài trợ".
- Form khách hàng tiềm năng (Instant Form): video → nút "Đăng ký" → form trong ứng dụng (họ tên, số điện thoại tự điền) → màn cảm ơn.
- Nhắn tin trực tiếp: nút "Gửi tin nhắn" → khung chat trong ứng dụng có câu chào + câu hỏi gợi ý. Nếu dẫn qua Zalo/Messenger thì dùng lại zaloScreen/messengerScreen.
- Mở ứng dụng (TopView / TopReach): video toàn màn khi mở app, đếm ngược góc trên, chuyển mượt sang bảng tin.
- Mạng đối tác (TikTok Ad Network / Global App Bundle): quảng cáo xen trong một ứng dụng khác, chỉ ghi tên bằng chữ, không logo.
- Hero trang 1: chồng thẻ 3D gồm video Dành cho bạn, LIVE bán hàng, kết quả tìm kiếm, thẻ sản phẩm.

======================================================================
3. TRANG 1 — CÁCH CHẠY & ĐỊNH DẠNG
======================================================================

Phần mở đầu:
- Hero: "TikTok Ads" — "Từ một video đến một hành động có thể đo."
- Thanh 3 bước.
- Quỹ đạo hành trình: Lướt video → Dừng xem → Bấm / nhắn / mua → Trang đích / form / cửa hàng → Tư vấn → Đơn hàng & CRM.

Bộ chọn 6 kiểu quảng cáo, mỗi kiểu 1 màu:
1. Video trên Dành cho bạn (In-Feed) — #ff9bc1
2. Spark Ads (đẩy bài của tài khoản / nhà sáng tạo) — #c0a2ff
3. Thu hút khách tiềm năng (form & nhắn tin) — #ffbd80
4. Bán hàng qua video & LIVE (cửa hàng TikTok, GMV Max) — #85e1c1
5. Quảng cáo tìm kiếm — #88e4ff
6. Nhận diện thương hiệu (TopView / TopReach, đặt trước) — #e0cd9b

Mỗi kiểu có đủ 6 chương như Google/Facebook:
- 01 Trông như thế nào: workbench các vị trí/định dạng hiển thị, mỗi mục 1 mock ở mục 2.
- 02 Chạy như thế nào: flow 5 bước + machine() "Bạn đưa vào → TikTok tối ưu → Bạn nhận lại". Riêng kiểu 4 có sơ đồ GMV Max gom quảng cáo, video tự nhiên, nhà sáng tạo và LIVE.
- 03 Cần chuẩn bị gì:
  • bản vẽ khung 9:16 (vùng an toàn: tránh cột nút phải và vùng chữ dưới);
  • khung 1:1 cho mạng đối tác;
  • ô đếm ký tự cho chú thích / tên hiển thị;
  • thời lượng video khuyến nghị;
  • nhạc thương mại được phép dùng;
  • bộ tài nguyên.
- 04 Đo điều gì: dùng lại cảnh tương tác "trang/ứng dụng → màn hình khách thấy → bảng báo cáo". Với kiểu 3 là form/khung chat, kiểu 4 là đơn trong cửa hàng. Bảng báo cáo có cột "Đội tư vấn xác nhận" / "Đơn đã giao".
- 05 Cách triển khai: hướng đi (biểu đồ mini) + chẩn đoán, ví dụ:
  • "xem nhiều nhưng ít bấm";
  • "bấm nhiều nhưng ít đơn";
  • "video mất hiệu quả sau vài ngày" (mỏi nội dung).
- 06 Trước khi chạy: checklist có vòng tiến độ.

Kết trang: "Nhớ nhanh" 6 ô + khối sang trang 2.

======================================================================
4. TRANG 2 — CHỌN CÁCH CHẠY
======================================================================

Mục lục: 01 Mục tiêu · 02 Mức độ sẵn sàng · 03 Đối tượng · 04 Tóm tắt

01 Mục tiêu:
- Các mục tiêu chiến dịch hiện hành trong TikTok Ads Manager, ví dụ: Phạm vi tiếp cận, Lưu lượng truy cập, Lượt xem video, Tương tác cộng đồng, Quảng bá ứng dụng, Thu hút khách hàng tiềm năng, Doanh số / Bán sản phẩm. Kiểm chứng danh sách chính xác (mục 6).
- Mỗi mục trong workbench:
  • facts hiện sẵn: "Tối ưu cho" + "Khách đi đâu sau khi bấm";
  • "Đo điều gì" và "Cần chuẩn bị" để trong "Đọc tiếp";
  • stage là màn hình khách thấy.
- Ghi chú Smart+: bật/tắt tự động từng phần (nội dung, đối tượng, ngân sách, vị trí).

02 Mức độ sẵn sàng — 5 mức, stage là quảng cáo TikTok hợp với từng mức:
- Chưa biết: TopView / In-Feed;
- Đã quan tâm: Spark Ads của nhà sáng tạo;
- Đang cân nhắc: quảng cáo tìm kiếm / video có gắn sản phẩm;
- Đã liên hệ: tin nhắn nhắc lịch;
- Đã mua: quảng cáo nhắc mua lại / LIVE.

03 Đối tượng — workbench chia 3 nhóm màu, mỗi mục một hình minh họa:
- Ràng buộc cứng: vị trí, độ tuổi, ngôn ngữ.
- Dấu hiệu hành vi: sở thích, tương tác với video, tương tác với nhà sáng tạo, hashtag, nhắm tự động / Smart+.
- Dữ liệu của doanh nghiệp: danh sách khách, người vào website (Pixel), người tương tác tài khoản/video, người từng mở form, người mua trong cửa hàng, đối tượng tương tự.
- Ghi chú điều kiện áp dụng + nguồn TikTok.

04 Tóm tắt + khối sang trang 3.

======================================================================
5. TRANG 3 — CHI PHÍ & HIỆU QUẢ
======================================================================

Mục lục: 01 Chi phí · 02 Đặt thầu · 03 Chỉ số · 04 Đo lường · 05 Sự kiện · 06 Triển khai · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

01 Chi phí
- Sơ đồ 3 khoản: trả cho TikTok / sản xuất video & nhà sáng tạo / phí dịch vụ POWAI.
- Workbench, stage là chứng từ thanh toán mẫu tô sáng đúng dòng:
  • ngân sách hằng ngày vs trọn đời (và mức tối thiểu hiện hành);
  • nạp tiền / thanh toán;
  • thuế GTGT;
  • hóa đơn.
- Ô tự tính thử (để trống).
- VỀ THUẾ:
  • Trang trợ giúp TikTok "Việt Nam: Thuế GTGT (VAT) và Thuế TNDN" (ads.tiktok.com/help/article/vietnam-vat-cit?lang=vi) ghi: từ 01/07/2025 TikTok áp thuế GTGT 10% cho dịch vụ quảng cáo với khách tại Việt Nam, theo Luật Thuế GTGT 48/2024/QH15. Tổ chức đã đăng ký thuế cập nhật mã số thuế 10 hoặc 13 số để hiện trên hóa đơn.
  • Kiểm tra lại trang này khi làm. Nếu vẫn đúng thì ghi mức 10% kèm nguồn + ngày kiểm tra, ví dụ minh họa "1.000 + 100 thuế = 1.100".
  • Nếu trang đã đổi thì ghi theo trang mới. Không truy cập được thì để taxRate = null như Google.

02 Đặt thầu — workbench + bidScreen với chiến lược hiện hành:
- Phân phối tối đa;
- Giới hạn chi phí;
- Giới hạn giá thầu;
- ROAS tối thiểu / Giá trị cao nhất;
- ROI mục tiêu của GMV Max.
Mỗi chiến lược có biểu đồ mini minh họa ví dụ.

03 Chỉ số — phễu bấm được, công thức bằng hình với số mẫu:
- Hiển thị: Lượt hiển thị, Tiếp cận, Tần suất, CPM.
- Xem: lượt xem 2 giây / 6 giây, thời gian xem trung bình, tỷ lệ xem hết.
- Nhấp: Lượt nhấp, CTR, CPC.
- Khách tiềm năng / tin nhắn: Lead, CPL, Lead phù hợp, CPQL, số cuộc trò chuyện.
- Đơn hàng: Lượt mua, GMV / doanh thu, ROAS / ROI, CAC.
Ghi rõ "số mẫu, không phải kết quả dự kiến".

04 Đo lường — sơ đồ đường ống, mỗi trạm một giao diện thu nhỏ:
- UTM → Website + TikTok Pixel → Events API (máy chủ) → Trình quản lý sự kiện;
- Form tức thì → tải lead / nối CRM;
- Tin nhắn → CRM;
- Dữ liệu cửa hàng TikTok (đơn, GMV);
- Sự kiện ngoại tuyến / CRM quay về TikTok;
- Danh mục sản phẩm.

05 Sự kiện — workbench chia "Tín hiệu" và "Đã xác nhận", stage là điện thoại đang thao tác + nhật ký sự kiện:
- Sự kiện chuẩn hiện hành, ví dụ: ViewContent, ClickButton, Contact, SubmitForm, CompleteRegistration, AddToCart, PlaceAnOrder, CompletePayment — kiểm chứng tên chính xác;
- "Lead phù hợp" (CRM).

06 Triển khai (10 bước, 3 chặng) · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

07 Chuẩn bị — checklist chia nhóm:
- Trung tâm doanh nghiệp, tài khoản quảng cáo, tài khoản TikTok (để chạy Spark Ads), quyền;
- thanh toán & mã số thuế;
- Pixel + Events API;
- cửa hàng & danh mục (nếu bán hàng);
- video dọc 9:16;
- nhạc được phép dùng;
- nhà sáng tạo;
- người trực tin nhắn / LIVE.

08 Hỏi đáp — tab theo chủ đề, khoảng 12–15 câu viết mới:
- chi phí tối thiểu;
- cần bao nhiêu video;
- có cần KOC/nhà sáng tạo không;
- Spark Ads khác gì quảng cáo thường;
- GMV Max là gì;
- vì sao nhiều view ít đơn;
- video bị từ chối vì nhạc/nội dung;
- tài khoản bị hạn chế;
- ai giữ tài khoản…

09 Liên hệ — dùng lại form + thẻ Hotline/Zalo và placeholder chung.

Kết trang: Tóm tắt 3 ô + khối "Xem thêm Google Ads / Facebook Ads".

======================================================================
6. NỘI DUNG PHẢI ĐÚNG VỚI TIKTOK HIỆN TẠI
======================================================================

- Mọi thông tin về nền tảng phải đối chiếu TikTok Ads Manager Help Center (ads.tiktok.com/help) hoặc TikTok for Business. Lưu nguồn + ngày kiểm tra trong data.mjs, hiển thị "Tài liệu TikTok ↗" ở từng chương.
- Điểm cần kiểm chứng trước khi viết (theo tổng hợp 2025–2026, KHÔNG chép nếu TikTok không xác nhận):
  • danh sách mục tiêu chiến dịch hiện hành (có bài nói năm 2026 thêm Brand Consideration, Brand Conversion);
  • Smart+ tự động phần nào, bật/tắt được phần nào;
  • GMV Max cho cửa hàng TikTok: đã thay chiến dịch bán hàng cũ chưa, tối ưu theo ROI thế nào;
  • TopReach (TopView + TopFeed) và quảng cáo tìm kiếm;
  • tên hiện tại của mạng đối tác (TikTok Ad Network, trước là Pangle) và Global App Bundle;
  • thông số video/ảnh, vùng an toàn, thời lượng, giới hạn ký tự;
  • ngân sách tối thiểu, tên chiến lược giá thầu, tên sự kiện chuẩn;
  • thuế GTGT 10% từ 01/07/2025 (mục 5).
- Không bịa số liệu hiệu quả, không hứa kết quả. Mọi con số minh họa đều ghi là số mẫu.
- Giọng văn giống trang Google/Facebook: câu ngắn, nói rõ điều làm được và điều chưa đủ cơ sở.

======================================================================
7. KIỂM TRA
======================================================================

- Viết scripts/test-tiktok-ads-lp.cjs theo mẫu test-facebook-ads-lp.cjs:
  • 3 trang, mọi workbench/tab/phễu/đường ống/checklist/form/ô tính thử hoạt động;
  • mọi .chap có .chap-head.has-num;
  • mỗi chương có ≥ 1 hình;
  • 1440 / 768 / 390 / 320px không cuộn ngang;
  • không lỗi console.
- Chạy ga-visual-audit.cjs cho TikTok, chụp từng mô phỏng. Soát:
  • chữ tràn;
  • chữ bị cột nút phải che;
  • ảnh trống;
  • có logo nền tảng.
- Chạy lại test Google và Facebook: vẫn pass.
- Build toàn bộ: các kênh khác không đổi.

======================================================================
THỨ TỰ LÀM — làm liên tục, không dừng giữa chừng
======================================================================

1. Đổi shared.mjs sang bảng CHANNELS + dựng buildTikTokAds, xóa code cũ.
2. data.mjs (nội dung mới, có nguồn TikTok) + mocks.mjs.
3. Trang 1 → trang 2 → trang 3.
4. Test + audit + so sánh Google/Facebook/kênh khác.

Xong gửi tôi:
- ảnh toàn trang 1440 + 390 của 3 trang;
- ảnh audit mô phỏng;
- kết quả test;
- danh sách nguồn TikTok đã dùng kèm ngày kiểm tra;
- những điểm không kiểm chứng được.

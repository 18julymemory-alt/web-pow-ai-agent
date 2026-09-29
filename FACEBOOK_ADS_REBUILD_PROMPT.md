LÀM LẠI TRANG FACEBOOK ADS THEO ĐÚNG FORMAT GOOGLE ADS (3 TRANG)

Mục tiêu: trang dịch vụ Facebook Ads trông và hoạt động giống hệt bộ 3 trang Google Ads. Cụ thể:
- cùng khung, cùng màu, cùng component;
- thanh 3 bước, mục lục dính, số chương lớn;
- workbench "danh sách | thông tin | mô phỏng", nút "Đọc tiếp";
- mô phỏng giống thật, sơ đồ, phễu, đường ống.

XÓA toàn bộ nội dung và code Facebook cũ, viết nội dung mới.

======================================================================
0. XÓA CÁI CŨ
======================================================================

Xóa hẳn các file sau (vẫn còn trong git nếu cần xem lại):
- scripts/facebook-detail-page.mjs
- scripts/facebook-detail-data.mjs
- scripts/facebook-easy-scenes.mjs
- scripts/facebook-format-gallery.mjs
- scripts/facebook-settings-sheets.mjs
- scripts/facebook-setup-guide.mjs
- dist/facebook-detail.css
- dist/facebook-detail.js
- fb-ads-screenshot.png, fb-ads-screenshot-scrolled.png (ảnh chụp cũ ở thư mục gốc)

Trong scripts/multichannel-guide-page.mjs:
- bỏ import facebook-detail-page.mjs và mọi nhánh isFacebook;
- các kênh khác (Instagram, TikTok, YouTube, Zalo…) phải giữ nguyên, build ra giống hệt trước khi sửa. So sánh file HTML trước/sau của các trang đó.

Trong scripts/build-service-pages.mjs:
- Facebook Ads không đi qua multichannelPage nữa, thay bằng hàm buildFacebookAds() giống buildGoogleAds().
- Cờ --facebook-only chỉ build 3 trang Facebook mới.

======================================================================
1. KIẾN TRÚC — DÙNG CHUNG VỚI GOOGLE ADS, KHÔNG COPY
======================================================================

Tạo thư mục scripts/facebook-ads-lp/ gồm:
- data.mjs: toàn bộ nội dung Facebook, viết mới theo mục 3–5.
- page-formats.mjs: trang 1.
- page-goals.mjs: trang 2.
- page-budget.mjs: trang 3.
- mocks.mjs: mô phỏng riêng của Facebook/Instagram (mục 2).

Dùng lại từ scripts/google-ads-lp/:
- shared.mjs;
- visuals.mjs: icon, more, tabs, funnel, equation, pipeline, machine, charts…;
- scenes.mjs: chapter, toc, workbench, facts, note, siteScreen, callScreen, zaloScreen, messengerScreen, formScreen, invoiceScreen, bidScreen, eventStream, crmScreen, SIGNALS…

Việc cần làm để dùng lại:
- Tổng quát hóa shared.mjs để nhận cấu hình kênh:
  • PAGES (3 trang của kênh);
  • stepsBar(active, pages);
  • crumbs(current, channelLabel);
  • document_({… , page, channel}).
  Google Ads truyền cấu hình Google như hiện tại. Build lại Google Ads phải ra HTML giống hệt (trừ thay đổi bắt buộc) — so sánh trước/sau.
- 3 trang Facebook load: style.css, navigation.css, google-ads-lp.css và thêm dist/facebook-ads-lp.css (chỉ chứa style riêng cho mock Facebook, mục tiêu ≤ 25 KB). JS dùng lại dist/google-ads-lp.js.
- Body class: "ga-lp fb-lp". Accent mặc định của trang: #8ec5ff.

URL:
1. /dich-vu/quang-cao-da-kenh/facebook-ads/ — Cách chạy & định dạng
2. /dich-vu/quang-cao-da-kenh/facebook-ads/chon-cach-chay/ — Chọn cách chạy
3. /dich-vu/quang-cao-da-kenh/facebook-ads/chi-phi-hieu-qua/ — Chi phí & hiệu quả

Hash cũ của trang Facebook trước đây chuyển về trang 1.

======================================================================
2. MÔ PHỎNG FACEBOOK / INSTAGRAM (scripts/facebook-ads-lp/mocks.mjs)
======================================================================

Quy tắc giống Google:
- bố cục thật, KHÔNG vẽ logo/wordmark Facebook, Instagram, Messenger, Threads, WhatsApp, Meta;
- thương hiệu mẫu Nhà Thơm (nhathom.example) và 6 sản phẩm có sẵn;
- ảnh trong khung tỷ lệ cố định, object-fit:cover;
- chữ ≥ 11px;
- nghiêng tối đa 4°.

Các mock cần có:
- Bài quảng cáo trên bảng tin (điện thoại):
  • avatar + tên trang + "Được tài trợ" + nút ⋯;
  • dòng nội dung chính cắt sau 2–3 dòng kèm "Xem thêm";
  • ảnh/video 1:1 hoặc 4:5;
  • thanh dưới: tiêu đề + tên miền + nút hành động (Mua ngay / Gửi tin nhắn / Đăng ký / Tìm hiểu thêm);
  • hàng Thích · Bình luận · Chia sẻ.
- Bảng tin kiểu Instagram: ảnh vuông/4:5, thanh nút hành động xanh dưới ảnh, tim/bình luận/gửi.
- Stories 9:16: thanh tiến trình trên cùng, "Được tài trợ", nút vuốt lên/nút hành động dưới cùng.
- Reels 9:16: cột nút bên phải, tên trang + "Được tài trợ" dưới trái, nút hành động.
- Carousel: 3–5 thẻ vuông trượt ngang, mỗi thẻ có tiêu đề + nút.
- Collection / trải nghiệm tức thì: video/ảnh lớn phía trên, lưới 4 sản phẩm phía dưới; bấm mở trang toàn màn hình.
- Marketplace: lưới sản phẩm, một ô có nhãn "Được tài trợ".
- Kết quả tìm kiếm: ô tìm kiếm + quảng cáo xen giữa kết quả.
- Quảng cáo nhắn tin: bài bảng tin nút "Gửi tin nhắn" → mở khung chat có câu chào + câu hỏi gợi ý. Dùng messengerScreen/zaloScreen style; nếu là WhatsApp thì khung chat trung tính, không logo.
- Mẫu form khách hàng tiềm năng (Instant Form): màn giới thiệu → câu hỏi (họ tên, số điện thoại tự điền sẵn) → màn cảm ơn có nút gọi / vào website.
- Threads: bài viết dạng chữ có ảnh + "Được tài trợ".
- Mạng đối tác (Audience Network): banner/quảng cáo xen trong một ứng dụng khác.
- Hero trang 1: chồng thẻ 3D gồm bài bảng tin, Reels, Stories, thẻ Marketplace.

======================================================================
3. TRANG 1 — CÁCH CHẠY & ĐỊNH DẠNG (giống page-formats của Google)
======================================================================

Phần mở đầu:
- Hero: "Facebook Ads" — "Xuất hiện khi khách đang lướt, xem và trò chuyện."
- Thanh 3 bước.
- Quỹ đạo hành trình: Lướt bảng tin → Thấy quảng cáo → Bấm / nhắn tin → Trang đích / khung chat / form → Tư vấn → Đơn hàng & CRM.

Bộ chọn 6 kiểu quảng cáo, mỗi kiểu 1 màu:
1. Bảng tin (ảnh & video) — #8ec5ff
2. Stories & Reels — #ff9bc1
3. Carousel & Bộ sưu tập — #85e1c1
4. Quảng cáo nhắn tin — #c0a2ff
5. Form khách hàng tiềm năng — #ffbd80
6. Bán hàng theo danh mục (Advantage+ / catalog) — #e0cd9b

Mỗi kiểu có đủ 6 chương như Google:
- 01 Trông như thế nào:
  • workbench liệt kê các vị trí hiển thị (Facebook bảng tin, Instagram bảng tin, Stories, Reels, Marketplace, Tìm kiếm, Threads, Mạng đối tác… — chọn vị trí phù hợp với từng kiểu);
  • mỗi vị trí 1 mock ở mục 2.
- 02 Chạy như thế nào: flow 5 bước + machine() "Bạn đưa vào → Meta tối ưu → Bạn nhận lại".
- 03 Cần chuẩn bị gì:
  • bản vẽ khung đúng tỷ lệ 1:1, 4:5, 9:16, 1.91:1;
  • ô đếm ký tự cho nội dung chính / tiêu đề / mô tả theo mức khuyến nghị hiện hành;
  • bộ tài nguyên.
- 04 Đo điều gì: dùng lại cảnh tương tác của trang 1 Google (trang web có nút nổi → màn hình khách thấy → bảng báo cáo). Với "Quảng cáo nhắn tin" và "Form", màn hình giữa là khung chat / form tức thì. Bảng báo cáo có cột "Đội tư vấn xác nhận".
- 05 Cách triển khai: hướng đi (thẻ có biểu đồ mini) + chẩn đoán (bảng chỉ số có một số đỏ → thẻ "Kiểm tra").
- 06 Trước khi chạy: checklist có vòng tiến độ.

Kết trang: "Nhớ nhanh" 6 ô + khối sang trang 2.

======================================================================
4. TRANG 2 — CHỌN CÁCH CHẠY (giống page-goals của Google)
======================================================================

Mục lục: 01 Mục tiêu · 02 Mức độ sẵn sàng · 03 Đối tượng · 04 Tóm tắt

01 Mục tiêu — 6 mục tiêu chiến dịch của Meta:
- Mục tiêu: Nhận biết, Lưu lượng truy cập, Tương tác, Khách hàng tiềm năng, Quảng bá ứng dụng, Doanh số.
- Mỗi mục trong workbench gồm:
  • facts hiện sẵn: "Tối ưu cho" + "Khách đi đâu sau khi bấm" (website, ứng dụng, Messenger/WhatsApp/Instagram Direct, cuộc gọi, form tức thì);
  • "Đo điều gì" và "Cần chuẩn bị" để trong "Đọc tiếp";
  • stage là màn hình khách thấy sau khi bấm.
- Ghi chú: Doanh số, Ứng dụng, Khách hàng tiềm năng hiện mặc định thiết lập Advantage+ — kiểm chứng lại trước khi viết (mục 6).

02 Mức độ sẵn sàng — 5 mức như Google, stage là quảng cáo Facebook hợp với từng mức:
- Chưa biết: Reels/video;
- Đã quan tâm: carousel;
- Đang cân nhắc: quảng cáo nhắn tin hỏi giá;
- Đã liên hệ: tin nhắn nhắc lịch;
- Đã mua: quảng cáo danh mục sản phẩm liên quan.

03 Đối tượng — workbench chia 3 nhóm màu, mỗi mục một hình minh họa (dùng lại SIGNALS, thêm hình mới nếu cần):
- Ràng buộc cứng: vị trí, độ tuổi.
- Gợi ý cho hệ thống: nhắm mục tiêu chi tiết (sở thích, hành vi), Advantage+ audience.
- Dữ liệu của doanh nghiệp: danh sách khách, người vào website, người tương tác Trang/Instagram, người xem video, người từng nhắn tin, đối tượng tương tự.
- Ghi chú điều kiện áp dụng + nguồn Meta.

04 Tóm tắt + khối sang trang 3.

======================================================================
5. TRANG 3 — CHI PHÍ & HIỆU QUẢ (giống page-budget của Google)
======================================================================

Mục lục: 01 Chi phí · 02 Đặt thầu · 03 Chỉ số · 04 Đo lường · 05 Sự kiện · 06 Triển khai · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

01 Chi phí
- Sơ đồ 3 khoản: trả cho Meta / sản xuất nội dung / phí dịch vụ POWAI.
- Workbench, stage là chứng từ thanh toán mẫu tô sáng đúng dòng:
  • ngân sách hằng ngày vs trọn đời;
  • phương thức thanh toán;
  • thuế GTGT;
  • hóa đơn.
- Ô tự tính thử (để trống, không gợi ý số).
- VỀ THUẾ: Meta có trang hướng dẫn "Giới thiệu về thuế giá trị gia tăng (VAT) tại Việt Nam" (facebook.com/business/help/938907633499274). Báo chí đưa tin Meta thu thêm 5% từ 2022.
  • Chỉ ghi mức thuế nếu đã kiểm chứng trên trang Meta tại thời điểm làm, kèm ngày kiểm tra.
  • Nếu không truy cập được thì để taxRate = null và ghi "xác nhận trên chứng từ thực tế", giống Google.

02 Đặt thầu — workbench + bidScreen với các chiến lược hiện hành của Meta:
- Số lượng cao nhất;
- Mục tiêu chi phí trên mỗi kết quả;
- Giới hạn giá thầu;
- Mục tiêu ROAS;
- (Giá trị cao nhất nếu còn).
Mỗi chiến lược có biểu đồ mini minh họa ví dụ.

03 Chỉ số — phễu bấm được, công thức bằng hình với số mẫu:
- Hiển thị & tiếp cận: Lượt hiển thị, Người tiếp cận, Tần suất, CPM.
- Nhấp: Lượt nhấp liên kết, CTR (liên kết), CPC (liên kết).
- Trang đích / hội thoại: Lượt xem trang đích, Số cuộc trò chuyện bắt đầu, Chi phí mỗi cuộc trò chuyện.
- Khách tiềm năng: Lead, CPL, Lead phù hợp, CPQL.
- Đơn hàng: Lượt mua, Doanh thu, ROAS, CAC.
Ghi rõ "số mẫu, không phải kết quả dự kiến".

04 Đo lường — sơ đồ đường ống, mỗi trạm một giao diện thu nhỏ:
- UTM → Website + Meta Pixel → Conversions API (máy chủ) → Trình quản lý sự kiện;
- Form tức thì → tải lead / nối CRM;
- Tin nhắn → hộp thư doanh nghiệp → CRM;
- Sự kiện ngoại tuyến / CRM quay về Meta;
- Danh mục sản phẩm.

05 Sự kiện — workbench chia "Tín hiệu" và "Đã xác nhận", stage là điện thoại đang thao tác + nhật ký sự kiện:
- Sự kiện tiêu chuẩn: PageView, ViewContent, Contact, Lead, CompleteRegistration, AddToCart, Purchase;
- "Bắt đầu cuộc trò chuyện", "Lead phù hợp" (CRM).

06 Triển khai (10 bước, 3 chặng) · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

07 Chuẩn bị — checklist chia nhóm:
- Tài khoản doanh nghiệp, Trang, Instagram, tài khoản quảng cáo, quyền;
- thanh toán;
- xác minh tên miền;
- Pixel + Conversions API;
- danh mục;
- người trực tin nhắn;
- ảnh/video dọc & vuông.

08 Hỏi đáp — tab theo chủ đề, khoảng 12–15 câu viết mới:
- chi phí tối thiểu;
- bao lâu thấy kết quả;
- có cần website không;
- nhắn tin hay form;
- vì sao nhiều tin nhắn ít đơn;
- tài khoản bị hạn chế;
- ai giữ tài khoản…

09 Liên hệ — dùng lại form + thẻ Hotline/Zalo và placeholder của trang Google.

Kết trang: Tóm tắt 3 ô + khối "Xem thêm Google Ads" dẫn sang trang Google.

======================================================================
6. NỘI DUNG PHẢI ĐÚNG VỚI META HIỆN TẠI
======================================================================

- Mọi thông tin về nền tảng phải đối chiếu Meta Business Help Center (facebook.com/business/help) hoặc Meta for Developers. Lưu nguồn + ngày kiểm tra trong data.mjs, hiển thị trong "Tài liệu Meta ↗" của từng chương (như sourceList của Google).
- Điểm cần kiểm chứng trước khi viết (tình hình 2025–2026 theo các bài tổng hợp, KHÔNG chép nếu Meta không xác nhận):
  • 6 mục tiêu chiến dịch (Nhận biết, Lưu lượng truy cập, Tương tác, Khách hàng tiềm năng, Quảng bá ứng dụng, Doanh số);
  • Doanh số / Ứng dụng / Khách hàng tiềm năng mặc định Advantage+; luồng tạo chiến dịch thủ công và Advantage+ đã gộp;
  • nhắm mục tiêu chi tiết coi là gợi ý; vị trí và độ tuổi là ràng buộc cứng;
  • danh sách vị trí hiện hành (có Threads, Reels, Stories, Marketplace, Tìm kiếm, Mạng đối tác, tin nhắn…); vị trí nào đã bị Meta bỏ thì không đưa vào;
  • thông số ảnh/video và giới hạn ký tự khuyến nghị;
  • tên chiến lược giá thầu;
  • mức thuế GTGT tại Việt Nam.
- Không bịa số liệu hiệu quả, không hứa kết quả. Mọi con số minh họa đều ghi là số mẫu.
- Giọng văn giống trang Google: câu ngắn, nói rõ điều làm được và điều chưa đủ cơ sở.

======================================================================
7. KIỂM TRA
======================================================================

- Viết scripts/test-facebook-ads-lp.cjs theo mẫu test-google-ads-lp.cjs:
  • 3 trang, mọi workbench/tab/phễu/đường ống/checklist/form/ô tính thử hoạt động;
  • mọi .chap có .chap-head.has-num;
  • mỗi chương có ≥ 1 hình;
  • 1440 / 768 / 390 / 320px không cuộn ngang;
  • không lỗi console.
- Chạy ga-visual-audit.cjs (hoặc bản cho Facebook) chụp từng mô phỏng. Soát:
  • chữ tràn;
  • ảnh trống;
  • có logo nền tảng;
  • tiêu đề quá 2 dòng.
- Chạy lại test Google Ads: vẫn pass, HTML Google không đổi ngoài phần cấu hình kênh.
- Chạy build toàn bộ: các trang kênh khác không đổi.

======================================================================
THỨ TỰ LÀM — làm liên tục, không dừng giữa chừng
======================================================================

1. Tổng quát hóa shared.mjs + dựng khung buildFacebookAds, xóa code cũ.
2. data.mjs (nội dung mới, có nguồn Meta) + mocks.mjs.
3. Trang 1 → trang 2 → trang 3.
4. Test + audit + so sánh Google/kênh khác.

Xong gửi tôi:
- ảnh toàn trang 1440 + 390 của 3 trang;
- ảnh audit mô phỏng;
- kết quả test;
- danh sách nguồn Meta đã dùng kèm ngày kiểm tra;
- những điểm không kiểm chứng được.

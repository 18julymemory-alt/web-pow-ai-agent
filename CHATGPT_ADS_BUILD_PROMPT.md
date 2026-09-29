THÊM MỤC CHATGPT ADS + DỰNG 3 TRANG THEO ĐÚNG FORMAT GOOGLE ADS

Mục tiêu:
(A) Thêm "ChatGPT Ads" vào menu và danh sách dịch vụ "Quảng cáo đa kênh".
(B) Dựng trang ChatGPT Ads giống bộ 3 trang Google / Facebook / TikTok / Zalo Ads đã làm xong:
- cùng khung, màu và component;
- thanh 3 bước, mục lục dính, số chương lớn;
- workbench "danh sách | thông tin | mô phỏng", nút "Đọc tiếp";
- mô phỏng giống thật, sơ đồ, phễu, đường ống.

Mẫu để làm theo: scripts/zalo-ads-lp/ và buildZaloAds() trong scripts/build-service-pages.mjs (mới nhất). ChatGPT làm y hệt.

LƯU Ý: ChatGPT Ads mới mở cho Việt Nam ngày 23/09/2026 và thay đổi rất nhanh. Mọi thông tin phải lấy từ nguồn OpenAI, ghi ngày kiểm tra. Tính năng đang thí điểm phải gắn nhãn "Đang thử nghiệm".

======================================================================
0. DỮ LIỆU CŨ + THÊM MỤC VÀO MENU
======================================================================

0a. Dữ liệu cũ
- Chạy grep -rni "chatgpt" scripts/ dist/. Hiện chưa có trang ChatGPT Ads.
- Nếu còn đoạn nội dung/ảnh thử nào về ChatGPT Ads thì xóa, không dùng lại.

0b. Thêm mục "ChatGPT Ads"
- dist/navigation-data.js: thêm vào services[0].children, NGAY SAU "Zalo Ads":
    { "title": "ChatGPT Ads", "slug": "chatgpt-ads", "href": "/dich-vu/quang-cao-da-kenh/chatgpt-ads/" }
- Menu (navigation.js) tự đọc từ file này. KHÔNG sửa navigation.js, navigation.css, trang chủ.
- Nhiều mảng dữ liệu đang đánh chỉ số THEO VỊ TRÍ của services[0].children. Thêm phần tử mới vào đúng vị trí tương ứng (sau Zalo) ở TẤT CẢ các mảng đó:
  • scripts/service-content.mjs — groupContent[0].focus. Build sẽ báo lỗi "Content mismatch" nếu lệch. Câu focus mới:
    'Xuất hiện ngay dưới câu trả lời của ChatGPT khi người dùng đang hỏi về nhu cầu mà doanh nghiệp giải quyết được.'
  • scripts/ads-catalog.mjs — mảng previews dùng cho thẻ trên trang nhóm. Thêm preview: một khung trò chuyện nhỏ có câu hỏi, vài dòng câu trả lời, nhãn "Được tài trợ" và một thẻ quảng cáo; nhãn 'TRONG CUỘC TRÒ CHUYỆN'; icon là ký tự trung tính như '✦', KHÔNG dùng logo OpenAI.
  • Tìm thêm bằng grep: adsDetailVisual, service-depth.mjs, service-image-briefs.mjs, multichannel-practical-data.mjs, product-images, tones, và mọi mảng có 9 phần tử gắn với nhóm Quảng cáo đa kênh. Mảng nào dùng theo vị trí j thì chèn cho đúng.
  • Trang chủ dùng preview: [0,1,3] — vẫn đúng vì chỉ số 0/1/3 không đổi, không cần sửa.
- Kiểm tra sau khi thêm:
  • Remarketing, Performance Marketing, Tối ưu chuyển đổi quảng cáo phải build ra HTML giống hệt trước (chỉ khác menu có thêm mục mới). Phải đúng nội dung của mình, không bị lệch sang nội dung kênh bên cạnh.
  • Trang nhóm /dich-vu/quang-cao-da-kenh/ có thẻ ChatGPT Ads đúng thứ tự, đúng preview.
  • Nếu dist/sitemap.xml tồn tại: thêm 3 URL mới.
  • Nếu trình duyệt vẫn hiện menu cũ do cache: báo lại tôi, KHÔNG tự sửa trang chủ.

0c. Build
- Thêm buildChatGPTAds() giống buildZaloAds() + cờ --chatgpt-only.
- Trong vòng lặp build đầy đủ: child.slug==='chatgpt-ads' → buildChatGPTAds().
- Trong --multichannel-only: thêm 'chatgpt-ads' vào danh sách bỏ qua, sửa câu log đúng số trang.

======================================================================
1. KIẾN TRÚC — DÙNG CHUNG, KHÔNG COPY
======================================================================

Tạo thư mục scripts/chatgpt-ads-lp/ gồm:
- data.mjs
- mocks.mjs
- page-formats.mjs
- page-goals.mjs
- page-budget.mjs

Dùng lại, không chép:
- scripts/google-ads-lp/: shared, visuals, scenes (chapter, toc, workbench, facts, note, siteScreen, formScreen, invoiceScreen, bidScreen, eventStream, crmScreen, SIGNALS, funnel, pipeline, machine, lineChart…);
- zalo-ads-lp/, tiktok-ads-lp/, facebook-ads-lp/ nếu có phần dùng được.

shared.mjs — thêm 1 dòng vào CHANNELS, không thêm if/else:
  chatgpt: {
    name: 'ChatGPT Ads',
    pages: threePages('/dich-vu/quang-cao-da-kenh/chatgpt-ads/', [
      'Quảng cáo trong ChatGPT trông như thế nào và chạy ra sao.',
      'Từ mục tiêu kinh doanh tới ngữ cảnh, đối tượng và ngành được chạy.',
      'Ngân sách, đo lường và triển khai cùng POWAI.'
    ]),
    stepsLabel: 'Ba bước tìm hiểu ChatGPT Ads',
    crumb: 'ChatGPT Ads',
    css: ['/chatgpt-ads-lp.css'],
    bodyClass: 'cg-lp',
    accent: '#85e1c1',
    sourceLabel: 'Tài liệu OpenAI:'
  }
và export CG_PAGES = CHANNELS.chatgpt.pages.

CSS và JS:
- dist/chatgpt-ads-lp.css chỉ chứa style mock ChatGPT, ≤ 25 KB.
- JS dùng lại dist/google-ads-lp.js.
- Body class "ga-lp cg-lp".
- Accent #85e1c1 (xanh bạc hà, có sẵn trong bảng màu trang chủ).

URL:
1. /dich-vu/quang-cao-da-kenh/chatgpt-ads/ — Cách chạy & định dạng
2. /dich-vu/quang-cao-da-kenh/chatgpt-ads/chon-cach-chay/ — Chọn cách chạy
3. /dich-vu/quang-cao-da-kenh/chatgpt-ads/chi-phi-hieu-qua/ — Chi phí & hiệu quả

======================================================================
2. MÔ PHỎNG CHATGPT (scripts/chatgpt-ads-lp/mocks.mjs)
======================================================================

Quy tắc chung:
- bố cục giống giao diện trò chuyện thật (web + điện thoại);
- KHÔNG vẽ logo OpenAI (bông hoa), wordmark "ChatGPT", avatar trợ lý thật. Đầu khung chỉ ghi "Trợ lý AI" hoặc để trống; avatar trợ lý là chấm tròn trung tính;
- KHÔNG ghi tên công ty đối tác (Shopee, Wayfair…) trong mock;
- thương hiệu mẫu Nhà Thơm (nhathom.example) và 6 sản phẩm có sẵn. Ngành này thuộc nhóm được phép chạy;
- câu hỏi mẫu tiếng Việt, ví dụ: "Gợi ý quà tân gia dưới 500 nghìn cho người thích mùi gỗ";
- câu trả lời của trợ lý: 3–5 dòng chữ thật + vài dòng xám mờ, KHÔNG nhắc tên thương hiệu quảng cáo (vì quảng cáo không ảnh hưởng câu trả lời);
- chữ ≥ 11px, nghiêng tối đa 4°, ảnh object-fit:cover trong khung cố định.

Mock cần có (thông số lấy theo mục 6, kiểm chứng trước khi vẽ):
- Thẻ văn bản đơn, nằm DƯỚI câu trả lời, tách bằng đường kẻ + nhãn "Được tài trợ":
  • favicon + tên nhà quảng cáo;
  • tiêu đề (tối đa 50 ký tự);
  • mô tả (tối đa 100 ký tự);
  • ảnh vuông;
  • cả thẻ bấm được → trang đích.
- Thẻ có dòng tiêu đề ngữ cảnh: như trên, thêm 1 dòng tiêu đề do ChatGPT hiển thị phía trên thẻ.
- Hai thẻ: 2 thẻ xếp dọc (cùng nhà quảng cáo hoặc 2 nhà quảng cáo khác nhau).
- Thẻ sản phẩm từ danh mục (product feed): ảnh, tên, giá, giá khuyến mãi, sao đánh giá, thương hiệu.
- Carousel sản phẩm: nhiều thẻ sản phẩm vuốt ngang, có nút mũi tên.
- Trò chuyện với thương hiệu (Sponsored Agent, click-to-chat) — gắn nhãn "Đang thử nghiệm":
  • thẻ có nút "Trò chuyện";
  • bấm → khung chat mang tên thương hiệu mở ngay trong trợ lý;
  • có câu chào và gợi ý sản phẩm.
- Menu điều khiển trên thẻ quảng cáo (bấm "⋯"): Ẩn quảng cáo / Báo cáo quảng cáo / Vì sao tôi thấy quảng cáo này. Thêm màn Cài đặt có công tắc "Cá nhân hóa quảng cáo" và nút "Xóa dữ liệu dùng cho quảng cáo".
- Ngữ cảnh nhạy cảm: một cuộc trò chuyện về sức khỏe tinh thần → KHÔNG có quảng cáo, kèm ghi chú "Không hiển thị quảng cáo trong ngữ cảnh nhạy cảm".
- So sánh gói: Free / Go có quảng cáo; Plus / Pro / Business / Enterprise / Edu không có (kiểm chứng lại).
- Màn Ads Manager (trung tính, không logo):
  • cây Campaign → Ad group → Ad;
  • ô "Gợi ý ngữ cảnh" (context hints) có 3–4 dòng mẫu;
  • chọn quốc gia / nền tảng / ngôn ngữ / đối tượng tùy chỉnh;
  • ngân sách, cách tính phí.
- Hero trang 1: chồng thẻ 3D gồm khung trò chuyện có thẻ quảng cáo, carousel sản phẩm, khung chat thương hiệu, bảng số liệu nhỏ.

======================================================================
3. TRANG 1 — CÁCH CHẠY & ĐỊNH DẠNG
======================================================================

Phần mở đầu:
- Hero: "ChatGPT Ads" — "Xuất hiện đúng lúc khách đang hỏi về nhu cầu của họ."
- Thanh 3 bước.
- Quỹ đạo hành trình: Người dùng hỏi → ChatGPT trả lời (độc lập) → Thẻ "Được tài trợ" bên dưới → Bấm / trò chuyện → Trang đích / sản phẩm → Tư vấn & đơn hàng.
- Khối "3 nguyên tắc của OpenAI" bằng hình, mỗi nguyên tắc 1 icon + 1 dòng, có nguồn:
  • quảng cáo không ảnh hưởng câu trả lời;
  • cuộc trò chuyện riêng tư, nhà quảng cáo chỉ nhận số liệu tổng hợp;
  • người dùng tự kiểm soát (ẩn, báo cáo, tắt cá nhân hóa, xóa dữ liệu).

Bộ chọn 6 kiểu quảng cáo, mỗi kiểu 1 màu:
1. Thẻ quảng cáo dưới câu trả lời (đơn / có tiêu đề ngữ cảnh) — #85e1c1
2. Hai thẻ cùng lúc — #88e4ff
3. Thẻ sản phẩm từ danh mục — #c0a2ff
4. Carousel sản phẩm — #ff9bc1
5. Tối ưu chuyển đổi (đăng ký, mua, gửi form trên website) — #ffbd80
6. Trò chuyện với thương hiệu (Đang thử nghiệm) — #e0cd9b

Mỗi kiểu có đủ 6 chương như các kênh khác:
- 01 Trông như thế nào: workbench các biến thể (web / điện thoại iOS, Android / máy tính), mỗi mục 1 mock ở mục 2.
- 02 Chạy như thế nào:
  • flow 5 bước;
  • machine() "Bạn đưa vào (gợi ý ngữ cảnh, mẫu quảng cáo, danh mục, Pixel) → ChatGPT chọn quảng cáo theo ngữ cảnh cuộc trò chuyện → Bạn nhận lại (lượt hiển thị, lượt nhấp, chuyển đổi)";
  • sơ đồ "Gợi ý ngữ cảnh KHÁC từ khóa": bên trái là từ khóa khớp chính xác (Google), bên phải là mô tả tình huống (ChatGPT). Ghi rõ gợi ý ngữ cảnh không phải lệnh khớp chính xác.
- 03 Cần chuẩn bị gì:
  • bản vẽ thẻ có ô đếm ký tự (tiêu đề ≤ 50, mô tả ≤ 100);
  • ảnh vuông (tối đa theo tài liệu);
  • favicon;
  • trang đích đúng với quảng cáo;
  • với kiểu 3–4: danh mục sản phẩm, các trường bắt buộc, hạn làm mới dữ liệu;
  • với kiểu 5: Pixel / Conversions API + sự kiện chuẩn.
- 04 Đo điều gì: cảnh "màn khách thấy → bảng báo cáo". Chỉ dùng chỉ số có trong Ads Manager (Impressions, Clicks, Spend, CTR, Avg CPC, Avg CPM, Conversions) + cột "Đội tư vấn xác nhận" / "Đơn đã giao" từ CRM.
- 05 Cách triển khai: hướng đi (biểu đồ mini, số mẫu) + chẩn đoán, ví dụ:
  • "hiển thị ít" → gợi ý ngữ cảnh quá hẹp / ngành bị hạn chế;
  • "nhiều nhấp ít chuyển đổi" → trang đích không khớp câu hỏi;
  • "bị từ chối" → vi phạm chính sách / bắt chước giao diện ChatGPT;
  • "chưa đo được chuyển đổi" → thiếu Pixel/CAPI.
- 06 Trước khi chạy: checklist có vòng tiến độ, gồm ô "Ngành có được phép không".

Kết trang: "Nhớ nhanh" 6 ô + khối sang trang 2.

======================================================================
4. TRANG 2 — CHỌN CÁCH CHẠY
======================================================================

Mục lục: 01 Mục tiêu · 02 Mức độ sẵn sàng · 03 Ngữ cảnh & đối tượng · 04 Ngành được chạy · 05 Tóm tắt

01 Mục tiêu:
- Các mục tiêu chiến dịch hiện có trong Ads Manager. Có nguồn: "Conversion optimization". Kiểm chứng tên các mục tiêu khác (lưu lượng/nhấp, hiển thị…) trước khi viết.
- Mỗi mục trong workbench:
  • facts hiện sẵn: "Tối ưu cho" + "Tính phí theo";
  • "Cần chuẩn bị" để trong "Đọc tiếp";
  • stage là màn hình khách thấy.

02 Mức độ sẵn sàng — 5 mức, stage là kiểu quảng cáo hợp với từng mức:
- Chưa biết đến thương hiệu: thẻ đơn / hai thẻ, tính theo hiển thị;
- Đang tìm hiểu, so sánh: thẻ có tiêu đề ngữ cảnh;
- Sẵn sàng mua: thẻ sản phẩm / carousel;
- Cần được tư vấn: Trò chuyện với thương hiệu (thí điểm) hoặc thẻ dẫn về form;
- Đã là khách: đối tượng tùy chỉnh (loại trừ, hoặc điều chỉnh giá thầu).

03 Ngữ cảnh & đối tượng — workbench chia 3 nhóm màu, mỗi mục một hình minh họa:
- Ngữ cảnh: gợi ý ngữ cảnh (ví dụ tốt / chưa tốt, tối đa số gợi ý mỗi nhóm theo tài liệu).
- Ràng buộc: quốc gia (và vùng nhỏ hơn nếu có ở Việt Nam), nền tảng (iOS, Android, web, máy tính), ngôn ngữ.
- Dữ liệu doanh nghiệp: đối tượng tùy chỉnh (thêm, loại trừ, điều chỉnh giá thầu).
- Ô ghi chú nổi bật: ChatGPT Ads KHÔNG nhắm theo từ khóa, tuổi, giới tính, sở thích như Google/Facebook. Chỉ ghi nếu tài liệu OpenAI xác nhận; nếu đã có thay đổi thì ghi theo tài liệu mới.

04 Ngành được chạy — workbench 3 nhóm màu, stage là thẻ minh họa + dấu tick/cảnh báo/cấm:
- Được chạy (ví dụ: bán lẻ, giáo dục, du lịch, phần mềm, dịch vụ doanh nghiệp).
- Xét duyệt từng trường hợp: tài chính, y tế, pháp lý — kiểm tra có áp dụng tại Việt Nam không.
- Không được chạy: người lớn/hẹn hò, rượu bia & thuốc lá, cờ bạc, hàng giả, chất kích thích, chính trị, tin tuyển dụng & cho thuê nhà cá nhân, lừa đảo — theo trang Ad policies.
- Thêm: các ngữ cảnh không hiển thị quảng cáo (sức khỏe, sức khỏe tinh thần, chính trị, người dưới 18 tuổi).

05 Tóm tắt + khối sang trang 3.

======================================================================
5. TRANG 3 — CHI PHÍ & HIỆU QUẢ
======================================================================

Mục lục: 01 Chi phí · 02 Đặt thầu · 03 Chỉ số · 04 Đo lường · 05 Sự kiện · 06 Triển khai · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

01 Chi phí
- Sơ đồ 3 khoản: trả cho OpenAI / sản xuất mẫu quảng cáo & danh mục / phí dịch vụ POWAI.
- Workbench, stage là chứng từ mẫu tô sáng đúng dòng:
  • cách thanh toán;
  • đơn vị tiền tệ;
  • ngân sách chiến dịch;
  • mức tối thiểu (nếu có);
  • hóa đơn.
  Tất cả phải kiểm chứng ở Help Center OpenAI.
- Ô tự tính thử (để trống).
- VỀ THUẾ: chưa có nguồn OpenAI nói về thuế GTGT cho khách tại Việt Nam → taxRate = null. Hiện câu: "Thuế và hóa đơn theo chứng từ OpenAI xuất; POWAI đối chiếu khi thanh toán." Chỉ ghi thuế suất khi tìm được trang OpenAI chính thức, kèm nguồn + ngày.
- Không ghi mức CPC/CPM "thị trường" từ blog. Nếu muốn minh họa thì ghi "số mẫu".

02 Đặt thầu — workbench + bidScreen:
- tính theo lượt hiển thị (CPM);
- tính theo lượt nhấp (CPC);
- tối ưu chuyển đổi: trả theo nhấp hoặc theo hiển thị (bản beta) + Bid Cap (mức tối đa cho một chuyển đổi).
Mỗi cách có biểu đồ mini (số mẫu). Ghi rõ phần nào đang beta.

03 Chỉ số — phễu bấm được, công thức bằng hình với số mẫu:
- Hiển thị → CPM;
- Nhấp → CTR, CPC;
- Chuyển đổi → CPA, tỷ lệ chuyển đổi;
- Lead phù hợp / đơn giao (CRM) → CPQL, ROAS.
Ghi chú:
- CTR cập nhật khoảng 15 phút một lần, chi tiêu có thể trễ 7–8 giờ (theo Help Center — kiểm tra lại);
- nhà quảng cáo chỉ thấy số liệu tổng hợp, không thấy nội dung trò chuyện.
Ghi rõ "số mẫu, không phải kết quả dự kiến".

04 Đo lường — sơ đồ đường ống, mỗi trạm một giao diện thu nhỏ:
- UTM → Website + Pixel (JavaScript) → Conversions API (máy chủ) → báo cáo Ads Manager;
- Image tag (nếu tài liệu còn);
- Danh mục sản phẩm (CSV / URL / SFTP);
- CRM → đối tượng tùy chỉnh;
- GA4 để đối chiếu.

05 Sự kiện — workbench chia "Tín hiệu" và "Đã xác nhận", stage là điện thoại đang thao tác + nhật ký sự kiện:
- Tín hiệu: danh sách sự kiện chuẩn trong developers.openai.com/ads (mục Supported Events). Lấy đúng tên, KHÔNG tự đặt.
- Ghi chú: sự kiện tùy chỉnh hiện chưa dùng để tối ưu chuyển đổi.
- Đã xác nhận (CRM): lead phù hợp, đơn giao.

06 Triển khai (10 bước, 3 chặng) · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

07 Chuẩn bị — checklist chia nhóm:
- tài khoản Ads Manager (email công việc, xác minh), logo/favicon, thanh toán;
- ngành được phép + trang đích đúng chính sách;
- mẫu quảng cáo (tiêu đề, mô tả, ảnh vuông);
- gợi ý ngữ cảnh;
- danh mục sản phẩm (nếu bán hàng);
- Pixel + Conversions API;
- danh sách khách (nếu dùng đối tượng tùy chỉnh);
- CRM + người tiếp nhận.

08 Hỏi đáp — tab theo chủ đề, khoảng 12–15 câu viết mới:
- ChatGPT Ads đã chạy được ở Việt Nam chưa (có, từ 23/09/2026 — nêu tự phục vụ hay qua đối tác theo nguồn);
- ai thấy quảng cáo (gói nào, trên 18 tuổi);
- quảng cáo có làm ChatGPT nói tốt về thương hiệu không (không);
- nhà quảng cáo có đọc được cuộc trò chuyện không (không);
- khác Google Ads chỗ nào (gợi ý ngữ cảnh thay từ khóa);
- ngành nào không chạy được;
- chi phí tối thiểu;
- cần chuẩn bị gì để đo chuyển đổi;
- có quảng cáo video không (chỉ ghi theo nguồn OpenAI tại thời điểm kiểm tra);
- "Trò chuyện với thương hiệu" là gì, đã dùng được chưa;
- có nên chạy ngay hay chờ;
- ai giữ tài khoản.

09 Liên hệ — dùng lại form + thẻ Hotline/Zalo và placeholder chung.

Kết trang: Tóm tắt 3 ô + khối "Xem thêm Google Ads / Facebook Ads / TikTok Ads / Zalo Ads".

======================================================================
6. NỘI DUNG PHẢI ĐÚNG VỚI CHATGPT ADS HIỆN TẠI
======================================================================

- Chỉ dùng nguồn chính thức: openai.com, help.openai.com, developers.openai.com/ads, openai.com/policies/ad-policies/.
  • Blog/agency chỉ để gợi ý chỗ cần kiểm tra, KHÔNG làm nguồn hiển thị.
  • Lưu nguồn + ngày kiểm tra trong data.mjs, hiển thị "Tài liệu OpenAI ↗" ở từng chương.
  • Hiện dòng "Cập nhật theo tài liệu OpenAI ngày …" ở hero mỗi trang.

- Đã đọc ngày 28/09/2026 (kiểm tra lại khi làm):
  • openai.com/index/chatgpt-ads-expands-southeast-asia-taiwan/ (23/09/2026):
    ChatGPT Ads mở tại Indonesia, Malaysia, Philippines, Singapore, Thái Lan, VIỆT NAM, Đài Loan. Mua qua đội OpenAI / agency / đối tác công nghệ, hoặc Ads Manager tự phục vụ cho doanh nghiệp đủ điều kiện. Quảng cáo chỉ hiện với gói Free và Go.
  • help.openai.com/en/articles/20001047-ads-in-chatgpt:
    – quảng cáo nằm dưới cuối câu trả lời, gắn nhãn tài trợ, tách khỏi câu trả lời;
    – có thể có 1 hoặc nhiều thẻ;
    – người dùng ẩn, báo cáo, xem lý do, tắt cá nhân hóa, xóa dữ liệu;
    – Plus/Pro/Business/Enterprise/Edu không có quảng cáo;
    – không hiện với người dưới 18;
    – không hiện gần chủ đề sức khỏe, sức khỏe tinh thần, chính trị;
    – không chia sẻ cuộc trò chuyện với nhà quảng cáo.
  • help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics — chọn quảng cáo theo ngữ cảnh + cá nhân hóa; gợi ý ngữ cảnh không phải từ khóa khớp chính xác.
  • openai.com/index/new-ways-to-buy-chatgpt-ads/ (05/05/2026) — Ads Manager tự phục vụ (beta), CPC + CPM, Conversions API + Pixel.
  • openai.com/index/expanding-access-to-ai-with-chatgpt-ads/ (31/08/2026) — product feed, nhắm theo nền tảng và địa lý, đối tượng tùy chỉnh; CPC và tối ưu theo kết quả chiếm đa số chiến dịch.
  • help.openai.com/en/articles/20001224-quickstart-launch-your-first-campaign:
    – cấu trúc Campaign → Ad group → Ad; gợi ý ngữ cảnh ở cấp Ad group;
    – chỉ số Impressions, Clicks, Spend, CTR, Avg CPC, Avg CPM, Conversions;
    – CTR cập nhật khoảng 15 phút một lần; chi tiêu trễ 7–8 giờ.
  • help.openai.com/en/articles/20001412-conversion-optimized-campaigns — mục tiêu Conversion optimization; cần Pixel và/hoặc Conversions API; chưa hỗ trợ sự kiện tùy chỉnh; trả theo nhấp hoặc theo hiển thị (beta); Bid Cap.
  • openai.com/policies/ad-policies/ — ngành cấm, ngành xét từng trường hợp, ngữ cảnh nhạy cảm, không được bắt chước giao diện ChatGPT.
  • developers.openai.com/ads — Measurement Pixel, Conversions API, Image tag, Supported Events, Targeting, Carousel.

- Điểm CHƯA kiểm chứng từ nguồn OpenAI, phải tìm trước khi viết, không có nguồn thì không ghi:
  • giới hạn ký tự tiêu đề 50 / mô tả 100, ảnh vuông tối đa 1200×1200, favicon ≥ 128×128 (blog dẫn từ Bulk Upload Schema của OpenAI — tìm đúng trang developers.openai.com);
  • tối đa 2.000 gợi ý ngữ cảnh mỗi ad group;
  • các trường bắt buộc của product feed, hạn 14 ngày;
  • tên các mục tiêu chiến dịch ngoài Conversion optimization;
  • nhắm vùng nhỏ hơn quốc gia tại Việt Nam, ngôn ngữ tiếng Việt;
  • tiền tệ, cách thanh toán, ngân sách tối thiểu, thuế cho khách Việt Nam;
  • tình trạng "Sponsored Agent / trò chuyện với thương hiệu" — hiện chỉ có báo chí đưa tin thí điểm tháng 9/2026. Nếu không có nguồn OpenAI thì vẫn giữ kiểu 6 nhưng ghi rõ "OpenAI chưa công bố chính thức — đang thử nghiệm với một số nhà quảng cáo".
- Không bịa số liệu hiệu quả, không hứa kết quả. Mọi con số minh họa đều ghi là số mẫu.
- Giọng văn giống các trang kênh khác: câu ngắn, nói rõ điều làm được và điều chưa đủ cơ sở. Nền tảng mới — nói thẳng phần nào đang beta/thử nghiệm.

======================================================================
7. KIỂM TRA
======================================================================

- Viết scripts/test-chatgpt-ads-lp.cjs theo mẫu test-zalo-ads-lp.cjs:
  • 3 trang, mọi workbench/tab/phễu/đường ống/checklist/form/ô tính thử hoạt động;
  • mọi .chap có .chap-head.has-num;
  • mỗi chương có ≥ 1 hình;
  • 1440 / 768 / 390 / 320px không cuộn ngang;
  • không lỗi console;
  • menu có mục "ChatGPT Ads" ngay sau "Zalo Ads", link đúng.
- Chạy ga-visual-audit.cjs cho ChatGPT, chụp từng mô phỏng. Soát:
  • chữ tràn;
  • chữ bị che;
  • ảnh trống;
  • tiêu đề quá 2 dòng;
  • có logo/wordmark OpenAI, ChatGPT hoặc đối tác.
- Chạy lại test Google, Facebook, TikTok, Zalo: vẫn pass.
- Build toàn bộ, so sánh HTML trước/sau: các trang khác chỉ khác ở menu (thêm 1 mục). Riêng Remarketing / Performance / Tối ưu chuyển đổi phải giữ đúng nội dung của mình.

======================================================================
THỨ TỰ LÀM — làm liên tục, không dừng giữa chừng
======================================================================

1. Mục 0: thêm menu + các mảng theo vị trí + buildChatGPTAds / --chatgpt-only. Build thử, so sánh các trang khác.
2. Dòng chatgpt trong CHANNELS.
3. Đọc lại các nguồn ở mục 6 → data.mjs (có nguồn + ngày) + mocks.mjs.
4. Trang 1 → trang 2 → trang 3.
5. Test + audit + so sánh các kênh khác.

Xong gửi tôi:
- ảnh toàn trang 1440 + 390 của 3 trang;
- ảnh menu có mục mới;
- ảnh trang nhóm Quảng cáo đa kênh;
- ảnh audit mô phỏng;
- kết quả test;
- danh sách nguồn OpenAI đã dùng kèm ngày kiểm tra;
- những điểm không kiểm chứng được.

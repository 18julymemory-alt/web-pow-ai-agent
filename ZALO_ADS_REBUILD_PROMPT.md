LÀM LẠI TRANG ZALO ADS THEO ĐÚNG FORMAT GOOGLE / FACEBOOK / TIKTOK ADS (3 TRANG)

Mục tiêu: trang dịch vụ Zalo Ads trông và hoạt động giống bộ 3 trang Google, Facebook và TikTok Ads đã làm xong:
- cùng khung, màu và component;
- thanh 3 bước, mục lục dính, số chương lớn;
- workbench "danh sách | thông tin | mô phỏng", nút "Đọc tiếp";
- mô phỏng giống thật, sơ đồ, phễu, đường ống.

XÓA nội dung và code Zalo cũ, viết nội dung mới.

Mẫu để làm theo:
- scripts/tiktok-ads-lp/ (mới nhất) và buildTikTokAds() trong scripts/build-service-pages.mjs;
- scripts/facebook-ads-lp/.
Zalo làm y hệt cách TikTok đã làm.

======================================================================
0. XÓA CÁI CŨ
======================================================================

Hiện tại /dich-vu/quang-cao-da-kenh/zalo-ads/ được build bằng multichannelPage() từ:
- scripts/multichannel-guide-data.mjs:
  • mục 'zalo-ads' trong channelGuides;
  • 3 lệnh replaceFormat('zalo-ads', 0 | 3 | 5, …).
- Có thể còn dữ liệu Zalo trong multichannel-practical / service-depth / ads-catalog. Chạy grep -rn "zalo-ads" scripts/ để tìm hết.

Cần làm:
- Xóa mục 'zalo-ads' và 3 lệnh replaceFormat('zalo-ads', …).
  Trước khi xóa, kiểm tra chỗ nào còn đọc dữ liệu này (trang nhóm Quảng cáo đa kênh, adsCatalog, thẻ liên kết chéo).
  • Nếu trang nhóm cần tên/mô tả ngắn cho thẻ Zalo thì giữ đúng phần đó, hoặc lấy từ scripts/zalo-ads-lp/data.mjs.
  • Không để trang nhóm bị vỡ.
- Xóa ảnh chụp cũ của Zalo trong screenshots/ và .sites-runtime/ (nếu có).

Trong scripts/build-service-pages.mjs:
- thêm buildZaloAds() giống hệt buildTikTokAds();
- thêm cờ --zalo-only;
- trong vòng lặp build đầy đủ: child.slug==='zalo-ads' → buildZaloAds();
- trong --multichannel-only: bỏ qua 'zalo-ads' như đã bỏ facebook/tiktok, và sửa câu log cho đúng số trang.

Các kênh còn lại (Google, Facebook, TikTok, Instagram, YouTube, LinkedIn…) phải build ra giống hệt trước khi sửa. So sánh file HTML trước/sau.

======================================================================
1. KIẾN TRÚC — DÙNG CHUNG, KHÔNG COPY
======================================================================

Tạo thư mục scripts/zalo-ads-lp/ gồm:
- data.mjs
- mocks.mjs
- page-formats.mjs
- page-goals.mjs
- page-budget.mjs

Dùng lại, không chép:
- scripts/google-ads-lp/: shared, visuals, scenes (chapter, toc, workbench, facts, note, siteScreen, zaloScreen, formScreen, callScreen, invoiceScreen, bidScreen, eventStream, crmScreen, SIGNALS, funnel, pipeline…);
- tiktok-ads-lp/ và facebook-ads-lp/ nếu có phần dùng được.

shared.mjs đã có bảng CHANNELS. Chỉ THÊM 1 dòng zalo, không thêm if/else:
  zalo: {
    name: 'Zalo Ads',
    pages: threePages('/dich-vu/quang-cao-da-kenh/zalo-ads/', [
      'Sáu kiểu quảng cáo trên Zalo trông như thế nào và chạy ra sao.',
      'Từ mục tiêu kinh doanh tới kiểu quảng cáo và đối tượng.',
      'Ngân sách, hóa đơn, đo lường và triển khai cùng POWAI.'
    ]),
    stepsLabel: 'Ba bước tìm hiểu Zalo Ads',
    crumb: 'Zalo Ads',
    css: ['/zalo-ads-lp.css'],
    bodyClass: 'zl-lp',
    accent: '#9bcaff',
    sourceLabel: 'Tài liệu Zalo Ads:'
  }
và export ZL_PAGES = CHANNELS.zalo.pages.

CSS và JS:
- dist/zalo-ads-lp.css chỉ chứa style mock Zalo, ≤ 25 KB.
- JS dùng lại dist/google-ads-lp.js.
- Body class "ga-lp zl-lp".
- Accent #9bcaff (xanh nhạt, đúng màu kênh Zalo cũ và nằm trong tông trang chủ).

URL:
1. /dich-vu/quang-cao-da-kenh/zalo-ads/ — Cách chạy & định dạng
2. /dich-vu/quang-cao-da-kenh/zalo-ads/chon-cach-chay/ — Chọn cách chạy
3. /dich-vu/quang-cao-da-kenh/zalo-ads/chi-phi-hieu-qua/ — Chi phí & hiệu quả

Hash cũ của trang Zalo chuyển về trang 1.

======================================================================
2. MÔ PHỎNG ZALO (scripts/zalo-ads-lp/mocks.mjs)
======================================================================

Quy tắc chung:
- bố cục thật của ứng dụng Zalo;
- KHÔNG vẽ logo/wordmark Zalo, Zalo OA, ZaloPay, Báo Mới, Zing MP3. Tên vị trí chỉ ghi bằng chữ trong phần giải thích, không đưa vào mock;
- dấu xác thực OA vẽ bằng icon check chung (visuals.mjs: verified), không dùng huy hiệu thật;
- thương hiệu mẫu Nhà Thơm (nhathom.example) và 6 sản phẩm có sẵn;
- ảnh trong khung tỷ lệ cố định, object-fit:cover. Quảng cáo OA dùng tỷ lệ 1024×533 (≈ 1,92:1);
- chữ ≥ 11px, nghiêng tối đa 4°;
- màu giao diện mock: xanh dương dịu cho thanh tiêu đề và nút, nền trắng/xám nhạt như ứng dụng thật.

Mock cần có:
- Thẻ quảng cáo trong Nhật ký / bảng tin:
  • avatar + tên OA + dấu xác thực + nhãn "Quảng cáo";
  • mô tả ≤ 90 ký tự;
  • ảnh 1,92:1 (hoặc nhiều ảnh);
  • nút hành động đổi theo kiểu: Quan tâm / Xem thêm / Đăng ký / Nhắn tin / Mua ngay.
- Trang Official Account: ảnh bìa, avatar, dấu xác thực, nút "Quan tâm" + "Nhắn tin", menu 3 nút dưới cùng, bài viết gần đây.
- Bài viết OA: màn đọc bài có tiêu đề, ảnh, đoạn văn, nút liên hệ cuối bài.
- Website: thẻ quảng cáo → trình duyệt trong ứng dụng mở landing page (dùng lại siteScreen có nút nổi Gọi/Zalo).
- Form: thẻ quảng cáo → form trong ứng dụng (họ tên, số điện thoại tự điền, 1–2 câu hỏi) → màn cảm ơn.
- Tin nhắn: bấm quảng cáo → mở khung chat 1:1 với OA.
  • kịch bản chào mừng (chữ hoặc ảnh + chữ);
  • nút gợi ý: Gửi tin nhắn / Mở website / Gọi điện;
  • dùng lại zaloScreen trong scenes.mjs và mở rộng nếu cần.
- Commerce: thẻ sản phẩm (ảnh + tên + giá) → trang chi tiết có nút "Đặt mua" → form đặt hàng → doanh nghiệp xác nhận.
- Video: video trong bảng tin (tỷ lệ theo quy cách hiện hành), có thanh tiến trình, nút âm thanh và nút hành động.
- Display:
  • banner trên một trang tin tức;
  • banner trên một ứng dụng nghe nhạc;
  • Medium Rectangle trên trang tin;
  Chỉ ghi "Trang tin tức" / "Ứng dụng nghe nhạc", không vẽ logo.
- Hero trang 1: chồng thẻ 3D gồm thẻ bảng tin, trang OA, khung chat, form.

======================================================================
3. TRANG 1 — CÁCH CHẠY & ĐỊNH DẠNG
======================================================================

Phần mở đầu:
- Hero: "Zalo Ads" — "Từ một quảng cáo đến một cuộc trò chuyện có thể đo."
- Thanh 3 bước.
- Quỹ đạo hành trình: Lướt Zalo → Thấy quảng cáo → Quan tâm OA / nhắn tin / để lại form / vào website → Tư vấn qua Zalo → Đơn hàng & CRM.

Bộ chọn 6 kiểu quảng cáo, mỗi kiểu 1 màu. Gom 8 hình thức chính thức thành 6 nhóm:
1. Official Account — tăng lượt quan tâm OA — #9bcaff
2. Website & Bài viết OA — đưa người xem tới trang/bài — #88e4ff
3. Form — thu khách hàng tiềm năng — #ffbd80
4. Tin nhắn — trò chuyện 1:1 với doanh nghiệp — #85e1c1
5. Commerce — bán sản phẩm vật lý — #c0a2ff
6. Video & Display — nhận diện thương hiệu trên Zalo và mạng đối tác — #e0cd9b

Mỗi kiểu có đủ 6 chương như Google/Facebook/TikTok:
- 01 Trông như thế nào: workbench các vị trí hiển thị (Zalo: bảng tin, mục bài viết; mạng đối tác: trang tin tức, ứng dụng nghe nhạc), mỗi mục 1 mock ở mục 2.
- 02 Chạy như thế nào: flow 5 bước + machine() "Bạn đưa vào → Zalo Ads phân phối → Bạn nhận lại". Có thêm ô "Cách tính phí" cho từng kiểu, lấy theo trang chính thức:
  • OA: CPC, CPF;
  • Website: CPC (CPM nếu còn);
  • Bài viết: CPC;
  • Form: CPC, CPA, CPM;
  • Tin nhắn: CPC, CPA;
  • Commerce: CPC, CPA;
  • Video & Display: CPM (Medium Rectangle có CPC).
- 03 Cần chuẩn bị gì:
  • bản vẽ khung ảnh 1024×533 (≤ 2 MB) có vùng an toàn;
  • ô đếm ký tự: mô tả OA ≤ 90, tên kịch bản tin nhắn ≤ 50, nội dung tin nhắn ≤ 2.000;
  • OA đã xác thực + quyền Admin/quản lý;
  • giấy phép ngành (nếu ngành yêu cầu);
  • với Form/Commerce: ngành có được hỗ trợ không.
  Mọi thông số phải kiểm chứng lại ở mục 6.
- 04 Đo điều gì: dùng lại cảnh tương tác "màn khách thấy → bảng báo cáo".
  • OA: lượt quan tâm → người nhắn tin;
  • Form: lead → lead phù hợp;
  • Tin nhắn: cuộc trò chuyện → khách tư vấn được;
  • Commerce: đơn đặt → đơn giao.
  Bảng báo cáo có cột "Đội tư vấn xác nhận" / "Đơn đã giao".
- 05 Cách triển khai: hướng đi (biểu đồ mini) + chẩn đoán, ví dụ:
  • "nhiều lượt quan tâm OA nhưng ít người nhắn";
  • "nhiều form nhưng số điện thoại sai / trùng";
  • "tin nhắn đến nhưng phản hồi chậm";
  • "quảng cáo bị từ chối vì thiếu giấy phép".
- 06 Trước khi chạy: checklist có vòng tiến độ.

Kết trang: "Nhớ nhanh" 6 ô + khối sang trang 2.

======================================================================
4. TRANG 2 — CHỌN CÁCH CHẠY
======================================================================

Mục lục: 01 Mục tiêu · 02 Mức độ sẵn sàng · 03 Đối tượng · 04 Tóm tắt

01 Mục tiêu — Zalo Ads chọn theo HÌNH THỨC quảng cáo, không có danh sách "mục tiêu chiến dịch" như Meta/TikTok. Trình bày theo mục tiêu kinh doanh → hình thức phù hợp:
- Tăng người quan tâm OA → Official Account;
- Tăng truy cập website → Website;
- Nhận biết thương hiệu → Video / Display / Bài viết;
- Thu khách tiềm năng → Form;
- Trò chuyện 1:1 → Tin nhắn;
- Bán sản phẩm → Commerce.

Mỗi mục trong workbench:
- facts hiện sẵn: "Hình thức" + "Khách đi đâu sau khi bấm";
- "Tính phí theo" và "Cần chuẩn bị" để trong "Đọc tiếp";
- stage là màn hình khách thấy.

Nếu trình tạo quảng cáo Zalo hiện có bước chọn mục tiêu riêng thì theo trình tạo, kèm nguồn.

02 Mức độ sẵn sàng — 5 mức, stage là quảng cáo Zalo hợp với từng mức:
- Chưa biết: Video / Display;
- Đã quan tâm: OA / Bài viết;
- Đang cân nhắc: Website / Form;
- Đã liên hệ: Tin nhắn (kịch bản chăm sóc);
- Đã mua: nhắm lại danh sách khách (đối tượng tùy chỉnh) / Commerce.

Ghi chú: ZNS (tin thông báo qua Zalo) thuộc giải pháp khác, KHÔNG phải Zalo Ads. Chỉ nhắc một dòng nếu kiểm chứng được, không đưa vào bộ chọn.

03 Đối tượng — workbench chia 3 nhóm màu, mỗi mục một hình minh họa (dùng SIGNALS nếu hợp):
- Ràng buộc cứng: khu vực, giới tính, độ tuổi, thiết bị/hệ điều hành (nếu còn).
- Dấu hiệu hành vi: sở thích / hành vi và các tiêu chí khác có trong trình tạo — kiểm chứng tên chính xác.
- Dữ liệu của doanh nghiệp:
  • nhóm đối tượng tùy chỉnh: danh sách số điện thoại, người đã gửi form (Form Manage), người đã nhắn tin;
  • nhóm đối tượng tương tự;
  • nhóm đối tượng đã lưu.
- Ghi chú: khi dùng danh sách số điện thoại thì KHÔNG kèm được tiêu chí nhân khẩu học (theo trang Zalo Ads) + nguồn.

04 Tóm tắt + khối sang trang 3.

======================================================================
5. TRANG 3 — CHI PHÍ & HIỆU QUẢ
======================================================================

Mục lục: 01 Chi phí · 02 Đặt thầu · 03 Chỉ số · 04 Đo lường · 05 Sự kiện · 06 Triển khai · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

01 Chi phí
- Sơ đồ 3 khoản: trả cho Zalo Ads / sản xuất nội dung & vận hành OA / phí dịch vụ POWAI.
- Workbench, stage là chứng từ mẫu tô sáng đúng dòng:
  • nạp tiền: thẻ quốc tế, ATM/Internet Banking, ví điện tử, chuyển khoản (VietQR), mã voucher; nạp trực tuyến tối thiểu 50.000đ/giao dịch;
  • ngân sách theo ngày / theo chiến dịch; ví dụ OA: tổng ngân sách tối thiểu 500.000đ/ngày, tự đặt giá ≥ 10.000đ/lượt quan tâm, đơn tối thiểu 100 lượt;
  • giá tối thiểu do hệ thống đặt (nhắm càng hẹp giá tối thiểu càng cao);
  • hóa đơn VAT.
- Ô tự tính thử (để trống).
- VỀ THUẾ:
  • Trang Zalo Ads "Tôi muốn xuất hóa đơn VAT cho số tiền nạp được không?" xác nhận có xuất hóa đơn VAT (doanh nghiệp hoặc cá nhân), do kế toán Adtima xuất.
  • Trang này KHÔNG ghi thuế suất và không nói số nạp đã gồm VAT hay chưa → để taxRate = null như Google.
  • Hiện câu: "Zalo Ads xuất hóa đơn VAT cho số tiền nạp; thuế suất và cách tính theo hóa đơn — POWAI đối chiếu khi nạp."
  • Nhấn mạnh: điền đúng tên công ty, mã số thuế, địa chỉ, email TRƯỚC khi nạp. Mã số thuế sai hoặc ngừng hoạt động thì hóa đơn không được điều chỉnh/xuất lại.
  • Chỉ ghi thuế suất nếu tìm được trang Zalo Ads chính thức ghi rõ, kèm nguồn + ngày kiểm tra.

02 Đặt thầu — workbench + bidScreen:
- CPC (tính khi nhấn);
- CPM (tính theo 1.000 lượt hiển thị);
- CPA (tính theo lead / cuộc trò chuyện / đơn);
- CPF (tính theo lượt quan tâm OA);
- Đặt giá thầu theo tổng ngân sách.
Ghi chú khuyến nghị của Zalo: đặt tối thiểu khoảng 50 lượt nhấn/ngày. Mỗi cách có biểu đồ mini minh họa (số mẫu).

03 Chỉ số — phễu bấm được, công thức bằng hình với số mẫu:
- Hiển thị: Lượt hiển thị, Tiếp cận, Tần suất, CPM.
- Nhấp: Lượt nhấn, CTR, CPC.
- Quan tâm OA: Lượt quan tâm, CPF, tỷ lệ người quan tâm có nhắn tin.
- Khách tiềm năng / tin nhắn: Lead, CPL, Lead phù hợp, CPQL, số cuộc trò chuyện, tỷ lệ phản hồi.
- Đơn hàng: Đơn đặt, đơn giao, doanh thu, ROAS, CAC.
Ghi rõ "số mẫu, không phải kết quả dự kiến".

04 Đo lường — sơ đồ đường ống, mỗi trạm một giao diện thu nhỏ:
- UTM → Website → GA4 / công cụ đo chuyển đổi của Zalo Ads (chỉ ghi nếu kiểm chứng được tên và cách cài);
- Form → Form Manage → tải lead / nối CRM;
- Tin nhắn OA → hộp thư OA → CRM;
- Commerce → đơn đặt → xác nhận;
- CRM → tạo lại nhóm đối tượng tùy chỉnh (danh sách số điện thoại).

05 Sự kiện — workbench chia "Tín hiệu" và "Đã xác nhận", stage là điện thoại đang thao tác + nhật ký sự kiện:
- Tín hiệu: nhấn quảng cáo, quan tâm OA, mở chat, gửi form, đặt đơn, xem trang.
- Đã xác nhận (CRM): lead phù hợp, khách tư vấn được, đơn giao.
- KHÔNG bịa tên sự kiện kỹ thuật. Nếu Zalo Ads không có danh sách sự kiện chuẩn công khai thì ghi là sự kiện đo phía website/CRM.

06 Triển khai (10 bước, 3 chặng) · 07 Chuẩn bị · 08 Hỏi đáp · 09 Liên hệ

07 Chuẩn bị — checklist chia nhóm:
- tài khoản Zalo Ads, OA đã xác thực, quyền Admin/quản lý;
- giấy phép ngành;
- thông tin hóa đơn (tên, mã số thuế, email) + cách nạp;
- ảnh 1024×533, mô tả ≤ 90 ký tự, video;
- landing page / bài viết OA;
- form và câu hỏi sàng lọc;
- kịch bản tin nhắn + người trực chat;
- danh sách khách (nếu nhắm lại);
- CRM.

08 Hỏi đáp — tab theo chủ đề, khoảng 12–15 câu viết mới:
- tài khoản cá nhân có chạy được không (Tin nhắn: OA hoặc tài khoản cá nhân đã định danh);
- vì sao cần OA xác thực;
- ngành nào cần giấy phép;
- Form/Commerce không áp dụng cho mọi ngành;
- chi phí tối thiểu;
- nạp tiền bằng cách nào;
- xuất hóa đơn VAT thế nào;
- xét duyệt mất bao lâu (chỉ ghi nếu có nguồn);
- quảng cáo bị từ chối;
- nhiều quan tâm OA nhưng ít đơn;
- Zalo khác Facebook/TikTok ở đâu;
- ZNS có phải quảng cáo không;
- ai giữ tài khoản và OA.

09 Liên hệ — dùng lại form + thẻ Hotline/Zalo và placeholder chung.

Kết trang: Tóm tắt 3 ô + khối "Xem thêm Google Ads / Facebook Ads / TikTok Ads".

======================================================================
6. NỘI DUNG PHẢI ĐÚNG VỚI ZALO ADS HIỆN TẠI
======================================================================

- Mọi thông tin về nền tảng phải đối chiếu trang chính thức ads.zalo.me/business/. Lưu nguồn + ngày kiểm tra trong data.mjs, hiển thị "Tài liệu Zalo Ads ↗" ở từng chương.
- Nguồn đã đọc ngày 28/09/2026 (kiểm tra lại khi làm):
  • Các hình thức quảng cáo: ads.zalo.me/business/cac-hinh-thuc-quang-cao-tren-zalo-ads/
    8 hình thức: Official Account, Website, Video, Bài viết, Form, Tin nhắn, Display, Commerce; kèm cách tính phí từng loại. Commerce chỉ cho sản phẩm vật lý.
  • Cách tính phí & đặt giá thầu: ads.zalo.me/business/cac-hinh-thuc-tinh-phi-va-cach-dat-gia-thau-tren-zalo-ads/
    CPC / CPM / CPA; giá tối thiểu do hệ thống đặt; khuyến nghị ≥ 50 lượt nhấn/ngày.
  • Quảng cáo OA: ads.zalo.me/business/huong-dan-tao-quang-cao-zalo-official-account/
    Ảnh 1024×533, ≤ 2 MB; mô tả ≤ 90 ký tự; CPC/CPF; tổng ngân sách ≥ 500.000đ/ngày; tự đặt giá ≥ 10.000đ/lượt quan tâm, tối thiểu 100 lượt; hiển thị trên Zalo và mạng đối tác.
  • Quảng cáo Tin nhắn: ads.zalo.me/business/huong-dan-tao-quang-cao-tin-nhan-tren-zalo-ads-message-ads/
    Mở hộp thoại 1:1; CPC/CPA; tên kịch bản ≤ 50, nội dung ≤ 2.000 ký tự; nút gửi tin / mở web / gọi.
  • Chọn đối tượng: ads.zalo.me/business/chon-nhom-doi-tuong-quang-cao/
  • Bài viết: ads.zalo.me/business/quang-cao-bai-viet-tren-zalo/
  • Nạp tiền: ads.zalo.me/business/huong-dan-nap-tien-vao-tai-khoan-zalo-ads/ (tối thiểu 50.000đ/giao dịch trực tuyến)
  • Hóa đơn VAT: ads.zalo.me/business/toi-muon-xuat-hoa-don-vat-cho-so-tien-nap-duoc-khong/
    và ads.zalo.me/business/luu-y-xuat-hoa-don-zalo-ads/
  • Đặt giá thầu theo tổng ngân sách: ads.zalo.me/business/huong-dan-tao-quang-cao-dat-gia-thau-theo-ngan-sach/
- Điểm CHƯA kiểm chứng, phải đọc trang chính thức trước khi viết, không có nguồn thì không ghi:
  • quy cách Form (ngành hỗ trợ, số trường), Video (tỷ lệ, thời lượng), Display (kích thước);
  • danh sách tiêu chí nhắm chọn đầy đủ;
  • công cụ đo chuyển đổi / pixel của Zalo Ads;
  • thời gian xét duyệt;
  • thuế suất VAT.
- Không bịa số liệu hiệu quả, không hứa kết quả. Mọi con số minh họa đều ghi là số mẫu.
- Giọng văn giống các trang Google/Facebook/TikTok: câu ngắn, nói rõ điều làm được và điều chưa đủ cơ sở.

======================================================================
7. KIỂM TRA
======================================================================

- Viết scripts/test-zalo-ads-lp.cjs theo mẫu test-tiktok-ads-lp.cjs:
  • 3 trang, mọi workbench/tab/phễu/đường ống/checklist/form/ô tính thử hoạt động;
  • mọi .chap có .chap-head.has-num;
  • mỗi chương có ≥ 1 hình;
  • 1440 / 768 / 390 / 320px không cuộn ngang;
  • không lỗi console;
  • không còn chuỗi "multichannel" hay class của trang cũ trong 3 file HTML Zalo.
- Chạy ga-visual-audit.cjs cho Zalo, chụp từng mô phỏng. Soát:
  • chữ tràn khỏi điện thoại;
  • chữ bị nút nổi che;
  • ảnh trống;
  • tiêu đề quá 2 dòng;
  • có logo nền tảng.
- Chạy lại test Google, Facebook, TikTok: vẫn pass.
- Build toàn bộ: trang nhóm Quảng cáo đa kênh và các kênh khác không đổi (trừ link Zalo nếu cần).

======================================================================
THỨ TỰ LÀM — làm liên tục, không dừng giữa chừng
======================================================================

1. Thêm dòng zalo vào CHANNELS + dựng buildZaloAds / --zalo-only, xóa dữ liệu Zalo cũ.
2. Đọc lại các nguồn ở mục 6 → data.mjs (nội dung mới, có nguồn) + mocks.mjs.
3. Trang 1 → trang 2 → trang 3.
4. Test + audit + so sánh các kênh khác.

Xong gửi tôi:
- ảnh toàn trang 1440 + 390 của 3 trang;
- ảnh audit mô phỏng;
- kết quả test;
- danh sách nguồn Zalo Ads đã dùng kèm ngày kiểm tra;
- những điểm không kiểm chứng được.

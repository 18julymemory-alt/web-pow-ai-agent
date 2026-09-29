# Kế hoạch: 5 trang dịch vụ còn lại thành landing page một trang

Áp dụng cho: **Instagram Ads · YouTube Ads · Remarketing · Performance Marketing · Tối ưu chuyển đổi quảng cáo**.

Nội dung các mục này ít hơn Google / Facebook / TikTok / Zalo / ChatGPT, nên không tách 3 trang. Mỗi mục là **một landing page dài**, giữ đúng URL hiện tại:

| Mục | URL |
|---|---|
| Instagram Ads | `/dich-vu/quang-cao-da-kenh/instagram-ads/` |
| YouTube Ads | `/dich-vu/quang-cao-da-kenh/youtube-ads/` |
| Remarketing | `/dich-vu/quang-cao-da-kenh/remarketing/` |
| Performance Marketing | `/dich-vu/quang-cao-da-kenh/performance-marketing/` |
| Tối ưu chuyển đổi quảng cáo | `/dich-vu/quang-cao-da-kenh/toi-uu-chuyen-doi-quang-cao/` |

Menu, trang chủ, `navigation.js/css` không đổi.

## 1. Khung chung (giống các kênh đã làm)

- Cùng shell `ga-lp`: header/footer thật, nền trời, font, màu, `google-ads-lp.js`.
- Hero: tiêu đề, câu phụ, đoạn giới thiệu, 2 nút, dòng "Cập nhật theo tài liệu … ngày …", hình 3D bên phải.
- Mục lục dính + số chương lớn.
- Mỗi chương có hình/mô phỏng và dòng "Tài liệu …:" dẫn về nguồn chính thức.
- Workbench "danh sách | thông tin | mô phỏng", nút "Đọc tiếp".
- Mọi con số minh họa ghi "số mẫu". Không logo nền tảng, thương hiệu mẫu Nhà Thơm.

## 2. Tám chương cho mỗi trang

| # | Chương | Hình |
|---|---|---|
| 01 | Khi nào nên dùng | Đường đi của khách + hai thẻ "Hợp khi / Chưa hợp khi" |
| 02 | Định dạng / cách làm | Workbench, mỗi mục một mô phỏng |
| 03 | Cần chuẩn bị gì | Bản vẽ kích thước, ô đếm ký tự, ô thông số, bộ tài nguyên |
| 04 | Mục tiêu & đối tượng | Workbench chia nhóm màu, stage là màn hình khách thấy |
| 05 | Đo lường | Phễu bấm được, số mẫu |
| 06 | Triển khai | Các bước theo chặng + checklist có vòng tiến độ |
| 07 | Hỏi đáp | Tab theo chủ đề |
| 08 | Liên hệ | Form + Hotline/Zalo (placeholder chung) |

Kết trang: "Xem thêm" sang các kênh liên quan.

## 3. Nội dung từng trang

- **Instagram Ads** — Bảng tin, Stories, Reels, Carousel. Thông số lấy lại từ dữ liệu Meta đã kiểm tra cho trang Facebook Ads (ảnh 4:5 1440×1800, 9:16 1440×2560, văn bản chính Reels khuyến nghị 44 ký tự). Mục tiêu: 6 mục tiêu chiến dịch của Meta. Nguồn: Meta Business Help Center, Meta Ads Guide.
- **YouTube Ads** — In-stream bỏ qua được, không bỏ qua được, Bumper, In-feed, Shorts, Masthead. Mục tiêu: Video Views, Video Reach, chuyển đổi qua Demand Gen (Video Action đã chuyển sang Demand Gen). Nguồn: Google Ads Help.
- **Remarketing** — Khách xem website, bỏ giỏ, người xem video/tương tác, danh sách khách (CRM). Khung thời gian, loại trừ người đã mua, tần suất. Nguồn: Google Ads Help (tệp dữ liệu, tín hiệu PMax), Meta (đối tượng tùy chỉnh).
- **Performance Marketing** — Đón nhu cầu, tạo nhu cầu, tiếp nối khách, thử nghiệm ngân sách. Một hệ đo chung: UTM, sự kiện, CRM. Nguồn: Google Ads Help (đo chuyển đổi, thử nghiệm).
- **Tối ưu chuyển đổi (CRO)** — Thông điệp ↔ trang đích, form, thanh toán trên điện thoại, A/B testing. Nguồn: Google Ads Help (thử nghiệm), web.dev (form).

## 4. Kiến trúc mã

- `scripts/one-page-lp/render.mjs` — dựng 8 chương từ dữ liệu, dùng lại kit `scripts/google-ads-lp/` (không chép).
- `scripts/one-page-lp/mocks.mjs` — mô phỏng mới (khung thời gian remarketing, A/B, thanh toán, phân bổ ngân sách…). Mô phỏng Instagram dùng lại của Facebook Ads, YouTube dùng lại của Google Ads.
- `scripts/one-page-lp/{instagram,youtube,remarketing,performance,cro}.mjs` — nội dung + nguồn + ngày kiểm tra.
- `dist/one-page-lp.css` — chỉ style mô phỏng mới, ≤ 25 KB, scope `.op-lp`.
- `shared.mjs` — thêm 5 dòng vào `CHANNELS` (không if/else).
- `google-ads-lp.js` — thêm một dòng `op-lp` để hash cũ không chuyển nhầm sang trang Google.
- `build-service-pages.mjs` — `buildOnePage(slug)` + cờ `--onepage-only`; bỏ đường build `multichannelPage` cũ cho 5 mục này.

## 5. Kiểm tra

- `scripts/test-one-page-lp.cjs`: 5 trang, shell, không cuộn ngang 320–1920, mọi chương có số + hình + nguồn, workbench/tab/phễu/checklist/form hoạt động, không lỗi console, mô phỏng chữ ≥ 11px, không logo nền tảng.
- `ga-visual-audit.cjs` cho 5 trang.
- Chạy lại test Google / Facebook / TikTok / Zalo / ChatGPT.

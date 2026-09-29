# Đào tạo Digital Marketing — một trang landing cho mỗi khóa học

Mười ba mục trong nhóm "Đào tạo Digital Marketing" của menu, mỗi mục là một trang landing
page trên cùng khung với các trang quảng cáo và Website (hero, mục lục dính, số chương lớn,
workbench, phễu đánh giá, lộ trình, hỏi đáp, form liên hệ, "Xem thêm").

| # | Khóa học | Đường dẫn (/dich-vu/dao-tao-digital-marketing/…) | Module | Màu nhấn |
|---|----------|------------------------------------------------|--------|----------|
| 1 | Digital Marketing tổng thể | digital-marketing-tong-the/ | tong-the.mjs | #9fd8ff |
| 2 | Google Ads | google-ads/ | google-ads.mjs | #a8c8ff |
| 3 | Facebook Ads | facebook-ads/ | facebook-ads.mjs | #9db8f5 |
| 4 | TikTok Ads | tiktok-ads/ | tiktok-ads.mjs | #f5a3c0 |
| 5 | SEO | seo/ | seo.mjs | #a6e3b8 |
| 6 | Content Marketing | content-marketing/ | content.mjs | #f3c79a |
| 7 | Social Media Marketing | social-media-marketing/ | social.mjs | #d4b3ff |
| 8 | Website Marketing | website-marketing/ | website.mjs | #9fc8ff |
| 9 | GA4 & Tracking | ga4-tracking/ | ga4.mjs | #ffd08a |
| 10 | AI Marketing | ai-marketing/ | ai.mjs | #8fe3d6 |
| 11 | Automation | automation/ | automation.mjs | #b8e08f |
| 12 | Marketing thực chiến cho doanh nghiệp | marketing-thuc-chien-cho-doanh-nghiep/ | thuc-chien.mjs | #ffb89a |
| 13 | Đào tạo đội ngũ Marketing nội bộ | dao-tao-doi-ngu-marketing-noi-bo/ | doi-ngu.mjs | #c9d0ff |

## Cách dựng

- Nội dung bám theo repo: `service-content.mjs` (trọng tâm từng khóa), `service-specific-audit.mjs`
  (vấn đề của học viên, bài làm, bước thực hành, tiêu chí đạt) và chương Đào tạo của
  `service-editorial-chapters.mjs` (khảo sát đầu vào, đề cương theo đầu ra, thực hành có phản hồi,
  đánh giá ứng dụng, chứng nhận, ngân sách chạy thật).
- `scripts/training-lp/course.mjs` dựng phần chung của mọi khóa (tên chương, lộ trình 5 bước,
  đánh giá Hiểu → Làm → Ứng dụng, hai câu hỏi chung); mỗi module khóa học chỉ đưa phần riêng.
- Hero riêng từng khóa (`scripts/training-lp/extra.mjs`): hình của chính môn học (quảng cáo tìm kiếm,
  kịch bản video, luồng sự kiện…), bài học trên điện thoại, 3 chú thích và nhãn "Đào tạo Digital Marketing · Khóa học".
- Khung "Khóa X học gì?" dưới hero: mô tả ngắn và 3 ý (dành cho, thực hành, học thêm / theo tài liệu).
- Chín chương: 01 Dành cho ai · 02 Cốt lõi (6 kiến thức cốt lõi + học xong làm được / không hứa) ·
  03 Chương trình · 04 Cần chuẩn bị · 05 Thực hành · 06 Đánh giá · 07 Lộ trình · 08 Hỏi đáp · 09 Liên hệ.
- Hình minh họa: `scripts/training-lp/mocks.mjs` (lớp `trm-*`: đề cương, màn hình bài học, lịch học,
  đề bài, tiêu chí chấm, nhận xét bài, ma trận kỹ năng, kế hoạch một trang, nhóm từ khóa, kế hoạch
  sự kiện, luồng sự kiện, thẻ/trình kích hoạt/biến, yêu cầu AI có nguồn, luồng tự động, brief, lịch
  nội dung, rà soát SEO, kịch bản video, mục tiêu → chỉ số, phiếu đánh giá trang, kế hoạch 30 ngày)
  cùng các mô phỏng dùng lại từ trang Website và quảng cáo.
- CSS `dist/training-lp.css` (mọi quy tắc dưới `.tr-lp`, ≤ 25 KB); mỗi khóa là một dòng `CHANNELS`
  (`edu(...)`), breadcrumb về nhóm Đào tạo.
- Build: `node scripts/build-service-pages.mjs --training-only [--slug=google-ads]`.

## Quy tắc

- Nguồn chính thức, ghi ngày kiểm tra: Google Ads Help, Skillshop, Meta Business Help, Meta Blueprint,
  TikTok Ads Manager Help, TikTok Academy, Google Analytics Help, Tag Manager Help, Google Search
  Central, web.dev, Apps Script, OWASP, MDN.
- Không logo nền tảng; thương hiệu mẫu Nhà Thơm; số liệu ghi "mẫu"; không hứa chứng nhận hay kết quả.
- Bài tập không bật chi tiêu thật khi chưa được cho phép; dữ liệu thực hành đã ẩn thông tin cá nhân.

## Kiểm tra

`node scripts/test-training-lp.cjs` — khung, không cuộn ngang 320–1920 px, 8 chương đúng thứ tự và
đúng tên, chương nào cũng có hình và nguồn chính thức, mọi nút workbench ở 1440 và 390, luật mô phỏng,
phễu / FAQ / checklist / form, breadcrumb về nhóm, "Xem thêm" trỏ tới khóa cùng nhóm, không lỗi console.

# Website & Landing Page — một trang landing cho mỗi dịch vụ

Mười mục trong nhóm "Website & Landing Page" của menu, mỗi mục là một trang landing
page dựng trên cùng khung với các trang quảng cáo (hero, mục lục dính, số chương
lớn, workbench danh sách | nội dung | hình minh họa, phễu đo lường, checklist,
hỏi đáp, form liên hệ, "Xem thêm").

| # | Mục | Đường dẫn | Module | Màu nhấn |
|---|-----|-----------|--------|----------|
| 1 | Website doanh nghiệp | /dich-vu/website-landing-page/website-doanh-nghiep/ | doanh-nghiep.mjs | #9fc8ff |
| 2 | Website bán hàng | …/website-ban-hang/ | ban-hang.mjs | #ffc59a |
| 3 | Landing Page | …/landing-page/ | landing-page.mjs | #f3a9c9 |
| 4 | WordPress | …/wordpress/ | wordpress.mjs | #a9c4ec |
| 5 | Website theo yêu cầu | …/website-theo-yeu-cau/ | theo-yeu-cau.mjs | #b9a8f2 |
| 6 | UI/UX | …/ui-ux/ | ui-ux.mjs | #e0b3ff |
| 7 | CRO – tối ưu chuyển đổi | …/cro-toi-uu-chuyen-doi/ | cro.mjs | #f0d28a |
| 8 | Bảo trì Website | …/bao-tri-website/ | bao-tri.mjs | #9fe0c9 |
| 9 | Tối ưu tốc độ | …/toi-uu-toc-do/ | toc-do.mjs | #8fe3f0 |
| 10 | Tích hợp hệ thống | …/tich-hop-he-thong/ | tich-hop.mjs | #b8e08f |

## Cách dựng

- Nội dung bám theo repo: `service-content.mjs` (focus từng mục), `service-specific-audit.mjs`
  (vấn đề, công cụ, bản mẫu, bước kiểm tra, tiêu chí nghiệm thu), `service-editorial-chapters.mjs`
  (định nghĩa, lựa chọn, quy trình, chuẩn bị, chi phí, chỉ số, hỏi đáp của nhóm Website).
- Renderer dùng chung `scripts/one-page-lp/render.mjs`; trang website đổi tên chương qua các
  trường tùy chọn (`toc`, `eyebrow`, `rollout.lead`, `measure.sample`, `contact`).
- Tám chương: 01 Khi nào cần · 02 Hạng mục (tên riêng theo từng trang) · 03 Cần chuẩn bị ·
  04 Tình huống / trạng thái · 05 Đo lường · 06 Triển khai · 07 Hỏi đáp · 08 Liên hệ.
- Dữ liệu trong `scripts/website-lp/<module>.mjs`, hình minh họa trong `scripts/website-lp/mocks.mjs`
  (lớp `wsm-*`), CSS trong `dist/website-lp.css` (mọi quy tắc nằm dưới `.ws-lp`, ≤ 25 KB, không `!important`).
- Mỗi mục là một dòng `CHANNELS` (`web(...)` trong shared.mjs) với breadcrumb của nhóm Website.
- Build: `node scripts/build-service-pages.mjs --website-only [--slug=landing-page]`.

## Quy tắc

- Nguồn: tài liệu chính thức (web.dev, W3C/WAI, MDN, WordPress.org, Google Search Central,
  Google Analytics, PageSpeed Insights, OWASP, Bộ Công Thương), ghi ngày kiểm tra.
- Không logo nền tảng; thương hiệu mẫu Nhà Thơm (nhathom.example); số liệu minh họa ghi "số mẫu".
- Không hứa trước thời gian, chi phí hay mức tăng; báo giá theo phạm vi sau khảo sát.
- Chữ trong mô phỏng ≥ 11 px, nghiêng ≤ 4°, ảnh object-fit: cover.

## Kiểm tra

`node scripts/test-website-lp.cjs` — khung, không cuộn ngang 320–1920 px, 8 chương đúng thứ tự,
chương nào cũng có hình và nguồn, mọi nút workbench ở 1440 và 390, luật mô phỏng, phễu / FAQ /
checklist / form, khối "Xem thêm" trỏ tới trang cùng nhóm, không lỗi console.

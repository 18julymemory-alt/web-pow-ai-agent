# Thương mại điện tử — một trang landing cho mỗi dịch vụ

Nhóm "Thương mại điện tử" bỏ hai mục **Lazada** và **Livestream bán hàng** (khỏi menu
`dist/navigation-data.js` và mọi mảng theo vị trí: `service-content.mjs`, `service-specific-audit.mjs`,
`service-image-briefs.mjs`, `service-reference-links.mjs`, `service-visuals.mjs`, ảnh minh họa và trang cũ).
Tám mục còn lại, mỗi mục một trang landing trên cùng khung với nhóm Website và Đào tạo.

| # | Mục | Đường dẫn (/dich-vu/thuong-mai-dien-tu/…) | Module | Màu nhấn |
|---|-----|-------------------------------------------|--------|----------|
| 1 | Shopee | shopee/ | shopee.mjs | #ff9f80 |
| 2 | TikTok Shop | tiktok-shop/ | tiktok-shop.mjs | #f5a3c0 |
| 3 | Website bán hàng | website-ban-hang/ | website-ban-hang.mjs | #ffc59a |
| 4 | Thiết lập gian hàng | thiet-lap-gian-hang/ | thiet-lap.mjs | #9fd8ff |
| 5 | Tối ưu sản phẩm | toi-uu-san-pham/ | toi-uu-san-pham.mjs | #b8e08f |
| 6 | Quảng cáo sàn | quang-cao-san/ | quang-cao-san.mjs | #ffd08a |
| 7 | Vận hành gian hàng | van-hanh-gian-hang/ | van-hanh.mjs | #9fe0c9 |
| 8 | Content thương mại điện tử | content-thuong-mai-dien-tu/ | content.mjs | #d4b3ff |

## Cách dựng

- Nội dung bám theo repo: trọng tâm từng mục trong `service-content.mjs`, vấn đề / công cụ / bước /
  tiêu chí trong `service-specific-audit.mjs`, phương pháp của nhóm trong `service-editorial-chapters.mjs`
  (đối chiếu nguồn hàng, chuẩn hóa trang bán, thử cả luồng mua, đối soát vận hành).
- `scripts/commerce-lp/shop.mjs` dựng phần chung (hero có nhãn nhóm, khung "là gì", lộ trình 5 bước,
  hai câu hỏi chung); mỗi module mục đưa hình hero, 6 điểm cốt lõi, hạng mục, tình huống, đo lường riêng.
- Chín chương: 01 Khi nào cần · 02 Cốt lõi · 03 (tên riêng từng mục) · 04 Cần chuẩn bị · 05 Tình huống ·
  06 Đo lường · 07 Triển khai · 08 Hỏi đáp · 09 Liên hệ.
- Hình minh họa `scripts/commerce-lp/mocks.mjs` (lớp `cmm-*`): kết quả tìm kiếm và trang sản phẩm trong
  ứng dụng mua sắm, video gắn sản phẩm, tin nhắn khách, bảng SKU, bảng đơn, checklist thiết lập, báo cáo
  quảng cáo theo sản phẩm, từ khóa – giá thầu, trang trước / sau, brief sản phẩm, hoàn hủy theo lý do,
  tiền thực nhận. Giao diện sàn là mô phỏng chung, không logo, không màu thương hiệu của sàn.
- CSS `dist/commerce-lp.css` (dưới `.cm-lp`); mỗi mục một dòng `CHANNELS` (`ecom(...)`).
- Build: `node scripts/build-service-pages.mjs --commerce-only [--slug=shopee]`.

## Quy tắc

- Nguồn: Học viện Shopee (Shopee Uni), Học viện TikTok Shop, Bộ Công Thương (online.gov.vn), Google Search
  Central, Google Analytics, web.dev; ghi ngày kiểm tra.
- Không nêu con số phí sàn, thời hạn xử lý hay điều kiện chương trình: dẫn tới nguồn vì thay đổi theo sàn,
  ngành hàng và tài khoản. Số liệu minh họa ghi "mẫu".

## Kiểm tra

`node scripts/test-commerce-lp.cjs` — như nhóm Website, thêm kiểm tra Lazada và Livestream bán hàng đã bỏ
khỏi menu, nội dung theo vị trí và thư mục `dist`.

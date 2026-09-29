# Ảnh cần tạo cho 3 trang Google Ads

Thương hiệu mẫu: **Nhà Thơm** (nến, tinh dầu, đồ dưỡng thể), tên miền `nhathom.example`.

**Hiện trạng:** chưa có ảnh nào đạt chuẩn (thẳng, nền sạch, đúng sản phẩm), nên cả 3 trang đang dùng **ảnh vẽ SVG thay thế** trong `dist/assets/ga/ph/`. Khi có ảnh thật, trang tự đổi sang ảnh, không cần sửa mã.

## Cách thay ảnh

1. Đặt ảnh vào `dist/assets/product-photos/nhathom/` và đặt tên đúng **mã** trong bảng, ví dụ `nen-thom.png`. Nhận các đuôi png, jpg và webp.
2. Chạy `node scripts/ga-photos.cjs`. Script tự:
   - cắt giữa theo đúng tỉ lệ, không kéo méo;
   - xuất `<mã>@1x.webp` và `<mã>@2x.webp` vào `dist/assets/ga/`, chất lượng 0.86 → 0.82;
   - giữ trong giới hạn dung lượng: ảnh nhỏ ≤ 40 KB, ảnh cảnh ≤ 150 KB.
3. Chạy `node scripts/build-service-pages.mjs --google-only`.

Ảnh gốc nên lớn bằng hoặc hơn kích thước ghi trong bảng. Nếu ảnh nhỏ hơn, script sẽ báo.

## Yêu cầu chung cho mọi ảnh

- Ảnh chụp thật, ánh sáng mềm tự nhiên. Nền be/trắng kem hoặc mặt gỗ sáng.
- Sản phẩm **chụp thẳng**, không nghiêng, nằm giữa khung, chừa lề khoảng 12–15% mỗi cạnh để cắt vuông hay chữ nhật đều không mất sản phẩm.
- **Không** có chữ, logo, nhãn hiệu thật hay khuôn mặt người. Nhãn chai lọ để trơn hoặc chỉ có mảng màu.
- Không có nước hoa, vì Nhà Thơm không bán nước hoa.
- Tông màu thống nhất giữa các ảnh: ấm, trung tính, độ tương phản vừa.

## 6 ảnh sản phẩm (tỉ lệ 1:1, gốc 1200×1200)

Dùng cho: thẻ Shopping, lưới Performance Max, ảnh trong quảng cáo tìm kiếm, ảnh cửa hàng ứng dụng và trang đích.

| Mã | Sản phẩm | Mô tả để tạo ảnh bằng AI |
|---|---|---|
| `nen-thom` | Nến thơm nắp gỗ 200g | Studio product photo of a 200g soy candle in a frosted glass jar with a round light-wood lid resting beside it, candle unlit, plain cream label with no text, centered, straight-on eye-level view, soft diffused daylight, beige seamless background, gentle shadow, no text, no logo |
| `tinh-dau` | Tinh dầu oải hương 30ml | Studio product photo of a 30ml amber glass dropper bottle with black rubber bulb, plain kraft label with no text, one small sprig of dried lavender lying beside it, centered, straight-on, soft daylight, warm white background, no text, no logo |
| `kem-duong` | Kem dưỡng ẩm 50ml | Studio product photo of a 50ml white matte cosmetic jar with a black screw lid, blank label, centered, straight-on eye-level, soft diffused light, beige background, subtle reflection, no text, no logo |
| `khuech-tan` | Lọ khuếch tán que gỗ 150ml | Studio product photo of a 150ml clear glass reed diffuser bottle with pale golden oil and 7 natural rattan reeds fanning upward, blank label, centered, straight-on, soft daylight, cream background, no text, no logo |
| `sua-tam` | Sữa tắm 500ml | Studio product photo of a 500ml olive-green plastic pump bottle of body wash, matte finish, blank label, centered, straight-on, soft light, light beige background, no text, no logo |
| `khan-cotton` | Khăn cotton tổ ong | Studio product photo of a neatly folded off-white waffle-weave cotton towel, stacked two high, visible honeycomb texture, centered, straight-on slightly above, soft daylight, light wood surface, beige wall, no text, no logo |

## Ảnh cảnh "Góc thư giãn cuối ngày" (3 tỉ lệ)

Cùng một bối cảnh, chụp 3 khung khác nhau:
- trên một kệ hoặc bàn gỗ sáng: nến đang cháy, lọ khuếch tán, lọ tinh dầu và khăn gấp;
- ánh chiều vàng ấm từ cửa sổ bên cạnh;
- không có người.

| Mã | Tỉ lệ / kích thước | Dùng cho | Mô tả để tạo ảnh bằng AI |
|---|---|---|---|
| `scene-191` | 1.91:1, 1200×628 | Banner hiển thị, bài Demand Gen, ô bảng tin PMax | Cozy evening relaxation corner on a light oak shelf: a lit soy candle, a reed diffuser, a small amber dropper bottle and a folded waffle towel arranged left to right with space on both sides, warm golden window light from the left, beige wall, calm minimal Scandinavian style, photographic, no people, no text, no logo |
| `scene-45` | 4:5, 960×1200 | Bài dọc Demand Gen, thẻ Discover, mẫu 4:5 | Same relaxation corner shot vertically: light oak side table with a lit candle and reed diffuser in the lower half, folded towel on a stool, soft warm evening window light, plenty of calm beige wall above, photographic, no people, no text, no logo |
| `scene-916` | 9:16, 1080×1920 | Shorts, story, video dọc | Same relaxation corner shot as a tall vertical frame: the products sit in the middle third, with space above and below for app buttons, warm golden hour light, beige and light wood tones, photographic, no people, no text, no logo |

## Khung hình video (16:9, 1920×1080)

| Mã | Dùng cho | Mô tả để tạo ảnh bằng AI |
|---|---|---|
| `video-169` | Trình phát video (bỏ qua được, 6 giây, trong nguồn cấp), Masthead, ô video PMax, thẻ hero | Close-up of a hand pouring golden fragrance oil from a small amber bottle into a clear glass reed diffuser on a light oak table, a lit candle softly out of focus in the background, warm window light, shallow depth of field, cinematic 16:9 video still, hand only (no face), no text, no logo |

## Ảnh dịch vụ (3:2, 1200×800)

| Mã | Dùng cho | Mô tả để tạo ảnh bằng AI |
|---|---|---|
| `service-ac` | Ví dụ quảng cáo dịch vụ tại nhà: nút gọi, quảng cáo gọi điện, trang đích dịch vụ | A technician in a plain navy uniform cleaning an indoor split air conditioner unit mounted on a white wall, seen from behind and the side, hands and back only, no face, tools on a small step ladder, bright clean apartment, natural daylight, photographic, no text, no logo on uniform |

## Chỗ dùng trên trang

Trong mã, ảnh được gọi qua các mã ngắn tại `scripts/google-ads-lp/visuals.mjs` → `PICTURES`:

| Mã ngắn | Tên ảnh |
|---|---|
| `s1` | tinh-dau |
| `s2` | kem-duong |
| `s3` | khuech-tan |
| `s4` | sua-tam |
| `s5` | khan-cotton |
| `s6` | nen-thom |
| `s-shelf` | scene-191 |
| `s-desk` | scene-45 |
| `s-tall` | scene-916 |
| `s-hero` | video-169 |
| `svc` | service-ac |

Mọi ảnh nằm trong khung tỉ lệ cố định và được cắt bằng `object-fit: cover`, nên ảnh gốc hơi lệch tỉ lệ vẫn không bị méo.

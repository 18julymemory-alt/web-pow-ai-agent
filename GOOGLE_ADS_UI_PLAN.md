# Plan cải thiện giao diện 3 trang Google Ads

Mục tiêu: người đọc **nhìn là hiểu**, không phải đọc hết. Giảm cảm giác rối và "toàn chữ", tăng hình ảnh, màu dễ tiếp cận, có chiều sâu 3D nhưng vẫn nhẹ. **Không xóa nội dung** — chỉ đổi cách bày và cách lộ ra.

---

## 1. Chẩn đoán (đo từ code hiện tại)

| Trang | Số chữ | `<p>` | Tiêu đề nhỏ | SVG | Ảnh |
|---|---|---|---|---|---|
| 1. Cách chạy & định dạng | 9.048 | 232 | 199 | 6 | 0 |
| 2. Chọn cách chạy | 2.100 | 27 | 23 | 0 | 0 |
| 3. Chi phí & hiệu quả | 3.876 | 87 | 28 | 1 | 0 |

Bốn vấn đề chính:

1. **Chữ hiện ra cùng lúc quá nhiều.** Trang 1 có 199 tiêu đề nhỏ và 232 đoạn văn mở sẵn. Mắt không biết đọc gì trước.
2. **Thiếu hình.** Trang 2 và 3 gần như chỉ có thẻ chữ. Mọi khối đều là "tiêu đề + đoạn văn + gạch đầu dòng".
3. **Màu quá phẳng và tối đều.** Nền, thẻ và viền gần cùng một sắc độ, nên không có điểm dừng mắt. Màu accent chỉ xuất hiện ở chữ nhỏ và viền mảnh nên gần như không thấy.
4. **Thiếu nhịp.** Các section cùng một cấu trúc lặp lại, không có khối lớn/nhỏ xen kẽ, không có khoảng thở.

---

## 2. Bốn nguyên tắc cho bản mới

1. **Một màn hình, một ý, một hình.** Mỗi khối có: 1 tiêu đề, tối đa 40 từ, 1 hình lớn. Phần còn lại nằm sau "Xem chi tiết".
2. **Hình dẫn trước, chữ đỡ sau.** Mỗi khái niệm phải có một hình đại diện: mockup giao diện, sơ đồ, biểu đồ hoặc ảnh.
3. **Màu có việc để làm.** Mỗi loại chiến dịch một màu, mỗi trạng thái một màu (tốt / cân nhắc / cần sửa). Màu phải có vùng nền, không chỉ nằm ở viền.
4. **Chiều sâu thay cho đường kẻ.** Phân tách khối bằng lớp nền, đổ bóng và phối cảnh, thay vì viền mảnh và gạch ngang.

---

## 3. Màu: dễ tiếp cận hơn nhưng vẫn là POWAI

Vẫn giữ chủ đề vũ trụ tối của trang chủ, nhưng tách rõ thành 4 tầng thay vì một màu tối đều:

| Tầng | Màu | Dùng cho |
|---|---|---|
| Nền sâu | `#02050c` | Hero, khoảng nghỉ giữa các chương |
| Nền section | `#060E1A` | Nền chung các section nội dung |
| Thẻ | `#0D1B2B` → `#12243A` (gradient nhẹ) | Thẻ, panel |
| Thẻ nổi | `#16293F` + bóng `0 24px 70px #0006` | Thẻ đang chọn, thẻ chính |

Thêm hai thứ đang thiếu:

- **Vùng sáng cho mô phỏng.** Mọi mockup giao diện Google đặt trên nền sáng `#EEF3F8` trong khung tối. Đây là điểm nghỉ mắt và cũng đúng với thực tế (Google thật nền trắng). Trên mỗi trang nên có 2–4 vùng sáng như vậy.
- **Màu có vùng nền.** Mỗi accent dùng 3 mức: chữ (100%), nền nhạt (12%), viền (28%). Ví dụ Search `#88e4ff` → nền `#88e4ff1f`.

**Màu theo chiến dịch** (giữ như hiện tại, lấy từ trang chủ): Search `#88e4ff`, PMax `#c0a2ff`, Shopping `#85e1c1`, Demand Gen `#ffbd80`, Video `#ff9bc1`, App `#e0cd9b`.

**Màu trạng thái** (dùng thống nhất cả 3 trang): tốt `#8ce0b4`, cân nhắc `#e0cd9b`, cần sửa `#ff9b9b`.

**Chữ:** thân bài lên 16px, giãn dòng 1.85, mỗi dòng tối đa 68 ký tự. Chữ phụ `#b8cbd9`. Bỏ toàn bộ chữ dưới 11px trừ nhãn số thứ tự.

---

## 4. Hệ hình ảnh: 4 lớp

Đây là phần quan trọng nhất, vì hiện tại gần như không có.

**Lớp 1 — Mockup giao diện (đã có ở trang 1, cần mở rộng).**
Màn hình Google Tìm kiếm, YouTube, Shorts, Shopping, Maps, Gmail, Play Store, trang đích, màn hình Google Ads. Đặt trên nền sáng, khung thiết bị nghiêng nhẹ, phần đang nói tới được làm nổi bằng viền phát sáng màu accent.

**Lớp 2 — Sơ đồ giải thích (SVG vẽ tay, cần làm mới).**
Mỗi khái niệm trừu tượng cần một sơ đồ thay cho đoạn văn:
- Hành trình 5 bước: đường cong phát sáng, mỗi chặng có icon và mini-mockup, không phải 5 hộp chữ như hiện nay.
- Đấu giá: 3 dòng đầu vào chảy vào khối Ad Rank, ra bục xếp hạng.
- Đối sánh từ khóa: vòng tròn đồng tâm.
- Ngân sách: phễu từ chi phí → hiển thị → nhấp → liên hệ → khách.
- Đo lường: đường ống từ nhấp đến doanh thu, có chốt kiểm tra.

**Lớp 3 — Icon bộ nhất quán.**
Một bộ icon nét mảnh 1.5px, cùng khung 24px, cho khoảng 30 khái niệm (từ khóa, ngân sách, chuyển đổi, hotline, CRM…). Dùng lại style icon trong `solutions.css` của trang chủ để đồng bộ.

**Lớp 4 — Ảnh nền có chất.**
Dự án đã có sẵn ảnh render trong `dist/assets/product-photos/` (ads.png, data.png, ai.png…, mỗi ảnh khoảng 2 MB). Cắt, chuyển sang WebP khoảng 150–250 KB, phủ gradient tối và dùng làm nền hero của từng trang cùng vài khối lớn. Không dùng ảnh stock.

**Chuyển động 3D (nhẹ, chỉ CSS):**
- Hero: chồng thẻ nổi theo chuột, đã có, giữ.
- Quỹ đạo 6 loại chiến dịch: giữ.
- Thẻ: nghiêng nhẹ khi rê chuột, nổi lên khi chọn.
- Sơ đồ: các lớp trượt theo cuộn (parallax 2–3 lớp).
- Không dùng Three.js, không thêm thư viện. Tắt hết khi máy bật chế độ giảm chuyển động hoặc khi khối ra khỏi màn hình.

---

## 5. Kế hoạch cho từng trang

### Trang 1 — Cách chạy & định dạng (đang nặng nhất)

Vấn đề: một trang chứa toàn bộ 6 chiến dịch × 6 chương, mở sẵn tất cả.

- **Mỗi lần chỉ mở một chương.** Panel chiến dịch hiển thị chương "Trông như thế nào" trước. Các chương sau hiện dưới dạng thẻ lớn có hình đại diện, bấm mới mở. Chữ hiện mặc định giảm từ khoảng 9.000 xuống còn khoảng 1.200 mỗi lượt xem.
- **Thẻ chọn chiến dịch** (ảnh 2 bạn gửi): bỏ đoạn mô tả thứ hai ra khỏi thẻ, thay bằng **mini-mockup có màu** của chính loại đó. Thẻ còn: số thứ tự, tên, một dòng, hình. Đoạn "Khách thường tìm dịch vụ…" chuyển vào panel bên dưới.
- **Chuỗi "Từ nhu cầu đến chuyển đổi"** (ảnh 3): thay 5 hộp chữ bằng sơ đồ hành trình có hình, mỗi chặng có mini-mockup tương ứng, đường nối phát sáng theo màu chiến dịch.
- **Khối "Bạn đưa vào / Bạn nhận lại"**: làm thành sơ đồ hai chiều có icon thay cho hai hộp gạch đầu dòng.
- **Bảng thông số file**: giữ ô tỷ lệ trực quan, thêm ảnh mẫu mờ bên trong khung.

### Trang 2 — Chọn cách chạy (đang thiếu hình nhất: 0 hình)

- **Bộ chọn 3 câu hỏi** làm nhân vật chính: mỗi lựa chọn là một thẻ có icon lớn; chọn xong hiện kết quả gợi ý kèm mockup của loại chiến dịch phù hợp.
- **8 mục tiêu kinh doanh**: lưới thẻ có icon và màu riêng, không phải danh sách chữ.
- **Khách mới / khách cũ**: sơ đồ hai vòng tròn giao nhau, có hình người và mốc thời gian.
- **Tệp đối tượng**: sơ đồ "tín hiệu → nhóm khách", mỗi tín hiệu một icon.
- **Khu vực phục vụ**: bản đồ đơn giản hóa với vùng phát sáng, thay cho ô chọn chữ.

### Trang 3 — Chi phí & hiệu quả (nhiều bảng chữ dày)

- **Cấu trúc chi phí**: biểu đồ cột xếp chồng (tiền Google / phí dịch vụ / VAT / nội dung), di chuột vào từng phần hiện giải thích.
- **Công cụ ước tính**: kết quả hiện bằng số lớn kiểu bảng số liệu trang chủ, kèm phễu minh họa thay đổi theo số nhập.
- **Lưới 6 công cụ đo lường** (ảnh 4): hiện tại mỗi thẻ có 4 khối chữ. Rút còn tên + một dòng + icon; phần "Cần khi / Không bắt buộc / Đầu vào → Đầu ra" chuyển vào phần mở rộng "Chi tiết kỹ thuật".
- **13 mục cần có trước khi chạy**: checklist tick được, có vòng tiến độ, chia 3 nhóm.
- **15 câu hỏi**: accordion, chia nhóm theo chủ đề, mở sẵn 3 câu đầu.
- **Lộ trình POWAI**: timeline dọc có mốc và hình, thay cho bảng.

---

## 6. Thứ tự thực hiện

| Giai đoạn | Việc | Kết quả kiểm tra được |
|---|---|---|
| 1 | Cập nhật `google-ads-lp.css`: 4 tầng nền, vùng sáng, accent có nền, cỡ chữ mới | Chụp 3 trang so sánh trước/sau |
| 2 | Dựng lớp hình: bộ icon + 6 sơ đồ SVG + tối ưu ảnh hero sang WebP | Thư mục `dist/assets/ga-lp/`, mỗi ảnh dưới 250 KB |
| 3 | Trang 1: gom chương, làm lại thẻ chiến dịch và sơ đồ hành trình | Chữ hiện mặc định giảm còn khoảng 1.200 từ mỗi lượt xem |
| 4 | Trang 2: bộ chọn có hình, sơ đồ đối tượng | Trang có ít nhất 6 hình |
| 5 | Trang 3: biểu đồ chi phí, phễu, rút gọn lưới đo lường | Trang có ít nhất 5 hình, mỗi thẻ tối đa 40 từ |
| 6 | Kiểm tra: 1440/768/390/320px, tốc độ, test Playwright | Không cuộn ngang, không lỗi console, trang dưới 400 KB |

**Chuẩn nghiệm thu chung cho cả 3 trang:**
- Mỗi màn hình cuộn qua đều có ít nhất một hình.
- Mỗi khối tối đa 40 từ hiện mặc định.
- Tỷ lệ tương phản chữ trên nền ít nhất 4.5:1.
- Tổng dung lượng mỗi trang dưới 400 KB, không có thư viện ngoài.

---


## 7. Quyết định đã chốt

1. **Tông màu:** giữ nền tối như trang chủ, chỉ dùng vùng sáng cho mô phỏng và vài khối dữ liệu. Không làm section sáng toàn phần.
2. **Ảnh:** ảnh nhìn như thật nhưng **không chứa logo, wordmark hay tên thương hiệu**. Hai nguồn:
   - Minh họa tự dựng bằng SVG/CSS (mockup, sơ đồ, icon) — làm được ngay trong code.
   - Ảnh render khung cảnh cho hero: dùng lại bộ ảnh sẵn có trong `dist/assets/product-photos/`, hoặc Huy tạo mới bằng công cụ AI theo mô tả ở mục 8.
3. **Nội dung kỹ thuật sâu:** để trong mục mở rộng ngay trên trang, không tách sang Blog.

**Lưu ý về nhãn hiệu:** các mockup hiện tại đang vẽ lại logo Google (chữ G-o-o-g-l-e nhiều màu, logo Google Ads). Nên thay bằng dạng trung tính: thanh tìm kiếm không có wordmark, nhãn "Được tài trợ", khung trình duyệt trơn. Vừa tránh rủi ro nhãn hiệu, vừa khiến trang trông là sản phẩm của POWAI chứ không phải ảnh chụp lại của Google. Tên loại chiến dịch (Search, Performance Max, Shopping…) vẫn viết bình thường vì đó là tên gọi kỹ thuật.

---

## 8. Danh sách hình cần có

### 8.1 Dựng bằng SVG/CSS trong code (Claude Code làm)

| Mã | Hình | Dùng ở |
|---|---|---|
| M1 | Màn hình kết quả tìm kiếm (4 biến thể: văn bản, liên kết trang, ảnh, nút gọi) | Trang 1 · Search |
| M2 | Lưới nhiều bề mặt: tìm kiếm, mua sắm, video, hộp thư | Trang 1 · PMax |
| M3 | Hàng thẻ sản phẩm có ảnh, giá, cửa hàng | Trang 1 · Shopping |
| M4 | Nguồn cấp khám phá trên điện thoại: ảnh đơn, băng chuyền, video | Trang 1 · Demand Gen |
| M5 | Trình phát video: bỏ qua sau 5 giây, không bỏ qua, video dọc | Trang 1 · Video |
| M6 | Điện thoại: trang ứng dụng, video trải nghiệm, ảnh tính năng | Trang 1 · App |
| S1 | Hành trình 5 chặng có mini-mockup ở mỗi chặng | Trang 1 |
| S2 | Sơ đồ đấu giá: 3 đầu vào → khối thứ hạng → bục vị trí | Trang 1 |
| S3 | Vòng tròn đồng tâm cho kiểu đối sánh | Trang 1 |
| S4 | Sơ đồ "Bạn đưa vào → Bạn nhận lại" | Trang 1, 2 |
| S5 | Hai vòng tròn giao nhau: khách mới / khách đã biết | Trang 2 |
| S6 | Sơ đồ tín hiệu → nhóm khách | Trang 2 |
| S7 | Bản đồ khu vực phục vụ, vùng phát sáng | Trang 2 |
| S8 | Biểu đồ cột xếp chồng cấu trúc chi phí | Trang 3 |
| S9 | Phễu ngân sách → hiển thị → nhấp → liên hệ → khách | Trang 3 |
| S10 | Đường ống đo lường từ nhấp đến doanh thu | Trang 3 |
| I1 | Bộ icon nét mảnh, khung 24px, khoảng 30 khái niệm | Cả 3 trang |

### 8.2 Ảnh render cho hero (Huy tạo bằng AI hoặc dùng ảnh sẵn có)

Yêu cầu chung: tông tối xanh đêm hợp nền `#02050c`, ánh sáng xanh cyan, **không chữ, không logo, không mặt người rõ**, tỷ lệ 16:9, xuất WebP dưới 250 KB.

| Mã | Trang | Mô tả để tạo ảnh |
|---|---|---|
| H1 | Trang 1 | Nhiều màn hình phẳng trôi lơ lửng trong không gian tối, sắp xếp theo lớp, ánh sáng xanh cyan hắt từ dưới, hậu cảnh là các hạt sáng mờ như sao |
| H2 | Trang 2 | Nhiều đường sáng từ nhiều hướng hội tụ về một điểm sáng duy nhất trên nền tối, kiểu sơ đồ luồng ba chiều |
| H3 | Trang 3 | Các khối cột phát sáng cao thấp như biểu đồ ba chiều trôi trong không gian tối, có phản chiếu mờ bên dưới |
| H4 | Dùng chung | Bề mặt lưới phối cảnh trải ra xa, mờ dần vào nền tối, dùng làm nền cho các khối dữ liệu |

Nếu chưa có ảnh, Claude Code dùng gradient và lưới CSS thay tạm, đặt đúng chỗ để sau này thay ảnh vào không phải sửa bố cục.

---

## 9. Prompt dán vào Claude Code

> Đọc `GOOGLE_ADS_UI_PLAN.md` ở thư mục gốc. Cải thiện giao diện 3 trang Google Ads đã dựng (`/dich-vu/quang-cao-da-kenh/google-ads/`, `/chon-cach-chay/`, `/chi-phi-hieu-qua/`). **Giữ nguyên toàn bộ nội dung chữ**, chỉ đổi cách trình bày, cách lộ nội dung và bổ sung hình.
>
> Vấn đề cần sửa: trang 1 đang mở sẵn 199 tiêu đề nhỏ và 232 đoạn văn nên rất rối; trang 2 có 0 hình, trang 3 có 1 hình; nền, thẻ và viền cùng một sắc độ nên nhìn phẳng.
>
> Làm theo thứ tự ở mục 6:
> 1. **CSS:** cập nhật `dist/google-ads-lp.css` theo mục 3 — 4 tầng nền, vùng sáng `#EEF3F8` cho mô phỏng, mỗi accent dùng 3 mức (chữ / nền 12% / viền 28%), thân bài 16px line-height 1.85, mỗi dòng tối đa 68 ký tự, bỏ chữ dưới 11px. Giữ nền tối, không làm section sáng toàn phần.
> 2. **Hình:** dựng các hình ở mục 8.1 bằng SVG/CSS trong `scripts/google-ads-lp/visuals.mjs`, đặt ảnh hero vào `dist/assets/ga-lp/` (chưa có ảnh thì dùng gradient + lưới CSS thay tạm). **Không vẽ lại logo Google hay bất kỳ wordmark thương hiệu nào** — thanh tìm kiếm, khung trình duyệt, nhãn "Được tài trợ" ở dạng trung tính. Thay cả các logo Google đang có trong code hiện tại.
> 3. **Trang 1:** mỗi panel chiến dịch chỉ mở sẵn chương "Trông như thế nào"; các chương còn lại là thẻ lớn có hình đại diện, bấm mới mở. Thẻ chọn chiến dịch bỏ dòng mô tả thứ hai, thay bằng mini-mockup có màu. Chuỗi 5 bước thành sơ đồ S1. Khối "Bạn đưa vào / Bạn nhận lại" thành sơ đồ S4.
> 4. **Trang 2:** bộ chọn 3 câu hỏi làm nhân vật chính, mỗi lựa chọn là thẻ có icon lớn, kết quả kèm mockup. Thêm S5, S6, S7. Trang phải có ít nhất 6 hình.
> 5. **Trang 3:** thêm S8, S9, S10. Lưới 6 công cụ đo lường rút còn tên + 1 dòng + icon, phần còn lại vào mục mở rộng "Chi tiết kỹ thuật". 13 mục kiểm tra thành checklist có vòng tiến độ. 15 câu hỏi chia nhóm, mở sẵn 3 câu.
> 6. **Kiểm tra:** 1440/768/390/320px không cuộn ngang; mỗi màn hình cuộn qua có ít nhất một hình; mỗi khối tối đa 40 từ hiện mặc định; tương phản tối thiểu 4.5:1; mỗi trang dưới 400 KB; không thêm thư viện; test Playwright không lỗi console.
>
> Hiệu ứng 3D chỉ dùng CSS (`perspective`, `transform`), dừng khi khối ra khỏi màn hình và khi bật `prefers-reduced-motion`. Sau mỗi bước 3, 4, 5 thì build và chụp ảnh desktop 1440 + mobile 390 cho tôi duyệt trước khi sang bước sau. Không sửa trang chủ, `style.css`, menu hay các trang dịch vụ khác.

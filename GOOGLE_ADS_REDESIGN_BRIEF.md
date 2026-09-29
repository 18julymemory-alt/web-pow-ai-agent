# Brief làm lại GIAO DIỆN trang Google Ads (POWAI), bản 3

**Nguyên tắc:**
1. **Giữ nguyên toàn bộ nội dung** hiện có, chỉ làm lại cách trình bày.
2. **Màu và cỡ chữ bám sát trang chủ** (chủ đề vũ trụ tối, cyan, Be Vietnam Pro). Mọi giá trị ở mục 2 được lấy trực tiếp từ CSS của trang chủ: `style.css`, `orbital.css`, `cinematic.css`, `solutions.css`, `journey-polish.css`, `navigation.css`.
3. **Trình bày đẹp và rõ hơn**, phân biệt được từng loại nội dung, có hiệu ứng 2D/3D nhưng nhẹ.

**File `prototypes/google-ads-formats-v2.html`:** chỉ dùng để tham khảo **bố cục, component và tương tác**. **KHÔNG** dùng màu, nền sáng hay cỡ chữ của file đó, mà thay toàn bộ bằng hệ thống ở mục 2.

Phạm vi: `/dich-vu/quang-cao-da-kenh/google-ads/`, tách thành 3 landing page:
1. `/google-ads/`: Cách chạy & định dạng
2. `/google-ads/chon-cach-chay/`: Chọn cách chạy
3. `/google-ads/chi-phi-hieu-qua/`: Chi phí & hiệu quả

Không sửa trang chủ, header/menu (`navigation.js`, `navigation.css`), footer và các trang dịch vụ khác.

---

## 1. Vấn đề giao diện hiện tại

- **Mọi khối đều trông giống nhau:** cùng thẻ tối, cùng nhãn in hoa, nên không phân biệt được đâu là mô phỏng, giải thích, lưu ý hay checklist.
- **Mỗi loại chiến dịch có 10–12 accordion** xếp liền nhau, rất đơn điệu.
- **Cỡ chữ và màu không theo trang chủ:** có chỗ 8px. Chữ phụ `#8A9BAC` xám hơn trang chủ (trang chủ dùng `#b8cbd9`/`#bed0df`). Cyan `#65E6F5` và `#a8e9f7` cũng lệch so với `#72eaff`.
- **4 lớp CSS chồng nhau** (`google-ads-guide`, `-experience`, `-showroom`, `-luxury`), khoảng 64 chỗ `!important`, biến màu khai báo đè nhau.
- **Renderer ghép HTML** bằng `indexOf`/regex từ `google-ads-page.mjs`, dễ gãy.
- **Nút "Gửi yêu cầu tư vấn" đang bị `disabled`.**

## 2. Hệ thống thiết kế: lấy từ trang chủ

### 2.1 Màu (đặt trên `:root` của `google-ads-lp.css`)

```css
:root{
  /* nền – theo style.css / orbital.css */
  --bg:#02050c;            /* body trang chủ */
  --bg-deep:#010207;
  --bg-hero:linear-gradient(90deg,#020714e0,#02071388 42%,transparent 90%);
  --section-veil:linear-gradient(180deg,#030a14bd,#030a149c 65%,#030a1470);
  /* bề mặt – theo journey-polish.css */
  --surface:#081522eb;     /* thẻ/workbench, dùng kèm backdrop-filter:blur(16px) */
  --surface-2:#061321b3;   /* dải metrics */
  --surface-3:#041326cc;   /* form brief */
  --card-grad:linear-gradient(140deg,#192e40fa,#07121efa); /* service card khi hover */
  --edge:#a9c9df29;        /* viền chuẩn */
  --edge-2:#a1bad126;
  --edge-strong:#83d9fb44;
  /* chữ */
  --text:#eff8ff;          /* chữ chính */
  --text-2:#bed0df;        /* description */
  --text-3:#b8cbd9;        /* thân thẻ */
  --text-4:#a2bbce;        /* phụ, caption */
  --muted:#7493a8;         /* nhãn mờ */
  /* nhấn */
  --cyan:#72eaff;          /* màu thương hiệu, em trong tiêu đề */
  --cyan-2:#8be8fc;        /* link active trong menu */
  --btn:#9aebff; --btn-hover:#d3f8ff; --btn-text:#031b2b; --btn-border:#b8f2ff;
  --ads:#ffbd80;           /* accent nhóm "Quảng cáo đa kênh" trên trang chủ */
}
```

**Màu riêng cho từng loại chiến dịch:** lấy đúng bảng accent của các chương trên trang chủ, không dùng màu Google gốc:

| Chiến dịch | Màu | Nguồn trên trang chủ |
|---|---|---|
| Search | `#88e4ff` | accent mặc định của chapter |
| Performance Max | `#c0a2ff` | AI & Tự động hóa |
| Shopping | `#85e1c1` | CRM & Dữ liệu |
| Demand Gen | `#ffbd80` | Quảng cáo đa kênh |
| Video / YouTube | `#ff9bc1` | Social & Nội dung |
| App | `#e0cd9b` | Tư vấn chiến lược |

Màu này đặt vào biến `--accent` của panel, giống cách trang chủ dùng `--accent` và `--service-accent`. Số chương, eyebrow, viền active, vạch trên thẻ và vùng highlight đều lấy từ `--accent`.

Màu trạng thái trên nền tối (cho báo cáo cụm tìm kiếm và vấn đề/xử lý): giữ `#8ce0b4` (xanh, có sẵn ở `.health-checks b`), cân nhắc `#e0cd9b`, loại `#ff9b9b`. Nền là chính màu đó ở độ đậm 10–14%, ví dụ `#8ce0b41a`.

**Mô phỏng giao diện Google** (SERP, YouTube, Shopping, điện thoại) giữ nền trắng giống thật, tương tự `.website-preview` của trang chủ (nền sáng đặt trong khung tối). Đây là chỗ duy nhất dùng nền sáng.

### 2.2 Chữ: theo trang chủ (desktop → mobile ≤760px)

Font: **Be Vietnam Pro** 400/500/600/700/800, `font-synthesis:none`, `text-wrap:balance` cho tiêu đề và `pretty` cho đoạn văn.

| Vai trò | Desktop | Mobile | Thuộc tính khác | Nguồn |
|---|---|---|---|---|
| H1 hero | `clamp(35px,3.7vw,62px)` | 36px | weight 600, line-height 1.16, letter-spacing −1.8px, `em` màu cyan | `orbital.css`, `journey-polish.css` |
| H2 section | `clamp(28px,3vw,46px)` | 29px | weight 500, lh 1.22, ls −1.5px | `orbital.css` |
| H2 section lớn (mở đầu trang) | `clamp(32px,3.5vw,50px)` | 32px | lh 1.16, ls −1.7px | `#universe-map h2` |
| H3 panel/workbench | 24px | 20px | weight 500, lh 1.4, ls −.5px | `.service-workbench h3` |
| H3 panel chiến dịch (Search, PMax…) | 28px | 22px | weight 500, lh 1.4 | `.layout-ads h3` |
| Tiêu đề thẻ | 18–20px | 18px | weight 500–600, ls −.3px | `.service-links strong`, `.mission-pillars h3` |
| Eyebrow / kicker | 11px | 10px | uppercase, ls 3px, weight 500, màu `--accent`, gạch 30×1px phía trước | `.eyebrow` |
| Description (dưới H2) | 15–16px | 14px | lh 1.8–1.85, `--text-2`, max-width 600–660px | `.description` |
| Thân panel | 14px | 13px | lh 1.8–1.95, `--text-3` | `.service-detail` |
| Thân thẻ | 13px | 13px | lh 1.7–1.85, `#b3c5d5` / `#b4c8d8` | `.service-summary`, `.mission-pillars p` |
| Caption, lưu ý | 12px | 11px | lh 1.8, `--text-4` | `.knowledge-strip p`, `.art-note` |
| Nhãn nhỏ (số thứ tự, meta) | 9–10px | 9px | ls 1.5–2px, `--muted` hoặc `--accent` | `.service-number`, `.service-meta` |
| Số liệu lớn | `clamp(30px,3.8vw,56px)` | 27px | ls −2px, `#d8edfa` | `.metrics strong` |

Nhãn 9–10px chỉ dùng cho số thứ tự và meta, không dùng cho câu cần đọc. Nội dung giải thích tối thiểu 13px (bằng thẻ trang chủ).

### 2.3 Component: theo trang chủ

- **Nút chính:** nền `--btn`, chữ `--btn-text`, 14px weight 600, padding 17px 24px, **bo góc 3px**, viền `--btn-border`, `box-shadow:0 0 30px #36caff22` (hover `0 0 40px #36caff66`). Mobile: 12px, padding 14px 18px.
- **Nút phụ:** giống `.contact`: viền `#a6e8ff55`, nền `#0a1d2955`, blur 10px, 13px, bo 3px, mũi tên màu cyan.
- **Text link:** 14px, `border-bottom:1px solid #bddeed66`.
- **Tag/chip/lựa chọn:** giống `.tags button`: 13px, padding 10px 16px, nền `#061526b3`, viền `#c1dfed55`, bo 4px. Trạng thái active: nền `#d3f2ff`, chữ `#052036`.
- **Thẻ:** giống service card: viền `--edge-2`, bo 12px, nền gradient tối, **vạch 1px ở mép trên** `linear-gradient(90deg,var(--accent),transparent)`. Hover: `translateY(-4px)`, viền `--accent`, nền `--card-grad`.
- **Workbench** (danh sách bên trái + nội dung bên phải): giống `.service-workbench`: cột 240px, viền `--edge`, bo 14px, `--surface` kèm blur 16px, nút trong danh sách có số `01..` 9px. Dùng cho chương "Trông như thế nào" và bộ chọn giá thầu.
- **Lưu ý / ghi chú:** giống `.knowledge-strip`: viền trái 2px `#7ccfe8`, nền `#071421b3`, nhãn 9px ls 1.5px. Với cảnh báo, viền trái đổi sang `#e0cd9b`.
- **Dải số liệu:** giống `.metrics`: viền trên/dưới `--edge`, nền `--surface-2`, các cột ngăn bằng `border-left`.
- **Quy trình:** giống `.beacons` hoặc `.ecosystem-flow`: bước có nhãn `01` màu accent và mũi tên `→` màu `#5b899e`.
- **Accordion (chỉ dùng cho FAQ):** giống `.case-windows details`: viền `--edge`, bo 9px, nền `#081522ed`, 13px. Khi mở, viền đổi sang `--accent` ở độ đậm 40%.
- **Header:** dùng `.pow-header` thật (`navigation.js`), không tự dựng.
- **Nhịp trang:** như chapter trang chủ. Mỗi section có eyebrow → H2 (có `em` cyan) → description, căn giữa hoặc căn trái giống hero. Khoảng cách giữa các section 110–140px.

### 2.4 Nền và hiệu ứng (nhẹ, gợi lại không khí trang chủ)

- Trang chủ dùng Three.js (Trái Đất, hệ Mặt Trời). **Trang Google Ads KHÔNG load Three.js.** Thay vào đó:
  - Nền `--bg` kèm trường sao bằng CSS (`radial-gradient` lặp, 2–3 lớp, lớp xa có parallax nhẹ khi cuộn).
  - Vài quầng tinh vân `radial-gradient` ở vị trí cố định, màu `#123b60` / accent ở độ đậm 15–25%.
  - Có thể thêm đường chân trời phát sáng cong ở hero (một ellipse gradient cyan mờ), gợi lại hình Trái Đất trên trang chủ.
- **Hiệu ứng 3D chỉ dùng CSS** (`perspective`, `transform`):
  - Chồng thẻ quảng cáo nổi ở hero.
  - Quỹ đạo hệ sinh thái 6 loại chiến dịch: dựng giống "Sun + 8 planets" của trang chủ, bản giả 3D bằng rAF với 6 node, có nhãn giống `.world-label` (viền `#86cef14d`, nền `#031020c9`, 12px, bo 3px).
  - Thiết bị mô phỏng nghiêng 3D, về thẳng khi hover.
  - Thẻ nghiêng theo chuột (chỉ trên thiết bị có hover).
- Glow và phát sáng lấy từ trang chủ: `box-shadow:0 0 42px #53d1ea26`, progress bar `box-shadow:0 0 15px var(--cyan)`.
- **Hiệu năng:** chỉ animate `transform`/`opacity`. Dừng rAF khi phần tử ra khỏi màn hình (IntersectionObserver) và khi `prefers-reduced-motion`. Chỉ render mockup của loại chiến dịch đang chọn. Không thêm thư viện.

## 3. Phân biệt từng loại nội dung (bố cục, xem file prototype)

| Loại nội dung | Cách trình bày (dùng component ở 2.3, màu ở 2.1) |
|---|---|
| Mô phỏng quảng cáo | Workbench: danh sách định dạng bên trái (mở ra 3 dòng Xuất hiện ở đâu / Khách thấy gì / Cần chuẩn bị); bên phải là "sân khấu" tối có thiết bị nghiêng 3D, phần thay đổi theo định dạng có viền glow màu accent |
| Cách vận hành | Lưới service card có icon, thẻ đầu tiên rộng gấp đôi |
| Quy trình (Từ nội dung quảng cáo đến kết quả) | Pipeline kiểu beacons, mỗi bước có số accent |
| File cần chuẩn bị | Thẻ có hình minh họa đúng tỷ lệ (1:1, 1.91:1, 9:16…) viền accent phát sáng, hoặc thanh đếm ký tự |
| Kiểu đối sánh | Vòng tròn đồng tâm (rộng / cụm từ / chính xác) kèm truy vấn ví dụ và bật/tắt từ phủ định |
| Thử RSA | Workbench: ô nhập có đếm ký tự bên trái, bản xem trước SERP trắng bên phải |
| Báo cáo cụm tìm kiếm | 3 thẻ Giữ / Cân nhắc / Loại theo màu trạng thái |
| Đấu giá / Ad Rank | Sơ đồ SVG: 3 đầu vào → khối AD RANK phát sáng → bục vị trí |
| Chiến lược giá thầu | Workbench: danh sách bên trái; bên phải là "Bạn đưa vào → Google tối ưu", Cần có, Lưu ý, Ví dụ |
| Hành trình khách (Search) | 4 tab kèm màn hình mô phỏng và nút "Bước tiếp" |
| Dùng khi nào / Cần chuẩn bị / Đo điều gì | 3 cột kiểu mission-pillars (viền trên, nhãn 9px) |
| Điểm cần lưu ý | Knowledge-strip, viền trái màu vàng |
| Chiến lược theo mục tiêu | Service card có vạch accent |
| Khi gặp vấn đề | Hàng "Vấn đề → Cách xử lý" |
| Kiểm tra trước khi chạy | Checklist tick được, có vòng tiến độ cyan |
| FAQ | Accordion kiểu case-windows |

Mỗi panel chiến dịch có: banner (eyebrow `ĐANG KHÁM PHÁ / 01 / ĐÓN NHU CẦU`, H3 28px, dải metrics số định dạng / file / tình huống), rồi **thanh mục lục dính** (Trông như thế nào · Cách hoạt động · File cần chuẩn bị · Hành trình · Tóm tắt · Chiến lược & xử lý) tự sáng theo vị trí cuộn.

## 4. Bố cục 3 trang

**Trang 1: Cách chạy & định dạng.** Các phần theo thứ tự:
1. Hero có chồng thẻ 3D.
2. Thanh 3 bước liên kết 3 trang.
3. Quỹ đạo hệ sinh thái.
4. Bộ chọn 6 loại chiến dịch.
5. Panel của loại đang chọn (cấu trúc như mục 3).
6. "Nhớ nhanh" 6 ô.
7. CTA sang trang 2.

**Trang 2: Chọn cách chạy.**
- 8 mục tiêu thành lưới service card.
- "Audience Galaxy" làm quỹ đạo giống trang 1.
- Bộ chọn độ tuổi/giới tính/khu vực đặt trong workbench.
- Tệp đối tượng và remarketing dùng service card.
- Checklist chuẩn bị.
- FAQ, CTA sang trang 3.

**Trang 3: Chi phí & hiệu quả.**
- Hero có dải metrics.
- Calculator đặt trong workbench, kết quả hiển thị bằng số lớn kiểu `.metrics`.
- Các yếu tố làm chi phí tăng/giảm dùng service card.
- Tracking pipeline dùng beacons.
- KPI dùng thẻ.
- Lộ trình triển khai là timeline dọc.
- FAQ.
- Form liên hệ (hoạt động thật), style theo `.brief` của trang chủ.

## 5. Yêu cầu kỹ thuật

- Viết renderer mới `scripts/google-ads-lp/` gồm `shared.mjs`, `page-formats.mjs`, `page-choose.mjs`, `page-cost.mjs`. Lấy nội dung từ `dist/google-ads-experience-data.js`, `google-ads-bidding-data.js` và dữ liệu hiện có. **Không import `google-ads-page.mjs`, không cắt HTML bằng regex/indexOf.** Viết code có xuống dòng, dễ đọc.
- Dùng một file CSS `dist/google-ads-lp.css` với tokens ở mục 2, **không có `!important`**. 3 trang mới load `style.css`, `navigation.css` và `google-ads-lp.css`, không load 4 file CSS Google Ads cũ. Nếu `style.css` có rule cho `header`, `main`, `.chapter` gây xung đột thì scope lại bằng class trên `body` của trang, không sửa `style.css`.
- Dùng một file JS `dist/google-ads-lp.js` cho: bộ chọn, quỹ đạo, tilt, đối sánh, RSA, giá thầu, hành trình, checklist, calculator, redirect anchor cũ. Tận dụng logic trong `google-ads-experience.js` và file prototype.
- **Anchor cũ:** chuyển `#sheet-goals`, `#sheet-budget`, `#format-*`, `#guide-*`, `#atlas-*`… sang URL và loại chiến dịch mới. Deep link dạng `#search`, `#pmax`…
- Sửa `build-service-pages.mjs` để build 3 URL. Giữ cờ `--google-only`.
- **Kiểm tra:**
  - Ở 1440, 768, 390 và 320px không có cuộn ngang. Chụp ảnh và so sánh bằng mắt với trang chủ ở cùng kích thước: cỡ H1/H2/description, màu cyan và nút phải khớp.
  - Test Playwright cho 6 loại chiến dịch và mọi tương tác, không có lỗi console.
- Giữ file cũ trong repo, chỉ ngừng dùng cho các trang này.

## 6. Cần Huy cung cấp
Hotline, link Zalo, nơi nhận dữ liệu form. Nếu chưa có thì dùng placeholder `[HOTLINE]`, `[ZALO]`, `[FORM_ENDPOINT]`.

---

## Prompt dán vào Claude Code

> Đọc `GOOGLE_ADS_REDESIGN_BRIEF.md` ở thư mục gốc. Làm lại giao diện trang Google Ads thành 3 landing page theo mục 4. **Giữ nguyên toàn bộ nội dung hiện tại.**
>
> **Màu, cỡ chữ và component phải bám sát trang chủ** theo đúng bảng ở mục 2. Trước khi code, mở `dist/style.css`, `orbital.css`, `cinematic.css`, `solutions.css`, `journey-polish.css`, `navigation.css` để đối chiếu các giá trị. Nền tối vũ trụ, cyan `#72eaff`, nút bo 3px, H1 `clamp(35px,3.7vw,62px)` weight 600, H2 `clamp(28px,3vw,46px)` weight 500, description 15–16px line-height 1.85. Màu riêng cho từng chiến dịch lấy từ bảng accent của trang chủ.
>
> File `prototypes/google-ads-formats-v2.html` chỉ dùng để tham khảo bố cục, component và tương tác (workbench định dạng, vòng đối sánh, RSA, Ad Rank, giá thầu, hành trình, checklist, quỹ đạo). **Không dùng nền sáng hay màu/cỡ chữ của file đó.**
>
> Hiệu ứng 3D chỉ dùng CSS, không load Three.js, không thêm thư viện, dừng khi ra khỏi màn hình và khi bật reduced-motion.
>
> Làm lần lượt:
> 1. Tạo `dist/google-ads-lp.css` với tokens ở mục 2.
> 2. Viết renderer `scripts/google-ads-lp/` cho trang 1, dùng header/menu/footer thật, build rồi chụp desktop 1440 và mobile 390 đặt cạnh ảnh trang chủ cùng kích thước để tôi duyệt.
> 3. Trang 2.
> 4. Trang 3.
> 5. Redirect anchor cũ và test Playwright.
>
> Không sửa trang chủ, `style.css`, menu hay các trang dịch vụ khác. Chỗ nào thiếu thông tin thì dùng placeholder `[HOTLINE]`, `[ZALO]`, `[FORM_ENDPOINT]` và liệt kê lại cho tôi.

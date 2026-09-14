import {enhanceTrust,enhanceMission} from './illustrations.js';
import {shapeService} from './service-layouts.js';
const chapters = [
 ['gateway','GATEWAY','Kết nối khách hàng.<br>Tối ưu vận hành.<br><em>Kiến tạo tăng trưởng.</em>','POWAI kết nối Marketing, Công nghệ và AI để doanh nghiệp thu hút khách hàng, nâng cao hiệu quả chuyển đổi và giảm công việc thủ công. Bắt đầu từ mục tiêu kinh doanh, xây giải pháp phù hợp và cải tiến bằng dữ liệu.'],
 ['trust','CONNECTED EARTH','Kết nối từ Việt Nam.<br><em>Vươn đến những chân trời mới.</em>','Mỗi doanh nghiệp có một thị trường, nguồn lực và bài toán riêng. POWAI hướng đến quan hệ đồng hành lâu dài: hiểu bối cảnh, thống nhất mục tiêu và kết nối đội ngũ để triển khai nhất quán từ marketing đến vận hành.'],
 ['mission','OUR MISSION','Không chỉ giải quyết một vấn đề.<br><em>Xây cả hệ thống tăng trưởng.</em>','Quảng cáo đưa khách hàng đến, website giúp họ ra quyết định, đội ngũ tư vấn tiếp nối nhu cầu. POWAI kết nối các điểm chạm ấy với dữ liệu và tự động hóa, để doanh nghiệp nhận ra điểm nghẽn, lựa chọn ưu tiên và cải tiến cả hệ thống.'],
 ['universe-map','POWAI UNIVERSE','Một hệ sinh thái.<br><em>Sáu động lực tăng trưởng.</em>','Tư vấn trước, xây nền tảng website, triển khai quảng cáo, kết nối AI và nội dung, rồi quản lý hành trình khách hàng bằng CRM và dữ liệu.'],
 ['strategy','GROWTH STRATEGY','Hiểu đúng bài toán.<br><em>Chọn đúng hướng đi.</em>','Bắt đầu bằng mục tiêu kinh doanh, khách hàng và nguồn lực hiện có. POWAI cùng doanh nghiệp đánh giá hiện trạng, xác định ưu tiên và xây lộ trình trước khi triển khai website, quảng cáo hay hệ thống tự động hóa.'],
 ['web','DIGITAL CIVILIZATION','Không chỉ là website.<br><em>Là nền tảng của doanh nghiệp.</em>','Xây website và landing page giúp khách hàng hiểu doanh nghiệp, tìm đúng thông tin và thực hiện hành động tiếp theo. Kết hợp cấu trúc nội dung, UX/UI, tốc độ tải và đo lường để website phục vụ cả thương hiệu lẫn kinh doanh.'],
 ['ads','PERFORMANCE ENGINE','Biến sự chú ý<br>thành <em>cơ hội kinh doanh.</em>','Xây chiến dịch Google, Meta và TikTok theo mục tiêu kinh doanh. Kết nối thông điệp, nội dung quảng cáo, trang đích và theo dõi chuyển đổi để tối ưu chất lượng khách hàng tiềm năng, thay vì chỉ nhìn vào lượt nhấp.'],
 ['ai','NEURAL CORE','Giải phóng thời gian.<br><em>Mở rộng tiềm năng.</em>','Đưa AI vào các nhiệm vụ cụ thể: tra cứu kiến thức, hỗ trợ tư vấn, phân loại yêu cầu và chuyển dữ liệu giữa các hệ thống. Mỗi quy trình cần phạm vi rõ ràng, quyền truy cập phù hợp và điểm chuyển tiếp cho con người.'],
 ['social','HUMAN CONSTELLATION','Kết nối thật.<br><em>Cộng đồng lớn mạnh.</em>','Xây sự hiện diện nhất quán trên các kênh mạng xã hội bằng chiến lược nội dung, lịch xuất bản và cách tương tác phù hợp. Kết nối câu chuyện thương hiệu với câu hỏi thực tế của khách hàng để nuôi dưỡng niềm tin và nhu cầu.'],
 ['data','CRM & DATA','Kết nối dữ liệu.<br><em>Theo sát từng khách hàng.</em>','Tập trung thông tin khách hàng, phân công người phụ trách và theo dõi tiến trình tư vấn trong CRM. Kết nối dữ liệu website, quảng cáo và bán hàng để hạn chế bỏ sót yêu cầu, đo hiệu quả và cải tiến quy trình chăm sóc.'],
 ['results','MISSION CONTROL','Mỗi doanh nghiệp.<br><em>Một hành trình riêng.</em>','Đánh giá hiệu quả theo bài toán ban đầu, phạm vi triển khai và thời gian đo lường. Một hồ sơ dự án cần làm rõ điều đã thay đổi, cách ghi nhận kết quả và bài học có thể áp dụng cho giai đoạn tiếp theo.'],
 ['flight','FLIGHT PATH','Lộ trình rõ ràng.<br><em>Đồng hành dài hạn.</em>','Sáu bước kết nối từ phân tích đến đồng hành. Mỗi giai đoạn cần có đầu ra, người phụ trách và tiêu chí đánh giá rõ ràng; kết quả đo lường trở thành cơ sở cho lần cải tiến tiếp theo.'],
 ['horizon','NEW HORIZON','Sẵn sàng kiến tạo<br><em>tầng tăng trưởng tiếp theo?</em>','Bạn cần thêm khách hàng tiềm năng, một website hiệu quả hơn hay một quy trình bớt thủ công? Bắt đầu bằng mục tiêu, thực trạng và nguồn lực hiện có để xác định giải pháp ưu tiên cùng POWAI.']
];
const extras = {
gateway:'<div class="actions"><a class="primary" href="#trust">Bước vào vũ trụ POWAI <span>↗</span></a><a class="text-link" href="#universe-map">Khám phá giải pháp</a></div>',
trust:'<div class="clients"><span>QUỐC ANH</span><span>NextGo</span><span>NHẤT NAM</span><span>EDU TRADE</span><span>SaluVietnam</span></div>',
'universe-map':'<div class="service-links"><a href="#strategy" style="--service-accent:#e0cd9b"><span class="service-card-top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 21 12 12 21 3 12z M15 9l-2 4-4 2 2-4z"/></svg><span class="service-number">01 / POWAI</span><span class="service-arrow" aria-hidden="true">↗</span></span><strong>Tư vấn chiến lược</strong><span class="service-summary">Xác định ưu tiên và lộ trình phù hợp với nguồn lực doanh nghiệp.</span><span class="service-meta">Phân tích · Lộ trình · Tăng trưởng</span></a><a href="#web" style="--service-accent:#82dfff"><span class="service-card-top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3z M3 9h18 M6 7h1 M9 7h1"/></svg><span class="service-number">02 / POWAI</span><span class="service-arrow" aria-hidden="true">↗</span></span><strong>Website & Landing Page</strong><span class="service-summary">Biến lượt truy cập thành trải nghiệm và hành động có giá trị.</span><span class="service-meta">UX/UI · Website · CRO</span></a><a href="#ads" style="--service-accent:#ffbd80"><span class="service-card-top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16 9 11 13 14 20 5 M14 5h6v6"/></svg><span class="service-number">03 / POWAI</span><span class="service-arrow" aria-hidden="true">↗</span></span><strong>Quảng cáo đa kênh</strong><span class="service-summary">Tiếp cận đúng khách hàng. Tối ưu từng cơ hội chuyển đổi.</span><span class="service-meta">Google · Meta · TikTok</span></a><a href="#ai" style="--service-accent:#c0a2ff"><span class="service-card-top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8h8v8H8z M10 3v5 M14 3v5 M10 16v5 M14 16v5 M3 10h5 M16 10h5 M3 14h5 M16 14h5"/></svg><span class="service-number">04 / POWAI</span><span class="service-arrow" aria-hidden="true">↗</span></span><strong>AI & Tự động hóa</strong><span class="service-summary">Kết nối công cụ, giảm việc lặp và hỗ trợ đội ngũ vận hành.</span><span class="service-meta">AI Agent · Workflow · Tích hợp</span></a><a href="#social" style="--service-accent:#ff9bc1"><span class="service-card-top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v12h-9l-5 4v-4H4z M8 8h8 M8 12h5"/></svg><span class="service-number">05 / POWAI</span><span class="service-arrow" aria-hidden="true">↗</span></span><strong>Social & Nội dung</strong><span class="service-summary">Xây tiếng nói thương hiệu và duy trì kết nối với cộng đồng.</span><span class="service-meta">Nội dung · Social · Cộng đồng</span></a><a href="#data" style="--service-accent:#85e1c1"><span class="service-card-top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20v-7 M12 20V4 M19 20V9 M3 20h19"/></svg><span class="service-number">06 / POWAI</span><span class="service-arrow" aria-hidden="true">↗</span></span><strong>CRM & Dữ liệu</strong><span class="service-summary">Quản lý khách hàng, theo dõi tư vấn và đo hiệu quả kinh doanh.</span><span class="service-meta">CRM · GA4 · Dashboard</span></a></div><p class="ecosystem-flow"><span>MỘT HỆ THỐNG KẾT NỐI</span>Tư vấn <i>→</i> Xây nền tảng <i>→</i> Tiếp cận <i>→</i> Chăm sóc</p>',
ads:'<div class="tags"><span>Google Ads</span><span>Meta Ads</span><span>TikTok Ads</span><span>Tối ưu chuyển đổi</span></div>',
web:'<div class="tags"><span>Website doanh nghiệp</span><span>Landing Page</span><span>UX / UI</span></div>',
ai:'<div class="tags"><span>AI Agent</span><span>Tự động hóa quy trình</span><span>Chăm sóc khách hàng</span></div>',
social:'<div class="tags"><span>Chiến lược nội dung</span><span>Social Media</span><span>Phát triển cộng đồng</span></div>',
strategy:'<div class="tags"></div>',
data:'<div class="tags"><span>Analytics</span><span>CRM</span><span>Đo lường hiệu quả</span><span>Tư vấn chiến lược</span></div>',
results:'<div class="project-list"><span>Quốc Anh Door</span><span>NextGo</span><span>EDU Trade</span><span>SaluVietnam</span></div>',
flight:'<ol class="steps"><li><b>01</b> Phân tích</li><li><b>02</b> Chiến lược</li><li><b>03</b> Triển khai</li><li><b>04</b> Đo lường</li><li><b>05</b> Mở rộng</li><li><b>06</b> Đồng hành</li></ol>',
horizon:'<details class="brief"><summary>Bắt đầu từ mục tiêu của bạn ↗</summary><p>Chuẩn bị lĩnh vực kinh doanh, nhóm khách hàng, khó khăn hiện tại, mục tiêu và thời gian dự kiến. Bản tóm tắt được tải về máy để bạn sử dụng khi trao đổi; biểu mẫu này chưa gửi thông tin đến POWAI.</p><label for="goal">Doanh nghiệp bạn muốn cải thiện điều gì?</label><textarea id="goal" placeholder="Lĩnh vực / Khách hàng mục tiêu / Khó khăn hiện tại / Kết quả mong muốn / Thời gian và ngân sách dự kiến…"></textarea><button id="save-brief">Lưu mục tiêu trao đổi ↓</button><output id="brief-status" aria-live="polite"></output></details><footer>POWAI · Marketing × Technology × AI<br><br><a href="#gateway">Trở về cửa ngõ ↑</a></footer>'
};
extras['universe-map'] += '<div id="service-universe" aria-label="Bản đồ sáu thế giới dịch vụ POWAI"></div><p class="world-note">Chọn một thế giới để khám phá giải pháp · Sáu nhóm dịch vụ kết nối marketing, công nghệ và vận hành</p>';
extras.results = '<div class="metrics"><div><strong>500+</strong><small>Doanh nghiệp tin tưởng</small></div><div><strong>3X</strong><small>Tăng trưởng trung bình</small></div><div><strong>95%</strong><small>Khách hàng hài lòng</small></div><div><strong>10+ năm</strong><small>Kinh nghiệm</small></div></div><div class="case-windows"><details><summary>Quốc Anh Door</summary><p>Hồ sơ dự án đang chờ bổ sung nội dung và kết quả đã xác minh.</p></details><details><summary>NextGo</summary><p>Hồ sơ dự án đang chờ bổ sung nội dung và kết quả đã xác minh.</p></details><details><summary>EDU Trade</summary><p>Hồ sơ dự án đang chờ bổ sung nội dung và kết quả đã xác minh.</p></details><details><summary>SaluVietnam</summary><p>Hồ sơ dự án đang chờ bổ sung nội dung và kết quả đã xác minh.</p></details></div><p class="art-note">Số liệu theo bản nội dung bạn cung cấp, cần xác nhận trước khi công bố.</p>';
extras.flight = '<ol class="beacons"><li style="--n:0"><b>01</b>Phân tích<small>Rà soát thị trường, khách hàng, kênh hiện có và điểm nghẽn. Đầu ra: hiện trạng và mục tiêu cần giải quyết.</small></li><li style="--n:1"><b>02</b>Chiến lược<small>Chọn nhóm giải pháp, ngân sách dự kiến và chỉ số đánh giá. Đầu ra: lộ trình ưu tiên theo giai đoạn.</small></li><li style="--n:2"><b>03</b>Triển khai<small>Chuẩn bị nội dung, thiết lập hệ thống và kiểm tra trước khi vận hành. Đầu ra: hạng mục được nghiệm thu.</small></li><li style="--n:3"><b>04</b>Đo lường<small>Kiểm tra dữ liệu, đối chiếu mục tiêu và phân tích điểm nghẽn. Đầu ra: báo cáo cùng đề xuất cải tiến.</small></li><li style="--n:4"><b>05</b>Mở rộng<small>Thử nghiệm có kiểm soát trước khi tăng ngân sách hoặc mở rộng kênh. Đầu ra: phương án phân bổ nguồn lực.</small></li><li style="--n:5"><b>06</b>Đồng hành<small>Rà soát định kỳ, chia sẻ cách vận hành và cập nhật ưu tiên. Đầu ra: kế hoạch cho chu kỳ tiếp theo.</small></li></ol>';
['strategy','web','ads','ai','social','data'].forEach(id => extras[id] += '<a class="journey-link" href="#universe-map">← Trở về bản đồ giải pháp</a>');
extras.gateway += '<div class="hero-disciplines"><span>MARKETING</span><i>+</i><span>TECHNOLOGY</span><i>+</i><span>AI</span></div>';
extras.trust += '<div class="trust-caption"><span>Thấu hiểu bài toán</span><span>Kết nối đội ngũ</span><span>Đồng hành dài hạn</span></div>';
extras.mission = '<div class="mission-pillars"><article><span>01 / HIỂU ĐÚNG</span><h3>Bắt đầu từ bài toán.</h3><p>Nhìn vào khách hàng, mục tiêu và nguồn lực trước khi chọn công cụ hay kênh triển khai.</p></article><article><span>02 / KẾT NỐI</span><h3>Phối hợp cả hệ thống.</h3><p>Đưa marketing, website, dữ liệu và vận hành về cùng một hành trình khách hàng.</p></article><article><span>03 / CẢI TIẾN</span><h3>Đi tiếp bằng dữ liệu.</h3><p>Đo kết quả, kiểm tra giả thuyết và điều chỉnh ưu tiên qua từng chu kỳ thực hiện.</p></article></div><a class="journey-link" href="#universe-map">Khám phá hệ sinh thái giải pháp ↗</a>';
extras.flight += '<div class="knowledge-strip"><span>KIẾN THỨC TRONG TỪNG BƯỚC</span><p>Chia sẻ cách đọc báo cáo, ghi nhận bài học thử nghiệm và bàn giao hướng dẫn để đội ngũ chủ động hơn khi vận hành.</p></div>';
extras.horizon = '<div class="contact-prompts"><span>01 · Bài toán hiện tại</span><span>02 · Mục tiêu mong muốn</span><span>03 · Nguồn lực dự kiến</span></div>' + extras.horizon;

document.querySelector('#journey').innerHTML=chapters.map(([id,label,title,desc],i)=>`<section id="${id}" class="chapter ${i===0?'hero':''} ${id==='horizon'?'ending':''}" aria-labelledby="title-${id}"><div class="viewport"><div class="copy"><p class="eyebrow">${String(i+1).padStart(2,'0')} / ${label}</p><${i===0?'h1':'h2'} id="title-${id}">${title}</${i===0?'h1':'h2'}><p class="description">${desc}</p>${extras[id]||''}</div></div></section>`).join('');
document.querySelector('#chapters').innerHTML=chapters.map(([id,label],i)=>`<a href="#${id}" aria-label="${i+1}. ${label}" title="${label}"></a>`).join('');
document.querySelector('#save-brief').onclick=()=>{const value=document.querySelector('#goal').value.trim();if(!value){document.querySelector('#brief-status').textContent='Hãy ghi mục tiêu của bạn trước khi lưu.';return;}const url=URL.createObjectURL(new Blob(['POWAI — MỤC TIÊU TRAO ĐỔI\n\n'+value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='POWAI-muc-tieu.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#brief-status').textContent='Đã tạo tệp mục tiêu trên máy bạn.';};
let stopped=matchMedia('(prefers-reduced-motion: reduce)').matches;
const motion=document.querySelector('#motion');
const setMotion=()=>{motion.textContent=stopped?'Bật chuyển động':'Tạm dừng chuyển động';motion.setAttribute('aria-pressed',String(stopped));};setMotion();motion.onclick=()=>{stopped=!stopped;setMotion();};
const status=document.querySelector('#status');
const serviceCopy={
 "ads": [
  [
   "Google Ads",
   "Có mặt khi khách hàng đang tìm giải pháp",
   "Phân tích nhu cầu tìm kiếm, nhóm từ khóa và trang đích tương ứng. Xây cấu trúc chiến dịch, nội dung quảng cáo, từ khóa loại trừ và theo dõi chuyển đổi. Đánh giá bằng chi phí trên yêu cầu tư vấn và chất lượng khách hàng; điều chỉnh ngân sách theo dữ liệu thu được."
  ],
  [
   "Meta Ads",
   "Kết nối thông điệp với từng nhóm khách hàng",
   "Xác định chân dung khách hàng, góc nội dung và ưu đãi phù hợp. Thử nghiệm hình ảnh, video, biểu mẫu hoặc trang đích; phối hợp với đội ngũ tư vấn để xem chất lượng yêu cầu nhận về. Tối ưu theo hiệu quả từng nhóm nội dung và từng giai đoạn của chiến dịch."
  ],
  [
   "TikTok Ads",
   "Từ video thu hút đến hành động cụ thể",
   "Xây ý tưởng video từ vấn đề, nhu cầu và ngữ cảnh sử dụng của khách hàng. Thử nghiệm cách mở đầu, thông điệp và lời kêu gọi hành động. Theo dõi từ lượt xem đến truy cập và chuyển đổi để lựa chọn nội dung phù hợp cho giai đoạn tiếp theo."
  ],
  [
   "Remarketing & CRO",
   "Cải thiện hiệu quả sau lượt truy cập đầu tiên",
   "Phân tích nơi khách hàng rời trang, kiểm tra biểu mẫu và làm rõ thông điệp trên trang đích. Thiết kế thử nghiệm nội dung, CTA hoặc luồng chuyển đổi; tiếp cận lại nhóm phù hợp khi có cơ sở dữ liệu và sự đồng ý cần thiết. Đánh giá thay đổi bằng cùng một tiêu chí đo lường."
  ]
 ],
 "web": [
  [
   "Website doanh nghiệp",
   "Một nền tảng thể hiện rõ giá trị doanh nghiệp",
   "Tổ chức trang giới thiệu, dịch vụ, năng lực, dự án và liên hệ theo nhu cầu tìm hiểu của khách hàng. Xây nội dung nhất quán với thương hiệu, hệ thống quản trị dễ cập nhật và giao diện phù hợp trên máy tính lẫn điện thoại. Kiểm tra điều hướng, biểu mẫu và nội dung trước khi bàn giao."
  ],
  [
   "Landing Page",
   "Một chiến dịch, một hành động ưu tiên",
   "Kết nối thông điệp quảng cáo với tiêu đề, lợi ích, bằng chứng và lời kêu gọi hành động trên trang. Thiết kế biểu mẫu ngắn gọn, nội dung giải đáp băn khoăn và luồng tiếp nhận yêu cầu. Thiết lập đo lường để đánh giá tỷ lệ chuyển đổi và chất lượng thông tin nhận về."
  ],
  [
   "UX / UI",
   "Giúp khách hàng tìm đúng và thao tác dễ dàng",
   "Làm rõ nhóm người dùng, tác vụ chính và cấu trúc thông tin trước khi thiết kế. Xây luồng thao tác, bản mẫu và các thành phần giao diện nhất quán. Rà soát khả năng đọc, thao tác bàn phím, trạng thái biểu mẫu và trải nghiệm trên các kích thước màn hình."
  ],
  [
   "SEO & hiệu suất",
   "Chuẩn bị nền tảng cho vận hành lâu dài",
   "Rà soát cấu trúc đường dẫn, tiêu đề, mô tả, liên kết nội bộ và khả năng lập chỉ mục. Tối ưu tài nguyên để cải thiện tốc độ tải, kiểm tra trải nghiệm di động và thiết lập công cụ theo dõi. Bàn giao hướng dẫn cập nhật nội dung, sao lưu và bảo trì theo phạm vi thống nhất."
  ]
 ],
 "ai": [
  [
   "AI Agent",
   "Trợ lý được thiết kế cho nhiệm vụ cụ thể",
   "Xác định nhiệm vụ, nguồn kiến thức được phép sử dụng và trường hợp cần chuyển cho nhân viên. Chuẩn bị dữ liệu, thiết kế hội thoại và kiểm thử bằng các tình huống thực tế. Đánh giá độ đúng của câu trả lời, khả năng hoàn thành tác vụ và các yêu cầu ngoài phạm vi trước khi đưa vào vận hành."
  ],
  [
   "Tự động hóa",
   "Nối các bước xử lý thành quy trình rõ ràng",
   "Khảo sát các thao tác lặp: nhận yêu cầu, phân loại, nhập dữ liệu, nhắc việc và tạo báo cáo. Thiết kế điều kiện kích hoạt, bước phê duyệt, nhật ký xử lý và thông báo khi có lỗi. Kết nối công cụ hiện có theo khả năng tích hợp, giảm thao tác thủ công mà vẫn giữ quyền kiểm soát."
  ],
  [
   "Chăm sóc khách hàng",
   "Tiếp nhận nhất quán, chuyển tiếp đủ ngữ cảnh",
   "Tổ chức bộ câu hỏi thường gặp, thông tin dịch vụ và hướng dẫn phản hồi. Hỗ trợ tiếp nhận, phân loại nhu cầu, lưu thông tin và chuyển yêu cầu đến đúng người. Những trường hợp phức tạp hoặc cần quyết định sẽ được chuyển cho nhân viên cùng lịch sử trao đổi liên quan."
  ],
  [
   "Tích hợp & vận hành",
   "Theo dõi chất lượng sau khi triển khai",
   "Kết nối AI với website, CRM hoặc công cụ nội bộ trong phạm vi đã thống nhất. Phân quyền dữ liệu, kiểm tra đầu vào và thiết lập cách xử lý sự cố. Theo dõi chi phí sử dụng, lỗi và phản hồi của người dùng để cập nhật kiến thức, điều chỉnh quy trình và đánh giá hiệu quả."
  ]
 ],
 "social": [
  [
   "Chiến lược nội dung",
   "Một tiếng nói rõ ràng, nhất quán với thương hiệu",
   "Xác định nhóm khách hàng, chủ đề trọng tâm, giọng điệu và vai trò của từng kênh. Xây lịch nội dung theo giai đoạn nhận biết, cân nhắc và hành động. Thống nhất quy trình duyệt để mỗi bài đăng có mục tiêu, thông điệp và bước tiếp theo phù hợp."
  ],
  [
   "Social Media",
   "Vận hành kênh theo một kế hoạch thống nhất",
   "Chuẩn bị bài viết, hình ảnh và nội dung video theo định dạng từng nền tảng. Phối hợp lịch xuất bản, quản lý phản hồi và kết nối hoạt động tự nhiên với chiến dịch quảng cáo. Tổng hợp kết quả định kỳ để điều chỉnh chủ đề, định dạng và tần suất đăng tải."
  ],
  [
   "Cộng đồng",
   "Tạo lý do để khách hàng tiếp tục kết nối",
   "Xây nội dung giải đáp câu hỏi, chia sẻ kiến thức và khuyến khích trao đổi phù hợp. Thiết lập cách phản hồi bình luận, phân loại yêu cầu và chuyển thông tin cho đội ngũ phụ trách. Theo dõi mức độ tham gia và chất lượng tương tác để cải thiện trải nghiệm cộng đồng."
  ],
  [
   "Đo lường nội dung",
   "Hiểu nội dung nào tạo giá trị",
   "Đánh giá mức tiếp cận, thời lượng xem, lượt lưu, tương tác và truy cập theo mục tiêu của kênh. Khi có dữ liệu liên kết, xem thêm yêu cầu tư vấn hoặc chuyển đổi. Dùng kết quả để chọn chủ đề cần phát triển, nội dung cần sửa và thử nghiệm tiếp theo."
  ]
 ],
 "data": [
  [
   "CRM",
   "Theo dõi từ nguồn khách đến kết quả tư vấn",
   "Tổ chức thông tin khách hàng, nguồn tiếp cận, người phụ trách và trạng thái xử lý. Thống nhất các bước bàn giao giữa marketing và bán hàng; thiết kế nhắc việc phù hợp. Đối chiếu kết quả tư vấn với nguồn đầu vào để nhận diện khách hàng chất lượng và điểm rơi rớt."
  ],
  [
   "GA4 & đo lường",
   "Xây dữ liệu đáng tin trước khi phân tích",
   "Lập danh sách hành động cần đo: xem dịch vụ, gửi biểu mẫu, liên hệ và các bước chuyển đổi. Thiết lập sự kiện, quy ước nguồn chiến dịch và kiểm tra dữ liệu trùng hoặc thiếu. Thống nhất định nghĩa chỉ số để các đội ngũ đọc cùng một kết quả."
  ],
  [
   "Dashboard",
   "Một góc nhìn chung cho quyết định vận hành",
   "Tổng hợp các chỉ số đã thống nhất từ nguồn dữ liệu có thể kết nối. Phân tách theo kênh, chiến dịch và thời gian; thể hiện mục tiêu, kết quả và biến động. Làm rõ tần suất cập nhật cùng giới hạn dữ liệu để báo cáo hỗ trợ quyết định, không chỉ trình bày con số."
  ]
 ],
 "strategy": [
  [
   "Chiến lược",
   "Chọn đúng ưu tiên với nguồn lực hiện có",
   "Rà soát mục tiêu, khách hàng, năng lực đội ngũ và hiệu quả các kênh. Xác định điểm nghẽn, lập giả thuyết cải tiến và ưu tiên theo tác động, chi phí cùng khả năng triển khai. Chuyển thành lộ trình có người phụ trách, mốc đánh giá và điều kiện điều chỉnh."
  ],
  [
   "Khảo sát hiện trạng",
   "Làm rõ bài toán trước khi chọn giải pháp",
   "Rà soát mô hình kinh doanh, nhóm khách hàng, website, hoạt động marketing và quy trình tư vấn hiện tại. Thống nhất mục tiêu và những giới hạn về thời gian, ngân sách, nhân sự. Đầu ra là bản đánh giá hiện trạng, danh sách điểm nghẽn và vấn đề cần ưu tiên."
  ],
  [
   "Lộ trình triển khai",
   "Sắp xếp từng bước theo mức độ ưu tiên",
   "Xác định hạng mục cần làm trước, phụ thuộc giữa các hệ thống và người phụ trách. Lập kế hoạch website, quảng cáo, AI và CRM phù hợp với mức độ sẵn sàng của doanh nghiệp. Mỗi giai đoạn có phạm vi, đầu ra, mốc kiểm tra và tiêu chí để quyết định bước tiếp theo."
  ]
 ]
};
Object.entries(serviceCopy).forEach(([id,items])=>{
 const section=document.getElementById(id),tags=section.querySelector('.tags');
 tags.innerHTML=items.map((item,i)=>`<button type="button" aria-pressed="${i===0}" data-index="${i}">${item[0]}</button>`).join('');
 const detail=document.createElement('div');detail.className='service-detail';detail.setAttribute('aria-live','polite');tags.after(detail);const workbench=document.createElement('div');workbench.className='service-workbench';tags.before(workbench);workbench.append(tags,detail);
 const render=i=>{detail.innerHTML=`<h3>${items[i][1]}</h3><p>${items[i][2]}</p><a href="#horizon">Trao đổi về ${items[i][0]} ↗</a>`;tags.querySelectorAll('button').forEach((b,n)=>b.setAttribute('aria-pressed',String(i===n)));};
 tags.addEventListener('click',event=>{const b=event.target.closest('button');if(b)render(Number(b.dataset.index));});render(0);shapeService(id,workbench,tags,detail);
});
enhanceTrust();enhanceMission();
try { const {startOrbital}=await import('./orbital.js'); await startOrbital(()=>stopped); }
catch(error){console.error(error);document.body.classList.add('fallback');status.textContent='Không mở được cảnh 3D trên thiết bị này. Nội dung và điều hướng vẫn hoạt động.';motion.hidden=true;}

try { const {createSolarExplorer}=await import('./solar.js'); await createSolarExplorer(()=>stopped); } catch(error){console.error(error);document.querySelector('#status').textContent='Chưa tải được hệ Mặt Trời. Hãy tải lại trang.';}

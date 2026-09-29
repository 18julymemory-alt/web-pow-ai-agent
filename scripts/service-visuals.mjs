import {productPhoto} from '../dist/product-images.js';
export const tones=['#8eb7ff','#e7bd9a','#9aceda','#dfb5ce','#c3b1e4','#9bd3c1','#b5c7e4','#d8c59e','#a6ccc8'];
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const chips=words=>`<div class="scene-chips">${words.map(w=>`<span>${w}</span>`).join('')}</div>`;
const lines='<div class="scene-lines"><i></i><i></i><i></i></div>';
const flow=words=>`<div class="scene-flow">${words.map((w,i)=>`${i?'<i>↓</i>':''}<span>${w}</span>`).join('')}</div>`;
const product='<div class="product-object"><i></i><b></b></div>';
function commerce(title,j){
 if(title==='TikTok Shop')return `<div class="tiktok-shop-scene"><span>VIDEO × SẢN PHẨM</span><strong>Khám phá.<br>Trải nghiệm.<br>Đặt hàng.</strong>${product}<div><b>Sản phẩm trong video</b><small>Xem chi tiết →</small></div></div>`;

 if(/Vận hành|Thiết lập/.test(title))return `<div class="commerce-ops"><span class="scene-label">GIAN HÀNG / VẬN HÀNH</span>${['Danh mục sản phẩm','Thông tin & hình ảnh','Xử lý yêu cầu'].map((w,i)=>`<div><b>0${i+1}</b><span>${w}</span><i>→</i></div>`).join('')}</div>`;
 return `<div class="shop-head"><b>${escape(title)}</b><span>⌕ &nbsp; ▢</span></div><div class="shop-feature">${product}<div><small>BỘ SƯU TẬP THƯƠNG HIỆU</small><strong>Sản phẩm rõ nét.<br>Lựa chọn dễ dàng.</strong><span>Khám phá sản phẩm ↗</span></div></div><div class="shop-products">${['Thông tin','Hình ảnh','Lợi ích'].map(w=>`<span><i></i><b>${w}</b></span>`).join('')}</div>`;
}
function web(title,j){
 if(/Landing|CRO/.test(title))return `<div class="mini-browser">● ● ● <span>CAMPAIGN / LANDING PAGE</span></div><div class="web-form-scene"><strong>Một nhu cầu.<br>Một hành động.</strong><div><span>Họ và tên</span><span>Email doanh nghiệp</span><b>Nhận tư vấn →</b></div></div>`;
 if(/tốc độ|Bảo trì/.test(title))return `<span class="scene-label">SITE HEALTH / ${escape(title)}</span><div class="health-ring"><span>Rà soát<strong>Website</strong></span></div>${chips(['Tài nguyên','Di động','Sao lưu'])}`;
 if(/Tích hợp|theo yêu cầu/.test(title))return `<span class="scene-label">KẾT NỐI HỆ THỐNG</span>${flow(['Website','API & Phân quyền','CRM / Công cụ nội bộ'])}`;
 if(/UI/.test(title))return `<span class="scene-label">DESIGN SYSTEM / UI–UX</span><div class="design-type">Aa <span>Rõ ràng.<br>Nhất quán.</span></div><div class="design-swatches"><i></i><i></i><i></i><i></i></div>${chips(['Luồng thao tác','Thành phần','Responsive'])}`;
 return `<div class="mini-browser">● ● ● <span>${escape(title)}</span></div><div class="web-page-scene"><small>THƯƠNG HIỆU CỦA BẠN</small><strong>Giá trị rõ ràng.<br>Trải nghiệm liền mạch.</strong><span>Khám phá giải pháp ↗</span><div><i>Giới thiệu</i><i>${/bán hàng/.test(title)?'Sản phẩm':'Dịch vụ'}</i><i>Liên hệ</i></div></div>`;
}
function social(title,j){
 if(/Plan|Lịch/.test(title))return `<span class="scene-label">CONTENT CALENDAR</span><div class="calendar-days">T2 &nbsp; T3 &nbsp; T4 &nbsp; T5 &nbsp; T6</div><div class="content-calendar">${Array.from({length:15},(_,n)=>`<span>${[1,5,8,12].includes(n)?['Ý tưởng','Bài viết','Video','Duyệt'][[1,5,8,12].indexOf(n)]:''}</span>`).join('')}</div>${chips(['Lên ý tưởng','Duyệt','Xuất bản'])}`;
 if(/Video|Reels|TikTok/.test(title))return `<div class="social-video"><span>STORY / ${escape(title)}</span><strong>Kể điều<br>khách hàng<br>quan tâm.</strong><b>▷</b><small>Ý tưởng → Kịch bản → Video</small></div>`;
 if(/Community|Quản trị/.test(title))return `<span class="scene-label">KẾT NỐI & PHẢN HỒI</span><div class="community-thread"><p><b>Khách hàng</b>Tôi muốn tìm hiểu thêm về giải pháp.</p><p><b>Thương hiệu</b>Tiếp nhận câu hỏi, chuyển đúng người.</p></div>`;
 return `<div class="social-poster"><small>BRAND JOURNAL / ${escape(title)}</small><strong>Nội dung có giá trị.<br><em>Kết nối có ý nghĩa.</em></strong><div class="poster-composition"><i></i><i></i></div><span>Chủ đề · Giọng điệu · Nhận diện</span></div>`;
}
function ai(title,j){
 if(title==='AI Sales')return `<span class="scene-label">AI SALES / TIẾP NHẬN NHU CẦU</span><div class="sales-brief"><strong>Bản tóm tắt tư vấn</strong><span>Nhu cầu <b>Website doanh nghiệp</b></span><span>Bước tiếp theo <b>Trao đổi phạm vi</b></span><span>Phụ trách <b>Đội ngũ tư vấn</b></span><small>AI chuẩn bị → Nhân viên tiếp nối</small></div>`;
 if(/Customer Care/.test(title))return `<span class="scene-label">CHĂM SÓC KHÁCH HÀNG</span>${flow(['Tiếp nhận câu hỏi','Tra cứu hướng dẫn','Phản hồi / Chuyển nhân viên'])}`;
 if(/nội bộ/.test(title))return `<span class="scene-label">KIẾN THỨC NỘI BỘ / PHÂN QUYỀN</span><div class="knowledge-files">${['Quy trình vận hành','Tài liệu sản phẩm','Hướng dẫn công việc'].map(w=>`<span><b>▤</b>${w}<i>→</i></span>`).join('')}</div><div class="workflow-guard">Chỉ tra cứu nguồn được cấp quyền</div>`;

 if(/Automation|Integration|báo cáo/.test(title))return `<span class="scene-label">WORKFLOW / ${escape(title)}</span>${flow(['Nhận yêu cầu','Kiểm tra điều kiện','Xử lý & Ghi nhận'])}<div class="workflow-guard">✓ Có bước kiểm tra & chuyển tiếp</div>`;
 if(/Content|Marketing/.test(title))return `<span class="scene-label">AI + KIỂM DUYỆT</span><div class="ai-editor"><small>BRIEF → BẢN NHÁP</small><strong>Thông điệp rõ.<br>Đúng ngữ cảnh.</strong>${lines}<span>Nhân sự rà soát → Xuất bản</span></div>`;
 return `<span class="scene-label">${escape(title)} / TÌNH HUỐNG MẪU</span><div class="agent-chat"><div><small>YÊU CẦU</small><p>${/nội bộ/.test(title)?'Tìm hướng dẫn vận hành cho đội ngũ.':'Tôi cần giải pháp phù hợp cho doanh nghiệp.'}</p></div><i>Tra cứu kiến thức được cấp quyền</i><div><small>AI → NHÂN VIÊN</small><p>Tổng hợp thông tin và chuyển tiếp ngữ cảnh.</p></div></div>`;
}
function data(title,j){
 if(title==='CRM')return `<span class="scene-label">CRM / HÀNH TRÌNH KHÁCH HÀNG</span><div class="crm-mini">${['Tiếp nhận','Tư vấn','Chăm sóc'].map((w,n)=>`<div><b>${w}</b><span><i>0${n+1}</i>Nhu cầu khách hàng</span><small>Người phụ trách →</small></div>`).join('')}</div>`;
 if(/Tracking|Manager|Integration/.test(title))return `<span class="scene-label">SƠ ĐỒ DỮ LIỆU</span>${flow(['Hành động trên website',escape(title),'Báo cáo & Đối soát'])}`;
 return `<span class="scene-label">${escape(title)} / BẢNG ĐIỀU KHIỂN MẪU</span><div class="dashboard-labels"><span>Nguồn truy cập</span><span>Chuyển đổi</span></div><div class="dashboard-visual"><div class="dashboard-bars">${[30,55,42,70,57,84,65].map(h=>`<i style="height:${h}%"></i>`).join('')}</div><div class="dashboard-ring"></div></div><div class="dashboard-legend">Theo kênh &nbsp; · &nbsp; Theo thời gian &nbsp; · &nbsp; Theo mục tiêu</div>`;
}
function seo(title,j){
 if(/Technical|Audit|Onpage|Website/.test(title))return `<span class="scene-label">SEO AUDIT / HẠNG MỤC RÀ SOÁT</span><div class="seo-checks">${['Khả năng lập chỉ mục','Cấu trúc & liên kết','Nội dung & tiêu đề','Trải nghiệm di động'].map(w=>`<span><i>□</i>${w}<b>→</b></span>`).join('')}</div>`;
 if(/Research|từ khóa|Content/.test(title))return `<span class="scene-label">BẢN ĐỒ NHU CẦU TÌM KIẾM</span><div class="keyword-map"><strong>Chủ đề trọng tâm</strong><i>↓</i><div><span>Tìm hiểu</span><span>So sánh</span><span>Lựa chọn</span></div><small>Ý định tìm kiếm → Nội dung phù hợp</small></div>`;
 if(/Backlink|Offpage|Entity/.test(title))return `<span class="scene-label">HIỆN DIỆN THƯƠNG HIỆU</span><div class="entity-map"><span>Nguồn liên quan</span><i>↘</i><strong>WEBSITE</strong><i>↙</i><span>Thông tin nhất quán</span></div>`;
 return `<div class="seo-search"><span>⌕ &nbsp; nhu cầu của khách hàng</span><small>doanhnghiep.vn / giai-phap</small><strong>Giải pháp đúng với điều bạn tìm kiếm</strong><p>Nội dung hữu ích, cấu trúc rõ ràng và thông tin nhất quán.</p>${chips(['Nhu cầu','Nội dung','Kỹ thuật'])}</div>`;
}
function strategy(title,j){
 if(/Journey|Funnel/.test(title))return `<span class="scene-label">${escape(title)}</span><div class="strategy-journey">${['Nhận biết','Cân nhắc','Hành động','Đồng hành'].map((w,n)=>`<span><b>0${n+1}</b>${w}</span>`).join('')}</div>`;
 if(/vận hành|Transformation|công nghệ|hệ thống/.test(title))return `<span class="scene-label">HIỆN TRẠNG → PHƯƠNG ÁN</span><div class="strategy-matrix">${['Con người','Quy trình','Công cụ','Dữ liệu'].map(w=>`<span><b>+</b>${w}</span>`).join('')}</div><div class="workflow-guard">Thống nhất ưu tiên và nguồn lực</div>`;
 return `<span class="scene-label">LỘ TRÌNH / ${escape(title)}</span><div class="strategy-roadmap">${['Hiểu bài toán','Chọn ưu tiên','Lập kế hoạch'].map((w,n)=>`<div><span>0${n+1}</span><strong>${w}</strong><i>→</i></div>`).join('')}</div>`;
}
function academy(title,j){return `<div class="academy-cover"><span>POWAI ACADEMY</span><strong>${escape(title)}</strong><div class="academy-book"><i></i><b>HỌC<br>ĐỂ LÀM.</b></div><small>Chương trình theo mục tiêu ứng dụng</small></div><div class="academy-path"><span>Nền tảng</span>→<span>Thực hành</span>→<span>Phản hồi</span></div>`;}
const makers=[null,commerce,web,social,ai,data,seo,strategy,academy];
const identifiers=['ADS','SHOP','WEB','SOCIAL','AI','DATA','SEO','PLAN','LEARN'];
export function serviceVisual(i,child,j){return productPhoto(i,child.title,j);}

export function visualCatalog(g,c,i,esc){return `<div class="ads-catalog illustrated-catalog">${g.children.map((child,j)=>`<a class="service-row ad-service-card" href="${child.href}" style="--channel-color:${tones[i]}"><div class="ad-card-top"><span class="catalog-identifier">${identifiers[i]}</span><span>${String(j+1).padStart(2,'0')} / POWAI</span><b aria-hidden="true">↗</b></div>${serviceVisual(i,child,j)}<div class="ad-card-copy"><h3>${esc(child.title)}</h3><p>${esc(c.focus[j])}</p><span class="ad-card-cta">${i===8?'Khám phá chương trình':'Khám phá dịch vụ'} <b>→</b></span></div></a>`).join('')}</div>`;}

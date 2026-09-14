import {enhanceIllustration} from './illustrations.js';
export function shapeService(id,workbench,tags,detail){
 workbench.classList.add('layout-'+id);
 const make=(className,html)=>{const node=document.createElement('div');node.className=className;node.innerHTML=html;return node;};
 if(id==='web'){
  workbench.prepend(make('browser-chrome','<span class="window-dots" aria-hidden="true">● ● ●</span><span>POWAI / DIGITAL EXPERIENCE</span><span aria-hidden="true">↗</span>'));
  const body=make('browser-body','');detail.before(body);body.append(detail,make('website-preview','<div class="preview-nav"><b>YOUR BRAND</b><span>Menu ↗</span></div><span class="preview-kicker">ĐƯỢC THIẾT KẾ ĐỂ KẾT NỐI</span><strong>Ấn tượng đầu tiên.<br>Hành động tiếp theo.</strong><div class="preview-art" aria-hidden="true"><i></i><i></i><i></i></div><span class="preview-cta">Khám phá giá trị <b>↗</b></span><small>Minh họa cấu trúc trải nghiệm</small>'));
 }
 if(id==='ads'){
  workbench.prepend(make('conversion-funnel','<span class="visual-label">HÀNH TRÌNH CHUYỂN ĐỔI</span><div><b>01</b><strong>Tiếp cận</strong><small>Đúng người · Đúng thông điệp</small></div><i>↓</i><div><b>02</b><strong>Cân nhắc</strong><small>Nội dung · Trang đích</small></div><i>↓</i><div><b>03</b><strong>Hành động</strong><small>Tư vấn · Đăng ký · Mua hàng</small></div><p>Đo lường và cải tiến ở từng bước</p>'));
  const panel=make('campaign-content','');workbench.append(panel);panel.append(tags,detail);
 }
 if(id==='ai'){
  workbench.prepend(make('automation-intro','<span class="automation-dot" aria-hidden="true"></span><span>CON NGƯỜI ĐỊNH HƯỚNG. HỆ THỐNG HỖ TRỢ.</span>'));
  [...tags.children].forEach((button,i)=>{const labels=['Tiếp nhận','Xử lý','Phối hợp','Kiểm soát'];button.insertAdjacentHTML('beforeend',`<small>${labels[i]}</small>`);});
  workbench.append(make('automation-guards','<span>Kiến thức được kiểm tra</span><span>Chuyển tiếp cho nhân viên</span><span>Theo dõi & cải tiến</span>'));
 }
 if(id==='strategy'){
  workbench.prepend(make('strategy-caption','<span>ĐIỂM XUẤT PHÁT</span><b>Một kế hoạch trước mọi công cụ.</b>'));
  workbench.append(make('strategy-deliverable','<span>ĐẦU RA HƯỚNG ĐẾN</span><strong>Ưu tiên rõ ràng.</strong><strong>Nguồn lực phù hợp.</strong><strong>Lộ trình có thể thực hiện.</strong>'));
 }
 if(id==='social'){
  const editorial=make('editorial-cover','<span>BRAND JOURNAL / POWAI</span><strong>Câu chuyện<br>đáng được<br><em>kết nối.</em></strong><div class="editorial-lines" aria-hidden="true"><i></i><i></i><i></i></div><p>Nội dung có giá trị.<br>Một tiếng nói nhất quán.</p>');workbench.prepend(editorial);
  const body=make('editorial-content','');workbench.append(body);body.append(tags,detail);
 }
 if(id==='data'){
  workbench.prepend(make('crm-pipeline','<div class="pipeline-heading"><span>HÀNH TRÌNH KHÁCH HÀNG</span><small>Sơ đồ quy trình minh họa</small></div><ol><li><b>01</b><strong>Tiếp nhận</strong><span>Nguồn khách & nhu cầu</span></li><li><b>02</b><strong>Phân công</strong><span>Đúng người phụ trách</span></li><li><b>03</b><strong>Tư vấn</strong><span>Lịch sử & bước tiếp theo</span></li><li><b>04</b><strong>Chăm sóc</strong><span>Kết quả & phản hồi</span></li></ol>'));
 }
 enhanceIllustration(id,workbench,tags);
}

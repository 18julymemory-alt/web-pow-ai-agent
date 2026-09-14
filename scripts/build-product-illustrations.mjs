import {mkdir,writeFile} from 'node:fs/promises';
import {services} from '../dist/navigation-data.js';
import {briefs} from './service-image-briefs.mjs';
const out='dist/assets/service-products';await mkdir(out,{recursive:true});
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const palettes=[['#4285f4','#dceaff'],['#f17742','#ffebdf'],['#298ea6','#d7f1f3'],['#b35d8b','#f8e3ef'],['#8461d0','#eee7fc'],['#209482','#dcf3ed'],['#5683b9','#e3edfa'],['#ac8650','#f4ecde'],['#518a6b','#e4f1e9']];
const R=(x,y,w,h,fill='#fff',rx=12,stroke='none')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}"/>`;
const T=(x,y,s,size=18,fill='#23374b',weight=500)=>`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}">${esc(s)}</text>`;
const L=(x,y,x2,y2,col='#dbe4ed',w=2)=>`<path d="M${x} ${y}L${x2} ${y2}" stroke="${col}" stroke-width="${w}" fill="none"/>`;
const C=(x,y,r,fill)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const lines=(x,y,w=210,n=3)=>Array.from({length:n},(_,i)=>R(x,y+i*16,w*(i===n-1?.68:1),5,'#dce5ee',2)).join('');
function bottle(x,y,scale=1,col='#9bbcb5'){return `<g transform="translate(${x} ${y}) scale(${scale})">${R(0,22,70,110,col,12)}${R(19,0,32,26,'#243d46',5)}${R(8,51,54,47,'#f1f2e7',3)}${T(14,72,'PURE',12,'#314c50',700)}${L(17,83,50,83,'#9caca4')}${`<path d="M8 33V110" stroke="#ffffff" opacity=".3" stroke-width="4"/>`}</g>`;}
function artwork(x,y,w,h,col){return `<g>${R(x,y,w,h,col)}<circle cx="${x+w*.7}" cy="${y+h*.28}" r="${h*.2}" fill="#fff" opacity=".25"/><path d="M${x} ${y+h} L${x+w*.33} ${y+h*.36} L${x+w*.65} ${y+h}Z" fill="#fff" opacity=".24"/>${bottle(x+w*.48,y+h*.32,h/205,'#8ea6a0')}</g>`;}
function render(mode,a,col,tint,j,title){const [a0,a1,a2,a3]=a;let s='';const tag=(x,y,txt)=>R(x,y,180,34,tint,8)+T(x+12,y+23,txt,15,col,650);
const row=(x,y,w,txt,k)=>R(x,y,w,62,'#fff',10,'#e0e7ee')+C(x+25,y+30,11,tint)+T(x+21,y+35,k+1,13,col,700)+T(x+47,y+37,txt,18);
if(mode==='search'){
s=R(100,156,760,398,'#fff',18)+T(133,194,'TÌM KIẾM',13,col,700)+R(133,213,692,52,'#f2f5f9',26)+C(160,238,8,'none')+`<circle cx="160" cy="237" r="8" fill="none" stroke="${col}" stroke-width="2"/>`+L(166,243,174,251,col)+T(188,246,j===0?'giải pháp cho doanh nghiệp':a0,19)+T(135,303,mode==='search'&&title.includes('Ads')?'Được tài trợ · Mẫu quảng cáo':'CHỦ ĐỀ / Ý ĐỊNH TÌM KIẾM',13,'#6a7a8a')+T(135,340,title.includes('Ads')?'Giải pháp phù hợp với nhu cầu của bạn':a1,25,col,650)+lines(135,365,415,2)+tag(135,414,a2)+tag(330,414,a3)+R(636,291,190,184,tint)+T(655,324,'NHÓM TỪ KHÓA',12,col,700)+[a0,a1,a2].map((t,k)=>T(655,360+k*34,t,15)).join('');
}else if(mode==='social'){
s=R(88,152,468,415,'#fff',16)+C(120,185,15,col)+T(148,184,'THƯƠNG HIỆU',15,'#263c50',700)+T(148,203,'Bài đăng minh họa',11,'#758697')+artwork(108,220,428,212,tint)+T(110,466,a0,22,'#24394d',700)+T(110,494,'Thông điệp rõ ràng. Hành động phù hợp.',15)+R(108,511,428,34,col,6)+T(254,534,'Tìm hiểu thêm',14,'#fff',650)+[a1,a2,a3].map((t,k)=>row(588,212+k*91,282,t,k)).join('');
}else if(mode==='video'){
s=R(144,141,243,432,'#16293a',24)+artwork(155,153,221,409,tint)+R(167,171,125,27,'#ffffffcc',6)+T(178,190,title.includes('YouTube')?'VIDEO / 16:9':'VIDEO / 9:16',12,col,700)+C(266,338,30,'#ffffffcc')+`<path d="M258 322L281 338L258 354Z" fill="${col}"/>`+R(168,464,193,65,'#ffffffed',8)+T(181,490,a0,17,'#23364a',700)+T(181,514,'Khám phá ngay →',14,col)+T(450,196,'KỊCH BẢN & SẢN XUẤT',14,col,700)+[a1,a2,a3].map((t,k)=>row(450,217+k*78,343,t,k)).join('')+R(450,475,343,62,'#e9eff5',8)+Array.from({length:9},(_,k)=>R(462+k*36,487,28,37,k%3===j%3?col:tint,4)).join('');
}else if(mode==='shop'){
s=R(93,148,774,422,'#fff',16)+R(111,166,738,40,col,7)+T(130,193,title.includes('Shopee')?'Shopee':title.includes('Lazada')?'Lazada':'BRAND / STORE',19,'#fff',700)+T(585,191,'Danh mục     Tìm kiếm     Giỏ hàng',13,'#fff')+artwork(111,220,295,310,tint)+T(439,252,'BỘ SƯU TẬP / SẢN PHẨM',13,col,700)+T(439,287,a0,26,'#203647',700)+lines(439,309,336,2)+[0,1,2].map(k=>R(440+k*130,363,116,125,'#f4f6f8',8)+bottle(473+k*130,373,.56,k===1?'#d4b79f':k===2?'#afafc9':'#9abbb5')).join('')+T(444,514,a1+' · '+a2,17);
}else if(mode==='editor'){
s=R(87,151,786,416,'#fff',16)+R(105,169,156,379,tint,8)+T(123,203,'NỘI DUNG',13,col,700)+a.map((t,k)=>R(116,222+k*59,133,44,k===1?'#fff':'none',6)+T(126,249+k*59,t,14,k===1?col:'#5a6e80',k===1?700:500)).join('')+T(295,204,a0,14,col,700)+T(295,243,title==='AI Content'?'Bản nháp do AI hỗ trợ':a1,29,'#21394b',700)+R(295,265,543,32,'#f3f6f9',6)+T(309,288,'H1    B    I    ≡    ↗',17,'#718394')+lines(295,322,510,5)+R(295,416,543,52,tint,8)+T(309,448,a2+' → '+a3,18,col,650)+R(661,493,177,42,col,7)+T(692,520,'Gửi duyệt →',17,'#fff',650);
}else if(mode==='chat'||mode==='support'){
s=R(91,151,778,415,'#fff',16)+R(107,168,202,380,'#f0f4f8',8)+T(126,199,mode==='support'?'YÊU CẦU HỖ TRỢ':'HỘP THƯ',13,col,700)+[a0,a1,a2].map((t,k)=>R(118,221+k*78,180,63,k===0?tint:'#fff',7)+C(137,242+k*78,8,col)+T(154,249+k*78,t,13)+lines(132,266+k*78,122,1)).join('')+C(343,189,13,col)+T(369,196,mode==='support'?'Phiếu hỗ trợ / Đang xử lý':'Trợ lý / Hỏi đáp',18,'#22394b',700)+L(326,216,849,216)+R(438,239,385,69,'#eff3f8',12)+T(455,268,mode==='support'?'Tôi cần hỗ trợ về yêu cầu đã gửi.':'Tôi muốn tìm hiểu dịch vụ phù hợp.',16)+T(455,291,'Khách hàng',11,'#7b8a97')+R(333,329,402,104,tint,12)+T(352,358,mode==='support'?'Đã phân loại yêu cầu hỗ trợ.':'Đang tra cứu thông tin được cấp.',17,col,650)+T(352,388,a2,17)+T(352,414,'Có bước chuyển cho nhân viên.',14,'#6c7a8a')+tag(333,453,a3)+R(331,512,493,32,'#f3f6f8',8)+T(347,534,'Nhập nội dung phản hồi…',14,'#8291a0');
}else if(mode==='pipeline'){
s=T(106,173,'QUẢN LÝ / HÀNH TRÌNH',14,col,700)+a.map((t,k)=>R(94+k*197,197,184,340,'#edf2f7',12)+R(106+k*197,211,160,40,k===0?col:tint,7)+T(116+k*197,237,t,14,k===0?'#fff':col,650)+[0,1].map((_,n)=>R(106+k*197,264+n*127,160,110,'#fff',9)+C(125+k*197,285+n*127,8,col)+T(141+k*197,291+n*127,'Hồ sơ mẫu',13,'#42596d',650)+lines(119+k*197,313+n*127,130,2)+R(119+k*197,347+n*127,104,16,tint,4)).join('')).join('');
}else if(mode==='campaign'){
s=R(89,154,478,407,'#fff',15)+T(112,189,'KẾ HOẠCH CHIẾN DỊCH',14,col,700)+T(112,226,'AI hỗ trợ. Đội ngũ quyết định.',24,'#243b4f',700)+[a0,a1,a2].map((t,k)=>R(111,252+k*84,430,69,'#f3f5f9',8)+T(128,277+k*84,t,16,col,700)+lines(128,293+k*84,290,1)).join('')+R(591,178,276,346,tint,16)+T(613,213,'THỬ NGHIỆM THÔNG ĐIỆP',12,col,700)+['Phương án A','Phương án B'].map((t,k)=>R(609,237+k*96,240,78,'#fff',9)+T(626,266+k*96,t,18,'#30465a',700)+lines(626,284+k*96,190,1)).join('')+T(615,480,a3,15,col,650);
}else if(mode==='agent'){
s=R(95,170,248,348,'#fff',15)+T(117,204,a0,19,col,700)+[a1,a2,a3].map((t,k)=>row(108,235+k*77,221,t,k)).join('')+L(345,342,449,342,col,3)+C(499,342,62,tint)+C(499,342,42,col)+T(478,350,'AI',28,'#fff',700)+L(560,342,625,342,col,3)+R(625,222,245,257,'#fff',16)+T(649,256,'KẾT QUẢ',14,col,700)+lines(649,286,190,3)+R(643,358,208,46,tint,8)+T(656,387,'Kiểm tra nguồn trả lời',14,col,700)+T(647,442,'Người phụ trách duyệt',14,'#6d7f90');
}else if(mode==='flow'||mode==='code'||mode==='network'){
s=mode==='code'?R(105,174,422,350,'#182b3c',14)+T(129,210,'CONNECTION / CONFIG',14,'#94d9dc',700)+['{','  source: "'+a0+'",','  auth: "scoped",','  validate: true,','  destination: "'+a2+'"','}'].map((t,k)=>T(129,251+k*34,t,16,k===0||k===5?'#fff':'#aac7d8')).join(''):R(104,193,287,308,'#fff',14)+T(127,228,'KẾT NỐI CÓ QUY TẮC',13,col,700)+[a0,a1].map((t,k)=>row(120,254+k*89,255,t,k)).join('');
s+=L(mode==='code'?527:391,343,573,343,col,3)+a.map((t,k)=>{let x=k%2?738:580,y=k<2?195:395;return L(659,283,659,435,col,2)+R(x-20,y,144,87,k===2?col:'#fff',10)+T(x-6,y+32,'0'+(k+1),12,k===2?'#fff':col,700)+T(x-6,y+61,t,13,k===2?'#fff':'#30485c',650);}).join('');
}else if(mode==='dashboard'||mode==='speed'){
s=R(88,153,784,415,'#fff',15)+T(112,190,mode==='speed'?'KIỂM TRA HIỆU SUẤT':'BÁO CÁO / DỮ LIỆU MINH HỌA',13,col,700)+a.slice(0,3).map((t,k)=>R(111+k*249,209,233,69,tint,8)+T(128+k*249,238,t,17,col,650)+L(128+k*249,258,247+k*249,258,col,4)).join('')+R(111,296,461,235,'#f5f7fa',10)+[0,1,2].map(k=>L(131,335+k*70,549,335+k*70)).join('')+`<path d="M135 481L190 ${420+j%3*8}L244 448L299 374L355 393L409 346L461 364L540 322L540 502L135 502Z" fill="${tint}"/><path d="M135 481L190 ${420+j%3*8}L244 448L299 374L355 393L409 346L461 364L540 322" stroke="${col}" stroke-width="4" fill="none"/>`+R(592,296,254,235,'#f5f7fa',10)+T(612,329,a3,18,'#314a5f',700)+[0,1,2,3].map(k=>R(613,353+k*36,209,18,'#e5ebf2',4)+R(613,353+k*36,95+(k*29+j*13)%105,18,k===1?col:tint,4)).join('');
}else if(mode==='calendar'||mode==='learn'){
s=R(91,154,777,406,'#fff',15)+R(111,174,mode==='learn'?402:486,363,'#f1f5f9',10);
if(mode==='learn')s+=artwork(124,187,376,217,tint)+C(312,293,36,'#ffffffdd')+`<path d="M303 274L327 293L303 312Z" fill="${col}"/>`+T(128,441,'Bài học: '+a0,21,'#243c4f',700)+T(128,475,'Học → Thực hành → Nhận phản hồi',15,col)+lines(128,501,326,1);
else s+=['T2','T3','T4','T5','T6'].map((d,k)=>T(134+k*92,202,d,14,col,700)).join('')+Array.from({length:20},(_,k)=>R(124+(k%5)*92,217+Math.floor(k/5)*74,78,62,(k+j)%4===0?tint:'#fff',6)+T(134+(k%5)*92,239+Math.floor(k/5)*74,k+1,12,'#7a8b9b')+((k+j)%4===0?R(134+(k%5)*92,252+Math.floor(k/5)*74,55,6,col,3):'')).join('');
let x=mode==='learn'?542:617,w=mode==='learn'?299:228;s+=T(x,204,mode==='learn'?'NỘI DUNG THỰC HÀNH':'QUY TRÌNH',13,col,700)+a.map((t,k)=>row(x,226+k*74,w,t,k)).join('');
}else if(mode==='compare'||mode==='wireframe'){
s=[0,1].map(k=>R(103+k*390,159,364,382,'#fff',15)+R(120+k*390,178,330,33,k?col:tint,6)+T(136+k*390,200,a[k],16,k?'#fff':col,700)+R(120+k*390,230,330,106,'#eef3f7',7)+R(140+k*390,250,k?170:122,13,col,3)+lines(140+k*390,282,210,2)+[0,1,2].map(n=>R(120+k*390+n*115,353,100,81,n===k?tint:'#f2f5f8',6)).join('')+R(120+k*390,457,k?330:154,43,col,7)+T(135+k*390,486,a[k+2],16,'#fff',650)).join('');
}else if(mode==='website'){
s=R(94,151,773,414,'#fff',14)+T(117,187,'BRAND / DIGITAL',15,col,700)+T(520,187,a[0]+'   '+a[1]+'   '+a[3],12)+L(109,207,851,207)+T(121,264,'Giá trị rõ ràng.',32,'#253c50',700)+T(121,308,'Trải nghiệm liền mạch.',29,col,700)+lines(122,339,303,3)+R(122,407,179,41,col,7)+T(141,434,'Khám phá giải pháp',15,'#fff',650)+artwork(491,225,353,223,tint)+a.slice(0,3).map((t,k)=>R(115+k*245,470,234,69,'#f0f4f7',6)+T(131+k*245,510,t,17)).join('');
}else if(mode==='audit'||mode==='checklist'){
s=R(104,163,486,383,'#fff',15)+T(129,202,'RÀ SOÁT / TRIỂN KHAI',14,col,700)+a.map((t,k)=>R(123,224+k*70,448,55,k%2?tint:'#f4f6f9',7)+C(146,252+k*70,11,col)+T(140,257+k*70,'✓',14,'#fff',700)+T(173,258+k*70,t,19)).join('')+R(614,210,240,286,tint,16)+T(638,247,'HỒ SƠ CÔNG VIỆC',13,col,700)+lines(638,276,185,4)+R(635,372,196,46,col,8)+T(650,401,'Ưu tiên → Thực hiện',15,'#fff',650)+T(638,465,'Kiểm tra trước bàn giao',13,'#5e7285');
}else if(mode==='map'){
s=R(108,163,741,383,'#e6edf1',15)+Array.from({length:6},(_,k)=>L(115+k*142,170,230+k*117,541,'#fff',16)).join('')+Array.from({length:4},(_,k)=>L(116,210+k*92,849,235+k*75,'#fff',17)).join('')+C(583,329,37,tint)+C(583,329,19,col)+T(574,336,'●',18,'#fff')+R(139,200,301,284,'#fff',13)+T(160,240,'HỒ SƠ DOANH NGHIỆP',14,col,700)+a.map((t,k)=>T(162,285+k*42,t,19)).join('');
}else if(mode==='design'){
s=R(104,164,349,379,'#fff',15)+T(125,201,'NHẬN DIỆN / THIẾT KẾ',14,col,700)+artwork(126,223,305,203,tint)+a.slice(0,3).map((t,k)=>C(141+k*100,463,16,k===0?col:k===1?'#20374a':tint)+T(124+k*100,503,t,12)).join('')+artwork(482,165,194,379,tint)+R(701,165,157,180,col,13)+T(719,212,'BRAND',22,'#fff',700)+T(719,242,'SYSTEM',20,'#fff')+R(701,367,157,177,'#fff',13)+T(718,405,a3,14,col,700)+lines(718,435,112,4);
}else if(mode==='strategy'){
s=R(106,164,747,380,'#fff',16)+T(131,204,'BẢN ĐỒ CHIẾN LƯỢC',15,col,700)+a.map((t,k)=>{const x=130+(k%2)*356,y=229+Math.floor(k/2)*144;return R(x,y,334,126,k===0?tint:'#f2f5f8',10)+T(x+17,y+30,'0'+(k+1),13,col,700)+T(x+17,y+65,t,24,'#283f53',700)+lines(x+17,y+90,272,1);}).join('');
}else if(mode==='funnel'){
s=a.map((t,k)=>{let w=690-k*118,x=480-w/2,y=174+k*89;return `<path d="M${x} ${y}H${x+w}L${x+w-35} ${y+67}H${x+35}Z" fill="${k%2?col:tint}"/>`+T(x+62,y+41,t,22,k%2?'#fff':'#253d51',650);}).join('');
}else if(mode==='journey'){
s=L(151,295,803,295,col,3)+a.map((t,k)=>{const x=115+k*193;return C(x+74,295,28,col)+T(x+65,303,'0'+(k+1),17,'#fff',700)+R(x,347,177,157,'#fff',12)+T(x+15,383,t,17,'#284054',700)+lines(x+15,410,145,3)+T(x+24,247,k===0?'BẮT ĐẦU':k===3?'TIẾP NỐI':'ĐIỂM CHẠM',12,col,700);}).join('');
}else throw Error('Unsupported mode '+mode);
return s;}
const manifest=[];
for(const [i,g]of services.entries()){
 if(briefs[i].length!==g.children.length)throw Error('Brief mismatch '+g.slug);
 for(const [j,c]of g.children.entries()){
 const [mode,subtitle,...labels]=briefs[i][j], [col,tint]=palettes[i];
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640" role="img" aria-labelledby="title desc"><title id="title">${esc(c.title)}</title><desc id="desc">${esc(subtitle+'. '+labels.join(' → ')+'. Giao diện minh họa tác vụ, không phải ảnh chụp sản phẩm thực tế.')}</desc><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="${tint}"/><stop offset="1" stop-color="#cbd8e4"/></linearGradient><filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="13" stdDeviation="16" flood-color="#23394b" flood-opacity=".14"/></filter></defs><g font-family="Segoe UI,Arial,sans-serif">${R(0,0,960,640,'url(#bg)',0)}${C(894,22,202,'#ffffff28')}${T(61,58,c.title,22,'#20384d',700)}${T(61,91,subtitle,17,'#546e83')}${R(746,40,154,28,'#ffffff80',14)}${T(762,59,'POWAI / SOLUTIONS',10,col,700)}<g filter="url(#shadow)">${render(mode,labels,col,tint,j,c.title)}</g>${T(61,604,'MINH HỌA TÁC VỤ / '+labels.join(' → '),11,'#516b7f',600)}</g></svg>`;
 const key=g.slug+'--'+c.slug;await writeFile(out+'/'+key+'.svg',svg);manifest.push({group:g.slug,title:c.title,href:c.href,key,mode,subtitle,labels});
 }
}
await writeFile(out+'/manifest.json',JSON.stringify(manifest,null,2));
console.log('Generated '+manifest.length+' individually specified service illustrations.');

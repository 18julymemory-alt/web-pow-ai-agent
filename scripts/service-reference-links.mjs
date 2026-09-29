import {referencePanel} from './service-reference-panel.mjs';
export function serviceReferences(i,j,title){
let refs=[];
if(i===1&&j===0)refs=[['https://seller.shopee.vn/edu/home','Trung tâm hướng dẫn Shopee (có thể cần đăng nhập)']];
if(i===1&&j===1)refs=[['https://seller-vn.tiktok.com/university/essay?knowledge_id=10008556','TikTok Shop: quản lý sản phẩm']];
if(i===2&&j===3)refs=[['https://developer.wordpress.org/advanced-administration/','Tài liệu quản trị WordPress']];
if(i===2&&[0,1,2,5,6].includes(j))refs=[['https://web.dev/learn/forms/','Hướng dẫn biểu mẫu và kiểm thử web']];
if(i===3&&j===5)refs=[['https://www.facebook.com/business/ads/facebook-instagram-reels-ads','Meta: nội dung Reels và vùng an toàn']];
if(i===4&&j===0)refs=[['https://docs.n8n.io/advanced-ai','Tài liệu n8n: ví dụ cách kết hợp AI và workflow (tùy giải pháp lựa chọn)']];
if(i===5&&j===0)refs=[['https://developers.google.com/analytics/devguides/collection/ga4/events','GA4: thiết lập sự kiện']];
if(i===5&&j===3)refs=[['https://developers.google.com/tag-platform/tag-manager/server-side/intro','GTM: kiến trúc server-side tagging']];
if(i===6)refs=[['https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=vi','Google Search Central: nền tảng SEO']];
if(i===8&&j===1)refs=[['/dich-vu/quang-cao-da-kenh/google-ads/','Xem hướng dẫn Google Ads theo từng định dạng']];
return refs.length?referencePanel(refs):'';
}

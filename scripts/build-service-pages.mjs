import {googleAdsExperiencePage} from './google-ads-experience.mjs';
import {serviceGuide,serviceGroupGuide} from './service-guide-page.mjs';
import {multichannelPage} from './multichannel-guide-page.mjs';
import {googleAdsPage} from './google-ads-page.mjs';
import {productImage} from '../dist/product-images.js';
import {serviceDepth} from './service-depth.mjs';
import {visualCatalog,serviceVisual,tones} from './service-visuals.mjs';
import {adsCatalog,adsDetailVisual} from './ads-catalog.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {services} from '../dist/navigation-data.js';
import {groupContent} from './service-content.mjs';
const root=path.resolve('dist');const home=await readFile(path.join(root,'index.html'),'utf8');
const header=home.match(/<header[\s\S]*?<\/header>/)[0].replaceAll('href="#gateway"','href="/#gateway"').replaceAll('href="#horizon"','href="/#horizon"');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const cta='<section class="detail-contact"><div><span class="page-kicker">BƯỚC TIẾP THEO</span><h2>Bắt đầu từ bài toán của bạn.</h2><p>Chuẩn bị mục tiêu, hiện trạng và nguồn lực để cùng xác định phạm vi phù hợp.</p></div><a class="detail-primary" href="/#horizon">Chuẩn bị trao đổi →</a></section>';
function shell(title,description,content){return `<!doctype html><html lang="vi"><head><meta charset="utf-8">${content.includes('data-google-experience')?'<link rel="icon" type="image/svg+xml" href="/powai-favicon.svg">':''}<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#020812"><title>${esc(title)} | POWAI</title><meta name="description" content="${esc(description)}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/navigation.css"><link rel="stylesheet" href="/service-pages.css"><link rel="stylesheet" href="/service-workspace.css?v=1"><link rel="stylesheet" href="/ads-catalog.css"><link rel="stylesheet" href="/service-visuals.css"><link rel="stylesheet" href="/service-depth.css"><link rel="stylesheet" href="/product-photos.css"></head><body class="service-page">${header}<main id="page-content">${content}${cta}</main><footer class="page-footer"><a href="/#gateway">POWAI</a><span>Marketing × Technology × AI</span><a href="/dich-vu/">Tất cả dịch vụ →</a></footer><script type="module" src="/navigation.js?v=menu-clean-2"></script></body></html>`;}
async function save(url,html){const target=path.join(root,url,'index.html');await mkdir(path.dirname(target),{recursive:true});await writeFile(target,html);}
// The three Google Ads landing pages use their own renderer and stylesheet.
async function buildGoogleAds(){
 const {document_,PAGES}=await import('./google-ads-lp/shared.mjs');
 const {formatsPage,formatsMeta}=await import('./google-ads-lp/page-formats.mjs');
 const {goalsPage,goalsMeta}=await import('./google-ads-lp/page-goals.mjs');
 const {budgetPage,budgetMeta}=await import('./google-ads-lp/page-budget.mjs');
 await save(PAGES[0].href,document_({...formatsMeta,page:'formats',body:formatsPage()}));
 await save(PAGES[1].href,document_({...goalsMeta,page:'goals',body:goalsPage()}));
 await save(PAGES[2].href,document_({...budgetMeta,page:'budget',body:budgetPage()}));
 return 3;
}
// Facebook Ads: the same frame and components, its own content and mocks.
// Built after Google in a full build so Google's generated ids stay stable.
async function buildFacebookAds(){
 const {document_,FB_PAGES}=await import('./google-ads-lp/shared.mjs');
 const {formatsPage,formatsMeta}=await import('./facebook-ads-lp/page-formats.mjs');
 const {goalsPage,goalsMeta}=await import('./facebook-ads-lp/page-goals.mjs');
 const {budgetPage,budgetMeta}=await import('./facebook-ads-lp/page-budget.mjs');
 await save(FB_PAGES[0].href,document_({...formatsMeta,page:'formats',channel:'facebook',body:formatsPage()}));
 await save(FB_PAGES[1].href,document_({...goalsMeta,page:'goals',channel:'facebook',body:goalsPage()}));
 await save(FB_PAGES[2].href,document_({...budgetMeta,page:'budget',channel:'facebook',body:budgetPage()}));
 return 3;
}
// TikTok Ads: the same frame and components, its own content and mocks.
// Built after Facebook in a full build, for the same reason.
async function buildTikTokAds(){
 const {document_,TT_PAGES}=await import('./google-ads-lp/shared.mjs');
 const {formatsPage,formatsMeta}=await import('./tiktok-ads-lp/page-formats.mjs');
 const {goalsPage,goalsMeta}=await import('./tiktok-ads-lp/page-goals.mjs');
 const {budgetPage,budgetMeta}=await import('./tiktok-ads-lp/page-budget.mjs');
 await save(TT_PAGES[0].href,document_({...formatsMeta,page:'formats',channel:'tiktok',body:formatsPage()}));
 await save(TT_PAGES[1].href,document_({...goalsMeta,page:'goals',channel:'tiktok',body:goalsPage()}));
 await save(TT_PAGES[2].href,document_({...budgetMeta,page:'budget',channel:'tiktok',body:budgetPage()}));
 return 3;
}
// Zalo Ads: the same frame and components, its own content and mocks.
// Built after TikTok in a full build, for the same reason.
async function buildZaloAds(){
 const {document_,ZL_PAGES}=await import('./google-ads-lp/shared.mjs');
 const {formatsPage,formatsMeta}=await import('./zalo-ads-lp/page-formats.mjs');
 const {goalsPage,goalsMeta}=await import('./zalo-ads-lp/page-goals.mjs');
 const {budgetPage,budgetMeta}=await import('./zalo-ads-lp/page-budget.mjs');
 await save(ZL_PAGES[0].href,document_({...formatsMeta,page:'formats',channel:'zalo',body:formatsPage()}));
 await save(ZL_PAGES[1].href,document_({...goalsMeta,page:'goals',channel:'zalo',body:goalsPage()}));
 await save(ZL_PAGES[2].href,document_({...budgetMeta,page:'budget',channel:'zalo',body:budgetPage()}));
 return 3;
}
// ChatGPT Ads: the same frame and components, its own content and mocks.
// Built after Zalo in a full build, for the same reason.
async function buildChatGPTAds(){
 const {document_,CG_PAGES}=await import('./google-ads-lp/shared.mjs');
 const {formatsPage,formatsMeta}=await import('./chatgpt-ads-lp/page-formats.mjs');
 const {goalsPage,goalsMeta}=await import('./chatgpt-ads-lp/page-goals.mjs');
 const {budgetPage,budgetMeta}=await import('./chatgpt-ads-lp/page-budget.mjs');
 await save(CG_PAGES[0].href,document_({...formatsMeta,page:'formats',channel:'chatgpt',body:formatsPage()}));
 await save(CG_PAGES[1].href,document_({...goalsMeta,page:'goals',channel:'chatgpt',body:goalsPage()}));
 await save(CG_PAGES[2].href,document_({...budgetMeta,page:'budget',channel:'chatgpt',body:budgetPage()}));
 return 3;
}
// The smaller services: one landing page each (ONE_PAGE_ADS_PLAN.md).
const ONE_PAGE={'instagram-ads':'instagram','youtube-ads':'youtube','remarketing':'remarketing','performance-marketing':'performance','toi-uu-chuyen-doi-quang-cao':'cro'};
// Website & Landing Page: one landing page per service (WEBSITE_LP_PLAN.md).
const WEB_PAGE={'website-doanh-nghiep':'doanh-nghiep','website-ban-hang':'ban-hang','landing-page':'landing-page','wordpress':'wordpress','website-theo-yeu-cau':'theo-yeu-cau','ui-ux':'ui-ux','cro-toi-uu-chuyen-doi':'cro','bao-tri-website':'bao-tri','toi-uu-toc-do':'toc-do','tich-hop-he-thong':'tich-hop'};
async function buildOnePage(slug,dir='one-page-lp',file=ONE_PAGE[slug]){
 const {document_}=await import('./google-ads-lp/shared.mjs');
 const {renderPage,channelOf}=await import('./one-page-lp/render.mjs');
 const P=(await import(`./${dir}/${file}.mjs`)).default;
 const ch=channelOf(P);
 const {CHANNELS}=await import('./google-ads-lp/shared.mjs');
 await save(CHANNELS[ch].pages[0].href,document_({...P.meta,page:'one',channel:ch,body:renderPage(P)}));
 return 1;
}
if(process.argv.includes('--onepage-only')){const only=process.argv.find(a=>a.startsWith('--slug='));let n=0;for(const slug of Object.keys(ONE_PAGE)){if(only&&only.slice(7)!==slug)continue;n+=await buildOnePage(slug);}console.log(`Built ${n} one-page service pages only.`);process.exit(0);}
if(process.argv.includes('--website-only')){const only=process.argv.find(a=>a.startsWith('--slug='));let n=0;for(const [slug,file] of Object.entries(WEB_PAGE)){if(only&&only.slice(7)!==slug)continue;n+=await buildOnePage(slug,'website-lp',file);}console.log(`Built ${n} website service pages only.`);process.exit(0);}
if(process.argv.includes('--chatgpt-only')){await buildChatGPTAds();console.log('Built ChatGPT Ads only.');process.exit(0);}
if(process.argv.includes('--zalo-only')){await buildZaloAds();console.log('Built Zalo Ads only.');process.exit(0);}
if(process.argv.includes('--tiktok-only')){await buildTikTokAds();console.log('Built TikTok Ads only.');process.exit(0);}
if(process.argv.includes('--facebook-only')){await buildFacebookAds();console.log('Built Facebook Ads only.');process.exit(0);}
if(process.argv.includes('--multichannel-only')){let built=0;for(const [j,child] of services[0].children.entries()){if(j===0||['facebook-ads','tiktok-ads','zalo-ads','chatgpt-ads'].includes(child.slug)||ONE_PAGE[child.slug])continue;await save(child.href,shell(child.title,groupContent[0].focus[j],multichannelPage(child,j)));built++;}console.log(`Built ${built} multichannel service pages only.`);process.exit(0);}
if(process.argv.includes('--google-only')){await buildGoogleAds();console.log('Built Google Ads only.');process.exit(0);}
const cards=services.map((g,i)=>`<a class="directory-link" href="${g.href}" data-service-search="${esc(g.children.map(x=>x.title).join(' '))}"><img class="directory-art" src="${productImage(i)}" alt="" width="120" height="74"><div><h2>${esc(g.title)}</h2><p>${esc(groupContent[i].need)}</p></div><b aria-hidden="true">↗</b></a>`).join('');
await save('/dich-vu/',shell('Dịch vụ','Chín nhóm giải pháp Marketing, Công nghệ, AI và đào tạo của POWAI.',`<nav class="breadcrumbs" aria-label="Đường dẫn"><a href="/#gateway">Trang chủ</a><span>/</span><span aria-current="page">Dịch vụ</span></nav><section class="page-intro"><span class="page-kicker">DỊCH VỤ POWAI</span><h1>Chọn giải pháp.<br><em>Kết nối cả hành trình.</em></h1><p>Từ tư vấn đến triển khai, từ marketing đến vận hành. Khám phá nhóm phù hợp với bài toán doanh nghiệp đang cần giải quyết.</p></section><div class="service-finder"><label for="service-query">Anh/chị đang cần giải quyết việc gì?</label><input id="service-query" type="search" placeholder="Ví dụ: website, chatbot, Shopee, đo lường…"><div><button type="button" data-find="">Tất cả</button><button type="button" data-find="Website">Làm website</button><button type="button" data-find="AI">Ứng dụng AI</button><button type="button" data-find="CRM">Quản lý khách hàng</button><button type="button" data-find="Đào tạo">Đào tạo đội ngũ</button></div><p id="service-query-status" role="status"></p></div><div class="service-directory">${cards}</div><script type="module" src="/service-finder.js?v=1"></script>`));
let total=1;
for(const [i,g]of services.entries()){
 const c=groupContent[i];if(g.children.length!==c.focus.length)throw Error('Content mismatch '+g.slug);
 const breadcrumb=`<a href="/#gateway">Trang chủ</a><span>/</span><a href="/dich-vu/">Dịch vụ</a>`;
 const visual=`<figure class="page-art"><img src="${productImage(i)}" alt="Minh họa ${esc(g.title)}" width="360" height="220"><figcaption>POWAI / ${esc(g.title)}</figcaption></figure>`;
 const choices=g.children.map((child,j)=>`<a class="service-row" href="${child.href}"><span>${String(j+1).padStart(2,'0')}</span><div><h3>${esc(child.title)}</h3><p>${esc(c.focus[j])}</p></div><b aria-hidden="true">↗</b></a>`).join('');
 const process=`<section class="page-section"><div class="section-title"><span class="page-kicker">CÁCH PHỐI HỢP</span><h2>${i===8?'Từ mục tiêu học đến ứng dụng.':'Một quy trình có đầu ra rõ ràng.'}</h2></div><ol class="page-process">${c.steps.map((step,j)=>`<li><span>0${j+1}</span><p>${esc(step)}</p></li>`).join('')}</ol></section>`;
 await save(g.href,shell(g.title,c.intro,`<nav class="breadcrumbs" aria-label="Đường dẫn">${breadcrumb}<span>/</span><span aria-current="page">${esc(g.title)}</span></nav><section class="page-intro with-art"><div><span class="page-kicker">${i===8?'POWAI ACADEMY':'GIẢI PHÁP POWAI'}</span><h1>${esc(g.title)}</h1><p>${esc(c.intro)}</p><a class="detail-primary" href="#services">${i===8?'Khám phá chương trình':'Khám phá dịch vụ'} ↓</a></div>${visual}</section><section id="services" class="page-section"><div class="section-title"><span class="page-kicker">${g.children.length} ${i===8?'CHƯƠNG TRÌNH':'DỊCH VỤ'}</span><h2>${i===0?'Mỗi kênh, một cách kết nối.':'Chọn nội dung bạn quan tâm.'}</h2>${i===0?'<p class="catalog-intro">Khám phá cách quảng cáo xuất hiện trên từng kênh và vai trò trong hành trình khách hàng.</p>':''}</div>${i===0?adsCatalog(g,c,esc):visualCatalog(g,c,i,esc)}</section>${process}`));total++;
 await save(g.href,shell(g.title,c.intro,serviceGroupGuide(i,g,c,i===0?adsCatalog(g,c,esc):visualCatalog(g,c,i,esc))));
 for(const [j,child]of g.children.entries()){
  if(i===0&&j===0){total+=await buildGoogleAds();continue;}
  if(i===0&&child.slug==='facebook-ads'){total+=await buildFacebookAds();continue;}
  if(i===0&&child.slug==='tiktok-ads'){total+=await buildTikTokAds();continue;}
  if(i===0&&child.slug==='zalo-ads'){total+=await buildZaloAds();continue;}
  if(i===0&&child.slug==='chatgpt-ads'){total+=await buildChatGPTAds();continue;}
  if(i===0&&ONE_PAGE[child.slug]){total+=await buildOnePage(child.slug);continue;}
  if(i===0){await save(child.href,shell(child.title,c.focus[j],multichannelPage(child,j)));total++;continue;}
  if(g.slug==='website-landing-page'&&WEB_PAGE[child.slug]){total+=await buildOnePage(child.slug,'website-lp',WEB_PAGE[child.slug]);continue;}
  if(i>0){await save(child.href,shell(child.title,c.focus[j],serviceGuide(i,child,j,c)));total++;continue;}
  const related=g.children.filter(x=>x!==child).slice(0,4).map(x=>`<a href="${x.href}">${esc(x.title)} <span>↗</span></a>`).join('');
  const detailVisual=`<figure class="page-art detailed-service-art" style="--channel-color:${tones[i]}">${i===0?adsDetailVisual(j):serviceVisual(i,child,j)}<figcaption>${esc(child.title)} / ${i===8?'CHƯƠNG TRÌNH THỰC HÀNH':'MINH HỌA GIẢI PHÁP'}</figcaption></figure>`;
  const content=`<nav class="breadcrumbs" aria-label="Đường dẫn">${breadcrumb}<span>/</span><a href="${g.href}">${esc(g.title)}</a><span>/</span><span aria-current="page">${esc(child.title)}</span></nav><section class="page-intro with-art"><div><a class="page-kicker" href="${g.href}">${esc(g.title)}</a><h1>${i===8&&!child.title.startsWith('Đào tạo')?'Đào tạo ':''}${esc(child.title)}</h1><p>${esc(c.focus[j])}</p><div class="page-actions"><a class="detail-primary" href="/#horizon">Trao đổi nhu cầu →</a><a href="#scope">${i===8?'Nội dung & đầu ra':'Phạm vi triển khai'} ↓</a></div></div>${detailVisual}</section><section id="scope" class="scope-grid"><div><span class="page-kicker">BÀI TOÁN PHÙ HỢP</span><h2>${i===8?'Học để áp dụng vào công việc.':'Bắt đầu từ nhu cầu cụ thể.'}</h2><p>${esc(c.need)}</p><div class="scope-focus"><h3>Trọng tâm ${esc(child.title)}</h3><p>${esc(c.focus[j])}</p></div></div><aside><span class="page-kicker">ĐẦU RA DỰ KIẾN</span><ul>${c.outputs.map(o=>`<li>${esc(o)}</li>`).join('')}</ul><p class="scope-note">Phạm vi, thời gian và đầu ra được thống nhất sau khi khảo sát nhu cầu.</p></aside></section>${serviceDepth(i,child,c.focus[j],esc)}${process}<section class="preparation"><h2>Chuẩn bị trước buổi trao đổi</h2><p>${i===8?'Vai trò người học, kiến thức hiện có, mục tiêu ứng dụng và thời gian dự kiến.':'Mục tiêu kinh doanh, kênh hoặc hệ thống đang dùng, khó khăn hiện tại và nguồn lực dự kiến.'}</p></section><section class="related-services"><span class="page-kicker">CÙNG NHÓM ${esc(g.title)}</span><div>${related}</div></section>`;
  await save(child.href,shell(child.title,c.focus[j],content));total++;
 }
}
console.log(`Generated ${total} service pages from shared navigation data.`);


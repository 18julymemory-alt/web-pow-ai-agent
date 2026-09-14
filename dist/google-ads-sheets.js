// Progressive enhancement: retain all readable content when JS is unavailable.
const guide=document.querySelector('.ga-guide');
const sections=[
 ['overview','Tổng quan',['#ga-overview']],
 ['goals','Mục tiêu',['#ga-planning']],
 ['formats','Cách chạy',['#ga-formats']],
 ['demographics','Độ tuổi & giới tính',['#ga-demographics']],
 ['audiences','Tệp đối tượng',['#ga-audiences']],
 ['compare','Thế mạnh',['#ga-comparison']],
 ['budget','Ngân sách & thuế',['#ga-budget-plan','#ga-costs']],
 ['measure','Đo hiệu quả',['.ga-metrics']],
 ['delivery','Triển khai & hỏi đáp',['#ga-scope','#ga-faq']]
];
const workspace=document.createElement('div');workspace.className='ga-sheet-workspace';workspace.id='ga-sheets';
const heading=document.createElement('div');heading.className='ga-sheet-heading';heading.innerHTML='<span class="page-kicker">TRA CỨU GOOGLE ADS</span><h2>Bạn muốn tìm hiểu điều gì?</h2><p>Chọn một mục để xem. Bạn có thể chuyển mục bất cứ lúc nào.</p>';workspace.append(heading);
const nav=document.createElement('div');nav.className='ga-sheet-tabs';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Chủ đề Google Ads');workspace.append(nav);
guide.querySelector('.ga-jump').replaceWith(workspace);
const entries=sections.map(([key,title,selectors],index)=>{const button=document.createElement('button');button.type='button';button.id='sheet-tab-'+key;button.textContent=title;button.setAttribute('role','tab');button.setAttribute('aria-controls','sheet-'+key);nav.append(button);const panel=document.createElement('div');panel.id='sheet-'+key;panel.className='ga-sheet-panel';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);panel.tabIndex=0;selectors.forEach(s=>{const n=guide.querySelector(s);if(n)panel.append(n);});workspace.append(panel);return{key,button,panel};});
function selectSheet(entry,{scroll=false,focus=false}={}){entries.forEach(e=>{const active=e===entry;e.button.setAttribute('aria-selected',String(active));e.button.tabIndex=active?0:-1;e.panel.hidden=!active;});if(focus)entry.button.focus();if(scroll)workspace.scrollIntoView({block:'start'});}
entries.forEach((e,i)=>{e.button.addEventListener('click',()=>{selectSheet(e,{scroll:true});history.replaceState(null,'','#'+e.panel.id);});e.button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%entries.length;if(event.key==='ArrowLeft')next=(i+entries.length-1)%entries.length;if(event.key==='Home')next=0;if(event.key==='End')next=entries.length-1;if(next!==undefined){event.preventDefault();selectSheet(entries[next],{focus:true});history.replaceState(null,'','#'+entries[next].panel.id);}});});
function revealTarget(target,scroll=true){const entry=entries.find(e=>e.panel===target||e.panel.contains(target));if(entry)selectSheet(entry);const campaign=target.closest('.ga-format-panel');if(campaign){const id=campaign.getAttribute('aria-labelledby');document.querySelectorAll('.ga-format-buttons [role=tab]').forEach(t=>{const active=t.id===id;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});}for(let n=target.parentElement;n;n=n.parentElement)if(n.tagName==='DETAILS')n.open=true;if(scroll)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}
function followHash(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const target=document.getElementById(id);if(target)revealTarget(target);}
selectSheet(entries[0]);followHash();window.addEventListener('hashchange',followHash);
guide.addEventListener('click',event=>{const a=event.target.closest('a[href^="#"]');if(!a)return;const target=document.getElementById(a.hash.slice(1));if(target){event.preventDefault();history.pushState(null,'',a.hash);revealTarget(target);}});

export async function startRealSpace(isPaused) {
  const stage = document.querySelector('#universe');
  const status = document.querySelector('#status');
  const response = await fetch('./assets/nasa-sources.json');
  if (!response.ok) throw new Error('Không tải được thông tin ảnh NASA.');
  const sources = await response.json();
  stage.className = 'photographic-space';
  const images = sources.map((source, i) => {
    const image = new Image();
    image.alt = '';
    image.decoding = 'async';
    image.className = 'orbital-photo';
    image.style.opacity = i === 0 ? '1' : '0';
    image.style.objectPosition = source.position || '50% 50%';
    if (i === 0) image.fetchPriority = 'high';
    image.src = source.local;
    stage.append(image);
    return image;
  });
  await images[0].decode();
  const credit = document.createElement('a');
  credit.className = 'image-credit';
  credit.target = '_blank';
  credit.rel = 'noopener noreferrer';
  document.body.append(credit);
  const sections = [...document.querySelectorAll('.chapter')];
  const copies = [...document.querySelectorAll('.copy')];
  const dots = [...document.querySelectorAll('#chapters a')];
  const names = ['CỬA SỔ CUPOLA','TRÁI ĐẤT','GÓC NHÌN MỚI','HỆ SINH THÁI','QUẢNG CÁO','WEBSITE','AI & TỰ ĐỘNG HÓA','CỘNG ĐỒNG','DỮ LIỆU & CHIẾN LƯỢC','ĐỒNG HÀNH','LỘ TRÌNH','CHÂN TRỜI MỚI'];
  let positions=[], target=0, current=0, pointerX=0, pointerY=0;
  let previous=performance.now(), chapter=-1, photo=-1, frame=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
  function onScroll(){
    let index=0;
    while(index<positions.length-1&&scrollY>=positions[index+1])index++;
    const span=index===11?innerHeight:positions[index+1]-positions[index];
    target=Math.min(11,index+(scrollY-positions[index])/span);
    document.querySelector('#progress').style.width=(clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))*100)+'%';
  }
  function measure(){positions=sections.map(s=>s.offsetTop);onScroll();}
  function attribution(index){
    const source=sources[index];
    credit.href=source.source;
    credit.textContent=source.credit+' · '+source.label+' ↗';
    credit.setAttribute('aria-label','Xem nguồn ảnh: '+source.label);
  }
  function draw(now){
    frame=requestAnimationFrame(draw);
    const dt=Math.min((now-previous)/1000,.05);previous=now;
    if(document.hidden)return;
    const paused=isPaused()||reduced.matches;
    current=paused?target:current+(target-current)*(1-Math.exp(-dt*7));
    const index=Math.min(11,Math.floor(current));
    const fraction=current-index;
    // Three authentic photographs; pans stay inside the photograph, with no invented geometry.
    const first=smooth(2.5,3.2,current),second=smooth(7.5,8.2,current);
    const weights=[1-first,first*(1-second),second];
    images.forEach((image,i)=>{
      image.style.opacity=weights[i].toFixed(4);
      const local=clamp(i===0?current/3:i===1?(current-3)/5:(current-8)/3);
      const scale=paused?1.035:1.04+local*.065;
      const x=paused?0:pointerX*8;
      const y=paused?0:pointerY*5+(local-.5)*12;
      image.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`;
    });
    const visible=weights.indexOf(Math.max(...weights));
    if(visible!==photo){photo=visible;attribution(photo);}
    if(index!==chapter){
      chapter=index;
      document.querySelector('#location').textContent=String(index+1).padStart(2,'0')+' / '+names[index];
      dots.forEach((dot,i)=>{if(i===index)dot.setAttribute('aria-current','step');else dot.removeAttribute('aria-current');});
    }
    copies.forEach((copy,i)=>{
      const opacity=paused?1:(i===index?(index===11?1:1-smooth(.58,.95,fraction)):0);
      copy.style.opacity=opacity;
      copy.style.visibility=opacity>.01?'visible':'hidden';
      copy.style.transform=paused?'none':`translateY(${i===index?-fraction*14:0}px)`;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',measure);
  addEventListener('pointermove',event=>{pointerX=event.clientX/innerWidth-.5;pointerY=event.clientY/innerHeight-.5;},{passive:true});
  document.addEventListener('visibilitychange',()=>{previous=performance.now();});
  addEventListener('pagehide',()=>cancelAnimationFrame(frame),{once:true});
  measure();current=target;attribution(0);status.textContent='';
  requestAnimationFrame(draw);
  // Keep the first image as a usable fallback if a subsequent download fails.
  images.slice(1).forEach((image,i)=>image.decode().catch(()=>{
    image.src=images[0].src;
    sources[i+1]=sources[0];
    if(photo===i+1)attribution(i+1);
    status.textContent='Một ảnh chưa tải được. Đang giữ góc nhìn Cupola.';
  }));
}

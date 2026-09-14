export async function startCinematic(paused){
 const root=document.querySelector('#universe');root.className='cinematic-stage';
 const image=new Image();image.src='./assets/powai-scenes.png';await image.decode();
 const dedicated={};
 const manifest=await fetch('./assets/scene-overrides.json').then(r=>r.ok?r.json():{}).catch(()=>({}));
 await Promise.all(Object.entries(manifest).map(async([key,url])=>{const img=new Image();img.src=url;try{await img.decode();dedicated[key]=img.src;}catch{console.warn('Dedicated scene unavailable',key);}}));
 const layers=[0,1].map(()=>{const e=document.createElement('div');e.className='scene-layer';e.style.backgroundImage=`url(${image.src})`;root.append(e);return e;});
 const sections=[...document.querySelectorAll('.chapter')],copies=[...document.querySelectorAll('.copy')],dots=[...document.querySelectorAll('#chapters a')];
 let starts=[],progress=0,target=0,last=performance.now(),pointer=[0,0],active=-1;
 const clamp=x=>Math.max(0,Math.min(1,x));
 function measure(){starts=sections.map(s=>s.offsetTop);const width=Math.max(innerWidth,innerHeight*4/3);layers.forEach(e=>{e.style.width=width+'px';e.style.height=width*.75+'px';});scroll();}
 function scroll(){let i=0;while(i<11&&scrollY>=starts[i+1])i++;target=Math.min(11,i+(scrollY-starts[i])/(i===11?innerHeight:starts[i+1]-starts[i]));document.querySelector('#progress').style.width=clamp(scrollY/(document.documentElement.scrollHeight-innerHeight))*100+'%';}
 function draw(now){requestAnimationFrame(draw);const dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden)return;progress=paused()?target:progress+(target-progress)*(1-Math.exp(-7*dt));let i=Math.floor(progress),f=progress-i;const blend=clamp((f-.68)/.32);layers.forEach((e,k)=>{let n=Math.min(11,i+k);if(e.dataset.scene!==String(n)){e.dataset.scene=String(n);e.style.backgroundImage=`url(${dedicated[n]||image.src})`;e.style.backgroundSize=dedicated[n]?'cover':'300% 400%';e.style.backgroundPosition=dedicated[n]?'center':`${(n%3)*50}% ${Math.floor(n/3)*100/3}%`;}e.style.opacity=k?blend:1;e.style.transform=`translate(-50%,-50%) translate(${paused()?0:pointer[0]*8}px,${paused()?0:pointer[1]*5}px) scale(${paused()?1.02:1.025+f*.035})`;});copies.forEach((e,n)=>{const visible=n===i||paused();e.style.opacity=visible?(paused()?1:1-clamp((f-.64)/.3)):0;e.style.visibility=visible?'visible':'hidden';});if(active!==i){active=i;document.querySelector('#location').textContent=sections[i].querySelector('.eyebrow').textContent;dots.forEach((d,n)=>{if(n===i)d.setAttribute('aria-current','step');else d.removeAttribute('aria-current');});}}
 addEventListener('scroll',scroll,{passive:true});addEventListener('resize',measure);addEventListener('pointermove',e=>pointer=[e.clientX/innerWidth-.5,e.clientY/innerHeight-.5],{passive:true});measure();progress=target;document.querySelector('#status').textContent='';requestAnimationFrame(draw);
}

export async function createServiceUniverse(paused){
 const host=document.querySelector('#service-universe');
 const T=await import('./vendor/three.module.js');
 const renderer=new T.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));host.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(40,1,.1,200);camera.position.set(0,12,28);camera.lookAt(0,0,0);
 scene.add(new T.AmbientLight(0xacc9e6,1.5));const light=new T.PointLight(0xe9f8ff,90,80,1);light.position.set(0,3,0);scene.add(light);
 const texture=new T.TextureLoader().load('./assets/earth.jpg');texture.colorSpace=T.SRGBColorSpace;
 const specs=[['ads','Quảng cáo',0xffaa55],['web','Website',0x5dc7ff],['ai','AI Agent',0xb58bff],['social','Social Media',0xff80c9],['data','Dữ liệu',0x68e9df],['data','Chiến lược',0xffde95]];
 const targets=[],labels=[];const core=new T.Mesh(new T.SphereGeometry(1.5,48,32),new T.MeshStandardMaterial({color:0x5ad3ff,emissive:0x075d89,emissiveIntensity:1.1,metalness:.5,roughness:.3}));scene.add(core);
 specs.forEach(([id,name,color],i)=>{const a=i*Math.PI/3;const sphere=new T.Mesh(new T.SphereGeometry(i===2?.82:1,48,32),new T.MeshStandardMaterial({map:texture,color,roughness:.7,metalness:.1}));sphere.position.set(Math.cos(a)*8,0,Math.sin(a)*5);sphere.userData={id,name,index:i};scene.add(sphere);targets.push(sphere);const points=[];for(let k=0;k<=120;k++){const angle=k/120*Math.PI*2;points.push(new T.Vector3(Math.cos(angle)*(5+i*.6),-.3,Math.sin(angle)*(3+i*.4)));}scene.add(new T.Line(new T.BufferGeometry().setFromPoints(points),new T.LineBasicMaterial({color,transparent:true,opacity:.18})));const button=document.createElement('button');button.className='world-label';button.textContent=name+' ↗';button.setAttribute('aria-label','Khám phá giải pháp '+name);button.onclick=()=>visit(sphere);host.append(button);labels.push(button);});
 const coreLabel=document.createElement('span');coreLabel.className='core-label';coreLabel.textContent='POWAI';host.append(coreLabel);
 let flight=null,last=performance.now(),visible=false;const observer=new IntersectionObserver(entries=>visible=entries[0].isIntersecting);observer.observe(host);
 function visit(sphere){if(flight)return;host.setAttribute('aria-busy','true');flight={start:performance.now(),from:camera.position.clone(),to:sphere.position.clone().add(new T.Vector3(0,3,6)),point:sphere.position.clone(),id:sphere.userData.id};if(paused())finish();}
 function finish(){const id=flight.id;flight=null;host.removeAttribute('aria-busy');document.getElementById(id).scrollIntoView({behavior:paused()?'instant':'smooth'});camera.position.set(0,12,28);camera.lookAt(0,0,0);}
 const ray=new T.Raycaster();renderer.domElement.addEventListener('click',event=>{const b=renderer.domElement.getBoundingClientRect();ray.setFromCamera(new T.Vector2((event.clientX-b.left)/b.width*2-1,-(event.clientY-b.top)/b.height*2+1),camera);const hit=ray.intersectObjects(targets)[0];if(hit)visit(hit.object);});
 function size(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}new ResizeObserver(size).observe(host);size();
 const v=new T.Vector3();function positionLabel(el,pos){v.copy(pos).project(camera);el.style.left=(v.x*.5+.5)*host.clientWidth+'px';el.style.top=(-v.y*.5+.5)*host.clientHeight+'px';}
 function frame(now){requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.05);last=now;if(!visible||document.hidden)return;if(!paused())targets.forEach(s=>s.rotation.y+=dt*.08);if(flight){const t=Math.min(1,(now-flight.start)/850),e=t*t*(3-2*t);camera.position.lerpVectors(flight.from,flight.to,e);camera.lookAt(flight.point.clone().multiplyScalar(e));if(t===1)finish();}targets.forEach((s,i)=>positionLabel(labels[i],s.position.clone().add(new T.Vector3(0,-1.5,0))));positionLabel(coreLabel,core.position);renderer.render(scene,camera);}requestAnimationFrame(frame);
}


import {createMeteors} from './meteors.js';
export async function createSolarExplorer(paused){
 const T=await import('./vendor/three.module.js');
 const shell=document.createElement('section');shell.id='solar-explorer';shell.setAttribute('aria-label','Khám phá hệ Mặt Trời');shell.innerHTML='<div class="solar-heading"><p>POWAI / SPACE EXPLORER</p><h2 id="solar-title">Hệ Mặt Trời</h2><span id="solar-description">Chọn hành tinh để bay đến · Kéo để xoay · Cuộn để phóng to</span></div><div class="solar-actions"><button id="solar-overview">Toàn cảnh hệ Mặt Trời</button><button id="solar-close">Về website POWAI ↗</button></div><div class="solar-labels"></div><nav class="planet-picker" aria-label="Chọn hành tinh"></nav><p class="solar-scale">Kích thước và khoảng cách được điều chỉnh để dễ khám phá · Quỹ đạo minh họa, không phải vị trí thời gian thực.</p><a class="solar-credit" href="./assets/solar/CREDITS.txt" target="_blank" rel="noopener">Nguồn bản đồ bề mặt ↗</a>';
 document.body.append(shell);document.body.classList.add('solar-integrated');const trigger=document.createElement('button');trigger.hidden=true;
 const renderer=new T.WebGLRenderer({alpha:false,antialias:true});shell.prepend(renderer.domElement);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.outputColorSpace=T.SRGBColorSpace;
 const scene=new T.Scene();scene.background=new T.Color(0x02040a);const camera=new T.PerspectiveCamera(47,1,.05,1800);
 scene.add(new T.AmbientLight(0xc5d4ee,.7));const sunlight=new T.PointLight(0xfff1d8,3,0,0);scene.add(sunlight);
 const data=[['sun','Mặt Trời',5,0,0],['mercury','Sao Thủy',.75,10,.2],['venus','Sao Kim',1.15,14,2.4],['earth','Trái Đất',1.25,18,4.1],['mars','Sao Hỏa',.95,23,5.9],['jupiter','Sao Mộc',3.2,31,1],['saturn','Sao Thổ',2.7,40,3.2],['uranus','Sao Thiên Vương',2,48,5.2],['neptune','Sao Hải Vương',1.95,56,2]];
 const descriptions=['Ngôi sao ở trung tâm hệ Mặt Trời.','Hành tinh gần Mặt Trời nhất.','Hành tinh thứ hai tính từ Mặt Trời.','Ngôi nhà của chúng ta, hành tinh thứ ba.','Hành tinh đỏ, phía ngoài quỹ đạo Trái Đất.','Hành tinh lớn nhất trong hệ Mặt Trời.','Hành tinh khí khổng lồ với hệ vành đai nổi bật.','Hành tinh băng khổng lồ thứ bảy.','Hành tinh xa Mặt Trời nhất trong tám hành tinh.'];
 const loader=new T.TextureLoader(),bodies=[],buttons=[],labels=[];
 await Promise.all(data.map(async([id,name,radius,distance,angle],index)=>{const map=await loader.loadAsync(id==='earth'?'./assets/earth.jpg':'./assets/solar/'+id+'.jpg');map.colorSpace=T.SRGBColorSpace;map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());const mat=index===0?new T.MeshBasicMaterial({map}):new T.MeshStandardMaterial({map,roughness:1,metalness:0});const mesh=new T.Mesh(new T.SphereGeometry(radius,80,48),mat);mesh.position.set(Math.cos(angle)*distance,0,Math.sin(angle)*distance);mesh.userData={index,radius};scene.add(mesh);bodies[index]=mesh;
 if(distance){const p=[];for(let i=0;i<=240;i++){const a=i/240*Math.PI*2;p.push(new T.Vector3(Math.cos(a)*distance,0,Math.sin(a)*distance));}scene.add(new T.Line(new T.BufferGeometry().setFromPoints(p),new T.LineBasicMaterial({color:0x667e99,transparent:true,opacity:0})));}
 }));
 const {addNearby}=await import('./nearby.js');
 const nearby=await addNearby(T,scene,bodies[3]);
 nearby.forEach(item=>{const index=data.length;data.push([item.id,item.name,item.radius,0,0]);descriptions.push(item.description);item.body.userData={index,radius:item.radius};bodies.push(item.body);});
 const sunCorona=new T.Mesh(new T.SphereGeometry(5.35,80,48),new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,vertexShader:'varying vec3 n;varying vec3 v;void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',fragmentShader:'varying vec3 n;varying vec3 v;void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(v))),2.8);gl_FragColor=vec4(1.,.48,.09,rim*.58);}'}));bodies[0].add(sunCorona);
 const earthCloudMap=await loader.loadAsync('./assets/clouds.png');
 const earthClouds=new T.Mesh(new T.SphereGeometry(1.258,96,64),new T.MeshPhongMaterial({map:earthCloudMap,transparent:true,opacity:.23,depthWrite:false,blending:T.AdditiveBlending}));bodies[3].add(earthClouds);
 const earthRim=new T.Mesh(new T.SphereGeometry(1.275,96,64),new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,vertexShader:'varying vec3 n;varying vec3 v;void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',fragmentShader:'varying vec3 n;varying vec3 v;void main(){float f=pow(1.-abs(dot(normalize(n),normalize(v))),4.);gl_FragColor=vec4(.1,.35,.8,f*.42);}'}));bodies[3].add(earthRim);
 const ringTex=await loader.loadAsync('./assets/solar/rings.png');ringTex.colorSpace=T.SRGBColorSpace;const rg=new T.RingGeometry(3.5,6,128);const uv=rg.attributes.uv,pos=rg.attributes.position;for(let i=0;i<uv.count;i++){const r=Math.hypot(pos.getX(i),pos.getY(i));uv.setXY(i,(r-3.5)/2.5,.5);}const ring=new T.Mesh(rg,new T.MeshBasicMaterial({map:ringTex,side:T.DoubleSide,transparent:true,depthWrite:false,opacity:.85}));ring.rotation.x=-Math.PI/2+.38;bodies[6].add(ring);
 let seed=17;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};const p=[];for(let i=0;i<2800;i++){const a=random()*Math.PI*2,z=random()*2-1,r=500;p.push(Math.cos(a)*Math.sqrt(1-z*z)*r,z*r,Math.sin(a)*Math.sqrt(1-z*z)*r);}const sg=new T.BufferGeometry();sg.setAttribute('position',new T.Float32BufferAttribute(p,3));scene.add(new T.Points(sg,new T.PointsMaterial({size:.5,color:0xb6c9e2})));
 let open=false,selected=-1,yaw=0,pitch=.18,distance=125,flight=null,drag=null,moved=0,last=performance.now();const center=new T.Vector3(),goal=new T.Vector3();
 function pose(){return center.clone().add(new T.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch)).multiplyScalar(distance));}
 function choose(index,instant=false){selected=index;goal.copy(index<0?new T.Vector3():bodies[index].position);if(index>=0)goal.add(new T.Vector3(innerWidth<700?0:-data[index][2]*.65,data[index][2]*.12,0));const nextDistance=index<0?(innerWidth<700?340:145):data[index][2]*(index===6?6:index>=10?5:3.4);flight={from:center.clone(),to:goal.clone(),distanceFrom:distance,distanceTo:nextDistance,start:performance.now(),instant};shell.querySelector('#solar-title').textContent=index<0?'Hệ Mặt Trời':data[index][1];shell.querySelector('#solar-description').textContent=index<0?'Chọn hành tinh để bay đến · Kéo để xoay · Cuộn để phóng to':descriptions[index]+' Kéo để quan sát từ nhiều phía.';buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));shell.dataset.selected=index<0?'overview':data[index][0];document.querySelectorAll('.nearby-space button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.target===shell.dataset.selected)));}
 data.forEach(([id,name],i)=>{const b=document.createElement('button');b.textContent=name;b.onclick=()=>choose(i);shell.querySelector('.planet-picker').append(b);buttons.push(b);const label=document.createElement('button');label.textContent=name;label.className='solar-label';label.onclick=()=>choose(i);shell.querySelector('.solar-labels').append(label);labels.push(label);});
 const nearBar=document.createElement('div');nearBar.className='nearby-space';nearBar.setAttribute('aria-label','Mặt Trăng và tàu vũ trụ');nearBar.innerHTML='<span class="nearby-caption">MẶT TRĂNG & TÀU VŨ TRỤ</span>';
 nearby.forEach((item,j)=>{const b=document.createElement('button');b.type='button';b.textContent=item.name;b.dataset.target=item.id;b.onclick=()=>{yaw=.3;pitch=.2;choose(9+j);};nearBar.append(b);});document.body.append(nearBar);
 function setOpen(){open=true;shell.hidden=false;resize();choose(3,true);}
 shell.querySelector('#solar-close').remove();shell.querySelector('#solar-overview').onclick=()=>choose(-1);trigger.onclick=()=>setOpen(true);addEventListener('keydown',e=>{if(e.key==='Escape'&&open)setOpen(false);});
 document.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(link&&link.getAttribute('href')==='#gateway')choose(3);});
 function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();if(selected<0)distance=innerWidth<700?340:145;}addEventListener('resize',resize);
 const canvas=renderer.domElement;canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};moved=0;canvas.setPointerCapture(e.pointerId);flight=null;});canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;moved+=Math.abs(dx)+Math.abs(dy);yaw-=dx*.005;pitch=Math.max(-1.35,Math.min(1.35,pitch+dy*.005));drag={x:e.clientX,y:e.clientY};});const ray=new T.Raycaster();canvas.addEventListener('pointerup',e=>{if(moved<6){const rect=canvas.getBoundingClientRect();ray.setFromCamera(new T.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);const hit=ray.intersectObjects(bodies,true)[0];if(hit){let target=hit.object;while(target&&target.userData.index===undefined)target=target.parent;if(target)choose(target.userData.index);}}drag=null;});canvas.addEventListener('pointercancel',()=>drag=null);canvas.addEventListener('wheel',e=>{if(!e.ctrlKey&&!explore)return;e.preventDefault();zoom(Math.exp(e.deltaY*.002));},{passive:false});
 let explore=false,showLabels=false;
 const zoomBar=document.createElement('div');zoomBar.className='space-zoom';zoomBar.innerHTML='<button id="zoom-out" aria-label="Thu nhỏ để thấy các hành tinh khác">−</button><button id="space-explore" aria-pressed="false">Khám phá không gian</button><button id="zoom-in" aria-label="Phóng gần hành tinh">+</button><button id="sun-home" aria-label="Đến Mặt Trời">☀ Mặt Trời</button><button id="earth-home" aria-label="Về cận cảnh Trái Đất">↶</button>';
 document.body.append(zoomBar);
 function zoom(factor){flight=null;distance=Math.max(selected<0?12:data[selected][2]*2.25,Math.min(450,distance*factor));const focus=selected<0?new T.Vector3():bodies[selected].position.clone();const t=T.MathUtils.smoothstep(distance,12,110);center.copy(focus).lerp(new T.Vector3(),t);if(selected>=0)center.add(new T.Vector3(innerWidth<700?0:-data[selected][2]*.65*(1-t),data[selected][2]*.12*(1-t),0));}
 zoomBar.querySelector('#zoom-out').onclick=()=>zoom(1.55);zoomBar.querySelector('#zoom-in').onclick=()=>zoom(1/1.55);zoomBar.querySelector('#earth-home').onclick=()=>choose(3);zoomBar.querySelector('#sun-home').onclick=()=>{yaw=0;pitch=.12;choose(0);};
 zoomBar.querySelector('#space-explore').onclick=event=>{explore=!explore;document.body.classList.toggle('space-exploring',explore);event.currentTarget.setAttribute('aria-pressed',String(explore));event.currentTarget.textContent=explore?'Cuộn để zoom · Thoát':'Khám phá không gian';};
 const labelToggle=document.createElement('button');labelToggle.textContent='Hiện tên hành tinh';labelToggle.setAttribute('aria-pressed','false');labelToggle.onclick=()=>{showLabels=!showLabels;labelToggle.setAttribute('aria-pressed',String(showLabels));labelToggle.textContent=showLabels?'Ẩn tên hành tinh':'Hiện tên hành tinh';};shell.querySelector('.solar-actions').append(labelToggle);
 // Presentation time is accelerated; these are circular illustrative orbits, not ephemerides.
 let orbitTime=0;
 const localOffsets=nearby.map(item=>item.body.position.clone().sub(bodies[3].position));
 const orbitAxis=new T.Vector3(0,1,0),movingOffset=new T.Vector3();
 function advanceOrbits(dt){
  orbitTime+=dt;
  for(let i=1;i<=8;i++){
   const radius=data[i][3],angle=data[i][4]+orbitTime*.018*Math.pow(18/radius,1.5);
   bodies[i].position.set(Math.cos(angle)*radius,0,Math.sin(angle)*radius);
  }
  nearby.forEach((item,j)=>{
   // Voyager follows a display flight path, not an Earth orbit.
   if(j===3){item.body.position.copy(bodies[3].position).add(localOffsets[j]);item.body.position.addScaledVector(localOffsets[j],orbitTime*.002);return;}
   const rate=[.075,.12,.095][j];
   movingOffset.copy(localOffsets[j]).applyAxisAngle(orbitAxis,orbitTime*rate);
   item.body.position.copy(bodies[3].position).add(movingOffset);
   if(j===0)item.body.rotation.y=orbitTime*rate;
  });
 }
 function followGoal(target,zoomed=false){
  if(selected<0)return target.set(0,0,0);
  const weight=zoomed?1-T.MathUtils.smoothstep(distance,12,110):1;
  return target.copy(bodies[selected].position).add(new T.Vector3(innerWidth<700?0:-data[selected][2]*.65,data[selected][2]*.12,0)).multiplyScalar(weight);
 }
 const meteors=createMeteors(T,scene),gateway=document.getElementById('gateway');
 const vector=new T.Vector3();function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;if(!open||document.hidden)return;if(!paused())advanceOrbits(dt);if(flight){followGoal(flight.to);const t=paused()||flight.instant?1:Math.min(1,(now-flight.start)/1400),e=t*t*(3-2*t);center.lerpVectors(flight.from,flight.to,e);distance=T.MathUtils.lerp(flight.distanceFrom,flight.distanceTo,e);if(t===1)flight=null;}else{followGoal(center,true);}camera.position.copy(pose());camera.lookAt(center);camera.updateMatrixWorld();bodies.forEach((body,i)=>{if(!paused()&&i<9)body.rotation.y+=dt*(i===2?-.012:.025);vector.copy(body.position);vector.y+=data[i][2]+1;vector.project(camera);const visible=showLabels&&vector.z<1&&Math.abs(vector.x)<.96&&Math.abs(vector.y)<.75&&(selected<0||selected===i);labels[i].hidden=!visible;labels[i].style.left=(vector.x*.5+.5)*innerWidth+'px';labels[i].style.top=(-vector.y*.5+.5)*innerHeight+'px';});shell.dataset.distance=distance.toFixed(2);shell.dataset.orbitTime=orbitTime.toFixed(3);const gatewayRect=gateway.getBoundingClientRect();shell.dataset.meteorCount=String(meteors.update(dt,camera,gatewayRect.top<=innerHeight*.2&&gatewayRect.bottom>innerHeight*.6,paused()));renderer.render(scene,camera);}const mapCopy=document.querySelector('#universe-map .copy');
 const controls=document.createElement('div');controls.className='inline-solar-controls';
 controls.append(shell.querySelector('.solar-actions'),shell.querySelector('.planet-picker'));
 controls.remove();
 const hint=document.createElement('p');hint.className='inline-solar-note';hint.textContent='Chọn một hành tinh để bay đến · Kéo vùng không gian để xoay · Quỹ đạo chạy với tốc độ minh họa; kích thước và khoảng cách được điều chỉnh';hint.remove();
 resize();setOpen();requestAnimationFrame(frame);
}









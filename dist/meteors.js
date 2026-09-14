// Sparse background streaks; pooled geometry, depth-tested against the planets.
export function createMeteors(T,scene){
 const group=new T.Group();scene.add(group);
 const direction=new T.Vector3(-.94,-.34,0).normalize();
 const meteors=Array.from({length:2},()=>{
  const positions=new Float32Array(24*3),colors=new Float32Array(24*3);
  for(let i=0;i<24;i++){const glow=Math.pow(1-i/23,1.6);colors.set([glow*.72,glow*.87,glow],i*3);}
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(positions,3));geometry.setAttribute('color',new T.BufferAttribute(colors,3));
  const material=new T.LineBasicMaterial({vertexColors:true,transparent:true,opacity:0,depthWrite:false,depthTest:true,blending:T.AdditiveBlending});
  const line=new T.Line(geometry,material);line.frustumCulled=false;line.visible=false;group.add(line);
  return {line,positions,age:0,duration:1.4,start:new T.Vector3(),speed:30,length:11};
 });
 let untilNext=.9,seed=173;
 const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 return {update(dt,camera,enabled,paused){
  group.visible=enabled;if(!enabled)return 0;
  group.position.copy(camera.position);group.quaternion.copy(camera.quaternion);
  if(!paused){
   untilNext-=dt;
   if(untilNext<=0){const m=meteors.find(m=>!m.line.visible);if(m){const height=Math.tan(camera.fov*Math.PI/360)*180,width=height*camera.aspect;m.start.set(width*(.25+random()*.55),height*(.42+random()*.35),-180);m.age=0;m.duration=1.15+random()*.45;m.speed=24+random()*13;m.length=7+random()*5;m.line.visible=true;}untilNext=5+random()*4;}
   for(const m of meteors){if(!m.line.visible)continue;m.age+=dt;const t=m.age/m.duration;if(t>=1){m.line.visible=false;continue;}m.line.material.opacity=Math.sin(Math.PI*t)*.68;for(let i=0;i<24;i++){const travel=m.age*m.speed-i/23*m.length;m.positions[i*3]=m.start.x+direction.x*travel;m.positions[i*3+1]=m.start.y+direction.y*travel;m.positions[i*3+2]=m.start.z;}m.line.geometry.attributes.position.needsUpdate=true;}
  }
  return meteors.filter(m=>m.line.visible).length;
 }};
}

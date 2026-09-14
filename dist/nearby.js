export async function addNearby(T,scene,earth){
 const {GLTFLoader}=await import('./vendor/loaders/GLTFLoader.js');
 const {DRACOLoader}=await import('./vendor/loaders/DRACOLoader.js');const draco=new DRACOLoader().setDecoderPath('./vendor/draco/');const loader=new GLTFLoader().setDRACOLoader(draco);const texture=await new T.TextureLoader().loadAsync('./assets/solar/moon.jpg');texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=8;
 const moon=new T.Mesh(new T.SphereGeometry(.34,96,64),new T.MeshStandardMaterial({map:texture,roughness:1}));moon.position.copy(earth.position).add(new T.Vector3(-3,.85,-.7));scene.add(moon);
 const result=[{id:'moon',name:'Mặt Trăng',radius:.34,body:moon,description:'Vệ tinh tự nhiên của Trái Đất. Bề mặt phủ các hố va chạm.'}];
 const craft=[['iss','Trạm ISS',.52,[1.9,.65,1.15],'Trạm vũ trụ quốc tế. Mô hình NASA; vị trí và kích thước hiển thị được điều chỉnh.'],['shuttle','Tàu con thoi',.38,[-1.75,-.6,1.5],'Tàu con thoi Space Shuttle của NASA, tái hiện để khám phá; không phải nhiệm vụ đang hoạt động.'],['voyager','Voyager',.4,[8,2,-6],'Tàu thăm dò Voyager. Mô hình NASA; được đưa gần lại để quan sát, không thể hiện vị trí thực.']];
 for(const[id,name,radius,offset,description]of craft){const gltf=await loader.loadAsync('./assets/craft/'+id+'.glb');const model=gltf.scene;const box=new T.Box3().setFromObject(model),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());const factor=radius*2/Math.max(size.x,size.y,size.z);model.position.copy(center).multiplyScalar(-factor);model.scale.setScalar(factor);const group=new T.Group();group.add(model);group.position.copy(earth.position).add(new T.Vector3(...offset));group.rotation.set(id==='iss'?.65:.25,id==='iss'?.55:-.6,id==='iss'?1.15:.15);scene.add(group);result.push({id,name,radius,body:group,description});}
 draco.dispose();return result;
}



import {services} from './navigation-data.js';
export const groupPhotoKeys=services.map(g=>g.slug);
export function productImage(i,title=''){
 const group=services[i];
 const child=title?group.children.find(c=>c.title===title):group.children[0];
 if(!child)throw new Error('Missing service illustration: '+group.slug+' / '+title);
 return '/assets/service-products/'+group.slug+'--'+child.slug+'.svg';
}
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
export function productPhoto(i,title,j=0){return `<div class="catalog-scene product-photo" data-photo-key="${services[i].children[j].slug}"><img src="${productImage(i,title)}" alt="${escape(title)} — minh họa giao diện và tác vụ" width="960" height="640" loading="lazy" decoding="async"></div>`;}

import {services} from './navigation-data.js';
import {productImage} from './product-images.js';
export const menuImages=Object.fromEntries(services.map((g,i)=>[g.slug,productImage(i)]));

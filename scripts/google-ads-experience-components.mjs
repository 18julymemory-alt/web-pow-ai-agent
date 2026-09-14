import {replicaDemo,expandedReplica} from './google-ads-replica.mjs';
import {sources} from '../dist/google-ads-experience-data.js';
export const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const sourceLinks=keys=>`<div class="gx-sources">${keys.map(k=>{const [id,label]=sources[k];return `<a href="https://support.google.com/google-ads/answer/${id}?hl=vi" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;}).join('')}</div>`;
export const cards=items=>`<div class="gx-cards">${items.map(([a,b],i)=>`<article><small>0${i+1}</small><h3>${esc(a)}</h3><p>${esc(b)}</p></article>`).join('')}</div>`;
export const note=(title,text)=>`<aside class="gx-note"><strong>${esc(title)}</strong><p>${esc(text)}</p></aside>`;
export const detail=rows=>`<div class="gx-details">${rows.map(([a,b])=>`<details><summary>${esc(a)}</summary><p>${esc(b)}</p></details>`).join('')}</div>`;
export const next=(label,target,text)=>`<div class="gx-next"><p>${esc(text)}</p><a href="#sheet-${target}">${esc(label)} →</a></div>`;
export const heading=(eyebrow,title,description)=>`<div class="gx-heading"><span class="page-kicker">${esc(eyebrow)}</span><h2>${esc(title)}</h2><p>${esc(description)}</p></div>`;
export const flow=(items,cls='')=>`<ol class="gx-flow ${cls}">${items.map((x,i)=>`<li data-step="${i}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(x)}</strong></li>`).join('')}</ol>`;
export const table=(caption,headers,rows)=>`<div class="gx-table-scroll" tabindex="0" role="region" aria-label="${esc(caption)}"><table><caption>${esc(caption)}</caption><thead><tr>${headers.map(t=>`<th scope="col">${esc(t)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((x,i)=>i===0?`<th scope="row">${esc(x)}</th>`:`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const motion=(title,body,count=5)=>`<figure class="gx-motion sheet-visual" data-motion data-phase="0" data-count="${count}"><figcaption><span>${esc(title)}</span><small>MÔ PHỎNG · KHÔNG PHẢI TÀI KHOẢN THẬT</small><button type="button" class="gx-motion-control" aria-pressed="false">Tạm dừng</button></figcaption>${body}<div class="gx-progress" aria-hidden="true">${Array.from({length:count},(_,i)=>`<i data-step="${i}"></i>`).join('')}</div></figure>`;
export function searchDemo(query='dịch vụ thiết kế website'){return replicaDemo('search',query);}
export function campaignDemo(c){return c.demoType==='search'?searchDemo('dịch vụ thiết kế website'):c.demoType==='shopping'?replicaDemo('shopping'):expandedReplica(c);}
export const ratioAssets=assets=>`<div class="gx-asset-board">${assets.map(([ratio,label,desc])=>`<article><div class="gx-ratio ${ratio==='9:16'?'portrait':ratio==='1:1'?'square':''}"><span>${esc(ratio)}</span></div><strong>${esc(label)}</strong><p>${esc(desc)}</p></article>`).join('')}</div>`;

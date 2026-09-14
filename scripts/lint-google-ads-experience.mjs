// Static checks for this dependency-free JS project. No TypeScript or package lint task exists.
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {campaignTypes,marketData,billingConfig,sheetNav,sources,rsaLimits,trackingItems,faq} from '../dist/google-ads-experience-data.js';
const files=['scripts/google-ads-experience.mjs','scripts/google-ads-experience-components.mjs','scripts/build-service-pages.mjs','dist/google-ads-experience-data.js','dist/google-ads-experience.js'];
for(const f of files){const check=spawnSync(process.execPath,['--check',f],{encoding:'utf8'});assert.equal(check.status,0,check.stderr);const text=readFileSync(f,'utf8');assert(!/\beval\s*\(|new Function\s*\(/.test(text),'Dynamic code prohibited: '+f);assert(!/\son(?:click|mouseover|load)=/.test(text),'Inline handlers prohibited: '+f);assert(!/[ \t]+$/m.test(text),'Trailing whitespace: '+f);}
assert.equal(sheetNav.length,9);assert.equal(campaignTypes.length,6);assert.equal(new Set(campaignTypes.map(x=>x.id)).size,6);
for(const c of campaignTypes){for(const field of ['id','title','description','bestFor','howItWorks','inputs','outputs','ctaExamples','trackingRequirements','demoType'])assert(c[field]?.length,'Missing '+field+' in '+c.id);for(const key of c.sourceKeys)assert(sources[key],'Missing source '+key);}
for(const key of['vietnamPopulation','internetUsers','googleReachMetric'])if(marketData[key]!==null)assert(marketData.source&&marketData.lastUpdated&&marketData.metricDefinition,'Missing market provenance');
if(billingConfig.taxRate!==null)assert(billingConfig.source&&billingConfig.lastUpdated,'Missing billing provenance');
assert.equal(rsaLimits.headline,30);assert.equal(trackingItems.length,9);assert(faq.length>=10&&faq.length<=15);
const css=readFileSync('dist/google-ads-experience.css','utf8');assert(css.includes('prefers-reduced-motion'));assert(!/@import|@font-face/.test(css),'No new font or external CSS');
console.log('PASS static lint: syntax, unsafe code/inline handlers, whitespace, content schema, data provenance, motion/font boundaries. Typecheck: not applicable (no TypeScript).');


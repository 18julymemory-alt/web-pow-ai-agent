import {writeFile} from 'node:fs/promises';
import {renderMock, MOCK_IDS} from './google-ads-lp/mocks.mjs';
const w = process.argv[2] || '620';
const cells = MOCK_IDS.map(id => `<div class="cell" style="width:${w}px"><p>${id}</p><div class="stage" data-anim><div class="device">${renderMock(id)}</div></div></div>`).join('');
await writeFile(`dist/__ga-visuals/mk-${w}.html`, `<!doctype html><html lang="vi"><head><meta charset="utf-8"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/google-ads-lp.css"><style>body{background:#07111f;margin:0;padding:20px}.gal{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start}.cell>p{color:#fff;font:12px monospace;margin:0 0 4px}</style></head><body class="ga-lp"><div class="gal">${cells}</div></body></html>`);

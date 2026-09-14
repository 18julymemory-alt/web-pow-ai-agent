# Google Ads interactive reference

## Scope
Only `/dich-vu/quang-cao-da-kenh/google-ads/` uses this experience. Existing menu, header, footer, font assets, service routes and other service pages remain unchanged.

## Files and architecture
- `dist/google-ads-experience-data.js`: campaignTypes, goals, marketData, billingConfig, segments, funnel, trackingItems, eventMapping, kpis, implementation, preparation, FAQ and official source references.
- `scripts/google-ads-experience-components.mjs`: reusable native diagrams, SearchJourney, CampaignTypeDemo, asset ratio samples, tables, disclosures and motion wrappers.
- `scripts/google-ads-experience.mjs`: nine sheet renderers, unchanged contact form extraction and legacy anchor map.
- `dist/google-ads-experience.js`: tabs, keyboard/hash routing, selectors, safe text preview, mathematical calculator, market data validation and visibility-aware motion scheduler.
- `dist/google-ads-experience.css`: Google Ads scoped styles and responsive/reduced-motion rules.
- `scripts/build-service-pages.mjs`: routes Google Ads through the new renderer; `--google-only` limits generated output to this page.
- `dist/dich-vu/quang-cao-da-kenh/google-ads/index.html`: generated output.

## Components and demos
Google ecosystem, SearchJourney, eight-goal flow, seven CampaignTypeDemo variants, demographic empty-state charts, location selector, AudienceFunnel, remarketing examples, CTA-by-intent selector, BudgetCalculator, TrackingArchitecture, KPI diagnostic and ImplementationTimeline. Native HTML/CSS/JS; no additional runtime library, external video or MP4.

Each motion block can pause independently. One scheduler advances only visible blocks; hidden sheets, offscreen blocks, background documents and reduced-motion preferences stop movement. Nine outer tabs and seven campaign tabs support keyboard selection and deep links. Old anchors resolve to the corresponding sheet/campaign.

## Data policy
`marketData` starts empty. Verified values require source, lastUpdated and metricDefinition before rendering. Population, internet users, platform reach and estimated audience are different concepts. No age percentages or reach values are invented.

Budget inputs start empty. Daily budget times selected days is a mathematical planning scenario, not Google's billing limit or a result forecast. Leads use the visitor's hypothetical CPL. Optional tax is a user-entered amount, not an asserted tax rate. Contact form remains UI-only with disabled submission.

Platform descriptions link to official Google Help; reviewed 2026-09-14. Account eligibility, available controls and announced migrations can change.

## Validation
Run from the repository root with the local preview listening on 4173:

    node scripts/lint-google-ads-experience.mjs
    node scripts/build-service-pages.mjs --google-only
    node scripts/test-google-ads-experience.cjs

The browser test uses the existing local Playwright/Edge installation. It checks nine tabs at widths 1440, 768, 390 and 320; seven campaign formats; every goal/segment/funnel/tracking/KPI/timeline selection; budget boundaries; safe text preview; keyboard controls; old/new anchors; pause, offscreen and reduced motion; duplicate IDs; no JavaScript errors; and the session's pre-change dist hash baseline.

Existing `.sites-runtime/check-multichannel.cjs` also passes for eight other ad pages at desktop/mobile widths. Older Google-only visual tests target superseded DOM and sample assumptions; the new suite covers the new structure and retained contracts.

No TypeScript project or package lint command exists. Static lint checks JavaScript syntax, unsafe patterns, content schemas, source provenance and style boundaries. Build and all above browser checks passed. Visual review covered desktop Search and campaign layouts plus mobile tracking. No production deployment or real ad/account connection performed.

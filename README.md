# POWAI — Interactive orbital website

The active version uses a continuous Three.js Earth environment with day/night surface maps, cloud layer and atmospheric rim. AI-generated scene backgrounds are no longer loaded. The 12 technology-content sections remain, with full-screen anchor navigation and camera flights between viewpoints.

Navigation updates the URL hash and supports browser back/forward. Service category buttons change the visible description and provide a link to the brief section. The previous miniature six-planet widget is replaced by six readable destination controls. Background pointer drag adjusts the camera angle. Reduced-motion preference and the motion button are respected.

Run node serve.mjs and open http://127.0.0.1:4173. This revision is local; the old hosted version has not been republished.

Validation: Playwright on headless Edge checked all 12 desktop headings at 1440x1000 and all 12 mobile headings at 390x844, no horizontal overflow, service selection response and no page errors. Desktop and mobile screenshots inspected. Test script and screenshots are under ignored .sites-runtime.

Boundaries: this is a 3D reconstruction using Earth imagery, not live NASA footage. Marketing metrics come from the supplied plan and are marked for confirmation. Case studies await verified project content. The contact brief downloads locally and does not send a lead.

Three.js 0.170.0: MIT, license retained. Earth imagery uses the Three.js example assets already in the project. Older artwork remains unused in the asset directory.

## Solar explorer update

The gateway now opens a Sun + eight-planet overview. Planet meshes and labels are selectable; the camera flies to the selection. Drag rotates the view and mouse-wheel changes distance. Overview returns to all bodies. The POWAI website remains accessible via the close button and header links; a persistent button reopens exploration.

Planetary distances, radii and orbital phases are illustrative, not scientific scale or ephemeris. Planet maps downloaded from https://github.com/sanketsingh24/webgl-textures (credited there to Planet Pixel Emporium); exact credit retained in dist/assets/solar/CREDITS.txt. Earth uses existing project texture. No Solar System Scope textures were successfully downloaded or integrated.

Validation: Playwright selected Sun and all eight planets, verified active buttons, overview, close/reopen, and mobile overflow with no page errors. Desktop and mobile screenshots were visually inspected. Scripts and screenshots are in ignored .sites-runtime.

## Inline integration
The solar system now renders directly as the background of the existing POWAI website. There is no separate explorer screen or return-to-website flow. The section 04 service links remain above the visible solar system; Sun + eight planet selectors and overview are embedded in that same section. Normal scrolling and header navigation remain active. Ctrl + wheel zooms the background; plain wheel scrolls the website.
Validation: checked inline content visibility, nine selectors, Saturn selection, service navigation, and mobile horizontal bounds. Desktop screenshot inspected.

## Service pages

The local service directory now has 110 statically generated pages: one directory, nine groups, and 100 service/training details. Rebuild with `node scripts/build-service-pages.mjs`. Navigation taxonomy remains in `dist/navigation-data.js`; editorial content is in `scripts/service-content.mjs`. The existing homepage Hero and 3D files were preserved.

The preview server resolves directory URLs to index.html and serves SVG artwork with its MIME type. Service CTAs return to the existing local brief at /#horizon. POW AI and Blog routes remain outside this implementation and have not been built. No deployment was performed.

Validation: all 110 URLs return HTML; browser checks covered each group and first child, artwork loading, mobile menu navigation, breadcrumb structure and the CTA return to the homepage. Protected homepage/3D hashes were checked unchanged.

## Illustrated service catalog
All nine group catalogs now include visual service cards. All 100 child pages show a context-specific illustration instead of the shared group icon. Templates are maintained in scripts/service-visuals.mjs and scripts/ads-catalog.mjs; styling is in dist/service-visuals.css and dist/ads-catalog.css. Illustrative UI and diagrams are labeled and do not represent client results. Rebuild using the same service-page generator.
Validation: all child illustrations and group card counts checked in a browser; all URLs respond, representative mobile pages for every group have no horizontal overflow, CTA returns to the homepage, and protected homepage source hashes remain unchanged.

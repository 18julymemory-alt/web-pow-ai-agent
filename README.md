# POWAI — Orbital Journey

A real WebGL / Three.js scroll-driven 3D homepage. Twelve scenes occupy one continuous camera corridor, with an Earth surface and clouds, observation deck, orbital station, solar foundry, digital city, neural cathedral, social connections, navigation room and flight path.

Run `node serve.mjs` and open http://127.0.0.1:4173. Publish the `dist` directory as a static site. No build step required.

Motion can be paused, reduced-motion preferences are respected, navigation works with keyboard and touch. If WebGL fails, the content remains readable. The final brief tool only downloads text locally; it sends no lead or message.

Project names come from the supplied concept; no verified case outcomes or testimonials are asserted. Architectural shapes are procedural 3D geometry, not final bespoke production GLB art. The original mockup is visual reference only.

Three.js 0.170.0, MIT: https://github.com/mrdoob/three.js/tree/r170
Earth textures from its example planet textures: https://github.com/mrdoob/three.js/tree/r170/examples/textures/planets
Font: Be Vietnam Pro via Google Fonts; Arial fallback when offline.

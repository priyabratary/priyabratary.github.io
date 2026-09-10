# AirHero About — Tailwind CSS

Open `index.html` for the About page or `cooling.html` for the Cooling service page. You can also serve this directory with `python3 -m http.server 4173`.
The shipped `styles.css` is already compiled; no JavaScript framework, CDN, build step, or network connection is needed to render the page. Navigation to the live homepage requires internet access.

## Files

- `index.html`: About page with its Cooling and Services links connected to `cooling.html`.
- `cooling.html`: Cooling service detail page with compact hero, 65/35 content and form layout, service details, problem list, repair-versus-replace guidance, FAQ, CTA, and the shared footer treatment.
- `src/input.css`: Tailwind 4 theme, component styles, responsive rules, and motion.
- `styles.css`: compiled production stylesheet.
- `app.js`: reusable `<air-counter>` component, icons, viewport reveals, and accessible mobile menu.
- `assets/`: local fonts, existing AirHero branding, homepage crew photo, and generated sample photos.
- `image-prompts.json`: exact prompts used with the built-in image-generation tool.

To rebuild after edits: `npm install`, then `npm run build`.

## Homepage match

Inspected https://better-ideas-965815.framer.app/ on September 10, 2026. Reused its logo, mascot, crew image, Clash Display and Plus Jakarta Sans font assets, pill buttons, rounded containers, and line-icon treatment.

Tokens: primary blue #0F5CA0, yellow #FAD604, brief-specified red #C92A39, exact homepage dark navy #062743, secondary homepage blue #0B4172, light background #F3F7FB, homepage muted blue #91B4D3 and soft blue #B5CCE2. Desktop H1 is 54px/600 and H2 is 52px/600; smaller breakpoints scale down.

This is a standalone Tailwind implementation, not an edit to the live Framer project. The navigation is a Tailwind recreation of the published navigation. The homepage Blog and Faqs labels currently have no destinations; they remain noninteractive text rather than linking to nonexistent pages.

The published homepage's `Footer Content` node is empty, and its footer shows an emergency-service bar over a crew photo with empty placeholder bands. This preview recreates that emergency bar and backdrop in a compact form; it does not claim to reuse an editable Framer footer component. For native Framer integration, place the About content between the project's actual shared Header and Footer components. No invented address or social accounts were added.

## Content to confirm before publishing

The team identities/roles and statistics come from the supplied brief. They are sample content, not independently verified business facts. Replace the four generated portraits with real staff photos, confirm their names/roles, and confirm the 40+, 5,000+, 4.9 and 24/7 figures and service guarantees before launch. The service photo is also generated; the hero crew image, logo, and mascot are reused from the existing homepage.

Booking links lead to the existing homepage using a text fragment targeting “Get a Free HVAC Quote”; service links target “Total home comfort.” Text-fragment support depends on the browser; unsupported browsers still open the homepage. Replace these with permanent anchors or a confirmed booking URL when the live site has them. Phone links use tel:+18046660176.

## Behavior and validation

- Desktop at 1280px: hero including header is 470px; counters/services/team use 4/6/4 columns.
- Tablet at 820px: counters 2×2, services 3×2, team 2×2; mobile navigation.
- Mobile at 390px: stacked content, compact 2-column services and team, 2×2 counters.
- No horizontal overflow observed at these widths. All images loaded.
- Mobile menu opening, Escape closing, and Meet Our Team anchor navigation checked.
- Counters animate once at 30% visibility over 1.6 seconds with cubic ease-out. 24/7 fades up without numeric animation.
- Native phone links, skip link, semantic headings, descriptive alt text, visible keyboard focus, and reduced-motion CSS/fallback are included.
- JavaScript syntax and Tailwind compilation passed.

The Cooling quote card uses native HTML validation and submits to the existing AirHero homepage. During Framer integration, connect it to the project’s native form destination so the entered values are captured.

No changes have been published to the live site.

# Chaus / Rice Coffeehouse

A responsive website built with React, TypeScript, and Vite. Cream paper tones, emerald accents, illustrated squirrels and drinks, and Coffeehouse photography.

## Run locally

```sh
npm install
npm run dev
```

The development server is running at http://localhost:5173. For a production build, run `npm run build`; deploy the `dist` directory. `npm run preview` serves the production build locally. `npm test` checks Houston opening-hours boundaries, daylight saving time, and combined menu filters.

The build produces an HTML entry for each route with page-specific search and sharing metadata, a sitemap, robots.txt, and a 404 page. Vercel routing and Netlify redirects are included. Other static hosts should serve each route's `index.html`, redirect legacy paths, and use `404.html` for unknown URLs.

Production URLs default to `https://coffeehouse.rice.edu`. Set the `SITE_URL` environment variable when building for a different domain. Publish the `dist` directory through a static host; the Vite development and preview servers are for local use. Optimized WebP illustrations are included in the production output; source PNGs remain in the workspace.

Run `npm run check` before deployment to test the application logic, compile the production build, and verify route entries, metadata, asset references, sitemap, and the not-found page.

## What's included

- Illustrated homepage with live regular-hours status in America/Chicago, highlighted drinks, community notices, sustainability, and visit information.
- All 51 published menu items, every published size and price, extras, category/search/temperature/caffeine-free filters, printable full menu, and favorites stored in the visitor's browser.
- Drink details with size selection, temperature options, prices, and published dietary notes.
- Three-question drink finder.
- Catering drink planner covering 13 published drinks and three container options, quantity controls, subtotals, downloadable request text, copy action, and email drafts. Published bakery boxes and official invoice instructions are also included.
- Story, managers, sustainability, community, visit/contact, visitor information, and privacy pages.
- Direct official links for KOC applications, vouchers, posters, Espresso Yourself, After Dark, social media, catering invoices, directions, phone, and email.
- Accessible native modal dialogs, keyboard navigation, visible focus states, labeled form controls, skip navigation, reduced-motion support, and responsive layouts.
- Locally hosted fonts and photos; no image hotlinks or font CDN needed at runtime.

## Content sources and dates

Reviewed October 12, 2026:

| Original feature | New location | Source |
| --- | --- | --- |
| Hours | Home and Visit | [Homepage](https://coffeehouse.rice.edu/) and [Contact](https://coffeehouse.rice.edu/contact/) |
| Complete menu and prices | `/menu` | [Published menu](https://coffeehouse.rice.edu/menu/) |
| Catering menu, rates, invoice and IDT process | `/catering` | [Catering](https://coffeehouse.rice.edu/catering/) |
| Chaus story and KOCs | `/about` | [About](https://coffeehouse.rice.edu/about/) |
| Management roster | `/managers` | [Managers](https://coffeehouse.rice.edu/managers/), explicitly identified as 2024–2025 |
| Sustainability and Bean Fund | `/sustainability` | [Sustainability](https://coffeehouse.rice.edu/sustainability/) |
| Phone, address, email, posters and vouchers | `/visit`, `/community` | [Contact](https://coffeehouse.rice.edu/contact/) |
| Applications, vouchers, After Dark and social links | `/community`, navigation, footer | [Official social hub](https://linktr.ee/RiceCoffeehouse) |
| Legacy COVID page | `/policies` | [Original policies](https://coffeehouse.rice.edu/covid/) |

The official social hub links the Fall 2026 KOC application; direct inspection now confirms it is closed. Hiring calls to action link the social hub for the next round. The voucher form is also closed, so voucher actions prepare an email inquiry. The older website's application page still mentions Spring 2026; the new site uses the social hub's link. Application deadlines remain in the official form.

The public Instagram profile embed was accessible during the second design pass. Six recent posts, the Google Form squirrel artwork, merchandise photography, and the Fall 2026 schedule informed the illustrated redesign. Sunday hours now close at 10 pm. See `references/visual-direction.md` for direct sources and `references/imagegen-prompts.json` for all generated-asset prompts and saved paths. Four new transparent illustrations were created with the built-in image_gen tool. Original social artwork appears with links to its source and an explicit September-October 2026 date range.

## Operational notes

- This is a static frontend. Individual orders happen in person, as the existing site describes. No fake checkout or order confirmation is shown.
- Contact tools create reviewed email drafts. Catering requests use the official invoice and actual published catering email. No message is sent automatically.
- The catering total is the drink subtotal before applicable fees/taxes. Container capacities, pickup details, current availability, bakery boxes, and final pricing must be confirmed with the team. The planner does not guess container capacities or invent fees.
- Hours reflect the Fall 2026 Instagram schedule, including Sunday's 10 pm close. The UI explicitly notes exceptions during breaks and holidays. No live availability API is connected.
- Menu prices are the published prices reviewed on the date above. Seasonal posters and descriptions are presented separately without invented prices. Updating `src/data.ts` updates menu content, rates, team information, and official links.
- Manager information is visibly archived to its published academic year. Older COVID information is linked and identified as undated rather than presented as current guidance.
- Saved favorites use only browser local storage and can be cleared from `/policies`. They do not contain personal information or leave the visitor's device.
- Replace or update semester announcements, manager roster, prices, and any expired external form links before an official launch.

## Original wording

The user confirmed permission to reuse the original site copy. Expandable sections preserve the story, partner descriptions, menu wording and prices, catering instructions, sustainability programs, and complete June 7, 2020 Bean Fund statement. The complete dated management roster appears on its own page. Older hours, voucher notices, hiring notices, and COVID-era policies are kept under Past Updates on the visitor information page. Repeated navigation, duplicated partner text, and instructions tied to the old hover layout are omitted.

`references/original-site-copy.json` records the reviewed source blocks. `references/build-original-copy.py` builds `src/originalCopy.json`, which `src/OriginalCopy.tsx` renders as native keyboard-accessible disclosure sections with source links. The old menu's dot leaders become responsive price rows while retaining its words and prices. Current Fall 2026 hours remain separate from archived website hours.

## Files

- `src/main.tsx`: navigation, pages, interactive components.
- `src/Illustrations.tsx`: original squirrel, coffee, pastry, flower, and star vector artwork.
- `src/data.ts`: menu, published catering prices, manager roster, and official links.
- `src/logic.mjs`: testable Houston-time status and menu filtering.
- `src/styles.css`, `src/chaus-theme.css`, `src/chaus-v2.css`: responsive base, refreshed illustrated theme, local fonts, and print styles.
- `public/images`: photos from the existing site.
- `public/fonts`: Google Fonts DM Sans, Fraunces, Bricolage Grotesque, and Kalam, distributed under their accompanying SIL Open Font Licenses.

## Verification

- Production TypeScript and Vite build passed.
- Unit tests passed for schedule boundaries, daylight saving time, and combined filters.
- Browser verification covered desktop and phone layouts; all nine pages were checked at 320 px without document overflow.
- Browser interactions verified mobile navigation, search, favorite persistence, drink details, Escape-to-close, quiz branching, catering container/quantity/add/remove totals, and contact draft preparation.

No deployment or changes to the live Rice website have been performed.

The site consumes optimized WebP copies of the generated artwork (317-417 KB per illustration); full original PNG files are preserved beside them. The four new files are `public/images/chaus-mascot-v2.webp`, `public/images/nutty-bee-v2.webp`, `public/images/honeysuckle-v2.webp`, and `public/images/milky-way-v2.webp`.

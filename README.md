# Saung Oo Hotel

A responsive, frontend-only hotel booking concept for a fictional hotel in Mandalay, Myanmar. Built with **Vite, React, TypeScript, React Router, Motion, and Lucide**.

## Develop

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm install
npm run dev
```

Run these commands from the repository root. Installation uses the frontend's lockfile;
the root scripts forward app commands to `frontend/`. You can also work directly in
`frontend/` with `npm ci` and `npm run dev`.

```sh
npm run build    # Type-check; build frontend/dist and copy it to dist for Sites
npm run preview  # Serve the production build locally
npm run lint
npm test
```

## Structure

```text
.openai/hosting.json       Existing Sites identity and deployment output setting
package.json               Convenience commands for the frontend
README.md                  Project documentation
frontend/
  package.json             App dependencies and scripts
  package-lock.json        Locked frontend dependencies
  index.html               Vite entry page
  public/                  Static assets
  vite.config.ts           Vite config; builds to frontend/dist
  vercel.json              Vercel config when its Root Directory is frontend
  tsconfig*.json           TypeScript configuration
  eslint.config.js         Frontend lint rules
  src/
    app/router.tsx         Central app router with lazy-loaded secondary pages
    components/            Shared layout, room cards, booking search, motion wrapper
    data/hotel.ts          Typed room catalogue, rates, and photography
    lib/booking.ts         Date validation, query parsing, and stay calculations
    pages/                 Home, rooms, room detail, experiences, story, booking, 404
    styles.css             Design tokens, shared styles, and responsive layouts
dist/                      Sites build copy (ignored by Git)
vercel.json                Vercel config when its Root Directory is the repo root
```

Frontend code and tooling live in `frontend/`. Repository metadata and Sites hosting
settings stay at the root. Vite builds into `frontend/dist/`, which Vercel serves.
The root build command also copies that output into `dist/` for Sites hosting.

For Vercel, set **Root Directory** to `frontend` and use its default Vite build settings.
The `frontend/vercel.json` file sets the output directory and supports direct links
to rooms and other routes. If the Vercel project instead uses the repository root,
the root `vercel.json` runs the root build command and serves `frontend/dist/`.

Routes: `/`, `/rooms`, `/rooms/:slug`, `/experiences`, `/our-story`, `/booking`.
This is a Vite SPA using React Router's `createBrowserRouter`, not Next.js's file-based App Router. Configure your production static host to rewrite unmatched application URLs to `/index.html` so direct links and refreshes work.

## Netlify deployment

For Git-connected deployments, the root `netlify.toml` sets the base directory to
`frontend`, the build command to `npm run build`, and the publish directory to
`dist` (relative to that base). Commit these files and trigger a new deploy.
The `_redirects` file in `frontend/public` is copied into the build and allows
direct links and refreshes on application routes while preserving static assets.

For a manual drag-and-drop deploy, run `npm run build` from the repository root,
then upload the generated root `dist` folder. It contains `index.html`, `assets/`,
`favicon.svg`, and `_redirects`. Do not upload the source `frontend` folder:
its HTML references `/src/main.tsx`, which requires Vite compilation and cannot
run directly as a browser JavaScript module.

If a deployed page reports a module MIME type of `application/octet-stream`,
check that the deployed HTML references `/assets/*.js`, not `/src/main.tsx`.
The favicon should be available at `/favicon.svg`. Redeploy the complete build
rather than changing MIME headers to disguise uncompiled TypeScript as JavaScript.

## Booking flow

Choose dates and guests → browse matching room capacities → room details → guest details → review → demo confirmation. Dates and guest count are carried in URL parameters. Dates, stay length (up to 30 nights), guest count, room capacity, and required guest fields are validated. Dates use calendar-day arithmetic to avoid daylight-saving time errors. Rates are sample MMK amounts; breakfast and demo taxes/fees are included.

There is **no backend, live availability, payment, email, or real reservation**. Guest details are held only in component memory and cleared on refresh. Do not enter sensitive information. Confirmation references are demo identifiers.

## Connect a backend later

- Replace the room data module with a typed API service; retain the existing `Room` contract.
- Query inventory and authoritative prices by dates and party size on the server.
- Replace the demo confirmation handler with a reservation API call and its loading/error states.
- Revalidate price, dates, capacity, and inventory server-side before confirming; do not trust browser totals.
- Add real booking policies, hotel contact details, legal notices, and payment integration when available.

## Design and assets

Jade and ivory tokens are centralized at the top of `styles.css`. Playfair Display and DM Sans are served by Google Fonts, with local system fallbacks. Images are remotely served from Unsplash and are illustrative stock photography, **not photographs of an actual Saung Oo Hotel or verified Mandalay location**. Replace the URLs in `data/hotel.ts` with licensed hotel-owned imagery before launch. Room features, rates, and hotel offerings are fictional sample content.

The interface supports keyboard focus, semantic forms, a skip link, mobile navigation, responsive layouts, and the system reduced-motion preference. No analytics or tracking integrations are included.

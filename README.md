# Saung Oo Hotel

A responsive, frontend-only hotel booking concept for a fictional hotel in Mandalay, Myanmar. Built with **Vite, React, TypeScript, React Router, Motion, and Lucide**.

## Develop

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm install
npm run dev
```

```sh
npm run build    # Type-check and build into dist/
npm run preview  # Serve the production build locally
npm run lint
npm test
```

## Structure

```text
src/
  app/router.tsx          Central app router with lazy-loaded secondary pages
  components/            Shared layout, room cards, booking search, motion wrapper
  data/hotel.ts          Typed room catalogue, rates, and photography
  lib/booking.ts         Date validation, query parsing, and stay calculations
  pages/                 Home, rooms, room detail, experiences, story, booking, 404
  styles.css             Design tokens, shared styles, and responsive layouts
```

Routes: `/`, `/rooms`, `/rooms/:slug`, `/experiences`, `/our-story`, `/booking`.
This is a Vite SPA using React Router's `createBrowserRouter`, not Next.js's file-based App Router. Configure your production static host to rewrite unmatched application URLs to `/index.html` so direct links and refreshes work.

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

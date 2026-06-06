# Nook 🪹

**Find your place, however you feel.**

Nook is a mood-driven map that helps you find nearby third places in Bangalore — cafes, libraries, parks, and more — based on how you're feeling, not just where you want to go.

> **Live demo:** [nook-rust-delta.vercel.app](https://nook-rust-delta.vercel.app)

---

## Moods

Pick a mood and discover places that match your vibe:

| Mood | Emoji | Feeling |
|------|-------|---------|
| Need quiet | 🕊️ | Silence, solitude, soft sounds |
| Want energy | ⚡ | Buzz, music, people, life |
| Focus mode | 🎯 | Deep work, good WiFi, zero distractions |
| Just exist | 🌿 | No plans, no pressure, just be |

## Features

- **Home** — four mood cards to choose from
- **Map** — interactive Leaflet map with color-coded markers filtered by mood, bottom card preview
- **Place profile** — vibe tags, community note, best time to visit, amenities, "Take me here" link to Google Maps
- **15 seed places** across Bangalore (cafes, libraries, parks, restaurants, markets)
- **No login required** — just open and explore

## Stack

- [React](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Leaflet](https://leafletjs.com) via [react-leaflet](https://react-leaflet.js.org)
- [React Router](https://reactrouter.com)
- Local JSON data (Firebase-ready for future)

## Design

Warm, minimal, mobile-first palette:

- Primary: Forest Green `#2D6A4F`
- Accent: Sage `#52B788`
- Background: Soft `#EEF4EC`
- Type: Inter

## Getting started

```bash
git clone https://github.com/Impana-N/Nook.git
cd Nook
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Roadmap

- [ ] Firebase Firestore integration
- [ ] User-contributed community notes
- [ ] More cities beyond Bangalore
- [ ] Place photos
- [ ] Filter by amenities

---

Made with warmth for Bangalore's third places.

# The Pokedex App

A browser-based Pokedex built with React and PokéAPI — search any Pokemon by name or ID, browse by generation, and inspect stats, moves, evolution chains, and more inside a CSS-rendered Pokedex shell.

## Live Demo

**https://the-pokedex-app.web.app/**

## Tech Stack

![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.6-7952B3?logo=bootstrap&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=black)
![PokéAPI](https://img.shields.io/badge/PokéAPI-REST-EF5350)

## Features

**Pokemon search by name or ID**
Type a name (e.g. `charizard`) or a Pokedex number (e.g. `6`) into the search bar and press Enter or click the Pokeball button. Results load into the Pokedex display instantly.

**Pokemon of the Day**
A daily-rotating Pokemon is selected automatically on page load. The selection uses a date-based seed (`YYYYMMDD % 1025 + 1`) so the same Pokemon appears for every visitor on the same day, with no backend required. Click the banner to load its full entry.

**Shiny variant toggle**
Once a Pokemon is loaded, the light-blue button on the Pokedex left panel switches between its standard and shiny sprites.

**Cry playback**
The large button on the left panel plays the Pokemon's official cry audio sourced directly from the PokéAPI cries endpoint.

**Evolution chain visualization**
The evolution chain is fetched from the species endpoint and rendered as a clickable sequence (e.g. Bulbasaur → Ivysaur → Venusaur). Clicking any stage loads that Pokemon.

**Pokedex flavor text**
The first English flavor text entry from the species endpoint is displayed above the data panel, matching the in-game Pokedex entry style.

**Type effectiveness**
Damage relations (weak to / resistant to / immune to) are fetched per type and aggregated for dual-type Pokemon.

**Moves and move detail**
The first five learnable moves are listed. Clicking a move opens a modal with its power, accuracy, PP, damage class, and full English effect description.

**Wild location encounters**
Up to five in-game encounter areas are listed, pulled from `/pokemon/{id}/encounters`.

**Pokemon comparison**
The compare button opens a modal with a live typeahead search across all 1025 Pokemon. Selecting one renders a side-by-side stat grid with winning values highlighted.

**Generation browsing**
The browse grid at the bottom of the page is organized into nine generation tabs (Gen I through Gen IX). Switching tabs fetches the appropriate Pokemon list. An inline filter and sort control (ID or name, ascending or descending) work client-side on the loaded list.

**Client-side caching to minimize API calls**
Pokemon data is cached in a `useRef` object keyed by ID/name. Revisiting a Pokemon you already viewed never triggers a network call. Evolution chains are cached separately by their endpoint URL, so navigating between members of the same family (e.g. all three Kanto starters) reuses the same chain data. The full 1025-entry name list used for compare autocomplete is fetched once per session and stored in a module-level variable.

## Architecture and API

All data comes from the public [PokéAPI](https://pokeapi.co/) REST API — no API key required.

| Endpoint | Purpose |
|---|---|
| `GET /pokemon/{id or name}` | Load a single Pokemon (stats, sprites, moves, types, cries) |
| `GET /pokemon?limit={n}&offset={n}` | Paginated list for the generation browse grid |
| `GET /pokemon/{id}/encounters` | Wild location areas |
| `GET /pokemon-species/{url}` | Flavor text and evolution chain URL |
| `GET /evolution-chain/{url}` | Full evolution chain |
| `GET /type/{type}` | Damage relations for type effectiveness |
| `GET /move/{name}` | Move detail (power, accuracy, effect) |
| `GET /pokemon?limit=1025` | Full name list for compare typeahead (fetched once) |

The caching layer sits entirely in `App.js`. Two `useRef` objects hold previously fetched `Pokemon` instances and evolution chains respectively. Refs are used instead of state so cache writes never cause re-renders.

## Screenshots

![Pokedex App](https://user-images.githubusercontent.com/43330221/116804864-e751d800-aae7-11eb-93e3-952d8fc3f0c7.png)

## Setup and Run

**Prerequisites:** Node.js 16+ and npm.

```bash
git clone https://github.com/bhavikbhoir/The-Pokedex-App.git
cd The-Pokedex-App
npm install
npm start          # http://localhost:3000
```

**Production build and deploy:**

```bash
npm run build
firebase deploy    # requires firebase-tools and project access
```

## Acknowledgements

- [PokéAPI](https://pokeapi.co/) — free, open Pokemon data API
- [Firebase Hosting](https://firebase.google.com/products/hosting) — deployment and CDN

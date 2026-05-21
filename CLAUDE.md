# CLAUDE.md — The Pokedex App

## Purpose

A client-side Pokedex built with React and PokéAPI. Users can search any Pokemon by name or ID, browse by generation, view detailed stats, and compare Pokemon side-by-side. The UI renders as a physical Pokedex shell in CSS. Deployed on Firebase Hosting at https://the-pokedex-app.web.app/.

## Tech Stack (exact versions from package.json)

| Package | Version |
|---|---|
| react | ^17.0.2 |
| react-dom | ^17.0.2 |
| react-bootstrap | ^1.5.2 |
| bootstrap | ^4.6.0 |
| react-scripts | 4.0.3 |
| web-vitals | ^1.0.1 |
| express | ^4.17.1 |

Node requires `--openssl-legacy-provider` flag (set in npm scripts for compatibility with react-scripts 4 on newer Node versions).

## Dev Commands

```bash
npm start    # start dev server (http://localhost:3000)
npm build    # production build → ./build/
npm test     # run tests with react-scripts
```

## Firebase Hosting

Project ID: `the-pokedex-app` (defined in `.firebaserc`)

Public dir: `build/`, SPA rewrites all routes to `index.html`.

```bash
npm run build
firebase deploy
```

## PokéAPI Endpoints Used

All requests go to `https://pokeapi.co/api/v2/`.

| Endpoint | Where used | What it returns |
|---|---|---|
| `GET /pokemon/{id or name}` | App.js `handleOnClick`, `CompareModal.selectPokemon`, POTD `useEffect` | Full Pokemon object (sprites, stats, moves, abilities, types, cries, species URL) |
| `GET /pokemon?limit={n}&offset={n}` | PokeList.js per-generation fetch | Paginated name list for the browse grid |
| `GET /pokemon/{id}/encounters` | LocationEncounters.js | Wild encounter locations (capped to first 5) |
| `GET /pokemon-species/{url}` | App.js `fetchEvolutionChain` (species URL comes from the Pokemon object) | Flavor text entries + evolution chain URL |
| `GET /evolution-chain/{url}` | App.js `fetchEvolutionChain` | Full chain object, traversed recursively |
| `GET /type/{type}` | PokeData.js `TypeEffectiveness` | Damage relations (weak/resist/immune) |
| `GET /move/{name}` | MoveModal.js | Move power, accuracy, PP, type, effect text |
| `GET /pokemon?limit=1025` | CompareModal.js (module-level singleton) | Full name list for typeahead autocomplete |

## Caching Strategy

Two `useRef` caches live in `App.js` — refs are used instead of state so updates never trigger re-renders:

```js
const cache = useRef({});          // keyed by pokemon id/name
const evolutionCache = useRef({}); // keyed by evolution-chain URL
```

**`cache`** — populated on first `handleOnClick(id)`. Before fetching, the handler checks `cache.current[id]`; if present it reads from memory and skips the network call entirely. The cached value is a `Pokemon` class instance with all fields pre-shaped.

**`evolutionCache`** — populated inside `fetchEvolutionChain`. Keyed by the full evolution-chain URL (e.g. `https://pokeapi.co/api/v2/evolution-chain/1/`). If the same chain is needed again (e.g. navigating between Bulbasaur/Ivysaur/Venusaur) the chain fetch is skipped; only the cheaper species fetch (needed for flavor text) still runs.

**`CompareModal` global cache** — `ALL_POKEMON` is a module-level variable (`let ALL_POKEMON = null`). The full 1025-entry name list is fetched once per page load and reused across all CompareModal instances.

No persistence layer: caches are in-memory and reset on page reload.

## Pokemon of the Day (POTD)

```js
const getPotdId = () => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return (seed % 1025) + 1;
};
```

- Seed is derived from the calendar date (`YYYYMMDD` as an integer).
- `seed % 1025` maps to a 0-based index across all 1025 Pokemon; `+1` gives a 1-based ID.
- The same date always yields the same Pokemon for every user with no server needed.
- The POTD is fetched on mount (`useEffect([], [])`), stored in a separate `useState` (not the main `cache`), and displayed as a clickable banner above the browse grid.

## Component Structure

```
App.js                    — root; owns all shared state, both caches, POTD logic
├── PokeSearch.js         — top search bar; text input + Pokeball button; calls handleOnClick on Enter or click
├── LeftPanel.js          — CSS Pokedex left half; displays sprite (normal or shiny), Pokemon name on green screen, cry playback button, shiny toggle button
├── RightPanel.js         — CSS Pokedex right half; displays type, ID, height, weight on small screens
├── PokeData.js           — data panel (right column)
│   ├── TypeEffectiveness — fetches /type/{name} data and renders weak/resist/immune lists
│   ├── LocationEncounters.js — fetches /encounters and lists up to 5 wild areas
│   ├── MoveModal.js      — modal overlay; fetches /move/{name} on open; shows power, accuracy, PP, effect
│   ├── CompareModal.js   — modal overlay; typeahead search across all 1025 Pokemon; side-by-side stat comparison with winner highlight
│   └── YoutubeClip       — inline component; renders a YouTube search link for the Pokemon's first anime appearance
├── PokeList.js           — browse grid; generation tabs (Gen I–IX), name/ID filter input, sort dropdown; fetches list per generation on tab switch
│   └── PokeCell.js       — single grid cell; sprite from PokeAPI sprites CDN with lazy loading; click calls handleOnClick
├── AlertBox.js           — dismissible error banner
└── Loader.js             — centered spinning Pokeball overlay shown during fetch
```

## Data Model

`src/Pokemon.js` is a plain class constructor that shapes raw API data:

```js
class Pokemon {
  constructor(data) {
    this.id          = data.id;
    this.name        = data.name;
    this.sprite      = data.sprites.front_default;
    this.spriteShiny = data.sprites.front_shiny;
    this.type        = data.types[0].type.name;   // primary type (string)
    this.types       = data.types;                 // full array for TypeEffectiveness
    this.height      = data.height;               // decimetres
    this.weight      = data.weight;               // hectograms
    this.moves       = data.moves;
    this.stats       = data.stats;
    this.abilities   = data.abilities;
    this.cries       = data.cries;                // { latest, legacy }
    this.species_url = data.species.url;
  }
}
```

Height and weight are converted at render time: `height * 10` → cm, `weight / 10` → kg.

## Key Features

**Search by name or ID** — `PokeSearch` accepts any string; it is lowercased and passed directly to `/pokemon/{value}`, so both `"pikachu"` and `"25"` work.

**Shiny toggle** — `isShiny` boolean in App state; `LeftPanel` switches between `sprite` and `spriteShiny`; the light-blue button is disabled until a Pokemon is loaded.

**Evolution chain** — `fetchEvolutionChain` walks `chain.evolves_to[0]` iteratively; each stage's name and species ID are rendered as clickable spans that call `handleOnClick`.

**Flavor text** — extracted from `species.flavor_text_entries` (first English entry); form-feed characters (`\f`) are replaced with spaces before display.

**Type effectiveness** — `TypeEffectiveness` fetches damage relations for every type the Pokemon has and aggregates weak/resistant/immune sets.

**Move detail modal** — click any of the first 5 moves; `MoveModal` fetches `/move/{name}` and shows power, accuracy, PP, damage class, and English effect text.

**Pokemon comparison** — `CompareModal` typeahead searches all 1025 Pokemon, fetches the selected one, and renders a stat grid with winning values highlighted.

**Cry playback** — `LeftPanel` holds an `<audio>` element sourced from `cries.latest`; the big button triggers `.play()`.

**Wild location encounters** — `LocationEncounters` fetches `/pokemon/{id}/encounters` and lists up to 5 location areas.

**Generation browsing** — `PokeList` tabs across all 9 generations (Gen I ID 1-151 through Gen IX ID 906-1025); switching tabs re-fetches the appropriate paginated list.

**Sorting** — browse grid supports ID ascending/descending and name A-Z/Z-A, applied client-side after the list is fetched.

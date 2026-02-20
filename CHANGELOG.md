# Changelog

All notable changes to The Pokedex App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Pokemon Cries/Sounds**: Click the big circular button to play Pokemon cry audio
- **Shiny Sprite Toggle**: Click the light blue button to toggle between normal and shiny sprites
- **Evolution Chain Display**: Shows complete evolution line with clickable Pokemon names
- **Type Effectiveness Chart**: Displays weaknesses, resistances, and immunities based on Pokemon type(s)
- **Flavor Text/Pokedex Entries**: Shows official Pokedex description from the games
- **Type Badges**: Types now display as colored badges with proper type colors
- **Interactive Evolution Names**: Click any evolution name to load that Pokemon
- **Sound Indicator**: Shows 🔊 emoji when Pokemon cry is playing
- **Better Error Messages**: Specific error messages for 404 (not found) vs network errors
- **Request Caching**: Pokemon data and evolution chains are cached to reduce API calls
- **Environment Variables**: Firebase config moved to .env.local for security
- **Move Details Modal**: Click any move to see full details (power, accuracy, PP, type, damage class, description)
- **Move Effect Variables**: Move descriptions now show actual values (e.g., "10% chance" instead of "$effect_chance%")

### Changed
- **UI Layout**: Expanded PokeData panel for better content visibility (removed scroll)
- **Component Architecture**: Converted App.js from class component to functional component with hooks
- **State Management**: Consolidated state into single object with proper batching
- **Flavor Text Styling**: Gradient background with white text for better readability
- **Evolution Chain Styling**: Gradient background with improved hover effects
- **Type Effectiveness Styling**: Gradient background with individual row styling
- **Button Interactions**: Added hover effects to all interactive buttons
- **Input Focus States**: Enhanced focus states for better accessibility
- **Alert Positioning**: Moved alert box below search bar to prevent overlap
- **Shiny Toggle Button**: Converted from div to proper button element with increased height (8px) for better clickability
- **Sound Button**: Converted to proper button element with disabled state
- **Background**: Fixed background with `background-attachment: fixed` to prevent scrolling issues
- **Move List**: Moves are now clickable with hover effects to indicate interactivity

### Fixed
- **Shiny Toggle**: Fixed shiny sprite toggle functionality with proper useCallback and button element
- **Nested List Items**: Removed invalid nested `<li>` elements in PokeData component
- **Console Logs**: Removed console.log statements from production code
- **JSX Syntax**: Changed `class` to `className` in PokeSearch component
- **Insecure Scripts**: Fixed HTTP script loading (Instagram embed) to use HTTPS
- **Multiple setState Calls**: Batched state updates to prevent unnecessary re-renders
- **Artificial Delay**: Removed setTimeout that added 1-second delay after fetching data
- **Unnecessary useEffect**: Simplified RightPanel by using default parameters instead of useEffect
- **Button Clickability**: Increased long button height from 2px to 8px for better click target
- **Background Scrolling**: Fixed white space issues when scrolling by using fixed background attachment
- **Move Modal Variables**: Fixed $effect_chance and other variables in move descriptions to show actual values

### Security
- **Firebase API Keys**: Moved to environment variables (not committed to repo)
- **Content Security**: Fixed insecure script loading from HTTP to HTTPS

### Performance
- **API Caching**: Implemented caching for Pokemon data and evolution chains
- **Async/Await**: Converted fetch calls to async/await for better error handling
- **State Batching**: Reduced re-renders by batching state updates
- **Removed Artificial Delays**: Eliminated setTimeout that slowed down data display

### Accessibility
- **ARIA Labels**: Added aria-label attributes to search input, buttons, and Pokemon cells
- **Semantic HTML**: Converted div buttons to proper button elements
- **Keyboard Navigation**: Added focus states for keyboard users
- **Role Attributes**: Added role="alert" to AlertBox and role="img" to Pokemon sprites
- **Screen Reader Support**: Added descriptive ARIA labels for all interactive elements

### Developer Experience
- **Changelog**: Added CHANGELOG.md to track all changes per commit
- **Code Quality**: Removed unused dependencies (express)
- **Error Handling**: Improved error handling with specific error types
- **Component Props**: Better prop passing and validation

## [0.1.0] - Initial Release

### Added
- Basic Pokedex functionality
- Pokemon search by name or ID
- Display Pokemon stats, moves, abilities, and types
- Pokemon sprite display
- Grid view of first generation Pokemon
- Firebase hosting
- Google Analytics integration
- Responsive design with React Bootstrap

---

## How to Use This Changelog

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements
- **Performance**: Performance improvements
- **Accessibility**: Accessibility improvements

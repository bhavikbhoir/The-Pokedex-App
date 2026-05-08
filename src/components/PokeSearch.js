import React from 'react';
import './styles/PokeSearch.css';

let ALL_POKEMON = null;

const PokeSearch = ({ handleOnClick, currentPokemon }) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState([]);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const wrapperRef = React.useRef(null);

    React.useEffect(() => {
        if (ALL_POKEMON) return;
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
            .then(r => r.json())
            .then(data => { ALL_POKEMON = data.results; })
            .catch(() => {});
    }, []);

    React.useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleChange = (value) => {
        setSearchValue(value);
        if (value.length < 2 || !ALL_POKEMON) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        const lower = value.toLowerCase();
        const filtered = ALL_POKEMON.filter(p => p.name.includes(lower)).slice(0, 6);
        setSuggestions(filtered);
        setShowDropdown(filtered.length > 0);
    };

    const handleSearch = (value) => {
        if (!value) return;
        handleOnClick(String(value).toLowerCase());
        setSearchValue('');
        setSuggestions([]);
        setShowDropdown(false);
    };

    const handleSelect = (name) => {
        handleOnClick(name);
        setSearchValue('');
        setSuggestions([]);
        setShowDropdown(false);
    };

    const handleRandom = () => {
        handleOnClick(Math.floor(Math.random() * 1025) + 1);
    };

    const getSpriteUrl = (url) => {
        const id = url.split('/').filter(Boolean).pop();
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    return (
        <div className="search-container" ref={wrapperRef}>
            <div className="search-input-wrap">
                <input
                    id="name-input"
                    type="text"
                    placeholder="Search Pokémon by name or ID…"
                    value={searchValue}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch(e.target.value);
                        if (e.key === 'Escape') setShowDropdown(false);
                    }}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                    aria-label="Search Pokemon by name or ID"
                    autoComplete="off"
                />
                {searchValue && (
                    <button
                        className="clear-btn"
                        onClick={() => { setSearchValue(''); setSuggestions([]); setShowDropdown(false); }}
                        aria-label="Clear search"
                        type="button"
                    >×</button>
                )}
                {showDropdown && (
                    <ul className="autocomplete-dropdown" role="listbox">
                        {suggestions.map(p => (
                            <li key={p.name} onClick={() => handleSelect(p.name)} role="option">
                                <img src={getSpriteUrl(p.url)} alt="" />
                                <span>{p.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {currentPokemon?.id && (
                <div className="current-chip">
                    <img src={currentPokemon.sprite} alt={currentPokemon.name} />
                    <span>#{String(currentPokemon.id).padStart(3, '0')} {currentPokemon.name}</span>
                </div>
            )}
            <button
                className="random-btn"
                onClick={handleRandom}
                title="Random Pokémon"
                type="button"
                aria-label="Random Pokemon"
            >?</button>
            <button
                id="search-btn"
                className="ball-container mr-0"
                onClick={() => handleSearch(searchValue)}
                aria-label="Search"
                type="button"
            >
                <div className="upper-half-ball"></div>
                <div className="bottom-half-ball"></div>
                <div className="center-ball"></div>
                <div className="center-line"></div>
            </button>
        </div>
    );
};

export default PokeSearch;

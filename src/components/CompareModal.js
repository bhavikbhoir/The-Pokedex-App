import React, { useState, useEffect, useRef } from 'react';
import Pokemon from '../Pokemon';
import './styles/CompareModal.css';

const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

// Fetch all pokemon names once and cache globally
let ALL_POKEMON = null;
const fetchAllPokemon = async () => {
    if (ALL_POKEMON) return ALL_POKEMON;
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    const data = await res.json();
    ALL_POKEMON = data.results.map((p, i) => ({ name: p.name, id: String(i + 1) }));
    return ALL_POKEMON;
};

const CompareModal = ({ pokemon, onClose }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [comparePokemon, setComparePokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
        fetchAllPokemon().then(setAllPokemon);
    }, []);

    const handleQueryChange = (val) => {
        setQuery(val);
        if (!val.trim()) { setSuggestions([]); return; }
        const matches = allPokemon
            .filter(p => p.name.includes(val.toLowerCase()) || p.id.startsWith(val))
            .slice(0, 6);
        setSuggestions(matches);
    };

    const selectPokemon = async (nameOrId) => {
        setSuggestions([]);
        setQuery(nameOrId);
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            setComparePokemon(new Pokemon(data));
        } catch {
            setError('Pokémon not found');
        }
        setLoading(false);
    };

    const getStat = (p, statName) => p?.stats?.find(s => s.stat.name === statName)?.base_stat || 0;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content compare-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Compare Pokémon ⚔️</h2>
                <div className="compare-search-wrapper">
                    <div className="compare-search">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search by name or ID..."
                            value={query}
                            onChange={e => handleQueryChange(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && selectPokemon(query)}
                        />
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="compare-suggestions">
                            {suggestions.map(s => (
                                <li key={s.id} onClick={() => selectPokemon(s.name)}>
                                    <span className="suggestion-id">#{s.id.padStart(3,'0')}</span> {s.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {error && <p className="compare-error">{error}</p>}
                {loading && <p className="t-center">Loading...</p>}
                {comparePokemon && (
                    <div className="compare-grid">
                        <div className="compare-header">
                            <img src={pokemon.sprite} alt={pokemon.name} />
                            <strong>{pokemon.name}</strong>
                        </div>
                        <div className="compare-header-mid">VS</div>
                        <div className="compare-header">
                            <img src={comparePokemon.sprite} alt={comparePokemon.name} />
                            <strong>{comparePokemon.name}</strong>
                        </div>
                        {statNames.map(stat => {
                            const a = getStat(pokemon, stat);
                            const b = getStat(comparePokemon, stat);
                            return (
                                <React.Fragment key={stat}>
                                    <div className={`stat-val ${a > b ? 'winner' : a < b ? 'loser' : ''}`}>{a}</div>
                                    <div className="stat-name">{stat}</div>
                                    <div className={`stat-val ${b > a ? 'winner' : b < a ? 'loser' : ''}`}>{b}</div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareModal;

import React, { useState, useEffect, useRef } from 'react';
import Pokemon from '../Pokemon';
import './styles/CompareModal.css';

const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

const POKEMON_NAMES = [
  'bulbasaur','ivysaur','venusaur','charmander','charmeleon','charizard','squirtle','wartortle','blastoise','caterpie',
  'metapod','butterfree','weedle','kakuna','beedrill','pidgey','pidgeotto','pidgeot','rattata','raticate',
  'spearow','fearow','ekans','arbok','pikachu','raichu','sandshrew','sandslash','nidoran-f','nidorina',
  'nidoqueen','nidoran-m','nidorino','nidoking','clefairy','clefable','vulpix','ninetales','jigglypuff','wigglytuff',
  'zubat','golbat','oddish','gloom','vileplume','paras','parasect','venonat','venomoth','diglett',
  'dugtrio','meowth','persian','psyduck','golduck','mankey','primeape','growlithe','arcanine','poliwag',
  'poliwhirl','poliwrath','abra','kadabra','alakazam','machop','machoke','machamp','bellsprout','weepinbell',
  'victreebel','tentacool','tentacruel','geodude','graveler','golem','ponyta','rapidash','slowpoke','slowbro',
  'magnemite','magneton','farfetchd','doduo','dodrio','seel','dewgong','grimer','muk','shellder',
  'cloyster','gastly','haunter','gengar','onix','drowzee','hypno','krabby','kingler','voltorb',
  'electrode','exeggcute','exeggutor','cubone','marowak','hitmonlee','hitmonchan','lickitung','koffing','weezing',
  'rhyhorn','rhydon','chansey','tangela','kangaskhan','horsea','seadra','goldeen','seaking','staryu',
  'starmie','mr-mime','scyther','jynx','electabuzz','magmar','pinsir','tauros','magikarp','gyarados',
  'lapras','ditto','eevee','vaporeon','jolteon','flareon','porygon','omanyte','omastar','kabuto',
  'kabutops','aerodactyl','snorlax','articuno','zapdos','moltres','dratini','dragonair','dragonite','mewtwo','mew'
];

const CompareModal = ({ pokemon, onClose }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [comparePokemon, setComparePokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleQueryChange = (val) => {
        setQuery(val);
        if (!val.trim()) { setSuggestions([]); return; }
        const matches = POKEMON_NAMES
            .map((name, i) => ({ name, id: String(i + 1) }))
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

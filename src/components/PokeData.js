import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './styles/PokeData.css';
import MoveModal from './MoveModal';
import LocationEncounters from './LocationEncounters';
import CompareModal from './CompareModal';

const YoutubeClip = ({ name }) => {
    const query = encodeURIComponent(`${name} pokemon first appearance anime`);
    return (
        <a href={`https://www.youtube.com/results?search_query=${query}`} target="_blank" rel="noopener noreferrer" className="youtube-link">
            🎬 Search {name}'s first appearance on YouTube
        </a>
    );
};

const formatGender = (genderRate) => {
    if (genderRate === -1) return 'Genderless';
    if (genderRate === 0) return '♂ 100%';
    if (genderRate === 8) return '♀ 100%';
    const femaleChance = (genderRate / 8 * 100).toFixed(1);
    return `♂ ${(100 - femaleChance).toFixed(1)}% / ♀ ${femaleChance}%`;
};

const PokeData = ({ pokemon, evolutionChain, flavorText, breedingInfo, handleOnClick }) => {
    const [selectedMove, setSelectedMove] = React.useState(null);
    const [showCompare, setShowCompare] = React.useState(false);
    const getEvolutionNames = (chain) => {
        const names = [];
        let current = chain;
        while (current) {
            const speciesName = current.species.name;
            const speciesId = current.species.url.split('/').slice(-2, -1)[0];
            names.push({ name: speciesName, id: speciesId });
            current = current.evolves_to[0];
        }
        return names;
    };

    const evolutionNames = evolutionChain ? getEvolutionNames(evolutionChain) : [];

    const typeColors = {
        normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
        grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
        ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
        rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
        steel: '#B8B8D0', fairy: '#EE99AC'
    };

    return (
        <div id="poke-data">
            {flavorText && (
                <Row>
                    <Col>
                        <div className="flavor-text-box">
                            <p>{flavorText}</p>
                        </div>
                    </Col>
                </Row>
            )}
            {evolutionNames.length > 1 && (
                <Row>
                    <Col>
                        <h4>Evolution Chain 🔄</h4>
                        <div className="evolution-chain">
                            {evolutionNames.map((evo, index) => (
                                <React.Fragment key={evo.id}>
                                    <span 
                                        className="evolution-name"
                                        onClick={() => handleOnClick(evo.id)}
                                    >
                                        {evo.name}
                                    </span>
                                    {index < evolutionNames.length - 1 && <span className="evolution-arrow">→</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </Col>
                </Row>
            )}
            <Row>
                <Col>
                    <h4>Type Effectiveness 🎯</h4>
                    {pokemon.types?.length > 0 && (
                        <TypeEffectiveness types={pokemon.types.map(t => t.type.name)} />
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Moves 💪</h4>
                    <ul>
                        { (pokemon.moves?.length > 0) ? pokemon.moves.slice(0, 5).map((data, index) => (
                            <li key={index} className="move-item" onClick={() => setSelectedMove(data)}>
                                {data.move.name}
                            </li>
                        )) : <li className="t-center">-</li> }
                    </ul>
                </Col>
                <Col>
                    <h4>Stats 📊</h4>
                    { (pokemon.stats?.length > 0) ? (
                        <div className="stat-bars">
                            {pokemon.stats.map((data, index) => (
                                <div key={index} className="stat-bar-row">
                                    <span className="stat-bar-label">{data.stat.name.replace('special-', 'sp.')}</span>
                                    <div className="stat-bar-track">
                                        <div
                                            className="stat-bar-fill"
                                            style={{
                                                width: `${Math.min((data.base_stat / 255) * 100, 100)}%`,
                                                backgroundColor: data.base_stat >= 100 ? '#27ae60' : data.base_stat >= 60 ? '#f39c12' : '#e74c3c',
                                                animationDelay: `${index * 0.1}s`
                                            }}
                                        />
                                    </div>
                                    <span className="stat-bar-value">{data.base_stat}</span>
                                </div>
                            ))}
                            <div className="stat-bar-row bst-row">
                                <span className="stat-bar-label"><strong>BST</strong></span>
                                <div className="stat-bar-track">
                                    <div
                                        className="stat-bar-fill"
                                        style={{
                                            width: `${Math.min((pokemon.stats.reduce((s, d) => s + d.base_stat, 0) / 720) * 100, 100)}%`,
                                            backgroundColor: '#7038f8',
                                        }}
                                    />
                                </div>
                                <span className="stat-bar-value"><strong>{pokemon.stats.reduce((s, d) => s + d.base_stat, 0)}</strong></span>
                            </div>
                        </div>
                    ) : <p className="t-center">-</p> }
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Abilities 🧠</h4>
                    <ul>
                        { (pokemon.abilities?.length > 0) ? pokemon.abilities.map((data, index) => (
                            <li key={index}>{data.ability.name}</li>
                        )) : <li className="t-center">-</li> }
                    </ul>
                </Col>
                <Col>
                    <h4>Types ✳️</h4>
                    <div className="type-badges">
                        { (pokemon.types?.length > 0) ? pokemon.types.map((data, index) => (
                            <span 
                                key={index} 
                                className="type-badge"
                                style={{backgroundColor: typeColors[data.type.name] || '#777'}}
                            >
                                {data.type.name}
                            </span>
                        )) : <span className="t-center">-</span> }
                    </div>
                </Col>
            </Row>
            {breedingInfo && (
                <Row>
                    <Col>
                        <h4>Breeding 🥚</h4>
                        <ul className="breeding-info">
                            <li><strong>Egg Groups:</strong> {breedingInfo.eggGroups.join(', ') || '—'}</li>
                            <li><strong>Gender:</strong> {formatGender(breedingInfo.genderRate)}</li>
                            <li><strong>Hatch Steps:</strong> ~{breedingInfo.hatchSteps.toLocaleString()}</li>
                        </ul>
                    </Col>
                </Row>
            )}
            {pokemon.id && (
                <Row>
                    <Col>
                        <h4>Locations 📍</h4>
                        <LocationEncounters pokemonId={pokemon.id} />
                    </Col>
                    <Col>
                        <h4>Compare ⚔️</h4>
                        <button className="compare-btn" onClick={() => setShowCompare(true)}>
                            Compare with another Pokémon
                        </button>
                    </Col>
                </Row>
            )}
            {pokemon.name && (
                <Row>
                    <Col>
                        <h4>First Appearance 🎬</h4>
                        <YoutubeClip name={pokemon.name} />
                    </Col>
                </Row>
            )}
            {selectedMove && <MoveModal move={selectedMove} onClose={() => setSelectedMove(null)} />}
            {showCompare && <CompareModal pokemon={pokemon} onClose={() => setShowCompare(false)} />}
        </div>
    )
  };

const TypeEffectiveness = ({ types }) => {
    const [effectiveness, setEffectiveness] = React.useState(null);

    React.useEffect(() => {
        const fetchTypeData = async () => {
            try {
                const typeData = await Promise.all(
                    types.map(type => fetch(`https://pokeapi.co/api/v2/type/${type}`).then(r => r.json()))
                );
                
                const weakTo = new Set();
                const resistantTo = new Set();
                const immuneTo = new Set();

                typeData.forEach(data => {
                    data.damage_relations.double_damage_from.forEach(t => weakTo.add(t.name));
                    data.damage_relations.half_damage_from.forEach(t => resistantTo.add(t.name));
                    data.damage_relations.no_damage_from.forEach(t => immuneTo.add(t.name));
                });

                setEffectiveness({
                    weak: Array.from(weakTo),
                    resistant: Array.from(resistantTo),
                    immune: Array.from(immuneTo)
                });
            } catch (err) {
                console.error('Type effectiveness error:', err);
            }
        };

        if (types.length > 0) {
            fetchTypeData();
        }
    }, [types]);

    if (!effectiveness) return <p className="t-center">Loading...</p>;

    return (
        <div className="type-effectiveness">
            {effectiveness.weak.length > 0 && (
                <div className="effectiveness-row">
                    <strong>Weak to:</strong> {effectiveness.weak.join(', ')}
                </div>
            )}
            {effectiveness.resistant.length > 0 && (
                <div className="effectiveness-row">
                    <strong>Resistant to:</strong> {effectiveness.resistant.join(', ')}
                </div>
            )}
            {effectiveness.immune.length > 0 && (
                <div className="effectiveness-row">
                    <strong>Immune to:</strong> {effectiveness.immune.join(', ')}
                </div>
            )}
        </div>
    );
};
  

export default PokeData;
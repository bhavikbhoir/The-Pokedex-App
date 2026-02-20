import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './styles/PokeData.css';
import MoveModal from './MoveModal';

const PokeData = ({ pokemon, evolutionChain, flavorText, handleOnClick }) => {
    const [selectedMove, setSelectedMove] = React.useState(null);
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
                    <ul>
                        { (pokemon.stats?.length > 0) ? pokemon.stats.slice(0, 5).map((data, index) => (
                            <li key={index}>{data.stat.name}: {data.base_stat}</li>
                        )) : <li className="t-center">-</li> }
                    </ul>
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
            {selectedMove && <MoveModal move={selectedMove} onClose={() => setSelectedMove(null)} />}
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
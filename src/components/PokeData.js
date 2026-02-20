import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './styles/PokeData.css';

const PokeData = ({ pokemon }) => {
    return (
        <div id="poke-data">
            <Row>
                <Col>
                    <h4>Moves 💪</h4>
                    <ul>
                        { (pokemon.moves?.length > 0) ? pokemon.moves.slice(0, 5).map((data, index) => (
                            <li key={index}>{data.move.name}</li>
                        )) : <li className="t-center">Please select a Pokémon</li> }
                    </ul>
                </Col>
                <Col>
                    <h4>Stats 📊</h4>
                    <ul>
                        { (pokemon.stats?.length > 0) ? pokemon.stats.slice(0, 5).map((data, index) => (
                            <li key={index}>{data.stat.name}: {data.base_stat}</li>
                        )) : <li className="t-center">Please select a Pokémon</li> }
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Abilities 🧠</h4>
                    <ul>
                        { (pokemon.abilities?.length > 0) ? pokemon.abilities.slice(0, 5).map((data, index) => (
                            <li key={index}>{data.ability.name}</li>
                        )) : <li className="t-center">Please select a Pokémon</li> }
                    </ul>
                </Col>
                <Col>
                    <h4>Types ✳️</h4>
                    <ul>
                        { (pokemon.types?.length > 0) ? pokemon.types.slice(0, 5).map((data, index) => (
                            <li key={index}>{data.type.name}</li>
                        )) : <li className="t-center">Please select a Pokémon</li> }
                    </ul>
                </Col>
            </Row>
        </div>
    )
  };
  

export default PokeData;
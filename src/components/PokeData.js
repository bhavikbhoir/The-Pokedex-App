import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './styles/PokeData.css';

const PokeData = ({ pokemon }) => {
    console.log(pokemon);

    return (
        <div id="poke-data">
            <Row>
                <Col>
                    <h4>Moves 💪</h4>
                    <ul>
                        { (pokemon.moves?.length > 0) ? pokemon.moves.map( (data, index) => {
                        return (
                        index < 5 && <li key={ index }>  {/*Show only top 5 moves*/}
                            <li>{ data.move.name }</li>
                        </li>
                        )
                        }) : <li className="t-center">Please select a Pokémon</li> }
                    </ul>
                </Col>
                <Col>
                    <h4>Stats 📊</h4>
                    <ul>
                        { (pokemon.stats?.length > 0) ? pokemon.stats.map( (data, index) => {
                        return (
                        index < 5 && <li key={ index }>  {/*Show only top 5 stats*/}
                            <li>{ data.stat.name }: { data.base_stat }</li>
                        </li>
                        )
                        }) : <li className="t-center">Please select a Pokémon</li> }
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Abilities 🧠</h4>
                    <ul>
                        { (pokemon.abilities?.length > 0) ? pokemon.abilities.map( (data, index) => {
                        return (
                        index < 5 && <li key={ index }>  {/*Show only top 5 abilities*/}
                            <li>{ data.ability.name }</li>
                        </li>
                        )
                        }) : <li className="t-center">Please select a Pokémon</li> }
                    </ul>
                </Col>
                <Col>
                    <h4>Types ✳️</h4>
                    <ul>
                        { (pokemon.types?.length > 0) ? pokemon.types.map( (data, index) => {
                        return (
                        index < 5 && <li key={ index }>  {/*Show only top 5 types*/}
                            <li>{ data.type.name }</li>
                        </li>
                        )
                        }) : <li className="t-center">Please select a Pokémon</li> }
                    </ul>
                </Col>
            </Row>
        </div>
    )
  };
  

export default PokeData;
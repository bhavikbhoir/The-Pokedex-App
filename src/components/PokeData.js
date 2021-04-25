import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import './styles/PokeData.css';
import MovesTable from './MovesTable';
import StatsTable from './StatsTable'

const PokeData = ({ pokemon }) => {
    console.log(pokemon);

    return (
        <div id="poke-data">
           <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                Moves 💪
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <MovesTable data={pokemon.moves}/>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                Stats 📊
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <StatsTable data={pokemon.stats}/>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        </div>
    )
  };
  

export default PokeData;
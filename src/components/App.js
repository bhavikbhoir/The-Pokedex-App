import React, { useState, useCallback, useRef } from 'react';
import PokeList from './PokeList';
import Pokemon from '../Pokemon';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import PokeSearch from './PokeSearch';
import PokeData from './PokeData';
import { Col, Row } from 'react-bootstrap';
import AlertBox from './AlertBox';
import Loader from './Loader';

const App = () => {
  const [state, setState] = useState({
    pokemon: {},
    showAlert: false,
    showLoader: false,
  });
  const cache = useRef({});

  const handleOnClick = useCallback(async (id) => {
    if (cache.current[id]) {
      setState(prev => ({ ...prev, pokemon: cache.current[id], showAlert: false }));
      return;
    }

    setState(prev => ({ ...prev, showLoader: true, showAlert: false }));

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await res.json();
      const pokemon = new Pokemon(data);
      cache.current[id] = pokemon;
      setState({ pokemon, showLoader: false, showAlert: false });
    } catch (err) {
      setState(prev => ({ ...prev, showLoader: false, showAlert: true }));
    }
  }, []);

  return (
    <div className="App">
      <PokeSearch pokemon={state.pokemon} handleOnClick={handleOnClick}/>
      <div className="Main-Content">
        <Row>
          <Col lg={6} md={12} sm={12}>
            <div id="pokedex" className="Pokedex">
              <LeftPanel pokemon={state.pokemon} handleOnClick={handleOnClick}/>
              <RightPanel pokemon={state.pokemon} handleOnClick={handleOnClick}/>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <PokeData pokemon={state.pokemon}/>
          </Col>
        </Row>
        <PokeList handleOnClick={handleOnClick} />
      </div>
      {state.showAlert && <AlertBox />}
      {state.showLoader && <Loader /> }
    </div>
  );
};

export default App;
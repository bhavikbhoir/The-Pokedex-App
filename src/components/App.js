import React, { useState, useCallback, useRef, useEffect } from 'react';
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

const getPotdId = () => {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return (seed % 1025) + 1;
};

const App = () => {
  const [state, setState] = useState({
    pokemon: {},
    showAlert: false,
    showLoader: false,
    errorMsg: '',
    isShiny: false,
    evolutionChain: null,
    flavorText: '',
  });
  const cache = useRef({});
  const evolutionCache = useRef({});
  const [potd, setPotd] = useState(null);

  useEffect(() => {
    const id = getPotdId();
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(r => r.json())
      .then(data => setPotd({ id, name: data.name, sprite: data.sprites.front_default }))
      .catch(() => {});
  }, []);

  const handleOnClick = useCallback(async (id) => {
    if (cache.current[id]) {
      setState(prev => ({ ...prev, pokemon: cache.current[id], showAlert: false, isShiny: false }));
      fetchEvolutionChain(cache.current[id].species_url);
      return;
    }

    setState(prev => ({ ...prev, showLoader: true, showAlert: false }));

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      if (!res.ok) {
        throw new Error(res.status === 404 ? 'NOT_FOUND' : 'NETWORK_ERROR');
      }
      const data = await res.json();
      const pokemon = new Pokemon(data);
      cache.current[id] = pokemon;
      setState(prev => ({ ...prev, pokemon, showLoader: false, showAlert: false, errorMsg: '', isShiny: false }));
      fetchEvolutionChain(pokemon.species_url);
    } catch (err) {
      const errorMsg = err.message === 'NOT_FOUND'
        ? 'Pokémon not found. Try a different name or ID (1-151).'
        : 'Network error. Please check your connection and try again.';
      setState(prev => ({ ...prev, showLoader: false, showAlert: true, errorMsg }));
    }
  }, []);

  const fetchEvolutionChain = async (speciesUrl) => {
    try {
      const speciesRes = await fetch(speciesUrl);
      const speciesData = await speciesRes.json();
      
      const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || '';
      
      if (evolutionCache.current[speciesData.evolution_chain.url]) {
        setState(prev => ({ 
          ...prev, 
          evolutionChain: evolutionCache.current[speciesData.evolution_chain.url],
          flavorText: flavorText.replace(/\f/g, ' ')
        }));
        return;
      }

      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();
      evolutionCache.current[speciesData.evolution_chain.url] = evolutionData.chain;
      setState(prev => ({ 
        ...prev, 
        evolutionChain: evolutionData.chain,
        flavorText: flavorText.replace(/\f/g, ' ')
      }));
    } catch (err) {
      console.error('Evolution fetch error:', err);
    }
  };

  const toggleShiny = useCallback(() => {
    setState(prev => ({ ...prev, isShiny: !prev.isShiny }));
  }, []);

  return (
    <div className="App">
      <PokeSearch pokemon={state.pokemon} handleOnClick={handleOnClick}/>
      <div className="Main-Content">
        {potd && (
          <div className="potd-banner" onClick={() => handleOnClick(potd.id)}>
            <img src={potd.sprite} alt={potd.name} />
            <div className="potd-text">
              <small>⭐ Pokémon of the Day</small>
              <strong>{potd.name}</strong>
            </div>
          </div>
        )}
        <Row>
          <Col lg={6} md={12} sm={12}>
            <div id="pokedex" className="Pokedex">
              <LeftPanel 
                pokemon={state.pokemon} 
                handleOnClick={handleOnClick}
                isShiny={state.isShiny}
                toggleShiny={toggleShiny}
              />
              <RightPanel pokemon={state.pokemon} handleOnClick={handleOnClick}/>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <PokeData 
              pokemon={state.pokemon}
              evolutionChain={state.evolutionChain}
              flavorText={state.flavorText}
              handleOnClick={handleOnClick}
            />
          </Col>
        </Row>
        <PokeList handleOnClick={handleOnClick} />
      </div>
      {state.showAlert && <AlertBox message={state.errorMsg} />}
      {state.showLoader && <Loader /> }
    </div>
  );
};

export default App;
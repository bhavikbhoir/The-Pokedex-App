import React from 'react';
import PokeCell from './PokeCell';
import { pokeClasses } from '../pokeClasses';
import './styles/PokeList.css';

const PokeList = ({ handleOnClick }) => {
    const cells = pokeClasses.map(pokeClass => {
      return (
        <PokeCell 
          key={pokeClass.id} 
          pokeClass={pokeClass} 
          handleOnClick={handleOnClick}
        />
      );
    });

  return (
    <>
    <h3>Pick the Pokémon you encountered</h3>
    <section className="poke-list">
        {cells}
    </section>
    </>
  )
}

export default PokeList;
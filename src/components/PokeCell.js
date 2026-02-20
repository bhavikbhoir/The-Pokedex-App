import React from 'react';
import sprites from '../assets/sprites.png';
import './styles/PokeCell.css';


const PokeCell = ({ pokeClass, handleOnClick }) => {
    const { id, backgroundPosition } = pokeClass;
    const style = { backgroundImage: `url(${sprites})`, backgroundPosition };
  
    return (
      <button 
        onClick={() => handleOnClick(id)} 
        style={style} 
        className="poke-cell"
        aria-label={`Select Pokemon ${id}`}
        type="button"
      />
    );
  };
  

export default PokeCell;
import React from 'react';
import './styles/PokeCell.css';

const PokeCell = ({ pokeClass, handleOnClick }) => {
    const { id, name } = pokeClass;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <button 
        onClick={() => handleOnClick(id)} 
        className="poke-cell"
        aria-label={`Select ${name || `Pokemon ${id}`}`}
        type="button"
        title={name}
      >
        <img src={spriteUrl} alt={name} loading="lazy" />
        <span className="poke-cell-name">{name}</span>
      </button>
    );
};

export default PokeCell;
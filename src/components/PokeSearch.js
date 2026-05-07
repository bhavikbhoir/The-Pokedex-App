import React from 'react';
import './styles/LeftPanel.css';


const PokeSearch = ({ handleOnClick }) => {
    const [searchValue, setSearchValue] = React.useState('');

    const handleSearch = (value) => {
      if (!value) return;
      handleOnClick(String(value).toLowerCase());
      setSearchValue('');
    };

    const handleRandom = () => {
      handleOnClick(Math.floor(Math.random() * 1025) + 1);
    };

    return (
      <div className="search-container">
        <input
          id="name-input"
          type="text"
          placeholder="Search Pokémon by Name/Id"
          value={searchValue}
          onKeyDown={(e) => { e.key === 'Enter' && handleSearch(e.target.value); }}
          onChange={(e) => setSearchValue(e.target.value)}
          aria-label="Search Pokemon by name or ID"
          role="searchbox"
        />
        <button
          className="random-btn"
          onClick={handleRandom}
          title="Random Pokémon"
          type="button"
          aria-label="Random Pokemon"
        >
          ?
        </button>
        <button
          id="search-btn"
          className="ball-container mr-0"
          onClick={() => handleSearch(searchValue)}
          aria-label="Search"
          type="button"
        >
          <div className="upper-half-ball"></div>
          <div className="bottom-half-ball"></div>
          <div className="center-ball"></div>
          <div className="center-line"></div>
        </button>
      </div>
    );
  };
  
export default PokeSearch;
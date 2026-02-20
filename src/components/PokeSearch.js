import React from 'react';
import './styles/LeftPanel.css';


const PokeSearch = ({ handleOnClick }) => {
    const [searchValue, setSearchValue] = React.useState('')
  
    const handleSearch = (value) => {
      if (!value) return;
      value = String(value).toLowerCase()
      handleOnClick(value)
      setSearchValue('')
    }
  
    const handleChange = (value) => {
      setSearchValue(value)
    }
    return (
    <div className="search-container">
      <input 
        id="name-input"
        type="text" 
        placeholder="Search Pokémon by Name/Id" 
        value={searchValue}
        onKeyDown={(e)=>{e.key === "Enter" && handleSearch(e.target.value)}} 
        onChange={(e)=>handleChange(e.target.value)}
        aria-label="Search Pokemon by name or ID"
        role="searchbox"
      />

      <button 
        id="search-btn" 
        className="ball-container mr-0" 
        onClick={()=>handleSearch(searchValue)}
        aria-label="Search"
        type="button"
      >
        <div className="upper-half-ball"></div>
        <div className="bottom-half-ball"></div>
        <div className="center-ball"></div>
        <div className="center-line"></div>
      </button>    
      </div>
    )
  };
  
export default PokeSearch;
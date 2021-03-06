import React from 'react';
import './styles/LeftPanel.css';


const PokeSearch = ({ handleOnClick }) => {
    const [searchValue, setSearchValue] = React.useState()
  
    const handleSearch = (value) => {
      value = String(value).toLowerCase()
      handleOnClick(value)
    }
  
    const handleChange = (value) => {
      setSearchValue(value)
    }
    return (
    <div class="search-container">
      <input 
        id="name-input"
        type="text" 
        placeholder="Search Pokémon by Name/Id" 
        onKeyDown={(e)=>{e.key === "Enter" && handleSearch(e.target.value)}} 
        onChange={(e)=>handleChange(e.target.value)}
      />

      <div id="search-btn" className="ball-container mr-0" onClick={()=>handleSearch(searchValue)}>
        <div class="upper-half-ball"></div>
        <div class="bottom-half-ball"></div>
        <div class="center-ball"></div>
        <div class="center-line"></div>
      </div>    
      </div>
    )
  };
  
export default PokeSearch;
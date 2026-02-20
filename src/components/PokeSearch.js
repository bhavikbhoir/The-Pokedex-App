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
    <div className="search-container">
      <input 
        id="name-input"
        type="text" 
        placeholder="Search Pokémon by Name/Id" 
        onKeyDown={(e)=>{e.key === "Enter" && handleSearch(e.target.value)}} 
        onChange={(e)=>handleChange(e.target.value)}
      />

      <div id="search-btn" className="ball-container mr-0" onClick={()=>handleSearch(searchValue)}>
        <div className="upper-half-ball"></div>
        <div className="bottom-half-ball"></div>
        <div className="center-ball"></div>
        <div className="center-line"></div>
      </div>    
      </div>
    )
  };
  
export default PokeSearch;
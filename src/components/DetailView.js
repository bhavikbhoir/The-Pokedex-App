import React from 'react';
import './styles/DetailView.css';

const DetailView = ({ pokemon, handleOnClick }) => {
  const { id, name, type } = pokemon;
  const imageId = ('00' + id).slice(-3);

  const [searchValue, setSearchValue] = React.useState()

  const handleSearch = (value) => {
    handleOnClick(value)
  }

  const handleChange = (value) => {
    setSearchValue(value)
  }

  return (
    <section className="detail-view">
        <div class="screen-container">
          <div class="screen">
            <div class="top-screen-lights">
              <div class="mini-light red"></div>
              <div class="mini-light red"></div>
            </div>
            <div id="main-screen" style={{backgroundImage: `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageId}.png')`}}>
            </div>
            <div class="bottom-screen-lights">
              <div class="small-light red">
                <div class="dot light-red"></div>
              </div>
              <div class="burger">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
      
      {/* <div className='data-wrapper'>
        <h1 className='data-name'>ID: {id} {name}</h1>
        <p className="data-char">Type: {type}</p>
      </div> */}
      <div class="bottom-screens-container">
          <div id="type-screen" class="right-panel-screen">Type: {type}</div>
          <div id="id-screen" class="right-panel-screen">ID: {id} {name}</div>
      </div>
      <div class="search-container">
      <input 
        id="name-input" 
        type="text" 
        placeholder="Name / id" 
        onKeyDown={(e)=>{e.key === "Enter" && handleSearch(e.target.value)}} 
        onChange={(e)=>handleChange(e.target.value)}
      />

      <div id="search-btn" class="ball-container" onClick={()=>handleSearch(searchValue)}>
        <div class="upper-half-ball"></div>
        <div class="bottom-half-ball"></div>
        <div class="center-ball"></div>
        <div class="center-line"></div>
      </div>
    </div>
    </section>
  )
}

export default DetailView;
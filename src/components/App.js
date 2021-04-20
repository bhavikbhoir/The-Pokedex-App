import React, { Component } from 'react';
import PokeList from './PokeList';
import DetailView from './DetailView';
import Pokemon from '../Pokemon';
import './styles/App.css';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import PokeSearch from './PokeSearch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {}
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }


  handleOnClick(id) {
    fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => {
        const pokemon = new Pokemon(data);
        this.setState({ pokemon });
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
        <PokeSearch pokemon={this.state.pokemon} handleOnClick={this.handleOnClick}/>
        <div className="Main-Content">
          <div id="pokedex" className="Pokedex">
            <LeftPanel pokemon={this.state.pokemon} handleOnClick={this.handleOnClick}/>
            <RightPanel pokemon={this.state.pokemon} handleOnClick={this.handleOnClick}/>
          </div>
          {/* <div className="Pick-Block"> */}
            <PokeList handleOnClick={this.handleOnClick} />
            {/* <DetailView pokemon={this.state.pokemon} handleOnClick={this.handleOnClick}/> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default App;
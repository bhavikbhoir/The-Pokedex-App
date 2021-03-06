import React, { Component } from 'react';
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
      showAlert: false,
      showLoader: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }


  handleOnClick (id) {
    this.setState({showLoader: true});
    this.setState({showAlert: false});
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => {
        const pokemon = new Pokemon(data);
        this.setState({ pokemon });
        setTimeout(() => this.setState({showLoader: false}), 1000)
      })
      .catch(err => {
        this.setState({showLoader: false});
        this.setState({showAlert: true});
        console.log(err)
      });
  }


  render() {
    return (
      <div className="App">
        <PokeSearch pokemon={this.state.pokemon} handleOnClick={this.handleOnClick}/>
        <div className="Main-Content">
          <Row>
            <Col lg={6} md={12} sm={12}>
              <div id="pokedex" className="Pokedex">
                <LeftPanel pokemon={this.state.pokemon} handleOnClick={this.handleOnClick}/>
                <RightPanel pokemon={this.state.pokemon} handleOnClick={this.handleOnClick}/>
              </div>
            </Col>
            <Col lg={6} md={12} sm={12}>
              <PokeData pokemon={this.state.pokemon}/>
            </Col>
          </Row>
          <PokeList handleOnClick={this.handleOnClick} />
        </div>
        {this.state.showAlert && <AlertBox />}
        {this.state.showLoader && <Loader /> }
      </div>
    );
  }
}

export default App;
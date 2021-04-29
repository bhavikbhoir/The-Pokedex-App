import React from 'react';
import './styles/RightPanel.css';


const RightPanel = ({ pokemon }) => {
    const { id, type, height, weight } = pokemon;
    const [pokeHeight, setPokeHeight] = React.useState('')
    const [pokeWeight, setPokeWeight] = React.useState('')

    React.useEffect(() => {
        setPokeHeight(height !== undefined ? height : 0);
        setPokeWeight(weight !== undefined ? weight : 0);
    }, [height, weight])

    return (
        <div id="right-panel">
        <div className="empty-container">
          <svg height="100%" width="100%">
            <polyline
              points="0,0 0,40 138,40 158,75 250,75 250,0 0,0"
              style={{fill: "#a3b4bc", stroke: "none", strokeWidth: 3}} //fill to match cloud color
            />
            <polyline
              points="0,40 138,40 158,75 250,75"
              style={{fill: "none", stroke: "black", strokeWidth: 3}}
            />
          </svg>
        </div>
        <div className="top-screen-container">
          <div id="about-screen" className="right-panel-screen">
            Height: {pokeHeight*10}cm
            <br/>
            Weight: {pokeWeight/10}kg
          </div>
        </div>
        <div className="square-buttons-container">
          <div className="blue-squares-container">
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
          </div>
        </div>
        <div className="center-buttons-container">
          <div className="center-left-container">
            <div className="small-reds-container">
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
            </div>
            <div className="white-squares-container">
              <div className="white-square"></div>
              <div className="white-square"></div>
            </div>
          </div>
          <div className="center-right-container">
            <div className="thin-buttons-container">
              <div className="thin-button"></div>
              <div className="thin-button"></div>
            </div>
            <div className="yellow-button yellow">
              <div className="big-dot light-yellow"></div>
            </div>
          </div>
        </div>
        <div className="bottom-screens-container">
          <div id="type-screen" className="right-panel-screen">{type}</div>
          <div id="id-screen" className="right-panel-screen">#{id}</div>
        </div>
      </div>
    )
  };

export default RightPanel;
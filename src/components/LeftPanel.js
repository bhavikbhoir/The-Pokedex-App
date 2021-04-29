import React from 'react';
import './styles/LeftPanel.css';

const LeftPanel = ({ pokemon }) => {
    const { id, name } = pokemon;
    const imageId = ('00' + id).slice(-3);
    return (
        <div id="left-panel">
            <div className="left-top-container">
            <svg height="100" width="225" className="left-svg">
                <polyline
                points="0,75 70,75 90,38 224,38"
                style={{fill: "none", stroke: "black", strokeWidth: 3}}
                />
            </svg>
            <div className="lights-container">
                <div className="big-light-boarder">
                <div className={`big-light blue ${imageId !== "ned" ? "blink" : "big-light blue"}`}>
                    <div className="big-dot light-blue"></div>
                </div>
                </div>
                <div className="small-lights-container">
                <div className="small-light red">
                    <div className="dot light-red"></div>
                </div>
                <div className="small-light yellow">
                    <div className="dot light-yellow"></div>
                </div>
                <div className="small-light green">
                    <div className="dot light-green"></div>
                </div>
                </div>
            </div>
            </div>
            <div className="screen-container">
            <div className="screen">
                <div className="top-screen-lights">
                <div className="mini-light red"></div>
                <div className="mini-light red"></div>
                </div>
                <div id="main-screen" style={{backgroundImage: `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageId}.png')`}}></div>
                <div className="bottom-screen-lights">
                <div className="small-light red">
                    <div className="dot light-red"></div>
                </div>
                <div className="burger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                </div>
            </div>
            </div>
            <div className="buttons-container">
            <div className="upper-buttons-container">
                <div className="big-button"></div>
                <div className="long-buttons-container">
                <div className="long-button red"></div>
                <div className="long-button light-blue"></div>
                </div>
            </div>
            <div className="nav-buttons-container">
                <div className="dots-container">
                <div>.</div>
                <div>.</div>
                </div>
                <div className="green-screen">
                <span id="name-screen">{name}</span>
                </div>
                <div className="right-nav-container">
                <div className="nav-button">
                    <div className="nav-center-circle"></div>
                    <div className="nav-button-vertical"></div>
                    <div className="nav-button-horizontal">
                    <div className="border-top"></div>
                    <div className="border-bottom"></div>
                    </div>
                </div>
                <div className="bottom-right-nav-container">
                    <div className="small-light red">
                    <div className="dot light-red"></div>
                    </div>
                    <div className="dots-container">
                    <div className="black-dot">.</div>
                    <div className="black-dot">.</div>
                    <div className="black-dot">.</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
  };
  

export default LeftPanel;
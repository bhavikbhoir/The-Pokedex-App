import React from 'react';
import './styles/LeftPanel.css';

const LeftPanel = ({ pokemon, isShiny, toggleShiny }) => {
    const { id, name, sprite, spriteShiny, cries } = pokemon;
    const imageId = ('00' + id).slice(-3);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = React.useRef(null);

    const playSound = () => {
        if (cries?.latest && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
            audioRef.current.onended = () => setIsPlaying(false);
        }
    };

    const displaySprite = isShiny ? spriteShiny : sprite;
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
                <div 
                  id="main-screen" 
                  style={{backgroundImage: displaySprite ? `url('${displaySprite}')` : `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageId}.png')`}}
                  role="img"
                  aria-label={name ? `${name} sprite` : 'No Pokemon selected'}
                >
                  {!id && <div className="empty-state">👆 Search or select a Pokémon</div>}
                  {cries?.latest && <audio ref={audioRef} src={cries.latest} />}
                </div>
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
                <button 
                  className="big-button" 
                  onClick={playSound} 
                  style={{cursor: cries?.latest ? 'pointer' : 'default', border: 'solid 2px black'}} 
                  title="Play cry"
                  disabled={!cries?.latest}
                >
                    {isPlaying && <span className="sound-wave">🔊</span>}
                </button>
                <div className="long-buttons-container">
                <div className="long-button red"></div>
                <button 
                  className="long-button light-blue" 
                  onClick={toggleShiny} 
                  style={{cursor: id ? 'pointer' : 'default', border: 'none'}} 
                  title="Toggle shiny"
                  disabled={!id}
                />
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
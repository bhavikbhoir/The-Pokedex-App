import React from 'react';
import './styles/Loader.css'

export default function Loader() {
    return (
        <div className="center-on-page">
            <div className="pokeball">
                <div className="pokeball__button"></div>
            </div>
            <p>Loading...</p>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import './styles/LocationEncounters.css';

const LocationEncounters = ({ pokemonId }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pokemonId) return;
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`)
            .then(r => r.json())
            .then(data => {
                setLocations(data.slice(0, 5));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [pokemonId]);

    if (loading) return <p className="t-center">Loading...</p>;
    if (!locations.length) return <p className="t-center">Not found in the wild</p>;

    return (
        <ul className="location-list">
            {locations.map((loc, i) => (
                <li key={i} className="location-item">
                    📍 {loc.location_area.name.replace(/-/g, ' ')}
                </li>
            ))}
        </ul>
    );
};

export default LocationEncounters;

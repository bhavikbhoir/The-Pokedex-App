import React, { useState } from 'react';
import './styles/MoveModal.css';

const MoveModal = ({ move, onClose }) => {
  const [moveData, setMoveData] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchMoveData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/move/${move.move.name}`);
        const data = await res.json();
        setMoveData(data);
        setLoading(false);
      } catch (err) {
        console.error('Move fetch error:', err);
        setLoading(false);
      }
    };
    fetchMoveData();
  }, [move]);

  if (loading) return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <p>Loading...</p>
      </div>
    </div>
  );

  if (!moveData) return null;

  const typeColors = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
    grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
    ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
    steel: '#B8B8D0', fairy: '#EE99AC'
  };

  const effect = moveData.effect_entries.find(e => e.language.name === 'en')?.effect || 'No description';
  const cleanEffect = effect.replace(/\$effect_chance/g, moveData.effect_chance || '0');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 style={{textTransform: 'capitalize'}}>{moveData.name.replace('-', ' ')}</h2>
        <span className="type-badge" style={{backgroundColor: typeColors[moveData.type.name]}}>
          {moveData.type.name}
        </span>
        <div className="move-stats">
          <div className="stat-item">
            <strong>Power:</strong> {moveData.power || 'N/A'}
          </div>
          <div className="stat-item">
            <strong>Accuracy:</strong> {moveData.accuracy || 'N/A'}
          </div>
          <div className="stat-item">
            <strong>PP:</strong> {moveData.pp}
          </div>
          <div className="stat-item">
            <strong>Class:</strong> {moveData.damage_class.name}
          </div>
        </div>
        <p className="move-effect">{cleanEffect}</p>
      </div>
    </div>
  );
};

export default MoveModal;

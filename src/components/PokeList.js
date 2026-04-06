import React, { useState, useEffect } from 'react';
import PokeCell from './PokeCell';
import './styles/PokeList.css';

const GENERATIONS = [
  { label: 'Gen I',   start: 1,   end: 151  },
  { label: 'Gen II',  start: 152, end: 251  },
  { label: 'Gen III', start: 252, end: 386  },
  { label: 'Gen IV',  start: 387, end: 493  },
  { label: 'Gen V',   start: 494, end: 649  },
  { label: 'Gen VI',  start: 650, end: 721  },
  { label: 'Gen VII', start: 722, end: 809  },
  { label: 'Gen VIII',start: 810, end: 905  },
  { label: 'Gen IX',  start: 906, end: 1025 },
];

const PokeList = ({ handleOnClick }) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('id-asc');
    const [gen, setGen] = useState(0); // index into GENERATIONS
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { start, end } = GENERATIONS[gen];
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${end - start + 1}&offset=${start - 1}`)
            .then(r => r.json())
            .then(data => {
                const list = data.results.map((p, i) => ({
                    id: String(start + i),
                    name: p.name,
                }));
                setPokemonList(list);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [gen]);

    const filtered = pokemonList
        .filter(p => !search || p.name.includes(search.toLowerCase()) || p.id.includes(search))
        .sort((a, b) => {
            if (sort === 'id-asc')   return Number(a.id) - Number(b.id);
            if (sort === 'id-desc')  return Number(b.id) - Number(a.id);
            if (sort === 'name-asc') return a.name.localeCompare(b.name);
            if (sort === 'name-desc')return b.name.localeCompare(a.name);
            return 0;
        });

    return (
        <>
        <div className="poke-list-controls">
            <input
                type="text"
                placeholder="Search by name or ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="poke-filter-input"
            />
            <select value={sort} onChange={e => setSort(e.target.value)} className="poke-sort-select">
                <option value="id-asc">ID ↑</option>
                <option value="id-desc">ID ↓</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
            </select>
            <div className="gen-tabs">
                {GENERATIONS.map((g, i) => (
                    <button
                        key={i}
                        className={`gen-tab ${gen === i ? 'active' : ''}`}
                        onClick={() => { setGen(i); setSearch(''); }}
                    >
                        {g.label}
                    </button>
                ))}
            </div>
        </div>
        <h3>Pick the Pokémon you encountered</h3>
        <section className="poke-list">
            {loading
                ? <p style={{padding:'1rem'}}>Loading...</p>
                : filtered.map(p => (
                    <PokeCell key={p.id} pokeClass={p} handleOnClick={handleOnClick} />
                ))
            }
        </section>
        </>
    );
};

export default PokeList;

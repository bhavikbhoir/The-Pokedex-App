import React from 'react';
import PokeCell from './PokeCell';
import { pokeClasses } from '../pokeClasses';
import './styles/PokeList.css';

const POKEMON_NAMES = [
  'bulbasaur','ivysaur','venusaur','charmander','charmeleon','charizard','squirtle','wartortle','blastoise','caterpie',
  'metapod','butterfree','weedle','kakuna','beedrill','pidgey','pidgeotto','pidgeot','rattata','raticate',
  'spearow','fearow','ekans','arbok','pikachu','raichu','sandshrew','sandslash','nidoran-f','nidorina',
  'nidoqueen','nidoran-m','nidorino','nidoking','clefairy','clefable','vulpix','ninetales','jigglypuff','wigglytuff',
  'zubat','golbat','oddish','gloom','vileplume','paras','parasect','venonat','venomoth','diglett',
  'dugtrio','meowth','persian','psyduck','golduck','mankey','primeape','growlithe','arcanine','poliwag',
  'poliwhirl','poliwrath','abra','kadabra','alakazam','machop','machoke','machamp','bellsprout','weepinbell',
  'victreebel','tentacool','tentacruel','geodude','graveler','golem','ponyta','rapidash','slowpoke','slowbro',
  'magnemite','magneton','farfetchd','doduo','dodrio','seel','dewgong','grimer','muk','shellder',
  'cloyster','gastly','haunter','gengar','onix','drowzee','hypno','krabby','kingler','voltorb',
  'electrode','exeggcute','exeggutor','cubone','marowak','hitmonlee','hitmonchan','lickitung','koffing','weezing',
  'rhyhorn','rhydon','chansey','tangela','kangaskhan','horsea','seadra','goldeen','seaking','staryu',
  'starmie','mr-mime','scyther','jynx','electabuzz','magmar','pinsir','tauros','magikarp','gyarados',
  'lapras','ditto','eevee','vaporeon','jolteon','flareon','porygon','omanyte','omastar','kabuto',
  'kabutops','aerodactyl','snorlax','articuno','zapdos','moltres','dratini','dragonair','dragonite','mewtwo','mew'
];

const PokeList = ({ handleOnClick }) => {
    const [search, setSearch] = React.useState('');
    const [sort, setSort] = React.useState('id-asc');

    const enriched = pokeClasses.map((p, i) => ({ ...p, name: POKEMON_NAMES[i] || `#${p.id}` }));

    const filtered = enriched
        .filter(p => !search || p.name.includes(search.toLowerCase()) || p.id.toString().includes(search))
        .sort((a, b) => {
            if (sort === 'id-asc') return Number(a.id) - Number(b.id);
            if (sort === 'id-desc') return Number(b.id) - Number(a.id);
            if (sort === 'name-asc') return a.name.localeCompare(b.name);
            if (sort === 'name-desc') return b.name.localeCompare(a.name);
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
        </div>
        <h3>Pick the Pokémon you encountered</h3>
        <section className="poke-list">
            {filtered.map(pokeClass => (
                <PokeCell key={pokeClass.id} pokeClass={pokeClass} handleOnClick={handleOnClick} />
            ))}
        </section>
        </>
    );
};

export default PokeList;
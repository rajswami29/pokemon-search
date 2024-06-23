// app/page.js
'use client'; // Add this line

import { useEffect, useState } from 'react';
import SeachForm from './Components/SearchForm';
import PokemonList from './Components/PokemonList';
import { getPokemonList } from './utils/getList';

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [filters, setFilters] = useState({ type: '', searchTerm: '' });

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonList = await getPokemonList(
        filters.type,
        filters.searchTerm
      );
      setPokemon(pokemonList);
    };
    fetchPokemon();
  }, [filters]);

  const handleFilterChange = (type, searchTerm) => {
    setFilters({ type, searchTerm });
  };

  return (
    <div className="container mx-auto p-4">
      <SeachForm onFilterChange={handleFilterChange} />
      <PokemonList pokemon={pokemon} />
    </div>
  );
}

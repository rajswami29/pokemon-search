import { MAIN_API_URL } from './apiConstant';

export const getPokemonTypes = async () => {
  const response = await fetch(`${MAIN_API_URL}/type`);
  const data = await response.json();
  return data.results;
};

export const getPokemonList = async (type = '', searchTerm = '') => {
  const response = await fetch(`${MAIN_API_URL}/pokemon?limit=151`);
  const data = await response.json();
  let pokemonList = data.results;

  if (type) {
    const typeResponse = await fetch(`${MAIN_API_URL}/type/${type}`);
    const typeData = await typeResponse.json();
    pokemonList = typeData.pokemon.map((p) => p.pokemon);
  }

  if (searchTerm) {
    pokemonList = pokemonList.filter((p) =>
      p.name.includes(searchTerm.toLowerCase())
    );
  }

  return pokemonList;
};

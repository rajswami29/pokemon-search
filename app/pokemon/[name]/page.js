// app/pokemon/[name]/page.js
import { ABILITIES, BACK, MOVES, NAME, STATS, TYPES } from '@/app/Constant';
import { MAIN_API_URL } from '@/app/utils/apiConstant';
import { getPokemonList } from '@/app/utils/getList';
import Link from 'next/link';

export async function generateStaticParams() {
  const pokemon = await getPokemonList();
  return pokemon.map((p) => ({ name: p.name }));
}

async function getPokemon(name) {
  const res = await fetch(`${MAIN_API_URL}/pokemon/${name}`);
  return res.json();
}

export default async function PokemonDetail({ params }) {
  const pokemon = await getPokemon(params.name);
  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4">
        <Link href="/">&lt; {BACK}</Link>
      </nav>

      <div className="w-1/3 border rounded-lg shadow-md hover:shadow-lg transition-shadow m-auto">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="bg-green-400 w-full h-48 object-contain p-4"
        />
        <div className="w-full bg-orange-400 h-auto p-4">
          <ul className="mb-3 font-normal">
            <li>
              <span className="font-bold">{NAME}</span> {pokemon.name}
            </li>
            <li>
              <span className="font-bold">{TYPES}</span>{' '}
              {pokemon.types.map((t) => t.type.name).join(', ')}
            </li>
            <li>
              <span className="font-bold">{STATS}</span>{' '}
              {pokemon.stats.map((t) => t.stat.name).join(', ')}
            </li>
            <li>
              <span className="font-bold">{ABILITIES}</span>{' '}
              {pokemon.abilities.map((t) => t.ability.name).join(', ')}
            </li>
            <li>
              <span className="font-bold">{MOVES}</span>{' '}
              {pokemon.moves.map((t) => t.move.name).join(', ')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

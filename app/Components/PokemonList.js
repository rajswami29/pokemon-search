import Link from 'next/link';

const PokemonList = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemon.map((p) => (
        <div
          key={p.name}
          className="border rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            src={`https://img.pokemondb.net/artwork/${p.name}.jpg`}
            alt={p.name}
            className="w-full h-48 object-contain p-4"
          />

          <div className="w-full bg-gray-100 h-auto p-4">
            <h2 className="text-xl capitalize mb-2">{p.name}</h2>
            <Link href={`/pokemon/${p.name}`}>Details &rarr;</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;

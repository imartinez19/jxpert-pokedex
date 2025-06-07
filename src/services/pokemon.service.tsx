import { PokemonListItem, Pokemon } from "../types/pokemon";
import { Range } from "../types/regions";

const API_BASE_URL = "https://pokeapi.co/api/v2";

async function getPokemonList(
  pokemonRegion: Range,
): Promise<PokemonListItem[]> {
  let pokemonList = await fetch(
    `${API_BASE_URL}/pokemon?offset=${pokemonRegion.start}&limit=${pokemonRegion.end}`,
  );
  return (await pokemonList.json()).results;
}

async function getPokemonDetail(url: string): Promise<Pokemon> {
  const pokemon = await fetch(url);
  return pokemon.json();
}
export async function getPokemonData(pokemonRegion: Range) {
  const pokemon = await getPokemonList(pokemonRegion);
  return await Promise.all(
    pokemon.map(
      async (pokemon: PokemonListItem) => await getPokemonDetail(pokemon.url),
    ),
  );
}

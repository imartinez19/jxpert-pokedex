import { Range } from "../domain/Region";
import { Pokemon, PokemonListItem } from "../domain/Pokemon";
import { PokemonRepository } from "../domain/PokemonRepository";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export class ApiPokemonRepository implements PokemonRepository {
  async listByRegion(region: Range): Promise<Pokemon[]> {
    const pokemon = await getPokemonList(region);
    return await Promise.all(
      pokemon.map(
        async (pokemon: PokemonListItem) => await getPokemonDetail(pokemon.url),
      ),
    );
  }
}

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

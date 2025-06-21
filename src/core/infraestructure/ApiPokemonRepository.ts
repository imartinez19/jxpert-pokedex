import { Region } from "../domain/Region";
import { Pokemon, PokemonListItem } from "../domain/Pokemon";
import { PokemonRepository } from "../domain/PokemonRepository";

const API_BASE_URL = "https://pokeapi.co/api/v2";

type Range = { start: number; end: number };

type RegionRanges = Record<Region, Range>;

const REGIONS_RANGES: RegionRanges = {
  kanto: { start: 0, end: 151 },
  johto: { start: 151, end: 100 },
  hoenn: { start: 251, end: 135 },
  sinnoh: { start: 386, end: 108 },
  unova: { start: 494, end: 155 },
  kalos: { start: 649, end: 72 },
  alola: { start: 721, end: 88 },
  galar: { start: 809, end: 96 },
  paldea: { start: 905, end: 120 },
};

export class ApiPokemonRepository implements PokemonRepository {
  async listByRegion(region: Region): Promise<Pokemon[]> {
    const pokemon = await getPokemonList(region);
    return await Promise.all(
      pokemon.map(
        async (pokemon: PokemonListItem) => await getPokemonDetail(pokemon.url),
      ),
    );
  }
}

async function getPokemonList(
  pokemonRegion: Region,
): Promise<PokemonListItem[]> {
  let pokemonList = await fetch(
    `${API_BASE_URL}/pokemon?offset=${REGIONS_RANGES[pokemonRegion].start}&limit=${REGIONS_RANGES[pokemonRegion].end}`,
  );
  return (await pokemonList.json()).results;
}

async function getPokemonDetail(url: string): Promise<Pokemon> {
  const pokemonDTO = await (await fetch(url)).json();
  const pokemon: Pokemon = {
    id: pokemonDTO.id,
    name: pokemonDTO.name,
    image: pokemonDTO.sprites.other["official-artwork"].front_default,
    stats: {
      Hp: pokemonDTO.stats[0].base_stat,
      At: pokemonDTO.stats[1].base_stat,
      Df: pokemonDTO.stats[2].base_stat,
      SpA: pokemonDTO.stats[3].base_stat,
      SpD: pokemonDTO.stats[4].base_stat,
      Spd: pokemonDTO.stats[5].base_stat,
    },
    types: pokemonDTO.types.map((t: any) => t.type.name),
  };

  return pokemon;
}

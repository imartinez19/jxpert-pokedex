export type PokemonListItem = { name: string; url: string };

export type PokemonStat = { base_stat: number; stat: { name: string } };

export interface Pokemon {
  id: number;
  name: string;
  sprites: any;
  types: any;
  stats: PokemonStat[];
}

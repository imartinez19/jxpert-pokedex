export type PokemonListItem = { name: string; url: string };
export type PokemonStat = { base_stat: number; stat: { name: string } };
export type Pokemon = {
  id: number;
  name: string;
  sprites: any;
  types: any;
  stats: PokemonStat[];
};

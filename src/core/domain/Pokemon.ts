import { StatType } from "./Stat";

export type PokemonListItem = { name: string; url: string };

type PokemonStats = Record<StatType, number>;

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: PokemonStats;
}

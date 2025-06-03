/*type Range = { start: number; end: number };
type REGIONS =
  | "kanto"
  | "johto"
  | "hoenn"
  | "sinnoh"
  | "unova"
  | "kalos"
  | "alola"
  | "galar"
  | "paldea";
type RegionRanges = Record<REGIONS, Range>;

const REGIONS_RANGES: RegionRanges = {
  kanto: { start: 0, end: 151 },
  johto: { start: 151, end: 251 },
  hoenn: { start: 251, end: 386 },
  sinnoh: { start: 386, end: 494 },
  unova: { start: 494, end: 649 },
  kalos: { start: 649, end: 721 },
  alola: { start: 721, end: 809 },
  galar: { start: 809, end: 905 },
  paldea: { start: 905, end: 1025 },
};*/
export type PokemonListItem = { name: string; url: string };
export type Pokemon = {
  id: number;
  name: string;
  sprites: any;
  types: any;
  stats: any;
};
export type Region = { name: string; start: number; end: number };
export type Regions = { [key: string]: Region };
export type Stats = {
  [key: string]: string;
};
export type Icons = {
  [key: string]: string;
};

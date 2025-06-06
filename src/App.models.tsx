export const REGIONS = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
] as const;

export type Range = { start: number; end: number };
export type Region = (typeof REGIONS)[number];

type RegionRanges = Record<Region, Range>;

export const REGIONS_RANGES: RegionRanges = {
  kanto: { start: 0, end: 151 },
  johto: { start: 151, end: 251 },
  hoenn: { start: 251, end: 386 },
  sinnoh: { start: 386, end: 494 },
  unova: { start: 494, end: 649 },
  kalos: { start: 649, end: 721 },
  alola: { start: 721, end: 809 },
  galar: { start: 809, end: 905 },
  paldea: { start: 905, end: 1025 },
};

export const STATS = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
] as const;

type StatInfo = { shortName: string; label: string };
type StatType = (typeof STATS)[number];
type StatsInfo = Record<StatType, StatInfo>;

export const STATS_DETAILS: StatsInfo = {
  hp: { shortName: "Hp", label: "Health points" },
  attack: { shortName: "At", label: "Attack" },
  defense: { shortName: "Df", label: "Defense" },
  "special-attack": { shortName: "SpA", label: "Special attack" },
  "special-defense": { shortName: "SpD", label: "Special defense" },
  speed: { shortName: "Spd", label: "Speed" },
};

export type PokemonListItem = { name: string; url: string };
export type PokemonStat = { base_stat: number; stat: { name: string } };
export type Pokemon = {
  id: number;
  name: string;
  sprites: any;
  types: any;
  stats: PokemonStat[];
};
export type Stats = {
  [key: string]: string;
};
export type Icons = {
  [key: string]: string;
};

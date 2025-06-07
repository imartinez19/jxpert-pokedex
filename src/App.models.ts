import bug from "./assets/bug.svg";
import dark from "./assets/dark.svg";
import dragon from "./assets/dragon.svg";
import electric from "./assets/electric.svg";
import fairy from "./assets/fairy.svg";
import fighting from "./assets/fighting.svg";
import fire from "./assets/fire.svg";
import flying from "./assets/flying.svg";
import ghost from "./assets/ghost.svg";
import grass from "./assets/grass.svg";
import ground from "./assets/ground.svg";
import ice from "./assets/ice.svg";
import normal from "./assets/normal.svg";
import poison from "./assets/poison.svg";
import psychic from "./assets/psychic.svg";
import rock from "./assets/rock.svg";
import steel from "./assets/steel.svg";
import water from "./assets/water.svg";

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

export const STATS_INFO: StatsInfo = {
  hp: { shortName: "Hp", label: "Health points" },
  attack: { shortName: "At", label: "Attack" },
  defense: { shortName: "Df", label: "Defense" },
  "special-attack": { shortName: "SpA", label: "Special attack" },
  "special-defense": { shortName: "SpD", label: "Special defense" },
  speed: { shortName: "Spd", label: "Speed" },
};

// export const SORT_FIELDS = [
//   "default",
//   ...STATS
// ] as const;

// type SortField = (typeof SORT_FIELDS)[number];
// type SortsFieldsInfo = Record<SortField, StatInfo>;
// //
// export const SORT_FIELDS_INFO : SortsFieldsInfo = [
//   ...STATS_INFO,
//   default: { shortName: "Hp", label: "Health points" },
// ]

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
export const TYPE_ICONS: Icons = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};
export const DEFAULT_SORT: string = "default";
export const LOADING_PLACEHOLDER_LENGTH: number = 6;
export const MAX_STAT_VALUE: string = "255";
export const NUMBER_LENGTH: number = 3;

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

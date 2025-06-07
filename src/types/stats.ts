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
export type Stats = {
  [key: string]: string;
};

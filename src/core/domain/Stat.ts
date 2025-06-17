export const STATS = ["Hp", "At", "Df", "SpA", "SpD", "Spd"] as const;
type StatInfo = { shortName: string; label: string };
export type StatType = (typeof STATS)[number];
type StatsInfo = Record<StatType, StatInfo>;

export const STATS_INFO: StatsInfo = {
  Hp: { shortName: "Hp", label: "Health points" },
  At: { shortName: "At", label: "Attack" },
  Df: { shortName: "Df", label: "Defense" },
  SpA: { shortName: "SpA", label: "Special attack" },
  SpD: { shortName: "SpD", label: "Special defense" },
  Spd: { shortName: "Spd", label: "Speed" },
};
export type Stats = {
  [key: string]: string;
};

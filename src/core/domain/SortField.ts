import { STATS, STATS_INFO } from "./Stat";

export const SORT_FIELDS = ["default", ...STATS] as const;
type SortFieldInfo = { shortName: string; label: string };
export type SortField = (typeof SORT_FIELDS)[number];
type SortsFieldsInfo = Record<SortField, SortFieldInfo>;

export const SORT_FIELDS_INFO: SortsFieldsInfo = {
  ...STATS_INFO,
  default: { shortName: "Default", label: "Default" },
};

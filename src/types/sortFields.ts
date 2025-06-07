import { STATS, STATS_INFO } from "./stats";

export const SORT_FIELDS = ["default", ...STATS] as const;
type SortFueldInfo = { shortName: string; label: string };
type SortField = (typeof SORT_FIELDS)[number];
type SortsFieldsInfo = Record<SortField, SortFueldInfo>;

export const SORT_FIELDS_INFO: SortsFieldsInfo = {
  ...STATS_INFO,
  default: { shortName: "Default", label: "Default" },
};

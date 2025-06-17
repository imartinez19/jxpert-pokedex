import { STATS_INFO } from "../core/domain/Stat";
import { MAX_STAT_VALUE } from "../types/constants";

type StatProps = {
  statName: string;
  statNumber: number;
};

export function Stat({ statName, statNumber }: StatProps) {
  return (
    <li className="card__stat" aria-label={STATS_INFO[statName].label}>
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {STATS_INFO[statName].shortName}
        </p>
        <p>{statNumber}</p>
      </div>
      <progress value={statNumber} max={MAX_STAT_VALUE}></progress>
    </li>
  );
}

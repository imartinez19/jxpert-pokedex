import { MAX_STAT_VALUE } from "../types/constants";
import { PokemonStat } from "../types/pokemon";
import { STATS_INFO } from "../types/stats";

type StatProps = {
  stat: PokemonStat;
};

export function Stat({ stat }: StatProps) {
  return (
    <li
      key={stat.stat.name}
      className="card__stat"
      aria-label={STATS_INFO[stat.stat.name].label}
    >
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {STATS_INFO[stat.stat.name].shortName}
        </p>
        <p>{stat.base_stat}</p>
      </div>
      <progress value={stat.base_stat} max={MAX_STAT_VALUE}></progress>
    </li>
  );
}

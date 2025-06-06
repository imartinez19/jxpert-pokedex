import { MAX_STAT_VALUE } from "./App";
import { PokemonStat, STATS_INFO } from "./App.models";

type StatProps = {
  stat: PokemonStat;
};

export function Stat({ stat }: StatProps) {
  return (
    <li className="card__stat" aria-label={STATS_INFO[stat.stat.name].label}>
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

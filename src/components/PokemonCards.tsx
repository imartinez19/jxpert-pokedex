import { Stat } from "./../components/Stat";
import {
  LOADING_PLACEHOLDER_LENGTH,
  NUMBER_LENGTH,
} from "./../types/constants";
import { TYPE_ICONS } from "./../types/icons";
import { Pokemon } from "./../types/pokemon";
import { STATS } from "./../types/stats";

type CardsProps = {
  loading: boolean;
  filtering: boolean;
  showListError: boolean;
  filteredPokemons: Pokemon[];
};

export function PokemonCards({
  loading,
  filtering,
  showListError,
  filteredPokemons,
}: CardsProps) {
  return (
    <section>
      {(loading || filtering) && !showListError && (
        <div className="grid" aria-hidden="true">
          {Array.from({ length: LOADING_PLACEHOLDER_LENGTH }, (_, index) => {
            return (
              <article
                key={`placeholder-card-${index}`}
                className="card card-placeholder"
                data-testid="card-placeholder"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
                </svg>
              </article>
            );
          })}
        </div>
      )}
      {/* Prints cards */}
      {!filtering && !loading && filteredPokemons.length > 0 && (
        <ul className="grid">
          {filteredPokemons.map((pokemon) => {
            return <PokemonCard pokemon={pokemon} />;
          })}
        </ul>
      )}
    </section>
  );
}
type PokemonCardProps = {
  pokemon: Pokemon;
};

function PokemonCard({ pokemon }: PokemonCardProps) {
  const customStyles: any = {
    "--color-type": `var(--color-${pokemon.types[0].type.name}`,
  };
  return (
    <li key={`pokemon-card-${pokemon.id}`}>
      <article className="card" style={customStyles}>
        <header className="card__head">
          <div className="card__tag">
            <p>#{pokemon.id.toString().padStart(NUMBER_LENGTH, "0")}</p>
          </div>
          <div className="card__tag">
            <img
              src={TYPE_ICONS[pokemon.types[0].type.name]}
              className="card__type"
              alt={`${pokemon.types[0].type.name} primary type`}
            />
            {pokemon.types[1] && (
              <img
                src={TYPE_ICONS[pokemon.types[1].type.name]}
                className="card__type"
                alt={`${pokemon.types[1].type.name} secondary type`}
              />
            )}
          </div>
        </header>
        <img
          className="card__avatar"
          src={pokemon.sprites.other["official-artwork"].front_default}
          loading="lazy"
          alt={`${pokemon.name} artwork`}
        />
        <section className="card__content">
          <h3 className="card__title">{pokemon.name}</h3>
          <ul aria-description="Stats resume">
            {STATS.map((stat) => {
              const findedStat = pokemon.stats.find(
                (findStat) => findStat.stat.name === stat,
              );
              return findedStat ? <Stat key={stat} stat={findedStat} /> : null;
            })}
          </ul>
        </section>
      </article>
    </li>
  );
}

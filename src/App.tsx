import { useEffect, useState } from "react";
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
import pokeball from "./assets/pokeball.svg";
import {
  Icons,
  REGIONS_RANGES,
  Region,
  REGIONS,
  Pokemon,
  STATS,
  STATS_INFO,
} from "./App.models";
import { getPokemonData } from "./App.service";
import { Stat } from "./Stat.component";

const TYPE_ICONS: Icons = {
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
const DEFAULT_SORT: string = "default";

const LOADING_PLACEHOLDER_LENGTH: number = 6;
export const MAX_STAT_VALUE: string = "255";
const NUMBER_LENGTH: number = 3;

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filtering, setFiltering] = useState<boolean>(false);
  const [showListError, setShowListError] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<any>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [pokemonRegion, setPokemonRegion] = useState<Region>("kanto");
  const [showRegions, setShowRegions] = useState<boolean>(false);
  const [showSortingMenu, setShowSortingMenu] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("default");

  useEffect(() => {
    const getPokemonsDetails = async () => {
      setLoading(true);
      setFiltering(true);

      try {
        const pokemonsDetails = await getPokemonData(
          REGIONS_RANGES[pokemonRegion],
        );
        setPokemons(pokemonsDetails);
        setFilteredPokemons(pokemonsDetails);
      } catch (error) {
        setShowListError(true);
        console.log("MI ERROR ===>", error);
      }

      setLoading(false);
    };
    getPokemonsDetails();
  }, [pokemonRegion]);

  /**
   * Filters results based on input query term.
   */
  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(
        (filteredPokemons) =>
          filteredPokemons.name.includes(search.toLowerCase()) ||
          !!filteredPokemons.types.find((type) =>
            type.type.name.startsWith(search.toLowerCase()),
          ),
      ),
    );
    setFiltering(false);
  }, [pokemons[0]?.id, search]);

  /**
   * Sorts results based on selected sorting criteria.
   */
  useEffect(() => {
    if (sortBy === DEFAULT_SORT) {
      setFilteredPokemons((pokemonDetails) =>
        [...pokemonDetails].sort((firstPokemon, secondPokemon) => {
          return firstPokemon.id - secondPokemon.id;
        }),
      );
    } else {
      setFilteredPokemons((pokemonDetails) =>
        [...pokemonDetails].sort((firstPokemon, secondPokemon) => {
          const firstPokemonStat = firstPokemon.stats.find(
            (stat) => stat.stat.name === sortBy,
          );
          const secondPokemonStat = secondPokemon.stats.find(
            (stat) => stat.stat.name === sortBy,
          );
          return secondPokemonStat && firstPokemonStat
            ? secondPokemonStat.base_stat - firstPokemonStat.base_stat
            : 0;
        }),
      );
    }
  }, [filteredPokemons[0]?.id, sortBy]);

  return (
    <div className="layout">
      <header className="header">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </header>

      {/* Searcher */}
      <main className="container">
        <section className="search">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="search__icon"
          >
            <path
              d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L15 15"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search a Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Shows regions */}
          <div className="dropdown">
            <button
              role="combobox"
              aria-haspopup="listbox"
              aria-controls="reg-list"
              aria-label="Select reg"
              aria-expanded={showRegions}
              className={`dropdown__button ${showRegions ? "active" : ""}`}
              onClick={() =>
                setShowRegions((prev) => {
                  if (showSortingMenu) {
                    setShowSortingMenu(false);
                  }
                  return !prev;
                })
              }
            >
              {pokemonRegion}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 10L8.00004 12.6667L5.33337 10"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ol
              role="listbox"
              id="reg-list"
              hidden={!showRegions}
              className={`dropdown__list ${!showRegions ? "hide" : ""}`}
            >
              {REGIONS.map((region) => (
                <li
                  key={region}
                  role="radio"
                  aria-checked={pokemonRegion === region}
                  tabIndex={0}
                  className={pokemonRegion === region ? "active" : ""}
                  onClick={() => {
                    setPokemonRegion(region);
                    setShowRegions(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPokemonRegion(region);
                      setShowRegions(false);
                    }
                  }}
                >
                  {region}
                </li>
              ))}
            </ol>
          </div>

          <button
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-list"
            aria-label="Sort by"
            aria-expanded={showSortingMenu}
            className="sort__button"
            onClick={() =>
              setShowSortingMenu((prev) => {
                if (showRegions) setShowRegions(false);
                return !prev;
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                showSortingMenu
                  ? "var(--color-accent)"
                  : "var(--color-neutral-700)"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </svg>
          </button>

          {/* Muestra el menú de ordenación */}
          {showSortingMenu && (
            <article className="sort__wrapper">
              <h3 className="sort__title">Sort by</h3>
              <div className="sort__items" role="listbox" id="sort-list">
                <SortSpanButton
                  label="Default"
                  shortName="Default"
                  checked={sortBy === DEFAULT_SORT}
                  onClick={() => {
                    setSortBy(DEFAULT_SORT);
                    setShowSortingMenu(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy(DEFAULT_SORT);
                      setShowSortingMenu(false);
                    }
                  }}
                />
                {STATS.map((stat) => {
                  return (
                    <SortSpanButton
                      label={STATS_INFO[stat].label}
                      shortName={STATS_INFO[stat].shortName}
                      checked={sortBy === stat}
                      onClick={() => {
                        setSortBy(stat);
                        setShowSortingMenu(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSortBy(stat);
                          setShowSortingMenu(false);
                        }
                      }}
                    />
                  );
                })}
              </div>
            </article>
          )}
        </section>

        {/* Muestra cartas cargando */}
        <section>
          {(loading || filtering) && !showListError && (
            <div className="grid" aria-hidden="true">
              {Array.from(
                { length: LOADING_PLACEHOLDER_LENGTH },
                (_, index) => {
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
                },
              )}
            </div>
          )}
          {/* Prints cards */}
          {!filtering && !loading && filteredPokemons.length > 0 && (
            <ul className="grid">
              {filteredPokemons.map((pokemon) => {
                const customStyles: any = {
                  "--color-type": `var(--color-${pokemon.types[0].type.name}`,
                };

                return (
                  <li key={`pokemon-card-${pokemon.id}`}>
                    <article className="card" style={customStyles}>
                      <header className="card__head">
                        <div className="card__tag">
                          <p>
                            #
                            {pokemon.id.toString().padStart(NUMBER_LENGTH, "0")}
                          </p>
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
                        src={
                          pokemon.sprites.other["official-artwork"]
                            .front_default
                        }
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
                            return findedStat ? (
                              <Stat stat={findedStat} />
                            ) : null;
                          })}
                        </ul>
                      </section>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        {!loading && filteredPokemons.length === 0 && (
          <p className="noresults">No results for "{search}"</p>
        )}
        {showListError && (
          <p className="noresults">
            Parece que Snorlax está en el camino al servidor. Prueba a recargar
            la página o busca una pokeflauta
          </p>
        )}
      </main>

      <footer className="footer">
        <p>
          ©{new Date().getFullYear()} Pokémon. ©1995 -{" "}
          {new Date().getFullYear()} Nintendo/Creatures Inc./GAME FREAK inc. TM,
          ®Nintendo.
        </p>
      </footer>
    </div>
  );
};
function SortSpanButton({ label, shortName, onClick, onKeyDown, checked }) {
  return (
    <span
      role="radio"
      aria-label={label}
      tabIndex={0}
      className={`sort__pill ${checked ? "active" : ""}`}
      aria-checked={checked}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {shortName}
    </span>
  );
}

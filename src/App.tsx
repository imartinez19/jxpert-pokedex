import pokeball from "./assets/pokeball.svg";
import { usePokemons } from "./hooks/usePokemons";
import { SearchBar } from "./components/SearchBar";
import { PokemonCards } from "./components/PokemonCards";

export const App = () => {
  const {
    filteredPokemons,
    showListError,
    loading,
    filtering,
    pokemonRegion,
    search,
    showRegions,
    showSortingMenu,
    sortBy,
    setPokemonRegion,
    setSearch,
    setShowRegions,
    setShowSortingMenu,
    setSortBy,
  } = usePokemons();

  return (
    <div className="layout">
      <header className="header">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </header>

      <main className="container">
        <SearchBar
          search={search}
          setSearch={setSearch}
          showRegions={showRegions}
          setShowRegions={setShowRegions}
          showSortingMenu={showSortingMenu}
          setShowSortingMenu={setShowSortingMenu}
          pokemonRegion={pokemonRegion}
          setPokemonRegion={setPokemonRegion}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <PokemonCards
          loading={loading}
          filtering={filtering}
          showListError={showListError}
          filteredPokemons={filteredPokemons}
        />
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

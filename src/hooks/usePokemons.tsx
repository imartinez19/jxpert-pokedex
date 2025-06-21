import { useState, useEffect } from "react";
import { DEFAULT_SORT } from "../types/constants";
import { Pokemon } from "../core/domain/Pokemon";
import { Region } from "../core/domain/Region";
import { SortField } from "../core/domain/SortField";
import { pokemonService } from "../di";

export function usePokemons() {
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [showListError, setShowListError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtering, setFiltering] = useState<boolean>(false);
  const [pokemonRegion, setPokemonRegion] = useState<Region>("kanto");
  const [search, setSearch] = useState<string>("");
  const [showRegions, setShowRegions] = useState<boolean>(false);
  const [showSortingMenu, setShowSortingMenu] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortField>("default");

  useEffect(() => {
    setLoading(true);
    setFiltering(true);
    pokemonService
      .listByRegion(pokemonRegion)
      .then((res) => {
        setPokemons(res);
        setFilteredPokemons(res);
      })
      .catch((error) => {
        setShowListError(true);
        console.log("MI ERROR ===>", error);
      })
      .finally(() => setLoading(false));
  }, [pokemonRegion]);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(
        (filteredPokemons) =>
          filteredPokemons.name.includes(search.toLowerCase()) ||
          !!filteredPokemons.types.find((type) =>
            type.startsWith(search.toLowerCase()),
          ),
      ),
    );
    setFiltering(false);
  }, [pokemons[0]?.id, search]);

  useEffect(() => {
    setFilteredPokemons(sortPokemon(sortBy));
  }, [filteredPokemons[0]?.id, sortBy]);

  function sortPokemon(sortBy: SortField) {
    if (sortBy === DEFAULT_SORT) {
      return [...filteredPokemons].sort((firstPokemon, secondPokemon) => {
        return firstPokemon.id - secondPokemon.id;
      });
    }
    return [...filteredPokemons].sort((firstPokemon, secondPokemon) => {
      const firstPokemonStat = firstPokemon.stats[sortBy];
      const secondPokemonStat = secondPokemon.stats[sortBy];
      return secondPokemonStat && firstPokemonStat
        ? secondPokemonStat - firstPokemonStat
        : 0;
    });
  }
  return {
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
  };
}

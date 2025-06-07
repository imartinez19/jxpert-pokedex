import { useState, useEffect } from "react";
import { DEFAULT_SORT } from "../types/constants";
import { Pokemon } from "../types/pokemon";
import { Region, REGIONS_RANGES } from "../types/regions";
import { SortField } from "../types/sortFields";
import { pokemonService } from "../services/pokemon.service";

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
      .getPokemonData(REGIONS_RANGES[pokemonRegion])
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
            type.type.name.startsWith(search.toLowerCase()),
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
      const firstPokemonStat = firstPokemon.stats.find(
        (stat) => stat.stat.name === sortBy,
      );
      const secondPokemonStat = secondPokemon.stats.find(
        (stat) => stat.stat.name === sortBy,
      );
      return secondPokemonStat && firstPokemonStat
        ? secondPokemonStat.base_stat - firstPokemonStat.base_stat
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

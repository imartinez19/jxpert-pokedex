import { useState, useCallback, useEffect } from "react";
import { DEFAULT_SORT } from "../types/constants";
import { Pokemon } from "../types/pokemon";
import { Region, REGIONS_RANGES } from "../types/regions";
import { getPokemonData } from "../services/pokemon.service";

export function usePokemons() {
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<any>([]);
  const [showListError, setShowListError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtering, setFiltering] = useState<boolean>(false);
  const [pokemonRegion, setPokemonRegion] = useState<Region>("kanto");
  const [search, setSearch] = useState<string>("");
  const [showRegions, setShowRegions] = useState<boolean>(false);
  const [showSortingMenu, setShowSortingMenu] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("default");

  const getPokemon = useCallback(async (pokeRegion) => {
    setLoading(true);
    setFiltering(true);
    try {
      const pokemonsDetails = await getPokemonData(REGIONS_RANGES[pokeRegion]);
      setPokemons(pokemonsDetails);
      setFilteredPokemons(pokemonsDetails);
    } catch (error) {
      setShowListError(true);
      console.log("MI ERROR ===>", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getPokemon(pokemonRegion);
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

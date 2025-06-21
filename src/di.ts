import { ApiPokemonRepository } from "./core/infraestructure/ApiPokemonRepository";
import { LocalStorageFavoriteRepository } from "./core/infraestructure/LocalStorageFavoriteRepository";
import { PokemonService } from "./core/service/PokemonService";

export const pokemonService = new PokemonService(
  new ApiPokemonRepository(),
  new LocalStorageFavoriteRepository(),
);

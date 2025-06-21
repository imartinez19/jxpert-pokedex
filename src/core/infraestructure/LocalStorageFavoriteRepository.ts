import { FavoriteRepository } from "../domain/FavoriteRepository";
import { Pokemon } from "../domain/Pokemon";

export class LocalStorageFavoriteRepository implements FavoriteRepository {
  async list(): Promise<Pokemon[]> {
    const pokemonFavs = localStorage.getItem("pokemonFavs");
    if (!pokemonFavs) return [];
    return JSON.parse(pokemonFavs);
  }
  async add(pokemon: Pokemon): Promise<void> {
    const pokemonFavs = await this.list();
    pokemonFavs.unshift(pokemon);
    localStorage.setItem("pokemonFavs", JSON.stringify(pokemonFavs));
  }
}

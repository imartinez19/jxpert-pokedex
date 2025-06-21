import { Region } from "../domain/Region";
import { Pokemon } from "../domain/Pokemon";
import { PokemonRepository } from "../domain/PokemonRepository";
import { FavoriteRepository } from "../domain/FavoriteRepository";

export class PokemonService {
  constructor(
    private pokemonRepository: PokemonRepository,
    private favoriteRepository: FavoriteRepository,
  ) {}

  public async listByRegion(region: Region): Promise<Pokemon[]> {
    return await this.pokemonRepository.listByRegion(region);
  }
  public async listFavorite(): Promise<Pokemon[]> {
    return await this.favoriteRepository.list();
  }
  public async add(pokemon: Pokemon): Promise<void> {
    return await this.favoriteRepository.add(pokemon);
  }
}

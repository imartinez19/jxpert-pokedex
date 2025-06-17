import { Range } from "../domain/Region";
import { Pokemon } from "../domain/Pokemon";
import { PokemonRepository } from "../domain/PokemonRepository";

export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}

  public async listByRegion(region: Range): Promise<Pokemon[]> {
    return await this.pokemonRepository.listByRegion(region);
  }
}

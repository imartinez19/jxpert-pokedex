import { Range } from "./Region";
import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
  listByRegion(region: Range): Promise<Pokemon[]>;
}

import { Range } from "../../types/regions";
import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
  listByRegion(region: Range): Promise<Pokemon[]>;
}

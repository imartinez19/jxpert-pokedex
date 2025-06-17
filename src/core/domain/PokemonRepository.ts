import { Region } from "./Region";
import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
  listByRegion(region: Region): Promise<Pokemon[]>;
}

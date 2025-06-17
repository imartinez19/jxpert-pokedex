import { Region } from "../../types/regions";
import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
  listByRegion(region: Region): Promise<Pokemon[]>;
}

import { Pokemon } from "./Pokemon";

export interface FavoriteRepository {
  list(): Promise<Pokemon[]>;
  add(pokemon: Pokemon): Promise<void>;
}

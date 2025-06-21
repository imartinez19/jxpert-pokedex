import { Pokemon } from "../../domain/Pokemon";
import { LocalStorageFavoriteRepository } from "../LocalStorageFavoriteRepository";

describe("LocalStorageFavoriteRepository", () => {
  let mockLocalStorage: {
    getItem: any;
    setItem?: (key: string, value: string) => void;
  };
  const pikachu: Pokemon = {
    id: 1,
    name: "pikachu",
    image: "",
    stats: {
      Hp: 0,
      At: 0,
      Df: 0,
      SpA: 0,
      SpD: 0,
      Spd: 0,
    },
    types: [""],
  };
  const charmander: Pokemon = {
    id: 2,
    name: "charmander",
    image: "",
    stats: {
      Hp: 0,
      At: 0,
      Df: 0,
      SpA: 0,
      SpD: 0,
      Spd: 0,
    },
    types: [""],
  };
  const bulbasur: Pokemon = {
    id: 3,
    name: "bulbasur",
    image: "",
    stats: {
      Hp: 0,
      At: 0,
      Df: 0,
      SpA: 0,
      SpD: 0,
      Spd: 0,
    },
    types: [""],
  };
  beforeEach(() => {
    mockLocalStorage = (() => {
      const store = {} as Storage;

      return {
        getItem(key: string) {
          return store[key];
        },

        setItem(key: string, value: string) {
          store[key] = value;
        },
      };
    })();
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });

  it("should list favorite pokemons", async () => {
    mockLocalStorage.getItem = vi
      .fn()
      .mockReturnValue(JSON.stringify([pikachu, charmander, bulbasur]));
    const localStorageFavoriteRepository = new LocalStorageFavoriteRepository();

    const pokemonFavs = await localStorageFavoriteRepository.list();

    expect(pokemonFavs).toEqual([pikachu, charmander, bulbasur]);
  });

  it("should return empty array if there are not favorites pokemon", async () => {
    const localStorageFavoriteRepository = new LocalStorageFavoriteRepository();

    const pokemonFavs = await localStorageFavoriteRepository.list();

    expect(pokemonFavs).toEqual([]);
  });

  it("should add a favorite pokemon", async () => {
    mockLocalStorage.getItem = vi
      .fn()
      .mockReturnValue(JSON.stringify([pikachu, charmander]));
    const localStorageFavoriteRepository = new LocalStorageFavoriteRepository();
    const spy = vi.spyOn(mockLocalStorage, "setItem");

    await localStorageFavoriteRepository.add(bulbasur);

    expect(spy).toHaveBeenCalledWith(
      "pokemonFavs",
      JSON.stringify([bulbasur, pikachu, charmander]),
    );
  });

  it("should not add a pokemon already in favorites", async () => {
    mockLocalStorage.getItem = vi
      .fn()
      .mockReturnValue(JSON.stringify([pikachu, charmander]));
    const localStorageFavoriteRepository = new LocalStorageFavoriteRepository();
    const spy = vi.spyOn(mockLocalStorage, "setItem");

    await localStorageFavoriteRepository.add(pikachu);

    expect(spy).not.toHaveBeenCalled();
  });
});

import { describe, expect } from "vitest";
import { ApiPokemonRepository } from "../ApiPokemonRepository";

describe("ApiPokemonRepository", () => {
  it("should call pokeAPI correctly", async () => {
    const bulbasaur = {
      name: "bulbasaur",
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            front_shiny:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
          },
        },
      },
      types: [
        {
          slot: 1,
          type: {
            name: "grass",
            url: "https://pokeapi.co/api/v2/type/12/",
          },
        },
        {
          slot: 2,
          type: {
            name: "poison",
            url: "https://pokeapi.co/api/v2/type/4/",
          },
        },
      ],
      id: 1,
      stats: [
        {
          base_stat: 45,
          effort: 0,
          stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/",
          },
        },
        {
          base_stat: 49,
          effort: 0,
          stat: {
            name: "attack",
            url: "https://pokeapi.co/api/v2/stat/2/",
          },
        },
        {
          base_stat: 49,
          effort: 0,
          stat: {
            name: "defense",
            url: "https://pokeapi.co/api/v2/stat/3/",
          },
        },
        {
          base_stat: 65,
          effort: 1,
          stat: {
            name: "special-attack",
            url: "https://pokeapi.co/api/v2/stat/4/",
          },
        },
        {
          base_stat: 65,
          effort: 0,
          stat: {
            name: "special-defense",
            url: "https://pokeapi.co/api/v2/stat/5/",
          },
        },
        {
          base_stat: 45,
          effort: 0,
          stat: {
            name: "speed",
            url: "https://pokeapi.co/api/v2/stat/6/",
          },
        },
      ],
    };
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              name: "pruebamockmock",
              url: "https://pokeapi.co/api/v2/pokemon/1/",
            },
          ],
        }),
      })
      .mockResolvedValue({
        ok: true,
        json: async () => bulbasaur,
      });

    const spyFetch = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(mockFetch);
    const apiPokemonRepository = new ApiPokemonRepository();

    await apiPokemonRepository.listByRegion("kanto");

    expect(spyFetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
    );
    expect(spyFetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/1/",
    );
    expect(spyFetch).toHaveBeenCalledTimes(2);
  });

  it("should return a Pokemon array", () => {});
});

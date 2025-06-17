import { describe, expect } from "vitest";
import { ApiPokemonRepository } from "../ApiPokemonRepository";

describe.only("ApiPokemonRepository", () => {
  it("should call pokeAPI correctly", async () => {
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
        json: async () => {},
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

import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { App } from '../App';

describe('Carga de pokémon', () => {
  const bulbasaur = {
    "name": "bulbasaur",
    "sprites": {
      "other": {
        "official-artwork": {
          "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png"
        },
      },
    },
    "types": [
      {
        "slot": 1,
        "type": {
          "name": "grass",
          "url": "https://pokeapi.co/api/v2/type/12/"
        }
      },
      {
        "slot": 2,
        "type": {
          "name": "poison",
          "url": "https://pokeapi.co/api/v2/type/4/"
        }
      }
    ],
    "id": 1,
    "stats": [
      {
        "base_stat": 45,
        "effort": 0,
        "stat": {
          "name": "hp",
          "url": "https://pokeapi.co/api/v2/stat/1/"
        }
      },
      {
        "base_stat": 49,
        "effort": 0,
        "stat": {
          "name": "attack",
          "url": "https://pokeapi.co/api/v2/stat/2/"
        }
      },
      {
        "base_stat": 49,
        "effort": 0,
        "stat": {
          "name": "defense",
          "url": "https://pokeapi.co/api/v2/stat/3/"
        }
      },
      {
        "base_stat": 65,
        "effort": 1,
        "stat": {
          "name": "special-attack",
          "url": "https://pokeapi.co/api/v2/stat/4/"
        }
      },
      {
        "base_stat": 65,
        "effort": 0,
        "stat": {
          "name": "special-defense",
          "url": "https://pokeapi.co/api/v2/stat/5/"
        }
      },
      {
        "base_stat": 45,
        "effort": 0,
        "stat": {
          "name": "speed",
          "url": "https://pokeapi.co/api/v2/stat/6/"
        }
      }
    ]
  };
  beforeEach(() => {

    const mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              name: "bulbasaur",
              url: "https://pokeapi.co/api/v2/pokemon/1/",
            },
          ]
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => (
          bulbasaur
        ),

      })
  })

  test('debería mostrar la tarjeta de al menos un pokemon', async () => {
    render(<App />)

    const pokemonCard = await screen.findByText('bulbasaur');

    expect(pokemonCard).toBeInTheDocument();
  });

  test('debería mostrar correctamente los datos de la tarjeta', async () => {
    render(<App />)

    const pokemonName = await screen.findByRole('heading', { name: bulbasaur.name });

    expect(pokemonName).toBeInTheDocument();
  });

});
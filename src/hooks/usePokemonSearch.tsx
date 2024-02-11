import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  IPokemon,
  IPokemonResult,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemon, setSimplePokemon] = useState<SimplePokemon[]>([]);
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=2000';
  const loadPokemon = async () => {
    setIsFetching(true);
    const resp = await pokemonApi.get<IPokemon>(BASE_URL);
    const data = mapPokemonList(resp.data.results);
    setSimplePokemon([...simplePokemon, ...data]);
    setIsFetching(false);
  };

  const mapPokemonList = (pokemonList: IPokemonResult[]) => {
    const result: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      //  "https://pokeapi.co/api/v2/pokemon-color/{id or name}/"
      return {
        id,
        name,
        picture,
      };
    });
    return result;
  };
  useEffect(() => {
    loadPokemon();
  }, []);

  return {simplePokemon, isFetching};
};

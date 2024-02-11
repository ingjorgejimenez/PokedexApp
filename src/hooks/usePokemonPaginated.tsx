import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  IPokemon,
  IPokemonResult,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemon, setSimplePokemon] = useState<SimplePokemon[]>([]);
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=40';
  const nextPageUrl = useRef(BASE_URL);
  const loadPokemon = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<IPokemon>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;
    const data = mapPokemonList(resp.data.results);
    setSimplePokemon([...simplePokemon, ...data]);
    setIsLoading(false);
  };

  const mapPokemonList = (pokemonList: IPokemonResult[]) => {
    const result: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      //  "https://pokeapi.co/api/v2/pokemon-color/{id or name}/"
      const color = name;
      return {
        id,
        name,
        picture,
        color,
      };
    });
    return result;
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {simplePokemon, isLoading, loadPokemon};
};

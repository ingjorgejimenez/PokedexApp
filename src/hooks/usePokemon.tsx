import {useEffect, useState} from 'react';
import {IPokemonDetails} from '../interfaces/pokemonInterfaces';
import {pokemonApi} from '../api/pokemonApi';

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails>(
    {} as IPokemonDetails,
  );

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<IPokemonDetails>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemonDetails(resp.data);
    setIsLoading(false);
  };
  useEffect(() => {
    loadPokemon();
  }, []);

  return {pokemonDetails, isLoading};
};

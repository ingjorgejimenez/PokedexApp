import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text, Platform} from 'react-native';
import {CardPokemon} from '../components/CardPokemon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {Loading} from '../components/Loading';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

interface SectionServicesInternalProps {
  title?: string;
  itemServices?: [];
}

export const SearchScreen = ({}: SectionServicesInternalProps) => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const {isFetching, simplePokemon} = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    console.log(term.length);
    if (term.length === 0) {
      console.log('todos los pokemons');
      setPokemonFiltered(simplePokemon);
    } else if (isNaN(Number(term))) {
      console.log('todos los pokemons Text');
      setPokemonFiltered(
        simplePokemon.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else if (!isNaN(Number(term))) {
      console.log('todos los pokemons Number');
      const pokemonById = simplePokemon.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term, isFetching]);

  if (isFetching) {
    return <Loading />;
  }
  return (
    <View style={[styles.sectionServices]}>
      <SearchInput
        onDebounce={setTerm}
        style={[
          styles.search,
          {top: Platform.OS === 'ios' ? top + 5 : top + 10},
        ]}
      />
      <View
        style={[
          styles.container,
          {top: Platform.OS === 'ios' ? top + 50 : top + 55},
        ]}>
        <FlatList
          data={pokemonFiltered}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={[styles.title]}>{term}</Text>}
          renderItem={({item}) => <CardPokemon {...item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
        {/* {pokemonFiltered.map(item => (
          <CardPokemon {...item} />
        ))} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionServices: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
  },
  search: {
    position: 'absolute',
    zIndex: 9999,
  },
  container: {
    justifyContent: 'center',
  },
  scrollContainer: {},
  sectionServicesContainer: {
    flex: 1,
    paddingBottom: 10,
    gap: 10,
    marginBottom: 100,
  },
  title: {
    fontSize: 35,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
});

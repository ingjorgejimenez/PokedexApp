import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {useNavigation} from '@react-navigation/native';
import {usePokemon} from '../hooks/usePokemon';
import {pokemonTypeColors} from '../helpers/pokemonTypeColors';

interface CardPokemonProps extends SimplePokemon {}

export const CardPokemon = ({name, picture, id}: CardPokemonProps) => {
  const navigator = useNavigation<any>();
  //TODO: update for library
  const {pokemonDetails} = usePokemon(id);
  const type = pokemonDetails.types && pokemonDetails.types[0].type.name;
  const color = pokemonTypeColors[type] || pokemonTypeColors.default;
  return (
    <TouchableOpacity
      onPress={() => navigator.navigate('PokemonScreen', {name, picture, id})}
      activeOpacity={0.9}
      style={[styles.card, {backgroundColor: color}]}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>
          {name}
          {'\n#' + id}
        </Text>
        <FadeInImage uri={picture} style={styles.image} />
        <View style={styles.imageContainerBall}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.imageBall}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 110,
    height: 110,
    objectFit: 'contain',
    position: 'absolute',
    zIndex: 2,
    right: -8,
    bottom: -8,
  },
  imageContainerBall: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
  },
  imageBall: {
    opacity: 0.4,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    bottom: -20,
    right: -20,
  },
});

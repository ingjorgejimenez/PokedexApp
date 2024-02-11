import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../components/FadeInImage';
import {RootStackParams} from '../navigator/TabsList';
import {usePokemon} from '../hooks/usePokemon';
import {CardPokemonDetails} from '../components/CardPokemonDetails';
import {pokemonTypeColors} from '../helpers/pokemonTypeColors';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({route, navigation}: Props) => {
  const {name, id, picture} = route.params;
  const {top} = useSafeAreaInsets();
  const {pokemonDetails, isLoading} = usePokemon(id);
  const type = pokemonDetails.types && pokemonDetails.types[0].type.name;
  const color = pokemonTypeColors[type] || pokemonTypeColors.default;
  console.log(color);
  return (
    <View style={{flex: 1}}>
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: color,
          },
        ]}>
        <View style={[styles.content, {top: top}]}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={[styles.buttonBack]}>
            <Icon name="arrow-back-outline" size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {name + '\n'}#{id}
          </Text>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.imageBall}
          />
          <FadeInImage style={styles.image} uri={picture} />
        </View>
      </View>
      <View style={styles.details}>
        {isLoading ? (
          <ActivityIndicator color="grey" size={50} style={{flex: 1}} />
        ) : (
          <CardPokemonDetails pokemon={pokemonDetails} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 99999,
    minHeight: 370,
    alignContent: 'center',
    backgroundColor: '#A4A2A2',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  content: {
    paddingHorizontal: 15,
  },
  buttonBack: {
    width: 40,
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  imageBall: {
    width: 250,
    height: 250,
    opacity: 0.7,
    alignSelf: 'flex-end',
    top: -60,
    left: -20,
  },
  image: {
    position: 'absolute',
    alignSelf: 'flex-end',
    width: 250,
    height: 250,
    bottom: 25,
    right: 15,
    zIndex: 9999,
  },
  details: {
    flex: 1,
  },
});

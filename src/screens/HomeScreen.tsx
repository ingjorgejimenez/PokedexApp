import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {stylesGlobal} from '../theme/appThemes';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {CardPokemon} from '../components/CardPokemon';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, simplePokemon, loadPokemon} = usePokemonPaginated();
  return (
    <View style={[styles.homeScreen, stylesGlobal.globalMargin, {top}]}>
      <View style={styles.header}>
        <Image
          source={require('../assets/pokebola.png')}
          style={styles.imageHeader}
        />
      </View>
      {!isLoading && (
        <View style={styles.containerCard}>
          <FlatList
            data={simplePokemon}
            keyExtractor={item => item.id}
            ListHeaderComponent={<Text style={styles.title}>Pokedex</Text>}
            renderItem={({item}) => <CardPokemon {...item} />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            //Infinite scroll
            onEndReached={loadPokemon}
            onEndReachedThreshold={0.4} //es como el 40% de la parte de abajo del scroll
            //Loading al llegar al final
            ListFooterComponent={
              <ActivityIndicator style={{height: 100}} color="grey" size={50} />
            }
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
  header: {},
  containerCard: {
    alignContent: 'center',
  },
  imageHeader: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    opacity: 0.2,
  },
  title: {
    fontSize: 35,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

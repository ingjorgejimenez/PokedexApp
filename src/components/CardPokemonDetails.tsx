import React, {Fragment} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {IPokemonDetails} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface CardProps {
  pokemon: IPokemonDetails;
}
export const CardPokemonDetails = ({pokemon}: CardProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.scrollContent, {...StyleSheet.absoluteFillObject}]}>
      <View style={styles.content}>
        {/* types and weight */}
        <Text style={styles.title}>Types</Text>
        <View style={styles.typeContainer}>
          {pokemon.types.map(({type}, index) => (
            <Fragment key={type.url + index}>
              <Text style={styles.regularText}>{type.name}</Text>
              {index + 1 !== pokemon.types.length && <Text>-</Text>}
            </Fragment>
          ))}
        </View>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight}</Text>
        <Text style={styles.title}>Sprites</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Object.values(pokemon.sprites).map((sprite, index) =>
            typeof sprite === 'string' ? (
              <FadeInImage
                key={sprite + index}
                uri={sprite}
                style={styles.basicSprite}
              />
            ) : null,
          )}
        </ScrollView>
        {/* Habilidades */}
        <Text style={styles.title}>Habilidades</Text>
        <View style={styles.typeContainer}>
          {pokemon.abilities.map(({ability}, index) => (
            <Fragment key={ability.url + index}>
              <Text style={styles.regularText}>{ability.name}</Text>
              {index + 1 !== pokemon.abilities.length && <Text>-</Text>}
            </Fragment>
          ))}
        </View>
        {/* Movimientos */}
        <Text style={styles.title}>Movimientos</Text>
        <View style={styles.typeContainer}>
          {pokemon.moves.map(({move}, index) => (
            <Fragment key={move.url + index}>
              <Text style={styles.regularText}>{move.name}</Text>
              {index + 1 !== pokemon.moves.length && <Text>-</Text>}
            </Fragment>
          ))}
        </View>
        {/* Stats */}
        <Text style={styles.title}>Stats</Text>
        <View
          style={[
            styles.typeContainer,
            {flexDirection: 'column', alignItems: 'flex-start'},
          ]}>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.regularText,
                  {fontWeight: 'bold', minWidth: 180},
                ]}>
                {stat.stat.name + ': '}
              </Text>
              <Text style={styles.regularText}>{stat.base_stat}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {backgroundColor: 'White', paddingHorizontal: 15},
  content: {
    flex: 1,
    paddingTop: 370,
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  regularText: {
    fontSize: 20,
  },
  basicSprite: {
    width: 120,
    height: 120,
  },
});

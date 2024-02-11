import {createStackNavigator} from '@react-navigation/stack';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {SearchScreen} from '../screens/SearchScreen';
import {PokemonScreen} from '../screens/PokemonScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: SimplePokemon;
};

const StackTab = createStackNavigator<RootStackParams>();

export function TabsSearch() {
  return (
    <StackTab.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <StackTab.Screen name="HomeScreen" component={SearchScreen} />
      <StackTab.Screen name="PokemonScreen" component={PokemonScreen} />
    </StackTab.Navigator>
  );
}

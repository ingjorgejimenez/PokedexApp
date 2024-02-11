import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabsList} from './TabsList';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabsSearch} from './TabsSearch';

const Tab = createBottomTabNavigator();

export function Tabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4F4EA2',
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
          fontSize: 16,
          fontWeight: '500',
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFFBA',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={TabsList}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="list-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={TabsSearch}
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

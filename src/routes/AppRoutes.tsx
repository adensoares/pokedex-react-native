import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import PokemonDetails from '../screens/PokemonDetails/PokemonDetails';

type RootStackParamList = {
  Home: undefined;
  PokemonDetails: { pokemonId: number };
};

// Stack Navigator com os parâmetros de rota definidos
const Stack = createStackNavigator<RootStackParamList>();


function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
    </Stack.Navigator>
  );
};

export default AppRoutes;

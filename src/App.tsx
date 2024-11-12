import React from 'react';

//Navigations
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import MovieList from './components/MovieList';
import {MovieDetail} from './components/MovieDetail';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Software List"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#65adf1',
          },
          headerTintColor: 'white',
          headerShown: true,
        }}>
        <Stack.Screen name="Software List" component={MovieList} />
        <Stack.Screen name="Software Details" component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

//Navigations
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import Home from './screens/Home';
import Detials from './screens/Detials';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Details' component={Detials} />
    </Stack.Navigator>
  </NavigationContainer>;
}

export default App;

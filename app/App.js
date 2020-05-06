import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Provider} from 'react-redux'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import store from './store';
import Home from './screens/Home';
import Game from './screens/Game';
import Finish from './screens/Finish';
import Difficulty from './screens/Difficulty';
const Stack = createStackNavigator()
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#1cb0ff' },
            headerLeft: null,
              gesturesEnabled: false,
          }}
          navigationOptions = {{
            gesturesEnabled: false
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Difficulty" component={Difficulty} />
          <Stack.Screen name="Finish" component={Finish} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
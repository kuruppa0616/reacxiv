import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import { Login, AuthLoading, HomeScreen } from './screens'
import { Screens } from '@/constants'

const AuthNavigator = createStackNavigator({
  Login: Login,
});

const AppContainer = createAppContainer(createSwitchNavigator({
  [Screens.AuthLoading]: AuthLoading,
  [Screens.App]: HomeScreen,
  [Screens.Auth]: AuthNavigator
},
  {
    initialRouteName: Screens.AuthLoading,
  }));

const App = () => {
  return (
    <AppContainer />
  );
};

export default App;
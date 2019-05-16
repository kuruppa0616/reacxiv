import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import { Login, AuthLoading } from './screens'
import { Home,Recommend,New } from './screens/Top'

const AppNavigator = createStackNavigator({
  Home: Home,
  Recommend: Recommend,
  New: New
});

const AuthNavigator = createStackNavigator({
  Login: Login,
});

const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoading,
  App: AppNavigator,
  Auth: AuthNavigator
},
  {
    initialRouteName: 'AuthLoading',
  }));

const App = () => {
  return (
    <AppContainer />
  );
};
export default App;
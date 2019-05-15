import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import { Home, Login, AuthLoading } from './screens'

const AppNavigator = createStackNavigator({
  Home: Home,
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
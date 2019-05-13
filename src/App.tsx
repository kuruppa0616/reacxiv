import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Home } from './screens'

const AppNavigator = createStackNavigator({
  Home: Home,
});
const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <AppContainer />
  );
};
export default App;
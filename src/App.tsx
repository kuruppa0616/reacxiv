import React from 'react';
import { useScreens } from 'react-native-screens';
import { Root } from 'native-base';
import { AppContainer } from '@/navigators';

// tslint:disable-next-line: react-hooks-nesting
useScreens();

const App = () => {
	return (
		<Root>
			<AppContainer />
		</Root>
	);
};

export default App;

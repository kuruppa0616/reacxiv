import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationTabProp } from 'react-navigation-tabs/lib/typescript/src/types';
import { Screens } from '@/constants';
import { NavigationRoute, NavigationParams } from 'react-navigation';

interface Props {
	navigation: NavigationTabProp<NavigationRoute<NavigationParams>, any>;
}

const TabBarIcon = (props: Props) => {
	const state = props.navigation.state;
	const getIconByRouteName = (routeName: string) => {
		switch (routeName) {
			case Screens.Top:
				return 'home';
			case Screens.Recommend:
				return 'star';
			default:
				return 'feed';
		}
	};
	const IconName = getIconByRouteName(state.routeName);

	return <Icon name={IconName} size={25} />;
};

export default TabBarIcon;

import React from 'react';
import { View, Text } from 'native-base';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const UserDetail = (props:Props) => {
	return (
		<View>
			<Text>User</Text>
		</View>
	);
};

export default withNavigation(UserDetail);

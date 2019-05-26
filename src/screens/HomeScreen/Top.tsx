import React, { memo, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react-lite'

import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { RecommendIllustsStore, UserStore } from '@/mobx/stores';
import Profile from '@/components/profile'
const Top = observer((props: any) => {
	const user = useContext(UserStore);
	const login = () => (user.name = "hiiii");
	const logout = () => (user.name = "byeee");
	return (
		<Home>
			<View>
				<Profile />
				<Button title={"login"} onPress={login}>login</Button>
				<Button title={"logout"} onPress={logout}>logout</Button>
			</View>
		</Home>

	);
});

export default Top;
import {
	DrawerContentComponentProps,
	DrawerNavigatorItems
} from 'react-navigation-drawer';
import { useNavigation } from 'react-navigation-hooks';
import React, { useEffect } from 'react';
import {
	Container,
	Body,
	Content,
	Header,
	Left,
	Button,
	Icon,
	Title,
	Right,
	Toast
} from 'native-base';
import { CustomDrawerItem } from '.';
import { Alert } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { useCredential } from '@/hooks';
import { Screens } from '@/constants';

const CustomDrawer = (props: DrawerContentComponentProps) => {
	const navigation = useNavigation();
	const [credential] = useCredential();

	const onButton = () => {
		navigation.closeDrawer();
	};

	const onAlert = () => {
		Alert.alert('Log out of Pixiv?', "", [
			{ text: 'Cancel', onPress: () => console.log('cancel') },
			{ text: 'Log out', onPress: onLogout },
		]);
	};

	const onLogout = () => {
		pixivApi.logout().then(async () => {
			await credential.reset();
			navigation.navigate(Screens.Login);
			Toast.show({
				text: 'logout success!',
				buttonText: 'OK',
				type: 'success'
			});
		});
	};

	return (
		<Container>
			<Content>
				<Header>
					<Left>
						<Button onPress={onButton} transparent={true}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Menu</Title>
					</Body>
					<Right />
				</Header>
				<DrawerNavigatorItems {...props} />
				<CustomDrawerItem label={'Log out'} onItemPress={onAlert} />
			</Content>
		</Container>
	);
};

export default CustomDrawer;

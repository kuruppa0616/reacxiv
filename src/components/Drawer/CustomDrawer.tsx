import {
	DrawerContentComponentProps,
	DrawerNavigatorItems
} from 'react-navigation-drawer';
import { useNavigation } from 'react-navigation-hooks';
import React from 'react';
import {
	Container,
	Body,
	Content,
	Header,
	Left,
	Button,
	Icon,
	Title,
	Right
} from 'native-base';

const CustomDrawer = (props: DrawerContentComponentProps) => {
	const nav = useNavigation();
	const onButton = () => {
		nav.closeDrawer();
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
			</Content>
		</Container>
	);
};

export default CustomDrawer;
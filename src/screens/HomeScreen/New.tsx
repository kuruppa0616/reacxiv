import React from 'react';

import { Container, Header, Body, Button, Icon, Left, Title, Right } from 'native-base';

import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import { useNavigation } from 'react-navigation-hooks';

const New = () => {
	const nav = useNavigation();
	const _fetch = () => pixivApi.illustFollow();
	const onButton = () => {
		nav.toggleDrawer();
	};
	return (
		<Container>
			<Header>
				<Left>
					<Button onPress={onButton} transparent={true}>
						<Icon name="menu" />
					</Button>
				</Left>
				<Body>
					<Title>Header</Title>
				</Body>
				<Right />
			</Header>
			<IllustList fetch={_fetch} />
		</Container>
	);
};

export default New;

import React from 'react';

import {
	Container,
	Header,
	Body,
	Button,
	Icon,
	Left,
	Title,
	Right,
	View,
	Text
} from 'native-base';

import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import { useNavigation } from 'react-navigation-hooks';

const New = () => {
	const nav = useNavigation();
	const _fetch = () => pixivApi.illustFollow();
	const onButton = () => {
		nav.openDrawer();
	};

	return (
		<Container>
			<IllustList fetch={_fetch} />
		</Container>
	);
};

export default New;

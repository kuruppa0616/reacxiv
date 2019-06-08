import React from 'react';
import { Illust } from 'pixiv-api-client';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
	illust: Illust;
	size: number;
	bookmarkFunc: (illust: Illust) => void;
}
const BookmarkButton = (props: Props) => {
	const { illust, size, bookmarkFunc } = props;

	const _onPress = (illust: Illust) => {
		return () => bookmarkFunc(illust);
	};

	return (
		<TouchableWithoutFeedback onPress={_onPress(illust)}>
			<Container>
				<Icon
					size={size}
					name="heart"
					color={illust.is_bookmarked ? '#F26964' : '#F5F5F5'}
				/>
			</Container>
		</TouchableWithoutFeedback>
	);
};
const Container = styled.View`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default BookmarkButton;

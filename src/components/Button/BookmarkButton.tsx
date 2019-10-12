import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Illust } from 'pixiv-api-client';

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
			<Icon
				size={size}
				name="heart"
				color={illust.is_bookmarked ? '#F26964' : '#F5F5F5'}
			/>
		</TouchableWithoutFeedback>
	);
};

export default BookmarkButton;

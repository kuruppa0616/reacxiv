import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Illust } from 'pixiv-api-client';
import styled from 'styled-components/native';

import BookmarkButton from './BookmarkButton';

interface Props {
	illust: Illust;
	bookmarkFunc: (illust: Illust) => void;
}
const floatingBookmarkButton = (props: Props) => {
	const { illust, bookmarkFunc } = props;
	return (
		<Container>
			<Icon name="circle" size={45} color="#40aaef" />
			<ButtonWrapper>
				<BookmarkButton illust={illust} size={22} bookmarkFunc={bookmarkFunc} />
			</ButtonWrapper>
		</Container>
	);
};

const Container = styled.View`
	width: 45;
	height: 45;
	position: relative;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ButtonWrapper = styled.View`
	position: absolute;
`;

export default floatingBookmarkButton;

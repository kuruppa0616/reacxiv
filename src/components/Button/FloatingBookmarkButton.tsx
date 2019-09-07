import React from 'react';
import styled from 'styled-components/native';
import { Illust } from 'pixiv-api-client';
import BookmarkButton from './BookmarkButton';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
	illust: Illust;
	bookmarkFunc: (illust: Illust) => void;
}
const floatingBookmarkButton = (props: Props) => {
	const { illust, bookmarkFunc } = props;
	return (
		<Container>
			<Icon name="circle" size={60} color="#40aaef" />
			<ButtonWrapper>
				<BookmarkButton illust={illust} size={25} bookmarkFunc={bookmarkFunc} />
			</ButtonWrapper>
		</Container>
	);
};

const Container = styled.View`
	width: 60px;
	height: 60px;
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

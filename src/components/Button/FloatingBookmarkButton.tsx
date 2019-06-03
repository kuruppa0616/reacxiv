import React from 'react';
import styled from 'styled-components/native';
import { Illust } from 'pixiv-api-client';
import BookmarkButton  from './BookmarkButton';

interface Props {
	illust: Illust;
	bookmarkFunc: (illust: Illust) => void;
}
const floatingBookmarkButton = (props: Props) => {
	const { illust, bookmarkFunc } = props;
	return (
		<Container style={{ borderRadius: 50 }}>
			<BookmarkButton illust={illust} size={20} bookmarkFunc={bookmarkFunc} />
		</Container>
	);
};

const Container = styled.View`
	width: 60px;
	height: 60px;
	background-color: #40AAEF;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default floatingBookmarkButton;

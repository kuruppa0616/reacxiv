import React from 'react';
import dayjs from 'dayjs';
import { Text } from 'native-base';
import { human } from 'react-native-typography';
import { Illust } from 'pixiv-api-client';
import styled from 'styled-components/native';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

interface Props {
	illust: Illust;
}

const IllustMeta = (props: Props) => {
	const { illust } = props;
	const jpDate = dayjs(illust.create_date).format('YYYY-MM-DD HH:mm');
	return (
		<Meta>
			<MetaText>{jpDate}</MetaText>
			<MetaText>
				<Fa5Icon name="eye" />
				{illust.total_view}
			</MetaText>
			<MetaText>
				<FaIcon name="heart" />
				{illust.total_bookmarks}
			</MetaText>
		</Meta>
	);
};

const Meta = styled.View`
	flex-direction: row;
	align-items: center;
`;
const MetaText = styled(Text)`
	${human.footnoteObject as any};
	line-height: ${(human.footnoteObject.fontSize as number) * 1.5};
	margin-right: 15px;
`;

export default IllustMeta;

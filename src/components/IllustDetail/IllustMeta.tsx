import React from 'react';
import dayjs from 'dayjs';
import { Text, View } from 'native-base';
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
		<Metas>
			<Meta>
				<MetaText>{jpDate}</MetaText>
			</Meta>
			<Meta>
				<IconView>
					<Fa5Icon name="eye" />
				</IconView>
				<MetaText>{illust.total_view}</MetaText>
			</Meta>
			<Meta>
				<IconView>
					<FaIcon name="heart" />
				</IconView>
				<MetaText>{illust.total_bookmarks}</MetaText>
			</Meta>
		</Metas>
	);
};

const Metas = styled(View)`
	flex-direction: row;
	align-items: center;
`;
const Meta = styled(View)`
	margin-right: 15px;
	flex-direction: row;
	align-items: center;
`;
// tslint:disable-next-line: prettier
const IconView = styled(View)`
	margin-right: 5px;
`;
const MetaText = styled(Text)`
	${human.footnoteObject as any};
`;

export default IllustMeta;

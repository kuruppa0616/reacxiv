import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { human } from 'react-native-typography';

import { Text, View } from 'native-base';
import { Illust } from 'pixiv-api-client';
import { User } from 'pixiv-api-client';
import styled from 'styled-components/native';

import { FollowButton } from '@/components/Button';
import { PxProfileIcon } from '@/components/PxImage';
import { Screens } from '@/constants';
import { useNavigation } from 'react-navigation-hooks';

interface Props {
	illust: Illust;
	followUser: (user: User) => void;
}
const UserProfileBar = (props: Props) => {
	const { illust, followUser } = props;
	const { navigate } = useNavigation();

	const _onPressUserInfo = () => {
		navigate(Screens.UserDetail, {
			userId: illust.user.id
		});
	};
	return (
		<Container>
			<TouchableWithoutFeedback onPress={_onPressUserInfo}>
				<UserProfile>
					<PxProfileIcon url={illust.user.profile_image_urls.medium} size={40} />
					<UserName>
						<UserNameText>{illust.user.name}</UserNameText>
					</UserName>
				</UserProfile>
			</TouchableWithoutFeedback>
			<FollowButton user={illust.user} followFunc={followUser} />
		</Container>
	);
};

export default UserProfileBar;

const Container = styled(View)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: 2px 0px;
`;
const UserProfile = styled(View)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const UserName = styled(View)`
	margin-left: 10px;
`;

const UserNameText = styled(Text)`
	${human.calloutObject as any};
`;

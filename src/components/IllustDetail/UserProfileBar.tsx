import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'native-base';
import { Illust } from 'pixiv-api-client';
import { human } from 'react-native-typography';
import { FollowButton } from '@/components/Button';
import { TouchableWithoutFeedback } from 'react-native';
import { PxProfileIcon } from '@/components/PxImage';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { User } from 'pixiv-api-client';
import { Screens } from '@/constants';

interface Props {
	illust: Illust;
	navigation: NavigationScreenProp<any, any>;
	followUser: (user: User) => void;
}
const UserProfileBar = (props: Props) => {
	const { illust, navigation, followUser } = props;

	const _onPressUserInfo = () => {
		navigation.navigate(Screens.UserDetail, {
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
						<UserIdText>{illust.user.account}</UserIdText>
					</UserName>
				</UserProfile>
			</TouchableWithoutFeedback>
			<FollowButton user={illust.user} followFunc={followUser} />
		</Container>
	);
};

export default withNavigation(UserProfileBar);

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
	line-height: ${(human.calloutObject.fontSize as number) * 1.5};
`;

const UserIdText = styled(Text)`
	${human.footnoteObject as any};
	line-height: ${(human.footnoteObject.fontSize as number) * 1.5};
`;

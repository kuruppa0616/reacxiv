import React, { useEffect, useContext } from 'react';
import { View, Text, Container } from 'native-base';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import pixivApi from '@/api/PixivApi';
import { useState } from 'react';
import { UserResponse } from 'pixiv-api-client';
import styled from 'styled-components/native';
import { Loading } from '@/components/Loading';
import { PxProfileIcon, PxImage, PxHeader } from '@/components/PxImage';
import { human } from 'react-native-typography';
import { FollowButton } from '@/components/Button';
import { GlobalIllustsStore } from '@/mobx/stores';
import useFollow from '@/hooks/useFollow';
import { BlurView, VibrancyView } from '@react-native-community/blur';
import { Row } from '@/components/OverrideNativeBase';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const UserDetail = (props: Props) => {
	const { navigation } = props;
	const userId: number = navigation.state.params.userId;
	const store = useContext(GlobalIllustsStore);
	const [user, setUser] = useState<UserResponse>();
	const [followUser] = useFollow(store);

	useEffect(() => {
		pixivApi.userDetail(userId).then(res => {
			setUser(res);
		});
	}, []);

	const _renderUserDetail = (user: UserResponse) => {
		return (
			<View>
				<Row>
					<UserStatus>
						<PxHeader
							url={user.user.profile_image_urls.medium}
							height={150}
							blurRadius={1}
						/>
						<PxProfileIcon url={user.user.profile_image_urls.medium} size={80} />
						<UserNameText>{user.user.name}</UserNameText>
						<UserIdText>{user.user.account}</UserIdText>
						<Row>
							<Text>Web:{user.profile.webpage}</Text>
							<Text>Twitter:{user.profile.twitter_account}</Text>
						</Row>
						<Row>
							<Text>{user.profile.total_follow_users}follow</Text>
							<Text>{user.profile.total_mypixiv_users}mypixiv</Text>
						</Row>
					</UserStatus>
					<FollowButton user={user.user} followFunc={followUser} />
				</Row>
			</View>
		);
	};

	return <Container>{user ? _renderUserDetail(user) : <Loading />}</Container>;
};

const UserStatus = styled(View)`
	height: 100%;
`;

const UserNameText = styled(Text)`
	${human.calloutObject as any};
	line-height: ${(human.calloutObject.fontSize as number) * 1.5};
`;

const UserIdText = styled(Text)`
	${human.footnoteObject as any};
	line-height: ${(human.footnoteObject.fontSize as number) * 1.5};
`;

export default withNavigation(UserDetail);

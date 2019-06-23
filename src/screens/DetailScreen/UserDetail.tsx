import React, { useEffect, useContext } from 'react';
import { View, Text, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import pixivApi from '@/api/PixivApi';
import { useState } from 'react';
import { UserResponse } from 'pixiv-api-client';
import styled from 'styled-components/native';
import { Loading } from '@/components/Loading';
import { PxProfileIcon, PxHeader } from '@/components/PxImage';
import { human } from 'react-native-typography';
import { FollowButton } from '@/components/Button';
import { GlobalIllustsStore } from '@/mobx/stores';
import useFollow from '@/hooks/useFollow';
import { Row } from '@/components/OverrideNativeBase';
import { IllustCaption } from '@/components/IllustDetail';

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
		const webpage = user.profile.webpage;
		const domain: string | undefined = webpage
			? (webpage.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/) as any)[1]
			: undefined;
		return (
			<View>
				<Profile>
					<HeaderImage>
						<PxHeader
							url={user.user.profile_image_urls.medium}
							height={150}
							blurRadius={1}
						/>
					</HeaderImage>
					<UserStatus>
						<UserStatusRow>
							<View style={{ flex: 4 }}>
								<PxProfileIcon url={user.user.profile_image_urls.medium} size={80} />
								<UserNameText>{user.user.name}</UserNameText>
							</View>
							<View style={{ flex: 1 }}>
								<FollowButton user={user.user} followFunc={followUser} />
							</View>
						</UserStatusRow>
						<Text>{user.profile.total_follow_users} following</Text>
						<Row>
							{domain && (
								<UrlRow>
									<Icon name="home" size={20} />
									<Text>{domain}</Text>
								</UrlRow>
							)}
							{user.profile.twitter_account && (
								<UrlRow>
									<Icon name="twitter" size={20} />
									<Text>@{user.profile.twitter_account}</Text>
								</UrlRow>
							)}
						</Row>
						<IllustCaption text={user.user.comment} />
					</UserStatus>
				</Profile>
			</View>
		);
	};

	return <Container>{user ? _renderUserDetail(user) : <Loading />}</Container>;
};

const Profile = styled(View)`
	position: relative;
`;

const HeaderImage = styled(View)`
	position: absolute;
`;

const UserStatus = styled(View)`
	position: absolute;
	width: 100%;
	top: 115px;
	padding-left: 10px;
	padding-right: 10px;
`;

const UserStatusRow = styled(Row)`
	justify-content: space-between;
`;

const UrlRow = styled(Row)`
	max-width: 200px;
	margin-right: 10px;
`;

const UserNameText = styled(Text)`
	${human.title2Object as any};
	line-height: ${(human.title2Object.fontSize as number) * 1.5};
	font-weight: bold;
`;

const UserIdText = styled(Text)`
	${human.bodyObject as any};
	line-height: ${(human.bodyObject.fontSize as number) * 1.5};
`;

export default withNavigation(UserDetail);

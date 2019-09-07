import React, { useEffect, useContext, useMemo } from 'react';
import { View, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation, NavigationScreenProp, ScrollView } from 'react-navigation';
import pixivApi from '@/api/PixivApi';
import { useState } from 'react';
import { UserResponse } from 'pixiv-api-client';
import styled from 'styled-components/native';
import * as types from 'styled-components/cssprop';
import { Loading } from '@/components/Loading';
import { PxProfileIcon, PxHeader } from '@/components/PxImage';
import { human } from 'react-native-typography';
import { FollowButton } from '@/components/Button';
import { GlobalIllustsStore } from '@/mobx/stores';
import useFollow from '@/hooks/useFollow';
import { Row } from '@/components/OverrideNativeBase';
import { IllustCaption } from '@/components/IllustDetail';
import { observer } from 'mobx-react-lite';
import { Linking } from 'react-native';
import { IllustList } from '@/components/IllustList';

interface Props {
	navigation: NavigationScreenProp<any, any>;
}

const UserDetail = observer((props: Props) => {
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

	const storedUserMemo = useMemo(() => {
		const users = store.users;
		return users[userId];
	}, [store.users]);

	const _openURL = (url: string) => () => Linking.openURL(url);
	const _fetchIllustWorks = (id: number) => () => pixivApi.userIllusts(id);

	const _renderUserDetail = (user: UserResponse) => {
		return (
			<View>
				<ScrollView css="height: 100%;">
					<Profile>
						<HeaderImage>
							<PxHeader
								url={user.user.profile_image_urls.medium}
								height={150}
								blurRadius={1}
							/>
						</HeaderImage>
						<DetailBody>
							<PaddingBody>
								<UserStatusRow>
									<View style={{ flex: 4 }}>
										<PxProfileIcon url={user.user.profile_image_urls.medium} size={80} />
										<UserNameText>{user.user.name}</UserNameText>
									</View>
									<View style={{ flex: 1 }}>
										<FollowButton user={storedUserMemo} followFunc={followUser} />
									</View>
								</UserStatusRow>
								<Text>{user.profile.total_follow_users} following</Text>
								<Row>
									{user.profile.webpage && (
										<UrlRow>
											<Icon
												onPress={_openURL(user.profile.webpage)}
												name="home"
												size={30}
											/>
										</UrlRow>
									)}
									{user.profile.twitter_account && (
										<UrlRow>
											<Icon
												onPress={_openURL(
													'https://twitter.com/' + user.profile.twitter_account
												)}
												name="twitter"
												size={30}
											/>
										</UrlRow>
									)}
								</Row>
								<IllustCaption text={user.user.comment} />
							</PaddingBody>
							<StyledText>Illust Works</StyledText>
							<IllustList fetch={_fetchIllustWorks(user.user.id)} />
						</DetailBody>
					</Profile>
				</ScrollView>
			</View>
		);
	};

	return <S_Container>{user ? _renderUserDetail(user) : <Loading />}</S_Container>;
});

const S_Container = styled(View)`
	flex: 1 auto;
	width: 100%;
`;

const ScrollWrapper = styled.ScrollView`
	height: 100%;
`;

const Profile = styled(View)`
	/* position: relative; */
	flex: 1;
`;

const HeaderImage = styled(View)``;

const DetailBody = styled(View)`
	/* position: absolute; */
	width: 100%;
	height: 100%;
	/* top: 115px; */
`;

const PaddingBody = styled(View)`
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
	font-weight: bold;
`;

const StyledText = styled(Text)`
	${human.calloutObject as any};
	text-align: center;
	margin-bottom: 10px;
`;

export default withNavigation(UserDetail);

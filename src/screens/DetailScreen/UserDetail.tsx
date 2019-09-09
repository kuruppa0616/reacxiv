import React from 'react';
import { Linking } from 'react-native';
import { human } from 'react-native-typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, withNavigation } from 'react-navigation';

import { observer } from 'mobx-react-lite';
import { Text, View } from 'native-base';
import { User, UserResponse } from 'pixiv-api-client';
import * as types from 'styled-components/cssprop';
import styled from 'styled-components/native';

import pixivApi from '@/api/PixivApi';
import { FollowButton } from '@/components/Button';
import { IllustCaption } from '@/components/IllustDetail';
import { IllustList } from '@/components/IllustList';
import { Loading } from '@/components/Loading';
import { Row } from '@/components/OverrideNativeBase';
import { PxHeader, PxProfileIcon } from '@/components/PxImage';
import { useUserDetail } from '@/hooks';
import { userAction } from '@/hooks/useUserDetail';

const UserDetailContainer = observer(() => {
	const [userDetail, userOverviewMemo, userAction] = useUserDetail();

	return (
		<S_Container>
			{userDetail ? (
				<UserDetail {...{ userDetail, userOverviewMemo, userAction }} />
			) : (
				<Loading />
			)}
		</S_Container>
	);
});

interface UserDetailProps {
	userDetail: UserResponse;
	userOverviewMemo: User;
	userAction: userAction;
}

const UserDetail = (props: UserDetailProps) => {
	const { userDetail, userOverviewMemo, userAction } = props;
	const _openURL = (url: string) => () => Linking.openURL(url);
	const _fetchIllustWorks = (id: number) => () => pixivApi.userIllusts(id);

	return (
		<View>
			<ScrollView css="height: 100%;">
				<Profile>
					<HeaderImage>
						<PxHeader
							url={userDetail.user.profile_image_urls.medium}
							height={150}
							blurRadius={1}
						/>
					</HeaderImage>
					<DetailBody>
						<PaddingBody>
							<UserStatusRow>
								<View style={{ flex: 4 }}>
									<PxProfileIcon
										url={userDetail.user.profile_image_urls.medium}
										size={80}
									/>
									<UserNameText>{userDetail.user.name}</UserNameText>
								</View>
								<View style={{ flex: 1 }}>
									<FollowButton
										user={userOverviewMemo}
										followFunc={userAction.followUser}
									/>
								</View>
							</UserStatusRow>
							<Text>{userDetail.profile.total_follow_users} following</Text>
							<Row>
								{userDetail.profile.webpage && (
									<UrlRow>
										<Icon
											onPress={_openURL(userDetail.profile.webpage)}
											name="home"
											size={30}
										/>
									</UrlRow>
								)}
								{userDetail.profile.twitter_url && (
									<UrlRow>
										<Icon
											onPress={_openURL(userDetail.profile.twitter_url)}
											name="twitter"
											size={30}
										/>
									</UrlRow>
								)}
							</Row>
							<IllustCaption text={userDetail.user.comment} />
						</PaddingBody>
						<StyledText>Illust Works</StyledText>
						<IllustList fetch={_fetchIllustWorks(userDetail.user.id)} />
					</DetailBody>
				</Profile>
			</ScrollView>
		</View>
	);
};

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

export default withNavigation(UserDetailContainer);

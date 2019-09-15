import React from 'react';
import { Linking } from 'react-native';
import { human } from 'react-native-typography';
import Icon from 'react-native-vector-icons/FontAwesome';

import { observer } from 'mobx-react-lite';
import { Container, Content, Text, View } from 'native-base';
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
		<Container>
			{userDetail ? (
				<UserDetail {...{ userDetail, userOverviewMemo, userAction }} />
			) : (
				<Loading />
			)}
		</Container>
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
		<Content>
			<View>
				<PxHeader
					url={userDetail.user.profile_image_urls.medium}
					height={150}
					blurRadius={1}
				/>
			</View>
			<View>
				<PaddingBody>
					<Row css="justify-content: space-between;">
						<View css="flex: 4">
							<PxProfileIcon url={userDetail.user.profile_image_urls.medium} size={80} />
							<UserNameText>{userDetail.user.name}</UserNameText>
						</View>
						<View css="flex: 1">
							<FollowButton user={userOverviewMemo} followFunc={userAction.followUser} />
						</View>
					</Row>
					<Text>{userDetail.profile.total_follow_users} following</Text>
					<Row>
						{userDetail.profile.webpage && (
							<LinkRow>
								<Icon
									onPress={_openURL(userDetail.profile.webpage)}
									name="home"
									size={30}
								/>
							</LinkRow>
						)}
						{userDetail.profile.twitter_url && (
							<LinkRow>
								<Icon
									onPress={_openURL(userDetail.profile.twitter_url)}
									name="twitter"
									size={30}
								/>
							</LinkRow>
						)}
					</Row>
					<IllustCaption text={userDetail.user.comment} />
				</PaddingBody>
				<StyledText>Illust Works</StyledText>
				<IllustList fetch={_fetchIllustWorks(userDetail.user.id)} />
			</View>
		</Content>
	);
};

const PaddingBody = styled(View)`
	padding-left: 10px;
	padding-right: 10px;
`;

const LinkRow = styled(Row)`
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

export default UserDetailContainer;

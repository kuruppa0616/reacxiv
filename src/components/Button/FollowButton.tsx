import React, { useState } from 'react';
import { Text, Button } from 'native-base';
import { User } from 'pixiv-api-client';
import { View } from 'react-native';
import pixivApi from '@/api/PixivApi';
import styled from 'styled-components/native';

interface Props {
	user: User;
}
const FollowButton = (props: Props) => {
	const { user } = props;
	const [isFollowing, setIsFollowing] = useState(user.is_followed);

	const _onFollow = (id: number) => {
		pixivApi.followUser(id).then(() => {
			setIsFollowing(true);
		});
	};

	const _onUnFollow = (id: number) => {
		pixivApi.unfollowUser(id).then(() => {
			setIsFollowing(false);
		});
	};

	const _renderFollowButton = (id: number) => (
		<StyledButton onPress={() => _onFollow(id)} small={true} info={true} bordered={true}>
			<FollowText uppercase={false}>Follow</FollowText>
		</StyledButton>
	);

	const _renderUnFollowButton = (id: number) => (
		<StyledButton onPress={() => _onUnFollow(id)} small={true} info={true}>
			<FollowingText uppercase={false}>Following</FollowingText>
		</StyledButton>
	);

	return (
		<View>
			{isFollowing ? _renderUnFollowButton(user.id) : _renderFollowButton(user.id)}
		</View>
	);
};

const StyledButton = styled(Button)`
	border-radius: 20;
	width:90px;
	display:flex;
	justify-content:center;
`;

const FollowText = styled(Text)`
	padding: 10px;
	color: #40AAEF;

`;

const FollowingText = styled(FollowText)`
	color: white;
`;

export default FollowButton;

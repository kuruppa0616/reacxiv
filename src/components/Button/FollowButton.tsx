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
		<Button onPress={() => _onFollow(id)} small={true} info={true} bordered={true}>
			<FollowText uppercase={false}>Follow</FollowText>
		</Button>
	);

	const _renderUnFollowButton = (id: number) => (
		<Button onPress={() => _onUnFollow(id)} small={true} info={true}>
			<FollowingText uppercase={false}>Following</FollowingText>
		</Button>
	);

	return (
		<View>
			{isFollowing ? _renderUnFollowButton(user.id) : _renderFollowButton(user.id)}
		</View>
	);
};

const FollowText = styled(Text)`
	padding: 10px;
`;

const FollowingText = styled(FollowText)`
	color:white;
`;

export default FollowButton;

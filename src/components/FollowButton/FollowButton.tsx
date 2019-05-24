import React, { useState } from 'react';
import { Text, Button } from 'native-base';
import { User } from 'pixiv-api-client';
import { View } from 'react-native';
import pixivApi from '@/api/PixivApi';

interface Props {
	user: User
}
const FollowButton = ((props: Props) => {
	const { user } = props;
	const [isFollowing, setIsFollowing] = useState(user.is_followed);

	const _onFollow = (id: number) => {
		pixivApi.followUser(id).then((res) => {
			setIsFollowing(true);
		});
	}

	const _onUnFollow = (id: number) => {
		pixivApi.unfollowUser(id).then((res) => {
			setIsFollowing(false);
		});
	}

	const _renderFollowButton = (id: number) => (
		<Button onPress={() => _onFollow(id)} primary bordered ><Text>Follow</Text></Button>
	);

	const _renderUnFollowButton = (id: number) => (
		<Button onPress={() => _onUnFollow(id)} primary  ><Text>Following</Text></Button>
	);
	return (
		<View>
			{isFollowing ? _renderUnFollowButton(user.id) : _renderFollowButton(user.id)}
		</View>
	);
});

export default FollowButton;
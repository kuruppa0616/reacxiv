import React, { useState } from 'react';
import { Text, Button } from 'native-base';
import { User } from 'pixiv-api-client';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface Props {
	user: User;
	followFunc: (user: User) => void;
}
const FollowButton = (props: Props) => {
	const { user, followFunc } = props;

	const _onPress = (user: User) => {
		return () => followFunc(user);
	};

	const _renderFollowButton = (user: User) => (
		<StyledButton onPress={_onPress(user)} small={true} info={true} bordered={true}>
			<FollowText uppercase={false}>Follow</FollowText>
		</StyledButton>
	);

	const _renderUnFollowButton = (user: User) => (
		<StyledButton onPress={_onPress(user)} small={true} info={true}>
			<FollowingText uppercase={false}>Following</FollowingText>
		</StyledButton>
	);

	return (
		<View>
			{user.is_followed ? _renderUnFollowButton(user) : _renderFollowButton(user)}
		</View>
	);
};

const StyledButton = styled(Button)`
	border-radius: 20;
	width: 90px;
	height: 30px;
	display: flex;
	justify-content: center;
`;

const FollowText = styled(Text)`
	padding: 10px;
	font-size: 15px;
	color: #40aaef;
`;

const FollowingText = styled(FollowText)`
	color: white;
`;

export default FollowButton;

import React from 'react';
import { Text, View } from 'native-base';
import { TouchableNativeFeedback, GestureResponderEvent } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import styled from 'styled-components/native';

interface Props {
	label: string;
	onItemPress: () => void;
}

const DrawerNavigatorItem = (props: Props) => {
	const { label, onItemPress } = props;

	return (
		<Container>
			<TouchableNativeFeedback onPress={onItemPress} delayPressIn={0}>
				<Item
					forceInset={{
						left: 'always',
						right: 'never',
						vertical: 'never'
					}}
				>
					<Label>{label}</Label>
				</Item>
			</TouchableNativeFeedback>
		</Container>
	);
};

const Container = styled(View)`
	padding-top: 4px;
	padding-bottom: 4px;
`;

const Item = styled(SafeAreaView)`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
`;

const Label = styled(Text)`
	margin: 16px;
	font-weight: bold;
`;

export default DrawerNavigatorItem;

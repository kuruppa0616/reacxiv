import React from 'react';
import styled from 'styled-components/native';
import { Text, Spinner } from 'native-base';
import { View } from 'react-native';

const Loading = () => (
	<Container>
		<Spinner />
	</Container>
);

const Container = styled(View)`
	flex: 1 auto;
	width: 100%;
	align-items: center;
`;

export default Loading;

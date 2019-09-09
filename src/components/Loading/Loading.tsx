import React from 'react';
import { View } from 'react-native';

import { Spinner, Text } from 'native-base';
import styled from 'styled-components/native';

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

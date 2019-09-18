import React, { useState } from 'react';
import { Text, Container, Content, View, Button } from 'native-base';
import styled from 'styled-components/native';

const Logout = () => {
	const [] = useState(false);
	return (
		<Container>
			<CenteringContent>
				<Text>Confirm Logout?</Text>
				<Button danger={true}>
					<Text>Logout</Text>
				</Button>
			</CenteringContent>
		</Container>
	);
};

const CenteringContent = styled(View)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Logout;

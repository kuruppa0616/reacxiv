import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const IllustDeteil = ((props: any) => {
	return (
		<Container>
			<Text>IllustDeteil</Text>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
	justify-content: center;
  align-items: center;
`
export default IllustDeteil;
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Login = ((props: any) => {
	return (
		<Container>
			<Text>plese Login</Text>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
	justify-content: center;
  align-items: center;
`
export default Login;
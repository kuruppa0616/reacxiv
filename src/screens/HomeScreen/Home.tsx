import React, { memo } from 'react';
import styled from 'styled-components/native';

interface Props {
	children: JSX.Element
}
const Home = ((props: Props) => {
	const { children } = props
	return (
		<Container>
			{children}
		</Container>
	);
});

const Container = styled.View`
	flex: 1 ;
	width:100%;
  align-items: center;
`

export default Home;
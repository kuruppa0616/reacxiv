import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';

interface Props {
	children: JSX.Element
}
const Top = memo((props: Props) => {
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

export default Top;
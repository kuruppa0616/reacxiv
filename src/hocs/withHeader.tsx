import React from 'react';
import { Text, Container, Header, Left, Body, Title, Right } from 'native-base';

const withHeader = (
	Children: React.ComponentType<any>
): React.ComponentType<any> => () => {
	return (
		<Container>
			<Header>
				<Left />
				<Body>
					<Title>Header</Title>
				</Body>
				<Right />
			</Header>
			<Children />
		</Container>
	);
};

export default withHeader;

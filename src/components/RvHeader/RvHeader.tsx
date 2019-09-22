import React from 'react';
import { Left, Body, Title, Right, Header } from 'native-base';
import {} from 'react-native-elements';

interface Props {
	title?: string;
}

const RvHeader = (props: Props) => {
	return (
		<Header>
			<Left />
			<Body>
				<Title>Header</Title>
			</Body>
			<Right />
		</Header>
	);
};

export default RvHeader;

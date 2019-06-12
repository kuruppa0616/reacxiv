import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { Text } from 'native-base';

enum fontWeight{
	'thin' = 100
}

type Weight = 'normal' | 'bold' | fontWeight.thin;

interface StyleProps {
	size: number;
	weight: Weight;
}

interface ComponentProps{
	size?: number;
	weight?: Weight;
}

const JpText = (props: PropsWithChildren<ComponentProps>) => (
	<StyledText
		size={props.size ? props.size : 14}
		weight={props.weight ? props.weight : 'normal'}
	>
		{props.children}
	</StyledText>
);

const StyledText = styled(Text)`
	font-size: ${(props:StyleProps) => props.size};
	line-height: ${(props: StyleProps) => props.size * 1.5};
	font-weight: ${(props: StyleProps) => props.weight};
`;
export default JpText;

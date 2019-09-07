import React, { useState } from 'react';
import { View, Text } from 'native-base';
import { human } from 'react-native-typography';
import styled from 'styled-components/native';
import HTMLView, { HTMLViewNode } from 'react-native-htmlview';

interface Props {
	text: string;
}

const IllustCaption = (props: Props) => {
	const { text } = props;
	const [collapsed, setCollapsed] = useState(true);

	const _renderNode = (node: HTMLViewNode, index: number): React.ReactNode => {
		if (node.type !== 'text') {
			return undefined;
		}

		if ((node as any).parent.name === 'a') {
			return <CaptionURL key={index}>{node.data}</CaptionURL>;
		}

		return <CaptionText key={index}>{node.data}</CaptionText>;
	};
	// const collapsedText = collapsed ? text.slice(0, 50) + "..." : text;
	return (
		<StyledHTMLView
			value={`<html><body>${text}</body></html>`}
			renderNode={_renderNode}
			RootComponent={View}
		/>
	);
};

const StyledHTMLView = styled(HTMLView)`
	padding-bottom: 10;
	margin: 2px 0px;
`;

const CaptionText = styled(Text)`
	${human.subheadObject as any};
`;

const CaptionURL = styled(CaptionText)`
	font-weight: bold;
	color: #40aaef;
`;

export default IllustCaption;

import React, { PropsWithChildren } from 'react';
import JpText from './JpText'

const JpCaptionText = (props: PropsWithChildren<{}>) => (
	<JpText size={12}>{props.children}</JpText>
);

export default JpCaptionText;

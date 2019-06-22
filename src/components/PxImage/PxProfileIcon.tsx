import React from 'react';
import PxImage from './PxImage';

interface Props {
	url: string;
	size: number;
}
const PxProfileIcon = (props: Props) => {
	const { url, size } = props;
	return <PxImage url={url} width={size} height={size} style={{ borderRadius: 50 }} />;
};

export default PxProfileIcon;

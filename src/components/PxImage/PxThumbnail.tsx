import React from 'react';

import PxImage from './PxImage';

interface Props {
	url: string;
	size: number;
}
const PxThumbnail = (props: Props) => {
	const { url, size } = props;
	return <PxImage url={url} width={size} height={size} />;
};

export default PxThumbnail;

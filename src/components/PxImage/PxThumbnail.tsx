import React, { memo, useEffect, useState } from 'react';
import  PxImage  from './PxImage';

interface Props {
	url: string;
	size: number
}
const PxThumbnail = ((props: Props) => {
	const { url, size } = props
	return (
		<PxImage url={url} width={size} height={size} style={{ margin: 1, borderRadius: 2 }} />
	);
});

export default PxThumbnail;
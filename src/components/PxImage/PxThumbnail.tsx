import React, { memo, useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image'
import { PxImage } from '.';

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
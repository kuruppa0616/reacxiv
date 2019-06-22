import React from 'react';
import PxImage from './PxImage';
import { Device } from '@/constants';

interface Props {
	url: string;
}

const PxHeader = (props: Props) => {
	const { url } = props;

	return <PxImage url={url} width={Device.Width} height={100} resizeMode={'cover'} />;
};

export default PxHeader;

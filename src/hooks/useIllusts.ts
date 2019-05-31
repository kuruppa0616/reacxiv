import { useState, useEffect } from 'react';
import { Illust, IllustsResponse } from 'pixiv-api-client';
import pixivApi from '@/api/PixivApi';

const inititalIllust: Illust[] = [];

const useIllusts = (
	fetchIllusts: (options?: any) => Promise<IllustsResponse>
): [Illust[], () => Promise<void>, () => Promise<void>] => {
	const [illusts, setIllusts] = useState(inititalIllust);
	const [nextURL, setNextURL] = useState('');

	useEffect(() => {
		loadInitIllusts();
	}, []);

	const loadInitIllusts = async () => {
		// setIllusts(inititalIllust);
		await fetchIllusts().then(res => {
			setIllusts(res.illusts);
			setNextURL(res.next_url);
		});
	};

	const loadNextIllusts = async () => {
		if (!nextURL) return;
		await pixivApi.requestUrl(nextURL).then(res => {
			setIllusts(recommend => recommend.concat(res.illusts));
			setNextURL(res.next_url);
		});
	};

	return [illusts, loadInitIllusts, loadNextIllusts];
};

export default useIllusts;

import IllustsStore from './IllustsStore';
import pixivApi from '@/api/PixivApi';
import { createContext } from 'react';

export const RecommendIllustsStore = createContext(
	new IllustsStore(() => pixivApi.illustRecommended())
);
export const FollowIllustsStore = createContext(
	new IllustsStore(() => pixivApi.illustFollow())
);

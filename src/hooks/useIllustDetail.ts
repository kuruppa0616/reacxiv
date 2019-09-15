import { useContext, useMemo } from 'react';
import { useNavigationParam } from 'react-navigation-hooks';

import { denormalize } from 'normalizr';
import { Illust, User } from 'pixiv-api-client';

import { illustsSchema } from '@/mobx/schema';
import { GlobalIllustsStore } from '@/mobx/stores';

import useBookmark from './useBookmark';
import useFollow from './useFollow';

export interface IllustActions {
	bookmarkIllust: (illust: Illust) => void;
	followUser: (user: User) => void;
}

const useIllustDetail = (): [Illust, IllustActions] => {
	const illustId: number = useNavigationParam('illustId');
	const store = useContext(GlobalIllustsStore);
	const [bookmarkIllust] = useBookmark(store);
	const [followUser] = useFollow(store);

	const illustMemo = useMemo(() => {
		const illusts: Illust[] = denormalize([illustId], illustsSchema, store.entities);
		return illusts[0];
	}, [store.illusts, store.users, illustId]);

	return [illustMemo, { bookmarkIllust, followUser }];
};

export default useIllustDetail;

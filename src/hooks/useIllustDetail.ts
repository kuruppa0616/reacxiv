import { useNavigationParam } from 'react-navigation-hooks';
import { useContext, useMemo } from 'react';
import { GlobalIllustsStore } from '@/mobx/stores';
import { useBookmark, useFollow } from '.';
import { denormalize } from 'normalizr';
import { illustsSchema } from '@/mobx/schema';
import { Illust, User } from 'pixiv-api-client';

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

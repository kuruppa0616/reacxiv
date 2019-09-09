import { User } from 'pixiv-api-client';

import pixivApi from '@/api/PixivApi';
import IllustsStore from '@/mobx/stores/IllustsStore';

const useFollow = (store: IllustsStore): [(user: User) => void] => {
	const followUser = (user: User): void => {
		const func = user.is_followed
			? () => pixivApi.unfollowUser(user.id)
			: () => pixivApi.followUser(user.id);
		func().then(() => {
			store.updateFollow(user.id, !user.is_followed);
		});
	};

	return [followUser];
};

export default useFollow;

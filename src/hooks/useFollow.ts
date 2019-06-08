import { User } from 'pixiv-api-client';
import pixivApi from '@/api/PixivApi';
import IllustsStore from '@/mobx/stores/IllustsStore';

const useFollow = (store: IllustsStore) => {
	const followUser = (user: User) => {
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

import { Illust } from 'pixiv-api-client';

import pixivApi from '@/api/PixivApi';
import IllustsStore from '@/mobx/stores/IllustsStore';

const useBookmark = (store: IllustsStore): [(illust: Illust) => void] => {
	const bookmarkIllust = (illust: Illust): void => {
		const func = illust.is_bookmarked
			? () => pixivApi.unbookmarkIllust(illust.id)
			: () => pixivApi.bookmarkIllust(illust.id);
		func().then(() => {
			store.updateBookmark(illust.id, !illust.is_bookmarked);
		});
	};

	return [bookmarkIllust];
};

export default useBookmark;

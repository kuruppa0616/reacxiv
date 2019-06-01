import { observable, action, computed } from 'mobx';
import { Illust, PixivApiClient, User } from 'pixiv-api-client';
import { normalize, denormalize } from 'normalizr';

import pixivApi from '@/api/PixivApi';
import { illustsSchema } from '@/mobx/schema';

type FetchIllusts = PixivApiClient['illustRecommended'] | PixivApiClient['illustFollow'];

interface NormalizedIllust extends Omit<Illust, 'user'> {
	user: number;
}

export class IllustsStore {
	private fetch: FetchIllusts;
	private nextUrl: string = '';

	constructor(fetch: FetchIllusts) {
		this.fetch = fetch;
	}

	@observable.shallow private illusts: { [index: number]: NormalizedIllust } = {};
	@observable.shallow private users: { [index: number]: User } = {};
	@observable.shallow private keys: Set<number> = new Set();

	@computed public get data(): Illust[] {
		const entities = {
			illusts: this.illusts,
			users: this.users
		};

		return denormalize([...this.keys], illustsSchema, entities);
	}

	@action private setIllusts = (illusts: Illust[]) => {
		const normalized = normalize(illusts, illustsSchema);
		this.illusts = { ...this.illusts, ...normalized.entities.illusts };
		this.users = { ...this.users, ...normalized.entities.users };
		this.keys = new Set([...this.keys, ...normalized.result]);
	};

	@action private setNextUrl = (url: string) => {
		this.nextUrl = url;
	};

	@action private clearData = () => {
		this.illusts = {};
		this.users = {};
		this.keys = new Set();
		this.nextUrl = '';
	};

	@action public updateBookmark = (id: number, isBookmarked: boolean) => {
		const illusts = { ...this.illusts };
		illusts[id].is_bookmarked = isBookmarked;
		this.illusts = illusts;
	};

	@action public updateFollow = (id: number, isFollowed: boolean) => {
		const users = { ...this.users };
		users[id].is_followed = isFollowed;
		this.users = users;
	};

	public fetchIllusts = async () => {
		await this.fetch().then(({ illusts, next_url }) => {
			this.setIllusts(illusts);
			this.setNextUrl(next_url);
		});
	};

	public loadMoreIllusts = async () => {
		await pixivApi.requestUrl(this.nextUrl).then(({ illusts, next_url }) => {
			this.setIllusts(illusts);
			this.setNextUrl(next_url);
		});
	};

	public reloadIllusts = async () => {
		this.clearData();
		await this.fetchIllusts();
	};
}

export default IllustsStore;

import { observable, action, computed } from 'mobx';
import { Illust, User, IllustsResponse } from 'pixiv-api-client';
import { normalize } from 'normalizr';

import pixivApi from '@/api/PixivApi';
import { illustsSchema } from '@/mobx/schema';

type FetchIllusts = () => Promise<IllustsResponse>;

interface NormalizedIllust extends Omit<Illust, 'user'> {
	user: number;
}

export class IllustsStore {
	private nextUrl: string = '';

	@observable.shallow illusts: { [index: number]: NormalizedIllust } = {};
	@observable.shallow users: { [index: number]: User } = {};
	private keys: Set<number> = new Set();

	@computed public get entities() {
		return {
			illusts: this.illusts,
			users: this.users
		};
	}

	@action private setIllusts = (illusts: Illust[]): number[] => {
		const normalized = normalize(illusts, illustsSchema);
		this.illusts = { ...this.illusts, ...normalized.entities.illusts };
		this.users = { ...this.users, ...normalized.entities.users };
		this.keys = new Set([...this.keys, ...normalized.result]);
		return normalized.result;
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

	public fetchIllusts = async (fetch: FetchIllusts): Promise<number[]> => {
		const res = await fetch();
		const keys = this.setIllusts(res.illusts);
		this.setNextUrl(res.next_url);
		return keys;
	};

	public loadMoreIllusts = async (): Promise<number[]> => {
		const keys = await this.fetchIllusts(() => pixivApi.requestUrl(this.nextUrl));
		return keys;
	};

	public reloadIllusts = async (fetch: FetchIllusts): Promise<number[]> => {
		this.clearData();
		const keys = await this.fetchIllusts(fetch);
		return keys;
	};
}

export default IllustsStore;

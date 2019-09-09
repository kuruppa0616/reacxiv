import { action, computed, observable } from 'mobx';
import { NormalizedSchema, normalize } from 'normalizr';
import { Illust, IllustsResponse, User } from 'pixiv-api-client';

import pixivApi from '@/api/PixivApi';
import { illustsSchema } from '@/mobx/schema';

type FetchIllusts = () => Promise<IllustsResponse>;

interface NormalizedIllust extends Omit<Illust, 'user'> {
	user: number;
}

export class IllustsStore {
	@observable.shallow illusts: { [index: number]: NormalizedIllust } = {};
	@observable.shallow users: { [index: number]: User } = {};
	private keys: Set<number> = new Set();

	@computed public get entities() {
		return {
			illusts: this.illusts,
			users: this.users
		};
	}

	@action private setIllusts = (normalizedIllusts: NormalizedSchema<any, any>) => {
		this.illusts = { ...this.illusts, ...normalizedIllusts.entities.illusts };
		this.users = { ...this.users, ...normalizedIllusts.entities.users };
		this.keys = new Set([...this.keys, ...normalizedIllusts.result]);
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

	@action public setUser = (user: User) => {
		this.users = { ...this.users, [user.id]: user };
	};

	public fetchIllusts = async (fetch: FetchIllusts): Promise<[number[], string]> => {
		const res = await fetch();
		const normalized = normalize(res.illusts, illustsSchema);
		this.setIllusts(normalized);
		return [normalized.result, res.next_url];
	};

	public loadMoreIllusts = async (nextUrl: string): Promise<[number[], string]> => {
		const res = await this.fetchIllusts(() => pixivApi.requestUrl(nextUrl));
		return res;
	};

	public reloadIllusts = async (fetch: FetchIllusts): Promise<[number[], string]> => {
		const res = await this.fetchIllusts(fetch);
		return res;
	};
}

export default IllustsStore;

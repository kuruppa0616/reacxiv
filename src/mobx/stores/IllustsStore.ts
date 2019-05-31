import { observable, action, computed, toJS } from 'mobx';
import { Illust, PixivApiClient } from 'pixiv-api-client';
import { normalize, denormalize } from 'normalizr';

import pixivApi from '@/api/PixivApi';
import { illustsSchema } from '@/mobx/schema';

type FetchIllusts =
	| PixivApiClient['illustRecommended']
	| PixivApiClient['illustFollow'];

export class IllustsStore {
	private fetch: FetchIllusts;
	private nextUrl: string = '';

	constructor(fetch: FetchIllusts) {
		this.fetch = fetch;
	}

	@observable.shallow private illusts = {};
	@observable.shallow private users = {};
	@observable.shallow private keys: number[] = [];

	@computed private get toJSIllusts(): any {
		return toJS(this.illusts);
	}

	@computed private get toJSUsers(): {} {
		return toJS(this.users);
	}

	@computed private get toJSKeys(): number[] {
		return toJS(this.keys);
	}

	@computed public get data(): Illust[] {
		const entities = {
			illusts: this.toJSIllusts,
			users: this.toJSUsers
		};

		return denormalize(this.toJSKeys, illustsSchema, entities);
	}

	@action private setIllusts = (illusts: Illust[]) => {
		const normalized = normalize(illusts, illustsSchema);
		this.illusts = { ...this.illusts, ...normalized.entities.illusts };
		this.users = { ...this.users, ...normalized.entities.users };
		this.keys = [...this.keys, ...normalized.result];
	};

	@action private setNextUrl = (url: string) => {
		this.nextUrl = url;
	};

	@action private clearData = () => {
		this.illusts = {};
		this.users = {};
		this.keys = [];
		this.nextUrl = '';
	};

	@action public updateBookmark = (id: number, isBookmarked: boolean) => {
		const illusts: any = { ...this.illusts };
		illusts[id].is_bookmarked = isBookmarked;
		this.illusts = illusts;
	};

	// @action public updateFollow = (id: number, isBookmarked: boolean) => { };

	public fetchIllusts = async () => {
		this.fetch().then(({ illusts, next_url }) => {
			this.setIllusts(illusts);
			this.setNextUrl(next_url);
		});
	};

	public loadMoreIllusts = async () => {
		pixivApi.requestUrl(this.nextUrl).then(({ illusts, next_url }) => {
			this.setIllusts(illusts);
			this.setNextUrl(next_url);
		});
	};

	public reloadIllusts = async () => {
		this.clearData();
		this.fetchIllusts();
	};
}

export default IllustsStore;

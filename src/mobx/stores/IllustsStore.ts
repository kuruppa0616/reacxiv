import { observable, action, computed, toJS, IObservableObject } from 'mobx';
import { Illust, PixivApiClient } from 'pixiv-api-client';
import { normalize, schema, denormalize } from 'normalizr';

import pixivApi from '@/api/PixivApi';

type FetchIllusts =
	| PixivApiClient['illustRecommended']
	| PixivApiClient['illustFollow'];

const userSchema = new schema.Entity('users');

const illustSchema = new schema.Entity('illusts', {
	user: userSchema
});

const illustsSchema = new schema.Array(illustSchema);

export class IllustsStore {
	private fetch: FetchIllusts;
	private nextUrl: string = '';

	constructor(fetch: FetchIllusts) {
		this.fetch = fetch;
	}

	@observable.shallow private illusts = observable({});
	@observable.shallow private users = observable({});
	@observable.shallow private keys: number[] = observable([]);

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

	@action private clearIllusts = () => {
		this.illusts = observable({});
		this.users = observable({});
		this.keys = observable([]);
		this.nextUrl = '';
	};

	@action public updateBookmark = (id: number, isBookmarked: boolean) => {
		const toJSIllusts: any = { ...this.illusts };
		toJSIllusts[id].is_bookmarked = isBookmarked;
		this.illusts = toJSIllusts;
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
		this.clearIllusts();
		this.fetchIllusts();
	};
}

export default IllustsStore;

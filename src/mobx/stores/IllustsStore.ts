import { observable, action, computed, toJS } from 'mobx'
import { Illust, PixivApiClient, User } from 'pixiv-api-client';
import { normalize, schema, denormalize, } from 'normalizr';

import pixivApi from '@/api/PixivApi';

type FetchIllusts = PixivApiClient["illustRecommended"] | PixivApiClient["illustFollow"]

const userSchema = new schema.Entity('users')

const illustSchema = new schema.Entity('illusts', {
	user: userSchema
});

const illustsSchema = new schema.Array(illustSchema)

export class IllustsStore {

	private fetch: FetchIllusts

	constructor(fetch: FetchIllusts) {
		this.fetch = fetch
	}

	@observable.shallow illusts = observable({});
	@observable.shallow users = observable({});
	@observable.shallow keys: number[] = observable([]);
	@observable nextUrl: string = "";

	@computed get toJSIllusts() {
		return toJS(this.illusts)
	}

	@computed get toJSUsers() {
		return toJS(this.users)
	}

	@computed get toJSKeys() {
		return toJS(this.keys)
	}

	@computed get data(): Illust[] {
		const entities = {
			"illusts": this.toJSIllusts,
			"users": this.toJSUsers
		}
		const denormalized = denormalize(this.toJSKeys, illustsSchema, entities);
		return denormalized
	}

	@action setIllusts = (illusts: Illust[]) => {
		const normalized = normalize(illusts, illustsSchema);
		this.illusts = { ...this.illusts, ...normalized.entities.illusts }
		this.users = { ...this.users, ...normalized.entities.users }
		this.keys = [...this.keys, ...normalized.result]
	}


	@action setNextUrl = (url: string) => {
		this.nextUrl = url;
	}

	@action clearIllusts = () => {
		this.illusts = observable({});
		this.users = observable({});
		this.keys = observable([]);
		this.nextUrl = "";
	}

	fetchIllusts = async () => {
		this.fetch().then(({ illusts, next_url }) => {
			this.setIllusts(illusts)
			this.setNextUrl(next_url)
		})
	}

	loadMoreIllusts = async () => {
		pixivApi.requestUrl(this.nextUrl).then(({ illusts, next_url }) => {
			this.setIllusts(illusts)
			this.setNextUrl(next_url)
		})
	}

	reloadIllusts = async () => {
		this.clearIllusts();
		this.fetchIllusts();
	}
}

export default IllustsStore
import { observable, action, computed, toJS } from 'mobx'
import { Illust, PixivApiClient, User } from 'pixiv-api-client';
import { normalize, schema, denormalize, } from 'normalizr';

import pixivApi from '@/api/PixivApi';

type FetchIllusts = PixivApiClient["illustRecommended"] | PixivApiClient["illustFollow"]

const userSchema = new schema.Entity('users')

const illustSchema = new schema.Entity('illusts', {
	user: userSchema
});

interface NormalizedIllust extends Omit<Illust, 'user'> {
	user: number
}

const illustsSchema = new schema.Array(illustSchema)

export class IllustsStore {

	private fetch: FetchIllusts

	constructor(fetch: FetchIllusts) {
		this.fetch = fetch
	}

	@observable.shallow illusts_A: Illust[] = [];
	// @observable.shallow illusts: { [key: number]: NormalizedIllust } = {}
	@observable illusts = new Map<number, Illust>()
	@observable users = new Map<number, User>()
	// @observable keys: number[] = []
	keys: number[] = observable.array()
	@observable nextUrl: string = "";

	@computed get data(): Illust[] {
		// const js = mobx.toJS(this.illusts)
		// console.log(js);

		const entities = {
			"illusts": (this.illusts),
			"users": this.users
		}
		console.log(entities);

		// console.log(denormalize(this.keys, illustsSchema, entities));
		// return denormalize(this.keys, illustsSchema, this.illusts);

		return this.illusts_A
	}

	@action setIllusts = (illusts: Illust[]) => {
		this.illusts_A = [...this.illusts_A, ...illusts];
		const normalized = normalize(illusts, illustsSchema);
		this.illusts = { ...this.illusts, ...normalized.entities.illusts }
		this.users = { ...this.users, ...normalized.entities.users }
		this.keys = { ...this.keys, ...normalized.result }


		// const denormalized = denormalize(normalized.result, illustsSchema, normalized.entities)
		// console.log(denormalized);
	}


	@action setNextUrl = (url: string) => {
		this.nextUrl = url;
	}

	@action clearIllusts = () => {
		// this.illusts_A = [];
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
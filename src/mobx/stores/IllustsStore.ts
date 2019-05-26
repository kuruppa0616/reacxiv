import { observable, action, computed } from 'mobx'
import { Illust, PixivApiClient } from 'pixiv-api-client';
import { normalize, schema, denormalize } from 'normalizr';

import pixivApi from '@/api/PixivApi';

type FetchIllusts = PixivApiClient["illustRecommended"] | PixivApiClient["illustFollow"]

const userSchema = new schema.Entity('users')

const illustSchema = new schema.Entity('illusts', {
	user: userSchema
})

const illustsSchema = new schema.Array(illustSchema)

export class IllustsStore {

	private fetch: FetchIllusts

	constructor(fetch: FetchIllusts) {
		this.fetch = fetch
	}

	@observable illusts: Illust[] = [];
	@observable nextUrl: string = "";

	@action setIllusts = (illusts: Illust[]) => {
		this.illusts = [...this.illusts, ...illusts];
		const normalized = normalize(this.illusts, illustsSchema);
		console.log(normalized);
		const denormalized = denormalize(normalized.result, illustsSchema, normalized.entities)
		console.log(denormalized);
	}


	@action setNextUrl = (url: string) => {
		this.nextUrl = url;
	}

	@action clearIllusts = () => {
		this.illusts = [];
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
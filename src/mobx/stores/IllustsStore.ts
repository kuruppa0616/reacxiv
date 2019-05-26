import { observable, action, computed } from 'mobx'
import { Illust, PixivApiClient } from 'pixiv-api-client';
import pixivApi from '@/api/PixivApi';

type FetchIllusts = PixivApiClient["illustRecommended"] | PixivApiClient["illustFollow"]

export class IllustsStore {

	private fetch: FetchIllusts

	constructor(fetch: FetchIllusts) {
		this.fetch = fetch
	}

	@observable illusts: Illust[] = [];
	@observable nextUrl: string = "";

	@action setIllusts = (illusts: Illust[]) => {
		this.illusts = [...this.illusts, ...illusts];
		console.log(illusts);
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
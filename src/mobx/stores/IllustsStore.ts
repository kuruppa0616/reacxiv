import { createContext } from 'react'
import { observable, computed, action, decorate } from 'mobx'
import { Illust, RequestOption, IllustsResponse, PixivApiClient } from 'pixiv-api-client';
import pixivApi from '@/api/PixivApi';
type FetchIllusts = PixivApiClient["illustRecommended"] | PixivApiClient["illustFollow"]

export class IllustsStore {

	private fetch: FetchIllusts

	constructor(fetch: FetchIllusts) {
		this.fetch = fetch
	}

	@observable.shallow illusts: Illust[] = [];
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

	@action fetchIllusts = async () => {
		this.fetch().then(({ illusts, next_url }) => {
			this.setIllusts(illusts)
			this.setNextUrl(next_url)
		})
	}

	@action loadMoreIllusts = async () => {
		pixivApi.requestUrl(this.nextUrl).then(({ illusts, next_url }) => {
			this.setIllusts(illusts)
			this.setNextUrl(next_url)
		})
	}

	@action reloadIllusts = async () => {
		this.clearIllusts();
		this.fetchIllusts();
	}
}

export default IllustsStore
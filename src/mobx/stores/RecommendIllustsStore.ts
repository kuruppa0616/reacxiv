import { createContext } from 'react'
import { observable, computed, action } from 'mobx'
import { Illust } from 'pixiv-api-client';
import pixivApi from '@/api/PixivApi';

class RecommendIllustsStore {
	@observable illusts: Illust[] = [];
	@observable nextUrl: string = "";

	@action
	private setIllusts = (illusts: Illust[]) => {
		this.illusts = [...this.illusts, ...illusts];
	}

	@action
	private setNextUrl = (url: string) => {
		this.nextUrl = url;
	}

	@action
	private clearIllusts = () => {
		this.illusts = [];
	}

	fetchIllusts = async () => {
		pixivApi.illustRecommended().then(({ illusts, next_url }) => {
			this.setIllusts(illusts)
			this.setNextUrl(next_url)
		})
	}

	loadMoreIllusts = () => {
		pixivApi.requestUrl(this.nextUrl).then(({ illusts, next_url }) => {
			this.setIllusts(illusts)
			this.setNextUrl(next_url)
		})
	}

	reloadIllusts = () => {
		this.clearIllusts();
		this.fetchIllusts();
	}
}

export default createContext(new RecommendIllustsStore());
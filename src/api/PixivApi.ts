import PixivApi from 'pixiv-api-client';

class ExtendedPixivApi extends PixivApi {
	setToken(token: string, refreshToken: string) {
		const auth = {
			access_token: token,
			refresh_token: refreshToken
		};
		this.auth = auth;
	};
}
const pixivApi = new ExtendedPixivApi()
export default pixivApi;
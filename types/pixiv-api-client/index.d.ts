export default PixivApiClient;

export interface Illust {
	id: number;
	title: string;
	type: string;
	image_urls: {
		square_medium: string;
		medium: string;
		large: string;
	};
	caption: string;
	restrict: number;
	user: {
		id: number;
		name: string;
		account: string;
		profile_image_urls: {
			medium: string;
		};
		is_followed: boolean;
	};
	tags: Tag[];
	tools: string[];
	create_date: Date;
	page_count: number;
	width: number;
	height: number;
	sanity_level: number;
	x_restrict: number;
	series?: Promise<any>;
	meta_single_page: {
		original_image_url: string;
	};
	meta_pages: {
		image_urls: {
			square_medium: string;
			medium: string;
			large: string;
			original: string;
		};
	}[];
	total_view: number;
	total_bookmarks: number;
	is_bookmarked: boolean;
	visible: boolean;
	is_muted: boolean;
}

export interface Tag {
	name: string;
	translated_name: string;
}

export interface Credential {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
	refresh_token: string;
	user: {
		profile_image_urls: {
			px_16x16: string;
			px_50x50: string;
			px_170x170: string;
		};
		id: string;
		name: string;
		account: string;
		mail_address: string;
		is_premium: boolean;
		x_restrict: number;
		is_mail_authorized: boolean;
	};
	device_token: string;
}

declare class PixivApiClient {
	auth: null | {
		access_token: string,
		refresh_token: string
	};
	username?: string;
	password?: string;
	headers: {
		'App-OS': 'ios',
		'Accept-Language': 'en-us',
		'App-OS-Version': '12.0.1',
		'App-Version': '7.2.2',
		'User-Agent': 'PixivIOSApp/7.2.2 (iOS 12.0.1; iPhone8,2)',
	};
	authInfo(): Promise<any>;
	bookmarkIllust(id: number, restrict: any, tags?: string[]): Promise<any>;
	bookmarkNovel(id: number, restrict: any, tags?: string[]): Promise<any>;
	createProvisionalAccount(nickname: string): Promise<any>;
	editUserAccount(fields: any): Promise<any>;
	followUser(id: number, restrict: any): Promise<any>;
	illustAddComment(id: number, comment: string, parentCommentid: number): Promise<any>;
	illustBookmarkDetail(id: number, options: any): Promise<any>;
	illustCommentReplies(id: number): Promise<any>;
	illustComments(id: number, options: any): Promise<any>;
	illustCommentsV2(id: number, options: any): Promise<any>;
	illustDetail(id: number, options: any): Promise<any>;
	illustFollow(options?: any): Promise<{
		illusts: Illust[]
		next_url: string
	}>;
	illustMyPixiv(): Promise<any>;
	illustNew(options: any): Promise<any>;
	illustRanking(options: any): Promise<any>;
	illustRecommended(options?: any): Promise<{
		contest_exists: boolean
		illusts: Illust[]
		next_url: string
		privacy_policy: {}
		ranking_illusts: Illust[]

	}>;
	illustRelated(id: number, options: any): Promise<any>;
	illustWalkthrough(): Promise<any>;
	login(username: string, password: string, rememberPassword?: boolean): Promise<Credential>
	logout(): Promise<void>;
	mangaNew(options: any): Promise<any>;
	mangaRecommended(options: any): Promise<any>;
	novelAddComment(id: number, comment: string, parentCommentid: number): Promise<any>;
	novelBookmarkDetail(id: number, options: any): Promise<any>;
	novelCommentReplies(id: number): Promise<any>;
	novelComments(id: number, options: any): Promise<any>;
	novelCommentsV2(id: number, options: any): Promise<any>;
	novelDetail(id: number): Promise<any>;
	novelFollow(options: any): Promise<any>;
	novelMyPixiv(): Promise<any>;
	novelNew(options: any): Promise<any>;
	novelRanking(options: any): Promise<any>;
	novelRecommended(options: any): Promise<any>;
	novelSeries(id: number): Promise<any>;
	novelText(id: number): Promise<any>;
	refreshAccessToken(refreshToken: string): Promise<any>;
	requestUrl(url: string, options: any): Promise<any>;
	searchAutoComplete(word: string): Promise<any>;
	searchIllust(word: string, options?: any): Promise<{
		illusts: Illust[];
		next_url: string;
		search_span_limit: number;
	}>;
	searchIllustBookmarkRanges(word: string, options: any): Promise<any>;
	searchIllustPopularPreview(word: string, options: any): Promise<any>;
	searchNovel(word: string, options: any): Promise<any>;
	searchNovelBookmarkRanges(word: string, options: any): Promise<any>;
	searchNovelPopularPreview(word: string, options: any): Promise<any>;
	searchUser(word: string): Promise<any>;
	sendAccountVerificationEmail(): Promise<any>;
	setLanguage(lang: any): Promise<void>;
	trendingTagsIllust(options: any): Promise<any>;
	trendingTagsNovel(options: any): Promise<any>;
	ugoiraMetaData(id: number): Promise<any>;
	unbookmarkIllust(id: number): Promise<any>;
	unbookmarkNovel(id: number): Promise<any>;
	unfollowUser(id: number): Promise<any>;
	userBookmarkIllustTags(options: any): Promise<any>;
	userBookmarkNovelTags(options: any): Promise<any>;
	userBookmarksIllust(id: number, options: any): Promise<any>;
	userBookmarksNovel(id: number, options: any): Promise<any>;
	userDetail(id: number, options: any): Promise<any>;
	userFollowDetail(id: number): Promise<any>;
	userFollower(id: number, options: any): Promise<any>;
	userFollowing(id: number, options: any): Promise<any>;
	userIllusts(id: number, options: any): Promise<any>;
	userMyPixiv(id: number): Promise<any>;
	userNovels(id: number, options: any): Promise<any>;
	userRecommended(options: any): Promise<any>;
	userState(): Promise<any>;
}

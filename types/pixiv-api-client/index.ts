export default index;

interface Illust {
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
	series?: any;
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

interface Tag {
	name: string;
	translated_name: string;
}

declare class index {
	headers: {
		'App-OS': 'ios',
		'Accept-Language': 'en-us',
		'App-OS-Version': '12.0.1',
		'App-Version': '7.2.2',
		'User-Agent': 'PixivIOSApp/7.2.2 (iOS 12.0.1; iPhone8,2)',
	};
	authInfo(): any;
	bookmarkIllust(id: any, restrict: any, tags: any): any;
	bookmarkNovel(id: any, restrict: any, tags: any): any;
	createProvisionalAccount(nickname: any): any;
	editUserAccount(fields: any): any;
	followUser(id: any, restrict: any): any;
	illustAddComment(id: any, comment: any, parentCommentId: any): any;
	illustBookmarkDetail(id: any, options: any): any;
	illustCommentReplies(id: any): any;
	illustComments(id: any, options: any): any;
	illustCommentsV2(id: any, options: any): any;
	illustDetail(id: any, options: any): any;
	illustFollow(options: any): any;
	illustMyPixiv(): any;
	illustNew(options: any): any;
	illustRanking(options: any): any;
	illustRecommended(options: any): any;
	illustRelated(id: any, options: any): any;
	illustWalkthrough(): any;
	login(username: string, password: string, rememberPassword?: boolean): Promise<{
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
	}>
	logout(): any;
	mangaNew(options: any): any;
	mangaRecommended(options: any): any;
	novelAddComment(id: any, comment: any, parentCommentId: any): any;
	novelBookmarkDetail(id: any, options: any): any;
	novelCommentReplies(id: any): any;
	novelComments(id: any, options: any): any;
	novelCommentsV2(id: any, options: any): any;
	novelDetail(id: any): any;
	novelFollow(options: any): any;
	novelMyPixiv(): any;
	novelNew(options: any): any;
	novelRanking(options: any): any;
	novelRecommended(options: any): any;
	novelSeries(id: any): any;
	novelText(id: any): any;
	refreshAccessToken(refreshToken: any): any;
	requestUrl(url: any, options: any): any;
	searchAutoComplete(word: any): any;
	searchIllust(word: string, options?: any): Promise<{
		illusts: Illust[];
		next_url: string;
		search_span_limit: number;
	}>;
	searchIllustBookmarkRanges(word: any, options: any): any;
	searchIllustPopularPreview(word: any, options: any): any;
	searchNovel(word: any, options: any): any;
	searchNovelBookmarkRanges(word: any, options: any): any;
	searchNovelPopularPreview(word: any, options: any): any;
	searchUser(word: any): any;
	sendAccountVerificationEmail(): any;
	setLanguage(lang: any): void;
	trendingTagsIllust(options: any): any;
	trendingTagsNovel(options: any): any;
	ugoiraMetaData(id: any): any;
	unbookmarkIllust(id: any): any;
	unbookmarkNovel(id: any): any;
	unfollowUser(id: any): any;
	userBookmarkIllustTags(options: any): any;
	userBookmarkNovelTags(options: any): any;
	userBookmarksIllust(id: any, options: any): any;
	userBookmarksNovel(id: any, options: any): any;
	userDetail(id: any, options: any): any;
	userFollowDetail(id: any): any;
	userFollower(id: any, options: any): any;
	userFollowing(id: any, options: any): any;
	userIllusts(id: any, options: any): any;
	userMyPixiv(id: any): any;
	userNovels(id: any, options: any): any;
	userRecommended(options: any): any;
	userState(): any;
}

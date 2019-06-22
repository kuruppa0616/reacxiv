export default PixivApiClient;
import { CancelToken } from 'axios';

export interface Illust {
	id: number;
	title: string;
	type: string;
	image_urls: ImageUrls;
	caption: string;
	restrict: number;
	user: User;
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
		image_urls: ImageUrlsWithOrig;
	}[];
	total_view: number;
	total_bookmarks: number;
	is_bookmarked: boolean;
	visible: boolean;
	is_muted: boolean;
}

export interface User {
	id: number;
	name: string;
	account: string;
	profile_image_urls: {
		medium: string;
	};
	is_followed: boolean;
}

export interface Tag {
	name: string;
	translated_name: string;
}

export interface ImageUrls {
	square_medium: string;
	medium: string;
	large: string;
}

export interface ImageUrlsWithOrig extends ImageUrls {
	original: string;
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

export interface UserWithComment extends User {
	comment: string;
}

export interface Profile {
	webpage: string;
	gender: string;
	birth: string;
	birth_day: string;
	birth_year: number;
	region: string;
	address_id: number;
	country_code: string;
	job: string;
	job_id: number;
	total_follow_users: number;
	total_mypixiv_users: number;
	total_illusts: number;
	total_manga: number;
	total_novels: number;
	total_illust_bookmarks_public: number;
	total_illust_series: number;
	total_novel_series: number;
	background_image_url?: any;
	twitter_account: string;
	twitter_url: string;
	pawoo_url?: any;
	is_premium: boolean;
	is_using_custom_profile_image: boolean;
}

export interface ProfilePublicity {
	gender: string;
	region: string;
	birth_day: string;
	birth_year: string;
	job: string;
	pawoo: boolean;
}

export interface Workspace {
	pc: string;
	monitor: string;
	tool: string;
	scanner: string;
	tablet: string;
	mouse: string;
	printer: string;
	desktop: string;
	music: string;
	desk: string;
	chair: string;
	comment: string;
	workspace_image_url?: any;
}

export interface IllustsResponse {
	illusts: Illust[]
	next_url: string
}

export interface UserResponse {
	user: UserWithComment;
	profile: Profile;
	profile_publicity: ProfilePublicity;
	workspace:Workspace
}

type Restrict = "public " | "private ";

export interface RequestOption {
	cancelToken: CancelToken
}

export interface WorksFollowRequestOption extends RequestOption {
	restrict: "All " | Restrict;
}

export declare class PixivApiClient {
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
	bookmarkIllust(id: number, restrict?: Restrict, tags?: string[]): Promise<void>;
	bookmarkNovel(id: number, restrict?: Restrict, tags?: string[]): Promise<void>;
	createProvisionalAccount(nickname: string): Promise<any>;
	editUserAccount(fields: any): Promise<any>;
	followUser(id: number, restrict?: Restrict): Promise<void>;
	illustAddComment(id: number, comment: string, parentCommentid: number): Promise<any>;
	illustBookmarkDetail(id: number, options?: RequestOption): Promise<any>;
	illustCommentReplies(id: number): Promise<any>;
	illustComments(id: number, options?: RequestOption): Promise<any>;
	illustCommentsV2(id: number, options?: RequestOption): Promise<any>;
	illustDetail(id: number, options?: RequestOption): Promise<{ illust: Illust }>;
	illustFollow(options?: WorksFollowRequestOption): Promise<IllustsResponse>;
	illustMyPixiv(): Promise<any>;
	illustNew(options?: RequestOption): Promise<any>;
	illustRanking(options?: RequestOption): Promise<any>;
	illustRecommended(options?: RequestOption): Promise<IllustsResponse>;
	illustRelated(id: number, options?: RequestOption): Promise<IllustsResponse>;
	illustWalkthrough(): Promise<any>;
	login(username: string, password: string, rememberPassword?: boolean): Promise<Credential>
	logout(): Promise<void>;
	mangaNew(options?: RequestOption): Promise<any>;
	mangaRecommended(options?: RequestOption): Promise<any>;
	novelAddComment(id: number, comment: string, parentCommentid: number): Promise<any>;
	novelBookmarkDetail(id: number, options?: RequestOption): Promise<any>;
	novelCommentReplies(id: number): Promise<any>;
	novelComments(id: number, options?: RequestOption): Promise<any>;
	novelCommentsV2(id: number, options?: RequestOption): Promise<any>;
	novelDetail(id: number): Promise<any>;
	novelFollow(options?: WorksFollowRequestOption): Promise<any>;
	novelMyPixiv(): Promise<any>;
	novelNew(options?: RequestOption): Promise<any>;
	novelRanking(options?: RequestOption): Promise<any>;
	novelRecommended(options?: RequestOption): Promise<any>;
	novelSeries(id: number): Promise<any>;
	novelText(id: number): Promise<any>;
	refreshAccessToken(refreshToken: string): Promise<any>;
	requestUrl(url: string, options?: RequestOption): Promise<IllustsResponse>;
	searchAutoComplete(word: string): Promise<any>;
	searchIllust(word: string, options?: RequestOption): Promise<{
		illusts: Illust[];
		next_url: string;
		search_span_limit: number;
	}>;
	searchIllustBookmarkRanges(word: string, options?: RequestOption): Promise<any>;
	searchIllustPopularPreview(word: string, options?: RequestOption): Promise<any>;
	searchNovel(word: string, options?: RequestOption): Promise<any>;
	searchNovelBookmarkRanges(word: string, options?: RequestOption): Promise<any>;
	searchNovelPopularPreview(word: string, options?: RequestOption): Promise<any>;
	searchUser(word: string): Promise<any>;
	sendAccountVerificationEmail(): Promise<any>;
	setLanguage(lang: any): Promise<void>;
	trendingTagsIllust(options?: RequestOption): Promise<any>;
	trendingTagsNovel(options?: RequestOption): Promise<any>;
	ugoiraMetaData(id: number): Promise<any>;
	unbookmarkIllust(id: number): Promise<void>;
	unbookmarkNovel(id: number): Promise<any>;
	unfollowUser(id: number): Promise<void>;
	userBookmarkIllustTags(options?: RequestOption): Promise<any>;
	userBookmarkNovelTags(options?: RequestOption): Promise<any>;
	userBookmarksIllust(id: number, options?: RequestOption): Promise<any>;
	userBookmarksNovel(id: number, options?: RequestOption): Promise<any>;
	userDetail(id: number, options?: RequestOption): Promise<UserResponse>;
	userFollowDetail(id: number): Promise<any>;
	userFollower(id: number, options?: RequestOption): Promise<any>;
	userFollowing(id: number, options?: RequestOption): Promise<any>;
	userIllusts(id: number, options?: RequestOption): Promise<any>;
	userMyPixiv(id: number): Promise<any>;
	userNovels(id: number, options?: RequestOption): Promise<any>;
	userRecommended(options?: RequestOption): Promise<any>;
	userState(): Promise<any>;
}

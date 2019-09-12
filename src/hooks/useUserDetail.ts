import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigationParam } from 'react-navigation-hooks';

import { User, UserResponse } from 'pixiv-api-client';

import pixivApi from '@/api/PixivApi';
import { GlobalIllustsStore } from '@/mobx/stores';

import useFollow from './useFollow';

export interface userAction {
	followUser: (user: User) => void;
}

const useUserDetail = (): [UserResponse | undefined, User, userAction] => {
	const userId: number = useNavigationParam('userId');
	console.log(userId);

	const store = useContext(GlobalIllustsStore);
	const [userDetail, setUserDetail] = useState<UserResponse>();

	useEffect(() => {
		pixivApi.userDetail(userId).then(res => {
			setUserDetail(res);
		});
	}, []);

	const [followUser] = useFollow(store);

	const userOverviewMemo = useMemo(() => {
		const users = store.users;
		return users[userId];
	}, [store.users]);

	return [userDetail, userOverviewMemo, { followUser }];
};

export default useUserDetail;

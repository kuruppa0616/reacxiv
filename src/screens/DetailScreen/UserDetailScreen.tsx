import React from 'react';

import { observer } from 'mobx-react-lite';
import { Container } from 'native-base';

import { Loading } from '@/components/Loading';
import { useUserDetail } from '@/hooks';
import { UserDetail } from '@/components/UserDetail';

const UserDetailContainer = observer(() => {
	const [userDetail, userOverviewMemo, userAction] = useUserDetail();

	return (
		<Container>
			{userDetail ? (
				<UserDetail {...{ userDetail, userOverviewMemo, userAction }} />
			) : (
				<Loading />
			)}
		</Container>
	);
});

export default UserDetailContainer;

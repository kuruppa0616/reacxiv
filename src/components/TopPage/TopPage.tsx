import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import pixivApi from '../../api/PixivApi';

const TopPage = ((props: any) => {

	const [recommend, setRecommend] = useState("");

	useEffect(() => {
		console.log("おはよう");
		pixivApi.illustFollow().then((res) => {
			console.log(res);
			setRecommend("おやすみ")
		})
	}, [])

	return (
		<Container>
			<Text>TopPage！！！！{recommend}</Text>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 auto;
	width:100%;
	justify-content: center;
  align-items: center;
`
export default TopPage;
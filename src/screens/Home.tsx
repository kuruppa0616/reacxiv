import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View, Image, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';

const Home = memo(() => {
	return (
		<Container>
				<IllustList fetchIllusts={()=>pixivApi.illustFollow()}/>
		</Container>
	);
});

const Container = styled.View`
	flex: 1 ;
	width:100%;
  align-items: center;
`
export default Home;
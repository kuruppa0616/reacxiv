import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View, Image, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import Home from './Home';
import { IllustDetail } from '../DetailScreen';
import { createStackNavigator, withNavigation } from 'react-navigation';
import { Screens } from '@/constants';

const Recommend = memo((props: any) => {
	return (
		<Home>
			<View>
				<IllustList fetchIllusts={() => pixivApi.illustRecommended()} />
			</View>
		</Home>

	);
});


export default Recommend;
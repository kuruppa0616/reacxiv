import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View, Image, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import Home from './Home';
import IllustDeteil from '../IllustDeteil';
import { createStackNavigator } from 'react-navigation';
import { Screens } from '@/constants';

const Recommend = memo(() => {
	return (
		<Home>
			<View>
				<IllustList fetchIllusts={() => pixivApi.illustRecommended()} />
			</View>
		</Home>

	);
});

const RecommendNavigator = createStackNavigator({
	[Screens.Recommend]: Recommend,
	[Screens.IllustDetail]: IllustDeteil
}, {
		initialRouteName: "Recommend"
	})

export default RecommendNavigator;
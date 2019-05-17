import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View, Image, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import Home from './Home';

const Top = memo(() => {
	return (
		<Home>
			<Text>Home</Text>
		</Home>
	);
});

export default Top;
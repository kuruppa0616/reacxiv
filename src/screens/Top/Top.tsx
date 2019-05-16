import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, FlatList, Text, View, Image, Dimensions } from 'react-native';
import pixivApi from '@/api/PixivApi';
import { IllustList } from '@/components/IllustList';
import { Container, Body, Content } from 'native-base';
import { BottomTabBar } from '@/components/BottomTabBar';

interface Props{
  children:JSX.Element
}
const Top = memo((props:Props) => {
  const {children} = props
	return (
		<Container>
      <Content>
        {children}
      </Content>
			<BottomTabBar/>
		</Container>
	);
});
export default Top;
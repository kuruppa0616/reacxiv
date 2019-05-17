import Top from './Top';
import Recommend from './Recommend';
import New from './New';
import { createBottomTabNavigator } from "react-navigation";
import { Screens } from '@/constants';

const TabNavigator = createBottomTabNavigator({
	[Screens.Home]: Top,
	[Screens.Recommend]: Recommend,
	[Screens.New]: New
});

export default TabNavigator;

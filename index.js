/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
	// illustDetailが原因。今のとこどうしようもない
	'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'

]);

AppRegistry.registerComponent(appName, () => App);

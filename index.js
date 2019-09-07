/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
	//TODO:react-native-reanimatedが対応されるまでの応急処置
	'Warning: componentWillMount has been renamed, and is not recommended for use.',
	// illustDetailが原因。今のとこどうしようもない
	'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'

]);

AppRegistry.registerComponent(appName, () => App);

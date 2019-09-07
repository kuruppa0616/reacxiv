/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { YellowBox } from 'react-native';

//TODO:react-native-reanimatedが対応されるまでの応急処置
YellowBox.ignoreWarnings([
	'Warning: componentWillMount has been renamed, and is not recommended for use.'
]);

AppRegistry.registerComponent(appName, () => App);

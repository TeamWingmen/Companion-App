import { AppRegistry } from 'react-native';
import App from './App';
import { StackNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('SmartNotesCompanion', () => App);

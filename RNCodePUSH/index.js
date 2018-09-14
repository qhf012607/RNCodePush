import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {rootNave} from './page/BaseTab'
import './common/netUrl'
AppRegistry.registerComponent(appName, () => rootNave);
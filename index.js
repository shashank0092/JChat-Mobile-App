/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import { SocketProvider } from './src/context/SocketContext';
import 'react-native-get-random-values';
import { decode as atob, encode as btoa } from 'base-64';
import "./ReadableStreamPolyfill"


if (typeof global.btoa === 'undefined') {
  global.btoa = btoa;
}

if (typeof global.atob === 'undefined') {
  global.atob = atob;
}

export default function Main() {
  return (
    <PaperProvider>
      <AlertNotificationRoot>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AlertNotificationRoot>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

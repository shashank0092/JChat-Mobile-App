/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import { SocketProvider } from './src/context/SocketContext';

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

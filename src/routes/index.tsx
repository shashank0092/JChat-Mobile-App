import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Chat from '../screens/Chats/Chat';
import { AuthProvider } from '../context/AuthContext';
import ConnectionChat from '../screens/Chats/TabScreens/Chats/Screens/ConnectionChat';
import { ActivityIndicator, Avatar, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AddContact from '../screens/Chats/TabScreens/Chats/Screens/AddContact';
import OptionsModal from '../component/OptionsModal/OptionsModal';
import { SocketProvider } from '../context/SocketContext';




export type rootStackParamList = {
  Login: undefined;
  Register: undefined;
  Chat: undefined;
  ConnectionChat: undefined;
  AddContact: { contactType: string }
};

export type NavigationProps = NativeStackScreenProps<rootStackParamList>;


const Routes = () => {

  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);
  const [showOptionModal, setShowOptionModal] = useState(false)
  const Stack = createNativeStackNavigator<rootStackParamList>();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('isFirstLaunch');
        if (value === null) {
          setIsFirstLaunch(true);

        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch', error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View className='flex flex-1 justify-center items-center' >
        <ActivityIndicator animating={true} size={'large'} />
      </View>
    )
  }

  return (
    <>
      <NavigationContainer>
        <SocketProvider>
          <AuthProvider>
            <View className={`${showOptionModal ? "flex" : "hidden"} absolute left-[75vw] top-10  z-[1]`} >
              <OptionsModal />
            </View>
            <Stack.Navigator initialRouteName={isFirstLaunch ? "Login" : "Chat"}  >
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                  headerTitle: 'JChat',
                  headerBackVisible: false,
                  headerTintColor: 'white',

                  headerRight: () => (
                    <IconButton
                      icon={'dots-vertical'}
                      iconColor="white"
                      onPress={
                        () => {
                          setShowOptionModal((prev) => !prev)
                        }

                      }
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#1A212E',
                  },
                  headerTitleStyle: {
                    color: 'white',
                    fontSize: 28
                  },
                }}
              />
              <Stack.Screen
                name="ConnectionChat"
                component={ConnectionChat}

              />
              <Stack.Screen
                name='AddContact'
                component={AddContact}
                options={{
                  headerTitle: "New Chat",
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: "#1A212E"
                  },
                  headerTitleStyle: {
                    color: "white"
                  }
                }}
              />
            </Stack.Navigator>
          </AuthProvider>
        </SocketProvider>
      </NavigationContainer>
    </>
  );
};

export default Routes;

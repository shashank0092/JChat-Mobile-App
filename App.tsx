import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Login from "./src/screens/Login/Login"
import Register from './src/screens/Register/Register';
import type {NativeStackScreenProps} from "@react-navigation/native-stack"

export type NavigationProps=NativeStackScreenProps<rootStackParamList>

type rootStackParamList={
  Login:undefined;
  Register:undefined;
}



const App = () => {
  useEffect(()=>{
    SplashScreen.hide()
  },[])

  const Stack=createNativeStackNavigator<rootStackParamList>()
  
  return (
    <>
      {/* <Text className="bg-red-500">SHUKLA BOI</Text>
      <Icon name="home" size={30} color="#4F8EF7" /> */}
      <NavigationContainer   >
        <Stack.Navigator initialRouteName={"Login"} >
        <Stack.Screen 
        name='Login' 
        component={Login} 
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Register'
        component={Register}
        options={{headerShown:false}}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

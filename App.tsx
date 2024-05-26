import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

const App = () => {
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  return (
    <>
      <Text className="bg-red-500">SHUKLA BOI</Text>
      <Icon name="home" size={30} color="#4F8EF7" />
    </>
  );
};

export default App;

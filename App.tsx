import SplashScreen from 'react-native-splash-screen';
import { useEffect, useState } from 'react';
import Routes from './src/routes';
import 'react-native-url-polyfill/auto'



const App = () => {

  
  useEffect(()=>{
    SplashScreen.hide()
  },[])

  const data=process.env.SERVER_URL
  console.log(data)
  
  return (
    <>
        <Routes/>
    </>
  );
};

export default App;

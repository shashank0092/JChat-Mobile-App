import {StyleSheet, View,TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {NavigationProps} from "../App"
import Login from './component/Forms/LoginForm';
import GoogleLogin from './component/GoogleLogin';


const Home = ({navigation,route}:NavigationProps) => {

  const PressMe=()=>{
    console.log("Pressing me")
  }

  console.log('this is home screen');
  return (
    <>
      <View className="bg-[#D9D9D9] h-[100vh] flex items-center ">
        <View className='flex h-full justify-evenly ' >
          <View>
          <View>
                <Text className='text-black ' style={styles.shukla}  variant='displaySmall' > Welocme to JChat </Text>
           </View>
           <View>
                <Text className='text-black' variant='headlineSmall' >Chat,Communicate and Share</Text>
           </View>
          </View>
           <View>
             <Login/>
           </View>
           <View className='bg-black h-1' ></View>
           <View>
              <GoogleLogin/>
           </View>
           <TouchableOpacity className='flex flex-row justify-center'  onPress={()=>navigation.navigate("Register")} >
            <Text className='text-black underline ' variant='labelLarge' >Don't Have Account Yet?</Text>
           </TouchableOpacity>
           <TouchableOpacity className='flex flex-row justify-center' >
            <Text variant='labelMedium' className='text-black' >Forgot Password</Text>
           </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles=StyleSheet.create({
  shukla:{
    fontFamily:"Sometype Mono"
  }
})

export default Home;

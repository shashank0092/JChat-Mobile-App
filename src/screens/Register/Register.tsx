import { View } from "react-native"
import { Text,Icon } from "react-native-paper"
import RegisterForm from "../../component/Forms/RegisterForm"


const Register=()=>{
    return(
        <>
            <View className="bg-[#D9D9D9] h-[100vh]" >
                <View className="h-full  mt-5" >
                    <View className="flex flex-row items-center justify-center " >
                        <Text variant="displaySmall" className="text-black" > Create Account </Text>
                        <Icon source="account" size={40} color="black" />
                    </View>
                    <View className="bg-black  h-[2px] mx-5" ></View>
                    <View className="mx-5 my-5" >
                        <RegisterForm/>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Register
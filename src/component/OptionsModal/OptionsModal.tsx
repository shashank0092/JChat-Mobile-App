import { View,TouchableOpacity } from "react-native"
import {Text} from "react-native-paper"
import IonicIcons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const OptionsModal=()=>{
    return(
        <View className="bg-black  w-24 pt-2 pb-2" >
            <TouchableOpacity className="border-b-[1px] border-white flex flex-row justify-around" >
                <Text className="text-white text-center" >Settings</Text>
                <IonicIcons name="settings-sharp" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row justify-around mt-1" >
                <Text className="text-white text-center  " >Logout</Text>
                <MaterialIcons name="logout" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}
export default OptionsModal


import { Image, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import { UserInterface } from "../../../../../types/user"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Chat=({userDetails}:{userDetails:UserInterface})=>{

    const fetchUserDetails=async()=>{
        const details=await AsyncStorage.getItem("currentChat")
        console.log(details)
    }
    return(
        <>
           <View className="flex flex-row py-2 m-3 items-center gap-3  " >
                <View   >  
                    <Avatar.Image
                    size={50}
                    source={{uri:`https://ik.imagekit.io/shashank007/${userDetails.imagePath}`}}
                    className="ml-2"
                    />
                </View>
                <View>
                    <View>
                        <Text>{userDetails.name}</Text>
                    </View>
                    <View>
                        <Text>Last Message</Text>
                    </View>
                </View>
               
           </View>
           <View className="bg-black  h-1 ml-5 mr-5" ></View>
        </>
    )
}

export default Chat
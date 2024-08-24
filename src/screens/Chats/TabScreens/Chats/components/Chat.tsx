import { Image, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import { UserInterface } from "../../../../../types/user"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { GetS3KeyImageParser } from "../../../../../util/ImagesKeyParser"

const Chat=({userDetails}:{userDetails:UserInterface})=>{

    const[imageLink,setImageLink]=useState("")

    useEffect(()=>{
        ImageSet()
    },[])
    
    const ImageSet=async()=>{
        const s3Link=await GetS3KeyImageParser(userDetails.attachment[0].url)
        setImageLink(s3Link)
    }
    return(
        <>
           <View className="flex flex-row py-2 m-3 items-center gap-3  " >
                <View   >  
                    <Avatar.Image
                    size={50}
                    source={{uri:`${imageLink}`}}
                    className="ml-2"
                    />
                </View>
                <View>
                    <View>
                        <Text className="text-white" >{userDetails.name}</Text>
                    </View>
                    <View>
                        <Text className="text-white" >Last Message</Text>
                    </View>
                </View>
               
           </View>
           <View className="bg-black  h-1 ml-5 mr-5" ></View>
        </>
    )
}

export default Chat
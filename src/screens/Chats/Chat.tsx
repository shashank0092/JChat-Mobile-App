import { Text } from "react-native-paper"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import Chats from "./TabScreens/Chats/Chats"
import Status from "./TabScreens/Status/Status"
import Calls from "./TabScreens/Calls/Calls"


const Tab=createMaterialTopTabNavigator()

const Chat=()=>{
    return(
        <>
           <Tab.Navigator  
            screenOptions={{
                tabBarStyle:{
                    backgroundColor:"#1A212E",
                },
                tabBarLabelStyle:{
                    color:"#ffff"
                }
            }}
           >
           <Tab.Screen name="chats" component={Chats}  />
            <Tab.Screen name="status" component={Status}/>
            <Tab.Screen name="calls" component={Calls} />
           </Tab.Navigator>
        </>
    )
}

export default Chat
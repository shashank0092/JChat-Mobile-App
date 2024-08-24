import { Text } from "react-native-paper"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Chats from "./TabScreens/Chats/Chats"
import Status from "./TabScreens/Status/Status"
import Calls from "./TabScreens/Calls/Calls"



const BottomTab=createMaterialBottomTabNavigator()

const Chat=()=>{
    
    return(
        <>

            
           <BottomTab.Navigator  
            screenOptions={{
            }}
           >
           <BottomTab.Screen 
            name="chats" 
            component={Chats}  
            options={{
                tabBarLabel:"Chats",
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="android-messages" color={color} size={26} />
                  ),
            }}
            
           />
            <BottomTab.Screen 
                name="status" 
                component={Status}
                options={{
                    tabBarLabel:"Status",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="broadcast" color={color} size={26} />
                      ),
                }}
                />
            <BottomTab.Screen 
                name="calls" 
                component={Calls} 
                options={{
                    tabBarLabel:"Calls",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="call" color={color} size={26} />
                      ),
                }}
            />
           </BottomTab.Navigator>
        </>
    )
}

export default Chat
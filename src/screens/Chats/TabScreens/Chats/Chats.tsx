import { ScrollView, View } from 'react-native';
import { Portal, FAB, PaperProvider, Text } from 'react-native-paper';
import Chat from './components/Chat';
import { TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { rootStackParamList } from '../../../../routes/index';
import {  useEffect, useRef, useState } from 'react';
import { GetAllChat } from '../../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSocket } from '../../../../context/SocketContext';
import SocketEvents from '../../../../util/SocketEvents';



type NavigationProps = NavigationProp<rootStackParamList>;
const Chats = () => {
  
  const {socket}=useSocket()
  const [open, setOpen] = useState(false);
  const [mainUser, setMainUser] = useState()
  const [AvlaibleChats, setAvlaibleChats] = useState()
  const [selectedChat, setSelectedChat] = useState()
  const[isConnected,setIsConnected]=useState(false)
  const currentChat = useRef(null)


  useEffect(() => {
    const fetchChats = async () => {
      const user = await AsyncStorage.getItem("user")
      let UserEmail: string = ""

      if (user) {
        const stringfyUser = JSON.parse(user)
        setMainUser(stringfyUser)
        UserEmail = stringfyUser.email

      }
      const res = await GetAllChat()
      setAvlaibleChats(res.data.data)
    }
    fetchChats()

    return () => {
      setAvlaibleChats("")
    }
  }, [])

  const onConnect=()=>{
    setIsConnected(true)
  }

  const onDisConnect=()=>{
    setIsConnected(false)
  }

  useEffect(()=>{

    if(!socket) return;
    console.log(socket,"this is socket")

    socket.on(SocketEvents.CONNECTED_EVENT,onConnect)
    socket.on(SocketEvents.DISCONNECT_EVENT,onDisConnect)


  },[socket])


  const navigation = useNavigation<NavigationProps>();
  return (

    <PaperProvider>
      <ScrollView className="h-full bg-chat-container">
        {
          AvlaibleChats ? (
            <View>
              {
                AvlaibleChats.map((chats: any) => {
                  return (
                    <View>
                      {chats.participants.map((participant: any) => {
                        return participant.email != mainUser.email ? (
                          <>
                            <TouchableOpacity
                              onPress={
                                async (): void => {
                                    if(currentChat.current){
                                      console.log("having current chat.cuurent")
                                      if(currentChat.current._id && currentChat.current._id==chats._id){
                                        
                                        navigation.navigate("ConnectionChat")
                                        return;
                                      }
                                      else{
                                        await AsyncStorage.setItem("currentChat", JSON.stringify(chats) )
                                        setSelectedChat(chats._id)
                                        currentChat.current = chats
                                        navigation.navigate("ConnectionChat")
                                      }
                                    }
                                    else{
                                      
                                      await AsyncStorage.setItem("currentChat", JSON.stringify(chats) )
                                      setSelectedChat(chats._id)
                                      currentChat.current = chats
                                      navigation.navigate("ConnectionChat")
                                    }
                                }
                              }
                            >
                              <Chat userDetails={participant} />
                            </TouchableOpacity>
                          </>) : (<></>)
                      })}
                    </View>
                  )
                })
              }
            </View>
          ) :
            (<></>)
        }

        <View>
          <Portal>
            <FAB.Group
              open={open}
              visible
              icon={open ? 'android-messages' : 'plus'}
              actions={[
                {
                  icon: 'account-multiple-plus-outline',
                  label: 'Create Group',
                  onPress: () => navigation.navigate('AddContact', { contactType: "group" }),
                },
                {
                  icon: 'account-plus',
                  label: 'Add Person',
                  onPress: () => navigation.navigate('AddContact', { contactType: "single" }),
                },
              ]}
              onStateChange={() => setOpen(!open)}
              onPress={() => {
              
              }}
            />
          </Portal>

        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default Chats;

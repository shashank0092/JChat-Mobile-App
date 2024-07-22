import {StyleSheet, View, ImageBackground, Image} from 'react-native';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import SendMessage from '../components/SendMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { rootStackParamList} from "../../../../../routes/index"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import { useNavigation } from '@react-navigation/native';
import { Avatar, IconButton} from 'react-native-paper';
import { useSocket } from '../../../../../context/SocketContext';
import { GetAllMessages } from '../../../../../api';
import { isArray } from 'lodash';
import { ChatMessageInterface,ChatListInterface } from '../../../../../types/chats';
import SocketEvents from '../../../../../util/SocketEvents';


type ConnectionChat=NativeStackNavigationProp<rootStackParamList,"ConnectionChat">

const ConnectionChat = () => {

  const[userDetails,setUserDetails]=useState()
  const[currentChatDetails,setCurrentChatDetails]=useState<ChatListInterface|null>(null)
  const[mainUserEmail,setMainUserEmail]=useState()
  const[messages,setMessages]=useState<ChatMessageInterface[]>([])
  const navigation=useNavigation<ConnectionChat>()
  const[unreadMessage,setUnreadMessage]=useState<ChatMessageInterface[]>([])
  const {socket}=useSocket()


  const RunningChat=async()=>{
    const AsyncStorageCurrentChat=await AsyncStorage.getItem("currentChat")
    
    
    const ChatUserDetails=JSON.parse(AsyncStorageCurrentChat)
    setCurrentChatDetails(ChatUserDetails)

    const AsyncStorageMainUser=await AsyncStorage.getItem("user")
    const MainUser=await JSON.parse(AsyncStorageMainUser)

    
    const MainUserEmail=await MainUser.email
    const deatils=ChatUserDetails.participants.map((participant)=>{
      if(participant.email!=MainUserEmail){
        return participant
      }
    }).filter(e=>e)
 
    
    setUserDetails(
      ChatUserDetails.participants.map((participant)=>{
      if(participant.email!=MainUserEmail){
        return participant
      }
    }).filter(e=>e)
  
  )
   
    setMainUserEmail(MainUserEmail)

    navigation.setOptions({
      headerTitle: deatils[0].name,
      headerBackVisible: true,
      headerTintColor: 'white',
      headerLeft: () => (
        <Avatar.Image
          source={{
            uri: `https://ik.imagekit.io/shashank007/${deatils[0].imagePath}`,
          }}
          size={40}
          className="mr-5"
        />
      ),
      headerRight: () => (
        <IconButton icon={'dots-vertical'} iconColor="white" />
      ),
      headerStyle: {
        backgroundColor: '#1A212E',
      },
      headerTitleStyle: {
        color: 'white',
      },
    })
  }

  const getMessages=async()=>{
    const AsyncStorageCurrentChat=await AsyncStorage.getItem("currentChat")
    const ChatUserDetails=JSON.parse(AsyncStorageCurrentChat)
    const chatUserId=await JSON.stringify(ChatUserDetails._id).replace(/"/g, '')
    const GET_ALL_MESSAGES=await GetAllMessages(chatUserId)
    socket?.emit(SocketEvents.JOIN_CHAT_EVENT,chatUserId)
    setMessages(GET_ALL_MESSAGES.data.data.data)
  }

 

  useEffect(()=>{
    RunningChat()
    
  },[])

  useEffect(()=>{getMessages()},[])
  useEffect(()=>{},[messages])

  const onMessageRecived=(message:ChatMessageInterface)=>{
    
    if(message.chat!=currentChatDetails?._id){
      setUnreadMessage((prev)=>[message,...prev])
    }
    else{
      setMessages((prev)=>[...prev,message])
    }
  }

  useEffect(()=>{
    socket?.on(SocketEvents.MESSAGE_RECEIVED_EVENT,onMessageRecived)
  },[socket])
  return (
    <>
      <ImageBackground
        source={require('../../../../../assets/chatbg.jpg')}
        style={styles.backgroundImage}
        >
        <ScrollView className="" >
          {
            messages?.map((message)=>{
              return(
                <View className='flex mt-2 ' >
                  {
                    message.sender.email!==mainUserEmail?
                    (
                      <View className='flex  justify-end'>
                        <View className=' bg-yellow-300 self-end mr-3 p-3 rounded-lg '>
                          <Text className='text-white font-bold' >{message.content}</Text>
                        </View>
                      </View>
                    ):(
                      <View>
                        <View className='text-black bg-white self-start ml-3 p-3 rounded-lg' >
                          <Text className='text-black font-bold' >{message.content}</Text>
                        </View>
                      </View>
                    )
                  }
                </View>
              )
            })
          }
        </ScrollView>
        <SendMessage
        socket={socket}
        setMessages={setMessages}
        messages={messages}
        currentChatDetails={currentChatDetails}
        />
      </ImageBackground>
    </>
  );
};
var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
});

export default ConnectionChat;

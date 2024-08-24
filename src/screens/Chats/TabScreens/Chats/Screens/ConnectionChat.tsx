import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import SendMessage from '../components/SendMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { rootStackParamList } from "../../../../../routes/index"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from '@react-navigation/native';
import { Avatar, IconButton } from 'react-native-paper';
import { useSocket } from '../../../../../context/SocketContext';
import { GetAllMessages } from '../../../../../api';
import { ChatMessageInterface, ChatListInterface } from '../../../../../types/chats';
import SocketEvents from '../../../../../util/SocketEvents';
import Typing from '../../../../../component/Typing/Typing';
import { IMAGES_EXTENSTIONS, VIDEOS_EXTENSTION } from '../../../../../util/Mediatypes';
import Video, { VideoRef } from 'react-native-video';




type ConnectionChat = NativeStackNavigationProp<rootStackParamList, "ConnectionChat">

const ConnectionChat = () => {

  const [userDetails, setUserDetails] = useState()
  const [isTyping, setIsTypig] = useState(false)
  const [currentChatDetails, setCurrentChatDetails] = useState<ChatListInterface | null>(null)
  const [mainUserEmail, setMainUserEmail] = useState()
  const [messages, setMessages] = useState<ChatMessageInterface[]>([])
  const navigation = useNavigation<ConnectionChat>()
  const [unreadMessage, setUnreadMessage] = useState<ChatMessageInterface[]>([])
  const [imageLink, setImageLink] = useState("")
  
  const { socket } = useSocket()
  console.log(imageLink,"this is ir")

  const RunningChat = async () => {
    const AsyncStorageCurrentChat = await AsyncStorage.getItem("currentChat")


    const ChatUserDetails = JSON.parse(AsyncStorageCurrentChat)
    setCurrentChatDetails(ChatUserDetails)

    const AsyncStorageMainUser = await AsyncStorage.getItem("user")
    const MainUser = await JSON.parse(AsyncStorageMainUser)


    const MainUserEmail = await MainUser.email
    const deatils = ChatUserDetails.participants.map((participant) => {
      if (participant.email != MainUserEmail) {
        return participant
      }
    }).filter(e => e)


    setUserDetails(
      ChatUserDetails.participants.map((participant) => {
        if (participant.email != MainUserEmail) {
          return participant
        }
      }).filter(e => e)

    )

    setMainUserEmail(MainUserEmail)
    let imageUrl = deatils[0].mediaLink[0].url
    navigation.setOptions({
      headerTitle: deatils[0].name,
      headerBackVisible: true,
      headerTintColor: 'white',
      headerLeft: () => (
        <Avatar.Image
          source={{
            uri: `${imageUrl}`,
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

  const getMessages = async () => {
    const AsyncStorageCurrentChat = await AsyncStorage.getItem("currentChat")
    const ChatUserDetails = JSON.parse(AsyncStorageCurrentChat)
    const chatUserId = await JSON.stringify(ChatUserDetails._id).replace(/"/g, '')
    const GET_ALL_MESSAGES = await GetAllMessages(chatUserId)
    socket?.emit(SocketEvents.JOIN_CHAT_EVENT, chatUserId)
    console.log(GET_ALL_MESSAGES.data.data.data,"this is messages")
    setMessages(GET_ALL_MESSAGES.data.data.data)
   
  }

  useEffect(() => {
    RunningChat()
  }, [])

  useEffect(() => { getMessages() }, [])
  useEffect(() => { }, [messages])

  const onMessageRecived = (message: ChatMessageInterface) => {

    if (message.chat != currentChatDetails?._id) {
      setUnreadMessage((prev) => [message, ...prev])
    }
    else {
      setMessages((prev) => [...prev, message])
    }
  }

  const SenderStartTyping = (chatId: String) => {
    if (chatId !== currentChatDetails?._id) return;
    setIsTypig(true)
  }

  const SenderStopTyping = (chatId: string) => {
    if (chatId !== currentChatDetails?._id) return
    setIsTypig(false)
  }

  useEffect(() => {
    socket?.on(SocketEvents.MESSAGE_RECEIVED_EVENT, onMessageRecived)
    socket?.on(SocketEvents.TYPING_EVENT, SenderStartTyping)
    socket?.on(SocketEvents.STOP_TYPING_EVENT, SenderStopTyping)
  }, [socket])
  // console.log(imageLink,"this is")
  return (
    <>
      <ImageBackground
        source={require('../../../../../assets/chatbg.jpg')}
        style={styles.backgroundImage}
      >
        <ScrollView className="" >
          {
            messages?.map((message) => {

              return (
                <View className='flex mt-2 ' >
                  {
                    message?.sender?.email !== mainUserEmail ?
                      (

                        <View className='flex  justify-end'>
                          {
                            message?.mediaLink?.length > 0 ? (

                              <View className=' bg-yellow-300 self-end mr-3 p-3 rounded-lg ' >
                                <Image
                                  source={{ uri: message.mediaLink[0].url || ''}}
                                  height={200}
                                  width={200}
                                />
                              </View>
                            ) : (
                              <>
                                <View className=' bg-yellow-300 self-end mr-3 p-3 rounded-lg '>
                                  <Text className='text-white font-bold' >{message.content}</Text>
                                </View>
                              </>
                            )
                          }
                        </View>
                      ) : (
                        <View>
                          <View className='text-black bg-white self-start ml-3 p-3 rounded-lg' >
                            {
                              message.attachments?.length > 0 ? (

                                <View>
                                  {
                                    IMAGES_EXTENSTIONS.includes(message.mediaLink[0].type) ?
                                      (<>
                                        <Image
                                          source={{ uri: message.mediaLink[0].url || '' }}
                                          height={200}
                                          width={200}
                                        />
                                      </>) :
                                      (<></>)
                                  }
                                  {
                                    VIDEOS_EXTENSTION.includes(message.mediaLink[0].type) ?
                                      (<>
                                        <Video
                                          source={{ uri:message.mediaLink[0].url || '' }}
                                          style={{ height: 200, width: 200 }}
                                          controls={true}
                                        />
                                      </>) :
                                      (<></>)
                                  }
                                  {
                                    !IMAGES_EXTENSTIONS.includes(message.mediaLink[0].type) &&
                                      !VIDEOS_EXTENSTION.includes(message.mediaLink[0].type)
                                      ?
                                      (<>
                                        <View >
                                          <View className="" >
                                            <Text className='text-black' >{message.mediaLink[0].name}</Text>
                                          </View>
                                        </View>
                                      </>) : (<></>)
                                  }


                                </View>
                              ) :
                                (
                                  <Text className='text-black font-bold' >{message.content}</Text>
                                )

                            }
                          </View>
                        </View>
                      )
                  }
                </View>
              )
            })
          }
          <View className='p-3' >
            {
              isTyping ? (
                <Typing />
              ) :
                (
                  <></>
                )
            }
          </View>
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

import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, IconButton, Text, TextInput } from 'react-native-paper';
import { Socket } from 'socket.io-client';
import { ChatMessageInterface, ChatListInterface } from '../../../../../types/chats';
import SocketEvents from '../../../../../util/SocketEvents';
import { SendChat } from "../../../../../api/index"
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Video, { VideoRef } from 'react-native-video';
import SpeechToText from './SpeechToText';
import CameraMedia from './CameraMedia';


const SendMessage = ({
  socket,
  setMessages,
  messages,
  currentChatDetails
}: {
  socket: Socket | null
  setMessages: Dispatch<SetStateAction<ChatMessageInterface[]>>
  messages: ChatMessageInterface[],
  currentChatDetails: ChatListInterface | null
}

) => {

  const [isTyping, setIsTyping] = useState(false);
  const [selfTyping, setSelfTyping] = useState(false);
  const [message, setMessage] = useState<string>("")
  const [imageUri, setImageUri] = useState("")
  const [selectedFiles, setSelectedFiles] = useState({ type: '', uri: "", name: "" })
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  


  useEffect(() => {
    if (socket) {
      socket.on(SocketEvents.TYPING_EVENT, handleOnSocketStopTyping)
      socket.on(SocketEvents.STOP_TYPING_EVENT, handleOnSocketStopTyping)
    }
    else {
      console.log("not getting socket")
    }

    if (socket) {
      return () => {
        socket.off(SocketEvents.TYPING_EVENT, handleOnSocketTyping)
        socket.off(SocketEvents.STOP_TYPING_EVENT, handleOnSocketStopTyping)
      }
    }
  }, [socket])

  const handleOnSocketTyping = () => {
    setIsTyping(true)
  }
  const handleOnSocketStopTyping = () => {
    setIsTyping(false)
  }

  const handleMessageChange = (text: string) => {
    setMessage(text)
    console.log("handling messgae", message)
    if (!socket) return

    if (!selfTyping) {
      setSelfTyping(true)
      socket.emit(SocketEvents.TYPING_EVENT, currentChatDetails._id)
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    const timerlength = 3000
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit(SocketEvents.STOP_TYPING_EVENT, currentChatDetails._id)
    }, timerlength)
  }

console.log(message,"this is changing is message")
  async function openFileSelector() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setImageUri(res[0].uri)
      console.log(res, "this is res")
      setSelectedFiles(
        {
          uri: res[0].uri,
          type: res[0].type,
          name: res[0].name

        }
      )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  }
  const MessageSend = async () => {
    setImageUri("")
    setSelectedFiles("")
    setMessage("")
    if (!currentChatDetails?._id || !socket) {
      return
    }
    console.log(message, "this is sending message")
    try {

      const SEND_CHAT_API_CALL = await SendChat({ chatId: currentChatDetails._id, content: message, attachments: selectedFiles })
      const SEND_CHAT_RESPONSE = await SEND_CHAT_API_CALL?.data
      console.log(SEND_CHAT_API_CALL?.data.data)
      setMessages((prev) => [...prev, SEND_CHAT_API_CALL?.data.data.data])
    }
    catch (err) {
      console.log(err, "this is error")
      if (axios.isAxiosError(err)) {
        console.log(err.toJSON())
      }
    }

    socket.emit(SocketEvents.STOP_TYPING_EVENT, currentChatDetails._id)

  }
  return (
    <>

      {
        imageUri == "" ? (<></>) : (
          <TouchableOpacity
            onLongPress={() => setImageUri("")}
            className='absolute bg-slate-600 self-start p-5  rounded-lg bottom-16 left-10'
          >
            {
              imageUri && selectedFiles?.type?.includes("image") ? (
                <>
                  <Image
                    source={{ uri: imageUri }}
                    width={70}
                    height={70}
                    className=''
                  />
                </>) : (
                <></>
              )
            }
            {
              imageUri && selectedFiles?.type?.includes("video") ? (
                <>
                  <Video
                    source={{ uri: selectedFiles.uri }}
                    style={{ height: 170, width: 170 }}
                    controls={true}
                  />
                </>
              ) :
                (<></>)
            }
            {
              imageUri && !(selectedFiles?.type?.includes("image")) && !(selectedFiles?.type?.includes("video")) ?
                (<View className='flex flex-row justify-center items-center gap-2' >
                  <View>
                    <Icon
                      source={"file-document-outline"}
                      size={20}
                    />
                  </View>
                  <View>
                    <Text>{selectedFiles.name}</Text>
                  </View>
                </View>) :
                (<></>)
            }
          </TouchableOpacity>
        )
      }
      <View className='flex flex-row ml-2 mr-2 mb-5 gap-2' >

        <View className="flex flex-row bg-chat-child-container flex-1 rounded-full ">
        
           <View>
           <SpeechToText
              setMessage={setMessage}
            />
           </View>

          <TouchableOpacity>
            <IconButton
              icon={'attachment'}
              onPress={() => openFileSelector()}
            />
          </TouchableOpacity>
          <View className='flex-1' >
            <TextInput
              className='bg-chat-child-container bg-transparent'
              onChangeText={text => handleMessageChange(text)}
              placeholder='Write message'
              underlineColor='transparent'
              activeUnderlineColor='transparent'
              value={message}
            />
          </View>
          <TouchableOpacity>
            <IconButton icon={'camera'} onPress={()=>console.log("shukla boi")} />
            </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity className='bg-green-600 rounded-full' onPress={() => MessageSend()} >
            <IconButton icon={"send"} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SendMessage;

import { Dispatch, SetStateAction,useState,useRef, useEffect } from 'react';
import {View,TouchableOpacity} from 'react-native';
import {IconButton, Text, TextInput} from 'react-native-paper';
import { Socket } from 'socket.io-client';
import { ChatMessageInterface,ChatListInterface } from '../../../../../types/chats';
import SocketEvents from '../../../../../util/SocketEvents';
import {SendChat} from "../../../../../api/index"
import axios from 'axios';


const SendMessage = ({
  socket,
  setMessages,
  messages,
  currentChatDetails
}:{
  socket:Socket|null
  setMessages:Dispatch<SetStateAction<ChatMessageInterface[]>>
  messages:ChatMessageInterface[],
  currentChatDetails:ChatListInterface|null
}

) => {

  const [isTyping, setIsTyping] = useState(false);
  const [selfTyping, setSelfTyping] = useState(false);
  const [message,setMessage]=useState<string>("")
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(()=>{
    if(socket){
      socket.on(SocketEvents.TYPING_EVENT,handleOnSocketStopTyping)
      socket.on(SocketEvents.STOP_TYPING_EVENT,handleOnSocketStopTyping)
    }
    else{
      console.log("not getting socket")
    }

    if(socket){
      return()=>{
        socket.off(SocketEvents.TYPING_EVENT,handleOnSocketTyping)
        socket.off(SocketEvents.STOP_TYPING_EVENT,handleOnSocketStopTyping)
      }
    }
  },[socket])

 

  const handleOnSocketTyping=()=>{
    setIsTyping(true)
  }
  const handleOnSocketStopTyping=()=>{
    setIsTyping(false)
  }

  const handleMessageChange=(text:string)=>{
    setMessage(text)
    if(!socket) return

    if(!selfTyping){
      setSelfTyping(true)
      socket.emit(SocketEvents.TYPING_EVENT,currentChatDetails._id)
    }

    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current)
    }
    const timerlength=30000
    typingTimeoutRef.current=setTimeout(()=>{
      socket.emit(SocketEvents.STOP_TYPING_EVENT,currentChatDetails._id)
    },timerlength)
  }

  const MessageSend=async()=>{
    if(!currentChatDetails?._id||!socket){
      return
    }
    
    try{
      const SEND_CHAT_API_CALL=await SendChat({chatId:currentChatDetails._id,content:message})
      // console.log(SEND_CHAT_API_CALL)
      const SEND_CHAT_RESPONSE=await SEND_CHAT_API_CALL?.data
      console.log(SEND_CHAT_API_CALL?.data.data)
      setMessages((prev)=>[...prev,SEND_CHAT_API_CALL?.data.data.data])
      // console.log(SEND_CHAT_RESPONSE,"THIS IS RESPONSE")

   
    }
    catch(err){
      console.log(err,"this is error")
      if(axios.isAxiosError(err)){
        console.log(err.response)
    }
    }

    socket.emit(SocketEvents.STOP_TYPING_EVENT,currentChatDetails._id)

  }
  return (
    <>
      <View className='flex flex-row ml-2 mr-2 mb-1 gap-2' >
        <View className="flex flex-row bg-chat-child-container flex-1 rounded-full ">
          <TouchableOpacity>
            <IconButton icon={'emoticon'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconButton icon={'attachment'} />
          </TouchableOpacity>
          <View className='flex-1' >
            <TextInput 
            className='bg-chat-child-container bg-transparent'
            onChangeText={text=>handleMessageChange(text)}
            placeholder='Write message'
            underlineColor='transparent'
            activeUnderlineColor='transparent'
            />
          </View>
          <TouchableOpacity>
            <IconButton icon={'camera'} />
          </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity className='bg-green-600 rounded-full' onPress={()=>MessageSend()} >
                <IconButton icon={"send"} />
            </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SendMessage;

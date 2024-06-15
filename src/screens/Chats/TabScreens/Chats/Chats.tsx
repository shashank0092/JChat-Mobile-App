import {ScrollView, View} from 'react-native';
import { Portal, FAB, PaperProvider, Text} from 'react-native-paper';
import Chat from './components/Chat';
import {TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {rootStackParamList} from '../../../../routes/index';
import {JSX, useEffect, useRef, useState} from 'react';
import { GetAllChat } from '../../../../api';
import { UserInterface } from '../../../../types/user';
import { useAuth } from '../../../../context/AuthContext';
import { isArray } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';



type NavigationProps = NavigationProp<rootStackParamList>;
const Chats = () => {
  const ContactArray = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 1450,
  ];
  const [open, setOpen] = useState(false);
  const[mainUser,setMainUser]=useState()
  const[AvlaibleChats,setAvlaibleChats]=useState()
  const[selectedChat,setSelectedChat]=useState()
  const currentChat=useRef(null)
  

  useEffect(()=>{
    const fetchChats=async()=>{
      const user=await AsyncStorage.getItem("user")
      let UserEmail:string=""
      
      if(user){
        const stringfyUser=JSON.parse(user)
        setMainUser(stringfyUser)
        UserEmail=stringfyUser.email

      }
      const res=await GetAllChat()
      setAvlaibleChats(res.data.data)
    }
    fetchChats()

    return()=>{
      setAvlaibleChats("")
    }
  },[])

  console.log(AvlaibleChats,"these is our updated avlaible chat")

  const navigation = useNavigation<NavigationProps>();
  return (
    
    <PaperProvider>
      <ScrollView  className="h-full bg-chat-container">
        {
          AvlaibleChats?(
            <View>
                {
                  AvlaibleChats.map((chats:any)=>{
                    return(
                      <View>
                        {chats.participants.map((participant:any)=>{
                          return participant.email!=mainUser.email?(
                          <>
                            <TouchableOpacity 
                            onPress={
                              async():void=>{
                                if(
                                  currentChat.current._id &&
                                  currentChat.current._id==chats._id
                                )
                                return;
                                await AsyncStorage.setItem("currentChat",chats)
                                setSelectedChat(chats._id)
                                currentChat.current=chats
                              }
                            }
                            >
                            <Chat userDetails={participant} />
                            </TouchableOpacity>
                          </>):(<></>)
                        })}
                      </View>
                    )
                  })
                }
            </View>
          ):
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
                    onPress: () => navigation.navigate('AddContact',{contactType:"group"}),
                  },
                  {
                    icon: 'account-plus',
                    label: 'Add Person',
                    onPress: () => navigation.navigate('AddContact',{contactType:"single"}),
                  },
                ]}
                onStateChange={() => setOpen(!open)}
                onPress={() => {
                  console.log('this is running');
                }}
              />
            </Portal>
          
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default Chats;

import {View,TouchableOpacity} from 'react-native';
import {IconButton, Text, TextInput} from 'react-native-paper';

const SendMessage = () => {
  return (
    <>
      <View className='flex flex-row ml-2 mr-2 mb-1 gap-2' >
        <View className="flex flex-row bg-chat-child-container flex-1 rounded-full ">
          <View>
            <IconButton icon={'emoticon'} />
          </View>
          <View>
            <IconButton icon={'attachment'} />
          </View>
          <View className='flex-1' >
            <TextInput 
            className='bg-chat-child-container bg-transparent'
            placeholder='Write message'
            underlineColor='transparent'
            activeUnderlineColor='transparent'
            
            
            />
          </View>
          <View>
            <IconButton icon={'camera'} />
          </View>
        </View>
        <View>
            <TouchableOpacity className='bg-green-600 rounded-full' onPress={()=>console.log("working")} >
                <IconButton icon={"send"} />
            </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SendMessage;

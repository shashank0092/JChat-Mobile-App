import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native"
import { IconButton } from "react-native-paper"
import Voice from '@react-native-voice/voice';

const SpeechToText=({setMessage}:{setMessage:Dispatch<SetStateAction<string>>})=>{
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e:any) => {
    setStarted('started');
  };

  const onSpeechRecognized = (e:any) => {
    setRecognized('recognized');
  };
  const onSpeechResults = (e:any) => {
    console.log('onSpeechResults: ', e);
    setMessage(e.value[e.value.length-1])
    setResults(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setRecognized('');
      setStarted('');
      setResults([]);

    } catch (e) {
      console.error(e);
    }
  };

  

  
    return(
        <>
            <View>
               <TouchableOpacity onLongPress={()=>startRecognizing()}  >
                    <IconButton icon={"microphone"} />
               </TouchableOpacity>
            </View>
        </>
    )
}

export default SpeechToText
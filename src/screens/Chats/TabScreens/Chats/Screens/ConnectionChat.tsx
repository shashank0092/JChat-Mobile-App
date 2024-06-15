import {StyleSheet, View, ImageBackground, Image} from 'react-native';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import SendMessage from '../components/SendMessage';


const ConnectionChat = () => {
  return (
    <>
      <ImageBackground
        source={require('../../../../../assets/chatbg.jpg')}
        style={styles.backgroundImage}>
        <ScrollView>
            
        </ScrollView>
        <SendMessage/>
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

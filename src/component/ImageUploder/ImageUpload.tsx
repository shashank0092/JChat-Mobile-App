// @ts-nocheck
import {Avatar, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {Image, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ImageAuthenticator} from '../../util/ImageAuthenticator';
import {imagekit} from '../../util/Imagekit';
import {DocumentPickerResponse} from 'react-native-document-picker';

const ImageUpload = ({setAttachments}) => {
  const [uploadFileURI, setUploadFileURL] = useState<undefined | string>(
    undefined
  );

  

  async function openFileSelector() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      
      setAttachments(
        {
          uri:res[0].uri,
          type:res[0].type,
          name:res[0].name

        }
      )
      
      setUploadFileURL(res[0].uri)
      
      
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  }
  
  return (  
    <>
      <View className="flex flex-row items-center justify-between">
        <Button 
        mode="elevated" 
        buttonColor='white'
        textColor='black'
        onPress={() => openFileSelector()}>
          Upload Image
        </Button>
        <View>
          <Avatar.Image
            size={100}
            source={{
              uri: uploadFileURI
                ? uploadFileURI
                : 'https://ik.imagekit.io/shashank007/user.jpg?updatedAt=1717232443506',
            }}
          />
        </View>
      </View>
    </>
  );
};

export default ImageUpload;

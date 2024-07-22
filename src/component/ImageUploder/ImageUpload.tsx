// @ts-nocheck
import {Avatar, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {Image, View} from 'react-native';
import {useEffect, useState} from 'react';
import {ImageAuthenticator} from '../../util/ImageAuthenticator';
import {imagekit} from '../../util/Imagekit';
import {DocumentPickerResponse} from 'react-native-document-picker';

const ImageUpload = ({setImagePath}) => {
  const [uploadFileURI, setUploadFileURL] = useState<undefined | string>(
    undefined,
  );

  const uploadFile=async(file)=> {
    const res = await ImageAuthenticator();
    const uploadImage = await imagekit.upload({
      file,
      fileName: file.name,
      ...res,
    });
  
    setUploadFileURL(uploadImage.url)
    setImagePath(uploadImage.filePath)
  }
  async function uploadFileToImagekit(fileData) {
    try {
      const uploadedFile = await uploadFile(fileData[0]);
    } catch (err) {}
  }

  async function openFileSelector() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      uploadFileToImagekit(res);
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

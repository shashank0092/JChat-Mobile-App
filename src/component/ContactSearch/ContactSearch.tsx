import {Formik} from 'formik';
import {View, TouchableOpacity} from 'react-native';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import ImageUpload from '../ImageUploder/ImageUpload';
import {debounce, isArray} from 'lodash';
import {useCallback, useState} from 'react';
import {CreateAndGetOneOnOneChat, SearchUser} from '../../api';
import axios, {AxiosError} from 'axios';
import {SearchUserResponse} from '../../types/searchuserresponse';
import {ALERT_TYPE,Toast,AlertNotificationRoot} from "react-native-alert-notification"
import {useNavigation,NavigationProp} from "@react-navigation/native"
import {rootStackParamList} from "../../routes/index"

type NavigationProps=NavigationProp<rootStackParamList>
const ContactSearch = ({searchType}: {searchType: string}) => {
  
  const navigation=useNavigation<NavigationProps>()
  const [imagePath, setImagePath] = useState<string>('');
  const [groupMembers, setGroupMebersName] = useState<Array<string> | null>(
    null,
  );
  const [singleContact, setSingleContact] = useState<
    Array<SearchUserResponse> | null | SearchUserResponse
  >(null);

  const SearchEmailUser = async (email: string) => {
    try {
      const user = await SearchUser({email});
      const userDetails = await user.data?.data?.data;
      setSingleContact(userDetails);
    } catch (err) {
      console.log(err, 'this is an error boi');
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 401) {
          console.log(err.response.data);
        }
      }
    }
  };

  const AddOneOnOneChat=async()=>{
   if(singleContact){
    if(!isArray(singleContact)){
      const res=await CreateAndGetOneOnOneChat({email:singleContact.email})
      setSingleContact(null)
      Toast.show(
        {
            type:ALERT_TYPE.SUCCESS,
            title:'Add Succesfully',
            textBody:`${res.data.message}`,
            onHide() {
                navigation.navigate("Chat")
            },
        }
    )
    }
   }
  }

  const debounceSearchUser = useCallback(debounce(SearchEmailUser, 500), []);


  return (
    <>
      <View className="ml-3 mr-3">
        {searchType == 'group' ? (
          <View>
            <View>
              <Formik
                initialValues={{searchEmail: '', groupName: ''}}
                onSubmit={value => {
                  const searchemail = value.searchEmail;
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  values,
                  touched,
                }) => (
                  <View className="flex gap-5">
                    <View>
                      <ImageUpload setImagePath={setImagePath} />
                    </View>
                    <View>
                      <TextInput
                        onChangeText={handleChange('groupName')}
                        onBlur={handleBlur('groupName')}
                        value={values.groupName}
                        placeholder="Enter Group Name"
                        className="bg-white rounded-full"
                        placeholderTextColor="black"
                      />
                    </View>
                    <View>
                      <TextInput
                        onChangeText={handleChange('searchEmail')}
                        onBlur={handleBlur('searchEmail')}
                        value={values.searchEmail}
                        placeholder="Enter Email"
                        className="bg-white rounded-full"
                        placeholderTextColor="black"
                      />
                    </View>
                    {groupMembers ? (
                      <View>
                        <View>
                          <Text className="text-white"> Group Member's </Text>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}
                    <View>
                      <Button
                        mode="contained"
                        buttonColor="green"
                        textColor="white"
                        icon="account-multiple-plus"
                        contentStyle={{flexDirection: 'row-reverse'}}>
                        {' '}
                        Create Group{' '}
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        ) : (
          <View>
            <Formik
              initialValues={{searchEmail: ''}}
              onSubmit={value => {
                const searchemail = value.searchEmail;
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                values,
                touched,
              }) => (
                <View className="flex gap-5">
                  <View>
                    <TextInput
                      onChangeText={text => {
                        handleChange('searchEmail')(text);
                        debounceSearchUser(text);
                      }}
                      onBlur={handleBlur('searchEmail')}
                      value={values.searchEmail}
                      placeholder="Enter Email"
                      className="bg-white rounded-full text-black"
                      placeholderTextColor="black"
                      label="Email"
                      textColor="black"
                    />
                    {singleContact ? (
                      isArray(singleContact) ? (
                        <View>
                          {singleContact.map((contact: SearchUserResponse) => {
                            return (
                              <View
                                key={contact._id}
                                className="py-5 ml-5 mr-5">
                                {
                                  <TouchableOpacity
                                    className="flex flex-row gap-3 bg-white rounded-full  items-center "
                                    onPress={() => setSingleContact(contact)}>
                                    <View>
                                      <View className="m-1">
                                        <Avatar.Image
                                          source={{
                                            uri: `https://ik.imagekit.io/shashank007/${contact.imagePath}`,
                                          }}
                                          size={50}
                                        />
                                      </View>
                                    </View>
                                    <View>
                                      <View>
                                        <Text className="text-black">
                                          {contact.name}
                                        </Text>
                                      </View>
                                      <View>
                                        <Text className="text-black">
                                          {contact.email}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                }
                              </View>
                            );
                          })}
                        </View>
                      ) : (
                        <View className='mt-3' >
                          <View>
                            <Text variant='labelSmall' > Seleted Member: </Text>
                          </View>
                          <View
                            className="flex flex-row gap-2   items-center "
                            >
                            <View>
                              <View className="m-1">
                                <Avatar.Image
                                  source={{
                                    uri: `https://ik.imagekit.io/shashank007/${singleContact.imagePath}`,
                                  }}
                                  size={40}
                                />
                              </View>
                            </View>
                            <View>
                              <View>
                                <Text className="">
                                  {singleContact.name}
                                </Text>
                              </View>
                              <View>
                                <Text className="">
                                  {singleContact.email}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      )
                    ) : (
                      <></>
                    )}
                  </View>
                  <View>
                    <Button
                      mode="contained"
                      buttonColor="green"
                      textColor="white"
                      icon="account-multiple-plus"
                      onPress={AddOneOnOneChat}
                      contentStyle={{flexDirection: 'row-reverse'}}>
                      Add Contact
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        )}
      </View>
    </>
  );
};

export default ContactSearch;

import {View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {rootStackParamList} from '../../../../../routes/index';
import React from 'react';
import ContactSearch from '../../../../../component/ContactSearch/ContactSearch';

type AddContactRoutProp = RouteProp<rootStackParamList, 'AddContact'>;

type Props = {
  route: AddContactRoutProp;
};

const AddContact: React.FC<Props> = ({route}) => {
  const {contactType} = route.params;
  return (
    <>
      <View className="h-[100vh] bg-chat-container ">
        <View className="ml-3 mt-3 ">
          <View>
            {contactType == 'group' ? (
              <View className="flex flex-col">
                <View className='flex flex-row' >
                  <Text variant="headlineMedium" className='text-white' > Create Group </Text>
                  <Icon
                    source="account-multiple-plus"
                    size={35}
                    color="white"
                  />
                </View>
                <View>
                  <ContactSearch searchType={contactType} />
                </View>
              </View>
            ) : (
              <View className="flex flex-col">
                <View className="flex flex-row">
                  <Text variant="headlineMedium" className="mr-3 text-white">
                    Add Chat
                  </Text>
                  <Icon source="account-plus" size={35} color="white" />
                </View>
                <View className='mt-3' >
                  <ContactSearch searchType={contactType} />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default AddContact;

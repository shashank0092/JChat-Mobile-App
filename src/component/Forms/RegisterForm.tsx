import {Formik} from 'formik';
import { useState } from 'react';
import {ScrollView, View} from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import ImageUpload from "../ImageUploder/ImageUpload"
import { useAuth } from '../../context/AuthContext';


const RegisterForm = () => {

  const{register,loading}=useAuth()
  const[showPassword,setShowPassword]=useState(false)
  const[imagePath,setImagePath]=useState<string>("") 
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
          about: '',
          password: '',

        }}
        onSubmit={values => {
          const name=values.name
          const about=values.about
          const email=values.email
          const password=values.password
          const phoneNumber=values.phoneNumber
          register({name,about,email,password,phoneNumber,imagePath})
        }}
        validationSchema={null}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView className='flex gap-5'  >
          
            <View>
              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Enter Name"
                label="Name"
                className="bg-white rounded-full"
                placeholderTextColor="black"
                textColor="black"
              />
            </View>
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter Email"
                label="Email"
                className="bg-white rounded-full"
                placeholderTextColor="black"
                textColor="black"
              />
            </View>
            <View>
            <TextInput
                onChangeText={handleChange('password')}
                secureTextEntry={showPassword?false:true}
                value={values.password}
                placeholder="Enter Password"
                className="bg-white rounded-full"
                right={<TextInput.Icon icon={showPassword?("eye-off"):("eye")} color="black" onPress={()=>setShowPassword((prev)=>!prev)}  />}
                label="Password"
                placeholderTextColor="black"
                textColor="black"
              />
            </View>
            <View>
            <TextInput
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    placeholder="Enter Phone Number"
                    label="Phone Number"
                    className="bg-white rounded-full"
                    placeholderTextColor="black"
                    textColor="black"

                />
            </View>
            <View>
                <TextInput
                    onChangeText={handleChange('about')}
                    onBlur={handleBlur('about')}
                    value={values.about}
                    placeholder="Enter About Your self"
                    label="About"
                    className="bg-white rounded-full"
                    placeholderTextColor="black"
                    textColor="black"

                />
            </View>
            <View>
              <ImageUpload setImagePath={setImagePath } />
            </View>
            <View>
              <Button 
                onPress={()=>handleSubmit()} 
                mode='contained'
                buttonColor='green'
                textColor='white'
                icon="check-circle"
                contentStyle={{flexDirection: 'row-reverse'}}
                loading={loading}
                >
                Create Account
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;

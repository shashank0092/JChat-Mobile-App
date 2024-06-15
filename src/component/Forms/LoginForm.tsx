import {Formik} from 'formik';
import { useState } from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required(),
  password: Yup.string().min(5, 'Too Short').max(10, 'Too Long!').required(),
});


const LoginForm = ({screenName}:{screenName:string}) => {

 
  const[showPassword,setShowPassword]=useState(false)
  const {login,loading}=useAuth()
  
  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values =>{ 
          const email=values.email
          const password=values.password
          login({email,password})
          
         }}
        validationSchema={LoginSchema}
        >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="flex gap-5">
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter Email"
                className="bg-white rounded-full"
                label="Email"
                placeholderTextColor="black"
                textColor="black"
              />
              <View>
                {errors.email && touched.email ? (
                  <Text variant="labelSmall" className="text-red-500">
                    {errors.email}
                  </Text>
                ) : null}
              </View>
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
               <View>
                {errors.password && touched.password ? (
                  <Text variant="labelSmall" className="text-red-500">
                    {errors.password}
                  </Text>
                ) : null}
              </View>
            </View>
            <View>
              <Button
                contentStyle={{flexDirection: 'row-reverse'}}
                icon="arrow-right"
                mode="contained"
                onPress={() => handleSubmit()}
                buttonColor="green"
                textColor="white"
                loading={loading}
                >
                Log In
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;

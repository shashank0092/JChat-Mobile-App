import {Formik} from 'formik';
import {View} from 'react-native';
import {TextInput,Button} from 'react-native-paper';

const LoginForm = () => {
  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => console.log('this is value', values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View className='flex gap-5' >
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder='Enter Email'
                className='bg-white rounded-full'
                label="Email"
                placeholderTextColor="black"
                textColor='black'
              />
            </View>

            <View  >
                <TextInput
                onChangeText={handleChange('password')}
                secureTextEntry={true}
                value={values.password}
                placeholder='Enter Password'
                className='bg-white rounded-full'
                right={<TextInput.Icon icon="eye" color="black" />}
                label="Password"
                placeholderTextColor="black"
                textColor='black'
                />
            </View>
            <View>
                <Button contentStyle={{flexDirection:"row-reverse"}} icon="arrow-right" mode='contained' onPress={()=>handleSubmit()} buttonColor='green' textColor='white'  >
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

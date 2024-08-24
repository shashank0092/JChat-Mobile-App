import { createContext, useContext, useState } from "react";
import { loginUser,registerUser } from "../api";
import axios, { AxiosError, AxiosResponse } from "axios";
import {UserInterface} from "../types/user"
import {ALERT_TYPE,Toast,AlertNotificationRoot} from "react-native-alert-notification"
import {useNavigation,NavigationProp} from "@react-navigation/native"
import {rootStackParamList} from "../routes/index"
import AsyncStorage from "@react-native-async-storage/async-storage";


type NavigationProps=NavigationProp<rootStackParamList>

const AuthContext=createContext<{
    login:(data:{email:string,password:string})=>Promise<void>,
    loading:boolean,
    error:boolean|null,
    sucess:boolean|null,
    user:UserInterface|null,
    register:(data:{name:string,email:string,password:string,phoneNumber:string,about:string,attachments:{uri:"",type:"",name:""}})=>Promise<void>
    
}>({
    login:async()=>{},
    loading:false,
    error:null,
    sucess:null,
    user:null,
    register:async()=>{}
})

const useAuth=()=>useContext(AuthContext)

const AuthProvider:React.FC<{children:React.ReactNode}> =({children})=>{

    const[loading,setLoading]=useState(false)
    const[error,setError]=useState<null|boolean>(null)
    const[sucess,setSucess]=useState<null|boolean>(null)
    const[user,setUser]=useState<UserInterface|null>(null)
    
    const navigation=useNavigation<NavigationProps>()

   const login=async(data:{email:string,password:string})=>{
        setLoading(true)
        
        try{
            
            
            const loginDetails:AxiosResponse=await loginUser(data)
            setUser(loginDetails.data.data.user)
            await AsyncStorage.setItem("isFirstLaunch","loggedIn")
            await AsyncStorage.setItem("acessToken",loginDetails.data.data.accessToken)
            await AsyncStorage.setItem("user",JSON.stringify(loginDetails.data.data.user))
            
            Toast.show(
                {
                    type:ALERT_TYPE.SUCCESS,
                    title:'Login Succesfully',
                    textBody:`Welcome ${loginDetails.data.data.user?.name}`,
                    onHide() {
                        navigation.navigate("Chat")
                    },
                }
            )
          

        }
        catch(err){

            console.log(err,"this is an error")
            if(axios.isAxiosError(err)){
                console.log(err.response)
                if(err.response?.status==401){
                    Toast.show(
                        {
                            type:ALERT_TYPE.DANGER,
                            title:"Invalid Details",
                            textBody:"Invalid Credaintials",
                        }
                    )
                }
                if(err.response?.status==404){
                    Toast.show(
                        {
                            type:ALERT_TYPE.INFO,
                            title:'User does not Exist',
                            textBody:`User With this email dosen't exist`,
                            
                        }
                    )
                }
            }
        }
        finally{
            setLoading(false)
        }
   }

   const register=async(data:{name:string,email:string,password:string,phoneNumber:string,about:string,attachments:{uri:"",type:"",name:""}})=>{
    setLoading(true)
    try{
        const RegisterUser:AxiosResponse=await registerUser(data)
        // console.log(RegisterUser,"this is register user")
        Toast.show(
            {
                type:ALERT_TYPE.SUCCESS,
                title:'Create New Account',
                textBody:'Cheack your email',
                onHide() {
                    navigation.navigate('Login')
                },
            }
        )


    }
    catch(err){

        if(axios.isAxiosError(err)){
            if(err.response?.status==409){
                Toast.show({
                    type:ALERT_TYPE.WARNING,
                    title:"Account Already Created",
                    textBody:"Email is already in use"
                })
            }

            if(err.response?.status==500){
                Toast.show({
                    type:ALERT_TYPE.DANGER,
                    title:"Something went wrong",
                    textBody:"Please try again later"
                })
            }
        }
        console.log(err,"Error while registering user")
    }
    finally{
        setLoading(false)
    }
   }
    return(
        <AuthContext.Provider value={{login,loading,error,sucess,user,register}} >
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext,AuthProvider,useAuth}
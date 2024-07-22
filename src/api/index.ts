import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient=axios.create({
    baseURL:"http://192.168.112.156:8000/api/v1/",
    withCredentials:true,
    timeout:120000,
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    // }
})

apiClient.interceptors.request.use(
    async function(config){
        const token=await AsyncStorage.getItem("acessToken")
        config.headers.Authorization=`Bearer ${token}`
        return config
    },

    function(err){
        console.log(err,"while calling api")
        return Promise.reject(err)
    }
)


const loginUser=(data:{email:string,password:string})=>{
    console.log(data.email,data.password)
    return apiClient.post("/user/login",data)
}

const uploadImage=()=>{
    return apiClient.get("user/imageauth")
}

const registerUser=(data:{name:string,email:string,password:string,phoneNumber:string,about:string,imagePath:string})=>{
    return apiClient.post("/user/register",data)
}

const SearchUser=(data:{email:string})=>{
    return apiClient.post("/chat/serch_users",data)
}

const CreateAndGetOneOnOneChat=(data:{email:string})=>{
    return apiClient.post("/chat/create_one_chat",data)
}

const GetAllChat=()=>{
    return apiClient.get("/chat/")
}

const GetAllMessages=(chatId:string|undefined)=>{
    return apiClient.get(`/message/getMessages/${chatId}`)
}

const SendChat=(data:{chatId:string,content:string,attachments?:File[]})=>{
    try{
        const formData=new FormData()
    if(data.content){
        formData.append("content",data.content)
    }

    return apiClient.post(`/message/sendMessage/${data.chatId}`,formData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    
    }
    catch(err){
        console.log(err,"this is index")
    }
}

export{
    loginUser,
    uploadImage,
    registerUser,
    SearchUser,
    CreateAndGetOneOnOneChat,
    GetAllChat,
    GetAllMessages,
    SendChat
}
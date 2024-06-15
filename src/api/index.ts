import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient=axios.create({
    baseURL:"http://192.168.117.164:8000/api/v1/",
    withCredentials:true,
    timeout:120000
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
    console.log("ruuning api call")
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

export{
    loginUser,
    uploadImage,
    registerUser,
    SearchUser,
    CreateAndGetOneOnOneChat,
    GetAllChat
}
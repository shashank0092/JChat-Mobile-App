import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://192.168.138.156:8000/api/v1/",
    withCredentials: true,
    timeout: 120000,
})

apiClient.interceptors.request.use(
    async function (config) {
        const token = await AsyncStorage.getItem("acessToken")
        config.headers.Authorization = `Bearer ${token}`
        return config
    },

    function (err) {
        console.log(err, "while calling api")
        return Promise.reject(err)
    }
)


const loginUser = (data: { email: string, password: string }) => {
    console.log(data.email, data.password)
    return apiClient.post("/user/login", data)
}

const uploadImage = () => {
    return apiClient.get("user/imageauth")
}

const registerUser = (data: { name: string, email: string, password: string, phoneNumber: string, about: string, attachments:any}) => {

    const formdata=new FormData()
    console.log(data.attachments,"this is attached files in uri")
    if(data.name||data.email||data.password||data.phoneNumber||data.about||data.attachments){
        formdata.append("name",data.name)
        formdata.append("email",data.email)
        formdata.append("password",data.password)
        formdata.append("phoneNumber",data.phoneNumber)
        formdata.append("about",data.about)
       
    }
    if(data.attachments){
        console.log(data.attachments,"this is attached files in uri if")
        formdata.append("attachments",data.attachments)
    }
    return apiClient.post("/user/register", formdata,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const SearchUser = (data: { email: string }) => {
    return apiClient.post("/chat/serch_users", data)
}

const CreateAndGetOneOnOneChat = (data: { email: string }) => {
    return apiClient.post("/chat/create_one_chat", data)
}

const GetAllChat = () => {
    return apiClient.get("/chat/")
}

const GetAllMessages = (chatId: string | undefined) => {
    return apiClient.get(`/message/getMessages/${chatId}`)
}

const SendChat = (data: { chatId: string, content?: string, attachments?:any }) => {
    try {
        const formData = new FormData()
        console.log("thi is chat id",data.chatId)
        if (data.content) {
            formData.append("content", data.content)
        }
        if(data.attachments){
            
            formData.append("attachments",data.attachments)
        }
        return apiClient.post(`/message/sendMessage/${data.chatId}`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })

    }
    catch (err) {
        console.log(err, "this is index")
    }
}

export {
    loginUser,
    uploadImage,
    registerUser,
    SearchUser,
    CreateAndGetOneOnOneChat,
    GetAllChat,
    GetAllMessages,
    SendChat
}
import axios, { AxiosResponse } from "axios";
import { uploadImage } from "../api";

export const ImageAuthenticator=async()=>{
    try{
        const response:AxiosResponse=await uploadImage()

        if(response.status==200){
            const data=await response.data
            const{signature, expire, token}=data
            return {signature, expire, token}
        }
        else{
            const errorText=await response.statusText
            throw new Error(`Request faild with status ${response.status}: ${errorText}`)
        }
    }
    catch(err){
        if(axios.isAxiosError(err)){
            throw new Error(`Authentication request failed ${err.message}`)
        }
    }
}
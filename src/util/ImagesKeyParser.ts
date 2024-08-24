import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"



const s3Client=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})


export const GetS3KeyImageParser=async(key:string)=>{
   
    const command=new GetObjectCommand({
        Bucket:"devjchat",
        Key:key
    })
    return getSignedUrl(s3Client, command)
    .then((url) => {
        return url;
    })
    .catch((error) => {
        console.error("Error generating signed URL:", error);
        throw error; 
    });

}
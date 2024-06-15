import ImageKit from "imagekit-javascript";

export const IMAGEKIT_URL_END_POINT="https://ik.imagekit.io/shashank007/JChat"
export const PUBLIC_KEY="public_OhWuv155/hk0VDVPB+l5lJX+a/Y="
export const AUTHENTICATION_END_POINT="http://192.168.8.164:8000/api/v1/user/imageauth"

const ImageKitConfigOptions={
    urlEndpoint:IMAGEKIT_URL_END_POINT,
    publicKey:PUBLIC_KEY,
    authenticationEndpoint:AUTHENTICATION_END_POINT
}

export const imagekit=new ImageKit(ImageKitConfigOptions)
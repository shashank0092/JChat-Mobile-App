
interface Attachment {
    url: string;
    type: string;
    name:string;
    size:Number
  }

export interface UserInterface{
    _id:string,
    email:string,
    name:string,
    attachment:[Attachment],
    mediaLink:{url: string; type: string,name:string,size:Number}[];
    about:string,
    phoneNumber:string,
    createdAt:string,
    updatedAt:string
}
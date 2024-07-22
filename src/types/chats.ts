import { UserInterface } from "./user";

export interface ChatMessageInterface{
    _id:string,
    sender:Pick<UserInterface,"_id"|"email"|"imagePath">,
    attachments:[{url:string,localPath:string}]|null;
    content:string;
    chat:string;
    createdAt:string;
    updatedAt:string;

}

export interface ChatListInterface {
    admin: string,
    createdAt: string,
    isGroupChat: boolean,
    lastMessage?: string|null,
    name: string,
    participants: UserInterface[],
    updatedAt: string,
    _id: string

}
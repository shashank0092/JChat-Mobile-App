import { UserInterface } from "./user";

interface Attachment {
    url: string;
    type: string;
    name:string;
    size:Number
  }

export interface ChatMessageInterface{
    _id:string,
    sender:Pick<UserInterface,"_id"|"email"|"attachments">,
    attachments:[Attachment];
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
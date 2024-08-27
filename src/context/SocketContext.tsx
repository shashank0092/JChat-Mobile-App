import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext,useContext, useEffect, useState } from "react"
import socketio from "socket.io-client"

const SocketContext=createContext<{socket:ReturnType<typeof socketio>|null}>({socket:null})

const useSocket=()=>useContext(SocketContext)

const getSocket=async()=>{
    const JSONToken=await AsyncStorage.getItem("acessToken")

    return socketio(
        "http://192.168.138.156:8000/",
        {
            withCredentials:true,
            auth:{JSONToken}
        }
    )
   
}

const SocketProvider:React.FC<{children:React.ReactNode}> =({children})=>{
    const[socket,setSocket]=useState<ReturnType<typeof socketio>|null>(null)

    const ConnectToSocket=async()=>{
        setSocket(await getSocket())
    }
    

    useEffect(()=>{
        ConnectToSocket()
        
    },[])
    return(
        <SocketContext.Provider value={{socket}} >
            {children}
        </SocketContext.Provider>
    )
}

export {SocketProvider,useSocket}
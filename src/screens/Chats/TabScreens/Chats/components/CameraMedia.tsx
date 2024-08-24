import { useEffect, useRef } from "react"
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import { IconButton } from "react-native-paper"
import {useCameraDevice, useCameraPermission,useMicrophonePermission,Camera} from "react-native-vision-camera"

const CameraMedia=()=>{

    const { hasPermission, requestPermission } = useCameraPermission()

    const device=useCameraDevice("back")
    const camera = useRef<Camera>(null)
    useEffect(()=>{
        if(hasPermission){

        }
        else{
            requestPermission()
        }
    },[])
    return(
        <>
            <TouchableOpacity>
            <IconButton icon={'camera'} onPress={()=>console.log("shukla boi")} />
            </TouchableOpacity>
            {
                hasPermission?(<>
                    <SafeAreaView className="w-screen h-screen absolute bottom-20 right-16 " >
                    <Camera
                        device={device}
                        isActive={true}
                        style={[StyleSheet.absoluteFill]}
                        ref={camera}
                        photo={true}
                    />
                    </SafeAreaView>
                </>):(<></>)
                
            }
        </>
    )
}

const CameraStyle=StyleSheet.create({
    cameraStyle:{
        // position:"absolute",
        // height:1000,
        
    }
})

export default CameraMedia
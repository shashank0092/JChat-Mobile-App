import { useRef, useEffect, useState } from "react"
import { CameraRoll } from "@react-native-camera-roll/camera-roll"
import { Button, StyleSheet, Image, View, TouchableOpacity } from "react-native"
import { useCameraDevice, useCameraPermission, useMicrophonePermission, Camera } from "react-native-vision-camera"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { rootStackParamList } from "../../../../../routes/index"
import Video from 'react-native-video';
import { IconButton } from "react-native-paper"


type CameraScreenProp = NavigationProp<rootStackParamList, 'CameraMedia'>;


type Props = {
    route: CameraScreenProp;
};
const CameraScreen: React.FC<Props> = ({ route }) => {
    console.log(route.params, ":this is route")
    const { setSelectedFiles } = route.params
    const { hasPermission, requestPermission } = useCameraPermission()
    const { } = useMicrophonePermission()
    const navigation = useNavigation<CameraScreenProp>();
    const device = useCameraDevice("back")
    const [cameraUse, setCameraUse] = useState("image")
    const [videoRecordingStatus, setVideoRecordingStatus] = useState("off")
    const [path, setPath] = useState('')
    const [type, setType] = useState('')
    const camera = useRef<Camera>(null)


    const cameraPermission = Camera.getCameraPermissionStatus()
    const microphonePermission = Camera.getMicrophonePermissionStatus()
    const getMicroPhone = async () => {
        await Camera.requestMicrophonePermission()
    }

    const getCamera=async()=>{
        await Camera.requestCameraPermission()
    }

    useEffect(() => {
        if(cameraPermission=="denied"){
            getCamera()
        }
        if(microphonePermission=="denied"){
            getMicroPhone()
        }
    }, [])

    const CapturePhoto = async () => {
        const photo = await camera.current?.takePhoto({
            flash: "auto",
            enableAutoRedEyeReduction: true,
            enableShutterSound: true
        })

        console.log(photo, "this is photo")

        const path = await CameraRoll.save(`file://${photo.path}`, {
            type: 'photo',
        })
        console.log(path, "this is path")
        setPath(path)

        const result = await fetch(`file://${photo.path}`)
        const data = await result.blob();
        console.log(result, "this is result ")
        setType(data.type)

        if (data) {
            setSelectedFiles({
                uri: path,
                name: `IMG_${Date.now()}.${data.type.split("/")[1]}`,
                type: data.type
            })

            navigation.navigate("ConnectionChat")
        }

    }

    const CaptureVideo = async () => {
        setVideoRecordingStatus("recording")
        const video = await camera.current?.startRecording({
            onRecordingFinished: async (video) => {
                console.log(video, "this is recoded video")
                
                const VideoName = video.path.substring(video.path.lastIndexOf('/') + 1);
                const VideoType = video.path.split('.').pop();
                const Vpath=video.path
                const videoPath = await CameraRoll.save(`file://${Vpath}`, {
                    type: 'video',
                })
                setPath(videoPath)
                console.log("this is video path", videoPath)
                setSelectedFiles({
                    uri: videoPath,
                    name: VideoName,
                    type: `${VideoType}/video`
                })
                setType(`${VideoType}/video`)
                navigation.navigate("ConnectionChat")
            },
            onRecordingError: (error) => { console.error(error) }
        })

        console.log(video, "this is fideo file")
    }

    const StopRecording = async () => {
        setVideoRecordingStatus("done")
        await camera.current.stopRecording()
    }

    const PauseRecording = async () => {
        setVideoRecordingStatus("paused")
        await camera.current.pauseRecording()
    }

    const ResumeRecording=async()=>{
        setVideoRecordingStatus("recording")
        await camera.current?.resumeRecording()
    }
    return (
        <>
            <View className="w-screen h-screen" >
                <View className="w-screen h-screen absolute" >
                    <Camera
                        device={device}
                        isActive={true}
                        style={[StyleSheet.absoluteFill]}
                        ref={camera}
                        photo={true}
                        video={true}
                        audio={true}
                    />
                </View>

                <View className="w-screen h-screen  flex  justify-between " >
                    <View className="" >
                        <IconButton icon={"close"} size={40} onPress={() => navigation.navigate("ConnectionChat")} />
                    </View>
                    <View className="flex flex-row justify-between mb-5 " >
                        <View className="" >
                            {
                                type.includes("image") ?
                                    (<>
                                        <Image
                                            source={{ uri: path }}
                                            width={70}
                                            height={70}
                                            className=''
                                        />
                                    </>) :
                                    (<></>)
                            }
                            {
                                type.includes("video") ?
                                    (<>
                                        <Video
                                            source={{ uri: path }}
                                            style={{ height: 100, width: 100 }}
                                            controls={true}
                                        />
                                    </>) :
                                    (<></>)
                            }
                        </View>
                        <View className="ml-20" >

                            {
                                videoRecordingStatus == "recording" ?
                                    (
                                        <View className="flex flex-row gap-5 justify-center items-center" >
                                            <TouchableOpacity className="bg-slate-100 self-start rounded-full" onPress={StopRecording} >
                                                <IconButton icon={"record-circle-outline"} size={40} iconColor="black" />
                                            </TouchableOpacity>
                                        </View>
                                    ) :
                                    (
                                        <View>
                                            <TouchableOpacity className="bg-slate-100 self-start rounded-full" onPress={cameraUse == "image" ? CapturePhoto : CaptureVideo} >
                                                <IconButton icon={cameraUse == "image" ? "camera" : "video"} size={40} iconColor="black" />
                                            </TouchableOpacity>
                                        </View>
                                    )

                            }

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setCameraUse(
                                () => {
                                    if (cameraUse == "image") {
                                        return "video"
                                    }
                                    else if (cameraUse == "video") {
                                        return "image"
                                    }
                                    else {
                                        return "image"
                                    }
                                }
                            )} >
                                <IconButton icon={cameraUse == "image" ? "video" : "camera"} size={40} iconColor="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View className=" " >
                    <Button title="Capture Photo" onPress={CapturePhoto} />
                </View> */}
                {/* <View className=" " >
                    <View  >
                        <Button title="Capture Video" onPress={CaptureVideo} />
                    </View>
                    <View>
                        <Button title="Stop Recording" onPress={StopRecording} />
                    </View>
                    <View>
                        <Button title="Pause Recording" onPress={PauseRecording} />
                    </View>
                    {
                        path ? (
                            <>
                                <Video
                                    source={{ uri: path }}
                                    style={{ height: 170, width: 170 }}
                                    controls={true}
                                    />
                            </>
                        ) : (<></>)
                    }
                </View> */}

                {/* {
                    path ? (
                        <View className="" >
                            <Image
                                source={{ uri: path }}
                                width={70}
                                height={70} />
                        </View>
                    ) :
                        (<>
                        </>)
                } */}

            </View>
        </>
    )
}

export default CameraScreen
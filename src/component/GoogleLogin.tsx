import {Button} from "react-native-paper"
const GoogleLogin=()=>{
    return(
        <>
            <Button mode="contained" 
            icon={require("../assets/google.png")} 
            contentStyle={{flexDirection:"row-reverse"}} 
            buttonColor="white" 
            onPress={()=>console.log("Press On Continue with google")}
            >
                Continue With 
            </Button>
        </>
    )
}

export default GoogleLogin
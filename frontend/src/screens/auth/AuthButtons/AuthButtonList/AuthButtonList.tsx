import { FC } from "react"
import { Alert, View } from "react-native"
import TextDivideLine from "../../../../components/general/TextDivideLine"
import AppleButton from "../AppleButton"
import GoogleButton from "../GoogleButton"
import useAppleAuthentication from "../useAppleAuthentication"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import useGoogleAuthentication from "../useGoolgeAuthentication"
import loginWithCredential from "../loginWithCredential"
import { RootStackParamList } from "../../../../navigation/types"

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab' | 'CreateUser'>;

type AuthButtonListProps = {
    googleButtonField: string
    appleSignIn: boolean
}

const AuthButtonList:FC<AuthButtonListProps> = ({googleButtonField, appleSignIn}) => {

    const [appleAuthAvailable, authWithApple] = useAppleAuthentication();
    const [googleAuthLoading, authWithGoogle] = useGoogleAuthentication();

   

    const login = async(credential: any, data?: any) => {
        const user = await loginWithCredential(credential, data)
    }

    const loginWithGoogle = async() => {
        try {
            const [credential, data] = await authWithGoogle();
            await login(credential, data);
        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    }
  
    const loginWithApple = async() => {
        try {
            const [credential] = await authWithApple();
            await login(credential);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    }

    return(
        <View style={styles.container}>
            <TextDivideLine title='OR'/>
            <GoogleButton onPress= {loginWithGoogle} request={!googleAuthLoading} title={googleButtonField}/>
            <AppleButton appleAuthAvailable={appleAuthAvailable} onPress={loginWithApple} signIn={appleSignIn}/>
        </View>
        )
}

export default AuthButtonList
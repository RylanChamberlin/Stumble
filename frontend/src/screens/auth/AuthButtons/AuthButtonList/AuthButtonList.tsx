import { FC, useEffect } from "react"
import { Alert, View } from "react-native"
import TextDivideLine from "../../../../components/general/TextDivideLine"
import AppleButton from "../AppleButton"
import GoogleButton from "../GoogleButton"
import useAppleAuthentication from "../useAppleAuthentication"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../../navigation/Nav"
import useGoogleAuthentication from "../useGoolgeAuthentication"
import loginWithCredential from "../loginWithCredential"

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab' | 'CreateUser'>;

type AuthButtonListProps = {
    googleButtonField: string
    appleSignIn: boolean
}

const AuthButtonList:FC<AuthButtonListProps> = ({googleButtonField, appleSignIn}) => {

    const navigation = useNavigation<NavProp>();  
    const [appleAuthAvailable, authWithApple] = useAppleAuthentication();
    const [googleAuthLoading, authWithGoogle] = useGoogleAuthentication();

   

    const login = async(credential: any, data?: any) => {
    
        const user = await loginWithCredential(credential, data);

        // db.collection("users").doc(user.uid).get().then(((doc: { exists: any }) => {
        //     console.log('checking exsistenceeeee\n\n\n')
        //     if(!doc.exists){
        //         navigation.navigate('CreateUser');
        //     }
        // }))

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
            // const [credential] = await authWithApple();
            // await login(credential);
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
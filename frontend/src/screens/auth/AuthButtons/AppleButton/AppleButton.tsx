import styles from "./styles"
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication';
import { FC } from "react";

type AppleButtonProps = {
    appleAuthAvailable: boolean
    onPress: () => void
    signIn: boolean
}

const AppleButton:FC<AppleButtonProps> = ({appleAuthAvailable, onPress, signIn}) => {

    return (

        <>

        {appleAuthAvailable && (
                <AppleAuthenticationButton
                buttonType={signIn ? AppleAuthenticationButtonType.SIGN_IN : AppleAuthenticationButtonType.SIGN_UP}
                buttonStyle={AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={styles.button}
                onPress={onPress}
                />
              )} 

        </>
    )
}

export default AppleButton
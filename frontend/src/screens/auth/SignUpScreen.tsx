import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import React from 'react'

import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterForm from './Form/RegisterForm';
import AuthButtonList from './AuthButtons/AuthButtonList';


WebBrowser.maybeCompleteAuthSession();

const SignUpScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding">
                <RegisterForm/>
            </KeyboardAvoidingView>
            <AuthButtonList googleButtonField={'Sign up with Gooogle'} appleSignIn={false}/>
        </SafeAreaView>
    )   
}

export default SignUpScreen

const styles = StyleSheet.create({

    container: {
        flex: 1 ,
        marginTop: '20%'
    },

    keyboardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

})

  
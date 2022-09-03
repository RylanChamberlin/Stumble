import {
  KeyboardAvoidingView,
  StyleSheet, 
} from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../Form/LoginForm";
import AuthButtonList from "../AuthButtons/AuthButtonList";

const LoginScreen = () => {

  return (
  <SafeAreaView style={styles.container }>
    <KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding">
      <LoginForm/>
    </KeyboardAvoidingView>
    <AuthButtonList googleButtonField={"Sign In with Google"} appleSignIn={true}/>
  </SafeAreaView>
  );
  };

export default LoginScreen;

const styles = StyleSheet.create({
container: {
  flex: 1 ,
  marginTop: '20%'
},

keyboardContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  },
});

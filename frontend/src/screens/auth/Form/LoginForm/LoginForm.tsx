import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../../../../firebase';
import FormField from '../FormField';
import Header from '../Header';
import { useFormData } from '../useFormData';
import styles from './styles';

const LoginForm = () => {

    const [formValues, handleFormValueChange, setFormValues] = useFormData({
        email: '',
        password: '',
    })
    
    const handleLogin = () => {
        auth
          .signInWithEmailAndPassword(formValues.email, formValues.password)
          .then((userCredentials: { user: any; }) => {
            const user = userCredentials.user;
            console.log("Logged in with:", user.email);
          })
          .catch((error: { message: string; }) => Alert.alert(error.message));
      };


  return (
    <View style={styles.container}>

        <Header title={"Login"} navigate={"SignUp"} fieldText={"Dont have an account? "} redirectText={"SIGN UP!"}/>

        <FormField
            formKey='email'
            placeholder='Email'
            textInputProps={{
                autoCapitalize: "none"
            }}
            handleFormValueChange={handleFormValueChange}
        />
        <FormField
            formKey='password'
            placeholder='Password'
            textInputProps={{
                autoCapitalize: "none",
                secureTextEntry: true
            }}
            handleFormValueChange={handleFormValueChange}
        />
    
        <TouchableOpacity  onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    </View>
  )
}


export default LoginForm;
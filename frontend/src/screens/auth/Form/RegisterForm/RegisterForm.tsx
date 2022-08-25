import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { create } from 'react-test-renderer';

import { RootStackParamList } from '../../../../navigation/Nav';
import FormField from '../FormField';
import Header from '../Header';
import { useFormData } from '../useFormData';
import styles from './styles';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const RegisterForm = () => {

    const [formValues, handleFormValueChange, setFormValues] = useFormData({
        username: '',
        name: '',
        email: '',
        password: '',
        repassword: ''
  })

    const navigation = useNavigation<NavProp>()


    function hasWhiteSpace(s: string) {
        return /\s/g.test(s);
      }

    function hasOneWhiteSpace(s: string) {
        const spaces = s.split(' ').length - 1;
        if(spaces > 2)return true
        return false
      }

    const handleRegister = async() => {

        


        if(formValues.username == ''){
            return Alert.alert("Username is Empty")
        }

        if(hasWhiteSpace(formValues.username)){
            return Alert.alert("No Spaces in Username is Allowed")
        }

        if(formValues.name == ''){
            return Alert.alert("Display Name is Empty")
        }

        if(hasOneWhiteSpace(formValues.name)){
            return Alert.alert("Only Two Spaces are Allowed in Name");
        }

        if(formValues.email == ''){
            return Alert.alert("Email is Empty")
        }
        if(formValues.password == ''){
            return Alert.alert("Password is Empty")
        }
        if(formValues.repassword == ''){
            return Alert.alert("Password is Empty")
        }
        if(formValues.password !== formValues.repassword){
            return Alert.alert("Passwords do not match")
        }


        const username = formValues.username.toLowerCase();
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where("username", "==", username).get()
          
        if(!snapshot.empty){
            Alert.alert("Username is taken")
            return;
        }
        else{
            createAccount()
        }
            
    }

    const createAccount = async () => {
        // await auth
        // .createUserWithEmailAndPassword(formValues.email, formValues.password)
        // .then((userCredentials: { user: any; }) => {
        //         const user = userCredentials.user;
        //         db.collection("users").doc(user.uid).set({
        //             username: formValues.username.toLowerCase(),
        //             name: formValues.name
        //     });

        //     console.log('Registered with:', user.uid);
        // })
        // .catch((error: { message: string; }) => Alert.alert(error.message))
    }



    return (
        <View style={styles.container}>

            <Header title={'Signup'} navigate={'Login'} fieldText={'Already have an account? '} redirectText={'LOGIN!'}/>

            <FormField
                formKey='username'
                placeholder='Username'
                textInputProps={{
                    autoCapitalize: "none",
                    spellCheck: false,
                    maxLength: 20,
                }}
                handleFormValueChange={handleFormValueChange}
            />
            <FormField
                formKey='name'
                placeholder='Name'
                textInputProps={{
                    spellCheck: false,
                    maxLength: 40
                }}
                handleFormValueChange={handleFormValueChange}
            />
            <FormField
                formKey='email'
                placeholder='Email'
                textInputProps={{
                    autoCapitalize: "none",
                    spellCheck: false,
                    keyboardType: "email-address",
                    
                }}
                handleFormValueChange={handleFormValueChange}
            />
            <FormField
                formKey='password'
                placeholder='Password'
                textInputProps={{
                    autoCapitalize: "none",
                    secureTextEntry: true,
                    spellCheck: false,
                }}
                handleFormValueChange={handleFormValueChange}
            />
            <FormField
                formKey='repassword'
                placeholder='Retype Password'
                textInputProps={{
                    autoCapitalize: "none",
                    spellCheck: false,
                    secureTextEntry: true
                }}
                
                handleFormValueChange={handleFormValueChange}
            />

            <TouchableOpacity  onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}


export default RegisterForm;
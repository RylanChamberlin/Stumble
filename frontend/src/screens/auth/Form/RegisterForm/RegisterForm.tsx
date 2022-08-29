import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { createUser } from '../../../../services/FirebaseCalls/createUser';
import FormField from '../FormField';
import Header from '../Header';
import { useFormData } from '../useFormData';
import styles from './styles';

const RegisterForm = () => {

    const [formValues, handleFormValueChange, setFormValues] = useFormData({
        username: '',
        name: '',
        email: '',
        password: '',
        repassword: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async () => {
        setIsLoading(true)
        await createUser(formValues)
        setIsLoading(false)  
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

            <TouchableOpacity  onPress={handleRegister} style={styles.button} disabled={isLoading}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            {isLoading &&
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
            }
        </View>
    )
}


export default RegisterForm;
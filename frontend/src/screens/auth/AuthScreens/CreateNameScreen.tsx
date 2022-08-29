import { Dispatch, SetStateAction, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AppView from "../../../components/general/AppView";
import { createUsername } from "../../../services/FirebaseCalls/createUser";
import FormField from "../Form/FormField"
import { useFormData } from "../Form/useFormData"


const CreateNameScreen = (props: { uid: string; setHasUsername: Dispatch<SetStateAction<boolean>> }) => {

    const [formValues, handleFormValueChange, setFormValues] = useFormData({
        username: '',
        name: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const confirm = async() => {

        setIsLoading(true)
        await createUsername(formValues, props.uid, props.setHasUsername)  
        setIsLoading(false)      
    }

    return (
        <AppView>
       
            <KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding">
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.text}>Please Enter Your Name and Choose a Username Below</Text>
                    <FormField
                        formKey='name'
                        placeholder='Name'
                        textInputProps={{
                        }}
                        handleFormValueChange={handleFormValueChange}
                    />
                    <FormField
                        formKey='username'
                        placeholder='Username'
                        textInputProps={{
                            autoCapitalize: "none"
                        }}
                        handleFormValueChange={handleFormValueChange}
                    />
                    
                

                    <TouchableOpacity onPress={confirm}  style={styles.button} disabled={isLoading}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {isLoading &&
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
            }
        </AppView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%'
    },

    title: {
        fontWeight: 'bold', 
        fontSize: 30, 
        padding: 5, 
        textAlign: 'center'
    },
    text:{
        fontWeight: 'bold', 
        fontSize: 25, 
        padding: 5, 
        textAlign: 'center'
    },

    textContainer: {
        flexDirection: 'row', 
        padding: 5, 
        justifyContent: "center"
    },

    textSize: {
        fontSize: 15 
    },

    boldText: {
        fontWeight: 'bold', 
    },

    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
       
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },

      outsidecontainer: {
        flex: 1 ,
        marginTop: '20%'
      },
  
      keyboardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },


      loading: {
        
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: ''
      }
  })

export default CreateNameScreen
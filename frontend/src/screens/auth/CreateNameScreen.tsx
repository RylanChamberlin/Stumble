import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../../navigation/Nav";
import FormField from "./Form/FormField"
import { useFormData } from "./Form/useFormData"

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab'>;

const CreateNameScreen = () => {

    const navigation = useNavigation<NavProp>();  
    const [formValues, handleFormValueChange, setFormValues] = useFormData({
        username: '',
        name: '',
    })

    const confirm = () => {


        //changes this to v9

        // db.collection("users").doc(auth.currentUser.uid).set({
        //     username: formValues.username,
        //     name: formValues.name
        // });

        navigation.replace('BottomTab');

    }

    return (
        <SafeAreaView style={styles.outsidecontainer}>
            <KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding">
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.text}>Please Enter Your Name and Chose a Username Below</Text>
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
                    
                

                    <TouchableOpacity onPress={confirm}  style={styles.button}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // margin: 20,
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
  })

export default CreateNameScreen
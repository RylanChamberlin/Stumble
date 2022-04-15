import { useState } from "react";
import {View, TextInput, Text, StyleSheet} from "react-native";
import {elevation} from "../../common/styles";
import Button from "../Button";


export default function Search(){

    const [input, setInput] = useState("")

    const handleEndEditing = () => {
        if(!input) return
        setInput("")
    }
    return(
        <View>
            <View style = {[styles.container, styles.elevation]}>
                <TextInput 
                    style = {styles.input} 
                    placeholder={'BY LOCATION'}
                    value={input} 
                    onChangeText={(text) => {setInput(text);
                    }}
                    onEndEditing={handleEndEditing} 
                />
            </View>

            <View style = {styles.textContainer}>
                <Text style = {styles.text}>OR</Text>
            </View>

            <Button
                name="ADVANCED SEARCH" 
                buttonStyle = {[styles.container, styles.elevation]} 
                buttonTextStyle={styles.AdvancedText}   
            />
            <Button 
                name="SEARCH" 
                buttonStyle = {[styles.button, styles.elevation]} 
                buttonTextStyle={styles.buttonText}
                buttonContainerStyle={styles.buttonContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
    },
    container: {
        marginTop: 5,
        marginHorizontal: 25,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 40,
    },
    elevation,
    AdvancedText: {
        fontSize: 15,
    },
    buttonText: {
        fontSize: 12,
    },
    text: {
        fontWeight: "bold",
        fontSize: 25,

    },
    button: {
        marginTop: 5,
        marginHorizontal: 50,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 30,
        backgroundColor: 'grey',
        width: 90,
        alignItems: "center",
    },
    buttonContainer:{
        marginTop: 5,
        marginLeft: 220
    }
})
import { useState } from "react";
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from "react-native";
import {elevation} from "../../common/styles";
import { FontAwesome } from "@expo/vector-icons";

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

            <TouchableOpacity onPress={() => console.warn(`Advanced Search Click`)}>
                <View style = {[styles.container, styles.elevation]}>
                    <Text style = {styles.input}>ADVANCED SEARCH</Text> 
                </View>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.buttonContainer} onPress={() => console.warn(`Search Click`)}>
                <View style = {[styles.button, styles.elevation]}>
                    <Text style = {styles.buttonInput}>SEARCH</Text> 
                </View>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
    },
    container: {
        flexDirection: "row", // Makes view in a row
        marginTop: 5,
        marginHorizontal: 25,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 40,
    },
    elevation,
    input: {
        fontSize: 15,
    },
    buttonInput: {
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
        //backgroundColor: "white",
    }
})
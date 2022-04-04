import { useState } from "react";
import {View, TextInput, StyleSheet} from "react-native";
import {elevation} from "../common/styles";
import { FontAwesome } from "@expo/vector-icons";

export default function Search({setTerm}){

    const [input, setInput] = useState("")

    const handleEndEditing = () => {
        if(!input) return
        setTerm(input)
        setInput("")
    }

    return(
        <View style = {[styles.container, styles.elevation]}>
            <FontAwesome name="search" size = {25}/>
            <TextInput 
                style = {styles.input} 
                placeholder="Restaurants, food"
                value={input} 
                onChangeText={(text) => {setInput(text);
                }}
            onEndEditing={handleEndEditing} 
                />
        </View>
    );
}

const styles = StyleSheet.create({
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
        fontSize: 20,
    }
})
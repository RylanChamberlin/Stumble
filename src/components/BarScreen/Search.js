import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {elevation} from "../../common/styles";


export default function Search(){

    const [input, setInput] = useState("")
    

    const handleEndEditing = () => {
        if(!input) return
        setInput("")
    }
    

    return (
        <View>
            <View style = {[styles.searchBar, styles.elevation]}>
                <TextInput 
                    style = {styles.input} 
                    placeholder={'search by location...'}
                    value={input} 
                    onChangeText={(text) => {setInput(text);
                    }}
                    onEndEditing={handleEndEditing} 
                />
            </View>

            <View style = {styles.resultHeader}>
                <Text style = {styles.resultText}>RESULTS</Text>
                <TouchableOpacity onPress= {() => console.warn("Press filter")}>
                    <Text style = {styles.filterByText}>FILTER BY</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
   
    elevation,
    searchBar: {
        marginTop: 5,
        marginHorizontal: 25,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 40,
    },
    resultHeader: {
        flexDirection: "row",
        marginTop: 25,
        marginHorizontal: 25
    },
    resultText: {
        fontWeight: "bold",
        marginRight: 75
        
    },
    filterByText: {
        marginLeft: 135,
    },

})
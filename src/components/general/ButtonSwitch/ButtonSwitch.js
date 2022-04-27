import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function ButtonSwitch({button1, button2}){

    const [recent, setRecent] = useState(true);

    return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.recentButton,recent ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress = {() => {setRecent(false)}}>
                <Text style= {[styles.buttonText,recent ? {color: 'black'} : {color: 'white'}]}>{button1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.recentButton,!recent ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress = {() => {setRecent(true)}}>
                <Text style= {[styles.buttonText,!recent ? {color: 'black'} : {color: 'white'}]}>{button2}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    recentButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 7,
        width: '48%',
        alignItems: "center",
        //paddingHorizontal: 50,
    },
    buttonText:{
        fontSize:20, fontWeight: "bold",
    },

})
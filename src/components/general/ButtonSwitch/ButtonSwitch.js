import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function ButtonSwitch({button1, button2, left, setLeft}){


    return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.recentButton,left ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress = {() => {setLeft(false)}}>
                <Text style= {[styles.buttonText,left ? {color: 'black'} : {color: 'white'}]}>{button1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.recentButton,!left ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress = {() => {setLeft(true)}}>
                <Text style= {[styles.buttonText,!left ? {color: 'black'} : {color: 'white'}]}>{button2}</Text>
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
        borderRadius: 10,
        width: '48%',
        alignItems: "center",
        //paddingHorizontal: 50,
    },
    buttonText:{
        fontSize:20, fontWeight: "bold",
    },

})
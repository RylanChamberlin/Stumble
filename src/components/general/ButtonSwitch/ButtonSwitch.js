import {Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";


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

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {elevation} from "../../common/styles";
import CheckBox from '../CheckBox';

export default function Choices({onClose}){


    return(
        <View style={styles.container}>

            <Text style={styles.text}>POPULARITY</Text>
            <CheckBox name="HIGH"/>
            <CheckBox name="MODERATE"/>
            <CheckBox name="LOW"/>
            <CheckBox name="ANY"/>

            <Text style={styles.text}>RESERVATION TYPE</Text>
            <CheckBox name="TABLE"/>
            <CheckBox name="PRIVATE ROOM"/>
            <CheckBox name="BOTTLES"/>
            <CheckBox name="WHOLE BAR"/>

            <Text style={styles.text}>ATMOSPHERE</Text>
            <CheckBox name="NIGHT CLUB"/>
            <CheckBox name="HONKY TONK"/>
            <CheckBox name="POOL TABLE"/>
            <CheckBox name="KAROKE"/>
            <CheckBox name="LIVE MUSIC"/>

            <TouchableOpacity style = {styles.buttonContainer} onPress={onClose}>
                <View style = {[styles.button, styles.elevation]}>
                    <Text style = {styles.buttonText}>Done</Text> 
                </View>
            </TouchableOpacity>

        </View>
       
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        marginLeft: 25
    },
    
    checkBoxContainer: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "white",
    },
    text: {
        marginHorizontal: 5,
        marginLeft: 10,
        fontWeight: "bold",
    },
    elevation,
    AdvancedText: {
        fontSize: 15,
    },
    buttonText: {
        fontSize: 12,
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

});
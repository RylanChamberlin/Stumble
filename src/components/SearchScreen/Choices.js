import { useState } from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import CheckBox from './CheckBox';
import Button from './Button';
import {elevation} from "../../common/styles";

export default function Choices(){

    const fruits = ['Apples', 'Oranges', 'Pears']
    // --- OR ---
    // const fruits = [
    //   { label: 'Apples', value: 'appls' },
    //   { label: 'Oranges', value: 'orngs' },
    //   { label: 'Pears', value: 'pears' }
    // ]

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    // state = { selectedFruits: [] }

    // onSelectionsChange = (selectedFruits) => {
    //     // selectedFruits is array of { label, value }
    //     this.setState({ selectedFruits })
    //   }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>PRICE</Text>
            <CheckBox name="$"/>
            <CheckBox name="$$"/>
            <CheckBox name="$$$"/>

            <Text style={styles.text}>RATING</Text>
            <CheckBox name="★"/>
            <CheckBox name="★★"/>
            <CheckBox name="★★★"/>
            <CheckBox name="★★★★"/>
            <CheckBox name="★★★★★"/>

            <Text style={styles.text}>TYPE</Text>
            <CheckBox name="Drive-Thru"/>
            <CheckBox name="Dine-In"/>
            <CheckBox name="Carry-Out"/>
            <CheckBox name="Delivery"/>
            <CheckBox name="Buffet"/>

            <Text style={styles.text}>ATMOSPHERE</Text>
            <CheckBox name="Casual"/>
            <CheckBox name="Family Friendly"/>
            <CheckBox name="Upscale"/>
            <CheckBox name="Bar"/>
            <CheckBox name="Sports"/>
            <CheckBox name="Live Entertainment"/>

            <Button 
                name="DONE" 
                buttonStyle = {[styles.button, styles.elevation]} 
                buttonTextStyle={styles.buttonText}
                buttonContainerStyle={styles.buttonContainer}
            />

        </View>
       
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
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
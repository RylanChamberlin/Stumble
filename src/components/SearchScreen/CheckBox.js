import { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function CheckBox({name}){

    const [isSelected, setSelection] = useState(false);

    return(
        
        <TouchableOpacity onPress= {() => setSelection(!isSelected)}>
            <View style = {styles.container} >
                <View style = {[styles.checkBoxContainer]}>
                    {isSelected ? <AntDesign name="check" size={20} color="black"/> : null}
                </View>
                <Text style = {[styles.text]}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row", // Makes view in a row
        marginVertical: 2,
        marginHorizontal: 10,
    },
    checkBoxContainer: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "white",
    },
    text: {
        marginLeft: 5
    }

});
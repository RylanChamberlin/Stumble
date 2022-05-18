import { useState } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import styles from './styles';

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
import { FC } from "react";
import {Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

type Props = {
    button1: string
    button2: string
    left: boolean
    setLeft: (arg0: boolean) => void
}

const ButtonSwitch: FC<Props> = (props) => {

    return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.recentButton,props.left ? styles.whiteBackground : styles.blackBackground]} onPress = {() => {props.setLeft(false)}}>
                <Text style= {[styles.buttonText,props.left ? styles.blackColor : styles.whiteColor]}>{props.button1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.recentButton,!props.left ? styles.whiteBackground : styles.blackBackground]} onPress = {() => {props.setLeft(true)}}>
                <Text style= {[styles.buttonText,!props.left ? styles.blackColor : styles.whiteColor]}>{props.button2}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ButtonSwitch
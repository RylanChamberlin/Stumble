import { Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import styles from "./styles";
import { FC } from "react";

type GoogleButtonProps = {
    onPress: () => void
    request: any
    title: string
}

const GoogleButton:FC<GoogleButtonProps> = ({onPress, request, title}) => {

    return (
        <TouchableOpacity style={styles.button} disabled={request} onPress={onPress}>
            <FontAwesome5 style={styles.icon} name="google" />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );

}

export default GoogleButton;
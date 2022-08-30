import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../../../../navigation/types";
import styles from "./styles"

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Login' | 'SignUp'>;
type HeaderProps = {
    title: string
    navigate: 'Login' | 'SignUp'
    fieldText: string
    redirectText: string

}

const Header:FC<HeaderProps> = ({title, navigate, fieldText, redirectText}) => {

    const navigation = useNavigation<NavProp>()

    const redirect = () => {
        navigation.navigate(navigate);
    }

    return (

        <>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={redirect}>
                <View style={styles.textContainer}>
                    <Text style={styles.textSize}>{fieldText}</Text>
                    <Text style={[styles.textSize, styles.boldText]}>{redirectText}</Text>
                </View>
            </TouchableOpacity>

        </>

    )
}

export default Header
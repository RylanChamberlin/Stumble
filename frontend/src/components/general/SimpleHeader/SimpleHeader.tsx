import { Text, TouchableOpacity, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/Nav";
import { FC } from "react";

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab'>;

type SimpleHeader = {
    title: string
}

const SimpleHeader: FC<SimpleHeader>= ({title}) => {

    const navigation = useNavigation<NavProp>()

    const goBack = () => {
        navigation.navigate("BottomTab")
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.arrow}>
                <AntDesign name="arrowleft" size={34} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View> 
    )
}

export default SimpleHeader
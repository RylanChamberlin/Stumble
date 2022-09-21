import { Text, TouchableOpacity, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { RootStackParamList } from "../../../navigation/types";



type SimpleHeader = {
    title: string
    bar?: any
}

const SimpleHeader: FC<SimpleHeader>= ({title, bar}) => {

    const navigation = useNavigation()

    const goBack = () => {

        
        navigation.goBack()
        
        
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
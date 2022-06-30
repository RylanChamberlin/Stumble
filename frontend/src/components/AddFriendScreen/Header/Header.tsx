import { Text, TouchableOpacity, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../../../../App'
import { useNavigation } from "@react-navigation/native";

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab' | 'AddFriendScreen'>;

const Header = () => {

    const navigation = useNavigation<NavProp>()

    const goBack = () => {
        navigation.navigate("BottomTab")
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.arrow}>
                <AntDesign name="arrowleft" size={34} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}>Add New Friends</Text>
        </View> 
    )
}

export default Header
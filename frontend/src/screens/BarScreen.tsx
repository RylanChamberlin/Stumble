import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AppView from "../components/general/AppView";
import Header from "../components/BarScreen/Header";
import BarList from "../components/BarScreen/BarList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { RootStackParamList } from "../navigation/Nav";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const BarScreen = ({navigation}: Props) => {

    //const navigation = useNavigation({navigator})
    // const handleSignOut = () => {
    //     auth
    //     .signOut()
    //     .then(() => {
    //         navigation.replace("Login")
    //     })
    //     .catch(error => alert(error.message))
    // }
     
    return (
        <AppView>
            {/* <View style={styles.logo}>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={{color: '#ffff'}}>{auth.currentUser?.email}</Text>
                </TouchableOpacity>
            </View> */}
            <Header/>
            <BarList/>
            
        </AppView>
    );
}
const styles = StyleSheet.create({

    logo: {
        alignItems: 'center',
    },
    

})

export default BarScreen;
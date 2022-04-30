import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import AppView from "../components/general/AppView";
import { auth } from "../firebase";
import Header from "../components/BarScreen/Header";
import BarList from "../components/BarScreen/BarList";

export default function BarScreen(){

    const navigation = useNavigation({navigator})
    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }
        
    return (
        <AppView>
            <View style={styles.logo}>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={{color: '#ffff'}}>{auth.currentUser?.email}</Text>
                </TouchableOpacity>
            </View>
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


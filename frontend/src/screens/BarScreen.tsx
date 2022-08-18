import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AppView from "../components/general/AppView";
import Header from "../components/BarScreen/Header";
import BarList from "../components/BarScreen/BarList";
import { auth } from "../firebase";

const BarScreen = () => {

    const handleSignOut = () => {
        auth.signOut()
    }

    return (
        <AppView>
            <View style={styles.logo}>
                {/* <TouchableOpacity onPress={handleSignOut}>
                    <Text style={{color: '#ffff'}}>{auth.currentUser?.email}</Text>
                </TouchableOpacity> */}
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

export default BarScreen;
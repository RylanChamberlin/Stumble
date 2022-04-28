import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, ImageBackground, Text, ScrollView, FlatList, TouchableOpacity} from "react-native";
import { Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AppView from "../components/general/AppView";
import BarBox from "../components/BarScreen/BarBox";
import Search from "../components/BarScreen/Search";
import { auth } from "../firebase";
import useBars from "../hooks/useBars";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarScreen(){

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }

        const [{data, loading, error}, getBars] = useBars();

        useEffect(() => {
            getBars();
        }, []);
        
        return (
            <AppView>


                
                <View style={styles.logo}>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text>{auth.currentUser?.email}</Text>
                    </TouchableOpacity>
                </View>

                <Search/>

                <FlatList 
                    data={data} 
                    renderItem={({ item, index }) => {   
                    return (
                        <BarBox
                           item={item}
                           numComment={1}
                        />
                    );
                }}
                vertical
                keyExtractor={(bar) => bar.name}
                />


               

        </AppView>
        
    );
}
const styles = StyleSheet.create({
    logo: {
        alignItems: 'center',
    },
})


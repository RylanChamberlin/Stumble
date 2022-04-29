import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, ImageBackground, Text, ScrollView, FlatList, TouchableOpacity} from "react-native";
import { Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AppView from "../components/general/AppView";
import BarBox from "../components/BarScreen/BarBox";
import Search from "../components/BarScreen/Search";
import { auth } from "../firebase";
import { Entypo } from '@expo/vector-icons'; 
import useBars from "../hooks/useBars";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

    

        const [{data, loading, error}, getBars] = useBars();

        useEffect(() => {
            getBars();
        }, []);
        
        return (
            <AppView>


                
                <View style={styles.logo}>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text style={{color: '#ffff'}}>{auth.currentUser?.email}</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.container}> 
                <View>
                    <Text style={styles.title}>DRINK DEALS</Text>
                </View>
                <TouchableOpacity>
                <View style={styles.locationBox}>
                    <Text style={{color: '#f2f1f1', marginTop: 6}}>near </Text>
                    <Text style={{color: '#f2f1f1', marginTop: 5, textDecorationLine: 'underline', fontSize: 15}}>Columbia, MO 65201</Text>
                    <Entypo name="location-pin" size={24} color="#f2f1f1" />
                </View>
                </TouchableOpacity>
                </View>
                {/* <Search/> */}

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
                showsVerticalScrollIndicator={false}
                keyExtractor={(bar) => bar.name}
               
                />


               

        </AppView>
        
    );
}
const styles = StyleSheet.create({

    logo: {
        alignItems: 'center',
    },
    container:{
        marginTop: 15,
        alignItems: 'center',
    },
    title:{
        fontSize: 35,
        color: 'white',
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .6,
    },
    locationBox:{
        flexDirection: 'row',
        shadowColor: "black",
        shadowOffset: {width: 5, height: 5}, //gives shadow offset
        shadowOpacity: .5,
    }

})


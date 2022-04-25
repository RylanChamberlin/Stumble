import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, ImageBackground, Text, ScrollView, FlatList, TouchableOpacity} from "react-native";
import { Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AppView from "../components/AppView";
import BarBox from "../components/BarScreen/BarBox";
import Search from "../components/BarScreen/Search";
import { auth } from "../firebase";
import useBars from "../hooks/useBars";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarScreen(){




    // var axios = require('axios');
    // const api = 'AIzaSyCEjcZKWdGQlDnw5Pp5eNKnY5jN6RO0h5A';
    // var config = {
    // method: 'get',
    // url:    `https://maps.googleapis.com/maps/api/place/nearbysearch/json
    //         ?location=-33.8670522,151.1957362
    //         &radius=500
    //         &types=food
    //         &name=harbour
    //         &key=${api}`,
    // headers: { }
    // };

    // axios(config)
    // .then(function (response) {
    // console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    // console.log(error);
    // });



    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }


    const commonCategories = [
        { 
            name: "Willie's / FieldHouse",
            review_count: "432",
            specials: "$2 Tuesday ",
            events: "neon party",
            imageUrl: require('../assets/images/willies.jpeg'),
            milesAway: "2.4 miles away",
            moreInfo: "Willies is a large bar that many college students like to drink at. It offers a wide variety of bars, deals, and weekly events. ", 
            rentals: "Bottle Service, Private Rentals"
        },      
        { 
            name: "Harpos",
            review_count: "233",
            specials: "$2 Tuesday",
            events: "N/A",
            imageUrl: require('../assets/images/harpos.jpeg'),
            milesAway: "2.4 miles away",
            moreInfo: "Willies is a large bar that many college students like to drink at. It offers a wide variety of bars, deals, and weekly events. ", 
            rentals: "Bottle Service, Private Rentals"
        },
        { 
            name: "Campus Bar and Grill",
            review_count: "420",
            specials: "$2 Shots, $2 Seltzers",
            events: "Beer Pong",
            imageUrl: require('../assets/images/b12.jpeg'),
            milesAway: "2.4 miles away",
            moreInfo: "Willies is a large bar that many college students like to drink at. It offers a wide variety of bars, deals, and weekly events. ", 
            rentals: "Bottle Service, Private Rentals"
        },
        { 
            name: "Nash Vegas",
            review_count: "69",
            specials: "$3 Nash Vegas Bombs",
            events: "Live Music",
            imageUrl: require('../assets/images/nash.jpeg'),
            milesAway: "2.4 miles away",
            moreInfo: "Willies is a large bar that many college students like to drink at. It offers a wide variety of bars, deals, and weekly events. ", 
            rentals: "Bottle Service, Private Rentals"
        },
        { 
            name: "Shiloh's",
            review_count: "902",
            specials: "Bottomless Wings",
            events: "Bingo",
            imageUrl: require('../assets/images/shilos.jpeg'),
            milesAway: "2.4 miles away",
            moreInfo: "Willies is a large bar that many college students like to drink at. It offers a wide variety of bars, deals, and weekly events. ", 
            rentals: "Bottle Service, Private Rentals"
        },
        { 
            name: "The Understudy",
            review_count: "223",
            specials: "$2 Beer",
            events: "N/A",
            imageUrl: require('../assets/images/understudy.webp'),
            milesAway: "2.4 miles away",
            moreInfo: "Willies is a large bar that many college students like to drink at. It offers a wide variety of bars, deals, and weekly events. ", 
            rentals: "Bottle Service, Private Rentals"
        }
    ];

    const image = require('../assets/images/yeet.jpeg');


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


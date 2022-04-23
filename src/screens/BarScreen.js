import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, View, ImageBackground, Text, ScrollView, FlatList, TouchableOpacity} from "react-native";
import { Dimensions } from 'react-native';
import AppView from "../components/AppView";
import BarBox from "../components/BarScreen/BarBox";
import Search from "../components/BarScreen/Search";
import { auth } from "../firebase";


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

        return (
            <AppView>
                <View style={styles.logo}>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text>{auth.currentUser?.email}</Text>
                    </TouchableOpacity>
                </View>

                <Search/>

                <FlatList 
                    data={commonCategories} 
                    renderItem={({ item, index }) => {
                    return (
                        <BarBox
                            name={item.name} 
                            review_count={item.review_count}
                            specials = {item.specials}
                            events = {item.events}
                            imageUrl={item.imageUrl} 
                            milesAway={item.milesAway}
                            moreInfo={item.moreInfo}
                            rentals= {item.rentals}
                            //index = {index} 
                            //active={item.name === term} 
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


import { SafeAreaView, StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Image, Button, Pressable} from "react-native";
import StarButton from './StarButton';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from 'react';
import { Dimensions } from 'react-native';
import {elevation} from "../../common/styles";
import ShowMore from 'react-native-show-more-button';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarBox(){

    const [liked, setLiked] = useState(false);

    return (
        <View style = {styles.infoBox}>
            <View>
                <Text style = {styles.title}>Willie's / FieldHouse</Text>
                <View style = {styles.reviews}>
                    <StarButton/>
                    <StarButton/>
                    <StarButton/>
                    <StarButton/>
                    <StarButton/>
                    <Text style = {styles.reviewNumber}>1,294</Text>
                </View>

                <View style = {styles.specialsContainer}>
                    <Text style={styles.specialsTitle}>TODAY'S SPECIALS:</Text>
                    <Text style={styles.specialsText}>$2 Tuesday</Text>
                </View>

                <View style = {styles.eventContainer}>
                    <Text style={styles.eventTitle}>TODAY'S EVENTS:</Text>
                    <Text style={styles.eventText}>Neon Party</Text>
                </View>

                <TouchableOpacity onPress={() => console.warn('More Button pressed')}>
                    <View style = {styles.moreContainer}>
                        <Text style={styles.moreText}>more </Text>
                        
                        <Text style={styles.moreArrow}>ˇ</Text>
                    </View>
                </TouchableOpacity>

                
                

            </View>
            
            <View style={styles.infoBoxRight}>
                <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
                    <MaterialCommunityIcons
                        name={liked ? "heart" : "heart-outline"}
                        size={32}
                        color={liked ? "red" : "black"}
                    />
                </Pressable>
                <Image style = {styles.image} source={require('../../assets/images/willies.jpeg')}/>
                <TouchableOpacity onPress={() => console.warn('Simple Button pressed')}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>RESERVE</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      backgroundImage:{
        flex: 1,
    },
    logo: {
        alignItems: 'center',
    },
    elevation,
    searchBar: {
        marginTop: 5,
        marginHorizontal: 25,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 40,
    },
    resultHeader: {
        flexDirection: "row",
        marginTop: 25,
        marginHorizontal: 25
    },
    resultText: {
        fontWeight: "bold",
        marginRight: 75
        
    },
    filterByText: {
        marginLeft: 135,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 5
        
    },
    reviews: {
        marginTop: -4,
        flexDirection: "row",
        paddingLeft: 5,

    },
    reviewNumber: {
        padding: 2
    },

    specialsContainer: {
        padding: 5,
        marginLeft: 5,
        marginTop: 20
    },

    specialsTitle: {
        fontWeight: "bold",
    },
    specialsText: {

    },
    eventContainer: {
        marginLeft: 5,
        padding: 5,
        marginTop: 20
    },
    eventTitle: {
        fontWeight: "bold",
    },
    eventText: {

    },
    infoBox: {
        marginTop: 12,
        marginHorizontal: 15,
        borderRadius: 8,
        backgroundColor: "rgb(249,249,249)",
        flexDirection: "row",
        //borderWidth: 1
        width: windowWidth-30,
        height: windowHeight/4

    },

    moreContainer: {
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 15,
        
    },

    moreText: {
        fontSize: 12,
        fontWeight: "bold",
    },

    moreArrow: {
        marginTop: 4,
        fontWeight: "bold",
    },

    infoBoxRight: {
        flexDirection: "column",
        marginLeft: 3,
        alignItems: 'flex-end',
    },

    image: {
        width: 155,
        height: 115,
        marginVertical: 7,
        borderRadius: 5
    },
    buttonStyle: {
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth:1,
        backgroundColor: "white",
        
    },
    buttonTextStyle: {
        fontWeight: "bold",
        fontSize: 16
    },


})
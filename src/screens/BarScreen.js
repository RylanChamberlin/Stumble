
import { useState } from "react";
import { SafeAreaView, StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Image, Button, Pressable, ScrollView} from "react-native";
import {elevation} from "../common/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from 'react-native';
import StarButton from "../components/BarScreen/StarButton";
import BarBox from "../components/BarScreen/BarBox";
import ShowMore from "react-native-show-more-button";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BarScreen(){

    const image = require('../../src/assets/images/kel.png');


    const [input, setInput] = useState("")
    

    const handleEndEditing = () => {
        if(!input) return
        setInput("")
    }
    
    return (
        <View style={styles.container}>
            <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
            <SafeAreaView>

                <View style={styles.logo}>
                    <Text>Logo</Text>
                </View>


                <View style = {[styles.searchBar, styles.elevation]}>
                    <TextInput 
                        style = {styles.input} 
                        placeholder={'search by location...'}
                        value={input} 
                        onChangeText={(text) => {setInput(text);
                        }}
                        onEndEditing={handleEndEditing} 
                    />
                </View>

                <View style = {styles.resultHeader}>
                    <Text style = {styles.resultText}>RESULTS</Text>
                    <TouchableOpacity onPress= {() => console.warn("Press filter")}>
                        <Text style = {styles.filterByText}>FILTER BY</Text>
                    </TouchableOpacity>
                </View>
            
                <ScrollView>
                    <BarBox/>
                    <BarBox/>
                    <BarBox/>

                </ScrollView>
                

            </SafeAreaView>
            </ImageBackground>
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

    infoBoxRight: {
        flexDirection: "column",
        marginLeft: 10,
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


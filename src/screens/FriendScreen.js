import { useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonSwitch from "../components/ButtonSwitch";
import FriendBox from "../components/FriendBox";
import PostBox from "../components/PostBox";



export default function FriendScreen(){

    const image = require('../../src/assets/images/yeet.jpeg');
    

    return(
        <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View style={{alignItems: "center",}}>
                    <Text style={styles.title}>FRIENDS</Text>
                </View>

               <ButtonSwitch button1 = "RECENT" button2 = "SEARCH"/>
    
            </View>

            <ScrollView>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
            </ScrollView>

        </SafeAreaView>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
       
    },
    header:{
        height: "10%",
        justifyContent: "space-between",
        marginBottom: 10
        //backgroundColor: 'green',
    },
    title:{
        color: 'white',
        fontSize: 35,
    },
      backgroundImage:{
        flex: 1,
    },
    newPost:{

        alignItems: "center", 
        backgroundColor: 'white',
        borderRadius: 10
    }

})
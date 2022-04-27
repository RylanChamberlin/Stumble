import { useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppView from "../components/general/AppView";
import ButtonSwitch from "../components/general/ButtonSwitch";
import FriendBox from "../components/FriendScreen/FriendBox";



export default function FriendScreen(){
       

    return(
       
        <AppView>

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

        </AppView>
    );

}

const styles = StyleSheet.create({

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
    newPost:{

        alignItems: "center", 
        backgroundColor: 'white',
        borderRadius: 10
    }

})
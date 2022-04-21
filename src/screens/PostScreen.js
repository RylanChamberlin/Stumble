import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function PostScreen(){

    const image = require('../../src/assets/images/yeet.jpeg');
    const [recent, setRecent] = useState(true);

    return(
        <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
        <SafeAreaView style={styles.container}>

            <View style={{alignItems: "center",}}>
                <Text style={styles.title}>Posts</Text>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={[styles.recentButton,recent ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress = {() => {setRecent(!recent)}}>
                    <Text style= {[styles.buttonText,recent ? {color: 'black'} : {color: 'white'}]}>RECENT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.recentButton,!recent ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress = {() => {setRecent(!recent)}}>
                <Text style= {[styles.buttonText,!recent ? {color: 'black'} : {color: 'white'}]}>POPULAR</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>CREATE NEW POST</Text>
            </View>
        </SafeAreaView>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //
    },
    title:{
        color: 'white',
        fontSize: 35,
    },
      backgroundImage:{
        flex: 1,
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
    },
    recentButton: {
        
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 40,
    },
    buttonText:{
        fontSize:20, fontWeight: "bold",
    }

})
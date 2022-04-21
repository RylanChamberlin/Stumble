import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostBox from "../components/PostBox";



export default function PostScreen(){

    const image = require('../../src/assets/images/yeet.jpeg');
    const [recent, setRecent] = useState(true);

    return(
        <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View style={{alignItems: "center",}}>
                    <Text style={styles.title}>Posts</Text>
                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={[styles.recentButton,recent ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress = {() => {setRecent(false)}}>
                        <Text style= {[styles.buttonText,recent ? {color: 'black'} : {color: 'white'}]}>RECENT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.recentButton,!recent ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress = {() => {setRecent(true)}}>
                        <Text style= {[styles.buttonText,!recent ? {color: 'black'} : {color: 'white'}]}>POPULAR</Text>
                    </TouchableOpacity>
                </View>

                
                <TouchableOpacity style={styles.newPost}>
                    <Text style={styles.buttonText}>CREATE NEW POST</Text>
                </TouchableOpacity>
            </View>

            <PostBox/>
            <PostBox/>
            <PostBox/>
            <PostBox/>
            
            
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
        height: "15%",
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

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    recentButton: {
        
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 40,
    },
    buttonText:{
        fontSize:20, fontWeight: "bold",
    },
    newPost:{

        alignItems: "center", 
        backgroundColor: 'white',
        borderRadius: 10
    }

})
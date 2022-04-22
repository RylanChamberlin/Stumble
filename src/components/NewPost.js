import { useState } from "react";
import { Button, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 
import {elevation} from "../common/styles"


export default function NewPost({post, setPost}){

    const image = require('../../src/assets/images/yeet.jpeg');

    return(

       
        <GestureRecognizer
                style={{flex: 1}}
                onSwipeDown={() => setPost(!post)}
                >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={post}
                    //onRequestClose={() => setFilterBy(!filterBy)}
                >
        
                <ImageBackground style= { styles.backgroundImage } source={image} resizeMode='cover'>

                    <SafeAreaView style={styles.container}>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.title}>New Post</Text>
                            <TouchableOpacity onPress= {() => setPost(!post)} style={styles.exit}>
                                <Feather name="x" size={24} color="black"/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputBox}>
                            <TextInput placeholder='@ bar location' style = {styles.barInput}/>
                            <TextInput placeholder='Type SOMETHING........' style = {styles.textInput} multiline={true} numberOfLines={10}/>
                        </View>

                        <TouchableOpacity style={[styles.button, styles.elevation]}>
                            <Text style={styles.buttonText}>POST</Text>
                        </TouchableOpacity>
                    </SafeAreaView>

                    </ImageBackground>
                </Modal>
        </GestureRecognizer>

        
    );
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        marginHorizontal: 15,
      },
  
    title:{
        color: 'white',
        fontSize: 35,
    },
   
    inputBox: {
        padding: 15,
        justifyContent: 'space-between',
        height: "50%",
        borderRadius: 15,
        backgroundColor: 'lightgrey',
    },
   
    barInput: {
        padding: 5,
        fontSize: 20,
        borderRadius: 10,
        backgroundColor: "white"
    },

    textInput: {
     
        padding: 10,
        fontSize: 20,
        height: "85%",
        borderRadius: 10,
        textAlignVertical: "top",
        backgroundColor: 'white'
    },

    backgroundImage:{
        flex: 1,
    },

    button:{
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 230,
        marginTop: 5,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        
    },
    buttonText:{
        fontSize: 20,
        fontWeight: "bold"
    },
    elevation,

    exit: {
        alignSelf: 'flex-end',
        position: 'absolute',
        padding: 15
    }

})
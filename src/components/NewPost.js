import { useState } from "react";
import { Button, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 
import {elevation} from "../common/styles"
import { auth, db } from "../firebase";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


export default function NewPost({post, setPost}){

    const image = require('../../src/assets/images/yeet.jpeg');

    const [barInput, setBarInput] = useState("")
    const [input, setInput] = useState("")
    const [placeID, setPlaceID] = useState("")
    const [photoID, setPhotoID] = useState("")


    const handleEndEditing = () => {
        if(!input && !barInput) return
        setBarInput("")
        setInput("")
    }

    
    const writeMessage = async() => {

        const messagesRef = db.collection('messages');
        const {uid, photoURL} = auth.currentUser;
        await messagesRef.add({
        placeID: placeID, 
        bar: barInput,
        text: input,
        votes: 0,
        createdAt: new Date(),
        uid,
        });

    }

    const addNewBarWithMessage = async() => {
        db.collection('bars').doc(placeID).set({
            name: barInput,
            photoID: photoID
        });

        writeMessage();
        
        console.log("Making new document!");
    }

    const sendMessage = () => {

        setPost(!post);

        const docRef = db.collection("bars").doc(placeID);

        docRef.get().then((doc) => {
            if (doc.exists) {
                writeMessage();
            } else {
                addNewBarWithMessage();
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        handleEndEditing();
        
    }

    return(

       
        <GestureRecognizer
                style={{flex: 1}}
                onSwipeDown={() => setPost(!post)}
                >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={post}
                    onRequestClose={() => setPost(!post)}
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

                            
                            <GooglePlacesAutocomplete
                    
                                placeholder="Search"
                                fetchDetails={true}
                                GooglePlacesSearchQuery={{
                                    rankby: "distance"
                                }}
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    //console.log(data, details);
                                    //console.log(data.structured_formatting.main_text);
                                    console.log(data.place_id);
                                    
                                    setPhotoID(details.photos[0]?.photo_reference);
                                    setBarInput(data.structured_formatting.main_text);
                                    setPlaceID(data.place_id);
                                }}
                                query={{
                                    key: "AIzaSyCEjcZKWdGQlDnw5Pp5eNKnY5jN6RO0h5A",
                                    language: "en",
                                    components: "country:us",
                                    fields: ["name"],
                                    types: "bar",
                                    radius: 100,
                                    location: `38.951561, -92.328636`
                                }}
                                styles={{
                                    container: { 
                                        flex: 1,
                                        // borderRadius: 10,
                                        //backgroundColor: "black"
                                        },
                                    listView: { 
                                        backgroundColor: "white" 
                                        }
                                }}
                            />
                            {/* <TextInput 
                                placeholder='@ bar location' 
                                style = {styles.barInput}
                                value={barInput} 
                                onChangeText={(text) => {setBarInput(text);
                                }}
                                /> */}
                            <TextInput 
                                placeholder='Type SOMETHING........' 
                                style = {styles.textInput} 
                                multiline={true} 
                                numberOfLines={10}
                                value={input} 
                                onChangeText={(text) => {setInput(text);
                                }}
                            />
                        </View>

                        <TouchableOpacity style={[styles.button, styles.elevation]} onPress={sendMessage}>
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
        height: "75%",
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
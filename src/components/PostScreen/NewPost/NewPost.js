import { useState } from "react";
import { Button, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 
import {elevation} from "../../../common/styles"
import { auth, db, dbTime } from "../../../firebase";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {GOOGLE_KEY} from '@env'
import AppView from "../../general/AppView";
import PopupPost from "../../general/PopupPost/PopupPost";


export default function NewPost({post, setPost}){

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
        createdAt: dbTime,
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

        <PopupPost post={post} setPost={setPost} title={'NEW POST'} buttonTitle={'POST'} buttonAction={sendMessage}>
                            
        <GooglePlacesAutocomplete

            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
                rankby: "distance"
            }}
            onPress={(data, details = null) => {
                console.log(data.place_id);
                
                setPhotoID(details.photos[0]?.photo_reference);
                setBarInput(data.structured_formatting.main_text);
                setPlaceID(data.place_id);
            }}
            query={{
                key: `${GOOGLE_KEY}`,
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
                    //borderWidth: 1
                    },
                listView: { 
                    backgroundColor: "white", 
                    }
            }}
        />
        <TextInput 
            placeholder='Type SOMETHING........' 
            style = {styles.textInput} 
            multiline={true} 
            numberOfLines={10}
            value={input} 
            onChangeText={(text) => {setInput(text);
            }}
        />
        </PopupPost> 
    );
}

const styles = StyleSheet.create({

    textInput: {
        padding: 10,
        fontSize: 20,
        height: "75%",
        borderRadius: 10,
        textAlignVertical: "top",
        backgroundColor: 'white',
        borderWidth: 1
    },

})
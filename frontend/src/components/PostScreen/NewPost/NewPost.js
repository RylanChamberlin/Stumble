import { useEffect, useState } from "react";
import {Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import { auth, db, dbTime } from "../../../firebase";
import {GOOGLE_KEY} from '@env'
import PopupPost from "../../general/PopupPost/PopupPost";
import useLocation from "../../../hooks/useLocation";
import { useRef } from "react";
import styles from "./styles";


export default function NewPost({post, setPost}){

    const [barInput, setBarInput] = useState("");
    const [input, setInput] = useState("");
    const [placeID, setPlaceID] = useState("");
    const [photoID, setPhotoID] = useState("");
    const [nearby, setNearby] = useState("");

    const inputRef = useRef(null);
    const barInputRef = useRef(null);
    const [location, getLocation] = useLocation();

    useEffect(() => {
        getLocation();
    }, [])

    useEffect(() => {    
        //if coords are there fethc data
        if(location.data && barInput){
            const latitude = location.data.coords.latitude;
            const longitude = location.data.coords.longitude;
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=50000&type=bar&keyword=${barInput}&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setNearby(json)) 
            console.log('fetching nearby list search ' + {GOOGLE_KEY})
        }
    }, [barInput])


   
    // if(nearby){
    //     nearby.results.forEach(element => console.log(element.name));
    // }
 
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
        voteCount: 0,
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

        if (input.trim().length < 1) {
            Alert.alert('Error', 'Message cannot be empty');
            return;
        }else if(barInput.trim().length < 1){
            Alert.alert('Error', 'Bar input cannot be empty');
            return;
        }
        else{
    
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
        
    }

    const clickBarName = (data) => {
        
        console.log(data);  
        setPhotoID(data.photos[0]?.photo_reference);
        setBarInput(data.name)
        setNearby('')
        setPlaceID(data.place_id);
        console.log(barInput)
        inputRef.current.focus();
    }


    return(

        
        <PopupPost post={post} setPost={setPost} title={'NEW POST'} buttonTitle={'POST'} buttonAction={sendMessage}>
        <TextInput 
            ref={barInputRef}
            placeholder='@ bar location' 
            style = {styles.barInput} 
            maxLength = {100}
            value={barInput} 
            onPressIn={() => {setBarInput('')}}
            onChangeText={(text) => {setBarInput(text)}}
            
        />
        <TextInput 
            placeholder='Type SOMETHING........'
            ref = {inputRef} 
            style = {styles.textInput} 
            multiline={true} 
            maxHeight={300} 
            numberOfLines={3}
            maxLength = {256}
            value={input} 

            onChangeText={(text) => {
                setInput(text)    
            }}

        />
        <View style={styles.list}>
        <FlatList
            data={nearby.results}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => clickBarName(item)}>
                    <View style={{backgroundColor: 'white', borderWidth: 1, padding: 15,}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: '400'}}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
            // ItemSeparatorComponent={}
            keyExtractor={(item) => item.place_id}
            showsVerticalScrollIndicator={false} 
        /> 
        </View> 
        </PopupPost> 
    );
}

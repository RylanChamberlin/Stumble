import { useEffect, useState } from "react";
import {Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import { auth, db, dbTime } from "../../../firebase";
import {GOOGLE_KEY} from '@env'
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";
import { connect } from 'react-redux';

const geofire = require('geofire-common');

const NewPost = (props) => {

    const [barInput, setBarInput] = useState("");
    const [input, setInput] = useState("");
    const [placeID, setPlaceID] = useState("");
    const [photoID, setPhotoID] = useState("");
    const [nearby, setNearby] = useState("");
    const [barData, setBarData] = useState("");

    useEffect(() => {    
        if(props.currentUserLocation && barInput){
            const latitude = props.currentUserLocation.coords.latitude;
            const longitude = props.currentUserLocation.coords.longitude;
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=50000&type=bar&keyword=${barInput}&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setNearby(json)) 
            console.log('feethcing google nearby api')
        }

    }, [barInput])
  
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

    const addNewBarWithMessage = () => {

        console.log(barData.geometry.location)
        const lat = barData.geometry.location.lat;
        const lng = barData.geometry.location.lng;
        const hash = geofire.geohashForLocation([lat, lng]);

        console.log(hash)

        db.collection('bars').doc(placeID).set({
            name: barInput,
            photoID: photoID,
            // coords: GeoPoint(lat, lng),
            geohash: hash,
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
    
        props.setPost(!props.post);
        const docRef = db.collection("bars").doc(placeID);
        docRef.get().then((doc) => {
            if (doc.exists) {
                writeMessage();
            } else {
                console.log('adding bar')
                addNewBarWithMessage();
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        handleEndEditing();

        }
        
    }

    const clickBarName = (data) => {

        setBarData(data)
        if(data.photos){
            setPhotoID(data.photos[0]?.photo_reference);
        }
        setBarInput(data.name)
        setNearby('')
        setPlaceID(data.place_id);
       
        
    }


    return(

        <PopupPost post={props.post} setPost={props.setPost} title={'NEW POST'} buttonTitle={'POST'} buttonAction={sendMessage}>
        <TextInput 
            placeholder='@ bar location' 
            style = {[styles.barInput, !nearby ? {borderRadius: 10} : null]} 
            maxLength = {100}
            value={barInput} 
            onPressIn={() => {setBarInput('');setBarData('');setInput('')}}
            onChangeText={(text) => {setBarInput(text)}}
            
        />


        {!barData == '' ? 

        <TextInput 
            placeholder='Type SOMETHING........'
            style = {styles.textInput } 
            multiline={true} 
            maxHeight={300} 
            numberOfLines={3}
            maxLength = {256}
            value={input} 

            onChangeText={(text) => {
                setInput(text)    
            }}

        />

        :
        <View style={styles.list}>
        <FlatList
            data={nearby.results}
            renderItem={({ item }) => (
                <TouchableHighlight onPress={() => clickBarName(item)}>
                    <View style={{backgroundColor: 'white', borderWidth: 1, padding: 15,}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: '400'}}>{item.name}</Text>
                        <Text style={{fontSize: 10, color: 'grey', fontWeight: '300'}}>{item.vicinity}</Text>
                    </View>
                </TouchableHighlight>
            )}
            keyExtractor={(item) => item.place_id}
            showsVerticalScrollIndicator={false} 
        /> 
        </View> 

        }
        </PopupPost> 
    );
}


const mapStateToProps = (store) => ({
    currentUserLocation: store.userState.currentUserLocation
  })

export default connect(mapStateToProps)(NewPost);
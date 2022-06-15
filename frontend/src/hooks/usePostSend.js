import { useState } from "react";
import {Alert } from "react-native";
import { auth, db, dbTime } from "../firebase";

const geofire = require('geofire-common');

export default (props) => {

    const [isError, setIsError] = useState(false);
    const [bar, setBar] = useState({});
    const [barInput, setBarInput] = useState('');
    const [postInput, setPostInput] = useState("");

    const handleEndEditing = () => {
        if(!postInput && !barInput) return;
        setBarInput("")
        setPostInput("")
    }
    
    //writes post to firebase db
    const writeMessage = () => {
        db.collection('messages')
        .add({
            placeID: bar.place_id, 
            bar: bar.name,
            text: postInput,
            score: 0,
            voteCount: 0,
            createdAt: dbTime,
            uid: auth.currentUser.uid,
        });

    }

    const addNewBarWithMessage = () => {

        const lat = bar.geometry.location.lat;
        const lng = bar.geometry.location.lng;
        const hash = geofire.geohashForLocation([lat, lng]);
        db.collection('bars').doc(bar.place_id).set({
            name: bar.name,
            lat: lat,
            lng: lng,
            geohash: hash,
            rating: 0,
            postCount: 0,
            topPost: ''
        });

        writeMessage();

        console.log("Making new document!");
    }

    const sendMessage = () => {

        if (postInput.trim().length < 1) {
            Alert.alert('Error', 'Message cannot be empty');
            return;
        }else if(barInput.trim().length < 1){
            Alert.alert('Error', 'Bar input cannot be empty');
            return;
        }
        else{
    
            props.setPost(!props.post);

            const docRef = db.collection("bars").doc(bar.place_id);
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

    const clickBarName = (bar) => {
        setBar(bar);
        setBarInput(bar.name);
    }

    const clearState = () => {
        setBar({})
        setBarInput('');
        setPostInput('')
    }


    return {bar, barInput, postInput, clickBarName, sendMessage, setBarInput, setPostInput, clearState}

};

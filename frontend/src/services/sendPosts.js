import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { auth, db, dbTime } from "../firebase";
const geofire = require('geofire-common');


//writes post to firebase db
const writeMessage = (postInput, bar) => {

    console.log('creating post')
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

const addNewBarWithMessage = (postInput, bar) => {

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

    writeMessage(postInput, bar);

    console.log("Making new document!");
}

export const sendMessage = (postInput, bar) => {

    

    if (postInput.trim().length < 1) {
        Alert.alert('Error', 'Message cannot be empty');
        return false;
    }else if(!bar){
        Alert.alert('Error', 'Bar cannot be empty');
        return false;
    }
    else{

        console.log(bar.name)
        const docRef = db.collection("bars").doc(bar.place_id);
        docRef.get().then((doc) => {
            if (doc.exists) {
                writeMessage(postInput, bar);
            } else {
                console.log('adding bar')
                addNewBarWithMessage(postInput, bar);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        return true
    }
    
}
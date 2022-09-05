import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../firebase";
const geofire = require('geofire-common');


//writes post to firebase db
const writeMessage = async(postInput, bar) => {

    console.log('creating post')
    const docRef = await addDoc(collection(db, "messages"), {
        placeID: bar.id,
        city: bar.city,
        state: bar.state,
        country: bar.country,
        bar: bar.name,
        text: postInput,
        score: 0,
        voteCount: 0,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
        });

    console.log("Document written with ID: ", docRef.id);
    
}

const writeMessageWithApiData = async(postInput, bar) => {
    const [code, city, state, country] = bar.plus_code.compound_code.split(/[, ]+/);
    console.log('creating first post')
    
    const docRef = await addDoc(collection(db, "messages"), {
        placeID: bar.place_id,
        city: city,
        state: state,
        country: country,
        bar: bar.name,
        text: postInput,
        score: 0,
        voteCount: 0,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
    });
    
    console.log("Document written with ID: ", docRef.id);
}

const addNewBarWithMessage = async(postInput, bar) => {

    const lat = bar.geometry.location.lat;
    const lng = bar.geometry.location.lng;
    const hash = geofire.geohashForLocation([lat, lng]);

    const [code, city, state, country] = bar.plus_code.compound_code.split(/[, ]+/);

    await setDoc(doc(db, "bars", bar.place_id), {
        name: bar.name,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        geohash: hash,
        rating: 0,
        postCount: 0,
        topPost: ''
      });

    writeMessageWithApiData(postInput, bar);

    console.log("Making new document!");
}

export const sendMessage = async(postInput, bar) => {


    if (postInput.trim().length < 1) {
        Alert.alert('Error', 'Message cannot be empty');
        return false;
    }else if(!bar){
        Alert.alert('Error', 'Bar cannot be empty');
        return false;
    }
    else{
       
        const docRef = doc(db, "bars", bar.place_id)
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            let data = docSnap.data()
            data.id = docSnap.id;
            writeMessage(postInput, data);
        } else {
            console.log('adding bar')
            addNewBarWithMessage(postInput, bar);
        }
        

        return true
    }
    
}
import { useContext, useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { auth, db, dbTime } from "../../../firebase";
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";

import {GOOGLE_KEY} from '@env'
import useLocation from "../../../hooks/useLocation";
import { AppContext } from "../Context";


export default function CheckIn({post, setPost}){

    const [nearby, setNearby] = useState({})
    const [userDetails, setUserDetails] = useState('')
    const [check, setCheck] = useState({})
    const {location} = useContext(AppContext);
    
    //gets user info
    useEffect(() => {
        db.collection('users').doc(auth.currentUser.uid).get()
            .then(snapshot => setUserDetails(snapshot.data()))
    }, [])

    useEffect(() => {
        //if coords are there fethc data
        if(location.data){
            const latitude = location.data.coords.latitude;
            const longitude = location.data.coords.longitude;
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=50&type=bar&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setNearby(json)) 
            console.log('fetching nearby list')
        }
    }, [location])//if location changes get new nearby bar list

   

    //checks user into bar where they are at stored in firebase
    const checkIn = async() => {
        let data = location.data
        setPost(false);
        data.locationID = check.id
        data.locationName = check.name
        data.checkInTime = dbTime
        const userRef = db.collection('users').doc(auth.currentUser.uid);
        const res = await userRef.set({
            checkIn: data,
            }, { merge: true });
    }


    if(location.loading || !location.data) {
        return (<ActivityIndicator/>)
    }

    return(
        <PopupPost post={post} setPost={setPost} title={'CHECK-IN'} buttonTitle={'CHECK-IN'} buttonAction={checkIn}>

        <View style={styles.container}>
            <View style={styles.userBox}>
                <Image style={styles.image}/>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>{userDetails.name}</Text>
                    <Text style={styles.username}>@{userDetails.username}</Text>
                </View>
            </View>
            {/* <TextInput style={styles.input} placeholder='is at....'></TextInput> */}
            <Text style={{color: 'red'}}>NEARBY</Text>
            <FlatList
                data={nearby.results} 
                renderItem={({ item, index }) => {   
                return (
                    <TouchableOpacity style={[styles1.nameBox, check.id == item.place_id ? {backgroundColor: 'blue'} : {backgroundColor: 'white'}]} onPress={() => setCheck({id: item.place_id, name: item.name})}>
                        <Text style={styles.barName}>{item.name}</Text>
                    </TouchableOpacity>
                );
                }}
                vertical
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.place_id}
            />
            
            
            {/* <View style={styles.barnameBox}>
                <Text style={styles.barName}>Harpo's </Text>
                <Text style={styles.cityName}>Columbia, MO</Text>
            </View>
            <View style={styles.barnameBox}>
                <Text style={styles.barName}>The Shot Bar </Text>
                <Text style={styles.cityName}>Columbia, MO</Text>
            </View> */}
        </View>
        </PopupPost>        
    );
}


const styles1 = StyleSheet.create({
    nameBox: {
        padding: 10, 
        margin: 5,
        borderWidth: 1,
        borderRadius: 15
    }
})
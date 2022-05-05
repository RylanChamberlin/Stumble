import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { auth, db, dbTime } from "../../../firebase";
import useLocation from "../../../hooks/useLocation";
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";

import {GOOGLE_KEY} from '@env'
import useNearby from "../../../hooks/useNearby";



export default function CheckIn({post, setPost}){



    const [nearby, setNearby] = useState({})
    const [userDetails, setUserDetails] = useState('')
    const [check, setCheck] = useState({})

    useEffect(() => {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${38.9517}%2C${-92.3249}&radius=50&type=bar&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setNearby(json))
    }, [])

    useEffect(() => {
        db.collection('users').doc(auth.currentUser.uid).get()
            .then(snapshot => setUserDetails(snapshot.data()))
    }, [])

    const checkIn = async() => {

        setPost(false);
        const userRef = db.collection('users').doc(auth.currentUser.uid);
        const res = await userRef.set({
            locationID: check.id,
            locationName: check.name,
            checkInAt: dbTime
            }, { merge: true });
    }

    console.log(check)

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
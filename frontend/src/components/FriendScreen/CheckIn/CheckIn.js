import { useContext, useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { auth, db, dbTime, FieldValue } from "../../../firebase";
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";
import { connect } from 'react-redux';

import {GOOGLE_KEY} from '@env'



function CheckIn(props){

    const [check, setCheck] = useState({})
    const [bars, setBars] = useState('')

    const [location, setLocation] = useState({})
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    //gets user info and users location
    useEffect(() => {

        const { currentUser, currentUserLocation } = props;
        setUser(currentUser)
        setLocation(currentUserLocation)

        if(currentUserLocation){ 
            setLoading(false)
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentUserLocation.coords.latitude}%2C${currentUserLocation.coords.longitude}&radius=50&type=bar&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setBars(json)) 
            //console.log('fetching nearby list' + {GOOGLE_KEY})
        }

    }, [props.currentUser, props.currentUserLocation])


    //checks user into bar where they are at stored in firebase
    const checkIn = async() => {
        let data = location
        props.setPost(false);
        data.locationID = check.id
        data.locationName = check.name
        data.checkInTime = dbTime
        const userRef = db.collection('users').doc(auth.currentUser.uid);
        const res = await userRef.update({
            checkIn: data,
            });
    }

    if(loading || !user) {
        return <View><ActivityIndicator /><Text>CHECKINS</Text></View>;
    }

    return(
        <PopupPost post={props.post} setPost={props.setPost} title={'CHECK-IN'} buttonTitle={'CHECK-IN'} buttonAction={checkIn}>

        <View style={styles.container}>
            <View style={styles.userBox}>
                <Image style={styles.image}/>
                <View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.username}>@{user.username}</Text>
                </View>
            </View>
            <Text style={{color: 'red'}}>NEARBY</Text>
            <FlatList
                data={bars.results} 
                renderItem={({ item, index }) => {  
                    // console.log(item.geometry.location) 
                return (
                    <TouchableOpacity style={[styles.nameBox, check.id == item.place_id ? {backgroundColor: 'blue'} : {backgroundColor: 'white'}]} onPress={() => setCheck({id: item.place_id, name: item.name, locationTemp: item.geometry.location})}>
                        <Text style={styles.barName}>{item.name}</Text>
                    </TouchableOpacity>
                );
                }}
                vertical
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.place_id}
            />
        </View>
        </PopupPost>        
    );
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentUserLocation: store.userState.currentUserLocation
  })

export default connect(mapStateToProps)(CheckIn);
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useState } from 'react';
import { BlurView } from 'expo-blur';

import { auth, db } from '../../../firebase';
import { connect } from 'react-redux';

function MapBox(props) {

    const [showPeeps, setPeeps] = useState(false);
    const [peopleList, setPeopleList] = useState({})
    const [publicLocation, setPublicLocation] = useState(false);

    const [checkIns, setCheckIns] = useState(null);
    const [friends, setFriends] = useState('');
    const [region, setRegion] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        console.log('UseEffect MapBox')
        const {currentUserLocation, checkIns, currentUserFriends } = props;

        setCheckIns(checkIns);
        setFriends(currentUserFriends);

        if(currentUserLocation){
            console.log('settingregion')
            setLoading(false)
            setRegion({
                latitude: currentUserLocation.coords.latitude,
                longitude: currentUserLocation.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            }); 
        }

    },[props.currentUserLocation, props.checkIns])

   
    //gets a list of people that are at the same bar
    const showPeopleList = ({locationID, locationName}) => {
        const people = checkIns.filter(item => item.checkIn.locationID == locationID)
        setPeopleList(people)
        setPeeps(!showPeeps)
    }
    
    const friendData = (list) => {

        if(!friends) return null; 
        list = list.filter((item) => 
            friends.some((friend) => item.key == friend.id))
        return list
    }


    if(loading) {
        return <View><ActivityIndicator /><Text>MAPBOX-location</Text></View>;
    }

    
  return (
  
    <View style={styles.container}>


        <MapView style={styles.map} 
            initialRegion={region}
        >
            <Marker coordinate={region}>
                {/* <TouchableOpacity onPress = {() => setPeeps(!showPeeps)}>
                    <Image style={styles.image} />

                </TouchableOpacity> */}
            </Marker>

            {publicLocation ? 

            checkIns.map((marker, index) => (

                <Marker
                    key={marker.key}
                    coordinate={{latitude: marker.checkIn.coords.latitude,longitude: marker.checkIn.coords.longitude}}
                > 
                    <TouchableOpacity onPress = {() => showPeopleList(marker.checkIn)}>
                        <Image style={styles.image} />
                    </TouchableOpacity>
                </Marker>
            ))

            : friendData(checkIns)?.map((marker, index) => (

                <Marker
                    key={marker.key}
                    coordinate={{latitude: marker.checkIn.coords.latitude,longitude: marker.checkIn.coords.longitude}}
                > 
                    <TouchableOpacity onPress = {() => showPeopleList(marker.checkIn)}>
                        <Image style={styles.image} />
                    </TouchableOpacity>
                </Marker>
                ))
            }

        </MapView>


        <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.Button,publicLocation ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress={() =>  setPublicLocation(false)}>
                    <Text style={[styles.buttonText,publicLocation ? {color: 'black'} : {color: 'white'}]}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Button,!publicLocation ? {backgroundColor: 'white'} : {backgroundColor: 'black'}]} onPress={() => setPublicLocation(true)}>
                    <Text style={[styles.buttonText,!publicLocation ? {color: 'black'} : {color: 'white'}]}>Public</Text>
                </TouchableOpacity>
        </View>
        
        <GestureRecognizer
            style={{}}
            onSwipeDown={() => setPeeps(!showPeeps)}
            >
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPeeps}
                onRequestClose={() => setPeeps(!showPeeps)}
            >
            
             <BlurView intensity={5} style={{flex: 1, paddingTop: 200}}>
                <FlatList
                    data={peopleList}
                    renderItem={({ item }) => (
                            <View style={styles.box}>
                                <Image style={styles.image} />
                                <Text style={{fontSize: 30, flex:1, marginLeft: 10}}>{item.name}</Text>
                                <View style={{flexDirection: 'column', alignItems: "flex-end", padding: 5}}>
                                    <TouchableOpacity>
                                        <Ionicons name="person-add-sharp" size={24} color="black" style={{marginBottom: 15}}/>
                                    </TouchableOpacity>
                                    <Text>{new Date(item.checkIn.checkInTime.seconds *1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                                </View>
                            </View>
                    )}
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
                /> 
            </BlurView> 
            </Modal>
        </GestureRecognizer>


        

    </View>



    

    
  )
}


const mapStateToProps = (store) => ({
    currentUserLocation: store.userState.currentUserLocation,
    checkIns: store.usersState.checkIns,
    currentUserFriends: store.userState.currentUserFriends
  })

export default connect(mapStateToProps)(MapBox);


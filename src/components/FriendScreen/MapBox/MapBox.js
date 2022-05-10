import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Image, FlatList } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useState } from 'react';
import { useEffect } from 'react';

import useLocation from '../../../hooks/useLocation';
import useCheckIns from '../../../hooks/useCheckIns';
import { useContext } from 'react';
import { AppContext } from '../Context';

export default function MapBox() {

    const [showPeeps, setPeeps] = useState(false);
    const [peopleList, setPeopleList] = useState({})
    const {location, userCheckIns} = useContext(AppContext);
    

    if(location.loading || !location.data || userCheckIns.loading || !userCheckIns.data) {
        return (<ActivityIndicator/>)
    }


    const region = {
        latitude: location.data.coords.latitude,
        longitude: location.data.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    }


    //gets a list of people that are at the same bar
    const showPeopleList = ({locationID, locationName}) => {
        // console.log(locationID, locationName)
        // console.log(userCheckIns.data)
        const people = userCheckIns.data.filter(item => item.checkIn.locationID == locationID)
        setPeopleList(people)
        console.log(peopleList)
        setPeeps(!showPeeps)
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

            {userCheckIns.data.map((marker, index) => (
                <Marker
                    key={marker.key}
                    coordinate={{latitude: marker.checkIn.coords.latitude,longitude: marker.checkIn.coords.longitude}}
                > 
                    <TouchableOpacity onPress = {() => showPeopleList(marker.checkIn)}>
                        <Image style={styles.image} />
                    </TouchableOpacity>
                </Marker>
            ))}

        </MapView>

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
            <View style={{marginTop: 200, padding: 100}}>
                <FlatList
                    data={peopleList}
                    
                    
                    renderItem={({ item }) => (
                        
                            <View style={styles.box}>
                                <Text>{item.name}</Text>
                            </View>
                    
                    )}
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
                />  
            </View>
            
            </Modal>
        </GestureRecognizer>

    </View>
  )
}



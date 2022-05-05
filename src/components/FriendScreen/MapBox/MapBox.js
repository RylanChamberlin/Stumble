import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useState } from 'react';
import { useEffect } from 'react';

import useLocation from '../../../hooks/useLocation';

export default function MapBox() {

    const [showPeeps, setPeeps] = useState(false);

    const [{data, loading, error}, getLocation] = useLocation();
    useEffect(() => {
        getLocation();
    }, []);

    const region = {
        latitude: data?.coords.latitude,
        longitude: data?.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    }

    if(loading) return (<ActivityIndicator/>)

  return (
    <View style={styles.container}>


        <MapView style={styles.map} 
            initialRegion={region}
        >


            <Marker coordinate={region}>
                <TouchableOpacity onPress = {() => setPeeps(!showPeeps)}>
                    <Ionicons name="people" size={40} color="black" />
                </TouchableOpacity>
            </Marker>

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
                <View style={{alignItems: "center", marginTop: 200, marginHorizontal: 15}}>
                    <View style={styles.box}>
                        <Text>Rylan is here</Text>
                    </View>
                </View>
            </Modal>
        </GestureRecognizer>

    </View>
  )
}


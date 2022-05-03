import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useState } from 'react';

export default function MapBox() {

    const [showPeeps, setPeeps] = useState(false);

    const region = {
        latitude: 38.9517,
        longitude: -92.3249,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    }
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


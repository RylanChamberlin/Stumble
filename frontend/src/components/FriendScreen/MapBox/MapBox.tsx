import { View, Text, TouchableOpacity, Modal, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import styles from './styles'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import Loader from '../../general/Loader';
import { useAppSelector } from '../../../app/hooks';
import useUsers from '../../../hooks/useUsers';

function MapBox(props: any) {

    const [showPeeps, setPeeps] = useState(false);
    const [peopleList, setPeopleList] = useState<any>([])
    const [region, setRegion] = useState<any>();

   
    const location = useAppSelector(state => state.location.coords)

    useEffect(() => {
        if(location){
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            }); 
        }
        
    },[location])

    
    //gets a list of people that are at the same bar
    const showPeopleList = ({locationID}: {locationID: string}) => {
        const people = props.data.filter((item: any) => item.checkIn?.locationID == locationID)
        setPeopleList(people)
        setPeeps(!showPeeps)
    }


    const personItem = (item: any) => { 
        return (
            <View style={styles.box}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{new Date(item.checkInTime.seconds *1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
            </View>
        );
    }

  if(props.isLoading || !location.coords) {
    return  <Loader/>
  }

  return (
  
    <View style={styles.container}>


        <MapView style={styles.map} 
            initialRegion={region}
        >
            <Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}>
                {/* <TouchableOpacity onPress = {() => setPeeps(!showPeeps)}>
                    <Image style={styles.image} />

                </TouchableOpacity> */}
            </Marker>

            {

            props.data.map((marker: any) => {

                console.log(marker)
                console.log('\n\n\n')

                if(marker.checkIn==null) return null;
                if(marker.photoURL==null){
                    marker.photoURL = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
               
                return (
                   <Marker
                        key={marker.uid}
                        coordinate={{latitude: marker.checkIn.location.coords.latitude, longitude: marker.checkIn.location.coords.longitude}}
                    > 
                    <TouchableOpacity onPress = {() => showPeopleList(marker.checkIn)}>
                        <Image source={{uri: marker.photoURL}} style={styles.image} />
                    </TouchableOpacity>
                </Marker>
               
                );
            })

            
            }

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
            
            <BlurView intensity={5} style={styles.blurBackground}>
                <FlatList
                    data={peopleList}
                    renderItem={({ item, index }) => {
                        return(personItem(item));
                    }}
                    keyExtractor={(item) => item.uid}
                    showsVerticalScrollIndicator={false}
                /> 
            </BlurView> 
            </Modal>
        </GestureRecognizer>
    </View>   
  )
}

export default MapBox;


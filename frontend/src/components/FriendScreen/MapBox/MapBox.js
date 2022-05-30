import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'; 
import styles from './styles'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { connect } from 'react-redux';

function MapBox(props) {

    const [showPeeps, setPeeps] = useState(false);
    const [peopleList, setPeopleList] = useState({})
    const [friends, setFriends] = useState({});
    const [region, setRegion] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const {currentUserLocation, currentUserFriendsData } = props;

        setFriends(currentUserFriendsData);
        if(currentUserLocation){
            setLoading(false)
            setRegion({
                latitude: currentUserLocation.coords.latitude,
                longitude: currentUserLocation.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            }); 
        }

    },[props.currentUserLocation, props.currentUserFriendsData])

   
    //gets a list of people that are at the same bar
    const showPeopleList = ({locationID, locationName}) => {
        const people = friends.filter(item => item.checkIn?.locationID == locationID)
        setPeopleList(people)
        setPeeps(!showPeeps)
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

            {

            friends.map((marker, index) => {

                if(marker.checkIn==null) return;
                return (
                <Marker
                    key={marker.uid}
                    coordinate={{latitude: marker.checkIn.coords.latitude,longitude: marker.checkIn.coords.longitude}}
                > 
                    <TouchableOpacity onPress = {() => showPeopleList(marker.checkIn)}>
                        <Image style={styles.image} />
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
    currentUserFriendsData: store.userState.currentUserFriendsData
  })

export default connect(mapStateToProps)(MapBox);


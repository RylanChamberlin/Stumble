import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import styles from './styles'
import GestureRecognizer from 'react-native-swipe-gestures';
import { useState } from 'react';
import { BlurView } from 'expo-blur';
import { connect } from 'react-redux';
import Loader from '../../general/Loader';

function MapBox(props) {

    const [showPeeps, setPeeps] = useState(false);
    const [peopleList, setPeopleList] = useState({})
    const [friends, setFriends] = useState({});
    const [region, setRegion] = useState();
    const [loading, setLoading] = useState(true);
    // const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

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
        return  <Loader/>
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

                if(marker.photoURL==null){
                    marker.photoURL = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                return (
                <Marker
                    key={marker.uid}
                    coordinate={{latitude: marker.checkIn.coords.latitude,longitude: marker.checkIn.coords.longitude}}
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
            
             <BlurView intensity={5} style={{flex: 1, paddingTop: 200}}>
                <FlatList
                    data={peopleList}
                    renderItem={({ item, index }) => {
                        return(
                            <View style={styles.box}>
                                <Text style={{fontSize: 30, flex:1, marginLeft: 10, padding: 5}}>{item.name}</Text>
                                <Text>{new Date(item.checkInTime.seconds *1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                            
                            </View>
                        );
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


const mapStateToProps = (store) => ({
    currentUserLocation: store.userState.currentUserLocation,
    currentUserFriendsData: store.userState.currentUserFriendsData
  })

export default connect(mapStateToProps)(MapBox);


import {Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AppView from "../components/general/AppView";
import FriendBox from "../components/FriendScreen/FriendBox";
import Header from "../components/FriendScreen/Header";
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, Feather } from '@expo/vector-icons'; 

import { useState } from "react";
import GestureRecognizer from "react-native-swipe-gestures";




export default function FriendScreen(){

    const [feed, setFeed] = useState(true);
    const [showPeeps, setPeeps] = useState(false);

    const region = {
        latitude: 38.9517,
        longitude: -92.3249,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    }
       
    return(
       
        <AppView>
            <Header feed={feed} setFeed={setFeed}/>

            {feed ? 

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

                </View>
            :

                <ScrollView>
                    <FriendBox/>
                    <FriendBox/>
                    <FriendBox/>
                </ScrollView>
            }
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

                
            

           

        </AppView>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      marginBottom: 10
      
    },
    map: {
      width: '100%',
      height: '100%',
      borderRadius: 20
    },

    title:{
        color: 'white',
        fontSize: 35,
    },

    box:{
        width: '85%',
        padding: 15,
        backgroundColor: '#f2f1f1',
        borderWidth: 1,
        borderRadius: 10
    },
   
  
  });
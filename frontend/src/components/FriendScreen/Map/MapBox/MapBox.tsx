import { View, Text, TouchableOpacity, Modal, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import styles from './styles'
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MapList from '../MapList';
import { useAppSelector } from '../../../../app/hooks';
import Loader from '../../../general/Loader';
import useUsers from '../../../../hooks/useUsers';

const MapBox = () => {

    const [showPeeps, setPeeps] = useState(false);
    const [peopleList, setPeopleList] = useState([])
    const [region, setRegion] = useState<any>();
    const [title, setTitle] = useState('');
    const {isLoading, isError, data} = useUsers();

    //const { data: bars, error, isLoading, isFetching, isSuccess, refetch } = useGetBarsByLocationQuery();
    const location = useAppSelector(state => state.location.coords)

    useEffect(() => {
        if(location.coords){
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            }); 
        }
        
    },[location])

    //gets list of bars people are at and the names and location
    const makeList = () => {

        const people = data.map((p: any) => p.checkIn)
        const uniqueIds = new Set();
        const bars = people.filter((element: any) => {
            if(element == undefined) return;
            const isDuplicate = uniqueIds.has(element.locationID);
            uniqueIds.add(element.locationID);

            if (!isDuplicate) {
                return true;
            }
            return false;
        });
    
       return bars
        
    }

    
    const showFriendsAtBar = (id: string, name: string) => {
        const people = data.filter((item: any) => item.checkIn?.locationID == id)
        setPeopleList(people)
        setPeeps(!showPeeps)
        setTitle(name)
    }

    const activeBars = makeList().map((marker: any) => {
        const people = data.filter((item: any) => item.checkIn?.locationID == marker.locationID);
        if (!people.length) return; //only shows if people are at bar
        return (
            <Marker key={marker.locationID} coordinate={{ latitude: marker.lat, longitude: marker.lng }}>
                <Text>{people.length}</Text>
                <TouchableOpacity onPress={() => showFriendsAtBar(marker.locationID, marker.locationName)}>
                    <MaterialCommunityIcons name="beer" size={29} color="black" />
                </TouchableOpacity>
            </Marker>
        );
    });

    


    if(isLoading) {
        return  <Loader/>
    }

    return (
  
    <View style={styles.container}>
        <MapView style={styles.map} initialRegion={region}>
            <Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}/>
            {activeBars}
        </MapView>
        <MapList setPeeps={setPeeps} showPeeps={showPeeps} friends={peopleList} title={title} />

    </View>   
  )
}

export default MapBox;


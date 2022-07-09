import { View, Text, TouchableOpacity, Modal, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import styles from './styles'
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MapList from '../MapList';
import { useGetBarsByLocationQuery } from '../../../../services/bars';
import { useAppSelector } from '../../../../app/hooks';
import Loader from '../../../general/Loader';

function MapBox(props: any) {

    const [showPeeps, setPeeps] = useState(false);
    const [peopleList, setPeopleList] = useState([])
    const [region, setRegion] = useState<any>();
    const [title, setTitle] = useState('');

    const { data: bars, error, isLoading, isFetching, isSuccess, refetch } = useGetBarsByLocationQuery();
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


    const showFriendsAtBar = (id: string, name: string) => {
        const people = props.data.filter((item: any) => item.checkIn?.locationID == id)
        setPeopleList(people)
        setPeeps(!showPeeps)
        setTitle(name)
        console.log(id)
    }

    const activeBars = bars.map((marker: any) => {
        const people = props.data.filter((item: any) => item.checkIn?.locationID == marker.key);
        if (!people.length) return; //only shows if people are at bar
        return (
            <Marker key={marker.key} coordinate={{ latitude: marker.lat, longitude: marker.lng }}>
                <Text>{people.length}</Text>
                <TouchableOpacity onPress={() => showFriendsAtBar(marker.key, marker.name)}>
                    <MaterialCommunityIcons name="beer" size={29} color="black" />
                </TouchableOpacity>
            </Marker>
        );
    });


    if(props.isLoading) {
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


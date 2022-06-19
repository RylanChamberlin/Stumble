import {useEffect } from "react";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View} from "react-native";
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";
import { useAppSelector } from "../../../app/hooks";
import useNearby from "../../../hooks/useNearby";

type location = {
    coords: coords
    timestamp: number
}

type coords = {
    accuracy: number
    altitude: number
    altitudeAccuracy: number
    heading: number
    latitude: number
    longitude: number
    speed: number
}

type checkIn = {
    location: location
    locationID: string
    locationName: string

    name: string
    vicinity: string
    place_id: string
}

type bar = {
    name: string
    place_id: string
    locationID: string
}


type Props = { 
    post: boolean
    setPost: (arg0: boolean) => void,
 }; 

function CheckIn(props:Props){

    const [checkSpot, setCheckSpot] = useState<checkIn | bar>()

    const location = useAppSelector(state => state.location.coords);
    const user = useAppSelector(state => state.location.info);
    const {data: bars, isLoading, searchNearbyPhone, checkIn} = useNearby();

    useEffect(() => {
        setCheckSpot(user?.checkIn)
    },[])

    useEffect(() => {
        searchNearbyPhone(50);
    }, [location])

    const postCheckIn = () => {
        props.setPost(false);
        checkIn(checkSpot)
    }

    const barList = (item: bar) => {
        console.log(item)
        return (
            <TouchableOpacity style={[styles.nameBox, checkSpot?.place_id == item.place_id || checkSpot?.locationID == item.place_id ? {backgroundColor: 'blue'} : {backgroundColor: 'white'}]} onPress={() => setCheckSpot(item)}>
                <Text style={styles.barName}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    if (isLoading || !user) {
        return  null
      }

    return(
        <PopupPost post={props.post} setPost={props.setPost} title={'CHECK-IN'} buttonTitle={'CHECK-IN'} buttonAction={postCheckIn}>
        <View style={styles.container}>
            <View style={styles.userBox}>
                <View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.username}>@{user.username}</Text>
                </View>
            </View>
            <Text style={styles.nearby}>NEARBY</Text>
            <FlatList
                data={bars} 
                renderItem={({ item, index }) => barList(item)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: bar) => item.place_id}
            />
        </View>
        </PopupPost>        
    );
}


export default CheckIn;
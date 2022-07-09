import { FC, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import timeSince from "../../../../services/timeSince";

import styles from "./styles";

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
 
}

type user = {
    checkIn: checkIn
    checkInCount: number
    checkInTime: any
    name: string
    photoURL: string
    upvoteTotal: number
    username: string

}

type FriendBoxProps = {
    item: user
}



const FriendBox: FC<FriendBoxProps>= ({item}) => {

    if (item.checkIn == null) return null;

    const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    useEffect(() => {
        if (item?.photoURL) {
            setAvatar(item.photoURL);
        }
    },[] )
    
    return(
        <View style={styles.container}>  
            <Image source={{uri: avatar}} style={styles.image}/>   
            <View style = {styles.textContainer}>
                <Text>{item.name} is at</Text>
                <Text style = {styles.location}>{item.checkIn.locationName}</Text>
            </View>
            <View style = {styles.rightContainer}>
                <Text>{item.checkInTime ? timeSince(item.checkInTime.seconds) : 'Now' }</Text>
            </View>
        </View>
    );
}

export default FriendBox
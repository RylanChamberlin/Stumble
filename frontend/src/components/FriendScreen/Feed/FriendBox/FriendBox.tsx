import { FC, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import timeSince from "../../../../services/timeSince";
import Loader from "../../../general/Loader";

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

    const [avatar, setAvatar] = useState("placeholder");
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (item.photoURL) {
            setAvatar(item.photoURL);
        }else{
            setAvatar("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
        }
    },[] )

    
    return(
        <View style={styles.container}> 


            <View style={{}}>
            <Image 
                source={{uri: avatar}} 
                //resizeMode={"contain"}
                style={styles.image}
                onLoadStart={() => {
                    setLoading(true)
                }}
                onLoadEnd={() => {
                    setLoading(false);
                }}
            />   
            
                <ActivityIndicator style={styles.activityIndicator} animating={isLoading}/>
           
             </View>
             
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
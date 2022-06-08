import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import timeSince from "../../../../services/timeSince";
import LikeButton from "../../../general/LikeButton";
import styles from "./styles";

export default function FriendBox({item}){

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
                <Text style = {{fontWeight: "bold"}}>{item.checkIn?.locationName}</Text>
            </View>
            <View style = {styles.rightContainer}>
                <Text>{item.checkInTime ? timeSince(item.checkInTime.seconds) : 'Now' }</Text>
                {/* <Text>{item.checkInAt.seconds = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text> */}
            </View>
        </View>
    );
}

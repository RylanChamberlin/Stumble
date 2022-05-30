import { StyleSheet, Text, View } from "react-native";
import timeSince from "../../../../services/timeSince";
import LikeButton from "../../../general/LikeButton";
import styles from "./styles";

export default function FriendBox({item}){

    if (item.checkIn == null) return null;

    return(
        <View style={styles.container}>  
            <View style={styles.image}></View>   
            <View style = {styles.textContainer}>
                <Text>{item.name} is at</Text>
                <Text style = {{fontWeight: "bold"}}>{item.checkIn?.locationName}</Text>
            </View>
            <View style = {styles.rightContainer}>
                <Text>{item.checkIn.checkInTime ? timeSince(item.checkIn?.checkInTime.seconds) : 'Now' }</Text>
                {/* <Text>{item.checkInAt.seconds = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text> */}
            </View>
        </View>
    );
}

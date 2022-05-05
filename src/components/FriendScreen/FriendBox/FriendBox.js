import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import useCheckIns from "../../../hooks/useCheckIns";
import LikeButton from "../../general/LikeButton";

export default function FriendBox({item}){


    function timeSince(seconds) {

        var date = new Date(seconds*1000)
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;
      
        if (interval >= 2) {
          return Math.floor(interval) + " years ago";
        }
        if (interval > 1) {
            return Math.floor(interval) + " year ago";
          }
        interval = seconds / 2592000;
        if (interval >= 2) {
          return Math.floor(interval) + " months ago";
        }
        if (interval > 1) {
            return Math.floor(interval) + " month ago";
          }
        interval = seconds / 86400;
        if (interval >= 2) {
          return Math.floor(interval) + " days ago";
        }
        if (interval > 1) {
            return Math.floor(interval) + " day ago";
          }
        interval = seconds / 3600;
        if (interval >= 2) {
            
          return Math.floor(interval) + " hours ago";
        }
        if (interval > 1) {
            return Math.floor(interval) + " hour ago";
          }
        interval = seconds / 60;
        if (interval >= 2) {
          return Math.floor(interval) + " minutes ago";
        }
        if (interval > 1) {
            
            return Math.floor(interval) + " minute ago";
            
          }
        return Math.floor(seconds) + " seconds ago";
      }
    

    return(
        <View style={styles.container}>  
            <View style={styles.image}></View>   
            <View style = {styles.textContainer}>
                <Text>{item.name} is at</Text>
                <Text style = {{fontWeight: "bold"}}>{item.locationName}</Text>
            </View>
            <View style = {styles.rightContainer}>
                <LikeButton/>
                <Text>{item.checkInAt ? timeSince(item.checkInAt.seconds) : 'Now' }</Text>
                {/* <Text>{item.checkInAt.seconds = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text> */}
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5

    }, 
    image:{
        //flex: 1,
        height: 50,
        width: 50,
        backgroundColor: 'blue',
        borderRadius: 50/2,
        marginLeft: 10,
        marginVertical: 5,
        
    },
    textContainer: {
        flex:1,
        paddingVertical: 12,
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    rightContainer: {
        alignItems: "flex-end",
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingRight: 5
    }
})
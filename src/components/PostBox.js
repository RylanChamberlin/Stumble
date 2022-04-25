import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Entypo } from '@expo/vector-icons'; 
import { useState } from "react";
import { database, db, FieldValue } from "../firebase";

export default function PostBox({item}){

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
    
    const incrementVote = async() => {
        const userRef = db.collection('messages').doc(item.key);
        const increment = FieldValue.increment(1); 
        userRef.update({ votes: increment });
    }

    const decrementVote = async() => { 
        const userRef = db.collection('messages').doc(item.key);
        const decrement = FieldValue.increment(-1); 
        userRef.update({ votes: decrement });
    }

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={{paddingBottom: 15, fontSize: 20}}>{item.text}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style = {{fontWeight: 'bold'}}>at {item.bar} </Text>
                    <Text style = {{fontWeight: '200'}}>{timeSince(item.createdAt?.seconds)}</Text>
                    
                </View>
            </View>

            <View style={styles.likeContainer}>
                <TouchableOpacity onPress={incrementVote}>
                    <Entypo 
                        name="plus" 
                        size={24} 
                        color="black"
                    />
                </TouchableOpacity>

                <Text style = {{marginTop: 5}}>{item.votes}</Text>

                <TouchableOpacity onPress={decrementVote}>
                    <Entypo 
                        name="minus" 
                        size={24} 
                        color="black" 
                    />
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        marginVertical: 5
    },
    textContainer: {
        flexDirection: 'column',
        width: "90%"
    },
    likeContainer: {
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    }
})
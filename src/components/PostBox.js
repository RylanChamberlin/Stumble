import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Entypo } from '@expo/vector-icons'; 
import { useState } from "react";
import { database, db, FieldValue } from "../firebase";

export default function PostBox({item}){

    const getTime = (seconds) => {
        let time = new Date(seconds*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        return time;
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
                <Text style = {{fontWeight: 'bold'}}>At {item.bar} {getTime(item.createdAt?.seconds)}</Text>
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
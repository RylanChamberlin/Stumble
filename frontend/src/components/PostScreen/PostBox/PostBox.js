import {Text, TouchableOpacity, View } from "react-native";


import { Entypo } from '@expo/vector-icons'; 
import { auth, db, FieldValue } from "../../../firebase";
import timeSince from "../../../services/timeSince";
import styles from "./styles";

export default function PostBox({item}){
  
    const incrementVote = async() => {
        const userRef = db.collection('messages').doc(item.key);
        const increment = FieldValue.increment(1); 
        userRef.update({ 
            voteCount: increment, 
            votes: auth.currentUser.uid

        }); 

        console.log(item.key)
        db
            .collection("messages")
            .doc(item.key)
            .collection("votes")
            .doc(auth.currentUser.uid)
            .set({
                upvote: true
            })

    }
    const decrementVote = async() => { 
        const userRef = db.collection('messages').doc(item.key);
        const decrement = FieldValue.increment(-1); 
        userRef.update({ voteCount: decrement });

        db
        .collection("messages")
        .doc(item.key)
        .collection("votes")
        .doc(auth.currentUser.uid)
        .delete()

    }

    return(
        <View style={[styles.container, styles.elevation]}>
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

                <Text style = {{marginTop: 5}}>{item.voteCount}</Text>

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

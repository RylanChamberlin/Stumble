import {Text, TouchableOpacity, View } from "react-native";


import { Entypo } from '@expo/vector-icons'; 
import { auth, db, FieldValue } from "../../../firebase";
import timeSince from "../../../services/timeSince";
import styles from "./styles";
import { useEffect, useState } from "react";

export default function PostBox({item}){

    const [currentUserLike, setCurrentUserLike] = useState(false)
    const [currentUserDislike, setCurrentUserDislike] = useState(false)
    const [voteCount, setVoteCount] = useState(0)
    
    useEffect(() => {
        
        setVoteCount(item.voteCount)
        db
            .collection("messages")
            .doc(item.key)
            .collection("upvotes")
            .doc(auth.currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    let vote = snapshot.data()
                    if(vote.isVote){
                        setCurrentUserLike(true)
                        setCurrentUserDislike(false)
                    }else{
                        setCurrentUserLike(false)
                        setCurrentUserDislike(true)
                    }
                    
                }else{
                    setCurrentUserLike(false)
                    setCurrentUserDislike(false)
                }
                
            })
    },[])
  
    const incrementVote = () => {

        console.log('incrementVote')

        if(currentUserLike == false){

            if(currentUserDislike == true){

                setVoteCount(voteCount+2);
                db
                .collection("messages")
                .doc(item.key)
                .collection("upvotes")
                .doc(auth.currentUser.uid)
                .update({
                    isVote: true,
                })
                
            }else{
                setVoteCount(voteCount+1);

                db
                .collection("messages")
                .doc(item.key)
                .collection("upvotes")
                .doc(auth.currentUser.uid)
                .set({
                    isVote: true,
                })

            }
            setCurrentUserLike(true)
            setCurrentUserDislike(false)

            console.log('upvoted')
            
            }
    }
    const decrementVote = async() => { 
        
        if(currentUserDislike == false){
            console.log('downvoted')

            if(currentUserLike == true){
                setVoteCount(voteCount-2);

                db
                .collection("messages")
                .doc(item.key)
                .collection("upvotes")
                .doc(auth.currentUser.uid)
                .update({
                    isVote: false,
                })

            }else{
                setVoteCount(voteCount-1);

                db
                .collection("messages")
                .doc(item.key)
                .collection("upvotes")
                .doc(auth.currentUser.uid)
                .set({
                    isVote: false,
                })
            }
            
            setCurrentUserLike(false)
            setCurrentUserDislike(true)

            // db
            // .collection("messages")
            // .doc(item.key)
            // .collection("upvotes")
            // .doc(auth.currentUser.uid)
            // .set({
            //     isVote: false,
            // })
        }

    }

    return(
        <View style={[styles.container, styles.elevation]}>
            <View style={styles.textContainer}>
                <Text style={{paddingBottom: 10, fontSize: 20}}>{item.text}</Text>
                <View style={{flexDirection: 'row', marginTop: 'auto'}}>
                    <Text style = {{fontWeight: 'bold', maxWidth: '65%'}}>at {item.bar} </Text>
                    <Text style = {{fontWeight: '200'}}>{timeSince(item.createdAt?.seconds)}</Text>
                </View>
            </View>

            <View style={styles.likeContainer}>


                <TouchableOpacity onPress={incrementVote}>
                    <Entypo 
                        name="plus" 
                        size={24} 
                        color={ currentUserLike ? "red" : "black"}
                    />
                </TouchableOpacity>


                <Text style = {{marginTop: 5}}>{voteCount}</Text>

                <TouchableOpacity onPress={decrementVote}>
                    <Entypo 
                        name="minus" 
                        size={24} 
                        color={currentUserDislike ? "red" : "black"} 
                    />
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

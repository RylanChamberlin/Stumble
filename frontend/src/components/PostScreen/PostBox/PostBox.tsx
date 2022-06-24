import {Text, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import timeSince from "../../../services/timeSince";
import styles from "./styles";
import useVotes from "../../../hooks/useVotes";

export type dateTime = {
    nanoseconds: number,
    seconds: number
}

export type Props = {
    item: Post
}

export type Post = { 
    bar: string
    createdAt: dateTime
    key: string
    text: string
    uid: string
    voteCount: number
    votes: number,
  }

export default function PostBox(props: Props){

    const {userLike, userDislike, voteCount , incrementVote, decrementVote} = useVotes(props.item);

    return(
        <View style={[styles.container, styles.elevation]}>
            <View style={styles.textContainer}>
                <Text style={styles.postText}>{props.item.text}</Text>
                <View style={styles.bottomTextInfo}>
                    <Text style = {styles.barName}>at {props.item.bar} </Text>
                    <Text style = {styles.date}>{timeSince(props.item.createdAt?.seconds)}</Text>
                </View>
            </View>

            <View style={styles.likeContainer}>
                <TouchableOpacity onPress={incrementVote}>
                    <Entypo name="plus" size={24} color={ userLike ? "red" : "black"}/>
                </TouchableOpacity>
                 <Text style={styles.voteCount}>{voteCount}</Text>

                <TouchableOpacity onPress={decrementVote}>
                    <Entypo name="minus" size={24} color={userDislike ? "red" : "black"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

import {Text, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import styles from "./styles";
import { FC, Props } from "react";
import useVotes from "../../../../hooks/useVotes";
import timeSince from "../../../../services/timeSince";

export type dateTime = {
    nanoseconds: number,
    seconds: number
}

export type PostBoxProps = {
    post: Post
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

const PostBox: FC<PostBoxProps> = ({post}) => {

    const {userLike, userDislike, voteCount, isLoadingDownvote, isLoadingUpvote , incrementVote, decrementVote} = useVotes(post);

    return(
        <View style={[styles.container, styles.elevation]}>
            <View style={styles.textContainer}>
                <Text style={styles.postText}>{post.text}</Text>
                <View style={styles.bottomTextInfo}>
                    <Text style = {styles.barName}>at {post.bar} </Text>
                    <Text style = {styles.date}>{timeSince(post.createdAt?.seconds)}</Text>
                </View>
            </View>

            <View style={styles.voteContainer}>
                <TouchableOpacity onPress={incrementVote} disabled={isLoadingUpvote}>
                    <Entypo name="plus" size={24} color={ userLike ? "red" : "black"}/>
                </TouchableOpacity>
                 <Text style={styles.voteCount}>{voteCount}</Text>

                <TouchableOpacity onPress={decrementVote} disabled={isLoadingDownvote}>
                    <Entypo name="minus" size={24} color={userDislike ? "red" : "black"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PostBox
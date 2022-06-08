import {  Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'

const FriendBox = (props) => {

    const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    useEffect(() => {
        if (props.photoURL) {
            setAvatar(props.photoURL);
        }
    },[] )

    return (
        <View style={styles.friend}>

            {props.photoURL &&
                <Image source={{uri: avatar}} style={styles.image}></Image>
            }
            <View style={styles.name}>
                <Text>{props.name}</Text>
                <Text>@{props.username}</Text>
            </View>
        </View>   
    )
    }

export default FriendBox

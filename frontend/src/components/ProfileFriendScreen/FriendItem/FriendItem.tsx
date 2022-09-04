import {  Image, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import styles from './styles'


type Props = {  
    photoURL?: string
    name: string
    username: string
}

const FriendItem: FC<Props> = (props) => {

    const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    useEffect(() => {
        if (props.photoURL) {
            setAvatar(props.photoURL);
        }
    },[] )

    return (
        <View style={styles.friend}>
            <Image source={{uri: avatar}} style={styles.image}/>
            <View style={styles.name}>
                <Text>{props.name}</Text>
                <Text>@{props.username}</Text>
            </View>
        </View>   
    )
    }

export default FriendItem
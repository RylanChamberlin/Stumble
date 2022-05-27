import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { auth, db } from '../../../firebase'
import useFriends from '../../../hooks/useFriends'







const FriendBox = (props) => {

    return (
        <View style={styles.friend}>
            <View style={styles.image}></View>
            <View style={styles.name}>
                <Text>{props.name}</Text>
                <Text>@{props.username}</Text>
            </View>
        </View>   
    )
    }

export default FriendBox

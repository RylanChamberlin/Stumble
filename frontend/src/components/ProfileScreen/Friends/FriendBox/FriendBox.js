import {  Text, View } from 'react-native'
import React from 'react'
import styles from './styles'

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

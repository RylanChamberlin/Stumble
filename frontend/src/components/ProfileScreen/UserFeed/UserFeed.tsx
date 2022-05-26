

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import timeSince from '../../../services/timeSince'

const UserFeed = () => {
  return (
    <View style={styles.container}>  
        <View style={styles.image}></View>   
        <View style = {styles.textContainer}>
            <Text>James Richard like your check-in</Text>
            <Text style = {{fontWeight: "bold"}}></Text>
        </View>
        <View style = {styles.rightContainer}>
            <Text>{0 ? timeSince() : 'Now' }</Text>
            {/* <Text>{item.checkInAt.seconds = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text> */}
        </View>
    </View>
  )
}

export default UserFeed
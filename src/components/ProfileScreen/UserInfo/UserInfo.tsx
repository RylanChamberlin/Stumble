

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../screens/RootStackPrams';



type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'UserInfo'>;

const UserInfo = () => {

    const navigation = useNavigation<UserScreenProp>()
    // navigates to user friends
    const clickFriends = () => {
        navigation.navigate('UserFriends')
    }


  return (
    <View style={styles.container}>
    <View style={styles.image}></View>

    <View style={styles.textContainer}>

        <Text style={styles.name}>Rylan Chamberlin</Text>
        <Text style={styles.username}>@prett.boy.3</Text>

        <View style={styles.statContainer}>

            <View style={styles.statCircle}>
                <Text>12</Text>
                <Text>checkins</Text>
            </View>
            <View style={styles.statCircle}>
                <Text>245</Text>
                <Text>upvotes</Text>
            </View>

            <TouchableOpacity onPress={() => {clickFriends()}}>
            <View style={styles.statCircle}>
                <Text>12</Text>
                <Text>friends</Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  )
}

export default UserInfo
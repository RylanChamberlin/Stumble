

import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../firebase';



// type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'UserInfo'>;

const UserInfo = () => {

    const [userData, setUserData] = useState('');

    const navigation = useNavigation()

    // navigates to user friends
    const clickFriends = () => {
        navigation.navigate('UserFriends')
    }

    useEffect( () => {
        getData()
    },[])

    const getData = async() => {
        const ref = db.collection('users')
        const snapshot = await ref.doc(auth.currentUser.uid).get();
        setUserData(snapshot.data());
    }

  return (
    <View style={styles.container}>
    <View style={styles.image}></View>

    <View style={styles.textContainer}>

        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.username}>@{userData.username}</Text>

        <View style={styles.statContainer}>

            <View style={styles.statCircle}>
                <Text>{userData.checkInCount ? userData.checkInCount : 0}</Text>
                <Text>checkins</Text>
            </View>
            <View style={styles.statCircle}>
                <Text>{userData.upVoteTotal ? userData.upVoteTotal : 0}</Text>
                <Text>upvotes</Text>
            </View>

            <TouchableOpacity onPress={() => {clickFriends()}}>
            <View style={styles.statCircle}>
                <Text>{userData.friendTotal ? userData.friendTotal : 0}</Text>
                <Text>friends</Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  )
}

export default UserInfo


import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';



// type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'UserInfo'>;

const UserInfo = (props) => {

    const [user, setUser] = useState('');
    const navigation = useNavigation()

    // navigates to user friends
    const clickFriends = () => {
        navigation.navigate('UserFriends')
    }

    useEffect( () => {
        const { currentUser } = props;
        setUser(currentUser)

    },[props.currentUser])


    if(!user){
        return <Text>Loading</Text>
    }


  return (
    <View style={styles.container}>
    <View style={styles.image}></View>

    <View style={styles.textContainer}>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>

        <View style={styles.statContainer}>

            <View style={styles.statCircle}>
                <Text>{user.checkInCount ? user.checkInCount : 0}</Text>
                <Text>checkins</Text>
            </View>
            <View style={styles.statCircle}>
                <Text>{user.upVoteTotal ? user.upVoteTotal : 0}</Text>
                <Text>upvotes</Text>
            </View>

            <TouchableOpacity onPress={() => {clickFriends()}}>
            <View style={styles.statCircle}>
                <Text>{user.friendTotal ? user.friendTotal : 0}</Text>
                <Text>friends</Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
  })

export default connect(mapStateToProps)(UserInfo);
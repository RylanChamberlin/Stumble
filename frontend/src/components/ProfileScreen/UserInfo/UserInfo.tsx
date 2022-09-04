

import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { useAppSelector } from '../../../app/hooks';
import { pickAvatar } from '../../../services/profileHelpers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Loader from '../../general/Loader';
import { RootStackParamList } from '../../../navigation/types';

type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'ProfileFriendScreen'>;

const UserInfo = () => {

    const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    const [hasAvatar, setHasAvatar] = useState(false);
    const user = useAppSelector(state => state.location.info);
    const navigation = useNavigation<UserScreenProp>()
   
    useEffect( () => {

        if (user?.photoURL) {
            setAvatar(user.photoURL);
            setHasAvatar(true)
         }
         return () => {
            console.log('unmount userInfo: ')
          }
    },[user])

     // navigates to user friends
     const clickFriends = () => {
        navigation.navigate('ProfileFriendScreen')
    }

    if(!user) return (<Loader/>)

    return (
    <>
    <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => pickAvatar(setAvatar)}>
            <Image source={{uri: avatar}} style={styles.image}/>
            {!hasAvatar && <Ionicons name="ios-add" size={40} color="#FFF"></Ionicons>}
        </TouchableOpacity>

        <View style={styles.textContainer}>
            <View style={styles.sectionContainer}>
                <View style={styles.text}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text>@{user.username}</Text>
                </View>
               
            </View>
        </View>

        <TouchableOpacity onPress={() => {clickFriends()}} style={styles.friendButton}>
            <Text>Friends</Text>
        </TouchableOpacity>
    </View>

    <View style = {styles.postButton}>
        <Text style = {styles.postText}>My Posts</Text>
    </View>
    </>
  )
}


export default UserInfo;
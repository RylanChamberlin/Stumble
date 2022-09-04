

import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useAppSelector } from '../../../app/hooks';
import Loader from '../../general/Loader';

const UserInfo = () => {

    const user = useAppSelector(state => state.location.info);
   
    if(!user) return (<Loader/>)

    return (
    <>
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <View style={styles.sectionContainer}>
                <View style={styles.text}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text>@{user.username}</Text>
                </View>
               
            </View>

            <Text>Check In Location:</Text>
            <TouchableOpacity>
                <Text style={styles.checkinSpot}>{user.checkIn ? user.checkIn.locationName: 'Nowhere Right Now'}</Text>
            </TouchableOpacity>
        </View>
    </View>

    <View style = {styles.postButton}>
        <Text style = {styles.postText}>My Posts</Text>
    </View>
    </>
  )
}


export default UserInfo;
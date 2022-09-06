import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'; 
import { useAppSelector } from '../../../app/hooks';

const Header = () => {

    const place = useAppSelector(state => state.location.place);

    return (
        <View style={styles.container}> 
            <Text style={styles.title}>BARS NEAR </Text>
            <Text style={styles.title}>{place.city}, {place.state}</Text>
            {/* <TouchableOpacity style={styles.locationBox}>
            <Text style={styles.buttonText}>within 10 miles</Text>
            <Entypo name="location-pin" size={24} color="#f2f1f1" />
            </TouchableOpacity> */}
        </View>
    )
}

export default Header;
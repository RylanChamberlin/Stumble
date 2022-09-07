import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { useAppSelector } from '../../../app/hooks';

const Header = () => {

    const place = useAppSelector(state => state.location.place);

    return (
        <View style={styles.container}> 
            <Text style={styles.title}>BARS NEAR </Text>
            <Text style={styles.city}>{place.city}, {place.state}</Text>
            {/* <TouchableOpacity style={styles.locationBox}>
            <Text style={styles.buttonText}>within 10 miles</Text>
            <Entypo name="location-pin" size={24} color="#f2f1f1" />
            </TouchableOpacity> */}
        </View>
    )
}

export default Header;
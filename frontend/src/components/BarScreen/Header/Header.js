import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'; 

const Header = () => {

  return (
    <View style={styles.container}> 
        <Text style={styles.title}>DRINK DEALS</Text>
        <TouchableOpacity>
            <View style={styles.locationBox}>
                <Text style={{color: '#f2f1f1', marginTop: 6}}>near </Text>
                <Text style={{color: '#f2f1f1', marginTop: 5, textDecorationLine: 'underline', fontSize: 15}}>Columbia, MO 65201</Text>
                <Entypo name="location-pin" size={24} color="#f2f1f1" />
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default Header
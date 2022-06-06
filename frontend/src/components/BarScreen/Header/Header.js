import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'; 

import { connect } from 'react-redux';

const Header = () => {

  return (
    <View style={styles.container}> 
        <Text style={styles.title}>BARS NEAR ME</Text>
        <TouchableOpacity>
            <View style={styles.locationBox}>
                {/* <Text style={{color: '#f2f1f1', marginTop: 6}}>within 10 miles of you</Text> */}
                <Text style={{color: '#f2f1f1', marginTop: 5, textDecorationLine: 'underline', fontSize: 15}}>within 10 miles</Text>
                <Entypo name="location-pin" size={24} color="#f2f1f1" />
            </View>
        </TouchableOpacity>
    </View>
  )
}


export default Header;
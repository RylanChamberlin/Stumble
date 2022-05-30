import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'; 

import { connect } from 'react-redux';

const Header = (props) => {

  useEffect(() => {
    console.log(props.currentUserLocation)
  },[])

  return (
    <View style={styles.container}> 
        <Text style={styles.title}>Bars</Text>
        <TouchableOpacity>
            <View style={styles.locationBox}>
                <Text style={{color: '#f2f1f1', marginTop: 6}}>within 10 miles</Text>
                <Text style={{color: '#f2f1f1', marginTop: 5, textDecorationLine: 'underline', fontSize: 15}}>Columbia, MO 65201</Text>
                <Entypo name="location-pin" size={24} color="#f2f1f1" />
            </View>
        </TouchableOpacity>
    </View>
  )
}


const mapStateToProps = (store) => ({
  currentUserLocation: store.userState.currentUserLocation, 
})


export default connect(mapStateToProps)(Header);
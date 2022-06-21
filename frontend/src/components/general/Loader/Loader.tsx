import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './styles'

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
    </View>
  )
}

export default Loader
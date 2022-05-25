import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import useUsers from '../../../hooks/useUsers';
import styles from './styles';
import FriendBox from '../FriendBox';
import { auth, db } from '../../../firebase';
import { sendRequest } from '../../../services/FriendRequestHelpers';

const SendRequest = (props) => {

  return (
    <View style = {styles.innerBox}>
      <Text>Send Request</Text>
        <FlatList
          data={props.data}
          renderItem={({ item, index }) => {
              return (
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                      <FriendBox name = {item.name} username = {item.username}/>
                      <TouchableOpacity onPress={() => sendRequest(item)} style={styles.acceptButton}>
                          <Text>Add</Text>
                      </TouchableOpacity>
                  </View>
                )
              }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
    </View>
  )
}

export default SendRequest


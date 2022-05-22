import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import useUsers from '../../../hooks/useUsers';
import styles from './styles';
import FriendBox from '../FriendBox';
import { auth, db } from '../../../firebase';
import { sendRequest } from '../../../services/FriendRequestHelpers';

const SendRequest = (props) => {

  const [{data, loading, error}, getUsers] = useUsers();

  useEffect(() => {
    getUsers();
    console.log('getting users')
  }, []);


  //filters 
  const search = (userData) => {
    userData = userData?.filter((item) => !props.data.find(({ key }) => item.key === key));//filters out friends that have already sent requests
    userData = userData?.filter((item) => item.key != auth.currentUser.uid) // filters out current user
    return userData?.filter((item) => item.username.toLowerCase().includes(props.query.toLowerCase()) || item.name.toLowerCase().includes(props.query.toLowerCase())).map(({name, username, key}) => ({name, username, key}));
  };

  return (
    <View style = {styles.innerBox}>
      <Text>Send Request</Text>
        <FlatList
          data={search(data)}
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
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
        />
    </View>
  )
}

export default SendRequest


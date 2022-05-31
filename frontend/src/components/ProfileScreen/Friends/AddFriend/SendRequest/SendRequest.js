import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import FriendBox from '../../FriendBox';
import { auth, db } from '../../../../../firebase';
import { sendRequest, acceptRequest } from '../../../../../services/FriendRequestHelpers';
import { connect } from 'react-redux';

const SendRequest = (props) => {


  const [friends, setFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
 
  useEffect(() => {
    //filters out users that user has already sent a friend request too
    const userNotSent = props.data.filter(function(objFromA) { 
      return !props.currentUserFriendRequestsSent.find(function(objFromB) {
        return objFromA.id === objFromB.id
      })
    })

    //filters out users that are already friends
    const usersWithoutFriends = userNotSent.filter(function(objFromA) { 
      return !props.currentUserFriends.find(function(objFromB) {
        return objFromA.id === objFromB.id
      })
    })

    //filters out current user
    const users = usersWithoutFriends.filter(function(el) { return el.id != auth.currentUser.uid; }); 


    setFriends(users)
    setFriendRequests(props.currentUserFriendRequests)

  },[props.currentUserFriendRequestsSent, props.currentUserFriends, props.currentUserFriendRequests])

  const acceptOrAdd = (id) => { 

    let found = true;
    friendRequests.some(el => {
      if(el.id == id){
        found = false
      }
    })
  
    return found;
  }

  return (
    <View style = {styles.innerBox}>
      <Text>Send Request</Text>
        <FlatList
          data={friends}
          renderItem={({ item, index }) => {
              return (
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                      <FriendBox name = {item.name} username = {item.username}/>

                      {
                        acceptOrAdd(item.id) ?
                        <TouchableOpacity onPress={() => sendRequest(item)} style={styles.acceptButton}>
                          <Text>Add</Text>
                        </TouchableOpacity> : 
                        
                        <TouchableOpacity onPress={() => acceptRequest(item.id)} style={styles.acceptButton}>
                          <Text>Accept</Text>
                        </TouchableOpacity>
                      
                      }
                     

                  </View>
                )
              }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
    </View>
  )
}




const mapStateToProps = (store) => ({
  currentUserFriendRequestsSent: store.userState.currentUserFriendRequestsSent, 
  currentUserFriendRequests: store.userState.currentUserFriendRequests,
  currentUserFriends: store.userState.currentUserFriends
})


export default connect(mapStateToProps)(SendRequest);


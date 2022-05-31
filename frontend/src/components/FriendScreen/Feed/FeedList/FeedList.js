import { FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import FriendBox from '../FriendBox'
import { connect } from 'react-redux';
import Loader from '../../../general/Loader';


function FeedList (props) {

  const [friends, setFriends] = useState({})
  
  useEffect(() => {
        setFriends(props.currentUserFriendsData);
  }, [props.currentUserFriendsData])


  if (!friends) {
    return  <Loader/>
  }

  return (
    <FlatList
      data={friends}

      renderItem={({ item }) => (
        
        <FriendBox item = {item}/>
      )}
      keyExtractor={(item) => item.uid}
      showsVerticalScrollIndicator={false}
    />  

  )
}

const mapStateToProps = (store) => ({
  currentUserFriendsData: store.userState.currentUserFriendsData
})

export default connect(mapStateToProps)(FeedList);
import { FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import FriendBox from '../FriendBox'
import { connect } from 'react-redux';


function FeedList (props) {

  const [friends, setFriends] = useState({})
  
  useEffect(() => {
        setFriends(props.currentUserFriendsData);
  }, [props.currentUserFriendsData])


  if (!friends) {
    return <View><ActivityIndicator /><Text>FEEDLIST</Text></View>;
  }

  return (
    <FlatList
      data={friends}

      renderItem={({ item }) => (
        
        <FriendBox item = {item}/>
      )}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
    />  

  )
}

const mapStateToProps = (store) => ({
  currentUserFriendsData: store.userState.currentUserFriendsData
})

export default connect(mapStateToProps)(FeedList);
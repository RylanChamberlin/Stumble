import { FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
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

  const renderItem = useCallback(
    ({ item, index }) => <FriendBox item = {item}/>,
    []
    );
  const keyExtractor = useCallback( (item) => item.uid, []);

  return (
    <FlatList
      data={friends}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />  

  )
}

const mapStateToProps = (store) => ({
  currentUserFriendsData: store.userState.currentUserFriendsData
})

export default connect(mapStateToProps)(FeedList);
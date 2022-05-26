import { FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import FriendBox from '../FriendBox'
import { connect } from 'react-redux';


function FeedList (props) {

  const [checkIns, setCheckIns] = useState({});
  
  useEffect(() => {
        setCheckIns(props.checkIns);
  }, [props.checkIns])


  if (!checkIns) {
    return <View><ActivityIndicator /><Text>FEEDLIST</Text></View>;
  }

  return (
    <FlatList
      data={checkIns}

      renderItem={({ item }) => (
        <FriendBox item = {item}/>
      )}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
    />  

  )
}

const mapStateToProps = (store) => ({
  checkIns: store.usersState.checkIns
})

export default connect(mapStateToProps)(FeedList);
import { FlatList} from 'react-native'
import React, { FC, useCallback } from 'react'
import FriendBox from '../FriendBox'
import Loader from '../../../general/Loader';

type FeedListProps = {
  isLoading: boolean
  data: User[]
}

type User = {
  name: string
  username: string
  photoURL: string
  uid: string
}


const FeedList: FC<FeedListProps>= (props) => {

  const renderItem = useCallback (({ item }) => <FriendBox item = {item}/>,[]);
  const keyExtractor = useCallback( (item) => item.uid, []);

  if (props.isLoading) {
    return  <Loader/>
  }

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />  
  )
}


export default FeedList;
import { FlatList} from 'react-native'
import React, { useCallback } from 'react'
import FriendBox from '../FriendBox'
import Loader from '../../../general/Loader';
import useUsers from '../../../../hooks/useUsers';


function FeedList () {

  const {isLoading, isError, data} = useUsers();
   
  const renderItem = useCallback (({ item }) => <FriendBox item = {item}/>,[]);
  const keyExtractor = useCallback( (item) => item.uid, []);

  if (isLoading) {
    return  <Loader/>
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />  

  )
}


export default FeedList;
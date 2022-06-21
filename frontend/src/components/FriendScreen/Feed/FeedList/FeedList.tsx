import { FlatList} from 'react-native'
import React, { useCallback } from 'react'
import FriendBox from '../FriendBox'
import Loader from '../../../general/Loader';
import useUsers from '../../../../hooks/useUsers';


function FeedList (props: any) {

  // const {isLoading, isError, data} = useUsers();

  //console.log(data)
   
  const renderItem = useCallback (({ item }) => <FriendBox item = {item}/>,[]);
  const keyExtractor = useCallback( (item) => item.uid, []);

  if (props.isLoading || !props.data) {
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
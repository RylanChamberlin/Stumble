import { FlatList} from 'react-native'
import React, { useCallback } from 'react'
import FriendBox from '../FriendBox'
import Loader from '../../../general/Loader';
import useUsers from '../../../../hooks/useUsers';
import EmptyList from '../../../general/EmptyList';

const FeedList= () => {

  const {isLoading, isError, data} = useUsers();

  const renderItem = useCallback (({ item }: any) => <FriendBox item = {item}/>,[]);
  const keyExtractor = useCallback( (item: any) => item.uid, []);
  const listEmptyComponent = () => {return <EmptyList name={'Your Feed is Empty'}/>}

  if (isLoading) {
    return  <Loader/>
  }

  return (
    <FlatList
      data={data}
      ListEmptyComponent={listEmptyComponent}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />  
  )
}


export default FeedList;
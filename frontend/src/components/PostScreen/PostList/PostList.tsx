import {FlatList, RefreshControl } from 'react-native'
import React, { useCallback , useState } from 'react'
import { useEffect } from 'react';
import PostBox from '../PostBox';
import Loader from '../../general/Loader';
import useMessages from '../../../hooks/useMessages';

type Props = {
  itemID: null
  order: string
  field: string
}

function PostList(props: Props){

  const [version, setVersion] = useState(0)
  const {isLoading, isError, data, isMore, fetchMoreMessages, reload, refresh} = useMessages(props.itemID, 'createdAt', props.field, version);

  const fetchMoreData = () => {
    console.log('fetch meee')
    isMore && fetchMoreMessages();
  }

  const renderItem = useCallback(({ item, index }) => {return (<PostBox item = {item}/>)},[]);
  const onRefresh = useCallback(() => {setVersion(v => v + 1)}, []);
  const renderLoader = () => { return isMore ? <Loader/> : null}
  const keyExtractor = useCallback( (item) => item.key, []);

  // if(!data) return <Loader/>

  return (
    <FlatList
    contentContainerStyle={{marginBottom: 300}}
    data={data}
    renderItem={renderItem}
    refreshControl={
      <RefreshControl
        refreshing={isLoading}
        onRefresh={onRefresh}
      />
    }
    keyExtractor={keyExtractor}
    ListFooterComponent={renderLoader}
    showsVerticalScrollIndicator={false}
    onEndReachedThreshold={0.2}
    onEndReached={fetchMoreData}
    
/>  
  )
}

export default PostList;
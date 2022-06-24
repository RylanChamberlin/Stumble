import {FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import PostBox from '../PostBox';
import Loader from '../../../general/Loader';
import useMessages from '../../../../hooks/useMessages';

type Props = {
  itemID?: any
  field?: string
}

function PopularPostList(props: Props){

  const [version, setVersion] = useState(0)
  const {isLoading, isError, data, isMore, fetchMoreMessages, reload, refresh} = useMessages(props.itemID, 'score', props.field, version);

  const fetchMoreData = () => {
    console.log('fetch meee')
    isMore && fetchMoreMessages();
  }

  const renderItem = useCallback(({ item, index }) => {return (<PostBox post = {item}/>)},[]);
  const onRefresh = useCallback(() => {setVersion(v => v + 1)}, []);
  const renderLoader = () => { return isMore ? <Loader/> : null}
  const keyExtractor = useCallback( (item) => item.key, []);
  
    return (
      <FlatList
      contentContainerStyle={{marginBottom: 300}}
      data={data}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={false}
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
export default PopularPostList;
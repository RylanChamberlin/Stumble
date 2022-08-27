import {FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import PostBox from '../PostBox';
import Loader from '../../../general/Loader';
import useMessages from '../../../../hooks/useMessages';
import EmptyList from '../../../general/EmptyList';
import { useIsFocused } from '@react-navigation/native';

type Props = {
  itemID?: any
  field?: string

}

function PopularPostList(props: Props){

  const {isLoading, isError, data,  getMessages, getMore, isMoreLoading} = useMessages(props.itemID,'score', props.field);

//   const isFocused = useIsFocused();

//     useEffect(() => {
//         isFocused && getMessages()
//       },[isFocused]);
    

  const fetchMoreData = () => {
    !isMoreLoading && getMore();
  }

  const renderItem = useCallback(({ item, index }) => {return (<PostBox post = {item}/>)},[]);
  const renderFooter = () => {return isMoreLoading ? <Loader/> : null}
  const onRefresh = () => { getMessages() }
  const keyExtractor = useCallback( (item) => item.key, []);
  const listEmptyComponent = () => {return <EmptyList name={'No Posts Nearby'}/>}

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      }
      keyExtractor={keyExtractor}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={listEmptyComponent}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreData}
    
  />  
  )
}
export default PopularPostList;
import {ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import React, { useCallback , useEffect, useState } from 'react'
import Loader from '../../../general/Loader';
import useMessages from '../../../../hooks/useMessages';
import PostBox from '../PostBox';

type Props = {
  itemID?: any
  order: string
  field: string
}

function RecentPostList(props: Props){

  const {isLoading, isError, data,  getMessages, getMore, isMoreLoading} = useMessages(props.itemID, props.order, props.field);

  const fetchMoreData = () => {
    !isMoreLoading && getMore();
  }

  const renderItem = useCallback(({ item, index }) => {return (<PostBox post = {item}/>)},[]);
  const renderFooter = () => {return isMoreLoading ? <Loader/> : null}
  const onRefresh = () => { getMessages() }
  const keyExtractor = useCallback( (item) => item.key, []);

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
    ListFooterComponent={renderFooter}
    showsVerticalScrollIndicator={false}
    onEndReachedThreshold={0.2}
    onEndReached={fetchMoreData}
    
/>  
  )
}

export default RecentPostList;
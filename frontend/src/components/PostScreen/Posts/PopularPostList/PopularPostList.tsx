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

  const {isLoading, isError, data,  getMessages, getMore, isMoreLoading} = useMessages(props.itemID,'score', props.field);

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
export default PopularPostList;
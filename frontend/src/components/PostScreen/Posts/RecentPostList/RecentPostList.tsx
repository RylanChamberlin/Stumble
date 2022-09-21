import {FlatList, RefreshControl } from 'react-native'
import React, { useCallback , useEffect } from 'react'
import Loader from '../../../general/Loader';
import useMessages from '../../../../hooks/useMessages';
import PostBox from '../PostBox';
import EmptyList from '../../../general/EmptyList';
import { useIsFocused } from '@react-navigation/native';

type Props = {
  itemID?: any
  order?: string
  field?: string
}

function RecentPostList(props: Props){

    const {isLoading, isError, data,  getMessages, getMore, isMoreLoading} = useMessages(props.itemID, props.order, props.field);

    // const isFocused = useIsFocused();

    useEffect(() => {
        console.log(props)
      },[]);
    

    const fetchMoreData = () => {
        !isMoreLoading && getMore();
    }

    const renderItem = useCallback(({ item, index }: any) => {return (<PostBox post = {item}/>)},[]);
    const renderFooter = () => {return isMoreLoading ? <Loader/> : null}
    const onRefresh = () => { getMessages() }
    const keyExtractor = useCallback( (item: any) => item.key, []);
    const listEmptyComponent = () => {return <EmptyList name={props.itemID ? "You Have No Posts" : 'No Posts Nearby'}/>}

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
            ListEmptyComponent={listEmptyComponent}
            keyExtractor={keyExtractor}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
    
    />  
  )
}

export default RecentPostList;
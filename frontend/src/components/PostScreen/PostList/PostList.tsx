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

  const [posts, setPosts] = useState([])
  const {isLoading, isError, data, isMore, fetchMoreMessages} = useMessages(props.itemID, 'createdAt', props.field);

  useEffect(() => {
    if(posts.length ){
      //if(!data.some(r=> posts.indexOf(r) >= 0)) 
      setPosts([...posts, ...data]); 
    }else{
      setPosts(data)
    } 

    return () => {
      setPosts([])
      console.log('unmount')
    }

  },[data])

  const fetchMoreData = () => {
    if(isMore){
      fetchMoreMessages()
    }
  }

  const renderItem = useCallback(({ item, index }) => {return (<PostBox item = {item}/>)},[]);
  const onRefresh = useCallback(() => {}, []);
  const renderLoader = () => { return isMore ? <Loader/> : null}
  const keyExtractor = useCallback( (item) => item.key, []);

  if(!posts) return <Loader/>

  return (
    <FlatList
    contentContainerStyle={{marginBottom: 300}}
    data={posts}
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

export default PostList;
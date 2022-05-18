import {FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import useMessages from '../../../hooks/useMessages';
import PostBox from '../PostBox';

const PostList = ({itemId = null, userId = null}) => {


    const [{data, loading, error}, getMessages] = useMessages();

    useEffect(() => {
        getMessages(itemId, userId);
    }, []);// [] could be which bar?


    if (loading) {
        return <ActivityIndicator />;
    }

  return (
    <FlatList

    contentContainerStyle={{marginBottom: 300}}
    data={data}
    
    renderItem={({ item }) => (
        <PostBox item = {item}/>
    )}
    keyExtractor={(item) => item.key}
    showsVerticalScrollIndicator={false}
/>  
  )
}

export default PostList
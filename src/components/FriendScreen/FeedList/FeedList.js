import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import FriendBox from '../FriendBox'
import useCheckIns from '../../../hooks/useCheckIns';
import { AppContext } from '../Context';
import { useContext } from 'react';

export default function FeedList() {

  
  const {userCheckIns} = useContext(AppContext);

  if (userCheckIns.loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={userCheckIns.data}

      renderItem={({ item }) => (
        <FriendBox item = {item}/>
      )}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
    />  
  )
}
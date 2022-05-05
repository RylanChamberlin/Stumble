import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import FriendBox from '../FriendBox'
import useCheckIns from '../../../hooks/useCheckIns';

export default function FeedList() {

  const [{data, loading, error}, getCheckIns] = useCheckIns();
  useEffect(() => {
      getCheckIns();
  }, []);


  

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={data}

      renderItem={({ item }) => (
        <FriendBox item = {item}/>
      )}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
    />  
  )
}
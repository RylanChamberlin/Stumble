import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import FriendBox from '../FriendBox'

export default function FeedList() {
  return (
    <View>
       <ScrollView>
          <FriendBox/>
          <FriendBox/>
          <FriendBox/>
        </ScrollView>
    </View>
  )
}
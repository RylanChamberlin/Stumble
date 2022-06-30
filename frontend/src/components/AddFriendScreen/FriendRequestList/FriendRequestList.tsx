import { useCallback } from "react"
import { FlatList, Text, View } from "react-native"
import useAcceptFriends from "../../../hooks/useAcceptFriends"
import NewFriendItem from "../NewFriendItem"


const FriendRequestList = () => {

    const {list} = useAcceptFriends()
    const renderItem = useCallback (({ item }) => <NewFriendItem item={item}/>,[]);

    return (
        <View>
          <Text>Accept Requests</Text>
            <FlatList
              data={list}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
        </View>
      )
}

export default FriendRequestList

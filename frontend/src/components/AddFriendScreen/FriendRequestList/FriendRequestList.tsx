import { useCallback } from "react"
import { FlatList, Text, View } from "react-native"
import useAcceptFriends from "../../../hooks/useAcceptFriends"
import EmptyList from "../../general/EmptyList"
import NewFriendItem from "../NewFriendItem"


const FriendRequestList = () => {

    const {list} = useAcceptFriends()
    const renderItem = useCallback (({ item }: any) => <NewFriendItem item={item}/>,[]);
    const listEmptyComponent = () => {return <EmptyList name={'No New Friend Requests'}/>}

    return (
        <View>
          <Text>Accept Requests</Text>
            <FlatList
              data={list}
              ListEmptyComponent={listEmptyComponent}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
        </View>
      )
}

export default FriendRequestList

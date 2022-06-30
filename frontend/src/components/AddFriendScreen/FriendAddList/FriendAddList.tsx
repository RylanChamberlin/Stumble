import { FC, useCallback, useEffect } from "react"
import { FlatList, Text, View } from "react-native"
import useAddFriends from "../../../hooks/useAddFriends"
import NewFriendItem from "../NewFriendItem"

type FriendAddListProps = {
    query: string
  }

const FriendAddList: FC<FriendAddListProps>= (props) => {

    useEffect( () => {
        queryUsers(props.query)
    },[props.query])

    const {queryUsers, list} = useAddFriends()
    const renderItem = useCallback (({ item }) => <NewFriendItem item={item}/>,[]);

    return (
        <View>
          <Text>Send Request</Text>
            <FlatList
              data={list}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
        </View>
      )

}

export default FriendAddList
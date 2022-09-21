import { FC, useCallback, useEffect } from "react"
import { FlatList, Text, View } from "react-native"
import useAddFriends from "../../../hooks/useAddFriends"
import EmptyList from "../../general/EmptyList"
import NewFriendItem from "../NewFriendItem"

type FriendAddListProps = {
    query: string
  }

const FriendAddList: FC<FriendAddListProps>= (props) => {

    useEffect( () => {
        queryUsers(props.query)
    },[props.query])

    const {queryUsers, list} = useAddFriends()
    const renderItem = useCallback (({ item }: any) => <NewFriendItem item={item}/>,[]);
    const listEmptyComponent = () => {return <EmptyList name={'No User Found'}/>}

    return (
        <View>
          <Text>Send Request</Text>
            <FlatList
              data={list}
              ListEmptyComponent={listEmptyComponent}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
        </View>
      )

}

export default FriendAddList
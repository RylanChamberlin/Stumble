import { useState } from "react";
import { Text, View } from "react-native";
import SearchFriend from "../../general/SearchFriend";
import styles from "./styles";
import FriendAddList from "../FriendAddList";
import FriendRequestList from "../FriendRequestList";

const FriendAddBox = () => {

    const [query, setQuery] = useState('');
   
    return (
        <>
        <SearchFriend query={query} setQuery={setQuery} placeholder={"Search for my friend"}/>
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <Text style = {styles.title}>Add Friends</Text>
                {query.length ?  <FriendAddList query={query}/> : <FriendRequestList/>}
            </View>
        </View>
        </>
    )
}

export default FriendAddBox

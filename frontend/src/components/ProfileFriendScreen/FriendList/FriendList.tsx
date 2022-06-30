import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useAppSelector } from "../../../app/hooks";
import FriendItem from "../FriendItem";
import SearchFriend from "../../general/SearchFriend";
import styles from "./styles";

const FriendList = () => {

    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState([])
    const friends = useAppSelector(state => state.location.friends)

    useEffect( () => {
        search()
    },[query])

    const search = () => {
        let filteredData = friends.filter(function (item: { name: string; username: string; }) {
            return item.name.toLowerCase().includes(query.toLowerCase()) || item.username.toLowerCase().includes(query.toLowerCase())
          });
          setFilter(filteredData)
      };

    const renderItem = useCallback (({ item }) => <FriendItem name = {item.name} username = {item.username} photoURL={item.photoURL}/>,[]);
    const onRefresh = useCallback(() => {}, []);

    return (

        <>
        <SearchFriend query={query} setQuery={setQuery} placeholder={"Search for my friend"}/>
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <Text style = {styles.title}>Friends</Text>

            <FlatList
                data={filter}
                renderItem={renderItem}  
                showsVerticalScrollIndicator={false}
            />  

            </View>
        </View>
        </>
    )
}

export default FriendList

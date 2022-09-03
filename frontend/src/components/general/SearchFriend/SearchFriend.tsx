import { Dispatch, FC, SetStateAction, useState } from "react";
import { TextInput } from "react-native"
import styles from "./styles";

type SearchFriendProps = {
    query: string
    setQuery: Dispatch<SetStateAction<string>>
    placeholder: string
}

const SearchFriend: FC<SearchFriendProps> = ({query, setQuery, placeholder}) => {

    return (
        <TextInput
            placeholder={placeholder}
            style={styles.input}
            value={query} 
            onPressIn={() => {setQuery('')}}
            onChangeText={(text) => {setQuery(text)}}
            autoCapitalize='none'
        />
    )
}

export default SearchFriend
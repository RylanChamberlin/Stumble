import { FC, useEffect } from "react";
import {FlatList, Text, TextInput, TouchableHighlight, View} from "react-native";
import PopupPost from "../../general/PopupPost/PopupPost";
import styles from "./styles";
import useNearby from "../../../hooks/useNearby";
import usePostSend from "../../../hooks/usePostSend";

type Props = {
    post: boolean
    setPost: (value: boolean) => void
}

type bar = {
    name: string
    vicinity: string
    place_id: string
}

type renderProp = {
    index: number
    item: bar
}

const NewPost: FC<Props> = (props) => {

    const {data, isError, searchNearby} = useNearby();
    const {bar, barInput, setBarInput, postInput, setPostInput, clickBarName, clearState, sendMessage} = usePostSend(props);

    useEffect(() => {
        searchNearby(barInput);
    },[barInput])

    const barListItem = (item: bar) => {
        return (
            <TouchableHighlight onPress={() => clickBarName(item)}>
                    <View style={styles.listItem}>
                        <Text style={styles.listName}>{item.name}</Text>
                        <Text style={styles.listAddress}>{item.vicinity}</Text>
                    </View>
            </TouchableHighlight>
        )
    }   

    return(

        <PopupPost post={props.post} setPost={props.setPost} title={'NEW POST'} buttonTitle={'POST'} buttonAction={sendMessage}>

        <TextInput 
            placeholder='@ bar location' 
            style = {[styles.barInput, !data ? {borderRadius: 10} : null]} 
            maxLength = {100}
            value={barInput} 
            onPressIn={clearState}
            onChangeText={(text) => {setBarInput(text)}}
        />

        {Object.keys(bar).length ?

        <TextInput 
            placeholder='Type SOMETHING........'
            style = {styles.textInput } 
            multiline={true} 
            numberOfLines={3}
            maxLength = {256}
            value={postInput} 
            onChangeText={(text) => {
                setPostInput(text)    
            }}
        />

        :

        <View style={styles.list}>
            <FlatList
                data={data}
                renderItem={({ item, index }: renderProp) => {
                    return (barListItem(item));}}
                keyExtractor={(item) => item.place_id}
                showsVerticalScrollIndicator={false} 
            /> 
        </View> 

        }
        </PopupPost> 
    );


    
}

export default NewPost;
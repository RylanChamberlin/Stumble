import React, { FC } from "react";
import {TextInput} from "react-native";
import PopupPost from "../../../general/PopupPost/PopupPost";
import styles from "./styles";
import usePostSend from "../../../../hooks/usePostSend";
import SearchList from "../SearchList";

type Props = {
    post: boolean
    setPost: (value: boolean) => void
}

const NewPost: FC<Props> = (props) => {

    const {bar, barInput, setBarInput, postInput, setPostInput, clickBarName, clearState, sendMessage} = usePostSend(props);

    return(

        <PopupPost post={props.post} setPost={props.setPost} title={'NEW POST'} buttonTitle={'POST'} buttonAction={sendMessage}>

        <TextInput 
            placeholder='@ bar location' 
            style = {styles.barInput} 
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
            onChangeText={(text) => {setPostInput(text)}}
        />

        : <SearchList clickBarName={clickBarName} barInput={barInput}/> }

        </PopupPost> 
    );


    
}

export default NewPost;
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 

import AppView from "../../general/AppView";
import styles from "./styles";
import { FC, useEffect, useState } from "react";
import SendRequest from "../SendRequest";
import RequestList from "../RequestList";

const AddFriends = (props) => {

    const [query, setQuery] = useState('');

    return (
        <GestureRecognizer
            style={{flex: 1}}
            onSwipeDown={() => props.setPost(!props.post)}
            >
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.post}
                onRequestClose={() => props.setPost(!props.post)}
            >

            <AppView>
                <View style={{alignItems: "center"}}>
                    <Text style={styles.title}>Add Friends</Text>
                    <TouchableOpacity onPress= {() => props.setPost(!props.post)} style={styles.exit}>
                        <Feather name="x" size={24} color="black"/>
                    </TouchableOpacity>
                </View>

                <TextInput 
                    placeholder="Search for my friend" 
                    style={styles.search}
                    value={query} 
                    onPressIn={() => {setQuery('')}}
                    onChangeText={(text) => {setQuery(text)}}
                    />

                <View style = {styles.box}>
                    {query ? <SendRequest query={query} data={props.data} /> : <RequestList data={props.data}/>}
                </View>

            </AppView>
            </Modal>
        </GestureRecognizer>
    )
}

export default AddFriends


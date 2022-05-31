import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 

import AppView from "../../../../general/AppView";
import styles from "./styles";
import { FC, useEffect, useState } from "react";
import SendRequest from "../SendRequest";
import RequestList from "../RequestList";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryUsersByUsername, queryUsersByName } from '../../../../../redux/actions/index';

const AddFriends = (props) => {

    const [usernames, setUsernames] = useState([])
    const [names, setNames] = useState([]) 
    const [allUsers, setAllUsers] = useState([])

    const searchUser = (search) => {

        if(search.length == 0){
            setAllUsers([])
            return;
        }

        props.queryUsersByUsername(search).then(setUsernames)
        props.queryUsersByName(search).then(setNames)

        const ids = new Set(usernames.map(d => d.id));
        const merged = [...usernames, ...names.filter(d => !ids.has(d.id))]

        setAllUsers(merged)

    }
    
    return (
        <GestureRecognizer
            style={{flex: 1}}
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
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.search}
                    onChangeText={(search) => searchUser(search)}
                    />

                <View style = {styles.box}>
                    {allUsers.length ? <SendRequest data={allUsers} /> : <RequestList/>}
                </View>

            </AppView>
            </Modal>
        </GestureRecognizer>
    )
}



const mapDispatchProps = (dispatch) => bindActionCreators({ queryUsersByUsername, queryUsersByName }, dispatch);

export default connect(null, mapDispatchProps)(AddFriends);


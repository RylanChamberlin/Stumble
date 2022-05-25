import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 

import AppView from "../../general/AppView";
import styles from "./styles";
import { FC, useEffect, useState } from "react";
import SendRequest from "../SendRequest";
import RequestList from "../RequestList";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryUsersByUsername } from '../../../redux/actions/index';

const AddFriends = (props) => {

    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([])

    
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
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.search}
                    onChangeText={(search) => props.queryUsersByUsername(search).then(setUsers)}
                    />

                <View style = {styles.box}>
                    {users.length ? <SendRequest data={users} /> : <RequestList/>}
                </View>

            </AppView>
            </Modal>
        </GestureRecognizer>
    )
}



const mapDispatchProps = (dispatch) => bindActionCreators({ queryUsersByUsername }, dispatch);

export default connect(null, mapDispatchProps)(AddFriends);


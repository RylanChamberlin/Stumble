import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 

import AppView from "../../../../general/AppView";
import styles from "./styles";
import SendRequest from "../SendRequest";
import RequestList from "../RequestList";
import useSearchUsers from "../../../../../hooks/useSearchUsers";
import { FC } from "react";

type Props = {
    post: boolean
    setPost: (arg0: boolean) => void;
    
}

const AddFriends: FC<Props> = (props) => {

    const {queryUsers, sendList, requestList, acceptOrAdd, acceptRequest, sendRequest, cancelRequest} = useSearchUsers()
   
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
                    onChangeText={(search) => queryUsers(search)}
                    />

                <View style = {styles.box}>
                    {sendList.length ? 
                        <SendRequest data={sendList} acceptOrAdd={acceptOrAdd} acceptRequest={acceptRequest} sendRequest={sendRequest} /> : 
                        <RequestList requestList = {requestList} cancelRequest={cancelRequest} acceptRequest={acceptRequest}/>
                    }
                </View>

            </AppView>
            </Modal>
        </GestureRecognizer>
    )
}


export default AddFriends;


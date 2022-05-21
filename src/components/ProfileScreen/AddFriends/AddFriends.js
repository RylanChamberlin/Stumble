import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Feather } from '@expo/vector-icons'; 

import AppView from "../../general/AppView";
import styles from "./styles";
import { FC, useEffect, useState } from "react";
import FriendBox from "../FriendBox";
import { auth, db } from "../../../firebase";
import useUsers from "../../../hooks/useUsers";



// type Props = {
//     post: boolean;
//     setPost: (post: boolean) => void;
//     data: any;
// };

const AddFriends = (props) => {

    const [query, setQuery] = useState('');
    const [{data, loading, error}, getUsers] = useUsers();

    useEffect(() => {
        getUsers();
        console.log('getting users')
    }, []);// 

    //console.log(data);

    const pressAccept = async(key) => {        
        console.log(auth.currentUser.uid + "is updating " + key)

        const ref = db.collection('users')

        await ref.doc(auth.currentUser.uid).collection('Friends').doc(key).update({isFriend: true});
        await ref.doc(key).collection('Friends').doc(auth.currentUser.uid).update({isFriend: true});

    }

    const sendRequest = async({key, name, username}) => {
        console.log(auth.currentUser.uid + "is befriending " + key + ' name: ' + name+ ' username: ' + username)

        const ref = db.collection('users')

        const snapshot = await ref.doc(auth.currentUser.uid).get();
        const myData = snapshot.data();

        await ref.doc(auth.currentUser.uid).collection('Friends').doc(key).set({
            isFriend: null,
            name: name,
            username: username
        
        });

        await ref.doc(key).collection('Friends').doc(auth.currentUser.uid).set({
            isFriend: false,
            name: myData.name,
            username: myData.username
        
        });

    }

    const cancelRequest = async(key) => {
        const ref = db.collection('users')
        await ref.doc(auth.currentUser.uid).collection('Friends').doc(key).delete()
        await ref.doc(key).collection('Friends').doc(auth.currentUser.uid).delete()

    }

    const keys = ['name', 'username']
    //searches for users from search bar with similar names or usernames
    const search = (userData) => {
        userData = userData?.filter((item) => !props.data.find(({ key }) => item.key === key));//filters out friends that have already sent requests
        userData = userData?.filter((item) => item.key != auth.currentUser.uid) // filters out current user
        return userData?.filter((item) => item.username.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase())).map(({name, username, key}) => ({name, username, key}));
    };




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



            {query ?
                <View style = {styles.innerBox}>

                    <Text>Send Request</Text>

                    <FlatList
                    data={search(data)}
                    renderItem={({ item, index }) => {


                        
                        return (
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TouchableOpacity onPress= {() => console.log('click')}>
                                    <Feather name="x" size={24} color="black"/>
                                </TouchableOpacity>
                                <FriendBox name = {item.name} username = {item.username}/>
                                <TouchableOpacity onPress={() => sendRequest(item)} style={styles.acceptButton}>
                                    <Text>Send Request</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        }
                        
                        }s
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
                    />


                </View>

                : null}
                        
                <View style = {styles.innerBox}>

                    <Text>Requests</Text>

                    <FlatList
                    data={props.data}
                    renderItem={({ item, index }) => {
                        if (item.isFriend !== null && !item.isFriend) {
                          return (
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TouchableOpacity onPress= {() => cancelRequest(item.key)}>
                                    <Feather name="x" size={24} color="black"/>
                                </TouchableOpacity>
                                <FriendBox name = {item.name} username = {item.username}/>
                                <TouchableOpacity onPress={() => pressAccept(item.key)} style={styles.acceptButton}>
                                    <Text>Accept</Text>
                                </TouchableOpacity>
                            </View>
                          )
                        }
                          return null;
                        }}
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
                    />
                   
                   
                </View>

                

            </View>

        </AppView>
        </Modal>
    </GestureRecognizer>
  )
}

export default AddFriends


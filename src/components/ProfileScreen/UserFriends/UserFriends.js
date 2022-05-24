import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import AppView from '../../general/AppView'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { RootStackParamList } from '../../../screens/RootStackPrams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FriendBox from '../FriendBox';
import useFriends from '../../../hooks/useFriends';
import PopupPost from '../../general/PopupPost';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Feather } from '@expo/vector-icons'; 
import AddFriends from '../AddFriends';

//type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'UserFriends'>;


const UserFriends = () => {

    const [post, setPost] = useState(false);
    const [query,setQuery] = useState('');
    const [{data, loading, error}, getFriends] = useFriends();

    useEffect(() => {
        getFriends();
    }, []);

    const navigation = useNavigation()

    const goBack = () => {

        navigation.navigate("BottomTab")
    }


    if (loading) {
        return <ActivityIndicator />;
    }

    return (

        <AppView>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={goBack} style={styles.backArrow}>
                    <AntDesign name="arrowleft" size={34} color="black"/>
                </TouchableOpacity>
                <Text style={styles.title}>My Friends</Text>
                <TouchableOpacity onPress={() => setPost(true)}>
                    <AntDesign name="adduser" size={24} color="black" />
                </TouchableOpacity>
                </View> 

            <TextInput 
                placeholder="Search for my friend" 
                style={styles.search}
                value={query} 
                onPressIn={() => {setQuery('')}}
                onChangeText={(text) => {setQuery(text)}}
                />

                <View style={styles.friendOutsideContainer}>
                    <View style={styles.friendContainer}>
                    <Text style = {styles.friendTitle}>Friends</Text>

                    <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        if (item.isFriend && item.name.toLowerCase().includes(query.toLowerCase()) && item.username.toLowerCase().includes(query.toLowerCase())) {
                          return <FriendBox name = {item.name} username = {item.username}/>
                        }
                          return null;
                        }}
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
                    />  

                    </View>
                </View>
            <AddFriends post={post} setPost={setPost} data ={data}/>
            
        </AppView>
    )
}

export default UserFriends
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import AppView from '../../../general/AppView'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import FriendBox from '../FriendBox';
import AddFriends from '../AddFriend/AddFriends';
import Loader from '../../../general/Loader';
import useUsers from '../../../../hooks/useUsers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../../../App';
import { useAppSelector } from '../../../../app/hooks';

type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'BottomTab'>;


const UserFriends = () => {

    const [post, setPost] = useState(false);
    const [query,setQuery] = useState('');
   
    const friends = useAppSelector(state => state.location.friends)
    const navigation = useNavigation<UserScreenProp>()

    const goBack = () => {
        navigation.navigate("BottomTab")
    }
   
    if (!friends) {
        return  <Loader/>
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
                    data={friends}
                    renderItem={({ item }: {item: any}) => {
                        if (item.name.toLowerCase().includes(query.toLowerCase()) && item.username.toLowerCase().includes(query.toLowerCase())) {
                          return <FriendBox name = {item.name} username = {item.username} photoURL={item.photoURL}/>
                        }
                          return null;
                        }}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    />  

                    </View>
                </View>
            <AddFriends post={post} setPost={setPost}/> 
        </AppView>
        
    )
}

export default UserFriends;


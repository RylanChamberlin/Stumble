import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import AppView from '../../../general/AppView'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import FriendBox from '../FriendBox';
import AddFriends from '../AddFriend/AddFriends';
import { connect } from 'react-redux';

//type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'UserFriends'>;


const UserFriends = (props) => {

    const [post, setPost] = useState(false);
    const [query,setQuery] = useState('');
    const [friends, setFriends] = useState({});

    useEffect(() => {
        setFriends(props.currentUserFriends)
       
    }, [props.currentUserFriends]);

    const navigation = useNavigation()

    const goBack = () => {

        navigation.navigate("BottomTab")
    }

    if (!friends) {
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
                    data={friends}
                    renderItem={({ item, index }) => {
                        if (item.name.toLowerCase().includes(query.toLowerCase()) && item.username.toLowerCase().includes(query.toLowerCase())) {
                          return <FriendBox name = {item.name} username = {item.username}/>
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


const mapStateToProps = (store) => ({
    currentUserFriends: store.userState.currentUserFriends 
  })

export default connect(mapStateToProps)(UserFriends);


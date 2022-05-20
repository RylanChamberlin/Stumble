import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import AppView from '../../general/AppView'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { RootStackParamList } from '../../../screens/RootStackPrams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FriendBox from '../FriendBox';
import useFriends from '../../../hooks/useFriends';




type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'UserFriends'>;

const UserFriends = () => {

    const navigation = useNavigation<UserScreenProp>()

    const goBack = () => {

        navigation.navigate("BottomTab")
    }

    const addFriendScreen = () => {
        navigation.navigate("")
    }


    const [{data, loading, error}, getFriends] = useFriends();

    useEffect(() => {
        getFriends();
        console.log(data)
    }, []);
    
    if (loading) {
        return <ActivityIndicator />;
    }

    console.log(data)

    return (

        <AppView>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={goBack} style={styles.backArrow}>
                    <AntDesign name="arrowleft" size={34} color="black"/>
                </TouchableOpacity>
                <Text style={styles.title}>My Friends</Text>
                <TouchableOpacity onPress={addFriendScreen}>
                    <AntDesign name="adduser" size={24} color="black" />
                </TouchableOpacity>
                </View> 

            <TextInput placeholder="Search for my friend" style={styles.search}/>

                <View style={styles.friendOutsideContainer}>
                    <View style={styles.friendContainer}>
                    <Text style = {styles.friendTitle}>Friends</Text>

                    <FlatList
                    data={data}
                    
                    renderItem={({ item }) => (
                        
                        <FriendBox name = {item.name} username = {item.username}/>
                    )}
                    
                    keyExtractor={(item) => item.key}
                    showsVerticalScrollIndicator={false}
/>  

                    </View>

                   
                </View>

            
            
        </AppView>
    )
}

export default UserFriends

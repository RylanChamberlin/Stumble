import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
import FriendBox from '../FriendBox'
import { Feather } from '@expo/vector-icons'; 
import { auth, db } from '../../../firebase';
import { acceptRequest, cancelRequest,  } from '../../../services/FriendRequestHelpers';

const RequestList = (props) => {

    const title = 'Requests';

  return (
    <View style = {styles.innerBox}>

        <Text>{title}</Text>
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
                        <TouchableOpacity onPress={() => acceptRequest(item.key)} style={styles.acceptButton}>
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
  )
}

export default RequestList

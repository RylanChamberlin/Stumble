import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import styles from './styles'
import FriendBox from '../../FriendBox'
import { Feather } from '@expo/vector-icons'; 

type Props = {
    requestList: any
    cancelRequest: (id: string) => void
    acceptRequest: (id: string) => void
}

const RequestList: FC<Props>= (props) => {

    const title = 'Requests'

    return (
        <View style = {styles.innerBox}>

            <Text>{title}</Text>
            <FlatList
                data={props.requestList}
                renderItem={({ item, index }) => ( 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TouchableOpacity onPress= {() =>  props.cancelRequest(item.id)}>
                            <Feather name="x" size={24} color="black"/>
                        </TouchableOpacity>
                        <FriendBox name={item.name} username={item.username} photoURL={''}/>
                        <TouchableOpacity onPress={() => props.acceptRequest(item.id)} style={styles.acceptButton}>
                            <Text>Accept</Text>
                        </TouchableOpacity>
                    </View>
                    ) 
                }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default RequestList;



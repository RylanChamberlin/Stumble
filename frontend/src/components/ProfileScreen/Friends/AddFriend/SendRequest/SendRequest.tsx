import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import styles from './styles';
import FriendBox from '../../FriendBox';

type Props = {
  data: any
  acceptOrAdd: (id: string) => boolean
  sendRequest: (item: any) => void
  acceptRequest: (id: string) => void
}

const SendRequest: FC<Props> = (props) => {

  return (
    <View style = {styles.innerBox}>
      <Text>Send Request</Text>
        <FlatList
          data={props.data}
          renderItem={({ item, index }) => {
              return (
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                      <FriendBox name={item.name} username={item.username}/>
                      {
                        props.acceptOrAdd(item.id) ?
                        <TouchableOpacity onPress={() => props.sendRequest(item)} style={styles.acceptButton}>
                          <Text>Add</Text>
                        </TouchableOpacity> : 
                        
                        <TouchableOpacity onPress={() => props.acceptRequest(item.id)} style={styles.acceptButton}>
                          <Text>Accept</Text>
                        </TouchableOpacity>
                      }
                  </View>
                )
              }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
    </View>
  )
}



export default SendRequest;


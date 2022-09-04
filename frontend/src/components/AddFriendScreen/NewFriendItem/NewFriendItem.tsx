import { Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import styles from './styles'
import { acceptRequest, sendRequest } from '../../../services/friendHelpers'

type info = {
  name: string
  username: string
  id: string
  isFriend: boolean
}

type NewFriendItemProps = {  
    item: info
}

const NewFriendItem: FC<NewFriendItemProps> = (props) => {

    const {name, username, id, isFriend} = props.item

    return (
        <View style={styles.friend}>
          <View style={styles.name}>
              <Text>{name}</Text>
              <Text>@{username}</Text>
          </View>

        {isFriend == false ?
            <TouchableOpacity onPress={() => acceptRequest(id)} style={styles.button} >
              <Text>ACCEPT</Text>
            </TouchableOpacity> 
            
            :

            <TouchableOpacity onPress={() => sendRequest(props.item)} style={styles.button} >
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity> } 
        </View>   
    )
    
}

export default NewFriendItem
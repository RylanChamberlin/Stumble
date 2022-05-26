import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import FriendBox from '../FriendBox'
import { Feather } from '@expo/vector-icons'; 
import { auth, db } from '../../../firebase';
import { acceptRequest, cancelRequest,  } from '../../../services/FriendRequestHelpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserFriendRequests } from '../../../redux/actions/index';


const RequestList = (props) => {

    const [friendRequests, setFriendRequests] = useState({})

    useEffect(() => {

        setFriendRequests(props.currentUserFriendRequests)

    },[props.currentUserFriendRequests])

    const title = 'Requests';

    if (!friendRequests) {
        return <ActivityIndicator />;
    }

    return (
        <View style = {styles.innerBox}>

            <Text>{title}</Text>
            <FlatList
                data={friendRequests}
                renderItem={({ item, index }) => ( 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TouchableOpacity onPress= {() =>  cancelRequest(item.id)}>
                            <Feather name="x" size={24} color="black"/>
                        </TouchableOpacity>
                        <FriendBox name = {item.name} username = {item.username}/>
                        <TouchableOpacity onPress={() => acceptRequest(item.id)} style={styles.acceptButton}>
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

const mapStateToProps = (store) => ({
    currentUserFriendRequests: store.userState.currentUserFriendRequests 
  })

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserFriendRequests }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(RequestList);



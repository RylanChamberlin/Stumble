

import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';



// type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'UserInfo'>;

const UserInfo = (props) => {

    const [user, setUser] = useState('');
    const navigation = useNavigation()

    // navigates to user friends
    const clickFriends = () => {
        navigation.navigate('UserFriends')
    }

    useEffect( () => {
        const { currentUser } = props;
        setUser(currentUser)

    },[props.currentUser])


    if(!user){
        return <Text>Loading</Text>
    }

  return (
    <>
    <View style={styles.container}>
    <View style={styles.image}></View>

        <View style={styles.textContainer}>

            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.username}>@{user.username}</Text>
                </View>
                <TouchableOpacity onPress={() => {clickFriends()}} style={{marginLeft: 50}}>
                <View style={styles.statCircle}>
                    {/* <Text>{user.friendTotal ? user.friendTotal : 0}</Text> */}
                    <Text>Friends</Text>
                </View>
                </TouchableOpacity>
            </View>
            

            <View style={styles.statContainer}>

                <View style={{flexDirection: 'column'}}>
                <Text>Check In Location:</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.checkIn ? user.checkIn.locationName: 'Nowhere go check in!'}</Text>
                </View>
    
                
            </View>
        </View>
    </View>
    <View style = {{backgroundColor: 'black', borderRadius: 20, alignItems: 'center'}}>
        <Text style = {{fontWeight: 'bold', fontSize: 30, color: 'white', justifyContent: 'center'}}>My Posts</Text>
    </View>
    </>
  )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
  })

export default connect(mapStateToProps)(UserInfo);
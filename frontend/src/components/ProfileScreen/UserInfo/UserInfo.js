

import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { storage, auth, storageRef, db } from '../../../firebase';
// import { getStorage, ref, uploadBytes } from 'firebase/storage';

//storage.getStorage , ref, uploadBytes

// type UserScreenProp = NativeStackNavigationProp<RootStackParamList, 'UserInfo'>;

const UserInfo = (props) => {

    const [user, setUser] = useState('');
    const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    const [hasAvatar, setHasAvatar] = useState(false);

    const navigation = useNavigation()

    useEffect( () => {
        const { currentUser } = props;
        setUser(currentUser)
        if (currentUser?.photoURL) {
            setAvatar(currentUser.photoURL);
            setHasAvatar(true)
         }

    },[props.currentUser])

     // navigates to user friends
     const clickFriends = () => {
        navigation.navigate('UserFriends')
    }

    const pickAvatar = async() => {
        console.log('picking')
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
          });
      
        console.log(result);
    
        if (!result.cancelled) {
            setAvatar(result.uri);

            uploadImage(result.uri, auth.currentUser.uid).then(() => {
                console.log("Image Upload Succes")

                updateUser(auth.currentUser.uid)
                
            }).catch((e) => {
                console.log("Image Upload Error: " + e)
            })
            
            
        }

        //uploadAvatar()
    };

    const uploadImage = async(uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = storage.ref().child("profilePics/" + imageName);
        return ref.put(blob);
    }

    const updateUser = async(imageName) => {

        const url = await storage.ref("profilePics/" + imageName).getDownloadURL()

        db.collection("users").doc(auth.currentUser.uid).update({
            photoURL: url,
          });

    }
    

    if(!user){
        return <Text>Loading</Text>
    }

  return (
    <>
    <View style={styles.container}>
    <TouchableOpacity style={styles.imageContainer} onPress={pickAvatar}>
        <Image source={{uri: avatar}} style={styles.image}/>

        {!hasAvatar &&
        <Ionicons
            name="ios-add"
            size={40}
            color="#FFF"
            //style={{marginLeft: 20, marginTop: 15}}
        >
        </Ionicons>
        }
    </TouchableOpacity>

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
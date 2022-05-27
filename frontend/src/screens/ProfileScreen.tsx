import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

import AppView from "../components/general/AppView";
import ButtonSwitch from "../components/general/ButtonSwitch";
import PostList from "../components/PostScreen/PostList";
import UserFeed from "../components/ProfileScreen/UserFeed";
import UserInfo from "../components/ProfileScreen/UserInfo";
import { auth } from "../firebase";
import timeSince from "../services/timeSince";


const ProfileScreen = () => {

    const [feed,setFeed] = useState();

    return(
       
        <AppView>    
            <UserInfo/>  
            <ButtonSwitch button1 = "MY FEED" button2 = "MY POSTS" left = {feed} setLeft = {setFeed}/>
            {feed ? <PostList userId={auth.currentUser?.uid}/>: <UserFeed/>}

        </AppView>
    );

}


export default ProfileScreen;
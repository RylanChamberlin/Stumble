import { useState } from "react";
import { Text, View } from "react-native";

import AppView from "../components/general/AppView";
import ButtonSwitch from "../components/general/ButtonSwitch";
import PostList from "../components/PostScreen/PostList";
import UserFeed from "../components/ProfileScreen/UserFeed";
import UserInfo from "../components/ProfileScreen/UserInfo";
import { auth } from "../firebase";


const ProfileScreen = () => {

    return(
       
        <AppView>    
            <UserInfo/>  
            
            <PostList itemID={auth.currentUser?.uid} order="createdAt" field = 'uid'/>
            {/* <PostList userId={auth.currentUser?.uid}/> */}
        </AppView>
    );

}


export default ProfileScreen;
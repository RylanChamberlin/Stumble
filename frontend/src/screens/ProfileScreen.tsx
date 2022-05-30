import { useState } from "react";

import AppView from "../components/general/AppView";
import ButtonSwitch from "../components/general/ButtonSwitch";
import PostList from "../components/PostScreen/PostList";
import UserFeed from "../components/ProfileScreen/UserFeed";
import UserInfo from "../components/ProfileScreen/UserInfo";
import { auth } from "../firebase";


const ProfileScreen = () => {

    const [feed,setFeed] = useState();

    return(
       
        <AppView>    
            <UserInfo/>  
            <ButtonSwitch button1 = "MY FEED" button2 = "MY POSTS" left = {feed} setLeft = {setFeed}/>
            {feed ? <PostList userId={auth.currentUser?.uid}/>: <UserFeed/>}
           
            {/* <PostList userId={auth.currentUser?.uid}/> */}
        </AppView>
    );

}


export default ProfileScreen;
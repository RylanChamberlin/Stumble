
import React from "react";
import AppView from "../../components/general/AppView";
import FriendList from "../../components/ProfileFriendScreen/FriendList";
import Header from "../../components/ProfileFriendScreen/Header";
import SearchFriend from "../../components/general/SearchFriend";


const ProfileFriendScreen = () => {

    return(
       
        <AppView>    
            <Header/>
            <FriendList/>

        </AppView>
    );

}


export default ProfileFriendScreen;
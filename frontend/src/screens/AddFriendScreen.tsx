import { useState } from "react";
import FriendAddBox from "../components/AddFriendScreen/FriendAddBox";
import Header from "../components/AddFriendScreen/Header";
import AppView from "../components/general/AppView";
import SearchFriend from "../components/general/SearchFriend";
import AddFriends from "../components/ProfileScreen/Friends/AddFriend/AddFriends";



const AddFriendScreen = () => {

    return(
       
        <AppView>    
        
            <Header/>
            <FriendAddBox/>
            
          
        </AppView>
    );

}

export default AddFriendScreen;
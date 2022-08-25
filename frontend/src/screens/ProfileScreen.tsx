
import { auth } from "../firebase";
import AppView from "../components/general/AppView";
import RecentPostList from "../components/PostScreen/Posts/RecentPostList";

import UserInfo from "../components/ProfileScreen/UserInfo";


const ProfileScreen = () => {



    return(
       
        <AppView>    
            <UserInfo/>  
            <RecentPostList itemID={auth.currentUser?.uid} order="createdAt" field = 'uid'/>
        </AppView>
    );

}

export default ProfileScreen;
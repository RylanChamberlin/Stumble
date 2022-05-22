import AppView from "../components/general/AppView";
import Header from "../components/FriendScreen/Header";


import {useState } from "react";
import MapBox from "../components/FriendScreen/MapBox";
import FeedList from "../components/FriendScreen/FeedList/FeedList";
import { AppProvider } from "../components/FriendScreen/Provider";




const FriendScreen = () => {

    const [feed, setFeed] = useState(true);

    return(
       
        <AppView>    
            <AppProvider>
                <Header feed={feed} setFeed={setFeed}/>
                {feed ? <MapBox/> : <FeedList/>}

                

            </AppProvider> 
        </AppView>
    );

}

export default FriendScreen;
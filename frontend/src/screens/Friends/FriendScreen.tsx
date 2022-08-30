import { useState } from "react";
import FeedList from "../../components/FriendScreen/Feed/FeedList";
import Header from "../../components/FriendScreen/Header";
import MapBox from "../../components/FriendScreen/Map/MapBox";
import AppView from "../../components/general/AppView";

const FriendScreen = () => {

    const [feed, setFeed] = useState(true);
    
    return(
        
        <AppView>    
            <Header feed={feed} setFeed={setFeed}/>
            {feed ? <MapBox/> : <FeedList/>}
        </AppView>
    );

}

export default FriendScreen;
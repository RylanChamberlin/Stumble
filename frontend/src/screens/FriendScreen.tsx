import AppView from "../components/general/AppView";
import Header from "../components/FriendScreen/Header";


import {useState } from "react";
import MapBox from "../components/FriendScreen/Map/MapBox";
import FeedList from "../components/FriendScreen/Feed/FeedList/FeedList";
import useUsers from "../hooks/useUsers";


const FriendScreen = () => {

    const [feed, setFeed] = useState(true);
    const {isLoading, isError, data} = useUsers();

    return(
       
        <AppView>    
            <Header feed={feed} setFeed={setFeed}/>
            {feed ? <MapBox isLoading={isLoading} data={data}/> : <FeedList isLoading={isLoading} data={data}/>}
        </AppView>
    );

}

export default FriendScreen;
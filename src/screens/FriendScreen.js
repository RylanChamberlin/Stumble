import AppView from "../components/general/AppView";
import Header from "../components/FriendScreen/Header";


import { createContext, useEffect, useState } from "react";
import MapBox from "../components/FriendScreen/MapBox";
import FeedList from "../components/FriendScreen/FeedList/FeedList";
import useLocation from "../hooks/useLocation";
import { ActivityIndicator } from "react-native";
import { AppProvider } from "../components/FriendScreen/Provider";


export default function FriendScreen(){

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
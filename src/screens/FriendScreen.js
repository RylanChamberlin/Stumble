import {Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import AppView from "../components/general/AppView";
import FriendBox from "../components/FriendScreen/FriendBox";
import Header from "../components/FriendScreen/Header";


import { useState } from "react";
import GestureRecognizer from "react-native-swipe-gestures";
import MapBox from "../components/FriendScreen/MapBox";
import FeedList from "../components/FriendScreen/FeedList/FeedList";




export default function FriendScreen(){

    const [feed, setFeed] = useState(true);
       
    return(
       
        <AppView>
        
            <Header feed={feed} setFeed={setFeed}/>

            {feed ? <MapBox/> : <FeedList/>}
            
        </AppView>
    );

}
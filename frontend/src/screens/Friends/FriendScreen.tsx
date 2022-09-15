import { useState } from "react";
import { Text, View } from "react-native";
import FeedList from "../../components/FriendScreen/Feed/FeedList";
import Header from "../../components/FriendScreen/Header";
import MapBox from "../../components/FriendScreen/Map/MapBox";
import AppView from "../../components/general/AppView";

const FriendScreen = () => {

    const [feed, setFeed] = useState(true);
    
    return(
        
        <AppView style={{alignItems: 'center', textAlign: 'center', justifyContent: '', }}>    
            {/* <Header feed={feed} setFeed={setFeed}/>
            {feed ? <MapBox/> : <FeedList/>} */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{fontSize: 34}}>Coming Soon!</Text>
                <Text style={{fontSize: 15}}>(See What Bars Your Friends Are At!)</Text>
            </View>
        </AppView>
    );

}

export default FriendScreen;
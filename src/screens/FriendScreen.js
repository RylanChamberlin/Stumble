import {ScrollView} from "react-native";
import AppView from "../components/general/AppView";
import FriendBox from "../components/FriendScreen/FriendBox";
import Header from "../components/FriendScreen/Header";



export default function FriendScreen(){
       
    return(
       
        <AppView>
            <Header/>
            <ScrollView>
                <FriendBox/>
                <FriendBox/>
                <FriendBox/>
            </ScrollView>

        </AppView>
    );

}


import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Platform } from "react-native";
import CheckInBox from "../../components/CheckInScreen/CheckInBox";
import AppView from "../../components/general/AppView";

const CheckInScreen = () => {
    return(
       
       <AppView>    
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <CheckInBox/>
       </AppView>
    );

}

export default CheckInScreen;
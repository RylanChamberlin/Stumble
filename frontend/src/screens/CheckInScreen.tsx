import React from "react";
import CheckInBox from "../components/CheckInScreen/CheckInBox";
import AppView from "../components/general/AppView";
import SimpleHeader from "../components/general/SimpleHeader";

const CheckInScreen = () => {
    return(
       
        <AppView>    
            <SimpleHeader title={"Check-In"}/>
            <CheckInBox/>
        </AppView>
    );

}

export default CheckInScreen;
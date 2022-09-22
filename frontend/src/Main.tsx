import Routes from "./navigation/Routes"
import useCachedResources from './hooks/useCachedResources';
import React from "react";

const Main = () => {


    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return(<Routes/>)
    }
}

export default Main
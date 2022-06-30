import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { storeLocation, storeUserFriends, storeUserInfo } from "./features/Location/locationSlice";
import { Nav } from "./navigation/Nav"
import { fetchLocation } from "./services/fetchLocation";
import { fetchUserInfo } from "./services/fetchUserInfo";
import { fetchFriends } from "./services/userFetchData";

const Main = () => {

    const dispatch = useAppDispatch()

    useEffect( () => {

      (async () => { 
        dispatch(storeLocation(await fetchLocation()));
        dispatch(storeUserInfo(await fetchUserInfo()));
        dispatch(storeUserFriends(await fetchFriends()));
      })();
      
    }, [])

    return(<Nav/>)
}

export default Main
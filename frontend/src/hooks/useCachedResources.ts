import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { storeLocation, storeUserFriends, storeUserInfo } from '../features/Location/locationSlice';
import { fetchLocation } from '../services/fetchLocation';
import { fetchUserInfo } from '../services/fetchUserInfo';
import { fetchFriends } from '../services/userFetchData';


export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useAppDispatch()

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      
        console.log('get initla stuff')
        dispatch(storeLocation(await fetchLocation()));
        dispatch(storeUserInfo(await fetchUserInfo()));
        dispatch(storeUserFriends(await fetchFriends()));

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

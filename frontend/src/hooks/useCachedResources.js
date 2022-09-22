import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { storeLocation, storePlace } from '../features/Location/locationSlice';
import { fetchLocation } from '../services/fetchLocation';
import useNearby from './useNearby';



export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const dispatch = useAppDispatch()

    const {searchClosestToPhone} = useNearby();


  // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
        try {
            
            SplashScreen.preventAutoHideAsync();
        
            // console.log('get initla stuff')
            let location = await fetchLocation()
            //get the closet bars from 10 miles radius and its city
            //const code = await searchClosestToPhone(location.coords);
            //const [geocode, city, state, country] = code.split(/[, ]+/);
            const place = {
                geocode: "12",
                city: "Columbia",
                state: "MO",
                country: "USA"
            }

            dispatch(storeLocation(location));
            dispatch(storePlace(place));

    
        
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.log(e);
        } finally {
            setLoadingComplete(true);
            SplashScreen.hideAsync();
        }
        }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

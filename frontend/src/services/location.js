import * as Location from 'expo-location';
import { useState } from 'react';

export default async() => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
    }else{
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        
    }

    
  
  
  return [location, errorMsg]


} 
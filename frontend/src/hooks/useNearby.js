
import {GOOGLE_KEY} from '@env'

import { useState } from 'react';
import { useAppSelector } from '../app/hooks';


export default () => {

    const location = useAppSelector(state => state.location.coords);

    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    const searchNearbyPhone = async (radius = 16000) => {

        if(location){
            setIsLoading(true)
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
            await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=${radius}&type=bar&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setData(json.results)) 
            .catch(error => setIsError(error))

            console.log('feethcing google nearby api')
        }
        setIsLoading(false)

    }

    return {isLoading, data, isError, searchNearbyPhone, checkIn}

};

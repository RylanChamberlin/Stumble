
import {GOOGLE_KEY} from '@env'
import { useState } from 'react';
import { useAppSelector } from '../app/hooks';

export default () => {

    const location = useAppSelector(state => state.location.coords)

    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);

    const searchNearby = async (barInput) => {

        if(location && barInput){
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
            fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=16000&type=bar&keyword=${barInput}&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setData(json.results)) 
            .catch(error => setIsError(error))
            console.log('feethcing google nearby api')
        }

    }

   
    return {data, isError, searchNearby}

};

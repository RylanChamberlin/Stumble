
import {GOOGLE_KEY} from '@env'
import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { auth, db, dbTime } from '../firebase';

export default () => {

    const location = useAppSelector(state => state.location.coords)

    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const searchNearby = async (barInput) => {

        if(location && barInput){
            setIsLoading(true)
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
            await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=16000&type=bar&keyword=${barInput}&key=${GOOGLE_KEY}`)
            .then(response => response.json())
            .then(json => setData(json.results)) 
            .catch(error => setIsError(error))
            console.log('feethcing google nearby api')
        }

        setIsLoading(false)

    }

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


    const checkIn = (bar) => {
        
        let check = {
            location,
            locationID: bar.place_id,
            locationName: bar.name
        }
        db.collection('users').doc(auth.currentUser.uid).update({
            checkIn: check,
            checkInTime: dbTime
        });
    }

   
    return {isLoading, data, isError, searchNearby, searchNearbyPhone, checkIn}

};

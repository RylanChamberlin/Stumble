
import {GOOGLE_KEY} from '@env'

import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { useAppSelector } from '../app/hooks';


export default () => {

    const location = useAppSelector(state => state.location.coords);

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

    const searchClosestToPhone = (coords)  => {
        if(coords) {
            return new Promise((resolve) => {
                const latitude = coords.latitude;
                const longitude = coords.longitude;
                const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&rankby=distance&type=bar&key=${GOOGLE_KEY}`
                fetch(url)
                    .then(res => res.json())
                    .then((resJson) => {
                    if (resJson
                        && resJson
                        && resJson.results
                        && resJson.results[0]
                        && resJson.results[0].plus_code
                        && resJson.results[0].plus_code.compound_code) {
                        resolve(resJson.results[0].plus_code.compound_code)
                    } else {
                        resolve()
                    }
                    })
                    .catch((e) => {
                        console.log('Error in getNearbyPlaceFromCoordinates', e)
                        resolve()
                    })
                })
            }
      }

    const checkIn = async(bar) => {
        console.log(bar)
        let check = {
            lat: bar.geometry.location.lat,
            lng: bar.geometry.location.lng,
            locationID: bar.place_id,
            locationName: bar.name
        }
        try {
            
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                checkIn: check,
                checkInTime: serverTimestamp()
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

   
    return {isLoading, data, isError, searchNearby, searchNearbyPhone, checkIn, searchClosestToPhone}


};

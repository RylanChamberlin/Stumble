import { useState } from "react";
import * as Location from 'expo-location';

export default () => {
   
    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    });

    const getLocation = async () => {

        setResult({
            data: null,
            loading: true,
            error: null
        })

        try{
                
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setResult({
                    data: null,
                    loading: false,
                    error: 'Permission to access location was denied'
                })
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setResult({
                data: location,
                loading: false,
                error: null
            })
            
        }catch(error){
            setResult({
                data: null,
                loading: false,
                error: error
            });
        }

       
       
    };



    return [result, getLocation];


};

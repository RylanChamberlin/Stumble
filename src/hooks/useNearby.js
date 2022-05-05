import {useState} from 'react';
import yelp from '../api/yelp';
import {GOOGLE_KEY} from '@env'
import useLocation from './useLocation';
import { useEffect } from 'react';
import nearby from '../api/nearby';


export default () => {    

    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    })

    const searchNearby = async (coords) => {
        setResult({
            data: null,
            loading: true,
            error: null
        })
        try{
    
            const response = await nearby.get(`/json?location=${38.9517}%2C${-92.3249}&radius=50&type=bar&key=${GOOGLE_KEY}`, {});
              setResult({
                data: response.data,
                loading: false,
                error: null
            })
        }catch(error){
            setResult({
                data: null,
                loading: false,
                error: "Something went wrong"
            });
        }
       
    };

    return [result, searchNearby];
};
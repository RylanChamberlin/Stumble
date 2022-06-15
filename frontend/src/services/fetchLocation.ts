import * as Location from 'expo-location';
import { useAppDispatch } from '../app/hooks';



export const fetchLocation = async() => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            //console.log('Permission to access location was denied')
            return {error: 'Permission to access location was denied'};
        }

        console.log('getting location')

        return await Location.getCurrentPositionAsync({});

}
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import Loader from '../components/general/Loader';
import { useAppDispatch } from '../app/hooks';
import { storeUserFriends, storeUserInfo } from '../features/Location/locationSlice';
import { fetchUserInfo } from '../services/fetchUserInfo';
import { fetchFriends } from '../services/userFetchData';
import { auth } from '../firebase';




const Routes = () => {

    const [user, setUser ] = useState<any>();
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch()

   
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle user state changes
    const onAuthStateChanged = async(user: any) => {
        setUser(user);
        
        if(user) {
            dispatch(storeUserInfo(await fetchUserInfo(user.uid)));
            dispatch(storeUserFriends(await fetchFriends(user.uid)));
        }

        
        setLoading(false);
        console.log('auth over')
    }

  
  

    if (loading ) {
        return <Loader/>;
    }

    return (
        <NavigationContainer>
            {user ? <HomeStack/> : <AuthStack />}
        </NavigationContainer>
    );
}

export default Routes

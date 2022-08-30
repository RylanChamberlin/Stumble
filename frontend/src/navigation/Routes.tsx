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
import CreateNameScreen from '../screens/auth/AuthScreens/CreateNameScreen';
import { checkIfUIDExists } from '../services/FirebaseCalls/createUser';


const Routes = () => {

    const [user, setUser ] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [hasUserName, setHasUsername] = useState(false);
    const dispatch = useAppDispatch()

   
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        if(user){
            getUserData()
        }
    }, [user, hasUserName])

    // Handle user state changes
    const onAuthStateChanged = async(user: any) => {
        setUser(user);
        setHasUsername(await checkIfUIDExists(user.uid))
        setLoading(false);
        console.log('auth over')
    }

    const getUserData = async() => {
        dispatch(storeUserInfo(await fetchUserInfo(user.uid)));
        dispatch(storeUserFriends(await fetchFriends(user.uid)));
    }

    if (loading ) {
        return <Loader/>;
    }

    if (!hasUserName){
        return <CreateNameScreen uid={user.uid} setHasUsername={setHasUsername}/>
    }

    return (
        <NavigationContainer>
            {user ? <HomeStack/> : <AuthStack />}
        </NavigationContainer>
    );
}

export default Routes

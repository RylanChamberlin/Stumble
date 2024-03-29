import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import Loader from '../components/general/Loader';
import { useAppDispatch } from '../app/hooks';
import { storeUserInfo } from '../features/Location/locationSlice';
import { fetchUserInfo } from '../services/fetchUserInfo';
import { auth } from '../firebase';
import CreateNameScreen from '../screens/auth/AuthScreens/CreateNameScreen';
import { checkIfUIDExists } from '../services/FirebaseCalls/createUser';
import AppView from '../components/general/AppView';
import { Text } from 'react-native';

const Routes = () => {

    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [hasUserName, setHasUsername] = useState(true);
    const dispatch = useAppDispatch()

   
    useEffect(() => {
        console.log('route useeffect')
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [user]);

    useEffect(() => {
        if(user){
            getUserData()
        }
    }, [user, hasUserName])

    // // Handle user state changes
    const onAuthStateChanged = async(user: any) => {
       
        setUser(user); 
        if(user){

            try {
                setHasUsername(await checkIfUIDExists(user.uid))
            }catch(err){
                console.log(err)
            }
        }
        setLoading(false);
        console.log('auth over')

    }

    const getUserData = async() => {
        try {
            dispatch(storeUserInfo(await fetchUserInfo(user.uid)));
           // dispatch(storeUserFriends(await fetchFriends(user.uid)));
        }catch(err){
            console.log(err)
        }
        

    }

    if (loading ) {
        return <Loader/>;
    }

    if (!hasUserName && user){
        return <CreateNameScreen uid={user.uid} setHasUsername={setHasUsername}/>
    }

    return (
        <NavigationContainer>
            {user ? <HomeStack/> : <AuthStack />}
        </NavigationContainer>
    );
}

export default Routes

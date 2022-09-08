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
import { Text } from 'react-native';


const Routes = () => {

    const [user, setUser ] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [hasUserName, setHasUsername] = useState(true);
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
        if(user){
            setHasUsername(await checkIfUIDExists(user.uid))
            }
        setLoading(false);
        console.log('auth over')

    }

    const getUserData = async() => {
        dispatch(storeUserInfo(await fetchUserInfo(user.uid)));
    }

    if (loading ) {
        return <><Loader/><Text style={{color: "blue", fontSize: 40}}>fsds</Text></>;
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

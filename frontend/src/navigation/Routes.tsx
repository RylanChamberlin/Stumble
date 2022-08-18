import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { auth, db } from '../firebase';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import Loader from '../components/general/Loader';
import CreateNameScreen from '../screens/auth/CreateNameScreen';
import { useAppDispatch } from '../app/hooks';
import { storeUserFriends, storeUserInfo } from '../features/Location/locationSlice';
import { fetchUserInfo } from '../services/fetchUserInfo';
import { fetchFriends } from '../services/userFetchData';


const Routes = () => {

    const [user, setUser ] = useState();
    const [signedUp, setSignedUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle user state changes
    const onAuthStateChanged = async(user: any) => {
        setUser(user);
        console.log(user.uid)

        dispatch(storeUserInfo(await fetchUserInfo(user.uid)));
        dispatch(storeUserFriends(await fetchFriends(user.uid)));
        
        // if(user){
        //     DoesUserExistsInDoc(user.uid)
        // }
        if (initializing) setInitializing(false);
        setLoading(false);
        console.log('auth over')
    }

    // const DoesUserExistsInDoc = async (userID: string) => {
    //     db.collection("users").doc(userID).get().then((doc: { exists: any }) => {
    //         console.log('checking exsistenceeeee\n\n\n')
    //         if(doc.exists){
    //             setSignedUp(true)
    //         } 

            
    //     })
    //   }
    

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

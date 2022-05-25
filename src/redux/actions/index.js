
import { auth, db } from '../../firebase'
import * as Location from 'expo-location';
import { USER_STATE_CHANGE, USER_LOCATION_STATE_CHANGE, USERS_CHECK_INS_STATE_CHANGE, USER_FRIENDS_STATE_CHANGE, USER_FRIEND_REQUESTS_STATE_CHANGE } from '../constants/index'

let unsubscribe = [];

export function fetchUser() {
    return ((dispatch) => {
        let listener = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .onSnapshot((snapshot, error) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: { uid: auth.currentUser.uid, ...snapshot.data() } })
                }else{
                    console.log('does not exists')
                }
            })
        unsubscribe.push(listener)
    })
}

export function fetchUserLocation() {
    return (async(dispatch) => {

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission to access location was denied')
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        dispatch({ type: USER_LOCATION_STATE_CHANGE, currentUserLocation: location })
            
    })
}


export function fetchUserFriends() {
    return ((dispatch) => {
        db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where('isFriend', '==', true)
            .get()
            .then((snapshot) => {
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_FRIENDS_STATE_CHANGE, currentUserFriends: friends })
            })
    })
}

export function fetchUserFriendRequests() {
    return ((dispatch) => {
        db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where('isFriend', '==', false)
            .get()
            .then((snapshot) => {
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_FRIEND_REQUESTS_STATE_CHANGE, currentUserFriendRequests: friends })
            })
    })
}

export function fetchUsersCheckIns() {
    return (async(dispatch) => {

        let listener = db
            .collection("users")
            .orderBy("checkIn.checkInTime", "desc")
            .onSnapshot((snapshot, error) => {
                const users = [];
                snapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id, 
                    });                      
                });
                dispatch({ type: USERS_CHECK_INS_STATE_CHANGE, checkIns: users})
            })
        unsubscribe.push(listener)
    })
}

export function queryUsersByUsername(username) {
    return ((dispatch, getState) => {
        return new Promise((resolve, reject) => {

            if (username.length == 0) {
                resolve([])
            }
            db
                .collection('users')
                .where('username', '>=', username)
                .limit(5)
                .get()
                .then((snapshot) => {
                    let users = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    resolve(users)
                })
        })
    })
}


// const subscriber = barRef
// .orderBy("checkIn.checkInTime", "desc")
// .onSnapshot(querySnapshot => {
//     const users = [];
//     querySnapshot.forEach(documentSnapshot => {
//         users.push({
//             ...documentSnapshot.data(),
//             key: documentSnapshot.id, 
//         });                      
//     });
//     setResult({
//         data: users,
//         loading: false,
//         error: null
//     })

    
// });   
            
// return () => subscriber(); 
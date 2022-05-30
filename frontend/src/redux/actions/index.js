
import { auth, db } from '../../firebase'
import * as Location from 'expo-location';
import { USER_STATE_CHANGE, USER_LOCATION_STATE_CHANGE, USER_FRIENDS_STATE_CHANGE, USER_FRIEND_REQUESTS_STATE_CHANGE, USER_FRIEND_REQUESTS_SENT_STATE_CHANGE, USER_FRIENDS_DATA_STATE_CHANGE } from '../constants/index'

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

export function fetchFriend(uid) {
    return ((dispatch, getState) => {
        const found = getState().userState.currentUserFriendsData.some(el => el.uid === uid);
        if (!found) {
            db
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot, error) => {
                if (snapshot.exists) {
                    let user = snapshot.data();
                    user.uid = snapshot.id;
                    dispatch({ type: USER_FRIENDS_DATA_STATE_CHANGE, currentUserFriendsData: user })
                }    
            })
       
        }
    })
}


export function fetchUserFriends() {
    return ((dispatch) => {
        db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where('isFriend', '==', true)
            .onSnapshot((snapshot) => {
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_FRIENDS_STATE_CHANGE, currentUserFriends: friends })
                for (let i = 0; i < friends.length; i++) {
                    dispatch(fetchFriend(friends[i].id))
                    //console.log(friends[i].id)
                }
            })
        //unsubscribe.push(listener)
    })
}


export function fetchUserFriendRequests() {
    return ((dispatch) => {
        db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where('isFriend', '==', false)
            .onSnapshot((snapshot, error) => {
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_FRIEND_REQUESTS_STATE_CHANGE, currentUserFriendRequests: friends })
            })
        //unsubscribe.push(listener)
    })
}

export function fetchUserFriendRequestsSent() { 
    return ((dispatch) => {
        db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where('isFriend', '==', null)
            .onSnapshot((snapshot) => {
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_FRIEND_REQUESTS_SENT_STATE_CHANGE, currentUserFriendRequestsSent: friends })
            })
       // unsubscribe.push(listener)
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


export function queryUsersByName(name) {
    return ((dispatch, getState) => {
        return new Promise((resolve, reject) => {

            if (name.length == 0) {
                resolve([])
            }
            db
                .collection('users')
                .where('name', '>=', name)
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
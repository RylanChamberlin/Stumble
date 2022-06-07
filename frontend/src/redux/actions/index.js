
import { auth, db } from '../../firebase'
import * as Location from 'expo-location';
import { CLEAR_DATA, USERS_ALL_POSTS_STATE_CHANGE, USER_STATE_CHANGE, USER_LOCATION_STATE_CHANGE, USER_FRIENDS_STATE_CHANGE, USER_FRIEND_REQUESTS_STATE_CHANGE, USER_FRIEND_REQUESTS_SENT_STATE_CHANGE, USER_FRIENDS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_LAST_POST_STATE_CHANGE, USER_BARS_STATE_CHANGE } from '../constants/index'

const geofire = require('geofire-common');
let unsubscribe = [];


export function clearData() {
    return ((dispatch) => {
        // for (let i = unsubscribe; i < unsubscribe.length; i++) {
        //     unsubscribe[i]();
        // }
        dispatch({ type: CLEAR_DATA })
    })
}

export function fetchUser() {
    return ((dispatch, getState) => {
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


        // checks if checkin is older then 3 hours if is it deletes checkin from user
        const secondsSince = getState().userState?.currentUser?.checkIn?.checkInTime.seconds
        if(secondsSince){
            const dateCreated = new Date(secondsSince*1000);
            const seconds = Math.floor((new Date() - dateCreated) / 1000);
            const interval = seconds / 3600;
            if (interval >= 3) {
                db
                  .collection("users")
                  .doc(auth.currentUser.uid)
                  .update({ 
                    checkIn: null,
                  });
            } else {
                console.log('check in stay')
            }
        }
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
        console.log('fethc bars')
       
        dispatch({ type: USER_LOCATION_STATE_CHANGE, currentUserLocation: location })
        dispatch(fetchBars())
            
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

export function fetchPostsByID(field = null, id = null, order = null, lastDoc = undefined) {
    return ((dispatch, getState) => {
        return new Promise((resolve, reject) => {

            let isMore = true;
            let secondFetch = false;
            
            let query = db.collection('messages')
            let all = false;

            if(field != null && id != null) {
                query = query
                .where(field, '==' , id)
                
            }else{
                all = true;
                query = query
                .where("placeID", "in", ["ChIJK-bTLIle24cRvmyPEI5iwQY", "ChIJPcV4d8-33IcRT7MDdfcUmRQ", "ChIJX7IOCcS33IcR4zdKrb8iHqU", "ChIJna0jxVLKj4ARcmzC8VyOlZ0"])
            }

            if(order != null){
                query = query
                .orderBy(order, "desc")
            }else{
                query = query
                .orderBy("createdAt", "desc")
            }


                
            if (lastDoc !== undefined) {
                console.log('borke')
                secondFetch = true;
                query = query.startAfter(lastDoc); // fetch data following the last document accessed
            }
            console.log('request')
            query.limit(8) // limit to your page size, 3 is just an example
                .get()
                .then(querySnapshot => {
                    console.log('error')
                    const last = querySnapshot.docs[querySnapshot.docs.length - 1];
                    const posts = [];
                    querySnapshot.forEach(documentSnapshot => {
                        posts.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });

                    // if(all){
                    //     dispatch({ type: USERS_ALL_POSTS_STATE_CHANGE, allPosts: posts })
                    // }else{
                    //     dispatch({ type: USERS_POSTS_STATE_CHANGE, posts: posts })
                    // }

                    if(querySnapshot.docs.length < 8){
                        isMore = false;
                    }

                    const data = {
                        posts : posts,
                        isMore: isMore,
                        lastDoc: last,
                        secondFetch: secondFetch
                    }
                    console.log('error2')
                    resolve(data);  
                    
                });         
        })
    })
}


export function fetchPosts(field = null, id = null, order = null) {
    return ((dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let lastDocument = getState().usersState.lastDoc

            let query = db.collection('messages')

            if(field != null && id != null) {
                query = query
                .where(field, '==' , id)
                
            }else{
                query = query
                .where("placeID", "in", ["ChIJK-bTLIle24cRvmyPEI5iwQY", "ChIJPcV4d8-33IcRT7MDdfcUmRQ", "ChIJX7IOCcS33IcR4zdKrb8iHqU", "ChIJna0jxVLKj4ARcmzC8VyOlZ0"])
            }

            if(order != null){
                query = query
                .orderBy(order, "desc")
            }else{
                query = query
                .orderBy("createdAt", "desc")
            }


                
            if (lastDocument !== undefined) {
                query = query.startAfter(lastDocument); // fetch data following the last document accessed
            }
            console.log('request')
            query.limit(8) // limit to your page size, 3 is just an example
                .get()
                .then(querySnapshot => {

                    
                    const last = querySnapshot.docs[querySnapshot.docs.length - 1];
                    
        
                    dispatch({ type: USERS_LAST_POST_STATE_CHANGE, lastDoc: last })

                    const posts = [];
                    querySnapshot.forEach(documentSnapshot => {
        
                        posts.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });

                    });

                    resolve(posts);  
                });         
        })
    })
}


export function fetchBars() {
    return ((dispatch, getState) => {

        const location = getState().userState.currentUserLocation;
        const center = [location.coords.latitude, location.coords.longitude];
        const radiusInM = 16 * 1000;

        // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
        // a separate query for each pair. There can be up to 9 pairs of bounds
        // depending on overlap, but in most cases there are 4.
        const bounds = geofire.geohashQueryBounds(center, radiusInM);
        const promises = [];
        for (const b of bounds) {
            const q = db.collection('bars')
                .orderBy('geohash')
                .startAt(b[0])
                .endAt(b[1])
            promises.push(q.get());
        }
        // Collect all the query results together into a single list
        Promise.all(promises).then((snapshots) => {
        const matchingDocs = [];

        for (const snap of snapshots) {
            for (const doc of snap.docs) {
                const lat = doc.get('lat');
                const lng = doc.get('lng');

                // We have to filter out a few false positives due to GeoHash
                // accuracy, but most will match
                const distanceInKm = geofire.distanceBetween([lat, lng], center);
                const distanceInM = distanceInKm * 1000;
                if (distanceInM <= radiusInM) {
                    matchingDocs.push({
                        ...doc.data(),
                        key: doc.id,
                    });
                }
            }
        }

        return matchingDocs;
        }).then((matchingDocs) => {
        // Process the matching documents
        // ...
            dispatch({ type: USER_BARS_STATE_CHANGE, bars: matchingDocs });
        });
        
    });
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
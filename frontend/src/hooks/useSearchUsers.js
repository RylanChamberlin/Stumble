import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { auth, db } from '../firebase';

export default () => {

    const [names, setNames] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [users, setUsers] = useState([]);
    const [friendRequestsSent, setFriendRequestsSent] = useState([]);
    const [currentUserFriends, setCurrentUserFriends] = useState([]);
    

    const [requestList, setRequestList] = useState([]);
    const [sendList, setSendList] = useState([])

    useEffect(() => {
        fetchUserFriendRequestsSent()
        fetchUserFriendRequests()
        fetchUserFriends()
        return () => {
            console.log('unmount useSearchUsers: ')
          }
    },[])

    const queryUsers = (name) => {

        console.log('query name firebase')
        if(name.length==0){
            setUsers([]);
            setSendList([])
            return;
        }

        queryUsersByName(name)
        queryUsersByUsername(name)

        const ids = new Set(usernames.map(d => d.id));
        const merged = [...usernames, ...names.filter(d => !ids.has(d.id))]

        setUsers(merged)
        getSendList()

    }


    const getSendList = () => {
         //  filters out users that user has already sent a friend request too
        const userNotSent = users.filter(function(objFromA) { 
            return !friendRequestsSent.find(function(objFromB) {
            return objFromA.id === objFromB.id
            })
        })

        //filters out users that are already friends
        const usersWithoutFriends = userNotSent.filter(function(objFromA) { 
            return !currentUserFriends.find(function(objFromB) {
            return objFromA.id === objFromB.id
            })
        })

        //filters out current user
        const sendlist = usersWithoutFriends.filter(function(el) { return el.id != auth.currentUser.uid; }); 

        setSendList(sendlist)
    }
    

    const queryUsersByName = (name) => {
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

               
                setNames(users)
            })
    }

    const queryUsersByUsername = (username)  => {
       
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
                setUsernames(users)
            })   
    }

    const fetchUserFriendRequestsSent = ()  => { 
        console.log('fetch requestSent')
        db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where('isFriend', '==', null)
            .onSnapshot((snapshot) => {
                console.log('listening fetchUserFriendRequestsSent')
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setFriendRequestsSent(friends)
            })   
    }   

    const fetchUserFriends = async() => {

        console.log('fetch userFriends')
        const f = await db.collection("users").doc(auth.currentUser.uid).collection('Friends').where('isFriend', '==', true).get()
        let friends = f.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
        })



        setCurrentUserFriends(friends)

    }

    const fetchUserFriendRequests = () => {
        
        const subscriber = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where('isFriend', '==', false)
            .onSnapshot((snapshot, error) => {
                console.log('listening fetchUserFriendRequests')
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setRequestList(friends)
            })
            
            return () => subscriber(); //work on why to unlisten
    
    }

    const acceptOrAdd = (id) => { 

        let found = true;
        requestList.some(el => {
          if(el.id == id){
            found = false
          }
        })

        return found;
      }


    const acceptRequest = async(id) => {        
        const ref = db.collection('users')
        await ref.doc(auth.currentUser.uid).collection('Friends').doc(id).update({isFriend: true});
        await ref.doc(id).collection('Friends').doc(auth.currentUser.uid).update({isFriend: true});

        const newList = sendList.filter(function(el) { return el.id != id; }); 
        setSendList(newList)
    }
    
    const cancelRequest = async(id) => {
    
        console.log('cancel')
        const ref = db.collection('users')
        await ref.doc(auth.currentUser.uid).collection('Friends').doc(id).delete()
        await ref.doc(id).collection('Friends').doc(auth.currentUser.uid).delete()
    
    }
    
    const sendRequest = async({id, name, username}) => {
          
        const ref = db.collection('users')
        const snapshot = await ref.doc(auth.currentUser.uid).get();
        const myData = snapshot.data();

        const newList = sendList.filter(function(el) { return el.id != id; }); 
        setSendList(newList)
    
        await ref.doc(auth.currentUser.uid).collection('Friends').doc(id).set({
            isFriend: null,
            name: name,
            username: username
        
        });
    
        await ref.doc(id).collection('Friends').doc(auth.currentUser.uid).set({
            isFriend: false,
            name: myData.name,
            username: myData.username
        
        });
    
      }

    return {queryUsers, usernames, names, sendList, requestList, acceptOrAdd, acceptRequest, cancelRequest, sendRequest}

};

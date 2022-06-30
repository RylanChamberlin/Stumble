import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export default () => {

    const [names, setNames] = useState([]);
    const [usernames, setUsernames] = useState([]); 
    const [list, setList] = useState([])
    const [oldList , setOldList] = useState([])
    const [userFriends , setUserFriends] = useState([]);
    
    const queryUsers = async (name) => {

        console.log('query name firebase')

        queryUsersByName(name)
        queryUsersByUsername(name)

        const ids = new Set(usernames.map(d => d.id));
        const merged = [...usernames, ...names.filter(d => !ids.has(d.id))]

        let listOfUsernames = merged.map((friend) => {
                return friend.username
            })

        fetchUserFriend(listOfUsernames)

        const userNotSent = merged.filter(function(objFromA) { 
            return !userFriends.find(function(objFromB) {
                return objFromA.id === objFromB.id
            })
        })

        setList(userNotSent)
    }

    const fetchUserFriend = async(list) => {

        if(!list.length) return;

        if(list.length === oldList.length && list.every(function (element) {return oldList.includes(element);})) return;
        
        setOldList(list)
    
        console.log('newquery\n')
        const query = await db.collection("users").doc(auth.currentUser.uid).collection("Friends").where("username", "in", list).get()

        let f = query.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
        })

        setUserFriends(f)
       
    }

    const queryUsersByName = (name) => {
        if (!name.length) {
            return
        }


        console.log('fetch friend list')
        db
            .collection('users')
            .where('name', '>=', name)
            .limit(2)
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
       
        if (!username.length) {
            return
        }
        db
            .collection('users')
            .where('username', '>=', username)
            .limit(2)
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

    return {queryUsers, list}

};

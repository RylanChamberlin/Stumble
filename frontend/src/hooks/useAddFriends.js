import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export default () => {

    const [users, setUsers] = useState([]);
    const [list, setList] = useState([])

    useEffect( () => {

        if(!users.length) return;
        const names = users.map(user => user.username)
        const subscriber = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where("username", "in", names)
            .onSnapshot((snapshot, error) => {
                console.log('snapshot: getting users friends doc in list')
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                const userNotSent = users.filter(function(objFromA) { 
                    return !friends.find(function(objFromB) {
                        return objFromA.id === objFromB.id
                        })
                    })
        
                setList(userNotSent)
                console.log(friends)
            })

            

        return () => subscriber()

    },[users])
    
    const queryUsers = async (name) => {

        const queryNames = await db.collection('users').where('name', '>=', name).limit(2).get()
        const queryUsernames = await db.collection('users').where('username', '>=', name).limit(2).get()

        let names = queryNames.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
        })

        let usernames = queryUsernames.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
        })

       
        const ids = new Set(usernames.map(d => d.id));
        const mergedUsers = [...usernames, ...names.filter(d => !ids.has(d.id))]
 
        
        if(!mergedUsers.length) return;
        if(users.length === mergedUsers.length && mergedUsers.every(c => users.find(e=>e.id==c.id)))return
        setUsers(mergedUsers)
       
    }



    return {queryUsers, list}

};

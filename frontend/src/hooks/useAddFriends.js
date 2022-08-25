
import { collection, getDocs, limit, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
;
export default () => {

    const [users, setUsers] = useState([]);
    const [list, setList] = useState([])


    useEffect( () => {

        if(!users.length) return;
        const names = users.map(user => user.username) 
        const friendRef = collection(db, "users" , auth.currentUser.uid , 'Friends');
            const q = query(friendRef, where("username", "in", names))
            const unsub = onSnapshot(q, (query) => {
                
                let friends = query.docs.map(doc => {
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
            }); 
                            
            return () => unsub(); 

    },[users])

   
    
    const queryUsers = async (name) => {


        let userRef = collection(db, 'users');
        const queryNames = query(userRef, where('name', '>=', name), limit(2));
        const namesSnapshot = await getDocs(queryNames);

        const queryUsernames = query(userRef, where('usernamecc', '>=', name), limit(2));
        const usernamesSnapshot = await getDocs(queryUsernames);
    
        let names = namesSnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
        })

        let usernames = usernamesSnapshot.docs.map(doc => {
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

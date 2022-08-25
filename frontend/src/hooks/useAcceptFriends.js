
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, db } from "../firebase";

export default () => {
    
    const [list, setList] = useState([])
    

    useEffect( () => {

        getFriendRequest()

    },[])

    const getFriendRequest = () => {
        try{
            const friendRef = collection(db, "users" , auth.currentUser.uid , 'Friends');
            const q = query(friendRef, where("isFriend", "==", false))
            const unsub = onSnapshot(q, (query) => {
                const requests = [];
                query.forEach(doc => {
                    requests.push({...doc.data(), id: doc.id,});
                })
                setList(requests);
            }); 
                            
            return () => unsub(); 

        }catch(e){
            console.log(e)
        }
    }
    
    return {list}

}
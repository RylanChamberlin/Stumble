import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { db } from "../firebase";

export default () => {

    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
   
    const friends = useAppSelector(state => state.location.friends)

    useEffect( async() => {

        setIsLoading(true)
        console.log('fetch user friends')
        if(!friends) return
 
        setData(await Promise.all(friends.map(async (friend) => {
            return fetchFriend(friend.id)
          }))
        );

        setIsLoading(false)
    
        return () => {
            console.log('unmount useUsers: ')
          }
        
    },[friends])

  
    const fetchFriend = async(uid) => {

        const friendRef = doc(db, 'users', uid);
        const docSnap = await getDoc(friendRef);
        if (docSnap.exists()) {
            let user = docSnap.data();
            user.uid = docSnap.id;
            return user
        } else {
            console.log("No such Friend document!");
        }

    }


   
    return {data, isError, isLoading}

};





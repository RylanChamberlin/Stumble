import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { auth, db } from "../firebase";

export default () => {

    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
   
    const friends = useAppSelector(state => state.location.friends)

    useEffect( async() => {

        setIsLoading(true)
        console.log('fetch user friends')
        
        setData(await Promise.all(friends.map(async (friend) => {
            return fetchFriend(friend.id)
          }))
        );

        setIsLoading(false)
    
        return () => {
            console.log('unmount useUsers: ')
          }
        
    },[])

  
    const fetchFriend = async(uid) => {
        const query = await db.collection("users").doc(uid).get();
        let user = query.data();
        user.uid = query.id;
        return user
    }


   
    return {data, isError, isLoading}

};





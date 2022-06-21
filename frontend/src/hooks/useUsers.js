import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

export default () => {

    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [friends, setFriends] = useState([])

    useEffect( async() => {

        setIsLoading(true)
        console.log('fetch user friends')
        
        db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection('Friends')
        .where('isFriend', '==', true)
        .onSnapshot((snapshot, error) => {
            console.log('listening friends')
            let friends = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            setFriends(friends)
            console.log('wait2')
        })

        const friendsData = await Promise.all(friends.map(async (friend) => {
            return await fetchFriend(friend.id)
          }));
        setData(friendsData)
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


   
    return {data, isError, isLoading, friends}

};





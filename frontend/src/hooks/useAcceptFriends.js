
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export default () => {
    
    const [list, setList] = useState([])

    useEffect( () => {
        const subscriber = db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection('Friends')
            .where('isFriend', '==', false)
            .onSnapshot((snapshot, error) => {
                console.log('snapshot: getting friendRequest')
                let friends = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setList(friends)
            })

        return () => subscriber()

    },[])
    
    return {list}

}
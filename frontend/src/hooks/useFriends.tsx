import { useState } from "react";
import { auth, db } from "../firebase";

interface FriendObject {
    isFriend: boolean;
    key: string;
    name: string;
    username: string;
}

interface FriendData {
    data: FriendObject | undefined | null | any; //temp fix so it would work in flatlist
    loading: boolean;
    error: any;
}

export default (): [FriendData, () => void] => {
   
    const [result, setResult] = useState<FriendData>({
        data: null,
        loading: false,
        error: null
    })

    const getFriends = async () => {
        setResult({
            data: null,
            loading: true,
            error: null
        })

        const ref = db.collection('users')
        var subscriber = ref;

        try{
                subscriber
                .doc(auth.currentUser.uid)
                .collection("Friends")
                // .where('isFriend', '==' , true)
                .onSnapshot(querySnapshot => {
                    const users = [];
                    querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                    });

                    setResult({
                        data: users,
                        loading: false,
                        error: null
                    })


                });

            return () => subscriber(); //??

       
        }catch(error){
            setResult({
                data: null,
                loading: false,
                error: error
            });
        }

       
       
    };

    

    return [result, getFriends];


};

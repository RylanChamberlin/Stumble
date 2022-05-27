import { useState } from "react";
import { auth, db } from "../firebase";



export default () => {
   
    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    })

    const getUsers = async () => {
        setResult({
            data: null,
            loading: true,
            error: null
        })

        const ref = db.collection('users')
        var subscriber = ref;

        try{
                subscriber
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

    

    return [result, getUsers];


};

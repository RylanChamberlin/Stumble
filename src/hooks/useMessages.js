import { useState } from "react";
import { db } from "../firebase";


export default () => {
   
    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    })

    const getMessages = async (placeID) => {
        setResult({
            data: null,
            loading: true,
            error: null
        })

        const ref = db.collection('messages')
        var subscriber = ref;

        if(placeID != null){
            subscriber = subscriber
            .where('placeID', '==' , placeID)
        }
        
        try{
                subscriber
                //.orderBy('createdAt')
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

    

    return [result, getMessages];


};

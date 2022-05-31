import { useState } from "react";
import { db } from "../firebase";


export default () => {
   
    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    })

    const getMessages = async (placeID, userID) => {
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
            
        }else if(userID != null){
            subscriber = subscriber
            .where('uid', '==' , userID)
        }else{
            subscriber = subscriber
            .orderBy("createdAt", "desc")
        }
        
        try{
                subscriber
                .limit(5)
                .get()
                .then(querySnapshot => {
                    console.log('query')
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

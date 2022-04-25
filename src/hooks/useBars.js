import { useState } from "react";
import { db } from "../firebase";


export default () => {
   
    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    })



    const getBars = async () => {
        setResult({
            data: null,
            loading: true,
            error: null
        })

        const ref = db.collection('bars')
        
        try{
            const subscriber = ref
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

            //return () => subscriber(); not sure what it does

       
        }catch(error){
            setResult({
                data: null,
                loading: false,
                error: error
            });
        }

       
       
    };

    

    return [result, getBars];


};

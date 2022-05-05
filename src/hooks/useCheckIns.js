import { useState } from "react";
import { db } from "../firebase";

export default () => {
   
    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    });


    const getCheckIns = async () => {

        setResult({
            data: null,
            loading: true,
            error: null
        })

        const barRef = db.collection('users')
        
        try{
            const subscriber = barRef
                .orderBy("checkInAt", "desc")
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
                            
                return () => subscriber(); 

       
        }catch(error){
            setResult({
                data: null,
                loading: false,
                error: error
            });
        }

       
       
    };

    return [result, getCheckIns];


};

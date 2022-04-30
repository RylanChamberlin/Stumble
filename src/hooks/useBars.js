import { useState } from "react";
import { db } from "../firebase";

export default () => {
   
    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    });

    //const [comment, setComment] = useState()

    // function dayOrLess(time) {

    //     var date = new Date(time*1000)
    //     var seconds = Math.floor((new Date() - date) / 1000);

    //     var interval = seconds / 86400;
    //     if (interval > 1) {
            
    //         return false;
    //       }else{
    //           return true;
    //       }
          
    //   }

    const getBars = async () => {


        setResult({
            data: null,
            loading: true,
            error: null
        })

        const barRef = db.collection('bars')
        
        try{
            const subscriber = barRef
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



    

    return [result, getBars];


};

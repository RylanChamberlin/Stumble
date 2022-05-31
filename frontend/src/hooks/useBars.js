import { useState } from "react";
import { db } from "../firebase";


// interface FriendObject {
//     isFriend: boolean;
//     key: string;
//     name: string;
//     username: string;
// }

// interface FriendData {
//     data: FriendObject | undefined | null | any; //temp fix so it would work in flatlist
//     loading: boolean;
//     error: any;
// }

// export default (): [FriendData, () => void] => {
   
//     const [result, setResult] = useState<FriendData>({
//         data: null,
//         loading: false,
//         error: null
//     })

export default () => {
   
    const [result, setResult] = useState({
        data: null,
        loading: false,
        error: null
    });

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

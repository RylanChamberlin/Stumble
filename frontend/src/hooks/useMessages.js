import { useEffect, useState } from "react";
import { db } from "../firebase";

// export type dateTime = {
//     nanoseconds: number,
//     seconds: number
// }

// export type Post = { 
//     bar: string
//     createdAt: dateTime
//     key: string
//     text: string
//     uid: string
//     voteCount: number
//     votes: number,
//   }


export default (itemID = null, order = 'createdAt', field = 'placeID', version) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState([])
    const [lastDoc, setLastDoc] = useState(undefined)

    let ref = db.collection('messages');

    if(itemID != null) ref = ref.where(field, '==' , itemID);

    // else{
    //     ref = ref
    //     .where("placeID", "in", ["ChIJK-bTLIle24cRvmyPEI5iwQY", "ChIJPcV4d8-33IcRT7MDdfcUmRQ", "ChIJX7IOCcS33IcR4zdKrb8iHqU", "ChIJna0jxVLKj4ARcmzC8VyOlZ0"])
    // }

    useEffect(() => {
        getMessages()
    },[])

    

    const getMessages = async () => {
        console.log('getting fresh')
        setIsLoading(true);

        const snapshot = await ref.orderBy(order, "desc").limit(8).get();
    
        if (!snapshot.empty) {
            let newPosts = [];
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    
            snapshot.forEach(doc => {
                newPosts.push({...doc.data(), key: doc.id,});
            });
    
            setData(newPosts);
        } else {
            setLastDoc(null);
        }
    
        setIsLoading(false);

    }

    const getMore = async () => {
        console.log('getting more......')
        if (lastDoc) {
            setIsMoreLoading(true);
    
            // setTimeout(async() => {
                let snapshot = await ref.orderBy(order, "desc").startAfter(lastDoc).limit(8).get();
        
                if (!snapshot.empty) {
                    let newPosts = data;
        
                setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        
                snapshot.forEach(doc => {
                    newPosts.push({...doc.data(), key: doc.id,});
                });
        
                setData(newPosts);

                if (snapshot.docs.length < 8) setLastDoc(null);

                } else {
                    setLastDoc(null);
                }
        
            setIsMoreLoading(false);
            // }, 1000);
        }


    }   


    return {isLoading, isError, data, getMessages, getMore, isMoreLoading}

};

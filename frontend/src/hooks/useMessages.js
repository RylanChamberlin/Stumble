import { useEffect, useState } from "react";
import { db } from "../firebase";


export default (itemID = null, order = 'createdAt', field = 'placeID') => {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState([])
    const [lastDoc, setLastDoc] = useState(undefined)
    const [isMore, setIsMore] = useState(true)
    const [secondFetch, setSecondFetch] = useState(false)

    let ref = db.collection('messages');

    if(itemID != null) {
        ref = ref
        .where(field, '==' , itemID) 
    }
    // else{
    //     ref = ref
    //     .where("placeID", "in", ["ChIJK-bTLIle24cRvmyPEI5iwQY", "ChIJPcV4d8-33IcRT7MDdfcUmRQ", "ChIJX7IOCcS33IcR4zdKrb8iHqU", "ChIJna0jxVLKj4ARcmzC8VyOlZ0"])
    // }

    ref = ref.orderBy(order, "desc");

    const fetchFirebase = async () => {
        const getMessages = await ref
            .limit(8) // limit to your page size, 3 is just an example
            .get()
            .then((querySnapshot) => {
                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
                if(querySnapshot.size){

                    if(querySnapshot.size < 8){
                        setIsMore(false);
                    }
                    
                    let data = []
                    querySnapshot.forEach(doc => {
                        data.push({...doc.data(), key: doc.id,});
                    });
                    setData(data);
                    setIsLoading(false)

                } else {
                    setIsLoading(false);
                }
                
            }).catch((err) => {setIsError(err)});   

            return () => {
                getMessages();
            }
    }

    
    //initial fethc
    (async () => {
        if(secondFetch) return;
        console.log('fetching firebase')
        setSecondFetch(true)
        setIsLoading(true);
        fetchFirebase()
        }
    )();

    //fetch after first for pagiantion
    const fetchMoreMessages = async () => {
        console.log('fetching more from firebase')
        setIsLoading(true);
        ref = ref.startAfter(lastDoc);
        fetchFirebase()
    }
    


    return {isLoading, isError, data, lastDoc, isMore, secondFetch, fetchMoreMessages}

};

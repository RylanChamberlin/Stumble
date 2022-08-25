import { collection, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
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


    let messagesRef = collection(db, 'messages');
    
    //if a single bar or users posts
    if(itemID != null) {
        messagesRef = query(messagesRef, where(field, '==' , itemID))
    }else{
        messagesRef = query(messagesRef, where("city", '==' , "Columbia"), where("state", '==' , "MO"))
    }

    const getMessages = async () => {
        console.log('getting fresh')
       
        setIsLoading(true);

        const q = query(messagesRef, orderBy(order, "desc"), limit(8));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){
            let newPosts = [];
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            querySnapshot.forEach((doc) => { 
                newPosts.push({...doc.data(), key: doc.id,});
            });
            setData(newPosts);
        } else {
            setLastDoc(null);
        }
        setIsLoading(false);
           
    }
        

    const getMore = async () => {
        
        if (lastDoc) {
            console.log('getting more......')
            setIsMoreLoading(true);
            const q = query(messagesRef, orderBy(order, "desc"), startAfter(lastDoc), limit(8));
            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty){
                let newPosts = data;
                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
                querySnapshot.forEach((doc) => {     
                    newPosts.push({...doc.data(), key: doc.id,});
                });
                setData(newPosts);

                if (querySnapshot.docs.length < 8) setLastDoc(null);

                } else {
                    setLastDoc(null);
                }
        
            setIsMoreLoading(false);
        }else{
            console.log('all out messages')
        }
    }   


    return {isLoading, isError, data, getMessages, getMore, isMoreLoading}

};

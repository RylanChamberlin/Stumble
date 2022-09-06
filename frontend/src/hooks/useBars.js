import { collection, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { db } from "../firebase";


export default () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState([])
    const [lastDoc, setLastDoc] = useState(undefined)
    const place = useAppSelector(state => state.location.place)

    useEffect(() => {
        getBars()
    },[])


    let barsRef = collection(db, 'bars');
    barsRef = query(barsRef, where("city", '==' , place.city), where("state", '==' , place.state))
    
    const getBars = async () => {
        console.log('getting fresh bars')
       
        setIsLoading(true);

        const q = query(barsRef, orderBy("postCount", "desc"), limit(8));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){
            let newBars = [];
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            querySnapshot.forEach((doc) => { 
                newBars.push({...doc.data(), place_id: doc.id,});
            });
            setData(newBars);
        } else {
            setLastDoc(null);
        }
        setIsLoading(false);
           
    }
        

    const getMore = async () => {
        
        if (lastDoc) {
            console.log('getting more bars.....')
            setIsMoreLoading(true);
            const q = query(barsRef, orderBy("postCount", "desc"), startAfter(lastDoc), limit(8));
            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty){
                let newBars = data;
                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
                querySnapshot.forEach((doc) => {     
                    newBars.push({...doc.data(), place_id: doc.id,});
                });
                setData(newBars);

                if (querySnapshot.docs.length < 8) setLastDoc(null);

                } else {
                    setLastDoc(null);
                }
        
            setIsMoreLoading(false);
        }else{
            console.log('all out bars')
        }
    }   


    return {isLoading, isError, data, getBars, getMore, isMoreLoading}

};

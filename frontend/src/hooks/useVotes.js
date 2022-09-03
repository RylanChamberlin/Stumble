
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";



export default (item) => {

    const [voteCount, setVoteCount] = useState(item.voteCount)
    const [userLike, setUserLike] = useState(false)
    const [userDislike, setUserDislike] = useState(false)
    const userRef = doc(db, "messages", item.key, "upvotes" , auth.currentUser.uid);

    useEffect(() => {

        (async () => {
           
            const voteRef = doc(db, "messages" , item.key , 'upvotes' , auth.currentUser.uid);
            const docSnap = await getDoc(voteRef);
            if (docSnap.exists()) {
                let vote = docSnap.data()
                if(vote.isVote){
                    setUserLike(true)
                    setUserDislike(false)
                }else{
                    setUserLike(false)
                    setUserDislike(true)
                }
            }else{
                setUserLike(false)
                setUserDislike(false)
            }  

        })();

    },[])

    const incrementVote = async() => {

        console.log('incrementVote')


        if(userLike == false){

            if(userDislike == true){

                setVoteCount(voteCount+2);
                await updateDoc(userRef, {
                    isVote: true,
                });
               
                
            }else{
                setVoteCount(voteCount+1);
                await setDoc(userRef, {
                    isVote: true,
                });

            }
            setUserLike(true)
            setUserDislike(false)

            console.log('upvoted')
            
            }
    }
    const decrementVote = async() => { 
        
        if(userDislike == false){
            console.log('downvoted')

            if(userLike == true){
                setVoteCount(voteCount-2);
                await updateDoc(userRef, {
                    isVote: false,
                });

            }else{
                setVoteCount(voteCount-1);
                await setDoc(userRef, {
                    isVote: false,
                });

            }
            
            setUserLike(false)
            setUserDislike(true)

        }

    }
    
    return {userLike, userDislike, voteCount, incrementVote, decrementVote}

};

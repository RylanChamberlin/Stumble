import { useEffect, useState } from "react";
import { auth, db } from "../firebase";


export default (item) => {

    const [voteCount, setVoteCount] = useState(item.voteCount)
    const [userLike, setUserLike] = useState(false)
    const [userDislike, setUserDislike] = useState(false)


    useEffect(() => {

        (async () => {
            const getVotes = await db
            .collection("messages")
            .doc(item.key)
            .collection("upvotes")
            .doc(auth.currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    let vote = snapshot.data()
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
            });
            return () => { getVotes() }
        })();

    },[])

    const incrementVote = () => {

        console.log('incrementVote')

        if(userLike == false){

            if(userDislike == true){

                setVoteCount(voteCount+2);
                db
                .collection("messages")
                .doc(item.key)
                .collection("upvotes")
                .doc(auth.currentUser.uid)
                .update({
                    isVote: true,
                })
                
            }else{
                setVoteCount(voteCount+1);

                db
                .collection("messages")
                .doc(item.key)
                .collection("upvotes")
                .doc(auth.currentUser.uid)
                .set({
                    isVote: true,
                })

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

                db
                .collection("messages")
                .doc(item.key)
                .collection("upvotes")
                .doc(auth.currentUser.uid)
                .update({
                    isVote: false,
                })

            }else{
                setVoteCount(voteCount-1);

                db
                .collection("messages")
                .doc(item.key)
                .collection("upvotes")
                .doc(auth.currentUser.uid)
                .set({
                    isVote: false,
                })
            }
            
            setUserLike(false)
            setUserDislike(true)

        }

    }
    
    return {userLike, userDislike, voteCount, incrementVote, decrementVote}

};

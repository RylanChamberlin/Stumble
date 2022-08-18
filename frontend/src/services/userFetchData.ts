
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

export const fetchFriends = async(uid: string) => {
    
    const query = await db.collection("users").doc(uid).collection('Friends').where('isFriend', '==', true).get()
    const friends = query.docs.map((doc: { data: () => any; id: any; }) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
    })
    //console.log(friends)
   return friends
}



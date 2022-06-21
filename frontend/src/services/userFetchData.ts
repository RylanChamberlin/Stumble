
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

export const fetchFriends = async() => {
    const query = await db.collection("users").doc(auth.currentUser.uid) .collection('Friends').where('isFriend', '==', true).get()
    const friends = query.docs.map((doc: { data: () => any; id: any; }) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
    })
   return friends
}



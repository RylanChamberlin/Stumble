
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const fetchFriends = async(uid: string) => {
    



    const q = query(collection(db, "users", uid, "Friends"), where("isFriend", "==", true));
    const querySnapshot = await getDocs(q);
    const friends = querySnapshot.docs.map((doc: { data: () => any; id: any; }) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
    })

    //console.log(friends)
   return friends



}



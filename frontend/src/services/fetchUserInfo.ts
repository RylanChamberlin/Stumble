import { doc, getDoc, getFirestore } from "firebase/firestore";



export const fetchUserInfo = async(uid: string) => {

    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let user = docSnap.data();
        user.uid = docSnap.id;
        return user
    } else {
    
        console.log("No such document! error");
    }

}

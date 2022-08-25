import { doc, getDoc, getFirestore } from "firebase/firestore";



export const fetchUserInfo = async(uid: string) => {

    const db = getFirestore();

    // let query = await db.collection("users").doc(uid).get();
    // let user = query.data();
    // user.uid = query.id;

    // return user



    //v9 
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

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";


export const acceptRequest = async(id) => {       //2 
    
    const userRef = doc(db, "users", auth.currentUser.uid, "Friends", id);
    const friendRef = doc(db, "users", id, "Friends", auth.currentUser.uid);

    await updateDoc(userRef, {
        isFriend: true
    });

    await updateDoc(friendRef, {
        isFriend: true
    });

}

export const cancelRequest = async(id) => {

    const userRef = doc(db, "users", auth.currentUser.uid, "Friends", id);
    const friendRef = doc(db, "users", id, "Friends", auth.currentUser.uid);

    await deleteDoc(userRef);
    await deleteDoc(friendRef);

}

export const sendRequest = async({id, name, username}) => { //1
 
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const myData = docSnap.data();

    const userRef = doc(db, "users", auth.currentUser.uid, "Friends", id);
    const friendRef = doc(db, "users", id, "Friends", auth.currentUser.uid);

    await setDoc(userRef, {
        isFriend: null,
        name: name,
        username: username
    });

    await setDoc(friendRef, {
        isFriend: false,
        name: myData.name,
        username: myData.username
    });

  }
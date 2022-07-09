import { auth, db } from '../firebase';



export const fetchUserInfo = async() => {

    
    let query = await db.collection("users").doc(auth.currentUser.uid).get();
   
    let user = query.data();
    user.uid = query.id;

    return user

}

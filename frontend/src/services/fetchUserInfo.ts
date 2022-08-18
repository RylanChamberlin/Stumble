import { auth, db } from '../firebase';



export const fetchUserInfo = async(uid: string) => {

    let query = await db.collection("users").doc(uid).get();
    let user = query.data();
    user.uid = query.id;

    return user

}

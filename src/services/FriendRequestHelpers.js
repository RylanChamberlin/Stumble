import { auth, db } from "../firebase";

export const acceptRequest = async(key) => {        
    const ref = db.collection('users')
    await ref.doc(auth.currentUser.uid).collection('Friends').doc(key).update({isFriend: true});
    await ref.doc(key).collection('Friends').doc(auth.currentUser.uid).update({isFriend: true});
}

export const cancelRequest = async(key) => {
    const ref = db.collection('users')
    await ref.doc(auth.currentUser.uid).collection('Friends').doc(key).delete()
    await ref.doc(key).collection('Friends').doc(auth.currentUser.uid).delete()

}

export const sendRequest = async({key, name, username}) => {
      
    const ref = db.collection('users')
    const snapshot = await ref.doc(auth.currentUser.uid).get();
    const myData = snapshot.data();

    await ref.doc(auth.currentUser.uid).collection('Friends').doc(key).set({
        isFriend: null,
        name: name,
        username: username
    
    });

    await ref.doc(key).collection('Friends').doc(auth.currentUser.uid).set({
        isFriend: false,
        name: myData.name,
        username: myData.username
    
    });

  }
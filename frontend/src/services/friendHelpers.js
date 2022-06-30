import { auth, db } from "../firebase";

export const acceptRequest = async(id) => {       //2  
    const ref = db.collection('users')
    await ref.doc(auth.currentUser.uid).collection('Friends').doc(id).update({isFriend: true});
    await ref.doc(id).collection('Friends').doc(auth.currentUser.uid).update({isFriend: true}); 
}

export const cancelRequest = async(id) => {

    console.log('cancel')
    const ref = db.collection('users')
    await ref.doc(auth.currentUser.uid).collection('Friends').doc(id).delete()
    await ref.doc(id).collection('Friends').doc(auth.currentUser.uid).delete()

}

export const sendRequest = async({id, name, username}) => { //1
   
    const ref = db.collection('users')
    const snapshot = await ref.doc(auth.currentUser.uid).get();
    const myData = snapshot.data();

    await ref.doc(auth.currentUser.uid).collection('Friends').doc(id).set({
        isFriend: null,
        name: name,
        username: username
    
    });

    await ref.doc(id).collection('Friends').doc(auth.currentUser.uid).set({
        isFriend: false,
        name: myData.name,
        username: myData.username
    
    });

  }
import { storage, auth, db } from "../firebase";
import * as ImagePicker from 'expo-image-picker';

export const pickAvatar = async(setAvatar) => {
    console.log('picking')
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });
  
    console.log(result);

    if (!result.cancelled) {
        setAvatar(result.uri);

        uploadImage(result.uri, auth.currentUser.uid).then(() => {
            console.log("Image Upload Succes")

            updateUser(auth.currentUser.uid)
            
        }).catch((e) => {
            console.log("Image Upload Error: " + e)
        })
        
        
    }

    //uploadAvatar()
};

const uploadImage = async(uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = storage.ref().child("profilePics/" + imageName);
    return ref.put(blob);
}

const updateUser = async(imageName) => {

    const url = await storage.ref("profilePics/" + imageName).getDownloadURL()
    db.collection("users").doc(auth.currentUser.uid).update({
        photoURL: url,
      });

}
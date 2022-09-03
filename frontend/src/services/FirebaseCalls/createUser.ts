import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "../../firebase";


export const createUser = async(formValues: any) => {
    if(checkNameAndUsername(formValues) && checkEmailAndPassword(formValues)){
        if(await checkIfUserExists(formValues)){
            return await createAccount(formValues)
        }
    }
}

export const createUsername = async(formValues: any, uid: string, setHasUsername: any) => {
    if(checkNameAndUsername(formValues)){
        if(await checkIfUserExists(formValues)){
            await addUserToDB(uid, formValues).then(() =>{
                setHasUsername(true)
            })
        }
    }
}

const createAccount = async (formValues : any) => {
    
    await createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
    .then((userCredentials: { user: any; }) => {
        const user = userCredentials.user;
        addUserToDB(user.uid, formValues)
        console.log('Registered with:', user.uid);
    })
    .catch((error: { message: string; }) => Alert.alert(error.message))
}

export const addUserToDB = async(uid : string, formValues: any) =>{
      
    try {
        await setDoc(doc(db, "users", uid), {
            username: formValues.username.toLowerCase(),
            name: formValues.name
        });

    } catch (error) {

        console.log(error)

    } 
}

export const checkIfUIDExists = async(uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return true
    } else {
       return false
    }
}

export const checkIfUserExists = async(formValues: any) => {
    const username = formValues.username.toLowerCase();
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
        
    if(!querySnapshot.empty){
        Alert.alert("Username is taken")
        return false;
    }
    else{
        return true
    }
}

export const checkNameAndUsername = (formValues: any) => {
    if(formValues.username == ''){
        return Alert.alert("Username is Empty")
    }

    if(hasWhiteSpace(formValues.username)){
        return Alert.alert("No Spaces in Username is Allowed")
    }

    if(formValues.name == ''){
        return Alert.alert("Display Name is Empty")
    }

    if(hasOneWhiteSpace(formValues.name)){
        return Alert.alert("Only Two Spaces are Allowed in Name");
    }

    return true
}

const checkEmailAndPassword = (formValues: any) => {
    if(formValues.email == ''){
        return Alert.alert("Email is Empty")
    }
    if(formValues.password == ''){
        return Alert.alert("Password is Empty")
    }
    if(formValues.repassword == ''){
        return Alert.alert("Password is Empty")
    }
    if(formValues.password !== formValues.repassword){
        return Alert.alert("Passwords do not match")
    }

    return true
}

const hasWhiteSpace = (s: string) => {
    return /\s/g.test(s);
  }

const hasOneWhiteSpace = (s: string) =>  {
    const spaces = s.split(' ').length - 1;
    if(spaces > 2)return true
    return false
  }